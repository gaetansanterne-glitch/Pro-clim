/* ==========================================
   PRO CLIM
   DIMENSIONNEMENT DES GAINES
========================================== */

const GAINES = {

    diametres: [

        { d:80,  debitMax:35 },
        { d:100, debitMax:60 },
        { d:125, debitMax:120 },
        { d:160, debitMax:220 },
        { d:200, debitMax:380 },
        { d:250, debitMax:620 },
        { d:315, debitMax:1000 },
        { d:355, debitMax:1300 },
        { d:400, debitMax:1700 },
        { d:450, debitMax:2200 },
        { d:500, debitMax:2800 }

    ],

    choisirDiametre(debit){

        for(const gaine of this.diametres){

            if(debit<=gaine.debitMax){

                return gaine.d;

            }

        }

        return 500;

    },

    vitesseAir(debit,diametre){

        const debitM3s = debit/3600;

        const surface =
            Math.PI*
            Math.pow(diametre/1000,2)/4;

        return Number(
            (debitM3s/surface).toFixed(2)
        );

    },

    verifierVitesse(vitesse){

        if(vitesse<2){

            return{

                niveau:"Très faible",

                couleur:"#2196F3"

            };

        }

        if(vitesse<4){

            return{

                niveau:"Bonne",

                couleur:"#4CAF50"

            };

        }

        if(vitesse<6){

            return{

                niveau:"Élevée",

                couleur:"#FFC107"

            };

        }

        return{

            niveau:"Trop élevée",

            couleur:"#F44336"

        };

    },

    perteCharge(debit,longueur){

        return Number(
            (
                debit*
                0.00018*
                longueur
            ).toFixed(2)
        );

    },

    calcul(debit,longueur){

        const diametre =
            this.choisirDiametre(debit);

        const vitesse =
            this.vitesseAir(
                debit,
                diametre
            );

        const perte =
            this.perteCharge(
                debit,
                longueur
            );

        const controle =
            this.verifierVitesse(
                vitesse
            );

        return{

            debit,

            diametre,

            vitesse,

            perteCharge:perte,

            controle

        };

    }

};
