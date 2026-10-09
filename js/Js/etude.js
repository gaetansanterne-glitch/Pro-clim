/* ==========================================
   PRO CLIM
   MOTEUR DE CALCUL D'ETUDE CVC
   Version 3
========================================== */

const ETUDE = {

    // Calcul principal
    calcul(data) {

        const surface = this.calculSurface(
            data.longueur,
            data.largeur
        );

        const volume = this.calculVolume(
            data.longueur,
            data.largeur,
            data.hauteur
        );

        const puissance = this.calculPuissance(
            data,
            surface
        );

        const debit = this.calculDebitAir(puissance);

        const bouches = this.calculNombreBouches(debit);

        const diametre = this.calculDiametre(debit);

        return {
            surface,
            volume,
            puissance,
            debit,
            bouches,
            diametre,
            split: this.calculSplit(puissance),
            gainable: this.calculGainable(puissance)
        };
    },


    // Surface en m²
    calculSurface(longueur, largeur) {

        return Number(
            (longueur * largeur).toFixed(2)
        );
    },


    // Volume en m³
    calculVolume(longueur, largeur, hauteur) {

        return Number(
            (longueur * largeur * hauteur).toFixed(2)
        );
    },


    // Estimation de puissance en watts
    calculPuissance(data, surface) {

        // Besoin de base estimatif en W/m².
        // Les coefficients affinent ensuite ce besoin.
        const besoinBase = 80;

        let coefficientGlobal = 1;

        if (typeof COEFFICIENTS !== "undefined") {

            const familles = [
                "isolation",
                "vitrage",
                "exposition",
                "toiture",
                "etage",
                "region"
            ];

            familles.forEach(famille => {

                const table = COEFFICIENTS[famille];

                if (
                    table &&
                    Object.prototype.hasOwnProperty.call(
                        table,
                        data[famille]
                    )
                ) {
                    coefficientGlobal *= table[data[famille]];
                }

            });
        }

        // Besoin lié à l'enveloppe du bâtiment
        const puissanceEnveloppe =
            surface * besoinBase * coefficientGlobal;

        // Apports internes : personnes, éclairage, informatique
        let apportsInternes = 0;

        if (typeof COEFFICIENTS !== "undefined") {

            const occupation = COEFFICIENTS.occupation || {};
            const eclairage = COEFFICIENTS.eclairage || {};
            const informatique = COEFFICIENTS.informatique || {};

            apportsInternes +=
                Number(occupation[data.occupation]) || 0;

            apportsInternes +=
                surface *
                (Number(eclairage[data.eclairage]) || 0);

            apportsInternes +=
                Number(informatique[data.informatique]) || 0;
        }

        const puissanceTotale =
            puissanceEnveloppe + apportsInternes;

        // Arrondi supérieur par pas de 100 W
        return Math.ceil(puissanceTotale / 100) * 100;
    },


    // Débit indicatif pour une unité gainable.
    // À confirmer selon la machine et ses données constructeur.
    calculDebitAir(puissance) {

        return Math.round(
            (puissance / 1000 * 150) / 10
        ) * 10;
    },


    // Nombre indicatif de bouches
    // Hypothèse : environ 100 m³/h par bouche.
    calculNombreBouches(debit) {

        return Math.max(
            1,
            Math.ceil(debit / 100)
        );
    },


    // Diamètre indicatif du réseau principal
    calculDiametre(debit) {

        if (
            typeof GAINES !== "undefined" &&
            typeof GAINES.choisirDiametre === "function"
        ) {
            return GAINES.choisirDiametre(debit);
        }

        if (debit <= 120) return 125;
        if (debit <= 220) return 160;
        if (debit <= 380) return 200;
        if (debit <= 620) return 250;
        if (debit <= 1000) return 315;
        if (debit <= 1700) return 400;

        return 500;
    },


    // Puissance commerciale indicative pour un split
    calculSplit(puissance) {

        if (puissance <= 2500) return "2,5 kW";
        if (puissance <= 3500) return "3,5 kW";
        if (puissance <= 5000) return "5 kW";
        if (puissance <= 7000) return "7,1 kW";
        if (puissance <= 10000) return "10 kW";

        return "Étude spécifique";
    },


    // Orientation indicative pour un gainable
    calculGainable(puissance) {

        if (puissance <= 5000) return "Moyenne pression";
        if (puissance <= 10000) return "Haute pression";

        return "Dimensionnement spécifique";
    }

};
