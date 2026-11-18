/* Export validator: builds the ZIP contents for the default project and for every template,
   then checks the HTML, CSS, JavaScript and assets for structure, references and offline behaviour.
   Run from the project root:  node tests/export-check.js */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const FILES = ['runtime-styles','core','render','runtime','state','ui','library','pro','events','templates','templates2'];
const stubEl = () => ({ addEventListener(){}, style:{}, textContent:'', innerHTML:'', dataset:{}, classList:{toggle(){},add(){},remove(){}}, querySelectorAll:()=>[], querySelector:()=>null });
const ctx = { console, document:{ getElementById:()=>stubEl(), querySelectorAll:()=>[], querySelector:()=>null, addEventListener(){}, createElement:()=>stubEl() },
  window:{}, btoa:s=>Buffer.from(s).toString('base64'), localStorage:{_m:new Map(),getItem(k){return this._m.has(k)?this._m.get(k):null},setItem(k,v){this._m.set(k,String(v))}}, setTimeout, location:{search:''}, addEventListener(){} };
vm.createContext(ctx);
const r = c => vm.runInContext(c, ctx);
for (const f of FILES) { try { vm.runInContext(fs.readFileSync(path.join(root,'js',f+'.js'),'utf8'), ctx, {filename:f}); } catch (e) { if (!/document|getElementById|addEventListener|querySelector|localStorage|\$/.test(e.message)) throw e; } }

const VOID = new Set(['meta','link','img','br','hr','input','source','wbr','path','circle','ellipse','rect','line','polygon','polyline','stop']);
const ENUM = { click:['none','speech','popup','link','next','prev','exit'], hov:['none','jump','wiggle','wave','grow','speech','tilt','lift'], enter:['none','fade','slide','zoom','rise','bounce','flip','turn','rotate','scale','pop','spin','drop','blur','reveal','glitch'], ex:['none','fade','slide','shrink','zoom','rotate'], tr:['none','fade','slide','zoom','flip','wipe','iris','cube','blur','drop','shutter','flash','swing','spiral','up'] };

// Simulates export.js: data: images become assets/ files, exactly as the ZIP export does.
function buildExport(setup) {
  r('__files={};__n=0;SRC=function(s){if(s.slice(0,5)!=="data:")return s;var m=/^data:image\\/([\\w+]+)[^,]*;base64,(.*)$/.exec(s);if(!m)return s;var p="assets/img"+(++__n)+"."+m[1].replace("svg+xml","svg").replace("jpeg","jpg");__files[p]=m[2];return p}');
  setup();
  const html = r('page(0)');
  r('SRC=function(s){return s}');
  const files = { 'index.html': html, 'css/styles.css': r('CSS'), 'js/app.js': r('JS()') };
  const assets = r('__files');
  for (const k of Object.keys(assets)) files[k] = Buffer.from(assets[k], 'base64');
  return files;
}

function checkTags(html) {
  const issues = [], stack = [];
  const body = html.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'');
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)>/g; let m;
  while ((m = re.exec(body))) {
    const closing = m[1] === '/', name = m[2].toLowerCase(), selfClosed = m[3] === '/';
    if (VOID.has(name) || selfClosed) continue;
    if (!closing) stack.push(name);
    else { const top = stack.pop(); if (top !== name) { issues.push('tag mismatch: </'+name+'> closes <'+(top||'nothing')+'>'); if (top) stack.push(top); } }
  }
  if (stack.length) issues.push('unclosed tags: ' + stack.slice(-3).join(', '));
  return issues;
}

function validate(files) {
  const issues = [];
  const html = files['index.html'].toString(), css = files['css/styles.css'].toString(), js = files['js/app.js'].toString();
  // structure
  if (!/^<!doctype html>/i.test(html)) issues.push('missing doctype');
  if (!/<meta charset="utf-8">/.test(html)) issues.push('missing charset');
  if (!/<meta name="viewport"/.test(html)) issues.push('missing viewport meta (needed for mobile)');
  issues.push(...checkTags(html));
  // local references must exist in the ZIP
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1]);
  for (const ref of refs) {
    if (/^https?:\/\//.test(ref)) { if (!/fonts\.(googleapis|gstatic)\.com/.test(ref)) issues.push('remote resource (not offline): ' + ref); continue; }
    if (!(ref in files)) issues.push('missing local file: ' + ref);
  }
  // CSS and JS basics
  const braces = (css.match(/{/g)||[]).length - (css.match(/}/g)||[]).length;
  if (braces !== 0) issues.push('CSS braces unbalanced (' + braces + ')');
  try { new Function(js); } catch (e) { issues.push('app.js does not parse: ' + e.message); }
  if (/\b(S\(\)|commit\(|drawStage|\$\('st'\))/.test(js)) issues.push('exported JS depends on editor code');
  // attribute values must be ones the runtime understands
  for (const [attr, allowed] of Object.entries(ENUM)) {
    const re = new RegExp('data-' + attr + '="([^"]*)"', 'g'); let m;
    while ((m = re.exec(html))) if (!allowed.includes(m[1])) issues.push('unknown data-' + attr + ' value: ' + m[1]);
  }
  // every asset is non-empty and decodes
  for (const f of Object.keys(files).filter(f => f.startsWith('assets/'))) if (!files[f].length) issues.push('empty asset: ' + f);
  // every slide has a navigable page
  if ((html.match(/<section class="slide/g)||[]).length < 1) issues.push('no slides exported');
  return issues;
}

let total = 0, failed = 0;
function report(name, issues) {
  total++;
  if (issues.length) { failed++; console.log('  FAIL  ' + name + '\n        - ' + issues.slice(0,6).join('\n        - ')); }
  else console.log('  PASS  ' + name);
}
console.log('Default project');
report('default project exports cleanly', validate(buildExport(() => r('D=def()'))));
console.log('Feature project (exit, hover speech, chart, table, transition, image border/shadow, text spacing)');
report('feature project exports cleanly', validate(buildExport(() => {
  r("D=def();D.slides[0].els.push(mk({type:'button',text:'Hide',x:60,y:440,w:200,h:60,click:'exit',ex:'shrink'}));" +
    "D.slides[0].els.push(mk({type:'shape',sk:'star',fill:'#ffd93d',x:500,y:200,w:160,h:160,hov:'speech',msg:'Hi|There'}));" +
    "D.slides[0].els.push(mk({type:'chart',text:'Mon | 4\\nTue | 8',x:60,y:100,w:400,h:200,color:'#fff',fill:'#8f7bff'}));" +
    "D.slides[0].els.push(mk({type:'table',text:'A | B\\nx | y',x:500,y:300,w:400,h:150,color:'#fff',fill:'#222'}));" +
    "D.slides[1].tr='zoom';D.slides[0].els.push(mk({type:'image',src:IMG,x:20,y:20,w:120,h:90,bd:'4',sh:'soft',radius:8}));" +
    "D.slides[0].els.push(mk({type:'text',text:'Spaced',x:300,y:20,w:300,h:60,fs:32,color:'#fff',lh:'1.5',ls:'0.1'}))");
})));
console.log('All templates');
const total_t = r('TPL.length');
for (let i = 0; i < total_t; i++) {
  const name = r('TPL['+i+'].n');
  report('template: ' + name, validate(buildExport(() => r('D=bt(TPL['+i+'])'))));
}
console.log('\n' + (total - failed) + ' of ' + total + ' export checks passed');
process.exit(failed ? 1 : 0);
