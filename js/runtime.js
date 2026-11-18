/* Independent runtime shipped inside exports (+ page/CSS generators) */
/* ===== independent runtime (shipped in exports) ===== */
/* Magic Move: how far an element must move and scale to start where it was on the previous slide.
   a = old screen rect, b = new screen rect, k = screen-to-layout scale (stage zoom). */
function morphDelta(a,b,k){k=k||1;return{dx:(a.left-b.left)/k,dy:(a.top-b.top)/k,sx:b.width?a.width/b.width:1,sy:b.height?a.height/b.height:1}}
function rt(){var S=[].slice.call(document.querySelectorAll('.slide')),i=0,bar=document.getElementById('bar'),cnt=document.getElementById('cnt');
 function ini(s){s.querySelectorAll('.pb i').forEach(function(b){b.style.transition='none';b.style.width='0';void b.offsetWidth;b.style.transition='';b.style.width=Math.min(100,+b.dataset.n||0)+'%'});s.querySelectorAll('.cd').forEach(function(c){clearInterval(c._t);var n=+c.dataset.n;c.textContent=n;c._t=setInterval(function(){n=Math.max(0,n-1);c.textContent=n;if(!n){clearInterval(c._t);c.textContent='⏰ 0'}},1000)});s.querySelectorAll('.cn').forEach(function(c){clearInterval(c._t);var to=+c.dataset.n,t0=Date.now();c._t=setInterval(function(){var p=Math.min(1,(Date.now()-t0)/1200);c.textContent=Math.round(to*p);if(p>=1)clearInterval(c._t)},40)})}
 function pop(t){var o=document.createElement('div');o.className='pop';o.innerHTML='<div><p></p><button>Close</button></div>';o.querySelector('p').textContent=t;o.onclick=function(e){if(e.target===o||e.target.tagName==='BUTTON')o.remove()};document.body.appendChild(o)}
 function show(n){var from={},calm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;if(!calm&&S[i])S[i].querySelectorAll('[data-mg]').forEach(function(x){from[x.dataset.mg]=x.getBoundingClientRect()});S.forEach(function(s){s.querySelectorAll('.gone').forEach(function(x){x.classList.remove('gone');Array.from(x.classList).filter(function(c){return c.indexOf('ex-')===0}).forEach(function(c){x.classList.remove(c)})})});i=Math.max(0,Math.min(S.length-1,n));S.forEach(function(s,k){s.classList.toggle('on',k===i)});bar.style.width=(i+1)/S.length*100+'%';cnt.textContent=(i+1)+' / '+S.length;ini(S[i]);if(!calm)S[i].querySelectorAll('[data-mg]').forEach(function(x){var a=from[x.dataset.mg];if(!a||!x.animate)return;var b=x.getBoundingClientRect(),k=x.offsetWidth?b.width/x.offsetWidth:1,d=morphDelta(a,b,k);x.animate([{transform:'translate('+d.dx+'px,'+d.dy+'px) scale('+d.sx+','+d.sy+')',transformOrigin:'0 0'},{transform:'translate(0px,0px) scale(1,1)',transformOrigin:'0 0'}],{duration:900,easing:'cubic-bezier(.2,.8,.2,1)'})})}
 document.getElementById('prev').onclick=function(){show(i-1)};document.getElementById('next').onclick=function(){show(i+1)};
 addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key===' ')show(i+1);if(e.key==='ArrowLeft')show(i-1)});
 document.addEventListener('click',function(ev){var tbn=ev.target.closest('.tbh button');if(tbn){var tb=tbn.closest('.tb'),k=[].indexOf.call(tbn.parentNode.children,tbn);[].forEach.call(tbn.parentNode.children,function(x,j){x.classList.toggle('on',j===k)});[].forEach.call(tb.querySelectorAll('.tbp'),function(x,j){x.hidden=j!==k})}var el=ev.target.closest('.el[data-click]');if(!el||el._m)return;var c=el.dataset.click;
  if(c==='next')show(i+1);else if(c==='prev')show(i-1);else if(c==='popup'){pop(el.dataset.msg||'')}else if(c==='link'){var u=el.dataset.msg||'';if(/^https?:\/\//i.test(u))window.open(u,'_blank','noopener')}else if(c==='exit'){var xc=el.dataset.ex||'fade';el.classList.add('ex-'+xc);setTimeout(function(){el.classList.add('gone')},600)}else if(c==='speech'){var m=(el.dataset.msg||'').split('|'),k=+(el.dataset.k||0),b=el.querySelector('.bub');
   if(k>=m.length){b.classList.remove('show');el.dataset.k=0;return}
   b.textContent=m[k];b.classList.add('show');el.dataset.k=k+1;el.classList.remove('jump');void el.offsetWidth;el.classList.add('jump')}});
 document.addEventListener('quiz',function(e){S[i].querySelectorAll('.el.chr').forEach(function(el){var b=el.querySelector('.bub');if(b){b.textContent=e.detail?'Great job! 🎉':'Keep trying!';b.classList.add('show')}el.classList.remove('jump');void el.offsetWidth;el.classList.add('jump')})});
 document.addEventListener('pointerdown',function(ev){var el=ev.target.closest('.el[data-drag]');if(!el||ev.target.closest('.qz')||ev.target.closest('.rz'))return;var sx=ev.clientX,sy=ev.clientY,ox=+el.dataset.ox||0,oy=+el.dataset.oy||0,nx=ox,ny=oy,mv=0,z=el.style.zIndex;el.style.zIndex=500;el.style.transition='';
  function m(q){var dx=q.clientX-sx,dy=q.clientY-sy;if(Math.abs(dx)+Math.abs(dy)>4)mv=1;nx=ox+dx;ny=oy+dy;el.style.translate=nx+'px '+ny+'px'}
  function u(){removeEventListener('pointermove',m);removeEventListener('pointerup',u);removeEventListener('pointercancel',u);el.style.zIndex=z;
   if(el.dataset.drag==='back'){el.style.transition='translate .35s';el.style.translate='0px 0px';nx=0;ny=0}
   el.dataset.ox=nx;el.dataset.oy=ny;if(mv){el._m=1;setTimeout(function(){el._m=0},80)}}
  addEventListener('pointermove',m);addEventListener('pointerup',u);addEventListener('pointercancel',u)});
 document.addEventListener('pointerdown',function(ev){var g=ev.target.closest('.rz');if(!g)return;ev.preventDefault();var el=g.parentNode,r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,s0=+el.dataset.s||1,d0=Math.hypot(ev.clientX-cx,ev.clientY-cy)||1;
  function m(q){var s=Math.max(.3,Math.min(4,s0*Math.hypot(q.clientX-cx,q.clientY-cy)/d0));el.dataset.s=s;el.style.scale=s}
  function u(){removeEventListener('pointermove',m);removeEventListener('pointerup',u);removeEventListener('pointercancel',u);el._m=1;setTimeout(function(){el._m=0},80)}
  addEventListener('pointermove',m);addEventListener('pointerup',u);addEventListener('pointercancel',u)});
 document.addEventListener('click',function(ev){if(!ev.target.closest('.el[data-click],.qb'))return;for(var k=0;k<6;k++){var s=document.createElement('span'),a=k/6*6.28;s.className='spk';s.textContent=['✨','💖','⭐'][k%3];s.style.left=ev.clientX+'px';s.style.top=ev.clientY+'px';s.style.setProperty('--dx',Math.cos(a)*50+'px');s.style.setProperty('--dy',Math.sin(a)*50+'px');document.body.appendChild(s);setTimeout(function(x){x.remove()},700,s)}});
 document.querySelectorAll('.qz').forEach(qz);show(0)}
