document.addEventListener("DOMContentLoaded", function () {

    // Obtient une référence à l'élément qui contiendra les questions dans le HTML
    const questionContainer = document.getElementById("question-container");

    // Obtient une référence à l'élément de la barre de recherche
    const searchBar = document.getElementById("search-bar");

    // Définit les questions
    const questions = [
        "Quelle est la capitale de la France?",
        "En quelle année les États-Unis ont-ils déclaré leur indépendance?",
        "Quel est le composant principal de l'atmosphère terrestre?",
        "Qui a écrit 'Roméo et Juliette'?",
        "Quelle est la signification de la théorie de la relativité d'Albert Einstein?",
        "Quelle est la capitale de l'Italie?",
        "Combien font 1 + 1?"
    ];

    // Définir les réponses
    const responses = [
        "✅ Paris",
        "✅ 1776",
        "✅ Azote",
        "✅ William Shakespeare",
        "✅ Elle décrit la relation entre la matière et l'énergie.",
        "✅ Rome",
        "✅ 2"
    ];

    // Définir les étiquettes
    const etiquettes = [
        "🥉",
        "🥈",
        "🥇",
        "🥈",
        "🥇",
        "🥉",
        "🥉"
    ];

    // Associer les questions, réponses et étiquettes dans un tableau d'objets
    const combinedQuestions = questions.map((q, i) => ({ question: q, response: responses[i], etiquette: etiquettes[i] }));

    // Mélanger aléatoirement les questions
    const shuffledQuestions = shuffleArray(combinedQuestions);

    // Parcourir les 5 premières questions mélangées
    shuffledQuestions.slice(0, 5).forEach(q => {
        // Crée un élément HTML pour chaque question
        const questionElement = createElement("div", "question", [
            createElement("span", "etiquette", q.etiquette),
            createElement("div", "question-text", q.question),
            createElement("div", "response", "")
        ]);

        // Ajouter l'élément de la question à l'élément contenant toutes les questions
        questionContainer.appendChild(questionElement);

        // Ajouter un gestionnaire d'événements pour le clic sur l'étiquette
        questionElement.querySelector('.etiquette').addEventListener('click', () => toggleResponse(questionElement.querySelector('.response'), q.response));
    });

    // Ajouter un gestionnaire d'événements pour la recherche
    searchBar.addEventListener("input", () => {
        if (searchBar.value === "") {
            resetQuestions();
        } else {
            updateQuestions(combinedQuestions.filter(q => q.question.toLowerCase().includes(searchBar.value.toLowerCase())));
        }
    });

    /*******  Partie fonctions *******/

    // Fonction pour mettre à jour l'affichage des questions
    function updateQuestions(filteredQuestions) {
        // Efface les questions actuelles
        questionContainer.innerHTML = "";
        // Affiche les questions filtrées
        filteredQuestions.forEach(q => {
            const questionElement = createElement("div", "question", [
                createElement("span", "etiquette", q.etiquette),
                createElement("div", "question-text", q.question),
                createElement("div", "response", "")
            ]);

            questionContainer.appendChild(questionElement);

            // Ajoute un gestionnaire d'événements pour le clic sur l'étiquette
            questionElement.querySelector('.etiquette').addEventListener('click', () => toggleResponse(questionElement.querySelector('.response'), q.response));
        });
    }

    // Fonction pour réinitialiser les questions affichées aux cinq premières
    function resetQuestions() {
        updateQuestions(shuffledQuestions.slice(0, 5));
    }

    // Fonction pour afficher ou masquer la réponse
    function toggleResponse(responseElement, response) {
        // Si la réponse est masquée ou vide, affiche la réponse
        if (responseElement.style.display === 'none' || responseElement.style.display === '') {
            responseElement.style.display = 'block';
            responseElement.textContent = response;
        }
        // Sinon, masque la réponse
        else {
            responseElement.style.display = 'none';
            responseElement.textContent = '';
        }
    }

    // Fonction pour mélanger aléatoirement un tableau array
    function shuffleArray(array) {
        for (let i = 0; i < array.length - 1; i++) {
            const j = Math.floor(Math.random() * (array.length - i) + i);
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Fonction pour créer un élément HTML avec une classe et des fils
    function createElement(tag, className, children) {
        const element = document.createElement(tag);
        element.classList.add(className);

        if (Array.isArray(children)) {
            children.forEach(child => element.appendChild(child));
        } else {
            element.textContent = children;
        }

        return element;
    }
});
