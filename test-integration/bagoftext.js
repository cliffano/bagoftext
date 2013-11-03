var buster = require('buster-node'),
  bag = require('../lib/bagoftext'),
  referee = require('referee'),
  assert = referee.assert;

buster.testCase('text - locale', {
  'should return text based on locale': function () {
    bag.initLocales(__dirname, {
      defaultLocale: 'en',
      localesDir: 'fixtures/'
    });
    assert.equals(bag.__('Hello %s %s', 'Homer', 'Simpson'), 'Hello Homer Simpson');
    bag.setLocale('es');
    assert.equals(bag.__('Hello %s %s', 'Homer', 'Simpson'), 'Hola Homer Simpson');
  }
});

