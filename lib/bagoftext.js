var fs = require('fs'),
  i18n = require('i18n'),
  p = require('path'),
  util = require('util');

/**
 * Initialise locales based on what's configured on conf/locales.
 * Set current locale based on LANG environment variable.
 *
 * @param {String} base: base directory where the client module is located,
 *   used as a base directory to read locale .json files,
 *   ideally the value would be the client's __dirname
 * @param {Object} opts: 
 * - defaultLocale: default locale, defaults to en
 * - localesDir: directory where locale files are from base directory, defaults to conf/locales/
 */
function initLocales(base, opts) {

  opts = opts || {};
  opts.defaultLocale = opts.defaultLocale || 'en';
  opts.dir = p.join(base, opts.localesDir || '../conf/locales/');

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
 * Set current locale.
 *
 * @param {String} locale: locale string
 */
function setLocale(locale) {
  i18n.setLocale(locale);
}

/**
 * Convenient function that applies arguments to localised text format.
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
exports.setLocale = setLocale;
exports.__ = __;
