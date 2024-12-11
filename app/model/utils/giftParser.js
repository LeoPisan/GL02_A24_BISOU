const QuestionController = require('../../controller/QuestionController');
class GiftParser {
   constructor(sTokenize, sParsedSymb) {
       this.parsedQuestions = [];
       this.symb = ["::", "{", "}", "~", "=", "->", "//"];
       this.showTokenize = sTokenize;
       this.showParsedSymbols = sParsedSymb;
       this.errorCount = 0;
   }

   // Tokenize the input data
   tokenize(data) {
        const separator = /(::|::|\{|\}|~|=|->|\r\n|\n)/;
        data = data.split(separator);
        data = data.filter((val, idx) => !val.match(separator)); 					
	    return data;
   }

   // Parse the input data
   parse(data) {
       const tData = this.tokenize(data);
       if (this.showTokenize) {
           console.log(tData);
       }
       this.listQuestions(tData);
   }

   // Error message handler
   errMsg(msg, input) {
       this.errorCount++;
       console.log("Parsing Error! on " + input + " -- msg: " + msg);
   }

   // Read and return a symbol from input
   next(input) {
       const curS = input.shift();
       if (this.showParsedSymbols) {
           console.log(curS);
       }
       return curS;
   }

   // Verify if the arg s is part of the language symbols
   accept(s) {
       const idx = this.symb.indexOf(s);
       if (idx === -1) {
           this.errMsg("symbol " + s + " unknown", [" "]);
           return false;
       }
       return idx;
   }

   // Check whether the arg elt is on the head of the list
   check(s, input) {
       return this.accept(input[0]) === this.accept(s);
   }

   // Expect the next symbol to be s
   expect(s, input) {
       if (s === this.next(input)) {
           return true;
       } else {
           this.errMsg("symbol " + s + " doesn't match", input);
       }
       return false;
   }

   // Grammar rules

   // <list_questions> = *(<question>) "$$"
   listQuestions(input) {
        this.question(input);
   }

   // <question> = "::" <question_text> "::" <answers>
question(input) {
    if (this.check("::", input)) {
        this.expect("::", input);
        this.questionText(input); // Skip the first part
        this.expect("::", input);
        const questionText = this.questionText(input);
        const answers = this.answers(input);
        this.parsedQuestions.push(mcq);
    }
}

// <question_text> = 1*WCHAR
questionText(input) {
    const curS = this.next(input);
    return curS.trim();
}

// <answers> = "{" *(<answer>) "}"
answers(input) {
    this.expect("{", input);
    const answers = [];
    while (input[0] !== "}") {
        answers.push(this.answer(input));
    }
    this.expect("}", input);
    return answers;
}

// <answer> = "~" <answer_text> | "=" <correct_answer_text>
answer(input) {
    const type = this.next(input);
    const text = this.next(input).trim();
    const isCorrect = type === "=";
    return { text: text, isCorrect: isCorrect };
}
}

module.exports = GiftParser;