/* Figma / Canva style helpers: grid snap, recent colours, layer reorder and rename, shortcut help */
window.GRID_SNAP=false;
try{window.GRID_SNAP=localStorage.getItem('pans-snap')==='1'}catch(e){}

/* pure: move one element up (+1, forward) or down (-1, backward) in the stacking order */
function reorderEls(els,id,dir){var out=els.slice(),i=out.findIndex(function(e){return e.id===id}),j=i+dir;if(i<0||j<0||j>=out.length)return out;var t=out[i];out[i]=out[j];out[j]=t;return out}
function moveLayer(id,dir){S().els=reorderEls(S().els,id,dir);commit();drawAll()}

/* recent colours (most recent first, max 8) */
function recentColors(){try{var r=JSON.parse(localStorage.getItem('pans-recent')||'[]');return Array.isArray(r)?r:[]}catch(e){return[]}}
function pushRecent(c){if(!/^#[0-9a-f]{6}$/i.test(c))return;var r=recentColors().filter(function(x){return x.toLowerCase()!==c.toLowerCase()});r.unshift(c);r=r.slice(0,8);try{localStorage.setItem('pans-recent',JSON.stringify(r))}catch(e){}}
function recentRow(k){var r=recentColors();if(!r.length)return '';return r.map(function(c){return '<i class="swc" data-sk="'+k+'" data-c="'+c+'" style="background:'+c+'" title="Recent '+c+'"></i>'}).join('')}

/* keyboard shortcut overlay */
function kbToggle(on){$('kb').hidden=!on}

$('gsn').classList.toggle('on',window.GRID_SNAP);
$('gsn').onclick=function(){window.GRID_SNAP=!window.GRID_SNAP;this.classList.toggle('on',window.GRID_SNAP);try{localStorage.setItem('pans-snap',window.GRID_SNAP?'1':'0')}catch(e){}};
$('kh').onclick=function(){kbToggle(true)};
$('kb').onclick=function(ev){if(ev.target.id==='kb')kbToggle(false)};
document.addEventListener('keydown',function(ev){var tg=ev.target.tagName;
 if(ev.key==='Escape'&&!$('kb').hidden){kbToggle(false);return}
 if(ev.key==='?'&&tg!=='INPUT'&&tg!=='TEXTAREA'&&tg!=='SELECT')kbToggle($('kb').hidden)});

/* layers: move buttons and double-click to rename */
$('L').addEventListener('click',function(ev){var up=ev.target.closest('[data-up]'),dn=ev.target.closest('[data-down]');
 if(up){moveLayer(up.dataset.up,1);return}
 if(dn){moveLayer(dn.dataset.down,-1);return}});
$('L').addEventListener('dblclick',function(ev){var row=ev.target.closest('.ly');if(!row)return;var e=S().els.filter(function(x){return x.id===row.dataset.id})[0];if(!e)return;
 var n=prompt('Layer name',e.name||e.text||e.type);if(n==null)return;e.name=n.trim();commit();drawAll()});

/* pure: place element `id` directly above element `targetId` in the stacking order */
function reorderTo(els,id,targetId){if(id===targetId)return els.slice();var out=els.slice(),from=out.findIndex(function(e){return e.id===id});if(from<0)return out;var item=out.splice(from,1)[0],to=out.findIndex(function(e){return e.id===targetId});if(to<0)return els.slice();out.splice(to+1,0,item);return out}

/* layers: drag a row onto another row */
var dragLayerId=null;
$('L').addEventListener('dragstart',function(ev){var row=ev.target.closest&&ev.target.closest('.ly');if(!row)return;dragLayerId=row.dataset.id;ev.dataTransfer.setData('text/plain',dragLayerId);ev.dataTransfer.effectAllowed='move'});
$('L').addEventListener('dragover',function(ev){var row=ev.target.closest&&ev.target.closest('.ly');if(!row||!dragLayerId)return;ev.preventDefault();document.querySelectorAll('.ly.drop').forEach(function(x){x.classList.remove('drop')});row.classList.add('drop')});
$('L').addEventListener('dragleave',function(ev){var row=ev.target.closest&&ev.target.closest('.ly');if(row)row.classList.remove('drop')});
$('L').addEventListener('drop',function(ev){var row=ev.target.closest&&ev.target.closest('.ly');if(!row||!dragLayerId)return;ev.preventDefault();
 S().els=reorderTo(S().els,dragLayerId,row.dataset.id);dragLayerId=null;commit();drawAll()});
$('L').addEventListener('dragend',function(){dragLayerId=null;document.querySelectorAll('.ly.drop').forEach(function(x){x.classList.remove('drop')})});

/* canvas pan: hold Space and drag anywhere on the canvas */
var spaceDown=false;
function typingNow(ev){var t=ev.target.tagName;return t==='INPUT'||t==='TEXTAREA'||t==='SELECT'||ev.target.isContentEditable}
document.addEventListener('keydown',function(ev){if(ev.code==='Space'&&!typingNow(ev)){spaceDown=true;document.body.classList.add('space-pan');ev.preventDefault()}});
document.addEventListener('keyup',function(ev){if(ev.code==='Space'){spaceDown=false;document.body.classList.remove('space-pan')}});
$('C').addEventListener('pointerdown',function(ev){if(!spaceDown)return;ev.stopPropagation();ev.preventDefault();
 var C=$('C'),sx=ev.clientX,sy=ev.clientY,L0=C.scrollLeft,T0=C.scrollTop;
 function m(q){C.scrollLeft=L0-(q.clientX-sx);C.scrollTop=T0-(q.clientY-sy)}
 function u(){removeEventListener('pointermove',m);removeEventListener('pointerup',u)}
 addEventListener('pointermove',m);addEventListener('pointerup',u)},true);
