/* ZIP export engine (JSZip) */
$('ex').onclick=async function(){var Z=new JSZip(),n=0,seen={};
 SRC=function(s){if(s.slice(0,5)!=='data:')return s;if(seen[s])return seen[s];var m=/^data:image\/([\w+]+)[^,]*;base64,(.*)$/.exec(s);if(!m)return s;var p='assets/img'+(++n)+'.'+m[1].replace('svg+xml','svg').replace('jpeg','jpg');Z.file(p,m[2],{base64:true});return seen[s]=p};
 Z.file('index.html',page(0));SRC=function(s){return s};
 Z.file('css/styles.css',CSS);Z.file('js/app.js',JS());
 Z.file('README.txt',D.name+'\nExported from Pick A Name Studio.\nOpen index.html in any browser. No server, editor or login needed.\nDeploy by uploading this folder to Netlify, Vercel or GitHub Pages.\nArrow keys / on-screen buttons navigate slides; click the robot and buttons to interact.\n');
 var blob=await Z.generateAsync({type:'blob'}),fn=(D.name||'project').replace(/[^\w-]+/g,'-')+'.zip';
 try{var dl=window.claude&&await claude.use('downloads');if(dl){await dl.save({filename:fn,data:blob});return}}catch(x){if(x&&x.code==='declined')return}
 var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=fn;a.click()};
