/* ==========================================
   PRO CLIM
   COEFFICIENTS
========================================== */

const COEFFICIENTS = {

    isolation: {

        Excellente: 0.70,
        Bonne: 0.85,
        Moyenne: 1.00,
        Mauvaise: 1.20

    },

    exposition: {

        Nord: 0.95,
        Est: 1.00,
        Ouest: 1.08,
        Sud: 1.12

    },

    vitrage: {

        Simple: 1.15,
        Double: 1.00,
        Triple: 0.85

    },

    toiture: {

        Oui: 1.12,
        Non: 1.00

    },

    etage: {

        RDC: 1.00,
        Intermediaire: 0.95,
        Dernier: 1.08

    },

    occupation: {

        1: 0,
        2: 150,
        3: 300,
        4: 450,
        5: 600,
        6: 750

    },

    eclairage: {

        LED: 5,
        Standard: 10,
        Halogene: 18

    },

    informatique: {

        Aucun: 0,
        Faible: 300,
        Moyen: 700,
        Important: 1500

    },

    region: {

        Nord: 0.95,
        Centre: 1.00,
        Sud: 1.10

    }

};
