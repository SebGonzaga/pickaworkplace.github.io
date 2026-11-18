/* Original templates with custom slide builders (inspired by popular template styles, all designed from scratch) */
function TX(s,x,y,w,h,fs,fw,c,o,ff){return mk(Object.assign({type:'text',text:s,x:x,y:y,w:w,h:h,fs:fs,fw:fw,color:c,ff:ff||'Poppins'},o||{}))}
function SH(x,y,w,h,f,r,o,sk){return mk(Object.assign({type:'shape',sk:sk||'rect',x:x,y:y,w:w,h:h,fill:f,radius:r||0},o||{}))}
function CHR(k,x,y,w,o){return mk(Object.assign({type:k,x:x,y:y,w:w,h:Math.round(w*1.2),fill:CHC[k],anim:'float',drag:'free',click:'speech',msg:'Hi! Welcome!|Let us begin.'},o||{}))}
function BTN(s,x,y,w,f,k,c){return mk({type:'button',text:s,x:x,y:y,w:w,h:58,fs:20,fw:700,color:c||'#ffffff',fill:f,radius:29,click:k||'none',ff:'Poppins'})}
function STK(e,x,y,s,o){return mk(Object.assign({type:'sticker',text:e,x:x,y:y,w:s,h:s,fs:Math.round(s*.75)},o||{}))}
function DEC(kind,n){return mk({type:'decor',x:0,y:0,w:960,h:540,kind:kind,n:n||12,sp:'1'})}
function QUZ(qs,x,y,w,h,fill,color){return mk({type:'quiz',x:x,y:y,w:w,h:h,fs:21,color:color||'#ffffff',fill:fill||'#1d2050',text:qs})}
function ACC(x,y,w,h,text,fill,color){return mk({type:'accordion',x:x,y:y,w:w,h:h,fs:22,color:color||'#ffffff',fill:fill||'#2b2d6e',text:text})}
function TAB(x,y,w,h,text,fill,color){return mk({type:'tabs',x:x,y:y,w:w,h:h,fs:22,color:color||'#ffffff',fill:fill||'#2b2d6e',text:text})}
function PRG(x,y,w,n,fill){return mk({type:'progress',x:x,y:y,w:w,h:28,fill:fill||'#2ec4b6',n:n})}
function CDN(x,y,w,h,n,fill,color){return mk({type:'countdown',x:x,y:y,w:w,h:h,fs:Math.round(h*.6),fw:800,color:color||'#ffffff',fill:fill||'#ff6fae',n:n})}
function CNT(x,y,w,h,n,fill,color){return mk({type:'counter',x:x,y:y,w:w,h:h,fs:Math.round(h*.45),fw:800,color:color||'#ffffff',fill:fill||'#6c5ce7',n:n})}
function SLD(name,bg,tr,els){return{id:uid(),name:name,bg:bg,tr:tr,els:els}}

/* 1 Retro Sunset */
TPL.push({n:'Retro Sunset Party',cat:'Personal',d:'Warm sunset gradient with a party schedule and countdown.',bg:'linear-gradient(180deg,#ff9a8b,#ff6a88)',dark:0,ch:'duck',fill:'#ffd166',sub:'Good vibes, one slide at a time.',pts:[],qs:'',build:function(t){return{name:t.n,slides:[
 SLD('Cover','linear-gradient(180deg,#ff9a8b,#ff6a88 55%,#2d1b4e)','zoom',[SH(280,130,400,400,'#ffd166',0,null,'circle'),SH(0,360,960,180,'#2d1b4e'),TX(t.n,60,40,840,100,64,800,'#ffffff',{al:'center'}),TX(t.sub,60,150,840,50,24,600,'#ffffff',{al:'center'}),STK('🌴',60,330,120),STK('🎵',790,320,110),BTN('Start ▶',390,450,180,'#ffd166','next','#2d1b4e')]),
 SLD('Schedule','#2d1b4e','slide',[TX('Party schedule',60,40,840,80,50,800,'#ffd166'),
   SH(60,160,270,250,'#ffffff22',24),SH(355,160,270,250,'#ffffff22',24),SH(650,160,270,250,'#ffffff22',24),
   TX('7 PM',84,190,222,60,40,800,'#ffd166'),TX('Doors open and music',84,270,222,100,24,600,'#ffffff'),
   TX('8 PM',379,190,222,60,40,800,'#ffd166'),TX('Games and quiz',379,270,222,100,24,600,'#ffffff'),
   TX('9 PM',674,190,222,60,40,800,'#ffd166'),TX('Dance floor',674,270,222,100,24,600,'#ffffff')]),
 SLD('Countdown','#2d1b4e','zoom',[TX('Starting in',60,60,840,60,36,700,'#ffffff',{al:'center'}),CDN(330,150,300,160,10,'#ffd166','#2d1b4e'),BTN('Back',390,380,180,'#ff6a88','prev')])
]}}});

