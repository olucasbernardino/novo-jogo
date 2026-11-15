from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    pg=b.new_page(viewport={'width':1280,'height':800})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:m.type=='error' and errs.append(m.text))
    pg.goto('file:///home/claude/live/herb.html');pg.wait_for_timeout(1200)
    pg.screenshot(path='t/h_title.png')
    pg.evaluate("startGame(false,'herb')");pg.wait_for_timeout(1000)
    pg.keyboard.press('1');pg.keyboard.press('2');pg.wait_for_timeout(300)
    pg.keyboard.down('d');pg.wait_for_timeout(500);pg.screenshot(path='t/h_walk.png');pg.keyboard.up('d')
    pg.evaluate("save()")
    print(errs, pg.evaluate("[localStorage.getItem('embervale_herb')!=null, SP()[0].name, pl.cls]"))
    b.close()
