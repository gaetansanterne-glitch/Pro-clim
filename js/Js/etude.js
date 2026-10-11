/* ==========================================
PRO CLIM
MOTEUR DE CALCUL D’ETUDE CVC
Version 4 — MULTI-PIÈCES
========================================== */

const ETUDE = {

/* ======================================
   CALCUL PRINCIPAL — 1 PIÈCE
====================================== */
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
/* ======================================
   CALCUL MULTI-PIÈCES
====================================== */
calculMulti(data) {
    if (
        !data ||
        !Array.isArray(data.pieces) ||
        data.pieces.length === 0
    ) {
        return {
            pieces: [],
            surfaceTotale: 0,
            volumeTotal: 0,
            puissanceTotale: 0,
            debitTotal: 0,
            bouchesTotal: 0
        };
    }
    const piecesCalculees = [];
    let surfaceTotale = 0;
    let volumeTotal = 0;
    let puissanceTotale = 0;
    let debitTotal = 0;
    let bouchesTotal = 0;
    data.pieces.forEach((piece, index) => {
        const pieceData = {
            nom:
                piece.nom ||
                `Pièce ${index + 1}`,
            longueur:
                Number(piece.longueur) || 0,
            largeur:
                Number(piece.largeur) || 0,
            hauteur:
                Number(piece.hauteur) || 0,
            isolation:
                data.isolation ||
                piece.isolation ||
                "Moyenne",
            vitrage:
                data.vitrage ||
                piece.vitrage ||
                "Double",
            exposition:
                piece.exposition ||
                data.exposition ||
                "Sud",
            toiture:
                data.toiture ||
                piece.toiture ||
                "Non",
            etage:
                data.etage ||
                piece.etage ||
                "RDC",
            region:
                data.region ||
                piece.region ||
                "Centre",
            occupation:
                piece.occupation ||
                data.occupation ||
                "1",
            eclairage:
                piece.eclairage ||
                data.eclairage ||
                "Standard",
            informatique:
                piece.informatique ||
                data.informatique ||
                "Aucun"
        };
        const resultat = this.calcul(pieceData);
        const pieceCalculee = {
            numero: index + 1,
            nom: pieceData.nom,
            longueur: pieceData.longueur,
            largeur: pieceData.largeur,
            hauteur: pieceData.hauteur,
            surface: resultat.surface,
            volume: resultat.volume,
            puissance: resultat.puissance,
            debit: resultat.debit,
            bouches: resultat.bouches,
            diametre: resultat.diametre,
            split: resultat.split,
            gainable: resultat.gainable
        };
        piecesCalculees.push(pieceCalculee);
        surfaceTotale += resultat.surface;
        volumeTotal += resultat.volume;
        puissanceTotale += resultat.puissance;
        debitTotal += resultat.debit;
        bouchesTotal += resultat.bouches;
    });
    return {
        pieces: piecesCalculees,
        nombrePieces: piecesCalculees.length,
        surfaceTotale:
            Number(surfaceTotale.toFixed(2)),
        volumeTotal:
            Number(volumeTotal.toFixed(2)),
        puissanceTotale:
            Math.ceil(puissanceTotale / 100) * 100,
        debitTotal:
            Math.round(debitTotal / 10) * 10,
        bouchesTotal
    };
},
/* ======================================
   SURFACE
====================================== */
calculSurface(longueur, largeur) {
    return Number(
        (
            Number(longueur) *
            Number(largeur)
        ).toFixed(2)
    );
},
/* ======================================
   VOLUME
====================================== */
calculVolume(longueur, largeur, hauteur) {
    return Number(
        (
            Number(longueur) *
            Number(largeur) *
            Number(hauteur)
        ).toFixed(2)
    );
},
/* ======================================
   PUISSANCE
====================================== */
calculPuissance(data, surface) {
    const besoinBase = 80;
    let coefficientGlobal = 1;
    /* ----------------------------------
       COEFFICIENTS DU BÂTIMENT
    ---------------------------------- */
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
                    Number(table[data[famille]]) || 1;
            }
        });
    }
    /* ----------------------------------
       BESOIN DE L'ENVELOPPE
    ---------------------------------- */
    const puissanceEnveloppe =
        surface *
        besoinBase *
        coefficientGlobal;
    /* ----------------------------------
       APPORTS INTERNES
    ---------------------------------- */
    let apportsInternes = 0;
    if (typeof COEFFICIENTS !== "undefined") {
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
    /* ----------------------------------
       PUISSANCE TOTALE
    ---------------------------------- */
    const puissanceTotale =
        puissanceEnveloppe +
        apportsInternes;
    return Math.ceil(
        puissanceTotale / 100
    ) * 100;
},
/* ======================================
   DÉBIT D'AIR
====================================== */
calculDebitAir(puissance) {
    return Math.round(
        (
            Number(puissance) /
            1000 *
            150
        ) / 10
    ) * 10;
},
/* ======================================
   NOMBRE DE BOUCHES
====================================== */
calculNombreBouches(debit) {
    return Math.max(
        1,
        Math.ceil(
            Number(debit) / 100
        )
    );
},
/* ======================================
   DIAMÈTRE RÉSEAU
====================================== */
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
/* ======================================
   DIMENSIONNEMENT SPLIT
====================================== */
calculSplit(puissance) {
    if (puissance <= 1500)
        return "1,5 kW";
    if (puissance <= 2000)
        return "2,0 kW";
    if (puissance <= 2500)
        return "2,5 kW";
    if (puissance <= 3500)
        return "3,5 kW";
    if (puissance <= 5000)
        return "5,0 kW";
    if (puissance <= 7100)
        return "7,1 kW";
    if (puissance <= 10000)
        return "10 kW";
    return "Étude spécifique";
},
/* ======================================
   DIMENSIONNEMENT GAINABLE
====================================== */
calculGainable(puissance) {
    if (puissance <= 5000)
        return "Moyenne pression";
    if (puissance <= 10000)
        return "Haute pression";
    return "Dimensionnement spécifique";
}

};