/* 2 Neon Quiz Arcade */
TPL.push({n:'Neon Quiz Arcade',cat:'Education',d:'Dark arcade-style quiz with power-ups and a final level.',bg:'#0b0720',dark:1,ch:'alien',fill:'#7be495',sub:'Level up your knowledge.',pts:[],qs:'',build:function(t){return{name:t.n,slides:[
 SLD('Cover','#0b0720','flip',[TX('NEON QUIZ ARCADE',60,110,840,120,74,800,'#ff3ea5',{al:'center'}),TX(t.sub,60,240,840,50,26,600,'#5ef0ff',{al:'center'}),SH(60,320,840,6,'#5ef0ff'),CHR('alien',120,330,130),BTN('Play ▶',400,420,180,'#ff3ea5','next')]),
 SLD('Power-ups','#150c33','slide',[TX('Power-ups',60,40,840,80,50,800,'#5ef0ff'),TAB(60,150,840,300,'Hint | Eliminate one wrong answer.\nBoost | Double points for 10 seconds.\nShield | Protects your streak.','#241651','#ffffff')]),
 SLD('Final level','#0b0720','zoom',[TX('Final level',60,30,840,70,46,800,'#ffd166'),QUZ('What does CPU stand for? | Central Processing Unit* | Computer Power Unit | Core Print Utility\nWhich one is a loop? | for* | if | print',140,120,680,340,'#241651','#ffffff'),BTN('Back',390,470,180,'#ff3ea5','prev')])
]}}});

/* 3 Nature Field Guide */
TPL.push({n:'Nature Field Guide',cat:'Education',d:'Botany and wildlife guide with species cards and a quiz.',bg:'#f4f8ef',dark:0,ch:'frog',fill:'#7be495',sub:'Discover the plants and animals around us.',pts:[],qs:'',build:function(t){return{name:t.n,slides:[
 SLD('Cover','#f4f8ef','fade',[DEC('leaves',14),TX('Field Guide',60,130,560,110,80,400,'#1f3d2b',null,'DM Serif Display'),TX(t.sub,60,250,520,80,26,500,'#3b5b45'),STK('🌿',680,120,200),STK('🦋',640,330,120),BTN('Explore ▶',60,380,200,'#2f7d4f','next')]),
 SLD('Species','#e6f0dc','slide',[TX('Meet the species',60,40,840,80,50,400,'#1f3d2b',null,'DM Serif Display'),ACC(60,150,840,330,'Monarch butterfly | Travels thousands of kilometers each year.\nFern | Reproduces with spores, not seeds.\nOwl | Hunts mostly at night.','#ffffff','#1f3d2b')]),
 SLD('Quiz','#f4f8ef','fade',[TX('Check your knowledge',60,30,840,70,44,700,'#1f3d2b'),QUZ('What do ferns use to reproduce? | Seeds | Spores* | Flowers\nWhich animal hunts mostly at night? | Owl* | Monarch | Fern',140,130,680,330,'#2f7d4f','#ffffff'),BTN('Back',390,470,180,'#1f3d2b','prev')])
]}}});

