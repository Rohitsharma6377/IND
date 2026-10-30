import test from 'node:test';
import assert from 'node:assert/strict';
import { draftWithOllama } from '../src/assistant.mjs';
test('AI is disabled without a configured model',async()=>{
  await assert.rejects(draftWithOllama({prompt:'Draft copy'}, {}, null),error=>error.status===503);
});
test('AI uses the fixed local endpoint and returns an unapplied draft',async t=>{
  t.mock.method(globalThis,'fetch',async(url,options)=>{
    assert.equal(url,'http://127.0.0.1:11434/api/generate');
    const request=JSON.parse(options.body);
    assert.equal(request.model,'test-model');
    assert.equal(request.stream,false);
    assert.ok(!request.prompt.includes('customer@example.test'));
    return new Response(JSON.stringify({response:'A test product introduction.'}),{status:200});
  });
  const result=await draftWithOllama({prompt:'Draft an introduction'},{products:[{name:'Cup',stock:5}]},'test-model');
  assert.equal(result.draft,'A test product introduction.');assert.equal(result.applied,false);
});
test('oversized AI responses are rejected',async t=>{
  t.mock.method(globalThis,'fetch',async()=>new Response('x'.repeat(70000)));
  await assert.rejects(draftWithOllama({prompt:'Draft copy'}, {}, 'test-model'),error=>error.status===502);
});
