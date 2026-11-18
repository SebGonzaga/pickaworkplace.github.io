/* Runtime CSS shared by the editor canvas and every exported project (exported as css/styles.css). */
var RT_STYLES=`.el{position:absolute;box-sizing:border-box}.fx{width:100%;height:100%;display:flex;align-items:center;justify-content:center}
.t{width:100%;line-height:1.2;white-space:pre-wrap;overflow-wrap:anywhere}.sh{width:100%;height:100%}.im{width:100%;height:100%;object-fit:cover;display:block}
.btn{width:100%;height:100%;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-weight:700;cursor:pointer;padding:.3em .8em;text-align:center}
.bub{display:none;position:absolute;bottom:104%;left:50%;transform:translateX(-50%);width:max-content;max-width:240px;background:#fff;color:#222;padding:10px 16px;border-radius:22px;border:3px solid #ffc2dd;font:700 16px/1.3 Nunito,system-ui,sans-serif;box-shadow:0 6px 18px #0004;z-index:99;text-align:center}
.bub:after{content:"";position:absolute;top:100%;left:50%;margin-left:-8px;border:8px solid transparent;border-top-color:#fff}.bub.show{display:block}
.eye{transform-box:fill-box;transform-origin:center;animation:blink 4s infinite}.arm{transform-box:fill-box;transform-origin:50% 5%}
@keyframes blink{0%,92%,100%{transform:scaleY(1)}96%{transform:scaleY(.1)}}
@keyframes float{50%{transform:translateY(-16px)}}@keyframes pulse{50%{transform:scale(1.1)}}@keyframes spin{to{transform:rotate(360deg)}}
@keyframes bounce{0%,100%{transform:translateY(0)}40%{transform:translateY(-26px)}}@keyframes wob{25%{transform:rotate(-6deg)}75%{transform:rotate(6deg)}}
@keyframes jump{40%{transform:translateY(-34px) scale(1.06)}}@keyframes wave{25%{transform:rotate(-50deg)}75%{transform:rotate(30deg)}}
.a-float .fx{animation:float 3s ease-in-out infinite}.a-pulse .fx{animation:pulse 2s ease-in-out infinite}.a-spin .fx{animation:spin 6s linear infinite}
.a-bounce .fx{animation:bounce 1.4s infinite}.a-wobble .fx{animation:wob 2s ease-in-out infinite}
.jump .fx{animation:jump .5s}.jump .arm{animation:wave .6s 2}
.qz{width:100%;height:100%;box-sizing:border-box;border-radius:18px;padding:1.1em;overflow:auto;display:flex;flex-direction:column;gap:.45em;text-align:left;font-weight:500}.qz h3{margin:.15em 0;font-size:1.3em}.qz p{margin:.2em 0}.qz small{opacity:.7}
.qb{background:#ffffff22;color:inherit;border:2px solid #ffffff55;border-radius:10px;padding:.55em .9em;font:inherit;cursor:pointer;text-align:left;min-height:44px}.qb.ok{background:#2ec4b6;border-color:#2ec4b6;color:#fff}.qb.no{background:#ff5d73;border-color:#ff5d73;color:#fff}.qb.nx{display:inline-block;margin-left:.5em;min-height:0}
.el[data-drag]{cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none}.el[data-drag]:active{cursor:grabbing}
.chr .fx svg{animation:breathe 3s ease-in-out infinite;transform-origin:50% 100%}.chr:hover .fx svg{animation:wob .6s}@keyframes breathe{50%{transform:scale(1.035,.965)}}
.dc{position:absolute;inset:0;overflow:hidden;pointer-events:none}.el.dec{pointer-events:none}.el.dec .hd{pointer-events:auto}.pt{position:absolute;top:-10%;animation:fall linear infinite;opacity:.85}.dc.up .pt{top:auto;bottom:-10%;animation-name:rise}
@keyframes fall{0%{top:-10%;transform:translateX(0) rotate(0)}50%{transform:translateX(16px) rotate(25deg)}100%{top:105%;transform:translateX(-8px) rotate(-15deg)}}
@keyframes rise{0%{bottom:-10%;transform:translateX(0)}50%{transform:translateX(14px) scale(1.15)}100%{bottom:105%;transform:translateX(-8px)}}
.spk{position:fixed;pointer-events:none;font-size:18px;z-index:999;margin:-9px 0 0 -9px;animation:pop .7s ease-out forwards}@keyframes pop{to{transform:translate(var(--dx),var(--dy)) scale(.3);opacity:0}}
.btn{box-shadow:0 4px 0 #0003;transition:transform .15s}.btn:hover{transform:translateY(-2px) scale(1.04)}.btn:active{transform:translateY(2px)}
[class*=en-]{animation-duration:.8s;animation-fill-mode:backwards;animation-delay:var(--dl,0s)}.en-fade{animation-name:efade}.en-slide{animation-name:eslide;animation-timing-function:cubic-bezier(.2,.9,.3,1.2)}.en-zoom{animation-name:ezoom;animation-timing-function:cubic-bezier(.2,.9,.3,1.4)}.en-rise{animation-name:erise}
@keyframes efade{from{opacity:0}}@keyframes eslide{from{opacity:0;translate:-80px 0}}@keyframes ezoom{from{opacity:0;scale:.3}}@keyframes erise{from{opacity:0;translate:0 60px}}
.hv-jump:hover .fx{animation:jump .5s}.hv-wiggle:hover .fx{animation:wob .6s infinite}
.rz{position:absolute;right:-12px;bottom:-12px;width:24px;height:24px;border-radius:50%;background:#7c6cffdd;border:2px solid #fff;cursor:nwse-resize;touch-action:none;z-index:60}
@keyframes dance{0%,100%{transform:rotate(-8deg)}25%{transform:rotate(8deg) translateY(-14px)}50%{transform:rotate(-8deg)}75%{transform:rotate(8deg) translateY(-14px)}}
@keyframes walk{0%,100%{transform:translateX(-30px)}50%{transform:translateX(30px)}}
@keyframes swing{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(10deg)}}
.a-dance .fx{animation:dance .9s ease-in-out infinite}.a-walk .fx{animation:walk 4s ease-in-out infinite}.a-swing .fx{animation:swing 2s ease-in-out infinite;transform-origin:50% 0}
.wd{width:100%;height:100%;display:flex;align-items:center;justify-content:center;border-radius:18px}.ac{width:100%;height:100%;overflow:auto;border-radius:18px;padding:.6em}.ac details{border-bottom:1px solid #ffffff44;padding:.4em .2em}.ac summary{cursor:pointer;font-weight:800;min-height:32px}.ac p{margin:.3em 0 .5em}
.pb{width:100%;height:100%;border-radius:99px;overflow:hidden}.pb i{display:block;height:100%;border-radius:99px;transition:width 1.2s ease-out}.tb{width:100%;height:100%;border-radius:18px;padding:.6em;overflow:auto;display:flex;flex-direction:column;gap:.5em}.tbh{display:flex;gap:6px;flex-wrap:wrap}.tbh button{background:#ffffff22;color:inherit;border:0;border-radius:10px;padding:.4em .9em;font:inherit;font-weight:800;cursor:pointer;min-height:40px}.tbh button.on{background:#ffffff55}.tbp[hidden]{display:none}
.en-bounce{animation-name:ebounce}.en-flip{animation-name:eflip}.en-turn{animation-name:eturn}@keyframes ebounce{0%{opacity:0;translate:0 -140px}55%{opacity:1;translate:0 18px}75%{translate:0 -10px}100%{translate:0 0}}@keyframes eflip{from{opacity:0;scale:0 1}}@keyframes eturn{from{opacity:0;rotate:-180deg;scale:.3}}
.pop{position:fixed;inset:0;background:#000a;display:grid;place-items:center;z-index:1000}.pop>div{background:#fff;color:#222;border-radius:20px;padding:22px 26px;max-width:min(420px,90vw);font:700 18px/1.4 Nunito,system-ui,sans-serif;text-align:center}.pop button{margin-top:10px;background:#7c6cff;color:#fff;border:0;border-radius:12px;padding:10px 20px;font:inherit;cursor:pointer;min-height:44px}
.a-glow .fx{animation:kglow 2.4s ease-in-out infinite}@keyframes kglow{50%{filter:drop-shadow(0 0 14px #ffd93dcc) brightness(1.15)}}
.a-shake .fx{animation:kshake .5s linear infinite}@keyframes kshake{25%{transform:translate(-2px,1px)}50%{transform:translate(2px,-1px)}75%{transform:translate(-1px,-2px)}}
.a-wave .fx{animation:wave 2.4s ease-in-out infinite;transform-origin:50% 100%}
.en-rotate{animation-name:erot}@keyframes erot{from{opacity:0;rotate:-360deg}}
.en-scale{animation-name:escl}@keyframes escl{from{opacity:0;scale:.6}}
.ex-fade{animation-name:xfade;animation-duration:.5s;animation-fill-mode:forwards;animation-timing-function:ease-in}@keyframes xfade{to{opacity:0}}
.ex-slide{animation-name:xslide;animation-duration:.5s;animation-fill-mode:forwards;animation-timing-function:ease-in}@keyframes xslide{to{opacity:0;translate:0 -80px}}
.ex-shrink{animation-name:xshr;animation-duration:.4s;animation-fill-mode:forwards}@keyframes xshr{to{opacity:0;scale:.1}}
.ex-zoom{animation-name:xzoom;animation-duration:.5s;animation-fill-mode:forwards}@keyframes xzoom{to{opacity:0;scale:1.6}}
.ex-rotate{animation-name:xrot;animation-duration:.6s;animation-fill-mode:forwards}@keyframes xrot{to{opacity:0;rotate:360deg;scale:.2}}
.gone{display:none!important}
.hv-wave .fx{transform-origin:50% 100%}.hv-wave:hover .fx{animation:wave 1s ease-in-out infinite}
.hv-grow .fx{transition:transform .2s}.hv-grow:hover .fx{transform:scale(1.1)}
.hv-speech:hover .bub{display:block}
.slide.on.tr-fade{animation:trfade .6s ease both}@keyframes trfade{from{opacity:0}}
.slide.on.tr-slide{animation:trslide .6s cubic-bezier(.2,.8,.2,1) both}@keyframes trslide{from{opacity:0;transform:translateX(60px)}}
.slide.on.tr-zoom{animation:trzoom .6s cubic-bezier(.2,.9,.3,1.2) both}@keyframes trzoom{from{opacity:0;transform:scale(.85)}}
.slide.on.tr-flip{animation:trflip .7s ease both}@keyframes trflip{from{opacity:0;transform:perspective(900px) rotateY(-80deg)}}
@media(max-width:767px){.slide[class*="tr-"]{animation:none!important}}
.ch{width:100%;display:flex;flex-direction:column;justify-content:center;gap:.6em}.cr{display:grid;grid-template-columns:28% 1fr 12%;align-items:center;gap:.6em}.cb{height:1em;border-radius:99px;background:#ffffff22;overflow:hidden}.cb i{display:block;height:100%;border-radius:99px}.cr b{text-align:right}
.tbl{width:100%;border-collapse:collapse;font-size:inherit}.tbl th,.tbl td{padding:.35em .6em;border-bottom:1px solid #ffffff33;text-align:left}.tbl th{color:#fff}
`;
document.getElementById("rt-css").textContent=RT_STYLES;
