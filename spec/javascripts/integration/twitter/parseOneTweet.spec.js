import { expect } from 'chai';
import parseOneTweet from 'app/twitter/parseOneTweet';

describe('parseOneTweet', () => {
  it('returns a tweet object with parsed text', () => {
    const tweet = {
      created_at: '2016-01-01T00:00:00.000-03:00',
      mentions: ['dude'],
      text: '@dude 1 shot of whatever\n\n2 shots of whatever\n3 shots...',
    };

    const newTweet = parseOneTweet(tweet);

    expect(newTweet.create_at).to.equal('2016-01-01T00:00:00.000-03:00');
    expect(newTweet.mentions).to.deep.equal(['dude']);
    expect(newTweet.text).to.equal(
      '<p><a href="#" data-js-mention>@dude</a> 1 shot of whatever>' +
      '<p>2 shots of whatever<br>3 shots...</p>'
    );
  });
});