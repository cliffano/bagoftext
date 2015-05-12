<img align="right" src="https://raw.github.com/cliffano/bagoftext/master/avatar.jpg" alt="Avatar"/>

[![Build Status](https://img.shields.io/travis/cliffano/bagoftext.svg)](http://travis-ci.org/cliffano/bagoftext)
[![Dependencies Status](https://img.shields.io/david/cliffano/bagoftext.svg)](http://david-dm.org/cliffano/bagoftext)
[![Coverage Status](https://coveralls.io/repos/cliffano/bagoftext/badge.png?branch=master)](https://coveralls.io/r/cliffano/bagoftext?branch=master)
[![Published Version](https://badge.fury.io/js/bagoftext.png)](http://badge.fury.io/js/bagoftext)
<br/>
[![npm Badge](https://nodei.co/npm/bagoftext.png)](http://npmjs.org/package/bagoftext)

Bag Of Text
-----------

Bag Of Text contains text utility functions.

Installation
------------

    npm install bagoftext

or as a dependency in package.json file:

    "dependencies": {
      "bagoftext": "x.y.z"
    }

Usage
-----

    var text = require('bagoftext');
    
Localisation:

    // initialise default locale and the location of locale files
    text.initLocales(__dirname, {
      defaultLocale: 'en',
      localesDir: 'path/to/locales/'
    });

    // display 'Hello Homer Simpson'
    console.log(text.__('Hello %s %s', 'Homer', 'Simpson'));

    // switch locale to spanish
    text.setLocale('es');

    // assuming there's a path/to/locales/es.json locale file
    // containing { 'Hello %s %s': 'Hola %s %s' }
    // then display 'Hola Homer Simpson'
    console.log(text.__('Hello %s %s', 'Homer', 'Simpson'));

Colophon
--------

[Developer's Guide](http://cliffano.github.io/developers_guide.html#nodejs)

Build reports:

* [Code complexity report](http://cliffano.github.io/bagoftext/bob/complexity/plato/index.html)
* [Unit tests report](http://cliffano.github.io/bagoftext/bob/test/buster.out)
* [Test coverage report](http://cliffano.github.io/bagoftext/bob/coverage/buster-istanbul/lcov-report/lib/index.html)
* [Integration tests report](http://cliffano.github.io/bagoftext/bob/test-integration/cmdt.out)
* [API Documentation](http://cliffano.github.io/bagoftext/bob/doc/dox-foundation/index.html)
