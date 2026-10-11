/* ==========================================
PRO CLIM
BUDGET PRO V3
Estimation du prix + jauge budget client
========================================== */

(() => {
“use strict”;

function euros(valeur) {
    return Number(valeur).toLocaleString("fr-FR", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 2
    });
}
function nombre(id) {
    const champ = document.getElementById(id);
    if (!champ) return 0;
    const valeur = Number(champ.value);
    return Number.isFinite(valeur)
        ? Math.max(0, valeur)
        : 0;
}
function calculer(bloc) {
    if (!bloc || !bloc.isConnected) return;
    const jours = Math.max(0.5, nombre("pcJours"));
    const equipe = Math.max(1, Math.floor(nombre("pcEquipe")));
    const heures = Math.min(24, Math.max(1, nombre("pcHeures")));
    const taux = nombre("pcTaux");
    const materiel = nombre("pcMateriel");
    const marge = nombre("pcMarge") / 100;
    const tva = nombre("pcTVA") / 100;
    const budget = nombre("pcBudget");
    const temps = jours * equipe * heures;
    const mainOeuvre = temps * taux;
    const prixHT = (mainOeuvre + materiel) * (1 + marge);
    const prixTTC = prixHT * (1 + tva);
    bloc.querySelector("#pcTemps").textContent =
        `${temps.toLocaleString("fr-FR")} h`;
    bloc.querySelector("#pcMO").textContent = euros(mainOeuvre);
    bloc.querySelector("#pcHT").textContent = euros(prixHT);
    bloc.querySelector("#pcTTC").textContent = euros(prixTTC);
    const jauge = bloc.querySelector("#pcJauge");
    const pourcentage = bloc.querySelector("#pcPourcentage");
    const statut = bloc.querySelector("#pcStatut");
    if (budget <= 0) {
        jauge.style.width = "0%";
        jauge.style.backgroundColor = "#9ca3af";
        pourcentage.textContent = "Budget à renseigner";
        statut.textContent =
            "Saisis l'enveloppe totale TTC prévue par le client.";
        statut.style.color = "#444";
        return;
    }
    const ratio = prixTTC / budget;
    const tauxBudget = ratio * 100;
    jauge.style.width = `${Math.min(100, tauxBudget)}%`;
    pourcentage.textContent =
        `${Math.round(tauxBudget)} % de l'enveloppe`;
    if (ratio <= 0.85) {
        jauge.style.backgroundColor = "#22a447";
        statut.style.color = "#16803c";
        statut.textContent =
            `Budget confortable. Reste ${euros(budget - prixTTC)}.`;
    } else if (ratio <= 1) {
        jauge.style.backgroundColor = "#e9a23b";
        statut.style.color = "#a16207";
        statut.textContent =
            `Budget presque atteint. Reste ${euros(budget - prixTTC)}.`;
    } else {
        jauge.style.backgroundColor = "#d93636";
        statut.style.color = "#c62828";
        statut.textContent =
            `Budget dépassé de ${euros(prixTTC - budget)}.`;
    }
}
function creerBloc() {
    const commentaires = document.getElementById("commentaires");
    const puissance = document.getElementById("resPuissance");
    if (!commentaires || !puissance) return;
    const textePuissance = puissance.textContent.trim();
    // Attendre qu'un résultat réel soit disponible.
    if (!textePuissance || textePuissance === "—") return;
    // Ne jamais créer deux blocs budget.
    if (document.getElementById("pcBudgetBloc")) return;
    const bloc = document.createElement("section");
    bloc.id = "pcBudgetBloc";
    bloc.style.cssText = [
        "display:block",
        "width:100%",
        "box-sizing:border-box",
        "margin-top:18px",
        "padding:16px",
        "border:1px solid #d5dbe5",
        "border-radius:14px",
        "background:#ffffff",
        "color:#222222",
        "text-align:left"
    ].join(";");
    bloc.innerHTML = `
        <h3 style="margin-top:0">💶 Budget et temps de chantier</h3>
        <p style="color:#555">
            Estimation indicative : adapte les valeurs à ton chantier.
        </p>
        <div style="display:grid;gap:12px">
            <label>
                Budget total du client TTC (€)
                <input id="pcBudget" type="number" min="0"
                    step="100" inputmode="decimal"
                    placeholder="Ex. 5000"
                    style="display:block;width:100%;box-sizing:border-box;padding:12px;margin-top:5px">
            </label>
            <label>
                Durée prévue (jours)
                <input id="pcJours" type="number" min="0.5"
                    step="0.5" value="2"
                    style="display:block;width:100%;box-sizing:border-box;padding:12px;margin-top:5px">
            </label>
            <label>
                Nombre de techniciens
                <input id="pcEquipe" type="number" min="1"
                    step="1" value="1"
                    style="display:block;width:100%;box-sizing:border-box;padding:12px;margin-top:5px">
            </label>
            <label>
                Heures par jour et par technicien
                <input id="pcHeures" type="number" min="1"
                    max="24" step="0.5" value="7"
                    style="display:block;width:100%;box-sizing:border-box;padding:12px;margin-top:5px">
            </label>
            <label>
                Coût horaire chargé (€ / h)
                <input id="pcTaux" type="number" min="0"
                    step="1" value="50"
                    style="display:block;width:100%;box-sizing:border-box;padding:12px;margin-top:5px">
            </label>
            <label>
                Coût du matériel HT (€)
                <input id="pcMateriel" type="number" min="0"
                    step="50" value="2200"
                    style="display:block;width:100%;box-sizing:border-box;padding:12px;margin-top:5px">
            </label>
            <label>
                Marge commerciale (%)
                <input id="pcMarge" type="number" min="0"
                    step="1" value="25"
                    style="display:block;width:100%;box-sizing:border-box;padding:12px;margin-top:5px">
            </label>
            <label>
                TVA (%)
                <input id="pcTVA" type="number" min="0"
                    max="100" step="1" value="20"
                    style="display:block;width:100%;box-sizing:border-box;padding:12px;margin-top:5px">
            </label>
        </div>
        <hr style="margin:18px 0;border:0;border-top:1px solid #ddd">
        <p>Temps total équipe : <strong id="pcTemps">—</strong></p>
        <p>Coût de main-d'œuvre : <strong id="pcMO">—</strong></p>
        <p>Prix estimé HT : <strong id="pcHT">—</strong></p>
        <p style="font-size:18px">
            Prix estimé TTC : <strong id="pcTTC">—</strong>
        </p>
        <div style="margin-top:18px">
            <strong>Part du budget consommée</strong>
            <p id="pcPourcentage">Budget à renseigner</p>
            <div style="height:16px;background:#e5e7eb;border-radius:20px;overflow:hidden">
                <div id="pcJauge"
                    style="height:100%;width:0%;background:#9ca3af;border-radius:20px">
                </div>
            </div>
            <p id="pcStatut" aria-live="polite">
                Saisis l'enveloppe totale TTC prévue par le client.
            </p>
        </div>
        <small style="color:#666">
            Estimation indicative, pas un devis. Vérifie les frais
            de chantier, les achats, les frais généraux, la marge
            et la TVA avant de transmettre un prix au client.
        </small>
    `;
    commentaires.appendChild(bloc);
    bloc.querySelectorAll("input").forEach(champ => {
        champ.addEventListener("input", () => calculer(bloc));
    });
    calculer(bloc);
}
function verifierResultat() {
    creerBloc();
}
function initialiser() {
    if (!document.body) return;
    // Surveille les résultats, les changements d'étape
    // et le remplacement du contenu après un nouveau calcul.
    const observateur = new MutationObserver(verifierResultat);
    observateur.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ["class"]
    });
    verifierResultat();
    console.info("Pro Clim Budget V3 : module initialisé.");
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiser);
} else {
    initialiser();
}

})();
