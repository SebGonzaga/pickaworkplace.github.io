/* Editor events: add, select, drag, resize, keyboard, device preview */
/* ===== events ===== */
function add(k){var b=CHM[k]?{type:k,w:140,h:168,fill:CHC[k],anim:'float',click:'speech',msg:'Hello! I am your '+k+'!|Click me again!'}:{decor:{type:'decor',x:0,y:0,w:960,h:540,kind:'hearts',n:14,sp:'1'},quiz:{type:'quiz',w:640,h:340,fs:22,color:'#ffffff',text:QD},text:{type:'text',text:'New text',x:80,y:80,w:400,h:70,fs:36},head:{type:'text',text:'Heading',x:80,y:60,w:600,h:90,fs:56,fw:800},button:{type:'button',text:'Click me',w:200,h:60,fs:24,color:'#fff',radius:12,click:'next'},countdown:{type:'countdown',w:200,h:90,fs:48,fw:800,color:'#ffffff',fill:'#ff6fae',n:10},counter:{type:'counter',w:200,h:90,fs:48,fw:800,color:'#ffffff',fill:'#6c5ce7',n:100},accordion:{type:'accordion',w:420,h:200,fs:20,color:'#ffffff',fill:'#2b2d6e',text:'What is a star? | A huge ball of glowing gas.\nWhat is a planet? | A world that orbits a star.'},tabs:{type:'tabs',w:460,h:200,fs:20,color:'#ffffff',fill:'#2b2d6e',text:'Sun | A star at the center.\nEarth | Our home planet.\nMoon | Earth\'s natural satellite.'},progress:{type:'progress',w:360,h:28,fill:'#2ec4b6',n:70},rect:{type:'shape',w:240,h:140,radius:16},circle:{type:'shape',w:160,h:160,radius:80,fill:'#ff6fae'},robot:{type:'robot',w:140,h:168,fill:'#4cc9f0',anim:'float',click:'speech',msg:'Hello! Welcome to our lesson!|Ready for today\'s challenge?'}}[k];
 var e=mk(b);if(k==='decor')S().els.unshift(e);else S().els.push(e);sel=e.id;commit();drawAll()}
$('L').onclick=function(ev){var tg=ev.target.dataset;if(tg.lk||tg.hd){var q=S().els.filter(function(x){return x.id===(tg.lk||tg.hd)})[0];if(tg.lk)q.lock=!q.lock;else q.hid=!q.hid;commit();drawAll();return}var a=ev.target.dataset.a,l=ev.target.closest('.ly');if(a==='image')return $('fi').click();if(a)return add(a);if(l){var id=l.dataset.id;if(ev.shiftKey&&sel){ms=ms.indexOf(id)>-1?ms.filter(function(x){return x!==id}):ms.concat(id);sel=ms[ms.length-1]||null}else sel=id;drawAll()}};
$('fi').onchange=function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){var w=Math.min(400,im.naturalWidth),h=Math.round(w*im.naturalHeight/im.naturalWidth);var e=mk({type:'image',src:r.result,w:w,h:h});S().els.push(e);sel=e.id;commit();drawAll()};im.src=r.result};r.readAsDataURL(f);this.value=''};
$('P').addEventListener('input',function(ev){var t=ev.target,k=t.dataset.k,e=E();if(!k||!e)return;e[k]=(t.dataset.t==='n'||t.dataset.t==='r')?+t.value:t.value;drawStage();if(k==='click'||false)0});
$('P').addEventListener('change',function(ev){if(ev.target.dataset.k){commit();if(ev.target.dataset.k==='click')drawProps()}});
$('B').onclick=function(ev){var s=ev.target.closest('.sl'),id=ev.target.id;if(s){cur=+s.dataset.i;sel=null;drawAll()}
 if(id==='sa'){D.slides.push({id:uid(),name:'Slide '+(D.slides.length+1),bg:BGS[4],els:[mk({type:'text',text:'New slide',x:60,y:60,w:600,h:90,fs:52,fw:800})]});cur=D.slides.length-1;sel=null;commit();drawAll()}
 if(id==='sd'){var c=JSON.parse(JSON.stringify(S()));c.id=uid();c.name+=' copy';c.els.forEach(function(e){e.id=uid()});D.slides.splice(cur+1,0,c);cur++;sel=null;commit();drawAll()}
 if(id==='sl2'&&cur>0||id==='sr'&&cur<D.slides.length-1){var j=cur+(id==='sr'?1:-1),tm=D.slides[cur];D.slides[cur]=D.slides[j];D.slides[j]=tm;cur=j;commit();drawAll();return}
 if(id==='sx'&&D.slides.length>1){D.slides.splice(cur,1);cur=Math.max(0,cur-1);sel=null;commit();drawAll()}};
