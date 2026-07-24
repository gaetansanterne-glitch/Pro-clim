/* ==========================================
   PRO CLIM
   ETUDE V2
========================================== */

const ETUDE = {

    calcul(data){

        const surface =
            this.calculSurface(
                data.longueur,
                data.largeur
            );

        const volume =
            this.calculVolume(
                data.longueur,
                data.largeur,
                data.hauteur
            );

        const puissance =
            this.calculPuissance(
                data,
                surface,
                volume
            );

        const debit =
            this.calculDebitAir(
                puissance
            );

        return {

            surface,

            volume,

            puissance,

            debit,

            bouches:
                this.calculNombreBouches(
                    debit
                ),

            diametre:
                this.calculDiametre(
                    debit
                ),

            split:
                this.calculSplit(
                    puissance
                ),

            gainable:
                this.calculGainable(
                    puissance
                )

        };

    },

    calculSurface(longueur, largeur){

        return Number(
            (longueur * largeur)
            .toFixed(2)
        );

    },

    calculVolume(longueur, largeur, hauteur){

        return Number(
            (longueur * largeur * hauteur)
            .toFixed(2)
        );

    },

    calculPuissance(data, surface, volume){

        let coef = 100;

        if(typeof COEFFICIENTS !== "undefined"){

            coef *=
                COEFFICIENTS.isolation[data.isolation] || 1;

            coef *=
                COEFFICIENTS.exposition[data.exposition] || 1;

            coef *=
                COEFFICIENTS.vitrage[data.vitrage] || 1;

            coef *=
                COEFFICIENTS.toiture[data.toiture] || 1;

            coef *=
                COEFFICIENTS.etage[data.etage] || 1;

            coef *=
                COEFFICIENTS.region[data.region] || 1;

            coef +=
                COEFFICIENTS.occupation[data.occupation] || 0;

            coef +=
                COEFFICIENTS.informatique[data.informatique] || 0;

            coef +=
                surface *
                (
                    COEFFICIENTS.eclairage[data.eclairage] || 0
                );

        }

        return Math.round(
            volume * coef
        );

    },

    calculDebitAir(puissance){

        return Math.round(
            puissance / 2.8
        );

    },

    calculNombreBouches(debit){

        return Math.max(
            1,
            Math.ceil(debit / 180)
        );

    },

    calculDiametre(debit){

        if(debit <= 120) return 125;
        if(debit <= 200) return 160;
        if(debit <= 350) return 200;
        if(debit <= 550) return 250;
        if(debit <= 900) return 315;

        return 400;

    },

    calculSplit(puissance){

        if(puissance <= 2500)
            return "2.5 kW";

        if(puissance <= 3500)
            return "3.5 kW";

        if(puissance <= 5000)
            return "5 kW";

        if(puissance <= 7000)
            return "7.1 kW";

        if(puissance <= 10000)
            return "10 kW";

        return "Etude spécifique";

    },

    calculGainable(puissance){

        if(puissance <= 5000)
            return "Moyenne Pression";

        if(puissance <= 10000)
            return "Haute Pression";

        return "Dimensionnement spécifique";

    }

};
