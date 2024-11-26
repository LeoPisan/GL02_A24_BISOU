const TestCache = require('../../../app/controller/utils/TestCache');
const TestController = require('../../../app/controller/TestController');
const Test = require('../../../app/model/base-types/Test');
const Question = require('../../../app/model/base-types/Question');

describe('TestCache', () => {
   test('Récupération de l\'instance du cache des tests', () => {
      expect(TestCache.instance).not.toBeNull();
      expect(TestCache.instance).toBe(TestCache.instance);
   });
});

test("Ajout d'un examen au cache", () => {
   const test = new Test();
   TestCache.instance.addTest(test);
   expect(TestCache.instance.tests).toContainEqual(test);
});

test("Suppression d'un examen du cache", () => {;
   const test = new Test();
   TestCache.instance.addTest(test);
   TestCache.instance.removeTest(test);
   expect(TestCache.instance.tests).not.toContain(test);
});

test("Mise à jour d'un examen dans le cache", () => {
   const test = new Test();
   const question = new Question('question 1');
   TestCache.instance.addTest(test);
   test.addQuestion(question);
   TestCache.instance.updateTest(test);
   expect(TestCache.instance.tests).toContainEqual(test);
   expect(TestCache.instance.getTestById(test.id).questions).toEqual([question]);
});
