/* Brand Obituary shared page runtime (no build step). Exposes window.BO. */
(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const C={INK:'#1d1b18',RED:'#a8321f',GOLD:'#93743a',GREEN:'#4f7a4a',BLUE:'#3d5f86',GRID:'#ebe9e3',MUTE:'#6d665c',PLUM:'#8a5a9a',TAN:'#c9b48a',SAND:'#ddd3c2',HAND:'#1f2a44'};
const PIN={a:['#f6b8a8','#c4644d'],b:['#cdbcea','#7b62a8'],c:['#aecdec','#43709f'],d:['#bfe0b5','#4f8a45'],e:['#f7dc9c','#b08a2e']};
const fn=ss=>(ss||[]).map(s=>`<sup class="fn"><a href="#src-${s}">${s}</a></sup>`).join('');
const mob=()=>innerWidth<700;
const once=(el,f,th=.2)=>{if(!el)return;const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){f();io.disconnect()}},{threshold:th});io.observe(el)};
function basics(){
 const pr=$('#prog');addEventListener('scroll',()=>{const h=document.documentElement;if(pr)pr.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'},{passive:true});
 const rvIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rvIO.unobserve(e.target)}}),{threshold:.06,rootMargin:'0px 0px -5% 0px'});
 $$('.rv').forEach(el=>rvIO.observe(el));
 const navA=$$('nav.top a');const navIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)navA.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
 $$('section[id]').forEach(s=>navIO.observe(s));
 // story stage
 const ch=$$('.chap');const tot=ch.length;
 const chIO=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const d=e.target.dataset;
  $('#stN').textContent=`Chapter ${+d.n} of ${tot}`;$('#stBig').textContent=d.big;$('#stBig').style.color=d.color||C.INK;$('#stCap').innerHTML=d.cap;$('#stBar').style.width=d.bar+'%';
  const art=$('#stArt');if(art){art.style.transform=`translateY(${(+d.n-1)*6}px)`;art.style.opacity=+d.n===tot?.06:.14}
  ch.forEach(c=>c.classList.toggle('active',c===e.target))}),{rootMargin:'-40% 0px -50% 0px'});
 ch.forEach(c=>chIO.observe(c));
 // wayback tabs with lazy live frames
 const fit=v=>{const s=v.querySelector('.shot.live');if(!s)return;const f=s.querySelector('iframe');if(!f)return;const k=s.clientWidth/1000;f.style.transform=`scale(${k})`;s.style.height=Math.min(560,Math.round(760*k+0))+'px'};
 const load=v=>{const f=v.querySelector('iframe[data-src]');if(f&&!f.src){f.src=f.dataset.src;f.onload=()=>{const l=v.querySelector('.ld');l&&l.remove()}}fit(v)};
 $$('#wbStrip button').forEach(b=>b.onclick=()=>{$$('#wbStrip button').forEach(x=>x.classList.toggle('on',x===b));$$('.wb-view').forEach(v=>{v.hidden=v.dataset.i!==b.dataset.i;if(!v.hidden)load(v)})});
 const first=$('.wb-view:not([hidden])');if(first)once(first,()=>load(first),.01);
 addEventListener('resize',()=>$$('.wb-view:not([hidden])').forEach(fit));
 // timeline filter
 $$('#tlf .chip').forEach(c=>c.onclick=()=>{$$('#tlf .chip').forEach(x=>x.classList.toggle('on',x===c));const f=c.dataset.f;$$('#tlv .ev').forEach(e=>e.classList.toggle('hide',f!=='all'&&e.dataset.cat!==f))});
 // fork
 $$('#forkTabs button').forEach(b=>b.onclick=()=>{$$('#forkTabs button').forEach(x=>x.classList.toggle('on',x===b));$$('.fork-panel').forEach((p,i)=>p.classList.toggle('on',i===+b.dataset.i))});
}
function cod(list){const el=$('#cod');if(!el)return;const mx=Math.max(...list.map(c=>c[0]));
 el.innerHTML=list.map((c,i)=>`<div class="cod-row${i?'':' open'}"><div class="cod-top"><div><h4>${c[1]}</h4><div class="cod-bar"><span data-w="${c[0]/mx*100}"></span></div></div><div class="cod-pct">${c[0]}%</div></div><div class="cod-body"><p>${c[2]} ${fn(c[3])}</p></div></div>`).join('');
 $$('.cod-row').forEach(r=>r.onclick=e=>{if(e.target.tagName==='A')return;r.classList.toggle('open')});
 once(el,()=>$$('.cod-bar span').forEach((b,i)=>setTimeout(()=>b.style.width=b.dataset.w+'%',i*180)));}
