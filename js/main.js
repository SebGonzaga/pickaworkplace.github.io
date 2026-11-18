/* Boot */
addEventListener('resize',fit);commit();drawAll();fit();setTimeout(fit,50);
/* theme: dark by default, remembered in this browser */
function applyTheme(t){document.documentElement.setAttribute('data-theme',t);$('th').textContent=t==='light'?'☾':'☀';try{localStorage.setItem('pans-theme',t)}catch(e){}}
$('th').onclick=function(){applyTheme(document.documentElement.getAttribute('data-theme')==='light'?'dark':'light')};
applyTheme((function(){try{return localStorage.getItem('pans-theme')==='light'?'light':'dark'}catch(e){return 'dark'}})());
