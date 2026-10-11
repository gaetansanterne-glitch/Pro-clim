/* ==========================================
   PRO CLIM — CHOIX DE L'INSTALLATION
   Version Multi-split / Gainable
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    let typeInstallation = "split";

    const etape1 = document.getElementById("etape1");
    const boutonContinuer = document.getElementById("btnEtape1");

    if (!etape1 || !boutonContinuer) {
        console.error("Pro Clim : étape 1 introuvable.");
        return;
    }


    /* ==========================================
       CHOIX DU TYPE D'INSTALLATION
    ========================================== */

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
                    data-installation="multisplit">
                ❄️ Multi-split
            </button>

            <button type="button"
                    class="choice"
                    data-installation="gainable">
                🌬️ Gainable
            </button>

        </div>
    `;


    const premierChamp =
        etape1.querySelector(".field");

    if (premierChamp) {
        premierChamp.before(choix);
    } else {
        boutonContinuer.before(choix);
    }


    /* ==========================================
       CONTENEUR NOMBRE DE PIECES
    ========================================== */

    const nombrePiecesContainer =
        document.createElement("div");

    nombrePiecesContainer.id =
        "nombrePiecesContainer";

    nombrePiecesContainer.style.display =
        "none";

    nombrePiecesContainer.innerHTML = `
        <div class="field">

            <label for="nombrePieces">
                Nombre de pièces
            </label>

            <select id="nombrePieces">

                <option value="1">1 pièce</option>
                <option value="2">2 pièces</option>
                <option value="3">3 pièces</option>
                <option value="4">4 pièces</option>
                <option value="5">5 pièces</option>

            </select>

        </div>
    `;

    choix.after(nombrePiecesContainer);


    /* ==========================================
       CONTENEUR DES PIECES
    ========================================== */

    const piecesContainer =
        document.createElement("div");

    piecesContainer.id =
        "piecesContainer";

    piecesContainer.style.display =
        "none";

    nombrePiecesContainer.after(piecesContainer);


    /* ==========================================
       CHAMPS CLASSIQUES D'ORIGINE
       Longueur / Largeur / Hauteur
    ========================================== */

    const champsClassiques =
        etape1.querySelectorAll(".field");


    /*
     * Les champs classiques correspondent aux
     * champs déjà présents dans index.html.
     *
     * On les identifie grâce à leurs inputs.
     */

    const longueurOriginale =
        document.getElementById("longueur");

    const largeurOriginale =
        document.getElementById("largeur");

    const hauteurOriginale =
        document.getElementById("hauteur");


    let blocLongueur = null;
    let blocLargeur = null;
    let blocHauteur = null;


    if (longueurOriginale) {
        blocLongueur =
            longueurOriginale.closest(".field");
    }

    if (largeurOriginale) {
        blocLargeur =
            largeurOriginale.closest(".field");
    }

    if (hauteurOriginale) {
        blocHauteur =
            hauteurOriginale.closest(".field");
    }


    /* ==========================================
       AFFICHER / MASQUER LES CHAMPS
    ========================================== */

    function adapterAffichage() {

        const modeMulti =
            typeInstallation === "multisplit" ||
            typeInstallation === "gainable";


        if (modeMulti) {

            /*
             * On cache les anciens champs
             * Longueur / Largeur / Hauteur.
             */

            if (blocLongueur) {
                blocLongueur.style.display = "none";
            }

            if (blocLargeur) {
                blocLargeur.style.display = "none";
            }

            if (blocHauteur) {
                blocHauteur.style.display = "none";
            }


            nombrePiecesContainer.style.display =
                "block";

            piecesContainer.style.display =
                "block";


            afficherPieces();

        } else {

            /*
             * Split mural :
             * on remet les champs classiques.
             */

            if (blocLongueur) {
                blocLongueur.style.display = "";
            }

            if (blocLargeur) {
                blocLargeur.style.display = "";
            }

            if (blocHauteur) {
                blocHauteur.style.display = "";
            }


            nombrePiecesContainer.style.display =
                "none";

            piecesContainer.style.display =
                "none";

            piecesContainer.innerHTML = "";
        }

    }


    /* ==========================================
       CREATION DES PIECES
    ========================================== */

    function afficherPieces() {

        const select =
            document.getElementById("nombrePieces");

        if (!select) return;


        const nombre =
            parseInt(select.value, 10);


        /*
         * Sauvegarde des valeurs déjà saisies.
         */

        const anciennesPieces = [];

        for (let i = 1; i <= 5; i++) {

            const nom =
                document.getElementById(
                    `piece${i}Nom`
                );

            const longueur =
                document.getElementById(
                    `piece${i}Longueur`
                );

            const largeur =
                document.getElementById(
                    `piece${i}Largeur`
                );

            const hauteur =
                document.getElementById(
                    `piece${i}Hauteur`
                );


            if (
                nom ||
                longueur ||
                largeur ||
                hauteur
            ) {

                anciennesPieces.push({
                    nom: nom ? nom.value : "",
                    longueur: longueur ? longueur.value : "",
                    largeur: largeur ? largeur.value : "",
                    hauteur: hauteur ? hauteur.value : ""
                });

            }

        }


        piecesContainer.innerHTML = "";


        /* ==========================================
           CREATION DES CARTES
        ========================================== */

        for (let i = 1; i <= nombre; i++) {

            const ancienne =
                anciennesPieces[i - 1] || {};


            const carte =
                document.createElement("div");

            carte.className =
                "choice-group piece-card";


            carte.innerHTML = `
                <label>
                    🏠 Pièce ${i}
                </label>

                <div class="field">

                    <label for="piece${i}Nom">
                        Nom de la pièce
                    </label>

                    <input
                        type="text"
                        id="piece${i}Nom"
                        placeholder="Ex : Salon"
                        value="${ancienne.nom || ""}"
                    >

                </div>


                <div class="field">

                    <label for="piece${i}Longueur">
                        Longueur (m)
                    </label>

                    <input
                        type="number"
                        id="piece${i}Longueur"
                        inputmode="decimal"
                        step="0.01"
                        min="0"
                        placeholder="Ex : 5"
                        value="${ancienne.longueur || ""}"
                    >

                </div>


                <div class="field">

                    <label for="piece${i}Largeur">
                        Largeur (m)
                    </label>

                    <input
                        type="number"
                        id="piece${i}Largeur"
                        inputmode="decimal"
                        step="0.01"
                        min="0"
                        placeholder="Ex : 4"
                        value="${ancienne.largeur || ""}"
                    >

                </div>


                <div class="field">

                    <label for="piece${i}Hauteur">
                        Hauteur sous plafond (m)
                    </label>

                    <input
                        type="number"
                        id="piece${i}Hauteur"
                        inputmode="decimal"
                        step="0.01"
                        min="0"
                        placeholder="Ex : 2,5"
                        value="${ancienne.hauteur || ""}"
                    >

                </div>
            `;


            piecesContainer.appendChild(carte);

        }

    }


    /* ==========================================
       CHANGEMENT DU NOMBRE DE PIECES
    ========================================== */

    const nombrePieces =
        document.getElementById("nombrePieces");


    if (nombrePieces) {

        nombrePieces.addEventListener(
            "change",
            afficherPieces
        );

    }


    /* ==========================================
       SELECTION DU TYPE
    ========================================== */

    choix
        .querySelectorAll("[data-installation]")
        .forEach(bouton => {

            bouton.addEventListener(
                "click",
                () => {

                    typeInstallation =
                        bouton.dataset.installation;


                    choix
                        .querySelectorAll(
                            "[data-installation]"
                        )
                        .forEach(autre => {

                            autre.classList.remove(
                                "selected"
                            );

                        });


                    bouton.classList.add(
                        "selected"
                    );


                    adapterAffichage();

                }
            );

        });


    /* ==========================================
       RECUPERATION DES PIECES
    ========================================== */

    function getRooms() {

        const select =
            document.getElementById("nombrePieces");

        if (!select) return [];

        const nombre =
            parseInt(select.value, 10);

        const pieces = [];


        for (let i = 1; i <= nombre; i++) {

            const nom =
                document.getElementById(
                    `piece${i}Nom`
                );

            const longueur =
                document.getElementById(
                    `piece${i}Longueur`
                );

            const largeur =
                document.getElementById(
                    `piece${i}Largeur`
                );

            const hauteur =
                document.getElementById(
                    `piece${i}Hauteur`
                );


            if (
                !longueur ||
                !largeur ||
                !hauteur
            ) {
                continue;
            }


            pieces.push({

                nom: nom
                    ? nom.value.trim()
                    : `Pièce ${i}`,

                longueur:
                    parseFloat(longueur.value),

                largeur:
                    parseFloat(largeur.value),

                hauteur:
                    parseFloat(hauteur.value)

            });

        }


        return pieces;

    }


    /* ==========================================
       VALIDATION DES PIECES
    ========================================== */

    function validerPieces() {

        const pieces =
            getRooms();


        if (
            pieces.length === 0
        ) {

            return {
                valide: false,
                message:
                    "⚠️ Renseigne au moins une pièce."
            };

        }


        for (let i = 0; i < pieces.length; i++) {

            const piece =
                pieces[i];


            if (
                !piece.longueur ||
                !piece.largeur ||
                !piece.hauteur ||
                piece.longueur <= 0 ||
                piece.largeur <= 0 ||
                piece.hauteur <= 0
            ) {

                return {
                    valide: false,
                    message:
                        `⚠️ Vérifie les dimensions de la pièce ${i + 1}.`
                };

            }

        }


        return {
            valide: true,
            pieces
        };

    }


    /* ==========================================
       ADAPTATION DES RESULTATS
    ========================================== */

    function adapterResultats() {

        const split =
            document.getElementById("resSplit");

        const gainable =
            document.getElementById("resGainable");

        const debit =
            document.getElementById("resDebit");

        const bouches =
            document.getElementById("resBouches");

        const diametre =
            document.getElementById("resDiametre");


        if (
            !split ||
            !gainable ||
            !debit ||
            !bouches ||
            !diametre
        ) {
            return;
        }


        const ligneDebit =
            debit.closest(".result-item");

        const ligneBouches =
            bouches.closest(".result-item");

        const ligneDiametre =
            diametre.closest(".result-item");


        if (typeInstallation === "split") {

            split.style.display = "block";
            gainable.style.display = "none";

            if (ligneDebit)
                ligneDebit.style.display = "none";

            if (ligneBouches)
                ligneBouches.style.display = "none";

            if (ligneDiametre)
                ligneDiametre.style.display = "none";


        } else if (
            typeInstallation === "multisplit"
        ) {

            split.style.display = "block";
            gainable.style.display = "none";

            if (ligneDebit)
                ligneDebit.style.display = "none";

            if (ligneBouches)
                ligneBouches.style.display = "none";

            if (ligneDiametre)
                ligneDiametre.style.display = "none";


        } else {

            split.style.display = "none";
            gainable.style.display = "block";

            if (ligneDebit)
                ligneDebit.style.display = "";

            if (ligneBouches)
                ligneBouches.style.display = "";

            if (ligneDiametre)
                ligneDiametre.style.display = "";

        }

    }


    /* ==========================================
       API POUR APP.JS
    ========================================== */

    window.PROCLIM = {

        getTypeInstallation() {
            return typeInstallation;
        },

        getNombrePieces() {

            const select =
                document.getElementById(
                    "nombrePieces"
                );

            return select
                ? parseInt(select.value, 10)
                : 1;

        },

        getRooms,

        validerPieces,

        adapterResultats

    };


    /* ==========================================
       ADAPTATION AVANT CALCUL
    ========================================== */

    const boutonCalculer =
        document.getElementById("btnCalculer");


    if (boutonCalculer) {

        boutonCalculer.addEventListener(
            "click",
            () => {

                window.setTimeout(
                    adapterResultats,
                    0
                );

            }
        );

    }


    /* ==========================================
       INITIALISATION
    ========================================== */

    adapterAffichage();


    console.log(
        "❄️ Pro Clim : installation Split / Multi-split / Gainable chargée."
    );

});
