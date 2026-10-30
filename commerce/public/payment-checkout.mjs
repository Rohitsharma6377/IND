import {e,btn,money} from './shared.mjs';
let loading;
async function loadRazorpay() {
  if(window.Razorpay)return;
  if(!loading)loading=new Promise((resolve,reject)=>{
    const script=document.createElement('script');script.src='https://checkout.razorpay.com/v1/checkout.js';script.async=true;
    const fail=message=>{clearTimeout(timer);loading=null;script.remove();reject(new Error(message));};
    const timer=setTimeout(()=>fail('The payment gateway took too long to load. Check the existing order before retrying.'),15000);
    script.onload=()=>{clearTimeout(timer);if(window.Razorpay)resolve();else fail('The payment checkout did not initialise.');};
    script.onerror=()=>fail('Could not load the payment gateway. No payment was confirmed.');
    document.head.append(script);
  });
  await loading;
}
export function paymentStatusModal(ctx,intent,result) {
  const paid=result.status==='paid',review=result.status==='review';
  ctx.modal(paid?'Payment verified':review?'Payment needs review':'Payment confirmation pending',
    '<div class="stack"><h2>'+e(result.number||intent.number||'Your order')+'</h2><p>'+e(paid?'Your '+(intent.mode==='test'?'test ':'')+'payment of '+money(result.amount||intent.amount)+' is confirmed.':review?'A payment was captured after this order was cancelled. Contact the merchant for refund review; this order will not be fulfilled automatically.':'Do not pay again while confirmation is pending. The merchant can reconcile the provider record.')+'</p><div class="row wrap">'+btn('payment-check','Check status','primary')+(!paid&&!review&&intent.provider_order_id?btn('payment-resume','Continue this payment'):'')+btn('close','Close')+'</div><p class="tiny muted">Keep your order number for support. Do not pay again while confirmation is pending.</p></div>');
}
export async function onlineCheckout(ctx,intent,customer={}) {
  await loadRazorpay();ctx.closeModal();
  const checkout=new window.Razorpay({key:intent.key_id,order_id:intent.provider_order_id,amount:intent.amount,currency:intent.currency,name:ctx.state.shop.name,
    description:'Order '+intent.number,prefill:{name:customer.customer,email:customer.email,contact:customer.phone},
    theme:{color:ctx.state.shop.theme.accent},handler:async result=>{
      try {
        const receipt=await ctx.api('/api/public/'+ctx.state.shop.slug+'/confirm','POST',{intent_id:intent.intent_id,receipt_token:intent.receipt_token,...result});
        intent.status=receipt.status;
        if(['paid','review'].includes(receipt.status)){
          if(ctx.state.checkoutKey===intent.checkout_key){ctx.state.cart=[];ctx.state.checkoutKey=null;}
          ctx.state.shop=await ctx.api('/api/public/'+ctx.state.shop.slug);ctx.renderShop();
        }
        paymentStatusModal(ctx,intent,receipt);
      } catch(error){ctx.toast(error.message,true);paymentStatusModal(ctx,intent,{status:'pending',number:intent.number,amount:intent.amount});}
    },modal:{ondismiss:()=>{if(!['paid','review'].includes(intent.status))paymentStatusModal(ctx,intent,{status:intent.status,number:intent.number,amount:intent.amount});}}});
  checkout.on('payment.failed',()=>ctx.toast('The gateway reported a failed attempt. Check the existing payment status before retrying.',true));
  checkout.open();
}
export async function paymentAction(action,button,ctx) {
  if(!['payment-resume','payment-check'].includes(action))return false;
  const intent=ctx.state.paymentIntent;if(!intent)throw new Error('The local receipt is no longer available. Ask the merchant to reconcile the order.');
  if(action==='payment-resume'){await onlineCheckout(ctx,intent,ctx.state.paymentCustomer);return true;}
  const receipt=await ctx.api('/api/public/'+ctx.state.shop.slug+'/receipt','POST',{intent_id:intent.intent_id,receipt_token:intent.receipt_token});
  intent.status=receipt.status;
  if(['paid','review'].includes(receipt.status)&&ctx.state.checkoutKey===intent.checkout_key){ctx.state.cart=[];ctx.state.checkoutKey=null;ctx.renderShop();}
  paymentStatusModal(ctx,intent,receipt);return true;
}
