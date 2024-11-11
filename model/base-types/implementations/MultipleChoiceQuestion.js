const Question = require("../Question");
/**
 * Définis une question à choix multiples
 */
class MultipleChoiceQuestion extends Question {
    /**
     * Instancie une question à choix multiples
     * @param {string} question - Question posée
     * @param {string[]} answerSet - Ensemble des réponses possibles
     * @param {number[]} correctAnswers - Index des réponses valide
     */
    constructor(question, answerSet, correctAnswers) {
        super(question);
        this._questionsSet = answerSet;
        this._correctAnswers = correctAnswers;
    }

    /**
     * @inheritDoc
     */
    get questionType() {
        return "Choix Multiples";
    }

    /**
     * @returns {string[]} - L'ensemble des réponses proposées à la question
     */
    get answerSet() {
        return this._questionsSet;
    }
}

module.exports = MultipleChoiceQuestion;