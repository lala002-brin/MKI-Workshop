/* =========================================================
   MKI WORKSHOP
   CINEMATIC HERO PARALLAX
   ========================================================= */

(function () {

  function initHomeParallax() {

    const hero =
      document.querySelector(".home-hero");

    const image =
      document.querySelector(
        ".home-hero-media img"
      );

    if (!hero || !image) {
      return;
    }


    /*
     * Prevent duplicate listeners
     * when MkDocs instant navigation runs.
     */

    if (hero.dataset.parallaxReady === "true") {
      return;
    }

    hero.dataset.parallaxReady = "true";


    let currentY = 0;
    let targetY = 0;
    let rafId = null;


    /*
     * -------------------------------------------------------
     * PARALLAX SETTINGS
     * -------------------------------------------------------
     */

    const PARALLAX_STRENGTH = 0.32;

    const MAX_MOVEMENT = 240;


    /*
     * -------------------------------------------------------
     * CALCULATE POSITION
     * -------------------------------------------------------
     */

    function calculateTarget() {

      const rect =
        hero.getBoundingClientRect();


      /*
       * How far the hero has moved
       * upward through the viewport.
       */

      const scrolled =
        -rect.top;


      /*
       * Only activate while the hero
       * is actually being scrolled.
       */

      if (scrolled <= 0) {

        targetY = 0;

      } else {

        targetY =
          scrolled *
          PARALLAX_STRENGTH;

      }


      /*
       * Prevent the image from moving
       * excessively.
       */

      targetY =
        Math.max(
          0,
          Math.min(
            targetY,
            MAX_MOVEMENT
          )
        );


      startAnimation();

    }


    /*
     * -------------------------------------------------------
     * SMOOTH ANIMATION
     * -------------------------------------------------------
     */

    function animate() {

      currentY +=
        (targetY - currentY) *
        0.08;


      image.style.setProperty(
        "transform",
        "translate3d(0, " +
        currentY.toFixed(2) +
        "px, 0) scale(1.08)",
        "important"
      );


      if (
        Math.abs(
          targetY - currentY
        ) > 0.03
      ) {

        rafId =
          window.requestAnimationFrame(
            animate
          );

      } else {

        rafId = null;

      }

    }


    function startAnimation() {

      if (rafId === null) {

        rafId =
          window.requestAnimationFrame(
            animate
          );

      }

    }


    /*
     * -------------------------------------------------------
     * EVENTS
     * -------------------------------------------------------
     */

    window.addEventListener(
      "scroll",
      calculateTarget,
      {
        passive: true
      }
    );


    window.addEventListener(
      "resize",
      calculateTarget
    );


    /*
     * Initial position
     */

    calculateTarget();

  }


  /*
   * -------------------------------------------------------
   * START
   * -------------------------------------------------------
   */

  function start() {

    initHomeParallax();

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      start
    );

  } else {

    start();

  }


  /*
   * Material for MkDocs
   * instant navigation
   */

  if (
    typeof document$ !==
    "undefined"
  ) {

    document$.subscribe(function () {

      setTimeout(
        start,
        100
      );

    });

  }
/* =========================================================
   WORKFLOW SCROLL REVEAL
========================================================= */

const workflowCards =
document.querySelectorAll(
  ".mki-workflow-modern .mki-workflow-step"
);


const workflowObserver =
new IntersectionObserver(
(entries)=>{

entries.forEach(
(entry,index)=>{

if(entry.isIntersecting){

setTimeout(()=>{

entry.target.classList.add(
"workflow-show"
);

}, index * 120);

}

});

},
{
threshold:0.2
}
);


workflowCards.forEach(
(card)=>
workflowObserver.observe(card)
);

})();