/* 4 Coffee Shop Menu */
TPL.push({n:'Coffee Shop Menu',cat:'Business',d:'Cafe menu with a cover, price list and barista quiz.',bg:'#f6efe6',dark:0,ch:'bear',fill:'#b98550',sub:'Coffee, bakery and good mornings.',pts:[],qs:'',build:function(t){
 var items=[['Flat white','4.50'],['Cinnamon roll','3.25'],['Cold brew','4.75'],['Croissant','3.00']],menu=[TX('Today\'s menu',60,40,840,80,50,400,'#3b2314',null,'DM Serif Display')];
 items.forEach(function(it,k){var y=150+k*85;menu.push(TX(it[0],60,y,600,50,26,700,'#3b2314'),TX('$'+it[1],740,y,160,50,26,700,'#c8553d',{al:'right'}),SH(60,y+60,840,2,'#e6d5c3'))});
 return{name:t.n,slides:[
 SLD('Cover','#f6efe6','slide',[SH(0,0,960,18,'#3b2314'),TX('CAFÉ NOVA',60,90,840,110,80,800,'#3b2314',{al:'center'},'DM Serif Display'),TX(t.sub,60,205,840,50,24,500,'#8a5a3b',{al:'center'}),SH(380,270,200,4,'#3b2314'),STK('☕',150,330,160),STK('🥐',660,330,160),BTN('See the menu ▶',350,440,260,'#3b2314','next','#f6efe6')]),
 SLD('Menu','#ffffff','slide',menu),
 SLD('Barista quiz','#f6efe6','fade',[TX('Barista quiz',60,30,840,70,46,700,'#3b2314'),QUZ('What is a flat white made with? | Espresso and steamed milk* | Cream | Cocoa\nWhat is cold brew? | Coffee steeped in cold water* | Hot espresso | Iced tea',140,130,680,330,'#3b2314','#f6efe6'),BTN('Back',390,470,180,'#c8553d','prev')])
]}}});

/* 5 Real Estate Listing */
TPL.push({n:'Real Estate Listing',cat:'Business',d:'Property listing with highlights, counters and agent contact.',bg:'#eef4ff',dark:0,ch:'dog',fill:'#2563eb',sub:'3 bedrooms, 2 baths, a garden.',pts:[],qs:'',build:function(t){return{name:t.n,slides:[
 SLD('Listing','#eef4ff','slide',[SH(600,200,220,220,'#2563eb',0),SH(580,120,260,120,'#f59e0b',0,null,'tri'),SH(620,250,40,40,'#ffffff'),SH(680,340,50,80,'#ffffff'),TX('Lakeside Home',60,120,500,110,64,800,'#0f2a5a'),TX(t.sub,60,240,500,60,24,500,'#3b4f7a'),TX('$425,000',60,330,400,70,46,800,'#2563eb'),BTN('View details ▶',60,430,240,'#2563eb','next')]),
 SLD('Highlights','#ffffff','zoom',[TX('Highlights',60,40,840,80,50,800,'#0f2a5a'),CNT(60,170,260,150,3,'#2563eb'),CNT(350,170,260,150,2,'#2563eb'),CNT(640,170,260,150,4,'#2563eb'),TX('Bedrooms',60,335,260,40,22,600,'#0f2a5a',{al:'center'}),TX('Bathrooms',350,335,260,40,22,600,'#0f2a5a',{al:'center'}),TX('Parking spots',640,335,260,40,22,600,'#0f2a5a',{al:'center'})]),
 SLD('Book a visit','#eef4ff','slide',[TX('Book a visit',60,40,840,80,50,800,'#0f2a5a'),ACC(60,150,840,240,'When can I visit? | Any weekday, 9 AM to 5 PM.\nIs the price negotiable? | Ask our agent for details.','#2563eb','#ffffff'),BTN('Contact agent',390,430,220,'#f59e0b','none','#0f2a5a')])
]}}});

/* 6 Fitness Plan */
TPL.push({n:'30-Day Fitness Plan',cat:'Personal',d:'Bold workout plan with progress bars and a rest timer.',bg:'#151515',dark:1,ch:'dragon',fill:'#ff6b35',sub:'Build strength, one day at a time.',pts:[],qs:'',build:function(t){return{name:t.n,slides:[
 SLD('Cover','#151515','zoom',[TX('30-DAY PLAN',60,110,840,120,84,800,'#ff6b35'),TX(t.sub,60,240,700,50,26,500,'#ffffff'),SH(60,310,160,8,'#ff6b35'),STK('💪',640,120,220),BTN('Start ▶',60,380,200,'#ff6b35','next')]),
 SLD('Progress','#1f1f1f','slide',[TX('This week',60,40,840,80,50,800,'#ffffff'),TX('Push-ups',60,170,300,40,24,700,'#ffffff'),PRG(360,178,540,70,'#ff6b35'),TX('Running',60,260,300,40,24,700,'#ffffff'),PRG(360,268,540,45,'#ff6b35'),TX('Stretching',60,350,300,40,24,700,'#ffffff'),PRG(360,358,540,90,'#ff6b35')]),
 SLD('Rest timer','#151515','zoom',[TX('Rest timer',60,40,840,70,46,800,'#ffffff',{al:'center'}),CDN(330,150,300,160,30,'#ff6b35','#151515'),BTN('Back',390,420,180,'#ff6b35','prev')])
]}}});

