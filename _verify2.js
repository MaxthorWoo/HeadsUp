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
console.log('gradientFallback:', /function gradientFallback/.test(m[1]));
console.log('backgroundImage set:', /backgroundImage = gradient/.test(m[1]));
console.log('backgroundColor set:', /backgroundColor = fallback/.test(m[1]));
console.log('html height 100%:', /html, body[^{]*\{[^}]*height: 100%/.test(html));
console.log('screen minheight:', /\.screen[^{]*\{[^}]*min-height: 100%/.test(html));
console.log('no app-background:', !/app-background/.test(html));
console.log('cover:', /viewport-fit=cover/.test(html));
