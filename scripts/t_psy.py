from playwright.sync_api import sync_playwright
from PIL import Image
K=[('sleep',1.5,.45),('bloom',1.3,.5),('mine',1.2,.75),('roots',1.7,.5),('storm',1.6,.45),('great',2,.5),('rain',1.5,.8)]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    pg=b.new_page(viewport={'width':1280,'height':800})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/live/herb.html');pg.wait_for_timeout(800)
    pg.evaluate("startGame(false,'herb')");pg.wait_for_timeout(800)
    ims=[]
    for k,d,u in K:
        pg.evaluate(f"fx.length=0;psy('{k}',pl.x,pl.y,{d})");pg.wait_for_timeout(int(d*u*1000))
        pg.screenshot(path=f't/p_{k}.png',clip={'x':290,'y':130,'width':420,'height':330});ims.append(Image.open(f't/p_{k}.png'))
        pg.wait_for_timeout(int(d*1000))
    # real cast test
    pg.evaluate("pl.level=50;pl.mana=9999;pl.mlSpent=0;mons.length&&0")
    r=pg.evaluate("(()=>{const m=mons.find(m=>!m.dead);if(!m)return 'nomon';pl.target=m;pl.x=pl.fx=m.x-2;pl.y=pl.fy=m.y;const out=[];for(let i=0;i<7;i++){pl.cds[i]=0;gcd=0;try{cast(i);}catch(e){out.push('ERR'+i+e.message)}}return out.join(',')||'ok'})()")
    pg.wait_for_timeout(600);pg.screenshot(path='t/p_real.png')
    print(errs,r)
    w=Image.new('RGB',(420*4,330*2));[w.paste(im,((i%4)*420,(i//4)*330)) for i,im in enumerate(ims)];w.save('t/p_all.png')
    b.close()
