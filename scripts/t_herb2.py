from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    pg=b.new_page(viewport={'width':1280,'height':800})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/live/herb.html');pg.wait_for_timeout(800)
    pg.evaluate("startGame(false,'herb')");pg.wait_for_timeout(800)
    for k,(key) in enumerate(['d','w','a','s']):
        pg.keyboard.down(key);pg.wait_for_timeout(450);pg.screenshot(path=f't/h2_{key}.png',clip={'x':380,'y':250,'width':420,'height':300});pg.keyboard.up(key);pg.wait_for_timeout(200)
    print(errs);b.close()
