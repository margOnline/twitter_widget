export default function parseLineBreaks(text, mentions){
  let regexp, template;

  mentions.forEach(mention => {
    regexp = new RegExp(`@${mention}\\b`, 'g');
    template = `<a href="#" data-js-mention>@${mention}</a>`;
    return text = text.replace(regexp, template)
  });
  return text;
}