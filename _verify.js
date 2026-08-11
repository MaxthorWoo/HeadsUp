const fs = require('fs');
const html = fs.readFileSync('e:/WebApp/HeadsUp/index.html', 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
try {
  new Function(m[1]);
  console.log('JS OK');
} catch (e) {
  console.log('JS ERR:', e.message);
}
console.log('deck:', /let deck = \[\]/.test(m[1]));
console.log('deckIndex:', /let deckIndex = 0/.test(m[1]));
console.log('no appBg ref:', !/app-background/.test(m[1]));
console.log('no appBg div:', !html.includes('id="app-background"'));
console.log('no overflow:hidden on html/body:', !/(html, body|html,body)[^{]*\{[^}]*overflow:\s*hidden/.test(html));
console.log('cover:', /viewport-fit=cover/.test(html));
console.log('screen relative:', /\.screen[^{]*\{[^}]*position:\s*relative/.test(html));
