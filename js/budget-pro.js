/* ==========================================
   PRO CLIM — BUDGET ET TEMPS DE CHANTIER
   Version corrigée
========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const commentaires = document.getElementById("commentaires");
    if (!commentaires) {
        console.warn("Pro Clim : zone commentaires introuvable.");
        return;
    }
    let actualisationEnCours = false;
    /* ==========================================
       OUTILS
    ========================================== */
    function euros(valeur) {
        return valeur.toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0
        });
    }
    function valeur(id) {
        const champ = document.getElementById(id);
        return Math.max(
            0,
            Number(champ?.value || 0)
        );
    }
    /* ==========================================
       CALCUL DU BUDGET
    ========================================== */
    function calculer() {
        const bloc = document.getElementById("pcBudgetBloc");
        if (!bloc) return;
        const jours = Math.max(0.5, valeur("pcJours"));
        const equipe = Math.max(1, Math.floor(valeur("pcEquipe")));
        const heures = Math.min(24, Math.max(1, valeur("pcHeures")));
        const taux = valeur("pcTaux");
        const materiel = valeur("pcMateriel");
        const marge = valeur("pcMarge") / 100;
        const tva = valeur("pcTVA") / 100;
        const budget = valeur("pcBudget");
        // Temps total de travail de l'équipe
        const temps = jours * equipe * heures;
        // Coût de main-d'œuvre
        const mainOeuvre = temps * taux;
        // Prix estimatif
        const prixHT = (materiel + mainOeuvre) * (1 + marge);
        const prixTTC = prixHT * (1 + tva);
        bloc.querySelector("#pcTemps").textContent =
            `${temps.toLocaleString("fr-FR")} h`;
        bloc.querySelector("#pcMO").textContent =
            euros(mainOeuvre);
        bloc.querySelector("#pcHT").textContent =
            euros(prixHT);
        bloc.querySelector("#pcTTC").textContent =
            euros(prixTTC);
        const jauge = bloc.querySelector("#pcJauge");
        const statut = bloc.querySelector("#pcStatut");
        const pourcentage = bloc.querySelector("#pcPourcentage");
        if (budget <= 0) {
            jauge.style.width = "0%";
            jauge.style.background = "#22a447";
            pourcentage.textContent = "Budget à renseigner";
            statut.textContent = "Saisis le budget total du client.";
            statut.style.color = "";
            return;
        }
        const ratio = prixTTC / budget;
        jauge.style.width =
            `${Math.min(100, ratio * 100)}%`;
        jauge.style.background =
            ratio <= 0.85 ? "#22a447" :
            ratio <= 1 ? "#e9a23b" :
            "#d93636";
        pourcentage.textContent =
            `${Math.round(ratio * 100)} %`;
        if (ratio <= 0.85) {
            statut.textContent =
                `Budget respecté. Reste ${euros(budget - prixTTC)}.`;
            statut.style.color = "#16803c";
        } else if (ratio <= 1) {
            statut.textContent =
                `Budget presque atteint. Reste ${euros(budget - prixTTC)}.`;
            statut.style.color = "#a16207";
        } else {
            statut.textContent =
                `Budget dépassé de ${euros(prixTTC - budget)}.`;
            statut.style.color = "#c62828";
        }
    }
    /* ==========================================
       AFFICHAGE DU BLOC BUDGET
    ========================================== */
    function afficher() {
        if (actualisationEnCours) return;
        const contenu = commentaires.innerText || "";
        const resultatPresent =
            contenu.includes("Détail de l'étude") ||
            contenu.includes("Synthèse multi-split");
        const blocExistant =
            document.getElementById("pcBudgetBloc");
        if (!resultatPresent) {
            if (blocExistant) {
                blocExistant.remove();
            }
            return;
        }
        // IMPORTANT :
        // Ne pas recalculer ici.
        // Cela évite la boucle MutationObserver.
        if (blocExistant) return;
        actualisationEnCours = true;
        try {
            const bloc = document.createElement("section");
            bloc.id = "pcBudgetBloc";
            bloc.style.cssText = `
                margin-top: 18px;
                padding: 16px;
                border: 1px solid #ccc;
                border-radius: 14px;
                background: #fff;
                color: #222;
            `;
            bloc.innerHTML = `
                <h3>💶 Budget et temps de chantier</h3>
                <p>Toutes les valeurs sont modifiables.</p>
                <label>
                    Budget total du client (€ TTC)
                    <input id="pcBudget" type="number"
                        min="0" step="100" placeholder="Ex. 5000">
                </label>
                <br><br>
                <label>
                    Durée prévue (jours)
                    <input id="pcJours" type="number"
                        min="0.5" step="0.5" value="2">
                </label>
                <br><br>
                <label>
                    Nombre de techniciens
                    <input id="pcEquipe" type="number"
                        min="1" step="1" value="1">
                </label>
                <br><br>
                <label>
                    Heures par jour et par technicien
                    <input id="pcHeures" type="number"
                        min="1" max="24" step="0.5" value="7">
                </label>
                <br><br>
                <label>
                    Coût horaire chargé (€ / h)
                    <input id="pcTaux" type="number"
                        min="0" step="1" value="50">
                </label>
                <br><br>
                <label>
                    Coût matériel HT (€)
                    <input id="pcMateriel" type="number"
                        min="0" step="50" value="2200">
                </label>
                <br><br>
                <label>
                    Marge commerciale (%)
                    <input id="pcMarge" type="number"
                        min="0" step="1" value="25">
                </label>
                <br><br>
                <label>
                    TVA (%)
                    <input id="pcTVA" type="number"
                        min="0" max="100" step="1" value="20">
                </label>
                <hr>
                <p>
                    Temps total équipe :
                    <strong id="pcTemps">14 h</strong>
                </p>
                <p>
                    Coût de main-d'œuvre :
                    <strong id="pcMO">700 €</strong>
                </p>
                <p>
                    Prix estimé HT :
                    <strong id="pcHT">3 625 €</strong>
                </p>
                <p>
                    Prix estimé TTC :
                    <strong id="pcTTC">4 350 €</strong>
                </p>
                <p>
                    Budget utilisé :
                    <strong id="pcPourcentage">À calculer</strong>
                </p>
                <div style="
                    height: 14px;
                    background: #ddd;
                    border-radius: 20px;
                    overflow: hidden;
                ">
                    <div id="pcJauge" style="
                        height: 100%;
                        width: 0%;
                        background: #22a447;
                        transition: width 0.25s ease;
                    "></div>
                </div>
                <p id="pcStatut">
                    Saisis le budget total du client.
                </p>
                <small>
                    Estimation indicative. Ajuste le matériel,
                    les coûts de main-d'œuvre, les frais de chantier,
                    la marge et la TVA avant d'établir un devis.
                </small>
            `;
            commentaires.appendChild(bloc);
            bloc.querySelectorAll("input").forEach(champ => {
                champ.addEventListener("input", calculer);
            });
            calculer();
        } finally {
            actualisationEnCours = false;
        }
    }
    /* ==========================================
       SURVEILLANCE DES RÉSULTATS
    ========================================== */
    const observateur = new MutationObserver(() => {
        afficher();
    });
    observateur.observe(commentaires, {
        childList: true,
        subtree: true,
        characterData: true
    });
    afficher();
});
