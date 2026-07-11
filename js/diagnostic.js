const diagnostic = {

    "plus_de_froid": {

        questions: [

            {
                id:1,
                question:"Le groupe extérieur fonctionne ?",
                oui:2,
                non:"Le problème est électrique ou de commande."
            },

            {
                id:2,
                question:"Le compresseur tourne ?",
                oui:3,
                non:"Contrôler carte électronique, relais, condensateur ou inverter."
            },

            {
                id:3,
                question:"Le ventilateur extérieur tourne ?",
                oui:4,
                non:"Contrôler moteur ventilateur, condensateur ou carte."
            },

            {
                id:4,
                question:"La BP est-elle basse ?",
                oui:5,
                non:6
            },

            {
                id:5,
                question:"Du givre est-il présent ?",
                oui:"Suspicion : Manque de charge.",
                non:"Suspicion : Détendeur fermé ou filtre bouché."
            },

            {
                id:6,
                question:"La HP est-elle élevée ?",
                oui:"Condenseur encrassé ou ventilateur insuffisant.",
                non:"Contrôler les sondes ou la carte électronique."
            }

        ]

    }

}

let etape = 0;

function lancerDiagnostic(){

    etape = 0;

    afficherQuestion();

}

function afficherQuestion(){

    const q = diagnostic.plus_de_froid.questions[etape];

    document.getElementById("question").innerHTML=q.question;

}

function reponseOui(){

    const q = diagnostic.plus_de_froid.questions[etape];

    if(typeof q.oui==="number"){

        etape=q.oui-1;

        afficherQuestion();

    }else{

        afficherResultat(q.oui);

    }

}

function reponseNon(){

    const q = diagnostic.plus_de_froid.questions[etape];

    if(typeof q.non==="number"){

        etape=q.non-1;

        afficherQuestion();

    }else{

        afficherResultat(q.non);

    }

}

function afficherResultat(texte){

    document.getElementById("question").innerHTML="✅ "+texte;

}
