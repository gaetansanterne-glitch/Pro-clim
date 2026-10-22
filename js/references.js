
/* ==================================================
   PRO CLIM — RÉFÉRENCES DE PUISSANCE
   Version 1.2 — Lecture des puissances corrigée
   Module indépendant
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

        // Exemples acceptés : 3200 W, 3 200 W, 3 200 W,
        // 3,2 kW ou 3.2 kW.
        const texteOriginal = element.textContent.trim();
        const estKW = /kW/i.test(texteOriginal);

        const texte = texteOriginal
            .replace(/[\s\u00a0\u202f]+/g, "")
            .replace(",", ".");

        const correspondance = texte.match(/\d+(?:\.\d+)?/);

        if (!correspondance) return 0;

        const valeur = Number(correspondance[0]);

        if (!Number.isFinite(valeur) || valeur <= 0) {
            return 0;
        }

        return estKW ? valeur : valeur / 1000;
    }

    function initialiserReferences() {
        const etape5 = document.getElementById("etape5");
        const puissanceElement =
            document.getElementById("resPuissance");

        if (!etape5 || !puissanceElement) {
            console.warn(
                "Pro Clim : étape 5 ou puissance introuvable."
            );
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

            const bouton = document.getElementById(
                "btnNouvelleEtude"
            );

            if (bouton && bouton.parentNode === etape5) {
                etape5.insertBefore(bloc, bouton);
            } else {
                etape5.appendChild(bloc);
            }
        }

        function actualiser() {
            const besoinKW = lirePuissance();

            if (besoinKW <= 0) {
                bloc.style.display = "none";
                return;
            }

            bloc.style.display = "block";

            const adaptee = REFERENCES_KW.find(
                puissance => puissance >= besoinKW
            );

            const inferieures = REFERENCES_KW
                .filter(puissance => puissance < besoinKW)
                .slice(-2);

            const superieures = REFERENCES_KW
                .filter(puissance => puissance >= besoinKW)
                .slice(0, 3);

            const formatKW = valeur =>
                valeur.toLocaleString("fr-FR", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                }) + " kW";

            const couleur = adaptee ? "#0D47A1" : "#B45309";

            const options = [
                ...inferieures,
                ...superieures
            ].filter(
                (puissance, index, tableau) =>
                    tableau.indexOf(puissance) === index
            );

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

                <h3 style="margin:0 0 10px;font-size:20px;">
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
                        ${adaptee
                            ? "Puissance nominale à étudier"
                            : "Attention"}
                    </div>

                    <div style="
                        font-size:23px;
                        font-weight:800;
                        color:${couleur};
                        margin-top:4px;
                    ">
                        ${adaptee
                            ? formatKW(adaptee)
                            : "Étude complémentaire"}
                    </div>

                    <div style="font-size:13px;margin-top:6px;">
                        ${adaptee
                            ? "Première référence supérieure ou égale au besoin."
                            : "Aucune référence de cette liste ne couvre le besoin."}
                    </div>
                </div>

                <div style="font-weight:700;margin-bottom:8px;">
                    Puissances voisines
                </div>

                <div style="display:flex;flex-wrap:wrap;gap:8px;">
                    ${options.map(puissance => {
                        const suffisante = puissance >= besoinKW;

                        return `
                            <div style="
                                padding:9px 12px;
                                border-radius:10px;
                                border:1px solid ${
                                    suffisante ? "#93c5fd" : "#e2e8f0"
                                };
                                background:${
                                    puissance === adaptee
                                        ? "#dbeafe"
                                        : suffisante
                                            ? "#eff6ff"
                                            : "#f8fafc"
                                };
                                font-weight:700;
                            ">
                                ${formatKW(puissance)}
                                <div style="
                                    font-size:11px;
                                    font-weight:400;
                                    color:#475569;
                                    margin-top:3px;
                                ">
                                    ${puissance === adaptee
                                        ? "À examiner en priorité"
                                        : suffisante
                                            ? "À étudier"
                                            : "Sous le besoin"}
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
                    Vérifier les déperditions, les conditions de
                    fonctionnement et les données du fabricant.
                    En multisplit, vérifier les combinaisons autorisées
                    entre unités intérieures et groupe extérieur.
                </p>
            `;
        }

        // Premier affichage.
        actualiser();

        // Surveille uniquement la valeur de puissance :
        // le bloc de références ne peut pas déclencher sa propre boucle.
        if (!puissanceElement.dataset.referencesObservees) {
            puissanceElement.dataset.referencesObservees = "true";

            const observateur = new MutationObserver(actualiser);

            observateur.observe(puissanceElement, {
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
