
/* ==================================================
   PRO CLIM — RÉFÉRENCES DE PUISSANCE
   Module indépendant — Version 1.0
   Ne modifie pas les calculs existants.
================================================== */

(function () {
    "use strict";

    const REFERENCES_KW = [
        1.5, 2.0, 2.5, 3.5, 4.2,
        5.0, 6.0, 7.1, 8.0, 10.0, 12.5
    ];

    function lirePuissance() {
        const element = document.getElementById("resPuissance");

        if (!element) return 0;

        const texte = element.textContent
            .replace(/\u202f|\u00a0/g, " ")
            .trim();

        const correspondance = texte.match(/[\d]+(?:[.,]\d+)?/);

        if (!correspondance) return 0;

        let valeur = Number(
            correspondance[0].replace(",", ".")
        );

        if (!Number.isFinite(valeur) || valeur <= 0) {
            return 0;
        }

        // Le résultat d'étude est normalement exprimé en watts.
        if (/kW/i.test(texte)) {
            valeur *= 1000;
        }

        return valeur;
    }

    function initialiserReferences() {
        const etape5 = document.getElementById("etape5");

        if (!etape5) {
            console.warn("Pro Clim : étape 5 introuvable.");
            return;
        }

        let bloc = document.getElementById(
            "referencesPuissanceProClim"
        );

        if (!bloc) {
            bloc = document.createElement("section");
            bloc.id = "referencesPuissanceProClim";

            bloc.style.cssText = [
                "margin:20px 0",
                "padding:18px",
                "border:1px solid #dbe3ee",
                "border-radius:16px",
                "background:#ffffff",
                "color:#172033",
                "text-align:left"
            ].join(";");

            const budget = document.getElementById(
                "budgetProClim"
            );

            const bouton = document.getElementById(
                "btnNouvelleEtude"
            );

            if (budget && budget.parentNode === etape5) {
                etape5.insertBefore(bloc, budget);
            } else if (
                bouton &&
                bouton.parentNode === etape5
            ) {
                etape5.insertBefore(bloc, bouton);
            } else {
                etape5.appendChild(bloc);
            }
        }

        function actualiser() {
            const puissanceW = lirePuissance();

            if (puissanceW <= 0) {
                bloc.style.display = "none";
                return;
            }

            bloc.style.display = "block";

            const besoinKW = puissanceW / 1000;

            const adaptee = REFERENCES_KW.find(
                function (puissance) {
                    return puissance >= besoinKW;
                }
            );

            const inferieures = REFERENCES_KW
                .filter(function (puissance) {
                    return puissance < besoinKW;
                })
                .slice(-2);

            const superieures = REFERENCES_KW
                .filter(function (puissance) {
                    return puissance >= besoinKW;
                })
                .slice(0, 3);

            const formatKW = function (valeur) {
                return valeur.toLocaleString("fr-FR", {
                    maximumFractionDigits: 1
                }) + " kW";
            };

            let statut = "";
            let couleur = "#0D47A1";

            if (adaptee) {
                statut =
                    "Référence à étudier : " +
                    formatKW(adaptee);
            } else {
                statut =
                    "Besoin supérieur aux références listées : " +
                    "étudier une solution adaptée.";
                couleur = "#B45309";
            }

            const options = [
                ...inferieures,
                ...superieures
            ].filter(function (valeur, index, tableau) {
                return tableau.indexOf(valeur) === index;
            });

            bloc.innerHTML = `
                <div style="
                    font-size:12px;
                    font-weight:800;
                    letter-spacing:1px;
                    color:#0D47A1;
                    margin-bottom:8px;
                ">
                    RÉFÉRENCES ASSOCIÉES
                </div>

                <h3 style="
                    margin:0 0 10px;
                    font-size:20px;
                ">
                    ❄️ Choix de puissance
                </h3>

                <p style="margin:0 0 14px;color:#475569;">
                    Besoin calculé :
                    <strong>${formatKW(besoinKW)}</strong>
                </p>

                <div style="
                    padding:14px;
                    border-radius:12px;
                    background:#eff6ff;
                    border-left:4px solid ${couleur};
                    margin-bottom:14px;
                ">
                    <div style="font-size:13px;color:#475569;">
                        ${adaptee ? "Puissance nominale à étudier" : "Attention"}
                    </div>
                    <div style="
                        font-size:23px;
                        font-weight:800;
                        color:${couleur};
                        margin-top:4px;
                    ">
                        ${adaptee ? formatKW(adaptee) : "Étude complémentaire"}
                    </div>
                    <div style="
                        font-size:13px;
                        margin-top:6px;
                    ">
                        ${statut}
                    </div>
                </div>

                <div style="
                    font-weight:700;
                    margin-bottom:8px;
                ">
                    Puissances voisines
                </div>

                <div style="
                    display:flex;
                    flex-wrap:wrap;
                    gap:8px;
                ">
                    ${options.map(function (puissance) {
                        const suffisante = puissance >= besoinKW;

                        return `
                            <div style="
                                padding:9px 12px;
                                border-radius:10px;
                                border:1px solid ${suffisante ? "#93c5fd" : "#e2e8f0"};
                                background:${suffisante ? "#eff6ff" : "#f8fafc"};
                                font-weight:700;
                            ">
                                ${formatKW(puissance)}
                                <div style="
                                    font-size:11px;
                                    font-weight:400;
                                    color:#475569;
                                    margin-top:3px;
                                ">
                                    ${suffisante ? "À étudier" : "Sous le besoin"}
                                </div>
                            </div>
                        `;
                    }).join("")}
                </div>

                <p style="
                    font-size:12px;
                    line-height:1.5;
                    color:#64748b;
                    margin:14px 0 0;
                ">
                    Aide au pré-dimensionnement uniquement.
                    Vérifier la puissance réelle aux conditions
                    de fonctionnement, les déperditions, les
                    régimes chaud/froid et les données du fabricant.
                    En multisplit, vérifier également les
                    combinaisons autorisées entre unités intérieures
                    et groupe extérieur.
                </p>
            `;
        }

        actualiser();

        if (!etape5.dataset.referencesObservees) {
            etape5.dataset.referencesObservees = "true";

            const observateur = new MutationObserver(
                function () {
                    actualiser();
                }
            );

            observateur.observe(etape5, {
                childList: true,
                subtree: true,
                characterData: true
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialiserReferences
        );
    } else {
        initialiserReferences();
    }
})();
