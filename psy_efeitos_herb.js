// ============ HERB GARDENER: psychedelic spells
const HPAL=['#ff6ad8','#ffd24a','#a6f23a','#5ef2f0','#9a7aff','#ff8a3c'];
const hsl=(h,l)=>'hsl('+(((h%360)+360)%360|0)+',100%,'+(l||62)+'%)';
const hh=(i,s)=>{const v=Math.sin(i*12.9898+s*78.233)*43758.5453;return v-Math.floor(v);};
function psy(kind,x,y,dur,extra){const f=Object.assign({type:'psy',kind,x,y,t:0,dur,seed:Math.random()*100},extra||{});fx.push(f);return f;}
function hring(sx,sy,r,a,lw,off){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=a;ctx.lineWidth=lw;const n=36;for(let i=0;i<n;i++){ctx.strokeStyle=hsl(i/n*360+(off||0),60);ctx.beginPath();ctx.ellipse(sx,sy,r,r*.7,0,i/n*TAU,(i+1.2)/n*TAU);ctx.stroke();}ctx.restore();}
function hdot(x,y,r,h,a){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=a;const g=ctx.createRadialGradient(x,y,0,x,y,r*2.6);g.addColorStop(0,'#fff');g.addColorStop(.3,hsl(h,62));g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-r*3,y-r*3,r*6,r*6);ctx.restore();}
function hflower(x,y,s,a,h0,grow){ctx.save();ctx.translate(x,y);ctx.globalAlpha=a;ctx.scale(grow,grow);ctx.strokeStyle='#2a6a2a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(s*.2,-s*.6,0,-s*1.1);ctx.stroke();ctx.translate(0,-s*1.1);
  for(let i=0;i<6;i++){ctx.save();ctx.rotate(i*TAU/6+time*.8);ctx.fillStyle=hsl(h0+i*40,68);ctx.strokeStyle='rgba(60,10,50,.7)';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(0,-s*.38,s*.2,s*.38,0,0,TAU);ctx.fill();ctx.stroke();ctx.restore();}
  ctx.fillStyle='#ffe27a';ctx.beginPath();ctx.arc(0,0,s*.17,0,TAU);ctx.fill();ctx.restore();hdot(x,y-s*1.1*grow,s*.5,h0,.45*a);}