// ---------- charts ----------
const charts={};
function setupChart(){if(typeof Chart==='undefined')return false;Chart.defaults.font.family="Inter, system-ui, sans-serif";Chart.defaults.font.size=12;Chart.defaults.color=C.MUTE;Chart.defaults.plugins.legend.labels.boxWidth=12;Chart.defaults.plugins.legend.labels.boxHeight=12;Chart.defaults.maintainAspectRatio=false;Chart.defaults.animation.duration=900;return true}
const tip={backgroundColor:'#fff',titleColor:C.INK,bodyColor:C.INK,footerColor:C.MUTE,borderColor:C.INK,borderWidth:1,padding:10,cornerRadius:0,titleFont:{weight:'600'},footerFont:{weight:'400'}};
function mk(id,cfg){const cv=document.getElementById(id);if(!cv)return;const go=()=>{charts[id]&&charts[id].destroy();charts[id]=new Chart(cv,cfg)};go();return charts[id]}
function lazy(id,draw){const cv=document.getElementById(id);if(!cv)return;once(cv.closest('.card')||cv,draw,.15)}
function seg(id,f){$$('#'+id+' button').forEach(b=>b.onclick=()=>{$$('#'+id+' button').forEach(x=>x.classList.toggle('on',x===b));f(b.dataset.v)})}
function rNote(rc,ctx,x,y,lines,tgt,seed){ctx.save();ctx.font="600 17px Caveat, cursive";const w=Math.max(...lines.map(l=>ctx.measureText(l).width))+22,h=lines.length*19+14;
 rc.rectangle(x,y,w,h,{roughness:1.2,stroke:C.HAND,strokeWidth:1.3,fill:'#fffdf6',fillStyle:'solid',seed});
 ctx.fillStyle=C.HAND;lines.forEach((l,i)=>ctx.fillText(l,x+11,y+22+i*19));
 if(tgt){const sx=Math.max(x,Math.min(tgt[0],x+w)),sy=Math.max(y,Math.min(tgt[1],y+h));const mx=(sx+tgt[0])/2+(tgt[1]-sy)*.15,my=(sy+tgt[1])/2-(tgt[0]-sx)*.15;
 rc.curve([[sx,sy],[mx,my],tgt],{roughness:1,stroke:C.HAND,strokeWidth:1.5,seed:seed+1});const an=Math.atan2(tgt[1]-my,tgt[0]-mx);
 [.45,-.45].forEach((d,q)=>rc.line(tgt[0],tgt[1],tgt[0]-10*Math.cos(an+d),tgt[1]-10*Math.sin(an+d),{roughness:.7,stroke:C.HAND,strokeWidth:1.5,seed:seed+2+q}))}ctx.restore();return w}
