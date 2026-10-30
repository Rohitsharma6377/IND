export const sectionTypes={
 hero:{name:'Hero banner',settings:{title:'A collection worth discovering',body:'Useful, beautiful goods for everyday living.'}},
 collection:{name:'Product collection',settings:{title:'Shop the collection',limit:12}},
 announcement:{name:'Announcement',settings:{text:'Made with care. Delivered across India.'}}
};
export function newLayout(){return {version:1,sections:{hero:{type:'hero',settings:{...sectionTypes.hero.settings}},collection:{type:'collection',settings:{...sectionTypes.collection.settings}}},order:['hero','collection']};}
export function changeLayout(layout,action,id,value){
 const next=JSON.parse(JSON.stringify(layout));
 if(!next.sections||!Array.isArray(next.order))throw new Error('Invalid layout');
 if(action==='add'){if(!Object.hasOwn(sectionTypes,value))throw new Error('Choose a supported section');if(next.order.length>=25)throw new Error('A page supports at most 25 sections');let n=1;while(Object.hasOwn(next.sections,'section'+n))n++;const key='section'+n;next.sections[key]={type:value,settings:{...sectionTypes[value].settings}};next.order.push(key);return next;}
 if(!Object.hasOwn(next.sections,id))throw new Error('Section not found');
 const i=next.order.indexOf(id);if(i<0)throw new Error('Section is missing from order');
 if(action==='remove'){delete next.sections[id];next.order.splice(i,1);}
 else if(action==='toggle')next.sections[id].disabled=!next.sections[id].disabled;
 else if(action==='up'||action==='down'){const j=i+(action==='up'?-1:1);if(j>=0&&j<next.order.length)[next.order[i],next.order[j]]=[next.order[j],next.order[i]];}
 else throw new Error('Unknown layout action');
 return next;
}
