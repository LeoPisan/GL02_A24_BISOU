const BlankWordQuestion = require('../model/base-types/implementations/BlankWordQuestion')
const QuestionCache = require('./utils/QuestionCache')
const MultipleChoiceQuestion = require('../model/base-types/implementations/MultipleChoiceQuestion')
const NumericQuestion = require('../model/base-types/implementations/NumericQuestion')
const ShortAnswerQuestion = require('../model/base-types/implementations/ShortAnswerQuestion')
const TrueFalseQuestion = require("../model/base-types/implementations/TrueFalseQuestion");

/**
 * Contrôleur des questions, gère les opérations portant sur celle-ci
 */
class QuestionController {
    /**
     * Créée une nouvelle question à mot manquant
     * @param textPart1 {string} - Première partie du texte
     * @param textPart2 {string} - Deuxième partie du texte
     * @param blankWord {string} - Mot manquant
     * @return {BlankWordQuestion} - Question créée
     */
    createBlankWord(textPart1, textPart2, blankWord) {
        let newQuestion = new BlankWordQuestion(textPart1, textPart2, blankWord);
        this.#addToCache(newQuestion);
        return newQuestion;
    }

    /**
     * Créée une nouvelle question à réponses multiples
     * @param question {string} - Enoncé de la question
     * @param answerSet {string[]} - Ensemble des réponses proposées
     * @param correctAnswers {number[]} - Liste des réponses valides
     * @return {MultipleChoiceQuestion} - Question créée
     */
    createMultipleChoice(question, answerSet, correctAnswers) {
        let newQuestion = new MultipleChoiceQuestion(question, answerSet, correctAnswers);
        this.#addToCache(newQuestion);
        return newQuestion;
    }

    /**
     * Créée une nouvelle question numérique
     * @param question {string} - Enoncé de la question
     * @param answer {number} - Réponse valide
     * @return {NumericQuestion} - Question créée
     */
    createNumeric(question, answer) {
        let newQuestion = new NumericQuestion(question, answer);
        this.#addToCache(newQuestion);
        return newQuestion;
    }

    /**
     * Créée une nouvelle question à réponse courte
     * @param question {string} - Enoncé de la question
     * @param answer - Réponse attendue
     * @returns {ShortAnswerQuestion} - Question créée
     */
    createShortAnswer(question, answer) {
        let newQuestion = new ShortAnswerQuestion(question, answer);
        this.#addToCache(newQuestion);
        return newQuestion;
    }

    /**
     * Créée une question vrai/faux
     * @param question {string} - Enoncé de la question
     * @param answer {boolean} - Réponse valide
     * @returns {TrueFalseQuestion} - Question instanciée
     */
    createTrueFalse(question, answer) {
        let newQuestion = new TrueFalseQuestion(question, answer);
        this.#addToCache(newQuestion);
        return newQuestion;
    }

    /**
     * @returns {Question[]} - Toutes les questions en cache
     */
    readAll() {
        return QuestionCache.instance.questions;
    }

    /**
     * Effectue une recherche sur les questions en cache, chaque paramètre est optionnel
     * @param questionText {string} - String recherchée sur l'énoncé de la question
     * @param questionType {string} - Type de la question
     * @returns {Question[]} - Questions filtrées selon les critères passés en paramètre
     */
    search(questionText = null, questionType = null) {
        let result = this.readAll();
        if (questionText) {
            result = result.filter(question => question.question.includes(questionText));
        }
        if (questionType) {
            result = result.filter(question => Object.getPrototypeOf(question).constructor.questionType === questionType);
        }
        return result;
    }

    // Ajoute une question au cache
    #addToCache(newQuestion) {
        QuestionCache.instance.addQuestion(newQuestion);
    }
}

module.exports = QuestionController;