function drawPsy(f){const u=clamp(f.t/f.dur,0,1),k0=S/48,sx=f.x*S-camX+S/2,sy=f.y*S-camY+S*.6,sd=f.seed,K=f.kind;
  if(K==='cast'){hring(sx,sy,S*(.4+.7*u),(1-u)*.9,3*k0,u*300);for(let i=0;i<10;i++){const a=sd+i*.63+u*5,r=S*(.3+u*.7);hdot(sx+Math.cos(a)*r,sy-S*.4*u+Math.sin(a)*r*.7,3*k0,i*36+u*300,1-u);}}
  else if(K==='sleep'){for(let i=0;i<46;i++){const a=hh(i,sd)*TAU+u*3.2,r=(.15+hh(i,sd+1)*1.1)*S*(.35+u*.9),rise=u*S*(.3+hh(i,sd+2)*.9);hdot(sx+Math.cos(a)*r,sy-S*.3-rise+Math.sin(a)*r*.5,(2+hh(i,sd+3)*3)*k0,hh(i,sd+4)*360+u*500,(1-u)*.9);}
    hring(sx,sy,S*(.3+u*.8),(1-u)*.5,2*k0,u*400);
    ctx.save();ctx.globalCompositeOperation='source-over';ctx.textAlign='center';ctx.lineWidth=3;ctx.strokeStyle='#3a1a6a';for(let j=0;j<3;j++){const uu=clamp(u*1.5-j*.2,0,1);if(uu<=0||uu>=1)continue;ctx.globalAlpha=Math.sin(uu*Math.PI);ctx.font='bold '+((12+j*6)*k0)+'px Georgia';const zx=sx+(j-1)*S*.3+Math.sin(uu*6+j)*S*.1,zy=sy-S*.8-uu*S*(.7+j*.25);ctx.strokeText('z',zx,zy);ctx.fillStyle=hsl(250+j*40,85);ctx.fillText('z',zx,zy);}ctx.restore();}
  else if(K==='bloom'||K==='great'){const big=K==='great',n=big?10:6,R=S*(big?1.5:.95);
    if(big){for(const[nn,rr,dir]of[[8,.8,1],[12,1.3,-1],[16,1.9,1]]){const rp=S*rr*Math.min(1,u*2.2);for(let i=0;i<nn;i++){const a=i/nn*TAU+dir*u*2.5;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=(1-u)*.8;ctx.translate(sx+Math.cos(a)*rp,sy+Math.sin(a)*rp*.7);ctx.rotate(a);ctx.fillStyle=hsl(i/nn*360+u*500,60);ctx.beginPath();ctx.ellipse(0,0,S*.22,S*.08,0,0,TAU);ctx.fill();ctx.restore();}}
      hdot(sx,sy-S*.3,S*.9,120,.55*(1-u));}
    hring(sx,sy,R*Math.min(1,u*2),(1-u)*.9,3*k0,u*500);
    for(let i=0;i<n;i++){const a=i/n*TAU+.3,e=clamp(u*2.6-i*.08,0,1),eb=e<1?1-Math.pow(1-e,3)*Math.cos(e*7):1;if(e<=0)continue;const al=u<.72?1:1-(u-.72)/.28;hflower(sx+Math.cos(a)*R*.85,sy+Math.sin(a)*R*.85*.6,S*(big?.5:.38),al,i*60+u*200,Math.max(.01,eb));}
    for(let i=0;i<(big?26:14);i++){const a=hh(i,sd)*TAU,r=hh(i,sd+1)*R,rise=u*S*(.6+hh(i,sd+2)*.9);hdot(sx+Math.cos(a)*r,sy-rise+Math.sin(a)*r*.5,2.5*k0,90+hh(i,sd+3)*120,(1-u)*.9);}}
  else if(K==='mine'){const g=Math.min(1,u/.4),ex=u>.45?(u-.45)/.55:0;
    if(u<.62){const sc=(1-Math.pow(1-g,3))*(u>.45?1-(u-.45)/.17:1),s=S*.7*sc;ctx.save();ctx.translate(sx,sy);ctx.globalAlpha=Math.min(1,sc*1.5);
      ctx.fillStyle='#f4ecd8';ctx.strokeStyle='#5a3a20';ctx.lineWidth=1.5;ctx.fillRect(-s*.13,-s*.5,s*.26,s*.5);ctx.strokeRect(-s*.13,-s*.5,s*.26,s*.5);
      const gr=ctx.createLinearGradient(0,-s*1.15,0,-s*.45);gr.addColorStop(0,hsl(300+time*200,70));gr.addColorStop(1,'#a8187a');ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(-s*.62,-s*.45);ctx.quadraticCurveTo(-s*.66,-s*1.2,0,-s*1.22);ctx.quadraticCurveTo(s*.66,-s*1.2,s*.62,-s*.45);ctx.quadraticCurveTo(0,-s*.3,-s*.62,-s*.45);ctx.fill();ctx.stroke();
      for(const[a,b,c]of[[-.25,-.85,180],[.2,-1,90],[.34,-.68,180]]){ctx.fillStyle=hsl(c+time*150,70);ctx.beginPath();ctx.arc(a*s,b*s,s*.11,0,TAU);ctx.fill();}ctx.restore();hdot(sx,sy-s*.9,s*.7,320+time*100,.5*sc);}
    if(ex>0){for(let q=0;q<3;q++){const e=clamp(ex*1.3-q*.18,0,1);if(e>0)hring(sx,sy,S*2.6*e,(1-e)*.95,(4-q)*k0,q*80+u*600);}hdot(sx,sy-S*.3,S*1.4*(1-ex),300,.7*(1-ex));
      for(let i=0;i<44;i++){const a=hh(i,sd)*TAU,sp=(.4+hh(i,sd+1)*1.2),r=S*2.4*ex*sp,rise=Math.sin(ex*Math.PI)*S*(.3+hh(i,sd+2)*.9);hdot(sx+Math.cos(a)*r,sy+Math.sin(a)*r*.6-rise,(2+hh(i,sd+3)*3)*k0,hh(i,sd+4)*360+u*600,(1-ex)*.95);}}}
  else if(K==='roots'){const gr=Math.min(1,u*3),ret=u>.8?1-(u-.8)/.2:1,e=gr*ret;
    hring(sx,sy,S*.75*Math.min(1,u*4),(1-u)*.8,3*k0,u*400);
    for(let i=0;i<8;i++){const a=i/8*TAU+hh(i,sd)*.4,bx=sx+Math.cos(a)*S*.5,by=sy+Math.sin(a)*S*.3,hgt=S*(1+hh(i,sd+1)*.7)*e,bend=(i%2?1:-1)*S*.35;
      ctx.save();ctx.lineCap='round';for(const[c,w]of[['#2a160a',7*k0],['#6e4a2a',5*k0],[hsl(90+i*30+time*200,65),1.8*k0]]){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(bx,by);ctx.quadraticCurveTo(bx+bend,by-hgt*.55,sx+Math.cos(a)*S*.12,by-hgt);ctx.stroke();}
      if(e>.5){const lx=sx+Math.cos(a)*S*.12,ly=by-hgt;ctx.fillStyle=hsl(110+i*25,60);ctx.beginPath();ctx.ellipse(lx,ly,S*.12,S*.06,i,0,TAU);ctx.fill();}ctx.restore();}
    for(let i=0;i<12;i++)hdot(sx+(hh(i,sd)-.5)*S*1.3,sy-hh(i,sd+1)*S*1.1*e,2.5*k0,90+hh(i,sd+2)*150,(1-u)*.9);}
  else if(K==='storm'){const R=S*3.6,e=Math.min(1,u*2.6);hdot(sx,sy-S*.3,S*1.6*(1-u*.5),hh(1,sd)*360+u*800,.55*(1-u));
    for(let j=0;j<5;j++)for(let i=0;i<30;i++){const t=i/30,a=j*TAU/5+t*5.5+u*9,r=t*R*e;hdot(sx+Math.cos(a)*r,sy+Math.sin(a)*r*.65-t*S*.4,(1.5+(1-t)*4)*k0,t*360+u*700+j*70,(1-u)*(.35+.65*(1-t)));}
    hring(sx,sy,R*e,(1-u)*.8,4*k0,u*700);hring(sx,sy,R*e*.6,(1-u)*.6,3*k0,u*500+120);}
  else if(K==='rain'){const R=S*1.7;
    for(let i=0;i<34;i++){const p=clamp((u*1.5-hh(i,sd)*.55)/.4,0,1);if(p<=0)continue;const ox=(hh(i,sd+1)-.5)*S*3.2,oy=(hh(i,sd+2)-.5)*S*1.2,yy=sy+oy-(1-p)*S*6;const h=hh(i,sd+3)*360+u*500;
      if(p<1){ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle=hsl(h,62);ctx.lineWidth=3*k0;ctx.globalAlpha=.8;ctx.beginPath();ctx.moveTo(sx+ox-S*.15,yy-S*.7);ctx.lineTo(sx+ox,yy);ctx.stroke();ctx.restore();hdot(sx+ox,yy,3.5*k0,h,1);}
      else{const sp=clamp((u*1.5-hh(i,sd)*.55-.4)/.35,0,1);if(sp<1)hring(sx+ox,sy+oy,S*.4*sp,(1-sp)*.8,2*k0,h);}}
    if(u>.55){const e=clamp((u-.55)/.45,0,1);hring(sx,sy,R*e,(1-e)*.9,4*k0,u*600);for(let i=0;i<14;i++){const a=i/14*TAU+u*3;hdot(sx+Math.cos(a)*R*e,sy+Math.sin(a)*R*e*.7,3*k0,i*26+u*600,(1-e));}hdot(sx,sy-S*.3,S*1.3*(1-e),300,.6*(1-e));}}
  lights.push([f.x+.5,f.y+.5,f.kind==='storm'?4:2.4,HPAL[Math.floor(time*8)%6]]);}
