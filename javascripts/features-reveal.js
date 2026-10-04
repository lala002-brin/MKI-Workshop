document.addEventListener(
"DOMContentLoaded",
()=>{

const items =
document.querySelectorAll(
".mki-feature"
);


const observer =
new IntersectionObserver(
(entries)=>{

entries.forEach(
(entry,i)=>{

if(entry.isIntersecting){

setTimeout(()=>{

entry.target.classList.add("show");

},i*120);

}

});

},
{
threshold:.15
}
);


items.forEach(
(item)=>{
observer.observe(item);
}
);


});
/* =====================================================
   MKI FEATURE SCROLL REVEAL
===================================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


const cards =
document.querySelectorAll(
".mki-feature"
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


},index * 150);


}


});


},
{
threshold:0.15
}
);



cards.forEach(
(card)=>{

observer.observe(card);

});


});
