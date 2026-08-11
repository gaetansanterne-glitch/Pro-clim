/* ==========================================
   PRO CLIM
   APP.JS — V2
========================================== */

const APP = {

    etape: 1,

    data: {
        longueur: null,
        largeur: null,
        hauteur: null,

        isolation: "Moyenne",
        vitrage: "Double",
        exposition: "Sud",

        etage: "RDC",
        toiture: "Non",
        region: "Centre",

        occupation: "4",
        eclairage: "Standard",
        informatique: "Moyen"
    },


    /* ======================================
       INITIALISATION
    ====================================== */

    init() {

        console.log("🚀 Pro Clim V2");

        this.initialiserNavigation();
        this.initialiserEtude();
        this.initialiserChoix();

        this.afficherPage("pageAccueil");

        this.afficherEtape(1);

    },


    /* ======================================
       NAVIGATION PRINCIPALE
    ====================================== */

    initialiserNavigation() {

        const navigation = {

            btnCommencer: "pageEtude",
            btnAccueilEtude: "pageEtude",
            btnAccueilDiagnostic: "pageDiagnostic",
            btnAccueilPression: "pagePression",
            btnAccueilOutils: "pageOutils",
            btnRetourAccueil: "pageAccueil",

            navAccueil: "pageAccueil",
            navEtude: "pageEtude",
            navDiagnostic: "pageDiagnostic",
            navOutils: "pageOutils",
            navAcademie: "pageAcademie"

        };


        Object.keys(navigation).forEach(id => {

            const bouton = document.getElementById(id);

            if (!bouton) return;

            bouton.addEventListener("click", () => {

                this.afficherPage(
                    navigation[id]
                );

            });

        });

    },


    afficherPage(id) {

        document
            .querySelectorAll(".page")
            .forEach(page => {

                page.classList.remove("active");

            });


        const page =
            document.getElementById(id);

        if (page) {

            page.classList.add("active");

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    },


    /* ======================================
       INITIALISATION ETUDE
    ====================================== */

    initialiserEtude() {

        document
            .getElementById("btnEtape1")
            ?.addEventListener(
                "click",
                () => this.validerEtape1()
            );


        document
            .getElementById("btnEtape2")
            ?.addEventListener(
                "click",
                () => this.validerEtape2()
            );


        document
            .getElementById("btnEtape3")
            ?.addEventListener(
                "click",
                () => this.validerEtape3()
            );


        document
            .getElementById("btnCalculer")
            ?.addEventListener(
                "click",
                () => this.calculer()
            );


        document
            .getElementById("btnRetour2")
            ?.addEventListener(
                "click",
                () => this.afficherEtape(1)
            );


        document
            .getElementById("btnRetour3")
            ?.addEventListener(
                "click",
                () => this.afficherEtape(2)
            );


        document
            .getElementById("btnRetour4")
            ?.addEventListener(
                "click",
                () => this.afficherEtape(3)
            );


        document
            .getElementById("btnNouvelleEtude")
            ?.addEventListener(
                "click",
                () => this.nouvelleEtude()
            );

    },


    /* ======================================
       CHOIX
    ====================================== */

    initialiserChoix() {

        document
            .querySelectorAll(".choice")
            .forEach(bouton => {

                bouton.addEventListener(
                    "click",
                    () => {

                        const nom =
                            bouton.dataset.name;

                        const valeur =
                            bouton.dataset.value;


                        document
                            .querySelectorAll(
                                `.choice[data-name="${nom}"]`
                            )
                            .forEach(element => {

                                element.classList.remove(
                                    "selected"
                                );

                            });


                        bouton.classList.add(
                            "selected"
                        );


                        this.data[nom] =
                            valeur;

                    }
                );

            });

    },


    /* ======================================
       ETAPE 1
    ====================================== */

    validerEtape1() {

        const longueur =
            this.nombre("longueur");

        const largeur =
            this.nombre("largeur");

        const hauteur =
            this.nombre("hauteur");


        const erreur =
            document.getElementById(
                "erreurEtape1"
            );


        if (
            longueur <= 0 ||
            largeur <= 0 ||
            hauteur <= 0
        ) {

            erreur.textContent =
                "⚠️ Indique des dimensions valides.";

            return;

        }


        if (hauteur < 1.8 || hauteur > 10) {

            erreur.textContent =
                "⚠️ La hauteur doit être comprise entre 1,80 m et 10 m.";

            return;

        }


        erreur.textContent = "";


        this.data.longueur = longueur;
        this.data.largeur = largeur;
        this.data.hauteur = hauteur;


        this.afficherEtape(2);

    },


    /* ======================================
       ETAPE 2
    ====================================== */

    validerEtape2() {

        this.afficherEtape(3);

    },


    /* ======================================
       ETAPE 3
    ====================================== */

    validerEtape3() {

        this.afficherEtape(4);

    },


    /* ======================================
       CALCUL
    ====================================== */

    calculer() {

        const erreur =
            document.getElementById(
                "erreurEtape4"
            );


        this.data.occupation =
            document.getElementById(
                "occupation"
            ).value;


        this.data.eclairage =
            document.getElementById(
                "eclairage"
            ).value;


        this.data.informatique =
            document.getElementById(
                "informatique"
            ).value;


        try {

            if (
                typeof ETUDE === "undefined"
            ) {

                throw new Error(
                    "Le module ETUDE n'est pas chargé."
                );

            }


            const resultat =
                ETUDE.calcul(
                    this.data
                );


            if (!resultat) {

                throw new Error(
                    "Aucun résultat retourné."
                );

            }


            this.afficherResultats(
                resultat
            );


            erreur.textContent = "";


            this.afficherEtape(5);


        } catch (error) {

            console.error(
                "Erreur Pro Clim :",
                error
            );


            erreur.textContent =
                "❌ Impossible de calculer l'étude. Vérifie les modules JavaScript.";

        }

    },


    /* ======================================
       AFFICHAGE RESULTATS
    ====================================== */

    afficherResultats(resultat) {

        this.afficher(
            "resSurface",
            this.formatNombre(
                resultat.surface
            ) + " m²"
        );


        this.afficher(
            "resVolume",
            this.formatNombre(
                resultat.volume
            ) + " m³"
        );


        this.afficher(
            "resPuissance",
            this.formatPuissance(
                resultat.puissance
            )
        );


        this.afficher(
            "resDebit",
            this.formatNombre(
                resultat.debit
            ) + " m³/h"
        );


        this.afficher(
            "resBouches",
            resultat.bouches
        );


        this.afficher(
            "resDiametre",
            "Ø " + resultat.diametre + " mm"
        );


        this.afficher(
            "resSplit",
            resultat.split || "—"
        );


        this.afficher(
            "resGainable",
            resultat.gainable || "—"
        );


        this.afficherCommentaires(
            resultat.commentaires
        );

    },


    afficherCommentaires(commentaires) {

        const bloc =
            document.getElementById(
                "commentaires"
            );


        if (!bloc) return;


        bloc.innerHTML = "";


        if (
            !commentaires ||
            commentaires.length === 0
        ) {

            return;

        }


        commentaires.forEach(commentaire => {

            const ligne =
                document.createElement(
                    "p"
                );


            ligne.textContent =
                commentaire;


            bloc.appendChild(
                ligne
            );

        });

    },


    /* ======================================
       NOUVELLE ETUDE
    ====================================== */

    nouvelleEtude() {

        this.data = {

            longueur: null,
            largeur: null,
            hauteur: null,

            isolation: "Moyenne",
            vitrage: "Double",
            exposition: "Sud",

            etage: "RDC",
            toiture: "Non",
            region: "Centre",

            occupation: "4",
            eclairage: "Standard",
            informatique: "Moyen"

        };


        document
            .getElementById("longueur")
            .value = "";


        document
            .getElementById("largeur")
            .value = "";


        document
            .getElementById("hauteur")
            .value = "";


        document
            .getElementById("occupation")
            .value = "4";


        document
            .getElementById("eclairage")
            .value = "Standard";


        document
            .getElementById("informatique")
            .value = "Moyen";


        document
            .querySelectorAll(".choice")
            .forEach(bouton => {

                bouton.classList.remove(
                    "selected"
                );

            });


        this.selectionner(
            "isolation",
            "Moyenne"
        );


        this.selectionner(
            "vitrage",
            "Double"
        );


        this.selectionner(
            "exposition",
            "Sud"
        );


        this.selectionner(
            "etage",
            "RDC"
        );


        this.selectionner(
            "toiture",
            "Non"
        );


        this.selectionner(
            "region",
            "Centre"
        );


        this.afficherPage(
            "pageEtude"
        );


        this.afficherEtape(1);

    },


    selectionner(nom, valeur) {

        const bouton =
            document.querySelector(
                `.choice[data-name="${nom}"][data-value="${valeur}"]`
            );


        if (bouton) {

            bouton.classList.add(
                "selected"
            );

        }

    },


    /* ======================================
       ETAPES
    ====================================== */

    afficherEtape(numero) {

        this.etape = numero;


        document
            .querySelectorAll(".study-step")
            .forEach(etape => {

                etape.classList.remove(
                    "active"
                );

            });


        const cible =
            document.getElementById(
                `etape${numero}`
            );


        if (cible) {

            cible.classList.add(
                "active"
            );

        }


        const pourcentage =
            numero * 20;


        const barre =
            document.getElementById(
                "progressBar"
            );


        const label =
            document.getElementById(
                "etapeLabel"
            );


        const pourcent =
            document.getElementById(
                "progressPercent"
            );


        if (barre) {

            barre.style.width =
                `${pourcentage}%`;

        }


        if (label) {

            label.textContent =
                `Étape ${numero} sur 5`;

        }


        if (pourcent) {

            pourcent.textContent =
                `${pourcentage} %`;

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    },


    /* ======================================
       OUTILS
    ====================================== */

    nombre(id) {

        const element =
            document.getElementById(id);


        if (!element) {

            return 0;

        }


        return parseFloat(
            String(element.value)
                .replace(",", ".")
        ) || 0;

    },


    afficher(id, valeur) {

        const element =
            document.getElementById(id);


        if (element) {

            element.textContent =
                valeur;

        }

    },


    formatNombre(nombre) {

        return Number(nombre)
            .toLocaleString(
                "fr-FR",
                {
                    maximumFractionDigits: 2
                }
            );

    },


    formatPuissance(watts) {

        if (watts >= 1000) {

            return (
                (watts / 1000)
                    .toLocaleString(
                        "fr-FR",
                        {
                            maximumFractionDigits: 1
                        }
                    )
                + " kW"
            );

        }


        return (
            this.formatNombre(watts)
            + " W"
        );

    }

};


/* ==========================================
   DEMARRAGE
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        APP.init();

    }
);
