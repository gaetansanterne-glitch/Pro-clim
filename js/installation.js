/* ==========================================
   PRO CLIM — CHOIX DE L'INSTALLATION
   Multi-split / Gainable
   Correction complète des champs fantômes
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    let typeInstallation = "split";


    /* ==========================================
       ELEMENTS PRINCIPAUX
    ========================================== */

    const etape1 =
        document.getElementById("etape1");

    const boutonContinuer =
        document.getElementById("btnEtape1");


    if (!etape1 || !boutonContinuer) {

        console.error(
            "Pro Clim : étape 1 introuvable."
        );

        return;
    }


    /* ==========================================
       CHOIX INSTALLATION
    ========================================== */

    const choix =
        document.createElement("div");

    choix.className =
        "choice-group";

    choix.id =
        "choixInstallation";


    choix.innerHTML = `

        <label>Type d'installation</label>

        <p class="step-description">
            Quel système souhaites-tu dimensionner ?
        </p>

        <div class="choice-grid">

            <button
                type="button"
                class="choice selected"
                data-installation="split">

                ❄️ Split mural

            </button>


            <button
                type="button"
                class="choice"
                data-installation="multisplit">

                🔗 Multi-split

            </button>


            <button
                type="button"
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
       CHAMPS CLASSIQUES D'ORIGINE
    ========================================== */

    const longueurOriginale =
        document.getElementById("longueur");

    const largeurOriginale =
        document.getElementById("largeur");

    const hauteurOriginale =
        document.getElementById("hauteur");


    /*
     * IMPORTANT :
     * On récupère le bloc .field contenant
     * chacun des anciens champs.
     */

    function trouverBlocChamp(element) {

        if (!element) {
            return null;
        }


        const bloc =
            element.closest(".field");


        if (bloc) {
            return bloc;
        }


        return element.parentElement;

    }


    const blocLongueur =
        trouverBlocChamp(
            longueurOriginale
        );

    const blocLargeur =
        trouverBlocChamp(
            largeurOriginale
        );

    const blocHauteur =
        trouverBlocChamp(
            hauteurOriginale
        );


    /* ==========================================
       MASQUER LES ANCIENS CHAMPS
    ========================================== */

    function masquerChampsClassiques() {

        [
            blocLongueur,
            blocLargeur,
            blocHauteur

        ].forEach(bloc => {

            if (!bloc) {
                return;
            }


            /*
             * hidden = sécurité supplémentaire
             */

            bloc.hidden = true;


            /*
             * !important = passe au-dessus
             * des règles CSS existantes
             */

            bloc.style.setProperty(
                "display",
                "none",
                "important"
            );

        });

    }


    /* ==========================================
       AFFICHER LES ANCIENS CHAMPS
    ========================================== */

    function afficherChampsClassiques() {

        [
            blocLongueur,
            blocLargeur,
            blocHauteur

        ].forEach(bloc => {

            if (!bloc) {
                return;
            }


            bloc.hidden = false;


            bloc.style.removeProperty(
                "display"
            );

        });

    }


    /* ==========================================
       NOMBRE DE PIECES
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

                <option value="1">
                    1 pièce
                </option>

                <option value="2">
                    2 pièces
                </option>

                <option value="3">
                    3 pièces
                </option>

                <option value="4">
                    4 pièces
                </option>

                <option value="5">
                    5 pièces
                </option>

            </select>

        </div>

    `;


    choix.after(
        nombrePiecesContainer
    );


    /* ==========================================
       CONTENEUR PIECES
    ========================================== */

    const piecesContainer =
        document.createElement("div");


    piecesContainer.id =
        "piecesContainer";


    piecesContainer.style.display =
        "none";


    nombrePiecesContainer.after(
        piecesContainer
    );


    /* ==========================================
       CREER LES PIECES
    ========================================== */

    function afficherPieces() {

        const select =
            document.getElementById(
                "nombrePieces"
            );


        if (!select) {
            return;
        }


        const nombre =
            parseInt(
                select.value,
                10
            );


        /*
         * Sauvegarde des valeurs déjà saisies
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

                    nom:
                        nom
                            ? nom.value
                            : "",

                    longueur:
                        longueur
                            ? longueur.value
                            : "",

                    largeur:
                        largeur
                            ? largeur.value
                            : "",

                    hauteur:
                        hauteur
                            ? hauteur.value
                            : ""

                });

            }

        }


        /*
         * Nettoyage
         */

        piecesContainer.innerHTML =
            "";


        /* ==========================================
           CREATION DES CARTES
        ========================================== */

        for (
            let i = 1;
            i <= nombre;
            i++
        ) {

            const ancienne =
                anciennesPieces[i - 1] || {};


            const carte =
                document.createElement(
                    "div"
                );


            carte.className =
                "choice-group piece-card";


            carte.innerHTML = `

                <label>
                    📐 Pièce ${i}
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
                        Longueur
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

                    <span>m</span>

                </div>


                <div class="field">

                    <label for="piece${i}Largeur">
                        Largeur
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

                    <span>m</span>

                </div>


                <div class="field">

                    <label for="piece${i}Hauteur">
                        Hauteur sous plafond
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

                    <span>m</span>

                </div>

            `;


            piecesContainer.appendChild(
                carte
            );

        }

    }


    /* ==========================================
       ADAPTER L'AFFICHAGE
    ========================================== */

    function adapterAffichage() {

        const modeMulti =
            typeInstallation === "multisplit" ||
            typeInstallation === "gainable";


        if (modeMulti) {

            /*
             * IMPORTANT :
             * disparition totale des anciens
             * champs Longueur / Largeur / Hauteur
             */

            masquerChampsClassiques();


            nombrePiecesContainer.style.display =
                "block";


            piecesContainer.style.display =
                "block";


            afficherPieces();

        } else {

            /*
             * Split mural
             */

            afficherChampsClassiques();


            nombrePiecesContainer.style.display =
                "none";


            piecesContainer.style.display =
                "none";


            piecesContainer.innerHTML =
                "";

        }

    }


    /* ==========================================
       CHANGEMENT NOMBRE DE PIECES
    ========================================== */

    const nombrePieces =
        document.getElementById(
            "nombrePieces"
        );


    if (nombrePieces) {

        nombrePieces.addEventListener(
            "change",
            afficherPieces
        );

    }


    /* ==========================================
       CHANGEMENT TYPE INSTALLATION
    ========================================== */

    choix
        .querySelectorAll(
            "[data-installation]"
        )
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
       RECUPERER LES PIECES
    ========================================== */

    function getRooms() {

        const select =
            document.getElementById(
                "nombrePieces"
            );


        if (!select) {
            return [];
        }


        const nombre =
            parseInt(
                select.value,
                10
            );


        const pieces = [];


        for (
            let i = 1;
            i <= nombre;
            i++
        ) {

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

                nom:
                    nom &&
                    nom.value.trim()
                        ? nom.value.trim()
                        : `Pièce ${i}`,

                longueur:
                    parseFloat(
                        longueur.value
                    ),

                largeur:
                    parseFloat(
                        largeur.value
                    ),

                hauteur:
                    parseFloat(
                        hauteur.value
                    )

            });

        }


        return pieces;

    }


    /* ==========================================
       VALIDATION
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


        for (
            let i = 0;
            i < pieces.length;
            i++
        ) {

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
       ADAPTER LES RESULTATS
    ========================================== */

    function adapterResultats() {

        const split =
            document.getElementById(
                "resSplit"
            );

        const gainable =
            document.getElementById(
                "resGainable"
            );

        const debit =
            document.getElementById(
                "resDebit"
            );

        const bouches =
            document.getElementById(
                "resBouches"
            );

        const diametre =
            document.getElementById(
                "resDiametre"
            );


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
            debit.closest(
                ".result-item"
            );

        const ligneBouches =
            bouches.closest(
                ".result-item"
            );

        const ligneDiametre =
            diametre.closest(
                ".result-item"
            );


        if (
            typeInstallation === "split"
        ) {

            split.style.display =
                "block";

            gainable.style.display =
                "none";


            if (ligneDebit) {
                ligneDebit.style.display =
                    "none";
            }

            if (ligneBouches) {
                ligneBouches.style.display =
                    "none";
            }

            if (ligneDiametre) {
                ligneDiametre.style.display =
                    "none";
            }


        } else if (
            typeInstallation === "multisplit"
        ) {

            split.style.display =
                "block";

            gainable.style.display =
                "none";


            if (ligneDebit) {
                ligneDebit.style.display =
                    "none";
            }

            if (ligneBouches) {
                ligneBouches.style.display =
                    "none";
            }

            if (ligneDiametre) {
                ligneDiametre.style.display =
                    "none";
            }


        } else {

            split.style.display =
                "none";

            gainable.style.display =
                "block";


            if (ligneDebit) {
                ligneDebit.style.display =
                    "";
            }

            if (ligneBouches) {
                ligneBouches.style.display =
                    "";
            }

            if (ligneDiametre) {
                ligneDiametre.style.display =
                    "";
            }

        }

    }


    /* ==========================================
       API PRO CLIM
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
                ? parseInt(
                    select.value,
                    10
                )
                : 1;

        },


        getRooms,

        validerPieces,

        adapterResultats

    };


    /* ==========================================
       CALCUL
    ========================================== */

    const boutonCalculer =
        document.getElementById(
            "btnCalculer"
        );


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
