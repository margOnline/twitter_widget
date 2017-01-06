import { expect } from 'chai'
import sinon from 'sinon'
import fetchTimeline from 'app/twitter/fetchTimeline';

describe('fetchTimeline', () => {
  let server;

  beforeEach(() => {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
  })

  afterEach(() => { server.restore(); })

  const response = { tweets: [{ text: 'Hi!'}] };

  context('when timeline response is ok', () => {
    it('runs only then callback', () => {
      server.respondWith('GET', '/twitter_timeline/margonline',[
        200, { 'Content_Type': 'application/json'}, JSON.stringify(response),
      ]);

      const promise = fetchTimeline('margonline').catch(() => 'NotMe');

      return promise.then((body) => {
        expect(body).to.deep.equal(response);
      });
    });
  });
});