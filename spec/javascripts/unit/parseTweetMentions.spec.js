import { expect } from 'chai';
import parseTweetMentions from 'app/twitter/parseTweetMentions';

describe('parseTweetMentions', () => {
  context('with empty tweet text and no mentions', () => {
    it('renders an empty string', () => {
      const html = parseTweetMentions('', []);

      expect(html).to.equal('');
    });
  });

  context('when having one mention', () => {
    it('transforms the mention into an anchor tag', () => {
      const text = 'Hey @banksy! How goes it?';
      const mentions = ['banksy'];
      const html = parseTweetMentions(text, mentions);

      expect(html).to.equal(
        'Hey <a href="#" data-js-mention>@banksy</a>! How goes it?'
      );
    });
  });

  context('when having two mentions', () => {
    it('transforms the mention into an anchor tag', () => {
      const text = 'Hey @banksy! Whens the exhibition @tate?';
      const mentions = ['banksy', 'tate'];
      const html = parseTweetMentions(text, mentions);

      expect(html).to.equal(
        'Hey <a href="#" data-js-mention>@banksy</a>! ' + 
        'Whens the exhibition <a href="#" data-js-mention>@tate</a>?'
      );
    });
  });

  context('when having two mentions which are the same', () => {
    it('transforms both mentions into the same anchor tag', () => {
      const text = 'Yo @banksy! Watch out @banksy!';
      const mentions = ['banksy', 'tate'];
      const html = parseTweetMentions(text, mentions);

      expect(html).to.equal(
        'Yo <a href="#" data-js-mention>@banksy</a>! ' + 
        'Watch out <a href="#" data-js-mention>@banksy</a>!'
      );
    });
  });

  context('when a mention is surrounded by non whitespace chars', () => {
    it('is not parsed as a mention', () => {
      const text = 'Email @dude at chief@dudecooking.com';
      const mentions = ['dude'];
      const html = parseTweetMentions(text, mentions);

      expect(html).to.equal(
        'Email <a href="#" data-js-mention>@dude</a> at chief@dudecooking.com'
      );
    });
  });

});