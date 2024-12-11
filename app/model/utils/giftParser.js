const parser = require("gift-pegjs");

class GiftParser {
    constructor(sTokenize, sParsedSymb) {
        this.parsedQuestions = [];
        this.showTokenize = sTokenize;
        this.showParsedSymbols = sParsedSymb;
        this.errorCount = 0;
    }

    // Parse the input data using gift-pegjs
    parse(data) {
        try {
            const parsedData = parser.parse(data);
            if (this.showTokenize) {
                console.log(parsedData);
            }
            this.extractQuestions(parsedData);
        } catch (error) {
            this.errMsg(error.message, data);
        }
    }

    // Extract questions from parsed data
    extractQuestions(parsedData) {
        parsedData.forEach(item => {
            console.log('not implemented');
        });
    }

    // Determine the question type
    getQuestionType(item) {
        console.log('not implemented');
    }

    // Extract answers from the item
    getAnswers(item) {
        console.log('not implemented');
    }
    

    // Error message handler
    errMsg(msg, input) {
        this.errorCount++;
        console.log("Parsing Error! on " + input + " -- msg: " + msg);
    }
}

module.exports = GiftParser;