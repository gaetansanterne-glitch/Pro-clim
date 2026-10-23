
/* ==========================================
   PRO CLIM — ÉCRAN DE LANCEMENT
========================================== */

(function () {
    "use strict";

    function lancerEcranProClim() {
        const splash = document.getElementById("proClimSplash");

        if (!splash) return;

        window.setTimeout(function () {
            splash.classList.add("is-hidden");

            window.setTimeout(function () {
                if (splash.parentNode) {
                    splash.parentNode.removeChild(splash);
                }
            }, 550);
        }, 1800);
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            lancerEcranProClim,
            { once: true }
        );
    } else {
        lancerEcranProClim();
    }
})();
