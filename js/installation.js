/* ==========================================
   PRO CLIM
   GESTION DE L'INSTALLATION
   Version 2 — MONO / MULTI-PIÈCES
========================================== */

document.addEventListener("DOMContentLoaded", () => {

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
       ÉTAT
    ========================================== */

    let typeInstallation = "split";

    let nombrePieces = 1;


    /* ==========================================
       OBJET GLOBAL
    ========================================== */

    window.PROCLIM = {

        getTypeInstallation() {

            return typeInstallation;

        },


        getNombrePieces() {

            return nombrePieces;

        },


        getRooms() {

            const pieces = [];


            for (
                let i = 1;
                i <= nombrePieces;
                i++
            ) {

                const longueur =
                    document.getElementById(
                        `piece${i}Longueur`
                    );

                const largeur =
                    document.getElementById(
                        `piece${iLargeur}`
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


                const occupation =
                    document.getElementById(
                        `piece${i}Occupation`
                    );

                const eclairage =
                    document.getElementById(
                        `piece${i}Eclairage`
                    );

                const informatique =
                    document.getElementById(
                        `piece${i}Informatique`
                    );


                pieces.push({

                    nom:
                        `Pièce ${i}`,

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
                        ),

                    occupation:
                        occupation
                            ? parseInt(
                                occupation.value,
                                10
                            )
                            : 1,

                    eclairage:
                        eclairage
                            ? eclairage.value
                            : "Standard",

                    informatique:
                        informatique
                            ? informatique.value
                            : "Aucun"

                });

            }


            return pieces;

        }

    };


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

        <label>
            Type d'installation
        </label>

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

        <div id="nombrePiecesContainer"></div>

    `;


    const premierChamp =
        etape1.querySelector(".field");


    if (premierChamp) {

        premierChamp.before(choix);

    } else {

        boutonContinuer.before(choix);

    }


    /* ==========================================
       CONTAINER PIÈCES
    ========================================== */

    const nombrePiecesContainer =
        document.getElementById(
            "nombrePiecesContainer"
        );


    /* ==========================================
       CHOIX DU NOMBRE DE PIÈCES
    ========================================== */

    function afficherChoixNombrePieces() {

        if (
            typeInstallation === "split"
        ) {

            nombrePieces = 1;

            nombrePiecesContainer.innerHTML =
                "";

            afficherPieces();

            return;

        }


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

            <div id="piecesContainer"></div>

        `;


        const select =
            document.getElementById(
                "nombrePieces"
            );


        select.value =
            nombrePieces;


        select.addEventListener(
            "change",
            () => {

                nombrePieces =
                    parseInt(
                        select.value,
                        10
                    );

                afficherPieces();

            }
        );


        afficherPieces();

    }


    /* ==========================================
       CRÉATION DES PIÈCES
    ========================================== */

    function afficherPieces() {

        let container =
            document.getElementById(
                "piecesContainer"
            );


        if (
            typeInstallation === "split"
        ) {

            if (!container) {

                container =
                    document.createElement(
                        "div"
                    );

                container.id =
                    "piecesContainer";

                nombrePiecesContainer
                    .appendChild(container);

            }

        }


        if (!container) return;


        container.innerHTML = "";


        for (
            let i = 1;
            i <= nombrePieces;
            i++
        ) {

            const ancienneLongueur =
                document.getElementById(
                    `piece${i}Longueur`
                );


            const valeurLongueur =
                ancienneLongueur
                    ? ancienneLongueur.value
                    : "";


            const ancienneLargeur =
                document.getElementById(
                    `piece${i}Largeur`
                );


            const valeurLargeur =
                ancienneLargeur
                    ? ancienneLargeur.value
                    : "";


            const ancienneHauteur =
                document.getElementById(
                    `piece${i}Hauteur`
                );


            const valeurHauteur =
                ancienneHauteur
                    ? ancienneHauteur.value
                    : "";


            const carte =
                document.createElement(
                    "div"
                );


            carte.className =
                "card";


            carte.style.marginTop =
                "15px";


            carte.innerHTML = `

                <h3>
                    📐 Pièce ${i}
                </h3>

                <div class="field">

                    <label>
                        Nom de la pièce
                    </label>

                    <input
                        id="piece${i}Nom"
                        type="text"
                        placeholder="Ex. Salon"
                    >

                </div>

                <div class="field">

                    <label>
                        Longueur
                    </label>

                    <div class="input-unit">

                        <input
                            id="piece${i}Longueur"
                            type="number"
                            inputmode="decimal"
                            min="0.1"
                            step="0.01"
                            value="${valeurLongueur}"
                            placeholder="Ex. 5"
                        >

                        <span>m</span>

                    </div>

                </div>

                <div class="field">

                    <label>
                        Largeur
                    </label>

                    <div class="input-unit">

                        <input
                            id="piece${i}Largeur"
                            type="number"
                            inputmode="decimal"
                            min="0.1"
                            step="0.01"
                            value="${valeurLargeur}"
                            placeholder="Ex. 4"
                        >

                        <span>m</span>

                    </div>

                </div>

                <div class="field">

                    <label>
                        Hauteur sous plafond
                    </label>

                    <div class="input-unit">

                        <input
                            id="piece${i}Hauteur"
                            type="number"
                            inputmode="decimal"
                            min="1"
                            step="0.01"
                            value="${valeurHauteur}"
                            placeholder="Ex. 2.5"
                        >

                        <span>m</span>

                    </div>

                </div>

            `;


            container.appendChild(carte);

        }

    }


    /* ==========================================
       CHANGEMENT INSTALLATION
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

                            autre.classList
                                .remove(
                                    "selected"
                                );

                        });


                    bouton.classList
                        .add("selected");


                    afficherChoixNombrePieces();

                }
            );

        });


    /* ==========================================
       ADAPTATION INITIALE
    ========================================== */

    afficherChoixNombrePieces();


    /* ==========================================
       VALIDATION DES PIÈCES
    ========================================== */

    window.PROCLIM.validerPieces =
        function () {

            const pieces =
                window.PROCLIM.getRooms();


            if (
                pieces.length !==
                nombrePieces
            ) {

                return false;

            }


            return pieces.every(piece => {

                return (
                    Number.isFinite(
                        piece.longueur
                    ) &&
                    Number.isFinite(
                        piece.largeur
                    ) &&
                    Number.isFinite(
                        piece.hauteur
                    ) &&
                    piece.longueur > 0 &&
                    piece.largeur > 0 &&
                    piece.hauteur > 0
                );

            });

        };


    /* ==========================================
       RÉSULTATS
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
            typeInstallation ===
            "split"
        ) {

            split.style.display =
                "block";

            gainable.style.display =
                "none";


            if (ligneDebit)
                ligneDebit.style.display =
                    "none";

            if (ligneBouches)
                ligneBouches.style.display =
                    "none";

            if (ligneDiametre)
                ligneDiametre.style.display =
                    "none";

        }


        else if (
            typeInstallation ===
            "multisplit"
        ) {

            split.style.display =
                "block";

            gainable.style.display =
                "none";


            if (ligneDebit)
                ligneDebit.style.display =
                    "none";

            if (ligneBouches)
                ligneBouches.style.display =
                    "none";

            if (ligneDiametre)
                ligneDiametre.style.display =
                    "none";

        }


        else {

            split.style.display =
                "none";

            gainable.style.display =
                "block";


            if (ligneDebit)
                ligneDebit.style.display =
                    "";

            if (ligneBouches)
                ligneBouches.style.display =
                    "";

            if (ligneDiametre)
                ligneDiametre.style.display =
                    "";

        }

    }


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


    console.log(
        "❄️ Pro Clim : gestion mono / multi-pièces chargée."
    );

});