const roughPlug=f=>({id:'roughAnno',afterDraw(c){if(typeof rough==='undefined'||c.width<560)return;f(c,rough.canvas(c.canvas),c.ctx)}});
const refLine=(val,axis='x',label='')=>({id:'ref'+axis+val,afterDatasetsDraw(c){const s=c.scales[axis],a=c.chartArea,ctx=c.ctx;const p=s.getPixelForValue(val);ctx.save();ctx.strokeStyle=C.INK;ctx.setLineDash([5,4]);ctx.lineWidth=1.5;ctx.beginPath();if(axis==='x'){ctx.moveTo(p,a.top);ctx.lineTo(p,a.bottom)}else{ctx.moveTo(a.left,p);ctx.lineTo(a.right,p)}ctx.stroke();ctx.setLineDash([]);ctx.fillStyle=C.INK;ctx.font="600 11px Inter";if(label){if(axis==='x')ctx.fillText(label,p+5,a.top+11);else ctx.fillText(label,a.left+6,p-5)}ctx.restore()}});
// ---------- maps ----------
const NS='http://www.w3.org/2000/svg';
const el=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e};
let atlasP=null;
function atlas(){return atlasP||(atlasP=fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json').then(r=>r.json()))}
const proj=()=>d3.geoAlbersUsa().scale(1300).translate([487.5,305]);
function defs(svg){const d=el('defs',{},svg);const f=el('filter',{id:svg.id+'Sh',x:'-50%',y:'-50%',width:'200%',height:'200%'},d);el('feDropShadow',{dx:0,dy:1,stdDeviation:1.2,'flood-color':'#000','flood-opacity':.22},f)}
function drawNotes(svg,notes,fs,seedBase){if(typeof rough==='undefined')return null;const rc=rough.svg(svg);const g=el('g',{class:'anno'},svg);
 notes.forEach((n,k)=>{const [lab,x,y,lines,tgt]=n;
  const t=el('text',{x:x+12,y:y+fs+4,'font-size':fs,'font-weight':600},g);
  lines.forEach((ln,j)=>{const ts=el('tspan',{x:x+12,dy:j?fs*1.1:0},t);ts.textContent=ln});
  let bb=t.getBBox();if(!bb.width)bb={width:Math.max(...lines.map(l=>l.length))*fs*.42,height:lines.length*fs*1.1+4};const w=bb.width+24,h=bb.height+16;
  g.insertBefore(rc.rectangle(x,y,w,h,{roughness:1.3,stroke:C.HAND,strokeWidth:1.4,fill:'#fffdf6',fillStyle:'solid',seed:seedBase+k*7}),t);
  if(!tgt)return;
  const cx=Math.max(x,Math.min(tgt[0],x+w)),cy=Math.max(y,Math.min(tgt[1],y+h));let sx=cx,sy=cy;if(cx>x&&cx<x+w&&cy>y&&cy<y+h){sx=x+w/2;sy=y+h}
  const mx=(sx+tgt[0])/2+(tgt[1]-sy)*0.18,my=(sy+tgt[1])/2-(tgt[0]-sx)*0.18;
  g.appendChild(rc.curve([[sx,sy],[mx,my],[tgt[0],tgt[1]]],{roughness:1.1,stroke:C.HAND,strokeWidth:1.6,seed:seedBase+k*7+1}));
  const ang=Math.atan2(tgt[1]-my,tgt[0]-mx),L=11;
  [0.45,-0.45].forEach((da,q)=>g.appendChild(rc.line(tgt[0],tgt[1],tgt[0]-L*Math.cos(ang+da),tgt[1]-L*Math.sin(ang+da),{roughness:.8,stroke:C.HAND,strokeWidth:1.6,seed:seedBase+k*7+2+q})))});
 return g}
function drawPins(svg,list,keyEl,r){const g=el('g',{class:'pins'},svg);
 list.forEach((m,i)=>{const {lab,cat,tp,pp}=m;const p=pp||tp;const c=PIN[cat];
  if(pp){el('line',{x1:tp[0],y1:tp[1],x2:p[0],y2:p[1],stroke:c[1],'stroke-width':1.2},g);el('circle',{cx:tp[0],cy:tp[1],r:2.6,fill:c[1]},g)}
  const pg=el('g',{class:'pin','data-i':i,tabindex:0,role:'button','aria-label':lab+': '+m.title},g);
  el('circle',{class:'pd',cx:p[0],cy:p[1],r:m.r||r,fill:c[0],filter:`url(#${svg.id}Sh)`},pg);
  const t=el('text',{class:'pn',x:p[0],y:p[1]+(m.r||r)*0.38,'text-anchor':'middle','font-size':(m.r||r)*1.05},pg);t.textContent=lab});
 if(!keyEl)return;
 keyEl.innerHTML=list.map((m,i)=>`<li data-i="${i}"><span class="kn" style="background:${PIN[m.cat][0]}">${m.lab}</span><div><b>${m.title}</b><br>${m.text} ${fn(m.src)}</div></li>`).join('');
 const sel=i=>{svg.querySelectorAll('.pin').forEach(x=>x.classList.toggle('sel',+x.dataset.i===i));keyEl.querySelectorAll('li').forEach(x=>x.classList.toggle('sel',+x.dataset.i===i))};
 svg.querySelectorAll('.pin').forEach(x=>{x.onclick=()=>{sel(+x.dataset.i);if(innerWidth<700)keyEl.children[+x.dataset.i].scrollIntoView({behavior:'smooth',block:'center'})};x.onkeydown=e=>{if(e.key==='Enter')x.onclick()}});
 keyEl.querySelectorAll('li').forEach(li=>li.onmouseenter=li.onclick=()=>sel(+li.dataset.i))}
function mobileNotes(id,notes){const e=document.getElementById(id);if(e)e.innerHTML=notes.map(n=>`<div class="hnote">${n[0]?'<b>'+n[0]+'</b> · ':''}${n[3].join(' ')}</div>`).join('')}
/* opts: {svg, key, notes, pins:[{lab,cat,ll:[lon,lat],off:[dx,dy],title,text,src,r}], ann:[[lab,x,y,lines,targetLL|targetXY]], choro:{values:{StateName:v}, scale:[thresholds], colors:[...], tip:(name,v)=>html}, rings:[{ll,miles,color}], marks:(rc,g,P)=>{}} */
async function usMap(o){const svg=document.getElementById(o.svg);if(!svg||typeof d3==='undefined'||typeof topojson==='undefined')return;
 const us=await atlas();const P=proj();const path=d3.geoPath(P);svg.innerHTML='';defs(svg);
 const states=topojson.feature(us,us.objects.states).features;
 const base=el('g',{},svg);
 states.forEach(f=>{const d=path(f);if(!d)return;const nm=f.properties.name;let fill='#ebe4d6';if(o.choro){const v=o.choro.values[nm];if(v!=null){let k=0;while(k<o.choro.scale.length&&v>=o.choro.scale[k])k++;fill=o.choro.colors[k]}}
  const p=el('path',{d,fill,class:o.choro?'statepath':'',stroke:'#fbf8f2','stroke-width':1.1},base);
  if(o.choro&&o.choro.tip){p.addEventListener('mousemove',e=>{const t=svg.parentNode.querySelector('.maptip');if(!t)return;const r=svg.parentNode.getBoundingClientRect();t.innerHTML=o.choro.tip(nm,o.choro.values[nm]);t.style.display='block';t.style.left=Math.min(r.width-230,e.clientX-r.left+12)+'px';t.style.top=(e.clientY-r.top+12)+'px'});p.addEventListener('mouseleave',()=>{const t=svg.parentNode.querySelector('.maptip');if(t)t.style.display='none'})}});
 el('path',{d:path(topojson.mesh(us,us.objects.states,(a,b)=>a===b)),fill:'none',stroke:'#b5a993','stroke-width':.8},base);
 (o.rings||[]).forEach(rg=>el('path',{d:path(d3.geoCircle().center(rg.ll).radius(rg.miles/69.05)()),fill:'none',stroke:rg.color||'#c4644d','stroke-width':1.3,'stroke-dasharray':'5 5',opacity:.7},svg));
 const xy=v=>v.length===2&&Math.abs(v[0])<=180&&Math.abs(v[1])<=90&&v[0]<0?P(v):v;
 const ann=(o.ann||[]).map(a=>[a[0],a[1],a[2],a[3],a[4]?xy(a[4]):null]);
 const g=drawNotes(svg,ann,o.fs||19,o.seed||11);
 if(g&&o.marks&&typeof rough!=='undefined')o.marks(rough.svg(svg),g,P);
 const pins=(o.pins||[]).map(m=>{const tp=P(m.ll).map(v=>+v.toFixed(1));return {...m,tp,pp:m.off?[tp[0]+m.off[0],tp[1]+m.off[1]]:null}});
 drawPins(svg,pins,o.key?document.getElementById(o.key):null,o.r||13);
 if(o.notes)mobileNotes(o.notes,o.ann||[]);}
function maps(list){const go=()=>list.forEach(o=>once(document.getElementById(o.svg),()=>usMap(o),.01));
 (document.fonts&&document.fonts.load?Promise.all([document.fonts.load('600 19px Caveat'),document.fonts.ready]):Promise.resolve()).then(go,go)}
window.BO={$,$$,C,PIN,fn,mob,once,basics,cod,setupChart,tip,mk,lazy,seg,rNote,roughPlug,refLine,usMap,maps,el};
})();
