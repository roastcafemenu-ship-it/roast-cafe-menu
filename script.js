document.addEventListener("DOMContentLoaded",()=>{
const cats=[...document.querySelectorAll(".cat")],input=document.querySelector("#search"),clear=document.querySelector("#clear"),status=document.querySelector("#status"),empty=document.querySelector("#empty");
cats.forEach(c=>c.querySelector(".toggle").addEventListener("click",()=>{
 const b=c.querySelector(".toggle"),open=b.getAttribute("aria-expanded")==="true";
 cats.forEach(x=>x.querySelector(".toggle").setAttribute("aria-expanded","false"));
 if(!open)b.setAttribute("aria-expanded","true");
}));
const norm=s=>s.toLowerCase().replace(/ي/g,"ی").replace(/ى/g,"ی").replace(/ك/g,"ک").replace(/\s+/g," ").trim();
function search(){
 const q=norm(input.value);clear.hidden=!q;let sections=0,total=0;
 cats.forEach(c=>{
  const items=[...c.querySelectorAll("li")], text=norm(c.innerText), hits=items.filter(x=>norm(x.textContent).includes(q));
  const show=!q||hits.length||text.includes(q);
  c.classList.toggle("hide",!show);c.classList.toggle("hit",!!q&&show);
  items.forEach(x=>x.hidden=!!q&&!text.includes(q)&&!norm(x.textContent).includes(q));
  if(q&&show){sections++;total+=hits.length;c.querySelector(".toggle").setAttribute("aria-expanded","true")}
  if(!q)c.querySelector(".toggle").setAttribute("aria-expanded","false");
 });
 empty.hidden=!!sections||!q;status.textContent=q&&sections?`${total} مورد در ${sections} بخش پیدا شد`:"";
}
input.addEventListener("input",search);clear.addEventListener("click",()=>{input.value="";input.focus();search()});
});