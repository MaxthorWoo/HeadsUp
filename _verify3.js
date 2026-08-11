const fs = require('fs');
const html = fs.readFileSync('e:/WebApp/HeadsUp/index.html', 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
try {
  new Function(m[1]);
  console.log('JS OK');
} catch (e) {
  console.log('JS ERR:', e.message);
}
console.log('playTick:', /function playTick/.test(m[1]));
console.log('AudioContext:', /AudioContext/.test(m[1]));
console.log('triggerWordFeedback:', /function triggerWordFeedback/.test(m[1]));
console.log('shake class:', /classList.add\("shake"\)/.test(m[1]));
console.log('shake anim css:', /@keyframes word-shake/.test(html));
console.log('home gradient 160deg:', /linear-gradient\(160deg, #0f0c29/.test(html));
console.log('cat gradient 150deg:', /linear-gradient\(150deg, #11998e/.test(html));
console.log('deck:', /let deck = \[\]/.test(m[1]));
console.log('version:', (html.match(/version">v([\d.]+)<\/p>/) || [])[1]);