/* 7 Recipe Card */
TPL.push({n:'Recipe Card',cat:'Personal',d:'Cozy recipe card with ingredients, method tabs and a timer.',bg:'#fff8ec',dark:0,ch:'cat',fill:'#e07a5f',sub:'Ready in 25 minutes. Serves 2.',pts:[],qs:'',build:function(t){return{name:t.n,slides:[
 SLD('Cover','#fff8ec','fade',[SH(60,60,840,420,'#ffffff',36),STK('🍝',640,140,220),TX('Creamy Pasta',110,130,500,110,70,800,'#3d2b1f',null,'DM Serif Display'),TX(t.sub,110,250,500,50,24,500,'#8a5a3b'),BTN('Open recipe ▶',110,380,260,'#e07a5f','next')]),
 SLD('Method','#fff8ec','slide',[TX('Method',60,30,840,70,46,400,'#3d2b1f',null,'DM Serif Display'),TAB(60,120,840,330,'Ingredients | 200 g pasta, 1 cup cream, 2 cloves garlic, parmesan.\nSteps | Boil pasta. Sauté garlic. Add cream and simmer. Toss together.\nTip | Save a splash of pasta water.','#3d2b1f','#ffffff')]),
 SLD('Simmer timer','#fff8ec','zoom',[TX('Simmer timer',60,40,840,70,46,400,'#3d2b1f',{al:'center'},'DM Serif Display'),CDN(330,150,300,160,12,'#e07a5f','#ffffff'),BTN('Back',390,420,180,'#e07a5f','prev')])
]}}});

/* 8 Wedding Invitation */
TPL.push({n:'Wedding Invitation',cat:'Personal',d:'Elegant arch invitation with details and FAQ.',bg:'#fbf7f2',dark:0,ch:'bunny',fill:'#e8d5c4',sub:'are getting married',pts:[],qs:'',build:function(t){return{name:t.n,slides:[
 SLD('Invitation','#fbf7f2','fade',[SH(300,50,360,440,'#e8d5c4',180),SH(330,80,300,400,'#fbf7f2',150),TX('Anna & Marco',60,170,840,110,80,400,'#5b4636',{al:'center'},'DM Serif Display'),TX(t.sub,60,290,840,50,26,500,'#5b4636',{al:'center'}),TX('June 14, 2027',60,350,840,50,30,700,'#5b4636',{al:'center'}),STK('💐',40,380,120),STK('🕊️',800,60,110)]),
 SLD('Details','#ffffff','slide',[TX('When and where',60,40,840,70,46,400,'#5b4636',null,'DM Serif Display'),SH(60,150,260,300,'#fbf7f2',24),SH(350,150,260,300,'#fbf7f2',24),SH(640,150,260,300,'#fbf7f2',24),TX('Ceremony',84,180,212,40,26,700,'#5b4636'),TX('3:00 PM\nSt. Mary Church',84,240,212,140,22,500,'#5b4636'),TX('Reception',374,180,212,40,26,700,'#5b4636'),TX('5:00 PM\nGarden Hall',374,240,212,140,22,500,'#5b4636'),TX('Dress',664,180,212,40,26,700,'#5b4636'),TX('Smart casual\nEarth tones',664,240,212,140,22,500,'#5b4636')]),
 SLD('Questions','#fbf7f2','zoom',[TX('Questions',60,40,840,70,46,400,'#5b4636',null,'DM Serif Display'),ACC(60,150,840,230,'Dress code? | Smart casual.\nKids welcome? | Please ask us first.','#5b4636','#fbf7f2'),BTN('RSVP by May 1',390,430,220,'#5b4636','none','#fbf7f2')])
]}}});

