/* ==========================================
   PRO CLIM
   APP.JS V2
   Gestion de l'application et navigation
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       ETAT DE L'APPLICATION
    ========================================== */

    let etapeActuelle = 1;

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
        informatique: "Moyen"

    };


    /* ==========================================
       ELEMENTS DES PAGES
    ========================================== */

    const pages = {

        accueil: document.getElementById("pageAccueil"),
        etude: document.getElementById("pageEtude"),
        diagnostic: document.getElementById("pageDiagnostic"),
        pression: document.getElementById("pagePression"),
        outils: document.getElementById("pageOutils"),
        academie: document.getElementById("pageAcademie")

    };


    /* ==========================================
       AFFICHER UNE PAGE
    ========================================== */

    function afficherPage(page) {

        Object.values(pages).forEach(section => {

            if (section) {
                section.classList.remove("active");
            }

        });

        if (pages[page]) {

            pages[page].classList.add("active");

        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* ==========================================
       AFFICHER UNE ETAPE
    ========================================== */

    function afficherEtape(numero) {

        etapeActuelle = numero;

        for (let i = 1; i <= 5; i++) {

            const etape =
                document.getElementById(`etape${i}`);

            if (etape) {

                etape.classList.toggle(
                    "active",
                    i === numero
                );

            }

        }


        /* Progression */

        const label =
            document.getElementById("etapeLabel");

        const pourcentage =
            document.getElementById("progressPercent");

        const barre =
            document.getElementById("progressBar");


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
       DEMARRER UNE ETUDE
    ========================================== */

    function nouvelleEtude() {

        afficherPage("etude");

        afficherEtape(1);

    }


    /* ==========================================
       BOUTON NOUVELLE ETUDE
    ========================================== */

    const btnCommencer =
        document.getElementById("btnCommencer");

    if (btnCommencer) {

        btnCommencer.addEventListener(
            "click",
            nouvelleEtude
        );

    }


    const btnAccueilEtude =
        document.getElementById("btnAccueilEtude");

    if (btnAccueilEtude) {

        btnAccueilEtude.addEventListener(
            "click",
            nouvelleEtude
        );

    }


    /* ==========================================
       ETAPE 1
    ========================================== */

    const btnEtape1 =
        document.getElementById("btnEtape1");

    if (btnEtape1) {

        btnEtape1.addEventListener(
            "click",
            () => {

                const longueur =
                    parseFloat(
                        document.getElementById("longueur").value
                    );

                const largeur =
                    parseFloat(
                        document.getElementById("largeur").value
                    );

                const hauteur =
                    parseFloat(
                        document.getElementById("hauteur").value
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


                erreur.textContent = "";


                donneesEtude.longueur =
                    longueur;

                donneesEtude.largeur =
                    largeur;

                donneesEtude.hauteur =
                    hauteur;


                afficherEtape(2);

            }
        );

    }


    /* ==========================================
       ETAPE 2
    ========================================== */

    const btnEtape2 =
        document.getElementById("btnEtape2");

    if (btnEtape2) {

        btnEtape2.addEventListener(
            "click",
            () => {

                afficherEtape(3);

            }
        );

    }


    /* ==========================================
       ETAPE 3
    ========================================== */

    const btnEtape3 =
        document.getElementById("btnEtape3");

    if (btnEtape3) {

        btnEtape3.addEventListener(
            "click",
            () => {

                afficherEtape(4);

            }
        );

    }


    /* ==========================================
       CHOIX DES BOUTONS
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

                            btn.classList.remove(
                                "selected"
                            );

                        });


                    button.classList.add(
                        "selected"
                    );


                    if (nom) {

                        donneesEtude[nom] =
                            valeur;

                    }

                }
            );

        });


    /* ==========================================
       SELECTS ETAPE 4
    ========================================== */

    const occupation =
        document.getElementById("occupation");

    const eclairage =
        document.getElementById("eclairage");

    const informatique =
        document.getElementById("informatique");


    if (occupation) {

        occupation.addEventListener(
            "change",
            () => {

                donneesEtude.occupation =
                    parseInt(
                        occupation.value,
                        10
                    );

            }
        );

    }


    if (eclairage) {

        eclairage.addEventListener(
            "change",
            () => {

                donneesEtude.eclairage =
                    eclairage.value;

            }
        );

    }


    if (informatique) {

        informatique.addEventListener(
            "change",
            () => {

                donneesEtude.informatique =
                    informatique.value;

            }
        );

    }


    /* ==========================================
       CALCUL
    ========================================== */

    const btnCalculer =
        document.getElementById("btnCalculer");


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

            let resultat;


            /*
             * On utilise ETUDE.calculComplet
             * si le module est disponible.
             */

            if (
                typeof ETUDE !== "undefined" &&
                typeof ETUDE.calculComplet === "function"
            ) {

                resultat =
                    ETUDE.calculComplet(
                        donneesEtude
                    );

            } else {

                throw new Error(
                    "Le module ETUDE n'est pas chargé."
                );

            }


            afficherResultats(resultat);

            afficherEtape(5);

        }

        catch (error) {

            console.error(error);

            erreur.textContent =
                "⚠️ Impossible d'effectuer le calcul. Vérifie les modules JavaScript.";

        }

    }


    /* ==========================================
       AFFICHER LES RESULTATS
    ========================================== */

    function afficherResultats(resultat) {

        const surface =
            document.getElementById("resSurface");

        const volume =
            document.getElementById("resVolume");

        const puissance =
            document.getElementById("resPuissance");

        const debit =
            document.getElementById("resDebit");

        const bouches =
            document.getElementById("resBouches");

        const diametre =
            document.getElementById("resDiametre");

        const split =
            document.getElementById("resSplit");

        const gainable =
            document.getElementById("resGainable");


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


        const commentaires =
            document.getElementById(
                "commentaires"
            );


        if (commentaires) {

            commentaires.innerHTML = `

                <strong>💡 Analyse</strong>

                <p>
                    Résultat estimatif basé sur
                    les caractéristiques renseignées.
                </p>

                <p>
                    Le dimensionnement final doit
                    être confirmé selon les conditions
                    réelles du chantier.
                </p>

            `;

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

                afficherPage("accueil");

            }
        );

    }


    const btnRetour2 =
        document.getElementById("btnRetour2");

    if (btnRetour2) {

        btnRetour2.addEventListener(
            "click",
            () => {

                afficherEtape(1);

            }
        );

    }


    const btnRetour3 =
        document.getElementById("btnRetour3");

    if (btnRetour3) {

        btnRetour3.addEventListener(
            "click",
            () => {

                afficherEtape(2);

            }
        );

    }


    const btnRetour4 =
        document.getElementById("btnRetour4");

    if (btnRetour4) {

        btnRetour4.addEventListener(
            "click",
            () => {

                afficherEtape(3);

            }
        );

    }


    /* ==========================================
       NOUVELLE ETUDE DEPUIS RESULTATS
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
       NAVIGATION ACCUEIL
    ========================================== */

    const navAccueil =
        document.getElementById("navAccueil");

    if (navAccueil) {

        navAccueil.addEventListener(
            "click",
            () => {

                afficherPage("accueil");

            }
        );

    }


    /* ==========================================
       NAVIGATION ETUDE
    ========================================== */

    const navEtude =
        document.getElementById("navEtude");

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

        afficherPage("diagnostic");

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
       PRESSIONS
    ========================================== */

    const btnAccueilPression =
        document.getElementById(
            "btnAccueilPression"
        );

    if (btnAccueilPression) {

        btnAccueilPression.addEventListener(
            "click",
            () => {

                afficherPage("pression");

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

                afficherPage("outils");

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

                afficherPage("outils");

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

                afficherPage("academie");

            }
        );

    }


    /* ==========================================
       ETAT INITIAL
    ========================================== */

    afficherPage("accueil");

    afficherEtape(1);


    console.log(
        "❄️ Pro Clim V2 chargé avec succès."
    );

});
