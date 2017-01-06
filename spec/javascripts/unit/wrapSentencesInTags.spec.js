import { expect } from 'chai';
import wrapSentencesInTags from 'app/twitter/wrapSentencesInTags';

describe('wrapSentencesInTags', () => {
  context('when source text is blank', () => {
    it('renders an empty string', () => {
      const html = wrapSentencesInTags('');

      expect(html).to.equal('');
    });
  });

  context('when source text does not have line breaks', () => {
    it('renders the source text wrapped in a paragraph tag', () => {
      const html = wrapSentencesInTags('hey dude');

      expect(html).to.equal('<p>hey dude</p>');
    });
  });

  context('when source text has 2 chunks joined by 2 new lines', () => {
    it('the chunks are wrapped in paragraph tags', () => {
      const html = wrapSentencesInTags('hey \n\nnow we are talking');

      expect(html).to.equal('<p>hey</p><p>now we are talking</p>');
    });
  });

  context('when source text has chunks joined by 3 new lines', () => {
    it('chunks around two newlines are parsed to trimmed paragraphs', () => {
      const html = wrapSentencesInTags('hey   \n\n\nnow we are talking');

      expect(html).to.equal('<p>hey</p><p>now we are talking</p>');
    });
  });
  context('when source text has random interleaved line breaks between parts', () => {
    it('parses correctly', () => {
      const html = wrapSentencesInTags(
        "Hey!\n\nDon't forget to have your meal\n\nYour mother\n"
      );

      expect(html).to.equal(
        '<p>Hey!</p>' + 
        "<p>Don't forget to have your meal</p>" + 
        '<p>Your mother\n</p>'
      );
    });
  });
});