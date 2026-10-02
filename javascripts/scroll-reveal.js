document.addEventListener(
"DOMContentLoaded",
()=>{


const cards =
document.querySelectorAll(
".mki-feature-card"
);


const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(
(entry,index)=>{


if(entry.isIntersecting){

setTimeout(()=>{

entry.target.classList.add(
"show"
);

},index*120);


}

});


},
{
threshold:.15
}
);



cards.forEach(card=>{

observer.observe(card);

});


});