$('B').ondblclick=function(ev){var s=ev.target.closest('.sl');if(s){var n=prompt('Rename slide',D.slides[+s.dataset.i].name);if(n){D.slides[+s.dataset.i].name=n;commit();drawBar()}}};
$('nm').oninput=function(){D.name=this.value};$('nm').onchange=commit;
$('st').onpointerdown=function(ev){if(ev.target.isContentEditable)return;var h=ev.target.dataset.h,el=ev.target.closest('.el');if(!el){marq(ev);return}
 var e=S().els.filter(function(x){return x.id===el.dataset.id})[0],sx=ev.clientX,sy=ev.clientY,o={x:e.x,y:e.y,w:e.w,h:e.h},moved=0,r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
 if(ev.shiftKey){ms=ms.indexOf(e.id)>-1?ms.filter(function(i){return i!==e.id}):ms.concat(e.id);sel=ms[ms.length-1]||null;drawAll();ev.preventDefault();return}
 if(ms.indexOf(e.id)<0&&e.g)ms=S().els.filter(function(x){return x.g===e.g}).map(function(x){return x.id});
 sel=e.id;drawStage();drawLayers();drawProps();ev.preventDefault();if(e.lock)return;var OO=ms.map(function(id){var z=S().els.filter(function(x){return x.id===id})[0];return{e:z,x:z.x,y:z.y}}).filter(function(p){return !p.e.lock});
 function m(q){var dx=(q.clientX-sx)/sc,dy=(q.clientY-sy)/sc;moved=1;
  if(h&&h!=='r'){var ww=h.indexOf('w')>-1?-1:1,hh=h.indexOf('n')>-1?-1:1,nw=Math.max(20,o.w+dx*ww),nh=Math.max(20,o.h+dy*hh);if(q.shiftKey)nh=Math.max(20,nw*o.h/o.w);e.w=Math.round(nw);e.h=Math.round(nh);if(ww<0)e.x=o.x+o.w-e.w;if(hh<0)e.y=o.y+o.h-e.h}
  else if(h==='r'){e.rot=Math.round(Math.atan2(q.clientY-cy,q.clientX-cx)*180/Math.PI+90)}
  else if(ms.length>1){OO.forEach(function(p){p.e.x=Math.round(p.x+dx);p.e.y=Math.round(p.y+dy)})}else{var nx=o.x+dx,ny=o.y+dy;G.x=G.y=null;[[0,0],[480-e.w/2,480],[960-e.w,960]].forEach(function(t){if(Math.abs(nx-t[0])<6){nx=t[0];G.x=t[1]}});[[0,0],[270-e.h/2,270],[540-e.h,540]].forEach(function(t){if(Math.abs(ny-t[0])<6){ny=t[0];G.y=t[1]}});e.x=Math.round(nx);e.y=Math.round(ny)}drawStage()}
 function u(){removeEventListener('pointermove',m);removeEventListener('pointerup',u);G.x=G.y=null;if(moved){commit();drawStage();drawProps()}}
 addEventListener('pointermove',m);addEventListener('pointerup',u)};
addEventListener('keydown',function(ev){var t=ev.target.tagName;if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT'||mode!=='edit')return;
 if((ev.key==='Delete'||ev.key==='Backspace')&&sel){ev.preventDefault();del()}
 if((ev.ctrlKey||ev.metaKey)&&(ev.key==='c'||ev.key==='x')&&sel){window.CB=JSON.stringify(S().els.filter(function(x){return ms.indexOf(x.id)>-1}));if(ev.key==='x')del()}
 if((ev.ctrlKey||ev.metaKey)&&ev.key==='v'&&window.CB){ev.preventDefault();var pe=JSON.parse(window.CB),gm={},nn=[];pe.forEach(function(c){c.id=uid();c.x+=24;c.y+=24;if(c.g){gm[c.g]=gm[c.g]||uid();c.g=gm[c.g]}S().els.push(c);nn.push(c.id)});window.CB=JSON.stringify(pe);sel=nn[nn.length-1];ms=nn;commit();drawAll()}
 if(ev.key==='Escape'&&sel){sel=null;drawAll()}
 if((ev.ctrlKey||ev.metaKey)&&ev.key==='a'){ev.preventDefault();ms=S().els.filter(function(x){return x.type!=='decor'&&!x.hid}).map(function(x){return x.id});sel=ms[ms.length-1]||null;drawAll()}
 if((ev.ctrlKey||ev.metaKey)&&ev.key.toLowerCase()==='g'){ev.preventDefault();grp(!ev.shiftKey)}
 if(sel&&ev.key.indexOf('Arrow')===0){ev.preventDefault();var d=ev.shiftKey?10:1;S().els.forEach(function(ne){if(ms.indexOf(ne.id)<0)return;if(ev.key==='ArrowLeft')ne.x-=d;if(ev.key==='ArrowRight')ne.x+=d;if(ev.key==='ArrowUp')ne.y-=d;if(ev.key==='ArrowDown')ne.y+=d});drawStage();clearTimeout(window.NT);window.NT=setTimeout(function(){commit();drawProps()},400)}
 if((ev.ctrlKey||ev.metaKey)&&ev.key==='d'){ev.preventDefault();dup()}
 if((ev.ctrlKey||ev.metaKey)&&ev.key==='z'){ev.preventDefault();load(ev.shiftKey?hi+1:hi-1)}
 if((ev.ctrlKey||ev.metaKey)&&ev.key==='y'){ev.preventDefault();load(hi+1)}});
$('un').onclick=function(){load(hi-1)};$('re').onclick=function(){load(hi+1)};
var W={d:'100%',t:'820px',m:'390px'};
function setMode(m){mode=m;document.querySelectorAll('[data-m]').forEach(function(b){b.classList.toggle('on',b.dataset.m===m)});
 $('sw').style.display=m==='edit'?'':'none';$('pv').hidden=m==='edit';
 if(m!=='edit'){$('fr').srcdoc=page(1);$('fr').style.width=W[m];$('hint').textContent=m==='m'?'Mobile (≤767px): elements stack vertically in reading order and fonts rescale.':m==='t'?'Tablet (768–1023px): layout stays proportional with a minimum text size.':'Desktop (≥1024px)';sel=null}else{$('hint').textContent='';drawAll()}fit()}
document.querySelectorAll('[data-m]').forEach(function(b){b.onclick=function(){setMode(b.dataset.m)}});
$('pr').onclick=function(){setMode('d');$('fr').style.width='100%';try{$('fr').requestFullscreen()}catch(x){}setTimeout(function(){$('fr').focus()},200)};
