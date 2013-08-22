var buster = require('buster'),
  bag = require('../lib/bagoftext'),
  fs = require('fs'),
  i18n = require('i18n');

buster.testCase('text - initLocales', {
  setUp: function () {
    this.mockFs = this.mock(fs);
    this.mockI18n = this.mock(i18n);
    this.mockProcess = this.mock(process);
  },
  'should configure and set current locale based on LANG environment variable': function () {
    this.mockProcess.expects('cwd').withExactArgs().returns('somedir');
    this.mockFs.expects('readdirSync').withExactArgs('somedir/conf/locales').returns(['en.json', 'id.json']);
    this.stub(process, 'env', { LANG: 'en_AU.UTF-8' });
    this.mockI18n.expects('configure').withExactArgs({
      locales: ['en', 'id'],
      defaultLocale: 'en',
      directory: 'somedir/conf/locales',
      updateFiles: false
    });
    this.mockI18n.expects('setLocale').withExactArgs('en');
    bag.initLocales();
  },
  'should configure and set default locale opt when provided, and use dir opt': function () {
    this.mockFs.expects('readdirSync').withExactArgs('somelocalesdir').returns(['en.json', 'id.json']);
    this.stub(process, 'env', { LANG: 'en_AU.UTF-8' });
    this.mockI18n.expects('configure').withExactArgs({
      locales: ['en', 'id'],
      defaultLocale: 'id',
      directory: 'somelocalesdir',
      updateFiles: false
    });
    this.mockI18n.expects('setLocale').withExactArgs('en');
    bag.initLocales({ defaultLocale: 'id', dir: 'somelocalesdir' });
  },
  'should not set locale when environment variable is not available': function () {
    this.mockProcess.expects('cwd').withExactArgs().returns('somedir');
    this.mockFs.expects('readdirSync').withExactArgs('somedir/conf/locales').returns(['en.json', 'id.json']);
    this.stub(process, 'env', { LANG: undefined });
    this.mockI18n.expects('configure').withExactArgs({
      locales: ['en', 'id'],
      defaultLocale: 'id',
      directory: 'somedir/conf/locales',
      updateFiles: false
    });
    bag.initLocales({ defaultLocale: 'id' });
  },
  'should not set locale when environment variable locale is not available': function () {
    this.mockProcess.expects('cwd').withExactArgs().returns('somedir');
    this.mockFs.expects('readdirSync').withExactArgs('somedir/conf/locales').returns(['id.json']);
    this.stub(process, 'env', { LANG: 'en_AU.UTF-8' });
    this.mockI18n.expects('configure').withExactArgs({
      locales: ['id'],
      defaultLocale: 'id',
      directory: 'somedir/conf/locales',
      updateFiles: false
    });
    bag.initLocales({ defaultLocale: 'id' });
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