function castHerb(s,t){const id=s.id;psy('cast',pl.x,pl.y,.5);
  if(id==='bolt'){sfx.frost();const d=spellPow(s.dmg);shoot(pl,t,'fire',()=>{hurtMon(t,d,'#ff8ae8');t.slow=3;psy('sleep',t.x,t.y,1.5);});}
  else if(id==='frost'){sfx.charge();const d=spellPow(s.dmg);shoot(pl,t,'frost',()=>{hurtMon(t,d,'#a6f23a');t.slow=5;psy('roots',t.x,t.y,1.7);});}
  else if(id==='mend'||id==='gmend'){sfx.heal();const g=id==='gmend',h=Math.round(spellPow(s.dmg)-eqStat('atk')*.5);pl.hp=Math.min(maxHp(),pl.hp+h);float(pl.x,pl.y,'+'+h,'#7dff8a');psy(g?'great':'bloom',pl.x,pl.y,g?2:1.3);if(g&&pl.dot){pl.dot=null;log('The poison and flames fade into color.','#7dff8a');}}
  else if(id==='burst'){sfx.burst();psy('mine',pl.x,pl.y,1.2);areaHit(pl.x,pl.y,2.6,s,1,'#ff6ad8');}
  else if(id==='inferno'){sfx.burst();sfx.boom();shake=6;psy('storm',pl.x,pl.y,1.6);areaHit(pl.x,pl.y,3.6,s,1,'#9a7aff');}
  else if(id==='meteor'){sfx.charge();const tx=t.x,ty=t.y;psy('rain',tx,ty,1.5,{cbT:.95,cb:()=>{sfx.boom();shake=8;if(!t.dead)hurtMon(t,spellPow(s.dmg),'#ffd24a');for(const m of mons.slice())if(!m.dead&&m!==t&&hyp(m.x-tx,m.y-ty)<=1.8)hurtMon(m,spellPow(s.dmg)*.5,'#ffd24a');}});}}
