const TrueFalseQuestion = require('../../../model/base-types/implementations/TrueFalseQuestion');

test('Type de question vrai/faux', () => {
    expect(new TrueFalseQuestion("question", true).questionType).toBe('Vrai/Faux');
})

test('Egalité questions vrai/faux', () => {
    expect(new TrueFalseQuestion("question", true)).toEqual(new TrueFalseQuestion("question", true));
})