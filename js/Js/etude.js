/* ==========================================
   PRO CLIM
   MODULE ETUDE
========================================== */

const ETUDE = {

    calculVolume(longueur, largeur, hauteur) {
        return longueur * largeur * hauteur;
    },

    calculSurface(longueur, largeur) {
        return longueur * largeur;
    },

    calculPuissance(surface, hauteur, isolation, exposition) {

        let coef = 100;

        switch(isolation){

            case "Excellente":
                coef = 65;
                break;

            case "Bonne":
                coef = 80;
                break;

            case "Moyenne":
                coef = 100;
                break;

            case "Mauvaise":
                coef = 125;
                break;

            default:
                coef = 100;

        }

        switch(exposition){

            case "Nord":
                coef -= 5;
                break;

            case "Sud":
                coef += 10;
                break;

            case "Est":
                coef += 5;
                break;

            case "Ouest":
                coef += 8;
                break;

        }

        return Math.round(surface * hauteur * coef);

    },

    calculDebitAir(puissance){

        return Math.round(puissance / 2.8);

    },

    calculNombreBouches(debit){

        return Math.max(1, Math.ceil(debit / 180));

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

        if(puissance <= 2500) return "2.5 kW";

        if(puissance <= 3500) return "3.5 kW";

        if(puissance <= 5000) return "5 kW";

        if(puissance <= 7000) return "7.1 kW";

        if(puissance <= 10000) return "10 kW";

        return "Etude spécifique";

    },

    calculGainable(puissance){

        if(puissance <= 5000) return "Moyenne Pression";

        if(puissance <= 10000) return "Haute Pression";

        return "Dimensionnement spécifique";

    },

    calculComplet(data){

        const volume =
            this.calculVolume(
                data.longueur,
                data.largeur,
                data.hauteur
            );

        const surface =
            this.calculSurface(
                data.longueur,
                data.largeur
            );

        const puissance =
            this.calculPuissance(
                surface,
                data.hauteur,
                data.isolation,
                data.exposition
            );

        const debit =
            this.calculDebitAir(
                puissance
            );

        return{

            surface,

            volume,

            puissance,

            debit,

            bouches:
                this.calculNombreBouches(debit),

            diametre:
                this.calculDiametre(debit),

            split:
                this.calculSplit(puissance),

            gainable:
                this.calculGainable(puissance)

        };

    }

};
