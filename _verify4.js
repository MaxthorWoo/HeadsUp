const fs = require('fs');
const html = fs.readFileSync('e:/WebApp/HeadsUp/index.html', 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
try {
  new Function(m[1]);
  console.log('JS OK');
} catch (e) {
  console.log('JS ERR:', e.message);
}
console.log('--- 回滚检查 ---');
console.log('无单词抖动 keyframes:', !/@keyframes word-shake/.test(html));
console.log('无shake class js:', !/classList\.add\("shake"\)/.test(m[1]));
console.log('无150deg/160deg:', !/linear-gradient\(1[56]0deg/.test(html));
console.log('首页渐变垂直:', /linear-gradient\(to bottom, #0f0c29/.test(html));
console.log('品类渐变垂直:', /linear-gradient\(to bottom, #11998e/.test(html));
console.log('--- 保留项 ---');
console.log('音效 playTick:', /function playTick/.test(m[1]));
console.log('AudioContext:', /AudioContext/.test(m[1]));
console.log('--- 新增设备抖动 ---');
console.log('requestMotionPermission:', /function requestMotionPermission/.test(m[1]));
console.log('startShakeDetection:', /function startShakeDetection/.test(m[1]));
console.log('devicemotion:', /devicemotion/.test(m[1]));
console.log('DeviceMotionEvent:', /DeviceMotionEvent/.test(m[1]));
console.log('--- 基础 ---');
console.log('deck:', /let deck = \[\]/.test(m[1]));
console.log('deckIndex:', /let deckIndex = 0/.test(m[1]));
console.log('version:', (html.match(/version">v([\d.]+)<\/p>/) || [])[1]);
