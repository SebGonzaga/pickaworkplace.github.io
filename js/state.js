/* Document model, default project, undo/redo history, autosave */
/* ===== document + state ===== */
var BGS=['linear-gradient(135deg,#dff6ff,#e8e4ff)','linear-gradient(135deg,#ffe3ec,#fff3d6)','linear-gradient(135deg,#0f2027,#2c5364)','linear-gradient(135deg,#d4fc79,#96e6a1)','#ffffff'];
function mk(b){return Object.assign({id:uid(),rot:0,op:1,anim:'none',click:'none',msg:'',fs:24,color:'#1b1b2f',fill:'#6c5ce7',radius:0,text:'',al:'left',fw:600,x:100,y:100,w:200,h:100},b)}
var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260"><rect width="400" height="260" fill="#8fd3ff"/><circle cx="310" cy="70" r="36" fill="#ffd54a"/><path d="M0 200 Q100 110 200 190 T400 170 V260 H0Z" fill="#5fc27a"/><path d="M0 235 Q120 180 240 230 T400 215 V260 H0Z" fill="#3fa163"/></svg>';
var IMG='data:image/svg+xml;base64,'+btoa(svg);
function def(){return{name:'My first lesson',slides:[
 {id:uid(),name:'Welcome',bg:BGS[0],els:[
  mk({type:'decor',x:0,y:0,w:960,h:540,kind:'hearts',n:12,sp:'1'}),
  mk({type:'shape',x:560,y:300,w:300,h:300,fill:'#ffffff88',radius:150,anim:'pulse'}),
  mk({type:'text',text:'Welcome to Space Class',x:60,y:90,w:560,h:150,fs:56,fw:800,color:'#2b2d6e'}),
  mk({type:'text',text:'An interactive lesson you can click, tap and explore.',x:60,y:260,w:500,h:80,fs:24,fw:500,color:'#4a4d8a'}),
  mk({type:'image',src:IMG,x:60,y:370,w:240,h:156,radius:16}),
  mk({type:'robot',x:690,y:170,w:150,h:180,fill:'#4cc9f0',anim:'float',drag:'free',click:'speech',msg:"Hello! Welcome to our lesson!|Ready for today's challenge?|Press Next to begin!"}),
  mk({type:'button',text:'Start lesson →',x:360,y:410,w:230,h:62,fs:24,color:'#fff',radius:14,click:'next'})]},
 {id:uid(),name:'Quiz',bg:BGS[2],els:[
  mk({type:'text',text:'Which planet is known as the Red Planet?',x:60,y:60,w:840,h:100,fs:44,fw:800,color:'#fff'}),
  mk({type:'button',text:'Venus',x:60,y:220,w:240,h:70,fs:28,fill:'#ff6fae',color:'#fff',radius:14,click:'speech',msg:'Not quite. Try again!'}),
  mk({type:'button',text:'Mars',x:330,y:220,w:240,h:70,fs:28,fill:'#2ec4b6',color:'#fff',radius:14,click:'speech',msg:'🎉 Correct! Great job!'}),
  mk({type:'button',text:'Jupiter',x:600,y:220,w:240,h:70,fs:28,fill:'#ffb703',color:'#222',radius:14,click:'speech',msg:'Nope, try again!'}),
  mk({type:'robot',x:70,y:340,w:120,h:144,fill:'#b8a8ff',anim:'bounce',click:'speech',msg:'You can do it!|Tap an answer above.'}),
  mk({type:'button',text:'← Back',x:700,y:430,w:180,h:56,fs:22,fill:'#ffffff22',color:'#fff',radius:12,click:'prev'})]}]}}
var D,cur=0,sel=null,ms=[],sc=1,H=[],hi=-1,mode='edit',G={x:null,y:null};
try{D=JSON.parse(localStorage.getItem('pans-doc'))}catch(x){}if(!D||!D.slides)D=def();
var S=function(){return D.slides[cur]},E=function(){return S().els.filter(function(e){return e.id===sel})[0]};
function commit(){drawBar();H=H.slice(0,hi+1);H.push(JSON.stringify(D));if(H.length>80)H.shift();hi=H.length-1;save()}
function save(){try{localStorage.setItem('pans-doc',JSON.stringify(D));$('sv').textContent='✓ Saved locally'}catch(x){$('sv').textContent='Not saved'}}
function load(n){if(n<0||n>=H.length)return;hi=n;D=JSON.parse(H[n]);if(cur>=D.slides.length)cur=D.slides.length-1;if(!E())sel=null;drawAll();save()}
