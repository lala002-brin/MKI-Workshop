/* =========================================================
   MKI RESEARCH CASE REVEAL
========================================================= */


document.addEventListener(
"DOMContentLoaded",
()=>{


const cases =
document.querySelectorAll(
".mki-research-case"
);



if(!cases.length) return;



const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(
(entry,index)=>{


if(entry.isIntersecting){


setTimeout(()=>{


entry.target.classList.add(
"research-show"
);


}, index * 180);


}


});


},
{
threshold:0.15
}
);



cases.forEach(
(item)=>{

observer.observe(item);

});


});