function qz(r){var Q=r.dataset.qs.split('\n').map(function(l){var p=l.split('|').map(function(s){return s.trim()});return{q:p[0],o:p.slice(1).map(function(s){return s.replace(/\*$/,'')}),a:p.slice(1).findIndex(function(s){return /\*$/.test(s)})}}).filter(function(x){return x.q&&x.o.length>1}),i=0,sc=0,ed=!!r.closest('#st');
 function es(s){return s.replace(/[&<>"]/g,function(c){return '&#'+c.charCodeAt(0)+';'})}
 function draw(){if(i>=Q.length){r.innerHTML='<h3>🎉 All done!</h3><p>Score: '+sc+' / '+Q.length+'</p><button class="qb" data-r="1">Restart</button>';return}
  var x=Q[i];r.innerHTML='<small>Question '+(i+1)+' of '+Q.length+'</small><h3>'+es(x.q)+'</h3>'+x.o.map(function(o,k){return '<button class="qb" data-k="'+k+'">'+es(o)+'</button>'}).join('')+'<p class="qf"></p>'}
 if(!ed)r.onclick=function(ev){var b=ev.target.closest('button');if(!b)return;
  if(b.dataset.r){i=0;sc=0;r.dataset.done='';draw();return}
  if(b.dataset.n){i++;draw();return}
  var k=+b.dataset.k,x=Q[i];if(r.dataset.done==='q'+i)return;r.dataset.done='q'+i;
  var ok=k===x.a;if(ok)sc++;b.classList.add(ok?'ok':'no');if(!ok&&x.a>=0)r.querySelector('[data-k="'+x.a+'"]').classList.add('ok');
  r.querySelector('.qf').innerHTML=(ok?'🎉 Correct! Great job!':'Not quite. Keep going!')+' <button class="qb nx" data-n="1">'+(i+1<Q.length?'Next →':'Finish')+'</button>';
  document.dispatchEvent(new CustomEvent('quiz',{detail:ok}))};
 draw()}
function JS(){return 'var qz='+qz+';'+morphDelta+';('+rt+')();'}
var RTCSS='*{box-sizing:border-box}html,body{margin:0;height:100%;background:#000;font-family:Nunito,ui-rounded,system-ui,sans-serif}'
+'.deck{position:relative;width:100%;height:100vh;display:grid;place-items:center;overflow:hidden}'
+'.slide{display:none;position:relative;width:min(100vw,calc(100vh*16/9));aspect-ratio:16/9;container-type:inline-size;overflow:hidden}.slide.on{display:block}'
+'nav{position:fixed;bottom:10px;left:50%;transform:translateX(-50%);display:flex;gap:10px;align-items:center;background:#000a;color:#fff;padding:6px 12px;border-radius:30px;z-index:200}'
+'nav button{background:none;border:0;color:#fff;font-size:20px;cursor:pointer;min-width:36px;min-height:36px}.pg{position:fixed;top:0;left:0;right:0;height:4px;z-index:200}.pg i{display:block;height:100%;background:#7c6cff;transition:width .3s}'
+'@media(min-width:768px) and (max-width:1023px){.el .t,.el .btn{font-size:max(1em,15px)}}'
+'@media(max-width:767px){html,body{height:auto;overflow-x:hidden;background:#111}.deck{height:auto;display:block}nav,.pg{display:none}'
+'.slide{display:flex!important;flex-direction:column;align-items:center;gap:16px;width:100%;aspect-ratio:auto;min-height:100vh;padding:24px 18px}'
+'.el{position:relative!important;left:auto!important;top:auto!important;width:min(100%,calc(var(--w)*1px))!important;height:auto!important;transform:none!important;font-size:clamp(16px,calc(var(--fs)*.65px),44px)!important}'
+'.el.nt{aspect-ratio:var(--ar)}.el.dec{position:fixed!important;left:0!important;top:0!important;width:100%!important;height:100%!important;aspect-ratio:auto;z-index:0!important}.btn{min-height:48px}.t{text-align:center!important}}'
+'@media(max-width:767px){.el.hm{display:none!important}}@media(min-width:768px) and (max-width:1023px){.el.ht{display:none!important}}@media(prefers-reduced-motion:reduce){.el,.el *{animation-duration:.01ms!important;animation-iteration-count:1!important}}';
var CSS=RT_STYLES+RTCSS;
function body(){return '<div class="deck">'+D.slides.map(function(s){var o=s.els.map(function(e,i){return[e,i]}).sort(function(a,b){return a[0].y-b[0].y||a[0].x-b[0].x});
 return '<section class="slide'+(s.tr&&s.tr!=='none'?' tr-'+s.tr:'')+'" style="background:'+s.bg+'">'+o.map(function(p){return wrap(p[0],1,p[1]+1,0)}).join('')+'</section>'}).join('')+'</div><nav><button id="prev" aria-label="Previous">‹</button><span id="cnt"></span><button id="next" aria-label="Next">›</button></nav><div class="pg"><i id="bar"></i></div>'}
function page(inl){return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(D.name)+'</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;700;800&family=Poppins:wght@500;700;800&family=DM+Serif+Display&family=Space+Grotesk:wght@500;700&display=swap">'+(inl?'<style>'+CSS+'</style>':'<link rel="stylesheet" href="css/styles.css">')+'</head><body>'+body()+(inl?'<script>'+JS()+'<\/script>':'<script src="js/app.js"><\/script>')+'</body></html>'}
