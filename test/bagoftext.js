var buster = require('buster-node'),
  bag = require('../lib/bagoftext'),
  fs = require('fs'),
  i18n = require('i18n'),
  referee = require('referee'),
  assert = referee.assert;

buster.testCase('text - initLocales', {
  setUp: function () {
    this.mockFs = this.mock(fs);
    this.mockI18n = this.mock(i18n);
  },
  'should configure and set current locale based on LANG environment variable': function () {
    this.mockFs.expects('readdirSync').withExactArgs('conf/locales/').returns(['en.json', 'id.json']);
    this.stub(process, 'env', { LANG: 'en_AU.UTF-8' });
    this.mockI18n.expects('configure').withExactArgs({
      locales: ['en', 'id'],
      defaultLocale: 'en',
      directory: 'conf/locales/',
      updateFiles: false
    });
    this.mockI18n.expects('setLocale').withExactArgs('en');
    bag.initLocales('somebasedir');
  },
  'should configure and set default locale opt when provided, and use dir opt': function () {
    this.mockFs.expects('readdirSync').withExactArgs('somebasedir/somelocalesdir').returns(['en.json', 'id.json']);
    this.stub(process, 'env', { LANG: 'en_AU.UTF-8' });
    this.mockI18n.expects('configure').withExactArgs({
      locales: ['en', 'id'],
      defaultLocale: 'id',
      directory: 'somebasedir/somelocalesdir',
      updateFiles: false
    });
    this.mockI18n.expects('setLocale').withExactArgs('en');
    bag.initLocales('somebasedir', { defaultLocale: 'id', localesDir: 'somelocalesdir' });
  },
  'should not set locale when environment variable is not available': function () {
    this.mockFs.expects('readdirSync').withExactArgs('conf/locales/').returns(['en.json', 'id.json']);
    this.stub(process, 'env', { LANG: undefined });
    bag.initLocales('somebasedir', { defaultLocale: 'id' });
  },
  'should not set locale when environment variable locale is not available': function () {
    this.mockFs.expects('readdirSync').withExactArgs('conf/locales/').returns(['id.json']);
    this.stub(process, 'env', { LANG: 'en_AU.UTF-8' });
    bag.initLocales('somebasedir', { defaultLocale: 'id' });
  }
});

buster.testCase('text - setLocale', {
  setUp: function () {
    this.mockI18n = this.mock(i18n);
  },
  'should delegate to i18n#setLocale': function () {
    this.mockI18n.expects('setLocale').withExactArgs('de');
    bag.setLocale('de');
  }
});

buster.testCase('text - __', {
  setUp: function () {
    this.mockI18n = this.mock(i18n);
  },
  'should format arguments when provided': function () {
    this.mockI18n.expects('__').withExactArgs('name %s, age %d').returns('nama %s, umur %d');
    assert.equals(bag.__('name %s, age %d', 'somename', 30), 'nama somename, umur 30');
  },
  'should keep format when arguments are not provided': function () {
    this.mockI18n.expects('__').withExactArgs('name %s, age %d').returns('nama %s, umur %d');
    assert.equals(bag.__('name %s, age %d'), 'nama %s, umur %d');
  }
});
