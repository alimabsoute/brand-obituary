(function(){
const B=window.BO,{$,$$,C,fn,mob,tip,mk,lazy,seg,rNote,roughPlug,refLine}=B;
B.basics();
// ---- cause of death ----
B.cod([
 [30,'Capacity built years ahead of demand','Each distribution center was designed for 8,000 orders a day, and the 10-K admits volumes in every facility were “significantly below” that. Even if all of 2000’s estimated orders had gone through one center, it would have run at about 59% of design. Webvan had several.',[1,3]],
 [25,'Fixed costs that grocery margins could not carry','Gross margin was a respectable 26.5% in 2000, but G&amp;A, which held fulfillment, delivery and real estate, was $292.3M, or 164% of sales. Gross profit covered about a sixth of it.',[3]],
 [20,'Expansion and a merger before the model worked','Atlanta and Chicago opened in 2000 while the Bay Area still lost money, and the $1.04B HomeGrocer merger added five markets on a different technology platform. Dallas closed within six months, with up to $60M in charges.',[3,7]],
 [15,'The capital window closed','The auditors raised going-concern doubt in early 2001. In April Webvan was discussing only about $25M of new money with existing investors, and in July it cited “the tough climate for raising new funds.”',[7,11,15]],
 [10,'A generous service promise','Free delivery over $50, no tipping, 30-minute windows and salaried, trained couriers made every order expensive to fulfill at the volumes it actually had.',[1,3,28]]]);
// ---- timeline ----
const TL=[
 ['Dec 1996','','corporate','Founded','Louis Borders, founder of Borders Books, starts the company.',[1]],
 ['Jun 2','1999','ops','The Bay Area store opens','Commercial launch, served from the 340,000 sq ft Oakland center.',[1,3]],
 ['Jul 1999','','ops','Bechtel contract','Agreement for the construction of up to 26 more distribution centers over three years.',[1]],
 ['Jul – Aug','1999','money','$275.0M Series D','21.7 million preferred shares, just before the IPO filing.',[1]],
 ['Sep 1999','','corporate','George Shaheen becomes CEO','He leaves the top job at Andersen Consulting.',[1,17]],
 ['Nov 1999','','money','IPO at $15','25 million shares on Nasdaq as WBVN, $375M gross. Goldman Sachs leads.',[1]],
 ['Q4 1999','','market','$34 high','The stock\'s high in its first quarter of trading.',[2]],
 ['Mar 10','2000','market','The Nasdaq peaks','The index closes at 5,048.62, its bubble high.',[27]],
 ['May 2000','','ops','Atlanta opens','A 350,000 sq ft center in Suwanee, Georgia.',[3]],
 ['Aug 2000','','ops','Chicago opens','A 355,000 sq ft center in Carol Stream, Illinois.',[3]],
 ['Sep 5','2000','corporate','HomeGrocer merger closes','138.3M new shares; about $1.04B total, $901.6M of it goodwill.',[3]],
 ['Q4 2000','','market','Low of $0.28','The stock trades between $2.28 and $0.28 in the quarter.',[3]],
 ['Feb 2001','','ops','Dallas closes','The ex-HomeGrocer Carrollton, Texas facility shuts. Louis Borders leaves the board.',[3,14]],
 ['Early 2001','','ops','Sacramento dropped','Service ends there too.',[15]],
 ['Apr 13','2001','corporate','Shaheen resigns','COO Robert Swan takes over, and is named CEO on Apr 26.',[14,15]],
 ['Apr 26','2001','ops','Atlanta closes','About 485 jobs there and 400 at headquarters. Cash is down to $115M. A 1-for-25 reverse split is planned.',[15]],
 ['Jul 9','2001','death','Shutdown','All deliveries stop in seven markets. About 2,000 workers are let go and 750,000 active customers lose the service.',[10,11,12]],
 ['Jul 13','2001','death','Chapter 11','Filed in Delaware, case 01-2404, to pursue a sale of the assets.',[8]],
 ['Oct 2001','','death','The auctions','Court-approved auctions at ten facility sites and headquarters.',[28]],
 ['Sep 2009','','death','The name returns','Amazon is reported to own webvan.com and uses it to sell groceries by mail.',[20]],
 ['2012','','death','Kiva sold to Amazon','$775M for the robotics company founded by ex-Webvan logistics manager Mick Mountz.',[19,23]]];
$('#tlv').innerHTML=TL.map(e=>`<div class="ev" data-cat="${e[2]}"><div class="d"><b>${e[0]}</b>${e[1]}</div><div class="dot"></div><div><div class="c">${{money:'Money',corporate:'Corporate',ops:'Operations',death:'Death &amp; estate',market:'Market'}[e[2]]}</div><h4>${e[3]}</h4><p>${e[4]}${fn(e[5])}</p></div></div>`).join('');
$$('#tlv .ev').forEach(x=>{const d=x.querySelector('.dot');if(x.dataset.cat==='ops')d.style.background=C.BLUE});
// ---- calculator ----
const GA=292.3e6,GM=.265;
function calc(){const v=+$('#calcR').value,gp=v*GM,need=GA/gp/365;$('#calcV').textContent='$'+v;$('#calcOut').textContent=Math.round(need).toLocaleString();
 $('#calcRows').innerHTML=`<div class="row"><span>Gross profit per order (26.5%)</span><b>$${gp.toFixed(2)}</b></div><div class="row"><span>2000 G&amp;A to cover, per day</span><b>$${(GA/365/1e3).toFixed(0)}K</b></div><div class="row"><span>Orders a day needed</span><b>${Math.round(need).toLocaleString()}</b></div><div class="row"><span>Full centers at 8,000 a day</span><b>${(need/8000).toFixed(1)}</b></div><div class="row tot"><span>Estimated actual, 2000</span><b>~4,700 a day</b></div>`}
$('#calcR').oninput=calc;calc();
if(!B.setupChart())return;
// ---- Nasdaq ----
const NQ=[["1999-01-01",2180.4],["1999-01-08",2290.1],["1999-01-15",2329.4],["1999-01-22",2376.8],["1999-01-29",2438.6],["1999-02-05",2450.1],["1999-02-12",2350.5],["1999-02-19",2276.7],["1999-02-26",2334.5],["1999-03-05",2289.9],["1999-03-12",2398.1],["1999-03-19",2436.8],["1999-03-26",2387.6],["1999-04-02",2482.0],["1999-04-09",2566.8],["1999-04-16",2539.1],["1999-04-23",2479.3],["1999-04-30",2575.2],["1999-05-07",2506.2],["1999-05-14",2561.9],["1999-05-21",2552.0],["1999-05-28",2430.3],["1999-06-04",2431.5],["1999-06-11",2490.1],["1999-06-18",2487.7],["1999-06-25",2583.1],["1999-07-02",2675.6],["1999-07-09",2761.2],["1999-07-16",2818.1],["1999-07-23",2740.2],["1999-07-30",2656.6],["1999-08-06",2573.1],["1999-08-13",2552.3],["1999-08-20",2648.8],["1999-08-27",2762.2],["1999-09-03",2756.0],["1999-09-10",2846.3],["1999-09-17",2840.7],["1999-09-24",2811.1],["1999-10-01",2746.3],["1999-10-08",2840.0],["1999-10-15",2825.7],["1999-10-22",2756.8],["1999-10-29",2854.3],["1999-11-05",3027.2],["1999-11-12",3168.7],["1999-11-19",3300.2],["1999-11-26",3400.9],["1999-12-03",3416.9],["1999-12-10",3586.7],["1999-12-17",3664.0],["1999-12-24",3900.4],["1999-12-31",4019.0],["2000-01-07",3904.0],["2000-01-14",3968.5],["2000-01-21",4176.8],["2000-01-28",4052.0],["2000-02-04",4104.3],["2000-02-11",4398.7],["2000-02-18",4445.5],["2000-02-25",4535.1],["2000-03-03",4745.6],["2000-03-10",4949.1],["2000-03-17",4742.4],["2000-03-24",4818.0],["2000-03-31",4693.6],["2000-04-07",4251.2],["2000-04-14",3802.4],["2000-04-21",3670.8],["2000-04-28",3691.7],["2000-05-05",3797.6],["2000-05-12",3533.6],["2000-05-19",3579.9],["2000-05-26",3242.0],["2000-06-02",3564.1],["2000-06-09",3823.6],["2000-06-16",3824.5],["2000-06-23",3969.9],["2000-06-30",3911.0],["2000-07-07",3959.7],["2000-07-14",4091.5],["2000-07-21",4157.3],["2000-07-28",3900.8],["2000-08-04",3731.6],["2000-08-11",3822.9],["2000-08-18",3886.8],["2000-08-25",4003.7],["2000-09-01",4139.4],["2000-09-08",4058.3],["2000-09-15",3877.8],["2000-09-22",3824.4],["2000-09-29",3707.6],["2000-10-06",3476.2],["2000-10-13",3231.2],["2000-10-20",3315.5],["2000-10-27",3333.7],["2000-11-03",3355.0],["2000-11-10",3258.6],["2000-11-17",3065.9],["2000-11-24",2851.7],["2000-12-01",2713.1],["2000-12-08",2794.4],["2000-12-15",2830.3],["2000-12-22",2465.2],["2000-12-29",2515.3],["2001-01-05",2470.8],["2001-01-12",2525.7],["2001-01-19",2710.1],["2001-01-26",2798.6],["2001-02-02",2778.5],["2001-02-09",2589.7],["2001-02-16",2477.4],["2001-02-23",2273.7],["2001-03-02",2193.8],["2001-03-09",2158.6],["2001-03-16",1948.4],["2001-03-23",1893.0],["2001-03-30",1881.1],["2001-04-06",1720.0],["2001-04-13",1864.5],["2001-04-20",2051.6],["2001-04-27",2049.3],["2001-05-04",2168.6],["2001-05-11",2153.1],["2001-05-18",2145.3],["2001-05-25",2279.2],["2001-06-01",2130.0],["2001-06-08",2217.3],["2001-06-15",2107.0],["2001-06-22",2021.2],["2001-06-29",2095.2],["2001-07-06",2093.4],["2001-07-13",2024.4],["2001-07-20",2037.7],["2001-07-27",1996.8],["2001-08-03",2053.4],["2001-08-10",1989.6],["2001-08-17",1932.6],["2001-08-24",1866.5],["2001-08-31",1843.5],["2001-09-07",1730.8],["2001-09-14",1695.4],["2001-09-21",1511.3],["2001-09-28",1484.9]];
const EV=[['1999-06-02','Bay Area store opens'],['1999-11-05','IPO at $15'],['2000-03-10','Nasdaq peak'],['2000-09-05','HomeGrocer merger'],['2001-04-13','Shaheen resigns'],['2001-07-09','Shutdown']];
const near=d=>{let b=0,bd=1e18;NQ.forEach((p,i)=>{const x=Math.abs(new Date(p[0])-new Date(d));if(x<bd){bd=x;b=i}});return b};
const mon=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
lazy('nasdaqChart',()=>{const evI=EV.map(e=>near(e[0]));mk('nasdaqChart',{type:'line',data:{labels:NQ.map(p=>p[0]),datasets:[{label:'Nasdaq Composite',data:NQ.map(p=>p[1]),borderColor:C.INK,borderWidth:1.8,pointRadius:NQ.map((p,i)=>evI.includes(i)?6:0),pointBackgroundColor:NQ.map((p,i)=>evI.includes(i)?C.RED:C.INK),pointHoverRadius:6,tension:.15,fill:false}]},
 options:{plugins:{legend:{display:false},tooltip:{...tip,callbacks:{title:c=>c[0].label,label:c=>' '+c.raw.toLocaleString(),footer:c=>{const k=evI.indexOf(c[0].dataIndex);return k>=0?EV[k][1]:''}}}},
 scales:{y:{min:1000,grid:{color:C.GRID}},x:{grid:{display:false},ticks:{maxRotation:0,autoSkip:false,callback:function(v,i){const d=NQ[i][0],pv=i?NQ[i-1][0]:'';return (d.slice(5,7)!==pv.slice(5,7)&&['01','07'].includes(d.slice(5,7)))?mon[+d.slice(5,7)-1]+" '"+d.slice(2,4):''}}}}},
 plugins:[roughPlug((c,rc,ctx)=>{const m=c.getDatasetMeta(0).data;const a=m[evI[1]],b=m[evI[2]],z=m[evI[5]];if(!a||!b)return;const yb=Math.min(c.chartArea.bottom-6,a.y+34),o={roughness:1.1,stroke:C.HAND,strokeWidth:1.4,seed:5};rc.line(a.x,yb,b.x,yb,o);rc.line(a.x,yb-7,a.x,yb+7,o);rc.line(b.x,yb-7,b.x,yb+7,o);ctx.save();ctx.font="600 17px Caveat, cursive";ctx.fillStyle=C.HAND;ctx.textAlign='center';ctx.fillText('four months',(a.x+b.x)/2,yb+20);ctx.restore();
  rNote(rc,ctx,b.x+40,c.chartArea.top+6,['IPO Nov 1999 at $15. The Nasdaq','peaked four months later.'],[b.x+10,b.y+4],9);
  if(z)rNote(rc,ctx,z.x-250,z.y-120,['Jul 9, 2001: deliveries stop.'],[z.x-4,z.y-8],15)})]})});
// ---- P&L ----
const PL={l:["Q2'99","Q3'99","Q4'99*","Q1'00","Q2'00","Q3'00","Q4'00*","Q1'01"],s:[383,3841,9069,16269,28300,52057,81830,77234],cogs:[410,3491,7379,12138,20307,37509,61283,55559],mkt:[1907,3926,5491,8359,9907,13990,19225,16276],loss:[23444,60437,48998,57815,74365,147973,173135,216972]};
function drawPL(m='abs'){if(m==='abs')mk('plChart',{data:{labels:PL.l,datasets:[
 {type:'line',label:'Net loss',data:PL.loss,borderColor:C.INK,backgroundColor:C.INK,borderWidth:2,pointRadius:4,tension:.25,order:0},
 {type:'bar',label:'Net sales',data:PL.s,backgroundColor:C.GREEN,borderRadius:2},{type:'bar',label:'Cost of goods sold',data:PL.cogs,backgroundColor:C.TAN,borderRadius:2},{type:'bar',label:'Sales & marketing',data:PL.mkt,backgroundColor:C.RED,borderRadius:2}]},
 options:{interaction:{mode:'index',intersect:false},plugins:{legend:{position:'bottom'},tooltip:{...tip,callbacks:{label:c=>' '+c.dataset.label+': $'+(c.raw/1000).toFixed(1)+'M',footer:c=>PL.l[c[0].dataIndex].includes('*')?'Derived: full year minus nine months':''}}},scales:{y:{grid:{color:C.GRID},ticks:{callback:v=>'$'+v/1000+'M'}},x:{grid:{display:false}}}},
 plugins:[roughPlug((c,rc,ctx)=>{const p=c.getDatasetMeta(0).data[7];if(!p)return;rNote(rc,ctx,p.x-330,c.chartArea.top+4,['Q1 2001: $217M net loss, incl.','$73.9M of restructuring charges.'],[p.x-8,p.y+2],21)})]});
 else mk('plChart',{type:'line',data:{labels:PL.l,datasets:[{label:'Gross margin (% of sales)',data:PL.s.map((s,i)=>+((s-PL.cogs[i])/s*100).toFixed(1)),borderColor:C.GREEN,backgroundColor:C.GREEN,borderWidth:2.5,pointRadius:4,yAxisID:'y'},{label:'Net loss (% of sales)',data:PL.s.map((s,i)=>+(PL.loss[i]/s*100).toFixed(0)),borderColor:C.RED,backgroundColor:C.RED,borderWidth:2.5,pointRadius:4,yAxisID:'y1'}]},
 options:{interaction:{mode:'index',intersect:false},plugins:{legend:{position:'bottom'},tooltip:{...tip,callbacks:{label:c=>' '+c.dataset.label+': '+c.raw+'%'}}},scales:{y:{min:-10,max:40,grid:{color:C.GRID},ticks:{callback:v=>v+'%'},title:{display:!mob(),text:'Gross margin'}},y1:{type:'logarithmic',position:'right',min:100,max:10000,grid:{display:false},ticks:{callback:v=>[100,300,1000,3000,10000].includes(v)?v.toLocaleString()+'%':''},title:{display:!mob(),text:'Net loss / sales (log)'}},x:{grid:{display:false}}}}})}
lazy('plChart',()=>drawPL());seg('plSeg',drawPL);
// ---- per order ----
const ORD=178456/104;const per=k=>+(k/ORD).toFixed(2);
lazy('orderChart',()=>mk('orderChart',{type:'bar',data:{labels:['Revenue','Costs'],datasets:[
 {label:'Revenue',data:[104,null],backgroundColor:C.GREEN,stack:'s'},
 {label:'Goods',data:[null,per(131239)],backgroundColor:C.TAN,stack:'s'},
 {label:'Sales & marketing',data:[null,per(49120)],backgroundColor:C.RED,stack:'s'},
 {label:'Engineering',data:[null,per(25516)],backgroundColor:'#b9a7cf',stack:'s'},
 {label:'G&A: fulfillment, delivery, real estate, corporate',data:[null,per(292335)],backgroundColor:C.BLUE,stack:'s'},
 {label:'Non-cash and one-time',data:[null,per(63394+55233+40810)],backgroundColor:C.SAND,stack:'s'}]},
 options:{indexAxis:'y',plugins:{legend:{position:'bottom',labels:{font:{size:11}}},tooltip:{...tip,callbacks:{label:c=>c.raw==null?'':' '+c.dataset.label+': $'+c.raw.toFixed(2)}}},scales:{x:{stacked:true,grid:{color:C.GRID},ticks:{callback:v=>'$'+v}},y:{stacked:true,grid:{display:false}}}},plugins:[refLine(104,'x','$104 order')]}));
// ---- marketing ratio ----
lazy('mktChart',()=>mk('mktChart',{type:'bar',data:{labels:['Webvan 1999','Webvan 2000','Webvan Q1 2001','Pets.com, 6 quarters'],datasets:[{label:'Marketing as % of sales',data:[88.3,27.5,21.1,326],backgroundColor:[C.TAN,C.TAN,C.TAN,C.RED],borderRadius:2}]},
 options:{plugins:{legend:{display:false},tooltip:{...tip,callbacks:{label:c=>' '+c.raw+'% of sales'}}},scales:{y:{grid:{color:C.GRID},ticks:{callback:v=>v+'%'}},x:{grid:{display:false},ticks:{font:{size:mob()?10:12}}}}}}));
lazy('aosChart',()=>mk('aosChart',{type:'bar',data:{labels:['1999','Q4 1999','Launch to Mar 2000','Launch to Jun 2000','2000','Q4 2000'],datasets:[{label:'Average order',data:[78,81,84.33,87.6,104,112],backgroundColor:[C.SAND,C.SAND,C.SAND,C.SAND,C.TAN,C.TAN],borderRadius:2}]},
 options:{plugins:{legend:{display:false},tooltip:{...tip,callbacks:{label:c=>' $'+c.raw}}},scales:{y:{min:0,grid:{color:C.GRID},ticks:{callback:v=>'$'+v}},x:{grid:{display:false},ticks:{font:{size:mob()?9:11},maxRotation:0,autoSkip:false,callback:function(v,i){const l=this.getLabelForValue(v);return mob()?l.replace('Launch to ','to '):l}}}}}}));
// ---- cap table ----
const CAP=[['Louis Borders',28.3,'#1d1b18'],['SOFTBANK',15.6,'#a8321f'],['Sequoia Capital',13.6,'#93743a'],['Benchmark Capital',12.3,'#3d5f86'],['All other holders',30.2,'#ddd3c2']];
$('#capList').innerHTML=CAP.map(c=>`<div><span class="sw-c" style="background:${c[2]}"></span><span>${c[0]}</span><b>${c[1]}%</b></div>`).join('');
lazy('capChart',()=>mk('capChart',{type:'doughnut',data:{labels:CAP.map(c=>c[0]),datasets:[{data:CAP.map(c=>c[1]),backgroundColor:CAP.map(c=>c[2]),borderColor:'#fcfbf7',borderWidth:2}]},options:{cutout:'58%',plugins:{legend:{display:false},tooltip:{...tip,callbacks:{label:c=>' '+c.label+': '+c.raw+'%'}}}}}));
lazy('raiseChart',()=>mk('raiseChart',{type:'bar',data:{labels:['Private preferred, to Jun 1999','Series D, Jul–Aug 1999','IPO, Nov 1999','HomeGrocer, paid in stock (Sep 2000)'],datasets:[{label:'$M',data:[118.3,275.0,375.0,1044.0],backgroundColor:[C.GREEN,C.GREEN,C.INK,'#d9cfbd'],borderRadius:2}]},
 options:{indexAxis:'y',plugins:{legend:{display:false},tooltip:{...tip,callbacks:{label:c=>' $'+c.raw.toFixed(1)+'M'+(c.dataIndex===3?' (non-cash)':'')}}},scales:{x:{grid:{color:C.GRID},ticks:{callback:v=>'$'+v+'M'}},y:{grid:{display:false},ticks:{font:{size:mob()?10:12}}}}}}));
// ---- stock ----
const ST=[['Q4 1999',15.0625,34],['Q1 2000',7.6875,18.25],['Q2 2000',4.5312,7.5],['Q3 2000',2.3125,9.3125],['Q4 2000',0.2812,2.2812],['Apr 26, 2001',0.16,null],['Jul 6, 2001',0.06,null]];
lazy('stockChart',()=>mk('stockChart',{data:{labels:ST.map(s=>s[0]),datasets:[
 {type:'bar',label:'Quarterly range',data:ST.map(s=>s[2]?[s[1],s[2]]:null),backgroundColor:C.TAN,borderRadius:2,barPercentage:.5},
 {type:'line',label:'Single reported price',data:ST.map(s=>s[2]?null:s[1]),borderColor:C.RED,backgroundColor:C.RED,pointRadius:6,showLine:false}]},
 options:{plugins:{legend:{position:'bottom'},tooltip:{...tip,callbacks:{label:c=>Array.isArray(c.raw)?' Low $'+c.raw[0].toFixed(2)+' · High $'+c.raw[1].toFixed(2):(c.raw==null?'':' $'+c.raw.toFixed(2))}}},scales:{y:{type:'logarithmic',min:0.05,max:50,grid:{color:C.GRID},ticks:{callback:v=>[0.05,0.1,0.5,1,5,10,15,50].includes(v)?'$'+v:''}},x:{grid:{display:false},ticks:{font:{size:mob()?9:12}}}}},plugins:[refLine(15,'y','IPO price $15')]}));
// ---- map ----
B.maps([{svg:'mapWV',key:'keyWV',notes:'notesWV',seed:21,pins:[
 {lab:'1',cat:'a',ll:[-122.2711,37.8044],off:[40,4],title:'Oakland, CA: the first distribution center',text:'340,000 sq ft, serving the Bay Area from June 1999, and Sacramento until early 2001.',src:[1,3,15]},
 {lab:'2',cat:'b',ll:[-121.4944,38.5816],off:[34,-30],title:'Sacramento, CA',text:'Served from Oakland. Service ended in early 2001.',src:[3,15]},
 {lab:'3',cat:'b',ll:[-84.0713,34.0515],title:'Suwanee, GA: Atlanta',text:'350,000 sq ft. Opened May 2000; closed April 2001 with about 485 jobs cut.',src:[3,15]},
 {lab:'4',cat:'a',ll:[-88.1348,41.9125],title:'Carol Stream, IL: Chicago',text:'355,000 sq ft, the largest center. Opened August 2000.',src:[3]},
 {lab:'5',cat:'a',ll:[-122.2171,47.4829],off:[-38,14],title:'Renton, WA: Seattle',text:'110,000 sq ft, from HomeGrocer, which began in Seattle in June 1998.',src:[3]},
 {lab:'6',cat:'a',ll:[-122.6765,45.5231],off:[-30,18],title:'Portland, OR',text:'A HomeGrocer market from May 1999, served with Seattle.',src:[3]},
 {lab:'7',cat:'a',ll:[-118.282,33.8317],off:[-34,-4],title:'Carson, CA: Los Angeles',text:'100,000 sq ft, from HomeGrocer (Sep 1999).',src:[3]},
 {lab:'8',cat:'a',ll:[-117.9243,33.8704],off:[30,-22],title:'Fullerton, CA: Orange County',text:'100,000 sq ft, from HomeGrocer (Sep 1999).',src:[3]},
 {lab:'9',cat:'a',ll:[-117.1611,32.7157],off:[-14,30],title:'San Diego, CA',text:'102,000 sq ft, from HomeGrocer (May 2000). First site moved to Webvan’s platform, Jan 2001.',src:[3]},
 {lab:'10',cat:'b',ll:[-96.89,32.9537],title:'Carrollton, TX: Dallas',text:'From HomeGrocer, operating from May 2000. Closed February 2001; charge of up to $60.0M.',src:[3]},
 {lab:'11',cat:'c',ll:[-122.2711,37.5585],off:[30,36],title:'Foster City, CA: headquarters',text:'About 113,000 sq ft of offices at 1241 E. Hillsdale Blvd.',src:[1,3]},
 {lab:'12',cat:'c',ll:[-122.2087,47.6815],off:[34,-8],title:'Kirkland, WA: offices',text:'HomeGrocer’s home; about 82,000 sq ft. About 400 jobs here and in Foster City were cut in April 2001.',src:[3,15]},
 {lab:'13',cat:'c',ll:[-115.1398,36.1699],title:'Las Vegas, NV: customer service',text:'The National Customer Service Center, 33,500 sq ft.',src:[3]},
 {lab:'14',cat:'e',ll:[-76.6247,39.1626],title:'Glen Burnie, MD',text:'On the October 2001 auction list. The prospectus planned a Washington, D.C. market; we found no record that it opened.',src:[1,28]}],
 ann:[['',150,150,['Jun 1999: Oakland opens. 340,000 sq ft,','designed for 8,000 orders a day.'],[86,262]],
  ['',180,48,['HomeGrocer’s home turf: Seattle since','Jun 1998. Merged in Sep 2000 for ~$1.04B.'],[146,40]],
  ['',150,468,['Three ex-HomeGrocer centers in Southern','California, all shut on Jul 9, 2001.'],[118,352]],
  ['',470,96,['Chicago: 355,000 sq ft. Opened Aug 2000,','eleven months before the end.'],[626,214]],
  ['',360,500,['Dallas: May 2000 – Feb 2001.','Up to $60M in charges.'],[478,446]],
  ['',640,470,['Atlanta: opened May 2000,','closed Apr 2001. ~485 jobs.'],[716,410]],
  ['',640,296,['Glen Burnie, MD: on the 2001','auction list. No record it opened.'],[824,264]]]}]);
})();
