const { program } = require('commander');
const fs = require('fs');
const GiftParser = require('../model/utils/giftParser');
const addQuestionCommands = require('./QuestionCommands');
const addTestCommands = require('./TestCommands');

program
    .name("SRU Tests Manager by Bisou")
    .description("A brand new software for managing tests and questions at Sealand's Republic University")

addQuestionCommands(program);
addTestCommands(program);

//parse a Gift format file
program
    .command('parse <file>')
    .description("Parse a Gift format file")
    .action((file) => {
        console.log(`Parsing file ${file}`);
        const data = fs.readFileSync(file, 'utf8');
        const parser = new GiftParser(true, true);
        parser.parse(data);
        console.log('Parsed Questions:', parser.parsedQuestions);

        /*const questions = parser.parsedQuestions;
        console.log('Parsed Questions:', questions);

        // Add questions to your data
        questions.forEach(question => {
            // Assuming you have a function addQuestion to add questions to your data
            addQuestion(question);
        });

        // Create a test using the extracted questions
        const test = createTest(questions);
        console.log('Created Test:', test);*/
    });

program.parse(process.argv);

module.exports = program;