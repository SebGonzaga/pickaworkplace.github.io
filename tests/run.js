/* Node test suite for the document model, templates, runtime and export output.
   Run from the project root:  node tests/run.js
   Browser (UI) tests live in tests/ui.spec.js and need Playwright (see README). */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const FILES = ['runtime-styles','core','render','runtime','state','ui','library','pro','events','templates','templates2'];

// --- minimal DOM stub so the editor scripts can load without a browser
const stubEl = () => ({ addEventListener(){}, style:{}, textContent:'', innerHTML:'', dataset:{}, classList:{toggle(){},add(){},remove(){}}, querySelectorAll:()=>[], querySelector:()=>null });
const ctx = { console, document:{ getElementById:()=>stubEl(), querySelectorAll:()=>[], querySelector:()=>null, addEventListener(){}, createElement:()=>stubEl() },
  window:{}, btoa:s=>Buffer.from(s).toString('base64'), localStorage:{_m:new Map(),getItem(k){return this._m.has(k)?this._m.get(k):null},setItem(k,v){this._m.set(k,String(v))}}, setTimeout, location:{search:''}, addEventListener(){} };
vm.createContext(ctx);
const r = c => vm.runInContext(c, ctx);

let pass = 0, fail = 0;
const ok = (cond, name) => { if (cond) { pass++; console.log('  PASS  ' + name); } else { fail++; console.log('  FAIL  ' + name); } };
const section = t => console.log('\n' + t);

section('1. Syntax');
for (const f of FILES.concat(['export','events','library']).filter((v,i,a)=>a.indexOf(v)===i)) {
  const p = path.join(root, 'js', f + '.js');
  if (!fs.existsSync(p)) { ok(false, 'missing js/' + f + '.js'); continue; }
  try { new Function(fs.readFileSync(p, 'utf8')); ok(true, 'js/' + f + '.js parses'); } catch (e) { ok(false, 'js/' + f + '.js: ' + e.message); }
}

section('2. Load editor scripts');
let loadErr = null;
for (const f of FILES) {
  try { vm.runInContext(fs.readFileSync(path.join(root,'js',f+'.js'),'utf8'), ctx, {filename:f}); }
  catch (e) { if (!/document|getElementById|addEventListener|querySelector|localStorage|\$/.test(e.message)) loadErr = f + ': ' + e.message; }
}
ok(!loadErr, 'scripts load without logic errors' + (loadErr ? ' (' + loadErr + ')' : ''));

section('3. Templates');
const total = r('TPL.length');
ok(total >= 36, 'at least 36 templates (found ' + total + ')');
const names = r('TPL.map(function(t){return t.n})');
ok(new Set(names).size === names.length, 'template names are unique');
let boundsBad = [];
for (let i = 0; i < total; i++) {
  const d = r('bt(TPL[' + i + '])');
  if (!d || !d.slides || !d.slides.length) { boundsBad.push(names[i] + ' has no slides'); continue; }
  d.slides.forEach((s, si) => s.els.forEach(e => {
    if (e.rot) return;
    if (e.x < -2 || e.y < -2 || e.x + e.w > 962 || e.y + e.h > 542) boundsBad.push(names[i] + ' s' + (si+1) + ' ' + e.type);
  }));
}
ok(boundsBad.length === 0, 'every template element stays on the 960x540 slide' + (boundsBad.length ? ' (' + boundsBad.slice(0,5).join('; ') + ')' : ''));
ok(r('TPL.filter(function(t){return t.build}).length') >= 12, 'at least 12 custom-built templates present');

