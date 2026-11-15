s=open('live.html').read()
def rep(a,b,count=1):
    global s
    n=s.count(a)
    assert n==count,(n,a[:90])
    s=s.replace(a,b)
# ---- p3: necro spells
p3=open('/home/claude/ev2/src/p3_data.js').read()
blk=p3[p3.index('const SPELLS_N=['):p3.index('const TASKS=[')]
rep('const TASKS=[',blk+'const TASKS=[')
# ---- p4
R4=[
("function newPlayer(){return{kind:'mage',","function newPlayer(cls){return{cls:cls||'mage',d8:0,castK:0,castDur:.35,shield:null,lvlT:0,kind:'mage',"),
("c.dir=nx<c.x?1:nx>c.x?2:ny<c.y?3:0;c.fx=c.x;","c.dir=nx<c.x?1:nx>c.x?2:ny<c.y?3:0;if(c===pl){const d=d8From(nx-c.x,ny-c.y);if(d!==null)c.d8=d;}c.fx=c.x;"),
("for(const s of SPELLS)if(s.lvl===pl.level)","pl.lvlT=1.2;for(const s of SP())if(s.lvl===pl.level)"),
("function cast(i){\n  if(state!=='play'||!pl.alive)return;const s=SPELLS[i];","function cast(i){\n  if(pl&&pl.cls==='necro')return castNecro(i);\n  if(state!=='play'||!pl.alive)return;const s=SPELLS[i];"),
("spendMana(s.mana);pl.cds[i]=s.cd;gcd=.5;pl.castT=.35;","spendMana(s.mana);pl.cds[i]=s.cd;gcd=.5;pl.castT=pl.castDur=.35;pl.castK=i;"),
("for(let i=0;i<SPELLS.length;i++)pl.cds[i]","updNecro(dt);for(let i=0;i<7;i++)pl.cds[i]"),
("    for(const[dx,dy]of D4){const nx=cx+dx,ny=cy+dy;if(!walkable(nx,ny))continue;const n=idx(nx,ny);if(prev[n]>=0","    for(const[dx,dy]of D8){const nx=cx+dx,ny=cy+dy;if(!walkable(nx,ny))continue;if(dx&&dy&&(!walkable(cx+dx,cy)||!walkable(cx,cy+dy)))continue;const n=idx(nx,ny);if(prev[n]>=0"),
("if(free(nx,ny)){path.shift();startMove(pl,nx,ny,md);}","if(free(nx,ny)){path.shift();startMove(pl,nx,ny,md*(nx!==pl.x&&ny!==pl.y?1.38:1));}"),
("  if(d<=0){float(pl.x,pl.y,'blocked','#cfd6e6');sfx.block();return;}",
 "  if(pl.shield&&d>0){const ab=Math.min(d,pl.shield.amt);pl.shield.amt-=ab;d-=ab;if(ab)float(pl.x+.3,pl.y-.3,'('+ab+')','#8ac8ff');if(pl.shield.amt<=0){pl.shield=null;log('Your soul shield breaks.','#8ac8ff');}if(d<=0)return;}\n  if(d<=0){float(pl.x,pl.y,'blocked','#cfd6e6');sfx.block();return;}"),
("function save(){try{localStorage.setItem('embervale1',JSON.stringify({level:pl.level,","const saveKey=c=>c==='necro'?'embervale_necro':'embervale1';\nfunction save(){try{localStorage.setItem(saveKey(pl.cls),JSON.stringify({cls:pl.cls,level:pl.level,"),
("function loadSave(){try{const s=JSON.parse(localStorage.getItem('embervale1'));return s&&s.level?s:null;}catch(e){return null}}",
 "function loadSave(c){try{const s=JSON.parse(localStorage.getItem(saveKey(c||'mage')));return s&&s.level?s:null;}catch(e){return null}}"),
("function startGame(cont){\n  initAudio();","function startGame(cont,cls){\n  initAudio();clearAllies();"),
("pl=newPlayer();const s=cont&&loadSave();","pl=newPlayer(cls);const s=cont&&loadSave(pl.cls);"),
("log('Click a monster to target it, then press 1 to cast Fire Bolt.','#9fd0ff');}","log('Click a monster to target it, then press 1 to cast '+SP()[0].name+'.','#9fd0ff');if(pl.cls==='necro')log('You walk the old path of the dead. Raise them, drain them, rain souls upon them.','#c08aff');}"),
("if(state==='title'){if(e.code==='Enter')startGame(!!loadSave());return;}","if(state==='title'){if(e.code==='Enter')startGame(!!loadSave('mage'),'mage');return;}"),
("const cv=$('c'),ctx=cv.getContext('2d');","const cv=$('c');let ctx=cv.getContext('2d');"),
("function die(){pl.alive=false;","function die(){clearAllies();pl.shield=null;pl.alive=false;"),
]
for a,b in R4: rep(a,b)
# title screen: take new block from my p4
p4=open('/home/claude/ev2/src/p4_logic.js').read()
newT=p4[p4.index('function heroCard(cls)'):p4.index('// ============ input')]
a=s.index('function showTitle(){');b=s.index('// ============ input')
oldT=s[a:b]
s=s[:a]+newT+s[b:]
open('/home/claude/live/oldTitle.txt','w').write(oldT)
# ---- p6 before drawing helpers
p6=open('/home/claude/ev2/src/p6_necro.js').read()
rep('// ============ drawing helpers',p6+'\n// ============ drawing helpers')
# ---- p5
exec(open('/home/claude/live/r5.py').read())
for a,b in R5: rep(a,b)
open('/home/claude/live/merged.html','w').write(s)
print('merged',len(s))
