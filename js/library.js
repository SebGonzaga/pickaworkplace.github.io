/* Object library: tabbed add panel (shapes, stickers, characters, widgets) */
var libTab='basics';
var LIB_TABS=[['basics','Basics'],['shapes','Shapes'],['stickers','Stickers'],['chars','Characters'],['widgets','Widgets'],['layers','Layers']];
var LIB_SHAPES=[['rect','Rectangle','#ff7eb6'],['circle','Circle','#ffb86b'],['tri','Triangle','#ffd93d'],['star','Star','#7be495'],['diamond','Diamond','#4cc9f0'],['hex','Hexagon','#8f7bff'],['pent','Pentagon','#ff6fae'],['arrow','Arrow','#2ec4b6'],['cross','Cross','#ff9f5a'],['blob','Blob','#b8a8ff'],['ring','Ring','#ffd166'],['heart','Heart','#ff5d73']];
var LIB_STK=[['School',['📚','✏️','🎒','📐','🔬','🧪','🌍','🧮','🖍️','🎨','🏆','🔎']],['Fun',['🎈','🎁','🎂','🎉','🎯','🚀','🌈','☀️','🌙','⭐','🔥','💡']],['Nature',['🌱','🌻','🍎','🐠','🦋','🌵','🍄','🌊','⛅','❄️','🌳','🐝']],['Signs',['👉','✅','❌','❓','❗','💬','📌','🔔','👏','💯','➡️','🙌']]];
var LIB_WID=[['quiz','❓','Quiz'],['countdown','⏱','Timer'],['counter','🔢','Counter'],['accordion','📂','Accordion'],['tabs','🗂','Tabs'],['progress','📊','Progress bar']];
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function libTabs(){return '<div class="libtabs">'+LIB_TABS.map(function(t){return '<button class="ltab'+(libTab===t[0]?' on':'')+'" data-tab="'+t[0]+'">'+t[1]+'</button>'}).join('')+'</div>'}
function lcard(k,icon,label){return '<button class="lib" data-a="'+k+'"><span class="li">'+icon+'</span><span>'+label+'</span></button>'}
function lrow(k,icon,label){return '<button class="librow" data-a="'+k+'"><span class="li">'+icon+'</span><span>'+label+'</span></button>'}
function libPanel(){
 if(libTab==='shapes')return '<h4>Shapes</h4><div class="lgrid">'+LIB_SHAPES.map(function(s){return '<button class="lib" data-a="sh:'+s[0]+'"><span class="li">'+inner({type:'shape',sk:s[0],fill:s[2],radius:0})+'</span><span>'+s[1]+'</span></button>'}).join('')+'</div><p class="mu">Click to add. Drag to move, corner to resize, round handle to rotate.</p>';
 if(libTab==='stickers')return LIB_STK.map(function(g){return '<h4>'+g[0]+'</h4><div class="egrid">'+g[1].map(function(e){return '<button class="em" data-a="st:'+e+'" title="'+e+'">'+e+'</button>'}).join('')+'</div>'}).join('')+'<p class="mu">Stickers are emoji you can resize like shapes.</p>';
 if(libTab==='chars')return '<h4>Characters</h4><div class="lgrid">'+Object.keys(CHM).map(function(k){return lcard(k,CHM[k],cap(k))}).join('')+'</div>';
 if(libTab==='widgets')return '<h4>Widgets</h4><div class="lstack">'+LIB_WID.map(function(w){return lrow(w[0],w[1],w[2])}).join('')+'</div><h4>Living decor</h4><div class="lstack">'+Object.keys(DK).map(function(k){return lrow('dc:'+k,DK[k][0],cap(k))}).join('')+'</div><p class="mu">Living decor sits behind your other objects.</p>';
 return '<h4>Add</h4><div class="lgrid">'+lcard('text','Aa','Text')+lcard('head','H','Heading')+lcard('button','▶','Button')+lcard('image','🖼','Image')+'</div><p class="mu">Click to add to the slide. Drag to move.</p>';
}
function addLib(k){var b,dec=false;
 if(k.indexOf('sh:')===0){var sk=k.slice(3),d=LIB_SHAPES.filter(function(s){return s[0]===sk})[0]||LIB_SHAPES[0];b={type:'shape',sk:sk,fill:d[2],radius:sk==='rect'?16:0,w:(sk==='rect'||sk==='arrow')?260:200,h:sk==='rect'?160:(sk==='arrow'?140:200)}}
 else if(k.indexOf('st:')===0){b={type:'sticker',text:k.slice(3),w:160,h:160,fs:120}}
 else if(k.indexOf('dc:')===0){b={type:'decor',x:0,y:0,w:960,h:540,kind:k.slice(3),n:14,sp:'1'};dec=true}
 else return false;
 var e=mk(b);if(dec)S().els.unshift(e);else S().els.push(e);sel=e.id;commit();drawAll();return true}
$('L').addEventListener('click',function(ev){var t=ev.target.closest('[data-tab]');if(t){libTab=t.dataset.tab;drawLayers()}});
