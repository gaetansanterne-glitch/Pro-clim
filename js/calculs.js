// ====================================
// PRO CLIM
// Module Calculs CVC
// Version 0.0.4
// ====================================

function calculPuissance(surface, hauteur, coefficient = 45) {

    const volume = surface * hauteur;
    const puissance = (volume * coefficient) / 1000;

    return {
        volume: volume.toFixed(1),
        puissance: puissance.toFixed(2)
    };

}

// Exemple

const exemple = calculPuissance(40, 2.5);

console.log("Volume :", exemple.volume + " m³");
console.log("Puissance :", exemple.puissance + " kW");
