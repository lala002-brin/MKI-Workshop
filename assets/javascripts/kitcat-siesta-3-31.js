/* KITCAT LAB 3.31: page-scoped class only; no DOM hiding or studio logic changes. */
(function(){
  function setScope(){
    var p = decodeURIComponent(window.location.pathname || "");
    document.body.classList.toggle("kitcat-siesta-docs", /(?:^|\/)Modul_SIESTA_Interaktif(?:\/|$)/i.test(p));
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded",setScope);
  else setScope();
  if(typeof document$ !== "undefined" && document$.subscribe) document$.subscribe(setScope);
})();