function spellIconH(k){const c=HPAL[k%6];
  if(k===0){glow(0,0,18,'#c070ff',.7);for(let i=0;i<9;i++){const a=i*.9,r=3+i*1.6;ell(Math.cos(a)*r,Math.sin(a)*r,2.2,2.2,hsl(i*40,62));}}
  else if(k===1){for(let i=0;i<6;i++){ctx.save();ctx.rotate(i*TAU/6);ctx.fillStyle=hsl(300+i*30,65);ctx.beginPath();ctx.ellipse(0,-8,4.2,8,0,0,TAU);ctx.fill();ctx.restore();}ell(0,0,4,4,'#ffe27a');}
  else if(k===2){ctx.fillStyle='#f4ecd8';ctx.fillRect(-3,2,6,10);ctx.fillStyle='#d9259e';ctx.beginPath();ctx.moveTo(-14,3);ctx.quadraticCurveTo(-14,-14,0,-14);ctx.quadraticCurveTo(14,-14,14,3);ctx.quadraticCurveTo(0,6,-14,3);ctx.fill();ell(-5,-5,2.6,2.6,'#5ef2f0');ell(5,-7,2.2,2.2,'#a6f23a');ell(6,-1,2,2,'#5ef2f0');}
  else if(k===3){ctx.lineCap='round';for(let i=0;i<4;i++){ctx.strokeStyle=i%2?'#a8774a':'#6e4a2a';ctx.lineWidth=3.2;ctx.beginPath();ctx.moveTo(-12+i*8,13);ctx.quadraticCurveTo(-18+i*10,0,-8+i*7,-12);ctx.stroke();}ctx.strokeStyle='#a6f23a';ctx.lineWidth=1.4;ctx.beginPath();ctx.ellipse(0,13,16,5,0,0,TAU);ctx.stroke();}
  else if(k===4){for(let j=0;j<3;j++){ctx.strokeStyle=hsl(j*110+40,62);ctx.lineWidth=2.4;ctx.beginPath();for(let i=0;i<=24;i++){const t=i/24,a=j*2.1+t*5,r=t*16;const x=Math.cos(a)*r,y=Math.sin(a)*r;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}}
  else if(k===5){for(let r=0;r<3;r++)for(let i=0;i<8+r*4;i++){const n=8+r*4,a=i/n*TAU;ctx.save();ctx.translate(Math.cos(a)*(5+r*5),Math.sin(a)*(5+r*5));ctx.rotate(a);ctx.fillStyle=hsl(i*30+r*80,65);ctx.beginPath();ctx.ellipse(0,0,3.4,1.6,0,0,TAU);ctx.fill();ctx.restore();}ell(0,0,3,3,'#fff');}
  else{for(let i=0;i<7;i++){const x=-12+i*4,y=-8+((i*7)%5)*3;ctx.strokeStyle=hsl(i*50,62);ctx.lineWidth=2.4;ctx.beginPath();ctx.moveTo(x-2,y-6);ctx.lineTo(x,y+3);ctx.stroke();ell(x,y+4,2.2,2.2,hsl(i*50,70));}ctx.strokeStyle='#f0a0ff';ctx.lineWidth=1.4;ctx.beginPath();ctx.ellipse(0,13,15,5,0,0,TAU);ctx.stroke();}}
