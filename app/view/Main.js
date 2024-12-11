const { program } = require('commander');
const fs = require('fs');
const GiftParser = require('../model/utils/giftParser');
const addQuestionCommands = require('./QuestionCommands');
const addTestCommands = require('./TestCommands');
const TestController = require('../controller/TestController');
const QuestionController = require('../controller/QuestionController');
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

        const questions = parser.parsedQuestions;
        console.log('Parsed Questions:', questions);
    });

program.parse(process.argv);

module.exports = program;