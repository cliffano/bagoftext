var fs = require('fs'),
  i18n = require('i18n'),
  p = require('path'),
  util = require('util');

/**
 * Initialise locales based on what's configured on conf/locales.
 * Set current locale based on LANG environment variable.
 *
 * @param {Object} opts: 
 * - defaultLocale: default locale, defaults to en
 * - dir: directory where locale files are, defaults to current directory /conf/locales
 */
function initLocales(opts) {

  opts = opts || {};
  opts.defaultLocale = opts.defaultLocale || 'en';
  opts.dir = opts.dir || p.join(process.cwd(), 'conf', 'locales');

  function _availLocales() {
    return fs.readdirSync(opts.dir).map(function (item) {
      return item.replace(/\.json$/, '');
    });
  }

  function _currLocale() {
    var currLocale;
    if (process.env.LANG) {
      var locale = process.env.LANG.split('_')[0];
      if (i18nOpts.locales.indexOf(locale) !== -1) {
        currLocale = locale;
      }
    }
    return currLocale;
  }

  var i18nOpts = {
    locales: _availLocales(),
    defaultLocale: opts.defaultLocale,
    directory: opts.dir,
    updateFiles: false
  };

  i18n.configure(i18nOpts);
  i18n.setLocale(_currLocale());
}

/**
 * Convenient function that adds format support to localised text.
 *
 * @param {String} format: text format
 */
function __(format) {
  //var args = [i18n.__(format)].concat(arguments.slice(1, arguments.length));
  var args = [i18n.__(format)];
  for (var i = 1, ln = arguments.length; i < ln; i += 1) {
    args.push(arguments[i]);
  }
  return util.format.apply(this, args);
}

exports.initLocales = initLocales;
exports.__ = __;