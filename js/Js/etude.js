/* ==========================================
   PRO CLIM
   MOTEUR DE CALCUL D'ETUDE CVC
   Version 4 — MONO / MULTI-PIÈCES
========================================== */

const ETUDE = {

    /* ==========================================
       CALCUL D'UNE PIÈCE
    ========================================== */

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
            nom: data.nom || "Pièce",
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


    /* ==========================================
       CALCUL MULTI-PIÈCES
    ========================================== */

    calculMulti(data) {

        const pieces = [];

        if (!Array.isArray(data.pieces)) {
            return {
                pieces: [],
                surfaceTotale: 0,
                volumeTotal: 0,
                puissanceTotale: 0,
                debitTotal: 0,
                bouchesTotal: 0
            };
        }


        data.pieces.forEach((piece, index) => {

            const donneesPiece = {

                nom: piece.nom ||
                    `Pièce ${index + 1}`,

                longueur: Number(piece.longueur),
                largeur: Number(piece.largeur),
                hauteur: Number(piece.hauteur),

                isolation: data.isolation,
                vitrage: data.vitrage,
                exposition:
                    piece.exposition ||
                    data.exposition,

                etage: data.etage,
                toiture: data.toiture,
                region: data.region,

                occupation:
                    Number(piece.occupation) || 1,

                eclairage:
                    piece.eclairage || "Standard",

                informatique:
                    piece.informatique || "Aucun"
            };


            pieces.push(
                this.calcul(donneesPiece)
            );

        });


        const surfaceTotale =
            pieces.reduce(
                (total, piece) =>
                    total + piece.surface,
                0
            );


        const volumeTotal =
            pieces.reduce(
                (total, piece) =>
                    total + piece.volume,
                0
            );


        const puissanceTotale =
            pieces.reduce(
                (total, piece) =>
                    total + piece.puissance,
                0
            );


        const debitTotal =
            pieces.reduce(
                (total, piece) =>
                    total + piece.debit,
                0
            );


        const bouchesTotal =
            pieces.reduce(
                (total, piece) =>
                    total + piece.bouches,
                0
            );


        return {

            pieces,

            surfaceTotale:
                Number(surfaceTotale.toFixed(2)),

            volumeTotal:
                Number(volumeTotal.toFixed(2)),

            puissanceTotale,

            debitTotal,

            bouchesTotal

        };

    },


    /* ==========================================
       SURFACE
    ========================================== */

    calculSurface(longueur, largeur) {

        return Number(
            (
                Number(longueur) *
                Number(largeur)
            ).toFixed(2)
        );

    },


    /* ==========================================
       VOLUME
    ========================================== */

    calculVolume(
        longueur,
        largeur,
        hauteur
    ) {

        return Number(
            (
                Number(longueur) *
                Number(largeur) *
                Number(hauteur)
            ).toFixed(2)
        );

    },


    /* ==========================================
       PUISSANCE
    ========================================== */

    calculPuissance(data, surface) {

        const besoinBase = 80;

        let coefficientGlobal = 1;


        if (
            typeof COEFFICIENTS !== "undefined"
        ) {

            const familles = [

                "isolation",
                "vitrage",
                "exposition",
                "toiture",
                "etage",
                "region"

            ];


            familles.forEach(famille => {

                const table =
                    COEFFICIENTS[famille];


                if (
                    table &&
                    Object.prototype.hasOwnProperty.call(
                        table,
                        data[famille]
                    )
                ) {

                    coefficientGlobal *=
                        table[data[famille]];

                }

            });

        }


        const puissanceEnveloppe =
            surface *
            besoinBase *
            coefficientGlobal;


        let apportsInternes = 0;


        if (
            typeof COEFFICIENTS !== "undefined"
        ) {

            const occupation =
                COEFFICIENTS.occupation || {};

            const eclairage =
                COEFFICIENTS.eclairage || {};

            const informatique =
                COEFFICIENTS.informatique || {};


            apportsInternes +=
                Number(
                    occupation[data.occupation]
                ) || 0;


            apportsInternes +=
                surface *
                (
                    Number(
                        eclairage[data.eclairage]
                    ) || 0
                );


            apportsInternes +=
                Number(
                    informatique[data.informatique]
                ) || 0;

        }


        const puissanceTotale =
            puissanceEnveloppe +
            apportsInternes;


        return Math.ceil(
            puissanceTotale / 100
        ) * 100;

    },


    /* ==========================================
       DÉBIT D'AIR
    ========================================== */

    calculDebitAir(puissance) {

        return Math.round(
            (
                puissance / 1000 * 150
            ) / 10
        ) * 10;

    },


    /* ==========================================
       BOUCHES
    ========================================== */

    calculNombreBouches(debit) {

        return Math.max(
            1,
            Math.ceil(debit / 100)
        );

    },


    /* ==========================================
       DIAMÈTRE
    ========================================== */

    calculDiametre(debit) {

        if (
            typeof GAINES !== "undefined" &&
            typeof GAINES.choisirDiametre === "function"
        ) {

            return GAINES.choisirDiametre(
                debit
            );

        }


        if (debit <= 120) return 125;
        if (debit <= 220) return 160;
        if (debit <= 380) return 200;
        if (debit <= 620) return 250;
        if (debit <= 1000) return 315;
        if (debit <= 1700) return 400;

        return 500;

    },


    /* ==========================================
       PUISSANCE COMMERCIALE SPLIT
    ========================================== */

    calculSplit(puissance) {

        if (puissance <= 1500) return "1,5 kW";
        if (puissance <= 2000) return "2,0 kW";
        if (puissance <= 2500) return "2,5 kW";
        if (puissance <= 3500) return "3,5 kW";
        if (puissance <= 5000) return "5 kW";
        if (puissance <= 7100) return "7,1 kW";
        if (puissance <= 10000) return "10 kW";

        return "Étude spécifique";

    },


    /* ==========================================
       GAINABLE
    ========================================== */

    calculGainable(puissance) {

        if (puissance <= 5000) {
            return "Moyenne pression";
        }

        if (puissance <= 10000) {
            return "Haute pression";
        }

        return "Dimensionnement spécifique";

    }

};
