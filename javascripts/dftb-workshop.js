document.addEventListener(
"DOMContentLoaded",
()=>{


document
.querySelectorAll("pre")
.forEach(
(block)=>{


let button=document.createElement("button");


button.innerText="Copy";


button.style.position="absolute";

button.style.right="15px";

button.style.top="15px";


block.style.position="relative";


button.className="copy-btn";


button.onclick=()=>{


navigator.clipboard.writeText(
block.innerText
);


button.innerText="Copied";


setTimeout(
()=>button.innerText="Copy",
1500
);


};


block.appendChild(button);


}

);


});