/* 9 Podcast Cover */
TPL.push({n:'Podcast Cover',cat:'Marketing',d:'Dark podcast cover with a waveform, episode list and subscribe slide.',bg:'#1a1433',dark:1,ch:'robot',fill:'#5ef0ff',sub:'Stories, ideas and small wins every week.',pts:[],qs:'',build:function(t){
 var bars=[];for(var i=0;i<24;i++){var h=20+((i*37)%7)*14;bars.push(SH(60+i*34,400-h/2,18,h,i%3?'#ff5ea8':'#5ef0ff',9))}
 return{name:t.n,slides:[
 SLD('Cover','#1a1433','slide',bars.concat([TX(t.n,60,60,840,110,72,800,'#ffffff',{al:'center'}),TX(t.sub,60,180,840,50,24,500,'#c9bfff',{al:'center'}),STK('🎙️',800,20,110),BTN('Listen ▶',390,460,180,'#ff5ea8','next')])),
 SLD('Episodes','#241c4a','slide',[TX('This episode',60,40,840,70,46,800,'#ffffff'),ACC(60,150,840,300,'Ep 1 · Why habits matter | Small steps add up.\nEp 2 · Focus in a noisy world | Try one-task blocks.\nEp 3 · Better mornings | Plan the first hour.','#342a66','#ffffff')]),
 SLD('Subscribe','#1a1433','zoom',[TX('Subscribe for free',60,120,840,90,58,800,'#5ef0ff',{al:'center'}),CNT(360,250,240,120,1200,'#ff5ea8','#1a1433'),TX('listeners and counting',60,390,840,50,24,500,'#c9bfff',{al:'center'}),BTN('Back',390,460,180,'#342a66','prev')])
]}}});

/* 10 Timeline Infographic */
TPL.push({n:'Timeline Infographic',cat:'Education',d:'Step-by-step infographic with numbered stages and an accordion for details.',bg:'#ffffff',dark:0,ch:'turtle',fill:'#5fc27a',sub:'Four steps from seed to sprout.',pts:[],qs:'',build:function(t){
 var labels=['Seed','Roots','Stem','Leaves'],cols=['#ffb86b','#5fc27a','#4cc9f0','#8f7bff'],els=[TX(t.n,60,60,840,100,64,800,'#1b1b2f',{al:'center'}),TX(t.sub,60,170,840,50,24,500,'#4b5563',{al:'center'}),SH(90,300,780,6,'#1b1b2f')];
 labels.forEach(function(l,k){var x=110+k*210;els.push(SH(x,250,96,96,cols[k],0,null,'circle'),TX(String(k+1),x,268,96,60,40,800,'#1b1b2f',{al:'center'}),TX(l,x-40,370,176,60,22,700,'#1b1b2f',{al:'center'}))});
 return{name:t.n,slides:[
 SLD('Overview','#ffffff','slide',els),
 SLD('Steps in detail','#f7f7fb','slide',[TX('Steps in detail',60,40,840,70,46,800,'#1b1b2f'),ACC(60,150,840,330,'Seed | Absorbs water and swells.\nRoots | Anchor the plant and drink water.\nStem | Grows up toward the light.\nLeaves | Make food from sunlight.','#ffffff','#1b1b2f')]),
 SLD('Check it','#ffffff','fade',[TX('Check it',60,30,840,70,46,800,'#1b1b2f'),QUZ('What do leaves do? | Anchor the plant | Make food from sunlight* | Store water\nWhat do roots do? | Make seeds | Drink water* | Catch light',140,130,680,330,'#1b1b2f','#ffffff'),BTN('Back',390,470,180,'#5fc27a','prev')])
]}}});

/* 11 Study Flashcards */
TPL.push({n:'Study Flashcards',cat:'Education',d:'Flashcard deck with flip transitions, key terms and a self-check quiz.',bg:'#eef2ff',dark:0,ch:'owl',fill:'#8f7bff',sub:'Flip through key terms, then test yourself.',pts:[],qs:'',build:function(t){return{name:t.n,slides:[
 SLD('Cover','#eef2ff','flip',[TX('Flashcards',60,120,840,110,80,800,'#1e1b4b',{al:'center'}),TX(t.sub,60,240,840,50,24,500,'#4338ca',{al:'center'}),SH(330,320,300,160,'#ffffff',24),TX('Photosynthesis',330,360,300,100,36,800,'#4338ca',{al:'center'}),BTN('Start ▶',390,460,180,'#4338ca','next')]),
 SLD('Key terms','#ffffff','flip',[TX('Key terms',60,40,840,70,46,800,'#1e1b4b'),ACC(60,150,840,330,'Photosynthesis | Plants turn light into food.\nMitosis | Cell division that makes two identical cells.\nOsmosis | Water moves across a membrane.','#4338ca','#ffffff')]),
 SLD('Self-check','#eef2ff','flip',[TX('Self-check',60,30,840,70,46,800,'#1e1b4b'),QUZ('What does mitosis make? | Two identical cells* | A seed | A gas\nWhat is osmosis? | Water moving across a membrane* | A sugar | A rock',140,130,680,330,'#1e1b4b','#ffffff'),BTN('Back',390,470,180,'#4338ca','prev')])
]}}});

