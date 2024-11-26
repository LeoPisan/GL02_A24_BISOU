const Question = require("../Question");

/**
 * Question avec une réponse de type vrai/faux
 */
class TrueFalseQuestion extends Question {
    /**
     * Instancie une question de type vrai/faux
     * @param question {string} - Question posée
     * @param answer {boolean} - Réponse
     */
    constructor(question, answer) {
        super(question);
        this._answer = answer;
        this._question = question;
    }

    /**
     * @inheritDoc
     */
    get questionType() {
        return 'Vrai/Faux';
    }

    /**
     * @returns {boolean} - Réponse attendue à la question
     */
    get answer() {
        return this._answer;
    }

    /**
     * @inheritDoc
     */
    equal(other) {
        return super.equal(other)
            && other instanceof TrueFalseQuestion
            && other.answer === this.answer;
    }
}

module.exports = TrueFalseQuestion;