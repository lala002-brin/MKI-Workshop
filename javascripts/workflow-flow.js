/* =========================================================
   WORKFLOW STEP FLOW ANIMATION
========================================================= */


document.addEventListener(
"DOMContentLoaded",
()=>{


const steps =
document.querySelectorAll(
".mki-workflow-modern .mki-workflow-step"
);



if(!steps.length) return;



const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(
(entry)=>{


if(entry.isIntersecting){


let index = 0;


const timer =
setInterval(()=>{


steps.forEach(
(step)=>
step.classList.remove(
"flow-active"
)
);



steps[index].classList.add(
"flow-active"
);



index++;


if(index >= steps.length){

index=0;

}


},1200);



observer.disconnect();


}

});


},
{
threshold:.4
}
);



observer.observe(
document.querySelector(
".mki-workflow-modern"
)
);


});
