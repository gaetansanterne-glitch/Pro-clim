/* ==================================================
PRO CLIM — BUDGET PRO
Estimation du coût et jauge budget client
Version 1.0
================================================== */

(function () {
"use strict";

function initialiserBudget() {
    const etape5 = document.getElementById("etape5");
    const commentaires = document.getElementById("commentaires");
    if (!etape5 || !commentaires) {
        console.error("Pro Clim : zone de résultat introuvable.");
        return;
    }
    // Empêche de créer le bloc plusieurs fois.
    if (document.getElementById("budgetProClim")) {
        return;
    }
    const bloc = document.createElement("section");
    bloc.id = "budgetProClim";
    bloc.style.cssText = [
        "margin-top:20px",
        "padding:18px",
        "border:1px solid #dbe3ee",
        "border-radius:16px",
        "background:#ffffff",
        "color:#172033",
        "text-align:left"
    ].join(";");
    bloc.innerHTML = `
        <div style="margin-bottom:18px">
            <div style="font-size:12px;font-weight:800;letter-spacing:1px;color:#0D47A1">
                ESTIMATION COMMERCIALE
            </div>
            <h3 style="margin:6px 0;font-size:21px">
                💶 Budget du chantier
            </h3>
            <p style="margin:0;color:#64748b;font-size:13px;line-height:1.5">
                Modifie les valeurs pour estimer le prix de vente
                et vérifier s'il respecte l'enveloppe du client.
            </p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div style="grid-column:1/-1">
                <label for="budgetClient" style="display:block;font-weight:700;font-size:13px;margin-bottom:6px">
                    Budget total du client TTC (€)
                </label>
                <input id="budgetClient" type="number" min="0" step="100" value="5000"
                style="box-sizing:border-box;width:100%;padding:12px;border:1px solid #cbd5e1;border-radius:10px;font-size:16px">
            </div>
            <div>
                <label for="budgetJours" style="display:block;font-weight:600;font-size:13px;margin-bottom:6px">
                    Durée (jours)
                </label>
                <input id="budgetJours" type="number" min="0" step="0.5" value="2"
                style="box-sizing:border-box;width:100%;padding:11px;border:1px solid #cbd5e1;border-radius:10px;font-size:16px">
            </div>
            <div>
                <label for="budgetTechniciens" style="display:block;font-weight:600;font-size:13px;margin-bottom:6px">
                    Techniciens
                </label>
                <input id="budgetTechniciens" type="number" min="1" step="1" value="1"
                style="box-sizing:border-box;width:100%;padding:11px;border:1px solid #cbd5e1;border-radius:10px;font-size:16px">
            </div>
            <div>
                <label for="budgetHeures" style="display:block;font-weight:600;font-size:13px;margin-bottom:6px">
                    Heures / jour / technicien
                </label>
                <input id="budgetHeures" type="number" min="0" step="0.5" value="7"
                style="box-sizing:border-box;width:100%;padding:11px;border:1px solid #cbd5e1;border-radius:10px;font-size:16px">
            </div>
            <div>
                <label for="budgetTaux" style="display:block;font-weight:600;font-size:13px;margin-bottom:6px">
                    Coût horaire chargé (€)
                </label>
                <input id="budgetTaux" type="number" min="0" step="1" value="50"
                style="box-sizing:border-box;width:100%;padding:11px;border:1px solid #cbd5e1;border-radius:10px;font-size:16px">
            </div>
            <div>
                <label for="budgetMateriel" style="display:block;font-weight:600;font-size:13px;margin-bottom:6px">
                    Matériel HT (€)
                </label>
                <input id="budgetMateriel" type="number" min="0" step="50" value="2200"
                style="box-sizing:border-box;width:100%;padding:11px;border:1px solid #cbd5e1;border-radius:10px;font-size:16px">
            </div>
            <div>
                <label for="budgetMarge" style="display:block;font-weight:600;font-size:13px;margin-bottom:6px">
                    Marge (%)
                </label>
                <input id="budgetMarge" type="number" min="0" step="1" value="25"
                style="box-sizing:border-box;width:100%;padding:11px;border:1px solid #cbd5e1;border-radius:10px;font-size:16px">
            </div>
            <div style="grid-column:1/-1">
                <label for="budgetTVA" style="display:block;font-weight:600;font-size:13px;margin-bottom:6px">
                    TVA (%)
                </label>
                <input id="budgetTVA" type="number" min="0" step="1" value="20"
                style="box-sizing:border-box;width:100%;padding:11px;border:1px solid #cbd5e1;border-radius:10px;font-size:16px">
            </div>
        </div>
        <div style="margin-top:20px;padding:14px;background:#f1f5f9;border-radius:12px">
            <div style="display:flex;justify-content:space-between;gap:10px;margin:7px 0;font-size:14px">
                <span>Temps de main-d'œuvre</span>
                <strong id="budgetTotalHeures">14 h</strong>
            </div>
            <div style="display:flex;justify-content:space-between;gap:10px;margin:7px 0;font-size:14px">
                <span>Coût de main-d'œuvre</span>
                <strong id="budgetCoutMainOeuvre">700 €</strong>
            </div>
            <div style="display:flex;justify-content:space-between;gap:10px;margin:7px 0;font-size:14px">
                <span>Coût total avant marge HT</span>
                <strong id="budgetCoutBase">2 900 €</strong>
            </div>
            <div style="height:1px;background:#cbd5e1;margin:12px 0"></div>
            <div style="display:flex;justify-content:space-between;gap:10px;margin:7px 0;font-size:14px">
                <span>Prix estimé HT</span>
                <strong id="budgetPrixHT">3 625 €</strong>
            </div>
            <div style="display:flex;justify-content:space-between;gap:10px;margin:7px 0;font-size:14px">
                <span>Montant TVA</span>
                <strong id="budgetMontantTVA">725 €</strong>
            </div>
            <div style="display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:12px;padding-top:12px;border-top:1px solid #cbd5e1">
                <span style="font-size:15px;font-weight:800">PRIX ESTIMÉ TTC</span>
                <strong id="budgetPrixTTC" style="font-size:22px;color:#0D47A1">4 350 €</strong>
            </div>
        </div>
        <div style="margin-top:20px">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:8px">
                <strong style="font-size:15px">Enveloppe du client</strong>
                <strong id="budgetPourcentage">87 %</strong>
            </div>
            <div style="height:16px;background:#e2e8f0;border-radius:20px;overflow:hidden">
                <div id="budgetJauge" style="height:100%;width:87%;background:#f59e0b;border-radius:20px;transition:width .2s,background .2s"></div>
            </div>
            <div id="budgetStatut" role="status" aria-live="polite"
            style="margin-top:12px;padding:12px;border-radius:10px;background:#fff7ed;color:#9a3412;font-weight:700;font-size:14px">
                🟠 Budget à surveiller
            </div>
            <p id="budgetEcart" style="margin:9px 0 0;font-size:13px;color:#64748b;line-height:1.5"></p>
        </div>
        <p style="margin:16px 0 0;color:#64748b;font-size:11px;line-height:1.5">
            Estimation indicative, hors frais ou prestations non renseignés.
            Vérifie les coûts réels, les prix fournisseurs et la marge souhaitée
            avant d'établir un devis.
        </p>
    `;
    // Place le budget dans les résultats, avant le bouton Nouvelle étude.
    const boutonNouvelleEtude =
        document.getElementById("btnNouvelleEtude");
    if (boutonNouvelleEtude) {
        boutonNouvelleEtude.parentNode.insertBefore(
            bloc,
            boutonNouvelleEtude
        );
    } else {
        commentaires.insertAdjacentElement("afterend", bloc);
    }
    const lire = function (id) {
        const element = document.getElementById(id);
        const valeur = Number(element.value);
        return Number.isFinite(valeur) ? Math.max(0, valeur) : 0;
    };
    const euros = function (valeur) {
        return valeur.toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 2
        });
    };
    function calculerBudget() {
        const enveloppe = lire("budgetClient");
        const jours = lire("budgetJours");
        const techniciens = Math.max(
            1,
            Math.floor(lire("budgetTechniciens"))
        );
        const heuresJour = lire("budgetHeures");
        const taux = lire("budgetTaux");
        const materiel = lire("budgetMateriel");
        const marge = lire("budgetMarge") / 100;
        const tva = lire("budgetTVA") / 100;
        const totalHeures = jours * techniciens * heuresJour;
        const coutMainOeuvre = totalHeures * taux;
        const coutBase = coutMainOeuvre + materiel;
        const prixHT = coutBase * (1 + marge);
        const montantTVA = prixHT * tva;
        const prixTTC = prixHT + montantTVA;
        document.getElementById("budgetTotalHeures").textContent =
            totalHeures.toLocaleString("fr-FR", {
                maximumFractionDigits: 2
            }) + " h";
        document.getElementById("budgetCoutMainOeuvre").textContent =
            euros(coutMainOeuvre);
        document.getElementById("budgetCoutBase").textContent =
            euros(coutBase);
        document.getElementById("budgetPrixHT").textContent =
            euros(prixHT);
        document.getElementById("budgetMontantTVA").textContent =
            euros(montantTVA);
        document.getElementById("budgetPrixTTC").textContent =
            euros(prixTTC);
        const jauge = document.getElementById("budgetJauge");
        const pourcentage = document.getElementById("budgetPourcentage");
        const statut = document.getElementById("budgetStatut");
        const ecart = document.getElementById("budgetEcart");
        if (enveloppe <= 0) {
            jauge.style.width = "0%";
            jauge.style.background = "#94a3b8";
            pourcentage.textContent = "—";
            statut.style.background = "#f1f5f9";
            statut.style.color = "#475569";
            statut.textContent = "ℹ️ Renseigne le budget du client.";
            ecart.textContent =
                "La comparaison sera affichée dès que l'enveloppe est renseignée.";
            return;
        }
        const ratio = prixTTC / enveloppe;
        const tauxBudget = ratio * 100;
        const largeur = Math.min(100, tauxBudget);
        jauge.style.width = largeur + "%";
        pourcentage.textContent =
            Math.round(tauxBudget).toLocaleString("fr-FR") + " %";
        if (ratio <= 0.85) {
            jauge.style.background = "#16a34a";
            statut.style.background = "#dcfce7";
            statut.style.color = "#166534";
            statut.textContent = "🟢 Budget maîtrisé";
        } else if (ratio <= 1) {
            jauge.style.background = "#f59e0b";
            statut.style.background = "#fff7ed";
            statut.style.color = "#9a3412";
            statut.textContent = "🟠 Budget à surveiller";
        } else {
            jauge.style.background = "#dc2626";
            statut.style.background = "#fee2e2";
            statut.style.color = "#991b1b";
            statut.textContent = "🔴 Dépassement du budget";
        }
        const difference = enveloppe - prixTTC;
        if (difference >= 0) {
            ecart.textContent =
                "Il reste " + euros(difference) +
                " dans l'enveloppe du client.";
        } else {
            ecart.textContent =
                "Dépassement estimé : " + euros(Math.abs(difference)) +
                ". Il faut réduire les coûts ou revoir l'enveloppe.";
        }
    }
    bloc.querySelectorAll("input").forEach(function (champ) {
        champ.addEventListener("input", calculerBudget);
    });
    calculerBudget();
}
if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initialiserBudget
    );
} else {
    initialiserBudget();
}

})();
