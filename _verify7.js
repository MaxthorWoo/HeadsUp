const fs = require('fs');
const html = fs.readFileSync('e:/WebApp/HeadsUp/index.html', 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
try {
  new Function(m[1]);
  console.log('JS OK');
} catch (e) {
  console.log('JS ERR:', e.message);
}
console.log('initHapticSwitch:', /function initHapticSwitch/.test(m[1]));
console.log('isIOSDevice:', /function isIOSDevice/.test(m[1]));
console.log('setAttribute switch:', /setAttribute\("switch"/.test(m[1]));
console.log('label.click:', /hapticLabel\.click\(\)/.test(m[1]));
console.log('navigator.vibrate fallback:', /navigator\.vibrate\(30\)/.test(m[1]));
console.log('vibrateSuccess called in nextWord:', /vibrateSuccess\(\);/.test(m[1]));
console.log('deck:', /let deck = \[\]/.test(m[1]));
console.log('devicemotion:', /addEventListener\("devicemotion"/.test(m[1]));
console.log('version:', (html.match(/version">v([\d.]+)<\/p>/) || [])[1]);
