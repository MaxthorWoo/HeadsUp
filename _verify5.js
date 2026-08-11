const fs = require('fs');
const html = fs.readFileSync('e:/WebApp/HeadsUp/index.html', 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
try {
  new Function(m[1]);
  console.log('JS OK');
} catch (e) {
  console.log('JS ERR:', e.message);
}
console.log('grantShakeIfNeeded:', /function grantShakeIfNeeded/.test(m[1]));
console.log('requestMotionPermission:', /function requestMotionPermission/.test(m[1]));
console.log('devicemotion listener:', /addEventListener\("devicemotion"/.test(m[1]));
console.log('acceleration fallback:', /e\.acceleration &&/.test(m[1]));
console.log('accelerationIncludingGravity:', /accelerationIncludingGravity/.test(m[1]));
console.log('shakeGranted:', /shakeGranted/.test(m[1]));
console.log('startGame grant:', /grantShakeIfNeeded\(\);/.test(m[1]));
console.log('startGame called:', /function startGame/.test(m[1]));
console.log('deck:', /let deck = \[\]/.test(m[1]));
console.log('no word shake anim:', !/@keyframes word-shake/.test(html));
console.log('gradient vertical:', /linear-gradient\(to bottom, #0f0c29/.test(html));
console.log('version:', (html.match(/version">v([\d.]+)<\/p>/) || [])[1]);
