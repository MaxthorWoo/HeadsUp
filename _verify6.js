const fs = require('fs');
const html = fs.readFileSync('e:/WebApp/HeadsUp/index.html', 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
try {
  new Function(m[1]);
  console.log('JS OK');
} catch (e) {
  console.log('JS ERR:', e.message);
}
console.log('vibrateSuccess:', /function vibrateSuccess/.test(m[1]));
console.log('vibrate call:', /navigator\.vibrate\(30\)/.test(m[1]));
console.log('nextWord calls vibrate:', /showWord\(false\);\s*\n\s*\/\* 换词成功后触发手机震动反馈 \*\//.test(m[1]) || /vibrateSuccess\(\);/.test(m[1]));
console.log('shake grant:', /function grantShakeIfNeeded/.test(m[1]));
console.log('devicemotion:', /addEventListener\("devicemotion"/.test(m[1]));
console.log('deck:', /let deck = \[\]/.test(m[1]));
console.log('version:', (html.match(/version">v([\d.]+)<\/p>/) || [])[1]);