/* 12 Mood Board */
TPL.push({n:'Summer Mood Board',cat:'Personal',d:'Playful collage of tilted cards, stickers and a palette slide.',bg:'#fdf0d5',dark:0,ch:'bunny',fill:'#ff9f8e',sub:'Warm light, fresh air, slow mornings.',pts:[],qs:'',build:function(t){return{name:t.n,slides:[
 SLD('Collage','#fdf0d5','zoom',[SH(60,60,360,260,'#ff9f8e',24,{rot:-6}),SH(480,40,380,240,'#8fd3ff',24,{rot:4}),SH(120,330,260,160,'#b8e0a5',80,{rot:-3}),SH(560,300,300,200,'#ffd166',0,{rot:8},'star'),STK('🌸',330,190,140),SH(290,190,380,150,'#ffffff',20),TX(t.n,290,215,380,100,52,800,'#2b2118',{al:'center'}),STK('📷',700,120,120)]),
 SLD('Palette','#2b2118','zoom',[TX('Palette',60,40,840,70,46,800,'#fdf0d5'),SH(60,160,170,260,'#ff9f8e',22),SH(260,160,170,260,'#8fd3ff',22),SH(460,160,170,260,'#b8e0a5',22),SH(660,160,170,260,'#ffd166',22),TX('#FF9F8E',60,440,170,40,20,700,'#fdf0d5',{al:'center'}),TX('#8FD3FF',260,440,170,40,20,700,'#fdf0d5',{al:'center'}),TX('#B8E0A5',460,440,170,40,20,700,'#fdf0d5',{al:'center'}),TX('#FFD166',660,440,170,40,20,700,'#fdf0d5',{al:'center'})]),
 SLD('Words','#fdf0d5','zoom',[TX('Words that inspire',60,40,840,70,46,800,'#2b2118'),TAB(60,150,840,300,'Calm | Slow mornings and soft light.\nBold | Bright colors, big ideas.\nFresh | Green walks and open windows.','#2b2118','#fdf0d5')])
]}}});

/* 13 Magic Move Showcase: objects glide between slides (same Magic Move key on each slide) */
TPL.push({n:'Magic Move Showcase',cat:'Marketing',d:'Objects glide, grow and travel between slides. Shows the Magic Move feature.',bg:'#0f172a',dark:1,ch:'robot',fill:'#f472b6',sub:'Objects glide between slides.',pts:[],qs:'',build:function(t){return{name:t.n,slides:[
 SLD('Start','#0f172a','fade',[SH(80,120,220,220,'#f472b6',110,{mg:'hero'},'circle'),TX('Magic Move',360,160,520,100,72,800,'#ffffff',{mg:'title'}),TX('Objects glide between slides',360,270,520,60,26,500,'#94a3b8',{mg:'sub'}),BTN('Next ▶',360,380,180,'#f472b6','next','#0f172a')]),
 SLD('Grow','#1e1b4b','fade',[SH(520,60,380,380,'#f472b6',190,{mg:'hero'},'circle'),TX('Move anything',60,300,440,100,64,800,'#ffffff',{mg:'title'}),TX('Same key, new place, new size.',60,400,440,50,24,500,'#c7d2fe',{mg:'sub'}),BTN('Next ▶',60,470,180,'#f472b6','next','#0f172a')]),
 SLD('Your turn','#0f172a','fade',[SH(60,380,130,130,'#f472b6',65,{mg:'hero'},'circle'),TX('Your turn',230,360,640,100,64,800,'#ffffff',{mg:'title'}),TX('Give your own objects a key and watch them travel.',230,460,680,50,24,500,'#94a3b8',{mg:'sub'}),BTN('Back',60,40,180,'#334155','prev','#ffffff')])
]}}});