section('4. Rendering');
const inner = o => r('inner(' + JSON.stringify(o) + ')');
const shapes = ['rect','circle','tri','star','diamond','hex','pent','arrow','cross','blob','ring','heart'];
ok(shapes.every(sk => inner({type:'shape', sk, fill:'#f00', radius:0}).length > 10), 'all 12 shape kinds render');
ok(/font-size:1em/.test(inner({type:'sticker', text:'⭐'})), 'stickers render');
ok(/letter-spacing:0\.1em/.test(inner({type:'text', text:'x', color:'#000', fw:600, al:'left', ls:'0.1', lh:'1.5'})), 'text letter spacing applies');
ok(/line-height:1\.5/.test(inner({type:'text', text:'x', color:'#000', fw:600, al:'left', ls:'0', lh:'1.5'})), 'text line height applies');
ok(/border:4px solid #fff/.test(inner({type:'image', src:'data:x', radius:0, bd:'4', sh:'none'})), 'image border applies');
ok(/box-shadow:0 8px 24px/.test(inner({type:'image', src:'data:x', radius:0, bd:'0', sh:'soft'})), 'image soft shadow applies');
const chart = inner({type:'chart', text:'Mon | 4\nTue | 8', color:'#fff', fill:'#8f7bff'});
ok(/class="ch"/.test(chart) && /width:50%/.test(chart), 'bar chart scales bars to the largest value');
const table = inner({type:'table', text:'Name | Score\nAnna | 90', color:'#fff', fill:'#222'});
ok(/<th[^>]*>Name<\/th>/.test(table) && /<td>Anna<\/td>/.test(table), 'table uses first row as header');

section('5. Export output');
r('D=def()');
r("D.slides[0].els.push(mk({type:'button',text:'Hide',x:60,y:440,w:200,h:60,click:'exit',ex:'shrink'}))");
r("D.slides[1].tr='zoom'");
const html = r('page(0)'), css = r('CSS'), js = r('JS()');
ok(/data-ex="shrink"/.test(html) && /data-click="exit"/.test(html), 'exit trigger is exported');
ok(/class="slide tr-zoom"/.test(html), 'slide transition is exported');
ok(!/<script[^>]+src=/.test(html) || /js\/app\.js/.test(html), 'export loads only its own script');
ok(/@media\(max-width:767px\)/.test(css) && /@media\(min-width:768px\) and \(max-width:1023px\)/.test(css), 'responsive breakpoints present in CSS');
ok(/\.ex-shrink\{/.test(css) && /\.hv-speech:hover \.bub/.test(css) && /\.ch\{/.test(css), 'exit, hover and chart CSS exported');
ok(/rt\(\)/.test(js), 'runtime is exported and starts');
try { new Function(js); ok(true, 'exported app.js parses'); } catch (e) { ok(false, 'exported app.js: ' + e.message); }
const exportSrc = fs.readFileSync(path.join(root,'js','export.js'),'utf8');
ok(/README\.txt/.test(exportSrc) && /assets\/img/.test(exportSrc), 'ZIP export writes README.txt and extracts images to assets/');
ok(/styles\.css/.test(exportSrc) && /app\.js/.test(exportSrc), 'ZIP export writes css/styles.css and js/app.js');

section('6. Editor theme');
const baseCss = fs.readFileSync(path.join(root,'css','base.css'),'utf8');
const indexHtml = fs.readFileSync(path.join(root,'index.html'),'utf8');
const mainJs = fs.readFileSync(path.join(root,'js','main.js'),'utf8');
ok(/\[data-theme="light"\]\{/.test(baseCss), 'light theme variables are defined');
ok(/id="th"/.test(indexHtml), 'header has a theme toggle button');
ok(/applyTheme/.test(mainJs) && /pans-theme/.test(mainJs), 'theme choice is remembered and applied on load');
const outsideThemes = baseCss.replace(/:root\{[^}]*\}/,'').replace(/\[data-theme="light"\]\{[^}]*\}/g,'');
ok(!/#171a20|#3a3f4a|#111318/.test(outsideThemes), 'no hard-coded editor greys outside the theme definitions');

section('7. Pro features (snap, recent colours, layers, shortcuts)');
ok(r("reorderEls([{id:'a'},{id:'b'},{id:'c'}],'a',1).map(function(e){return e.id}).join('')") === 'bac', 'layer move forward swaps with the next element');
ok(r("reorderEls([{id:'a'},{id:'b'},{id:'c'}],'c',1).map(function(e){return e.id}).join('')") === 'abc', 'top layer cannot move further forward');
ok(r("reorderEls([{id:'a'},{id:'b'},{id:'c'}],'c',-1).map(function(e){return e.id}).join('')") === 'acb', 'layer move backward swaps with the previous element');
r("localStorage.setItem('pans-recent','[]')");
r("pushRecent('#112233')"); r("pushRecent('#445566')"); r("pushRecent('#112233')");
ok(r("recentColors().join(',')") === '#112233,#445566', 'recent colours keep most recent first without duplicates');
for (let i = 0; i < 10; i++) r("pushRecent('#0000' + (10+" + i + "))");
ok(r("recentColors().length") === 8, 'recent colours are capped at 8');
r("pushRecent('not-a-colour')");
ok(r("recentColors()[0]") !== 'not-a-colour', 'invalid colours are ignored');
const evSrc = fs.readFileSync(path.join(root,'js','events.js'),'utf8');
ok(/GRID_SNAP\)\{nx=Math\.round\(nx\/8\)\*8/.test(evSrc), 'dragging snaps to the 8px grid when Snap is on');
const idx = fs.readFileSync(path.join(root,'index.html'),'utf8');
ok(/id="kb" hidden/.test(idx) && /id="gsn"/.test(idx) && /id="kh"/.test(idx), 'shortcut overlay and snap toggle exist in the header');
ok(/data-up=/.test(fs.readFileSync(path.join(root,'js','ui.js'),'utf8')), 'layer rows have move up and down controls');

section('8. Layer drag and canvas pan');
ok(r("reorderTo([{id:'a'},{id:'b'},{id:'c'}],'a','c').map(function(e){return e.id}).join('')") === 'bca', 'dragging a layer above a higher layer moves it up the stack');
ok(r("reorderTo([{id:'a'},{id:'b'},{id:'c'}],'c','a').map(function(e){return e.id}).join('')") === 'acb', 'dragging a layer onto a lower layer moves it down the stack');
ok(r("reorderTo([{id:'a'},{id:'b'},{id:'c'}],'b','b').map(function(e){return e.id}).join('')") === 'abc', 'dropping a layer on itself changes nothing');
ok(/draggable="true"/.test(fs.readFileSync(path.join(root,'js','ui.js'),'utf8')), 'layer rows are draggable');
ok(/spaceDown/.test(fs.readFileSync(path.join(root,'js','pro.js'),'utf8')), 'Space-drag canvas pan is wired');

section('9. Creative transitions and animations');
const rtCss = r('RT_STYLES');
const newSlide = ['wipe','iris','cube','blur','drop','shutter'], newEnter = ['pop','spin','drop','blur','reveal','glitch'], newLoop = ['breathe','bob','hue','flicker'], newHover = ['tilt','lift'];
ok(newSlide.every(n => rtCss.includes('.slide.on.tr-' + n)), 'six new slide transitions have CSS (' + newSlide.join(', ') + ')');
ok(newEnter.every(n => rtCss.includes('.en-' + n + '{')), 'six new entrance animations have CSS');
ok(newLoop.every(n => rtCss.includes('.a-' + n + ' .fx{')), 'four new loop animations have CSS');
ok(newHover.every(n => rtCss.includes('.hv-' + n + ':hover .fx{')), 'two new hover effects have CSS');
const keyframeNames = [...rtCss.matchAll(/@keyframes ([\w-]+)/g)].map(m => m[1]);
ok(new Set(keyframeNames).size === keyframeNames.length, 'keyframe names are unique (' + keyframeNames.length + ' defined)');

section('10. Transition preview');
ok(['flash','swing','spiral','up'].every(n => rtCss.includes('.slide.on.tr-' + n + ',.tpv.tr-' + n + '{')), 'new transitions also play in the editor preview');
ok(/id="trp"/.test(fs.readFileSync(path.join(root,'js','ui.js'),'utf8')), 'slide panel has a Preview transition button');
const keyframes2 = [...r('RT_STYLES').matchAll(/@keyframes ([\w-]+)/g)].map(m => m[1]);
ok(new Set(keyframes2).size === keyframes2.length, 'keyframe names remain unique after additions');

section('11. Magic Move');
ok(r("JSON.stringify(morphDelta({left:0,top:0,width:100,height:100},{left:100,top:0,width:100,height:100},1))") === '{"dx":-100,"dy":0,"sx":1,"sy":1}', 'element moves back to its old position');
ok(r("JSON.stringify(morphDelta({left:0,top:0,width:50,height:50},{left:0,top:0,width:100,height:100},1))") === '{"dx":0,"dy":0,"sx":0.5,"sy":0.5}', 'element starts at its old size');
ok(r("morphDelta({left:200,top:0,width:100,height:100},{left:100,top:0,width:100,height:100},2).dx") === 50, 'stage zoom is compensated (screen pixels to layout pixels)');
ok(/morphDelta/.test(r('JS()')) && /prefers-reduced-motion/.test(r('JS()')), 'exported runtime includes Magic Move and respects reduced motion');
ok(/\.animate\(/.test(r('JS()')) || /x\.animate\(/.test(r('JS()')), 'exported runtime animates matched elements');
r("D=def();D.slides[0].els[0].mg='hero';D.slides[1].els.push(mk({type:'shape',sk:'circle',x:0,y:0,w:100,h:100,mg:'hero'}))");
ok(/data-mg="hero"/.test(r('page(0)')), 'elements with a Magic Move key are tagged in the export');
const uiSrc = fs.readFileSync(path.join(root,'js','ui.js'),'utf8');
ok(/fld\('mg'/.test(uiSrc) && /t==='g'/.test(uiSrc), 'properties panel has a Magic Move key field');
const mm = r("TPL.filter(function(t){return t.n==='Magic Move Showcase'})[0]");
const mmd = r("bt(TPL.filter(function(t){return t.n==='Magic Move Showcase'})[0])");
const keysPerSlide = mmd.slides.map(sl => sl.els.filter(e => e.mg).map(e => e.mg));
ok(!!mm && keysPerSlide.every(k => k.includes('hero')) && keysPerSlide.length === 3, 'Magic Move Showcase template: the hero object appears on all three slides');

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
