const screens=[...document.querySelectorAll(".screen")];

function show(id){
  screens.forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
  if(id==="words") animateWords();
  if(id==="end") celebration();
}
document.querySelectorAll("[data-next]").forEach(b=>b.addEventListener("click",()=>show(b.dataset.next)));

const words=["LESSONS","GUIDANCE","PATIENCE","COURAGE","CURIOSITY","CONFIDENCE","MEMORIES","GROWTH","INSPIRATION"];
function animateWords(){
  const box=document.getElementById("wordCloud");
  if(box.dataset.done)return;
  box.dataset.done="1";
  const positions=[
    [50,50,1],[18,25,.8],[78,25,.75],[23,70,.85],[78,70,.8],[50,20,.78],[50,80,.82],[30,48,.72],[70,48,.72]
  ];
  words.forEach((w,i)=>{
    const el=document.createElement("span");
    el.className="word";
    el.textContent=w;
    el.style.left=positions[i][0]+"%";
    el.style.top=positions[i][1]+"%";
    el.style.transitionDelay=(i*.22)+"s";
    el.style.fontSize=(positions[i][2]*2.5+1)+"rem";
    box.appendChild(el);
    setTimeout(()=>el.classList.add("show"),80);
  });
  setTimeout(()=>{
    box.innerHTML='<span class="word big show">IMPACT</span>';
    document.querySelector(".impact-note").classList.add("show");
  },2700);
}

document.getElementById("finalBtn").addEventListener("click",()=>show("end"));
document.getElementById("restart").addEventListener("click",()=>show("welcome"));

function celebration(){
  for(let i=0;i<70;i++){
    const p=document.createElement("div");
    p.style.position="fixed";
    p.style.left=Math.random()*100+"vw";
    p.style.top="-15px";
    p.style.width=(4+Math.random()*5)+"px";
    p.style.height=(7+Math.random()*10)+"px";
    p.style.background=["#e7c76d","#f5f3ed","#9b8cff","#7ed9a2"][Math.floor(Math.random()*4)];
    p.style.zIndex="20";
    p.style.pointerEvents="none";
    p.style.transform=`rotate(${Math.random()*180}deg)`;
    p.style.transition=`transform ${2.8+Math.random()*2}s linear, top ${2.8+Math.random()*2}s linear, opacity 1s`;
    document.body.appendChild(p);
    requestAnimationFrame(()=>{
      p.style.top="110vh";
      p.style.transform=`translateX(${(Math.random()-.5)*180}px) rotate(${Math.random()*720}deg)`;
    });
    setTimeout(()=>p.remove(),5000);
  }
}

// Ambient particle field
const c=document.getElementById("particles"),ctx=c.getContext("2d");
let dots=[];
function resize(){
  const d=window.devicePixelRatio||1;
  c.width=innerWidth*d;c.height=innerHeight*d;ctx.setTransform(d,0,0,d,0,0);
  dots=Array.from({length:70},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.5+.3,v:Math.random()*.18+.03}));
}
function draw(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  dots.forEach(p=>{
    p.y-=p.v;if(p.y<0)p.y=innerHeight;
    ctx.globalAlpha=.25+p.r/5;
    ctx.fillStyle="#d7b866";ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
  });
  requestAnimationFrame(draw);
}
addEventListener("resize",resize);resize();draw();
