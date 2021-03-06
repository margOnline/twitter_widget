import { expect } from 'chai';
import sinon from 'sinon';
import createFixture from '../../support/createFixture';
import mountComponent from 'app/twitter/mountComponent';

describe('mountComponent', () => {
  let fixture;
  let server;

  beforeEach(() => {
    fixture = createFixture({html: '<div data-js-tweets></div>'});
    server = sinon.fakeServer.create();
  });

  afterEach(() => {
    fixture.destroy();
    server.restore();
  });

  const serverResponse = JSON.stringify({
    status: 'ok',
    tweets: [
      {
        created_at: "2016-11-01T00:00:00.000-03:00",
        text: "hello @world",
        mentions: ['world']
      },
      {
        created_at: "2016-11-01T00:03:40.000-03:00",
        text: "goodbye",
        mentions: []
      },
    ]
  });

  it('renders an initial timeline', (done) => {
    server.respondWith('GET', '/twitter_timeline/margonline',[
      200, {'Content-Type': 'application/json'}, serverResponse,
    ]);

    mountComponent({containerNode: fixture});

    server.respond();

    setTimeout(() => {
      const tweets = fixture.querySelectorAll('.tweet > p');
      expect(tweets).to.have.length(2);
      expect(tweets[0].textContent).to.equal('hello @world');
      expect(tweets[1].textContent).to.equal('goodbye');

      done();

    }, 50);
  });
});