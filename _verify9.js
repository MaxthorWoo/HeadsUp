const fs = require('fs');
const html = fs.readFileSync('e:/WebApp/HeadsUp/index.html', 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
try {
  new Function(m[1]);
  console.log('JS OK');
} catch (e) {
  console.log('JS ERR:', e.message);
}
console.log('no pointer-events:none in haptic:', !/pointerEvents\s*=\s*"none"/.test(m[1].split('haptic')[1] || ''));
console.log('no display:none in haptic:', !(m[1].indexOf('haptic-switch') > -1 && /haptic-switch[\s\S]*?display\s*=\s*"none"/.test(m[1])));
console.log('label.click:', /hapticLabel\.click\(\)/.test(m[1]));
console.log('vibrateSuccess in nextWord:', /vibrateSuccess\(\);/.test(m[1]));
console.log('gameEl click nextWord:', /gameEl\.addEventListener\("click", nextWord\)/.test(m[1]));
console.log('deck:', /let deck = \[\]/.test(m[1]));
console.log('devicemotion:', /addEventListener\("devicemotion"/.test(m[1]));
console.log('version:', (html.match(/version">v([\d.]+)<\/p>/) || [])[1]);
