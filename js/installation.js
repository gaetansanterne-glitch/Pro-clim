/* ==========================================
   PRO CLIM — CHOIX DE L'INSTALLATION
   Ajout indépendant, sans remplacer app.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    let typeInstallation = "split";

    const etape1 = document.getElementById("etape1");
    const boutonContinuer = document.getElementById("btnEtape1");

    if (!etape1 || !boutonContinuer) {
        console.error("Pro Clim : étape 1 introuvable.");
        return;
    }

    /* CRÉATION DU CHOIX D'INSTALLATION */

    const choix = document.createElement("div");

    choix.className = "choice-group";
    choix.id = "choixInstallation";

    choix.innerHTML = `
        <label>Type d'installation</label>

        <p class="step-description">
            Quel système souhaites-tu dimensionner ?
        </p>

        <div class="choice-grid">

            <button type="button"
                    class="choice selected"
                    data-installation="split">
                ❄️ Split mural
            </button>

            <button type="button"
                    class="choice"
                    data-installation="gainable">
                🌬️ Gainable
            </button>

        </div>
    `;

    const premierChamp = etape1.querySelector(".field");

    if (premierChamp) {
        premierChamp.before(choix);
    } else {
        boutonContinuer.before(choix);
    }

    /* MÉMORISATION DU CHOIX */

    choix.querySelectorAll("[data-installation]")
        .forEach(bouton => {

            bouton.addEventListener("click", () => {

                typeInstallation =
                    bouton.dataset.installation;

                choix.querySelectorAll("[data-installation]")
                    .forEach(autre => {
                        autre.classList.remove("selected");
                    });

                bouton.classList.add("selected");

            });

        });

    /* ADAPTATION DES RÉSULTATS */

    function adapterResultats() {

        const split = document.getElementById("resSplit");
        const gainable = document.getElementById("resGainable");

        const debit = document.getElementById("resDebit");
        const bouches = document.getElementById("resBouches");
        const diametre = document.getElementById("resDiametre");

        if (!split || !gainable || !debit || !bouches || !diametre) {
            console.error("Pro Clim : résultats introuvables.");
            return;
        }

        const ligneDebit = debit.closest(".result-item");
        const ligneBouches = bouches.closest(".result-item");
        const ligneDiametre = diametre.closest(".result-item");

        if (typeInstallation === "split") {

            split.style.display = "block";
            gainable.style.display = "none";

            if (ligneDebit) ligneDebit.style.display = "none";
            if (ligneBouches) ligneBouches.style.display = "none";
            if (ligneDiametre) ligneDiametre.style.display = "none";

            split.textContent = "Split mural : " +
                split.textContent.replace(/^Split\s*:\s*/i, "");

        } else {

            split.style.display = "none";
            gainable.style.display = "block";

            if (ligneDebit) ligneDebit.style.display = "";
            if (ligneBouches) ligneBouches.style.display = "";
            if (ligneDiametre) ligneDiametre.style.display = "";

            gainable.textContent = "Gainable : " +
                gainable.textContent.replace(/^Gainable\s*:\s*/i, "");

        }

    }

    /* LE CALCUL EXISTANT RESTE INCHANGÉ */

    const boutonCalculer = document.getElementById("btnCalculer");

    if (boutonCalculer) {
        boutonCalculer.addEventListener("click", () => {

            window.setTimeout(adapterResultats, 0);

        });
    }

    console.log("Pro Clim : choix Split / Gainable chargé.");

});
