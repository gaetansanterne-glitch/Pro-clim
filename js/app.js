/* ==========================================
   PRO CLIM
   APP.JS V3
   Gestion application + étude multi-pièces
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    let etapeActuelle = 1;


    /* ==========================================
       DONNÉES ÉTUDE
    ========================================== */

    const donneesEtude = {

        longueur: 0,
        largeur: 0,
        hauteur: 0,

        isolation: "Moyenne",
        vitrage: "Double",
        exposition: "Sud",

        etage: "RDC",
        toiture: "Non",
        region: "Centre",

        occupation: 4,
        eclairage: "Standard",
        informatique: "Moyen",

        pieces: []

    };


    /* ==========================================
       PAGES
    ========================================== */

    const pages = {

        accueil:
            document.getElementById(
                "pageAccueil"
            ),

        etude:
            document.getElementById(
                "pageEtude"
            ),

        diagnostic:
            document.getElementById(
                "pageDiagnostic"
            ),

        pression:
            document.getElementById(
                "pagePression"
            ),

        outils:
            document.getElementById(
                "pageOutils"
            ),

        academie:
            document.getElementById(
                "pageAcademie"
            )

    };


    /* ==========================================
       AFFICHER PAGE
    ========================================== */

    function afficherPage(page) {

        Object.values(pages)
            .forEach(section => {

                if (section) {

                    section.classList
                        .remove("active");

                }

            });


        if (pages[page]) {

            pages[page].classList
                .add("active");

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* ==========================================
       AFFICHER ÉTAPE
    ========================================== */

    function afficherEtape(numero) {

        etapeActuelle =
            numero;


        for (
            let i = 1;
            i <= 5;
            i++
        ) {

            const etape =
                document.getElementById(
                    `etape${i}`
                );


            if (etape) {

                etape.classList.toggle(
                    "active",
                    i === numero
                );

            }

        }


        const label =
            document.getElementById(
                "etapeLabel"
            );

        const pourcentage =
            document.getElementById(
                "progressPercent"
            );

        const barre =
            document.getElementById(
                "progressBar"
            );


        const pourcentages = {

            1: 20,
            2: 40,
            3: 60,
            4: 80,
            5: 100

        };


        if (label) {

            label.textContent =
                `Étape ${numero} sur 5`;

        }


        if (pourcentage) {

            pourcentage.textContent =
                `${pourcentages[numero]} %`;

        }


        if (barre) {

            barre.style.width =
                `${pourcentages[numero]}%`;

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* ==========================================
       NOUVELLE ÉTUDE
    ========================================== */

    function nouvelleEtude() {

        afficherPage("etude");

        afficherEtape(1);

    }


    const btnCommencer =
        document.getElementById(
            "btnCommencer"
        );


    if (btnCommencer) {

        btnCommencer.addEventListener(
            "click",
            nouvelleEtude
        );

    }


    const btnAccueilEtude =
        document.getElementById(
            "btnAccueilEtude"
        );


    if (btnAccueilEtude) {

        btnAccueilEtude.addEventListener(
            "click",
            nouvelleEtude
        );

    }


    /* ==========================================
       ÉTAPE 1
    ========================================== */

    const btnEtape1 =
        document.getElementById(
            "btnEtape1"
        );


    if (btnEtape1) {

        btnEtape1.addEventListener(
            "click",
            () => {

                const type =
                    window.PROCLIM &&
                    window.PROCLIM
                        .getTypeInstallation
                        ? window.PROCLIM
                            .getTypeInstallation()
                        : "split";


                /* ==============================
                   MODE MULTI / GAINABLE
                ============================== */

                if (
                    type === "multisplit" ||
                    type === "gainable"
                ) {

                    if (
                        !window.PROCLIM ||
                        !window.PROCLIM
                            .validerPieces()
                    ) {

                        const erreur =
                            document.getElementById(
                                "erreurEtape1"
                            );


                        if (erreur) {

                            erreur.textContent =
                                "⚠️ Merci de renseigner des dimensions valides pour chaque pièce.";

                        }

                        return;

                    }


                    donneesEtude.pieces =
                        window.PROCLIM
                            .getRooms();


                    /* Nom des pièces */

                    donneesEtude.pieces
                        .forEach((piece, index) => {

                            const champ =
                                document.getElementById(
                                    `piece${index + 1}Nom`
                                );


                            if (
                                champ &&
                                champ.value.trim()
                            ) {

                                piece.nom =
                                    champ.value.trim();

                            }

                        });


                    const erreur =
                        document.getElementById(
                            "erreurEtape1"
                        );


                    if (erreur) {

                        erreur.textContent =
                            "";

                    }


                    afficherEtape(2);

                    return;

                }


                /* ==============================
                   MODE SPLIT SIMPLE
                ============================== */

                const longueur =
                    parseFloat(
                        document.getElementById(
                            "longueur"
                        ).value
                    );


                const largeur =
                    parseFloat(
                        document.getElementById(
                            "largeur"
                        ).value
                    );


                const hauteur =
                    parseFloat(
                        document.getElementById(
                            "hauteur"
                        ).value
                    );


                const erreur =
                    document.getElementById(
                        "erreurEtape1"
                    );


                if (
                    !longueur ||
                    !largeur ||
                    !hauteur ||
                    longueur <= 0 ||
                    largeur <= 0 ||
                    hauteur <= 0
                ) {

                    erreur.textContent =
                        "⚠️ Merci de renseigner des dimensions valides.";

                    return;

                }


                erreur.textContent =
                    "";


                donneesEtude.longueur =
                    longueur;

                donneesEtude.largeur =
                    largeur;

                donneesEtude.hauteur =
                    hauteur;


                donneesEtude.pieces = [

                    {

                        nom: "Pièce principale",

                        longueur,
                        largeur,
                        hauteur,

                        occupation:
                            donneesEtude.occupation,

                        eclairage:
                            donneesEtude.eclairage,

                        informatique:
                            donneesEtude.informatique

                    }

                ];


                afficherEtape(2);

            }
        );

    }


    /* ==========================================
       ÉTAPE 2
    ========================================== */

    const btnEtape2 =
        document.getElementById(
            "btnEtape2"
        );


    if (btnEtape2) {

        btnEtape2.addEventListener(
            "click",
            () => {

                afficherEtape(3);

            }
        );

    }


    /* ==========================================
       ÉTAPE 3
    ========================================== */

    const btnEtape3 =
        document.getElementById(
            "btnEtape3"
        );


    if (btnEtape3) {

        btnEtape3.addEventListener(
            "click",
            () => {

                afficherEtape(4);

                preparerEtape4();

            }
        );

    }


    /* ==========================================
       CHOIX
    ========================================== */

    document
        .querySelectorAll(".choice")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const nom =
                        button.dataset.name;

                    const valeur =
                        button.dataset.value;


                    document
                        .querySelectorAll(
                            `.choice[data-name="${nom}"]`
                        )
                        .forEach(btn => {

                            btn.classList
                                .remove(
                                    "selected"
                                );

                        });


                    button.classList
                        .add("selected");


                    if (nom) {

                        donneesEtude[nom] =
                            valeur;

                    }

                }
            );

        });


    /* ==========================================
       ÉTAPE 4 DYNAMIQUE
    ========================================== */

    function preparerEtape4() {

        const type =
            window.PROCLIM &&
            window.PROCLIM
                .getTypeInstallation
                ? window.PROCLIM
                    .getTypeInstallation()
                : "split";


        if (
            type === "multisplit" ||
            type === "gainable"
        ) {

            creerApportsParPiece();

        }

    }


    function creerApportsParPiece() {

        const etape4 =
            document.getElementById(
                "etape4"
            );


        const card =
            etape4.querySelector(
                ".card"
            );


        if (!card) return;


        const ancienneZone =
            card.querySelector(
                "#zoneApportsMulti"
            );


        if (ancienneZone) {

            ancienneZone.remove();

        }


        const zone =
            document.createElement(
                "div"
            );


        zone.id =
            "zoneApportsMulti";


        zone.className =
            "choice-group";


        zone.innerHTML = `

            <label>
                Apports par pièce
            </label>

            <p class="step-description">
                Renseigne les apports principaux
                de chaque local.
            </p>

        `;


        donneesEtude.pieces
            .forEach((piece, index) => {

                const numero =
                    index + 1;


                const bloc =
                    document.createElement(
                        "div"
                    );


                bloc.className =
                    "card";


                bloc.style.marginTop =
                    "15px";


                bloc.innerHTML = `

                    <h3>
                        ${piece.nom ||
                        `Pièce ${numero}`}
                    </h3>

                    <div class="field">

                        <label>
                            Nombre d'occupants
                        </label>

                        <select
                            id="piece${numero}Occupation">

                            <option value="1">
                                1 personne
                            </option>

                            <option value="2">
                                2 personnes
                            </option>

                            <option value="3">
                                3 personnes
                            </option>

                            <option value="4">
                                4 personnes
                            </option>

                            <option value="5">
                                5 personnes
                            </option>

                            <option value="6">
                                6 personnes ou +
                            </option>

                        </select>

                    </div>

                    <div class="field">

                        <label>
                            Éclairage
                        </label>

                        <select
                            id="piece${numero}Eclairage">

                            <option value="LED">
                                LED
                            </option>

                            <option
                                value="Standard"
                                selected>
                                Standard
                            </option>

                            <option value="Halogene">
                                Halogène
                            </option>

                        </select>

                    </div>

                    <div class="field">

                        <label>
                            Informatique
                        </label>

                        <select
                            id="piece${numero}Informatique">

                            <option value="Aucun">
                                Aucun
                            </option>

                            <option value="Faible">
                                Faible
                            </option>

                            <option
                                value="Moyen"
                                selected>
                                Moyen
                            </option>

                            <option value="Important">
                                Important
                            </option>

                        </select>

                    </div>

                `;


                zone.appendChild(
                    bloc
                );

            });


        const erreur =
            document.getElementById(
                "erreurEtape4"
            );


        if (erreur) {

            zone.appendChild(
                erreur
            );

        }


        const navigation =
            card.querySelector(
                ".navigation-buttons"
            );


        if (navigation) {

            card.insertBefore(
                zone,
                navigation
            );

        } else {

            card.appendChild(
                zone
            );

        }

    }


    /* ==========================================
       CALCUL
    ========================================== */

    const btnCalculer =
        document.getElementById(
            "btnCalculer"
        );


    if (btnCalculer) {

        btnCalculer.addEventListener(
            "click",
            calculerEtude
        );

    }


    function calculerEtude() {

        const erreur =
            document.getElementById(
                "erreurEtape4"
            );


        try {

            const type =
                window.PROCLIM &&
                window.PROCLIM
                    .getTypeInstallation
                    ? window.PROCLIM
                        .getTypeInstallation()
                    : "split";


            /* ==============================
               MULTI / GAINABLE
            ============================== */

            if (
                type === "multisplit" ||
                type === "gainable"
            ) {

                donneesEtude.pieces
                    .forEach((piece, index) => {

                        const numero =
                            index + 1;


                        const occupation =
                            document.getElementById(
                                `piece${numero}Occupation`
                            );


                        const eclairage =
                            document.getElementById(
                                `piece${numero}Eclairage`
                            );


                        const informatique =
                            document.getElementById(
                                `piece${numero}Informatique`
                            );


                        piece.occupation =
                            occupation
                                ? parseInt(
                                    occupation.value,
                                    10
                                )
                                : 1;


                        piece.eclairage =
                            eclairage
                                ? eclairage.value
                                : "Standard";


                        piece.informatique =
                            informatique
                                ? informatique.value
                                : "Aucun";

                    });


                if (
                    typeof ETUDE ===
                    "undefined" ||
                    typeof ETUDE.calculMulti !==
                    "function"
                ) {

                    throw new Error(
                        "Le moteur multi-pièces n'est pas chargé."
                    );

                }


                const resultat =
                    ETUDE.calculMulti(
                        donneesEtude
                    );


                afficherResultatsMulti(
                    resultat,
                    type
                );


                afficherEtape(5);

                return;

            }


            /* ==============================
               SPLIT SIMPLE
            ============================== */

            if (
                typeof ETUDE ===
                "undefined" ||
                typeof ETUDE.calcul !==
                "function"
            ) {

                throw new Error(
                    "Le module ETUDE n'est pas chargé."
                );

            }


            const resultat =
                ETUDE.calcul({

                    ...donneesEtude,

                    occupation:
                        donneesEtude.occupation,

                    eclairage:
                        donneesEtude.eclairage,

                    informatique:
                        donneesEtude.informatique

                });


            afficherResultats(
                resultat
            );


            afficherEtape(5);

        }

        catch (error) {

            console.error(error);


            if (erreur) {

                erreur.textContent =
                    "⚠️ Impossible d'effectuer le calcul. Vérifie les modules JavaScript.";

            }

        }

    }


    /* ==========================================
       RÉSULTAT SIMPLE
    ========================================== */

    function afficherResultats(resultat) {

        const surface =
            document.getElementById(
                "resSurface"
            );

        const volume =
            document.getElementById(
                "resVolume"
            );

        const puissance =
            document.getElementById(
                "resPuissance"
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

        const split =
            document.getElementById(
                "resSplit"
            );

        const gainable =
            document.getElementById(
                "resGainable"
            );


        if (surface) {

            surface.textContent =
                `${resultat.surface.toFixed(1)} m²`;

        }


        if (volume) {

            volume.textContent =
                `${resultat.volume.toFixed(1)} m³`;

        }


        if (puissance) {

            puissance.textContent =
                `${resultat.puissance.toLocaleString("fr-FR")} W`;

        }


        if (debit) {

            debit.textContent =
                `${resultat.debit.toLocaleString("fr-FR")} m³/h`;

        }


        if (bouches) {

            bouches.textContent =
                resultat.bouches;

        }


        if (diametre) {

            diametre.textContent =
                `Ø ${resultat.diametre} mm`;

        }


        if (split) {

            split.textContent =
                `Split : ${resultat.split}`;

        }


        if (gainable) {

            gainable.textContent =
                `Gainable : ${resultat.gainable}`;

        }


        afficherCommentaire(
            `
            <strong>💡 Analyse</strong>

            <p>
                Résultat estimatif basé sur
                les caractéristiques renseignées.
            </p>

            <p>
                Le dimensionnement final doit
                être confirmé selon les conditions
                réelles du chantier et les données
                constructeur.
            </p>
            `
        );

    }


    /* ==========================================
       RÉSULTAT MULTI-PIÈCES
    ========================================== */

    function afficherResultatsMulti(
        resultat,
        type
    ) {

        const surface =
            document.getElementById(
                "resSurface"
            );

        const volume =
            document.getElementById(
                "resVolume"
            );

        const puissance =
            document.getElementById(
                "resPuissance"
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

        const split =
            document.getElementById(
                "resSplit"
            );

        const gainable =
            document.getElementById(
                "resGainable"
            );


        if (surface) {

            surface.textContent =
                `${resultat.surfaceTotale.toFixed(1)} m²`;

        }


        if (volume) {

            volume.textContent =
                `${resultat.volumeTotal.toFixed(1)} m³`;

        }


        if (puissance) {

            puissance.textContent =
                `${resultat.puissanceTotale.toLocaleString("fr-FR")} W`;

        }


        if (type === "gainable") {

            if (debit) {

                debit.textContent =
                    `${resultat.debitTotal.toLocaleString("fr-FR")} m³/h`;

            }


            if (bouches) {

                bouches.textContent =
                    resultat.bouchesTotal;

            }


            if (diametre) {

                const diametreTotal =
                    ETUDE.calculDiametre(
                        resultat.debitTotal
                    );


                diametre.textContent =
                    `Ø ${diametreTotal} mm`;

            }


            if (gainable) {

                gainable.textContent =
                    `Gainable : étude globale`;

            }

        }


        if (type === "multisplit") {

            if (debit) {

                debit.textContent =
                    "—";

            }


            if (bouches) {

                bouches.textContent =
                    "—";

            }


            if (diametre) {

                diametre.textContent =
                    "—";

            }


            if (split) {

                split.textContent =
                    `Multi-split : ${resultat.pieces.length} unités intérieures`;

            }

        }


        let html = `

            <strong>📊 Détail de l'étude</strong>

            <p>
                ${resultat.pieces.length}
                pièce(s) étudiée(s)
            </p>

        `;


        resultat.pieces
            .forEach((piece, index) => {

                html += `

                    <div
                        style="
                            margin-top:12px;
                            padding:12px;
                            border:1px solid #ddd;
                            border-radius:10px;
                        "
                    >

                        <strong>
                            ${piece.nom ||
                            `Pièce ${index + 1}`}
                        </strong>

                        <br>

                        Surface :
                        ${piece.surface.toFixed(1)} m²

                        <br>

                        Volume :
                        ${piece.volume.toFixed(1)} m³

                        <br>

                        Besoin estimé :
                        <strong>
                            ${piece.puissance.toLocaleString("fr-FR")} W
                        </strong>

                        <br>

                        ${
                            type === "multisplit"
                            ? `Unité intérieure indicative :
                               <strong>${piece.split}</strong>`
                            : `Débit indicatif :
                               <strong>${piece.debit.toLocaleString("fr-FR")} m³/h</strong>`
                        }

                    </div>

                `;

            });


        if (type === "multisplit") {

            html += `

                <p style="margin-top:15px;">

                    🔗 <strong>Synthèse multi-split</strong><br>

                    Puissance intérieure cumulée :
                    <strong>
                        ${resultat.puissanceTotale.toLocaleString("fr-FR")} W
                    </strong>

                </p>

                <p>
                    ⚠️ Le choix du groupe extérieur
                    et la combinaison des unités doivent
                    être vérifiés dans le tableau
                    constructeur.
                </p>

            `;

        }


        if (type === "gainable") {

            html += `

                <p style="margin-top:15px;">

                    🌬️ Le débit et le réseau sont
                    indicatifs. Le dimensionnement final
                    doit être vérifié avec la machine,
                    le réseau et les pertes de charge
                    réelles.

                </p>

            `;

        }


        afficherCommentaire(
            html
        );

    }


    /* ==========================================
       COMMENTAIRES
    ========================================== */

    function afficherCommentaire(
        contenu
    ) {

        const commentaires =
            document.getElementById(
                "commentaires"
            );


        if (commentaires) {

            commentaires.innerHTML =
                contenu;

        }

    }


    /* ==========================================
       RETOURS
    ========================================== */

    const btnRetourAccueil =
        document.getElementById(
            "btnRetourAccueil"
        );


    if (btnRetourAccueil) {

        btnRetourAccueil.addEventListener(
            "click",
            () => {

                afficherPage(
                    "accueil"
                );

            }
        );

    }


    const btnRetour2 =
        document.getElementById(
            "btnRetour2"
        );


    if (btnRetour2) {

        btnRetour2.addEventListener(
            "click",
            () => {

                afficherEtape(1);

            }
        );

    }


    const btnRetour3 =
        document.getElementById(
            "btnRetour3"
        );


    if (btnRetour3) {

        btnRetour3.addEventListener(
            "click",
            () => {

                afficherEtape(2);

            }
        );

    }


    const btnRetour4 =
        document.getElementById(
            "btnRetour4"
        );


    if (btnRetour4) {

        btnRetour4.addEventListener(
            "click",
            () => {

                afficherEtape(3);

            }
        );

    }


    /* ==========================================
       NOUVELLE ÉTUDE
    ========================================== */

    const btnNouvelleEtude =
        document.getElementById(
            "btnNouvelleEtude"
        );


    if (btnNouvelleEtude) {

        btnNouvelleEtude.addEventListener(
            "click",
            () => {

                afficherEtape(1);

            }
        );

    }


    /* ==========================================
       NAVIGATION
    ========================================== */

    const navAccueil =
        document.getElementById(
            "navAccueil"
        );


    if (navAccueil) {

        navAccueil.addEventListener(
            "click",
            () => {

                afficherPage(
                    "accueil"
                );

            }
        );

    }


    const navEtude =
        document.getElementById(
            "navEtude"
        );


    if (navEtude) {

        navEtude.addEventListener(
            "click",
            nouvelleEtude
        );

    }


    /* ==========================================
       DIAGNOSTIC
    ========================================== */

    function ouvrirDiagnostic() {

        afficherPage(
            "diagnostic"
        );

    }


    const btnAccueilDiagnostic =
        document.getElementById(
            "btnAccueilDiagnostic"
        );


    if (btnAccueilDiagnostic) {

        btnAccueilDiagnostic.addEventListener(
            "click",
            ouvrirDiagnostic
        );

    }


    const navDiagnostic =
        document.getElementById(
            "navDiagnostic"
        );


    if (navDiagnostic) {

        navDiagnostic.addEventListener(
            "click",
            ouvrirDiagnostic
        );

    }


    /* ==========================================
       PRESSION
    ========================================== */

    const btnAccueilPression =
        document.getElementById(
            "btnAccueilPression"
        );


    if (btnAccueilPression) {

        btnAccueilPression.addEventListener(
            "click",
            () => {

                afficherPage(
                    "pression"
                );

            }
        );

    }


    /* ==========================================
       OUTILS
    ========================================== */

    const btnAccueilOutils =
        document.getElementById(
            "btnAccueilOutils"
        );


    if (btnAccueilOutils) {

        btnAccueilOutils.addEventListener(
            "click",
            () => {

                afficherPage(
                    "outils"
                );

            }
        );

    }


    const navOutils =
        document.getElementById(
            "navOutils"
        );


    if (navOutils) {

        navOutils.addEventListener(
            "click",
            () => {

                afficherPage(
                    "outils"
                );

            }
        );

    }


    /* ==========================================
       ACADEMIE
    ========================================== */

    const navAcademie =
        document.getElementById(
            "navAcademie"
        );


    if (navAcademie) {

        navAcademie.addEventListener(
            "click",
            () => {

                afficherPage(
                    "academie"
                );

            }
        );

    }


    /* ==========================================
       INITIALISATION
    ========================================== */

    afficherPage(
        "accueil"
    );

    afficherEtape(1);


    console.log(
        "❄️ Pro Clim V3 chargé avec succès."
    );

});
