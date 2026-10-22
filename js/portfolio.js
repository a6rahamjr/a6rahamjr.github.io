'use strict';
const data=JSON.parse(document.getElementById('project-data').textContent);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const deck=document.querySelector('.deck'),scrub=document.getElementById('scrub');
let current=0,paused=reduced.matches,hovering=false,startX=0;
function renderDeck(){
  deck.replaceChildren();
  for(let position=2;position>=0;position--){
    const index=(current+position)%data.length,p=data[index],card=document.createElement('article');
    card.className='deck-card';card.dataset.pos=position;card.style.setProperty('--tone',[225,285,160,30,195][index%5]);
    const label=document.createElement('small');label.textContent=index===0?'Featured project':'Open source';
    const title=document.createElement('h3');title.textContent=p.title;
    const description=document.createElement('p');description.textContent=p.summary;
    const diagram=document.createElement('div');diagram.className='diagram';diagram.setAttribute('aria-hidden','true');
    for(let i=0;i<8;i++){const bar=document.createElement('i');bar.style.setProperty('--i',i);diagram.append(bar);}
    const link=document.createElement('a');link.href='#project-'+index;link.textContent='See the project ↓';
    link.addEventListener('click',()=>{if(index>=5)showAll();});
    card.append(label,title,description,diagram,link);
    if(position!==0){card.inert=true;card.setAttribute('aria-hidden','true');}
    deck.append(card);
    if(!reduced.matches&&card.animate){card.animate([{opacity:0,translate:'24px 8px'},{opacity:1,translate:'0 0'}],{duration:650,easing:'cubic-bezier(.22,1,.36,1)'});}
  }
  document.getElementById('counter').textContent=String(current+1).padStart(2,'0')+' / '+data.length;
  scrub.value=current;
}
function step(delta){current=(current+delta+data.length)%data.length;renderDeck();}
document.getElementById('prev').onclick=()=>step(-1);
document.getElementById('next').onclick=()=>step(1);
scrub.oninput=()=>{current=Number(scrub.value);renderDeck();};
const pause=document.getElementById('pause');
function pauseState(){pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow');pause.textContent=paused?'▶':'Ⅱ';}
pause.onclick=()=>{paused=!paused;pauseState();};pauseState();
deck.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();step(event.key==='ArrowRight'?1:-1);}});
deck.addEventListener('pointerenter',()=>hovering=true);deck.addEventListener('pointerleave',()=>hovering=false);
deck.addEventListener('pointerdown',event=>startX=event.clientX);
deck.addEventListener('pointerup',event=>{if(Math.abs(event.clientX-startX)>60)step(event.clientX<startX?1:-1);});
setInterval(()=>{if(!paused&&!hovering&&!document.hidden&&!deck.contains(document.activeElement)&&deck.getBoundingClientRect().bottom>0)step(1);},4200);
renderDeck();
const menu=document.getElementById('menu'),nav=document.getElementById('nav-links');
menu.onclick=()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');};
nav.querySelectorAll('a').forEach(a=>a.onclick=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');});
document.getElementById('theme').onclick=event=>{document.documentElement.style.setProperty('--tx',event.clientX+'px');document.documentElement.style.setProperty('--ty',event.clientY+'px');const update=()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('jr-theme',theme);}catch{}};if(document.startViewTransition&&!reduced.matches)document.startViewTransition(update);else update();};
function clock(){document.getElementById('clock').textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Berlin',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(new Date());}clock();setInterval(clock,1000);
const search=document.getElementById('skill-search'),chips=document.getElementById('skill-chips'),results=document.getElementById('skill-projects');
const skills=[...new Set(data.flatMap(p=>p.tags))].sort();let selected='';
const skillMap=document.querySelector('.skill-map');
const svgNS='http://www.w3.org/2000/svg';
const skillLines=document.createElementNS(svgNS,'svg');
skillLines.classList.add('skill-lines');skillLines.setAttribute('aria-hidden','true');skillMap.prepend(skillLines);
let previewSkill='',previewProject=null,lineFrame=0;
function drawSkillLines(){
  skillLines.replaceChildren();
  const bounds=skillMap.getBoundingClientRect();
  if(!bounds.width||!bounds.height)return;
  skillLines.setAttribute('viewBox',`0 0 ${bounds.width} ${bounds.height}`);
  const mobile=matchMedia('(max-width:560px)').matches;
  chips.querySelectorAll('.chip.lit').forEach(button=>{
    const from=button.getBoundingClientRect();
    results.querySelectorAll('.skill-result.lit').forEach(project=>{
      if(!data[Number(project.dataset.index)].tags.includes(button.dataset.skill))return;
      const to=project.getBoundingClientRect();
      const x1=(mobile?from.left+from.width/2:from.right)-bounds.left;
      const y1=(mobile?from.bottom:from.top+from.height/2)-bounds.top;
      const x2=(mobile?to.left+to.width/2:to.left)-bounds.left;
      const y2=(mobile?to.top:to.top+to.height/2)-bounds.top;
      const d=mobile?`M${x1},${y1} C${x1},${(y1+y2)/2} ${x2},${(y1+y2)/2} ${x2},${y2}`:`M${x1},${y1} C${(x1+x2)/2},${y1} ${(x1+x2)/2},${y2} ${x2},${y2}`;
      const path=document.createElementNS(svgNS,'path');path.setAttribute('d',d);path.setAttribute('pathLength','1');skillLines.append(path);
      const pulse=path.cloneNode();pulse.classList.add('signal');skillLines.append(pulse);
    });
  });
}
function highlightSkills(){
  const active=previewSkill||selected;
  const project=previewProject===null?null:data[previewProject];
  skillMap.classList.toggle('has-selection',Boolean(active||project));
  chips.querySelectorAll('.chip').forEach(button=>{
    button.classList.toggle('active',button.dataset.skill===selected);
    button.setAttribute('aria-pressed',String(button.dataset.skill===selected));
    button.classList.toggle('lit',project?project.tags.includes(button.dataset.skill):button.dataset.skill===active);
  });
  results.querySelectorAll('.skill-result').forEach(link=>link.classList.toggle('lit',project?Number(link.dataset.index)===previewProject:data[Number(link.dataset.index)].tags.includes(active)));
  cancelAnimationFrame(lineFrame);lineFrame=requestAnimationFrame(drawSkillLines);
}
function renderSkills(){
  const query=search.value.trim().toLowerCase();chips.replaceChildren();results.replaceChildren();previewSkill='';previewProject=null;
  skills.filter(s=>s.toLowerCase().includes(query)).forEach((skill,index)=>{
    const button=document.createElement('button');button.className='chip';button.dataset.skill=skill;button.textContent=skill;button.style.setProperty('--entry',Math.min(index,10));
    button.onclick=()=>{selected=selected===skill?'':skill;previewSkill='';highlightSkills();};
    button.onpointerenter=()=>{previewSkill=skill;previewProject=null;highlightSkills();};
    button.onpointerleave=()=>{previewSkill='';highlightSkills();};
    button.onfocus=()=>{previewSkill=skill;highlightSkills();};
    button.onblur=()=>{previewSkill='';highlightSkills();};chips.append(button);
  });
  const matches=data.filter(p=>p.tags.some(t=>t.toLowerCase().includes(query)));
  matches.forEach((p,index)=>{
    const a=document.createElement('a');a.className='skill-result';a.dataset.index=data.indexOf(p);a.href='#project-'+data.indexOf(p);a.style.setProperty('--entry',index);a.onclick=()=>showAll();a.textContent=p.title;
    const sub=document.createElement('small');sub.textContent=p.tags.join(' · ');a.append(sub);
    a.onpointerenter=a.onfocus=()=>{previewProject=data.indexOf(p);previewSkill='';highlightSkills();};
    a.onpointerleave=a.onblur=()=>{previewProject=null;highlightSkills();};results.append(a);
  });
  if(!matches.length)results.textContent='No matching skills or projects.';
  highlightSkills();
}
if('ResizeObserver' in window)new ResizeObserver(()=>{cancelAnimationFrame(lineFrame);lineFrame=requestAnimationFrame(drawSkillLines);}).observe(skillMap);
addEventListener('resize',()=>{cancelAnimationFrame(lineFrame);lineFrame=requestAnimationFrame(drawSkillLines);});
skillMap.addEventListener('keydown',event=>{if(event.key==='Escape'){selected='';previewSkill='';previewProject=null;highlightSkills();}});
search.oninput=()=>{selected='';renderSkills();};document.getElementById('clear-search').onclick=()=>{search.value='';selected='';renderSkills();search.focus();};renderSkills();
const more=document.getElementById('show-more');let expanded=false;
function showAll(){expanded=true;updateProjects();}
function updateProjects(){document.querySelectorAll('.project').forEach((p,i)=>p.hidden=i>=5&&!expanded);more.setAttribute('aria-expanded',String(expanded));more.textContent=expanded?'Show fewer projects ▴':'Show all '+data.length+' projects ▾';}
more.onclick=()=>{expanded=!expanded;updateProjects();};updateProjects();
document.getElementById('copy-email').onclick=async()=>{const status=document.getElementById('copy-status');try{await navigator.clipboard.writeText('abrahamjraikerathu@gmail.com');status.textContent='Copied';}catch{status.textContent='Select the email address to copy it.';}};
const sections=[...document.querySelectorAll('main section')],map=document.querySelector('.chapter-map');
sections.forEach(section=>{const a=document.createElement('a');a.href='#'+section.id;a.title=section.querySelector('h2').textContent;a.setAttribute('aria-label',a.title);map.append(a);});
if('IntersectionObserver' in window){document.body.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.05});sections.forEach(s=>observer.observe(s));}
let ticking=false;function progress(){sections.forEach((section,i)=>{const r=section.getBoundingClientRect();map.children[i].style.setProperty('--progress',Math.max(0,Math.min(1,(innerHeight-r.top)/(r.height+innerHeight))));if(r.top<innerHeight*.4&&r.bottom>innerHeight*.4)nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.hash==='#'+section.id));});ticking=false;}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(progress);ticking=true;}},{passive:true});progress();
