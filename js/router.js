/* ==========================================
   PRO CLIM
   ROUTER
========================================== */

const ROUTER = {

    pages: document.querySelectorAll(".page"),

    afficher(id) {

        this.pages.forEach(page => {
            page.classList.remove("active");
        });

        const page = document.getElementById(id);

        if (page) {
            page.classList.add("active");
        }

    },

    initialiser() {

        document
            .getElementById("btnAccueil")
            ?.addEventListener("click", () => {

                this.afficher("pageAccueil");

            });

        document
            .getElementById("btnEtude")
            ?.addEventListener("click", () => {

                this.afficher("pageEtude");

            });

        document
            .getElementById("btnDiagnostic")
            ?.addEventListener("click", () => {

                this.afficher("pageDiagnostic");

            });

        document
            .getElementById("btnPression")
            ?.addEventListener("click", () => {

                this.afficher("pagePression");

            });

        document
            .getElementById("btnOutils")
            ?.addEventListener("click", () => {

                this.afficher("pageOutils");

            });

        document
            .getElementById("btnAcademie")
            ?.addEventListener("click", () => {

                this.afficher("pageAcademie");

            });

    }

};
