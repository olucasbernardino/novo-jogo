from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    pg=b.new_page(viewport={'width':1280,'height':800})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/live/herb.html');pg.wait_for_timeout(800)
    pg.evaluate("startGame(false,'herb')");pg.wait_for_timeout(800)
    for i,ks in enumerate([['d','s'],['d','w'],['a','w'],['a','s']]):
        for k in ks:pg.keyboard.down(k)
        pg.wait_for_timeout(500);pg.screenshot(path=f't/h3_{i}.png',clip={'x':330,'y':200,'width':420,'height':300})
        for k in ks:pg.keyboard.up(k)
        pg.wait_for_timeout(300)
    print(errs,pg.evaluate("pl.d8"));b.close()
