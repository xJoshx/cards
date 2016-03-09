require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _regenerator = __webpack_require__(12);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(11);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  __webpack_require__(79);
  
  var _path = __webpack_require__(23);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(93);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _cookieParser = __webpack_require__(84);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(83);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _expressJwt = __webpack_require__(95);
  
  var _expressJwt2 = _interopRequireDefault(_expressJwt);
  
  var _expressGraphql = __webpack_require__(94);
  
  var _expressGraphql2 = _interopRequireDefault(_expressGraphql);
  
  var _jsonwebtoken = __webpack_require__(100);
  
  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _server = __webpack_require__(105);
  
  var _server2 = _interopRequireDefault(_server);
  
  var _passport = __webpack_require__(42);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _schema = __webpack_require__(45);
  
  var _schema2 = _interopRequireDefault(_schema);
  
  var _routes = __webpack_require__(48);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _Html = __webpack_require__(31);
  
  var _Html2 = _interopRequireDefault(_Html);
  
  var _assets = __webpack_require__(78);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(10);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var server = global.server = (0, _express2.default)();
  
  //
  // Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
  // user agent is not known.
  // -----------------------------------------------------------------------------
  global.navigator = global.navigator || {};
  global.navigator.userAgent = global.navigator.userAgent || 'all';
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  server.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
  server.use((0, _cookieParser2.default)());
  server.use(_bodyParser2.default.urlencoded({ extended: true }));
  server.use(_bodyParser2.default.json());
  
  //
  // Authentication
  // -----------------------------------------------------------------------------
  server.use((0, _expressJwt2.default)({
    secret: _config.auth.jwt.secret,
    credentialsRequired: false,
    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
    getToken: function getToken(req) {
      return req.cookies.id_token;
    }
  }));
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
  server.use(_passport2.default.initialize());
  
  server.get('/login/facebook', _passport2.default.authenticate('facebook', { scope: ['email', 'user_location'], session: false }));
  server.get('/login/facebook/return', _passport2.default.authenticate('facebook', { failureRedirect: '/login', session: false }), function (req, res) {
    var expiresIn = 60 * 60 * 24 * 180; // 180 days
    var token = _jsonwebtoken2.default.sign(req.user, _config.auth.jwt.secret, { expiresIn: expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  });
  
  //
  // Register API middleware
  // -----------------------------------------------------------------------------
  server.use('/graphql', (0, _expressGraphql2.default)(function (req) {
    return {
      schema: _schema2.default,
      graphiql: true,
      rootValue: { request: req },
      pretty: ("development") !== 'production'
    };
  }));
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  server.get('*', function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                var statusCode, data, css, context, html;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        statusCode = 200;
                        data = { title: '', description: '', css: '', body: '', entry: _assets2.default.main.js };
                        css = [];
                        context = {
                          insertCss: function insertCss(styles) {
                            return css.push(styles._getCss());
                          },
                          onSetTitle: function onSetTitle(value) {
                            return data.title = value;
                          },
                          onSetMeta: function onSetMeta(key, value) {
                            return data[key] = value;
                          },
                          onPageNotFound: function onPageNotFound() {
                            return statusCode = 404;
                          }
                        };
                        _context.next = 6;
                        return _routes2.default.dispatch({ path: req.path, query: req.query, context: context }, function (state, component) {
                          data.body = _server2.default.renderToString(component);
                          data.css = css.join('');
                        });
  
                      case 6:
                        html = _server2.default.renderToStaticMarkup(_react2.default.createElement(_Html2.default, data));
  
                        res.status(statusCode).send('<!doctype html>\n' + html);
  
                      case 8:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              })(), 't0', 2);
  
            case 2:
              _context2.next = 7;
              break;
  
            case 4:
              _context2.prev = 4;
              _context2.t1 = _context2['catch'](0);
  
              next(_context2.t1);
  
            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 4]]);
    })),
        _this = undefined;
    return function (_x, _x2, _x3) {
      return ref.apply(_this, arguments);
    };
  }());
  
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  server.listen(_config.port, function () {
    /* eslint-disable no-console */
    console.log('The server is running at http://localhost:' + _config.port + '/');
  });

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 7 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _assign = __webpack_require__(21);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _stringify = __webpack_require__(81);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _slicedToArray2 = __webpack_require__(82);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _getIterator2 = __webpack_require__(80);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  
  // Base64 encoding and decoding - The "Unicode Problem"
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  
  /**
   * Remove style/link elements for specified node IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] <= 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles, options) {
    var _Object$assign = (0, _assign2.default)({
      replace: false,
      prepend: false
    }, options);
  
    var replace = _Object$assign.replace;
    var prepend = _Object$assign.prepend;
  
  
    var ids = [];
    for (var i = 0; i < styles.length; i++) {
      var _styles$i = (0, _slicedToArray3.default)(styles[i], 4);
  
      var moduleId = _styles$i[0];
      var css = _styles$i[1];
      var media = _styles$i[2];
      var sourceMap = _styles$i[3];
  
      var id = moduleId + '-' + i;
  
      if (inserted[id]) {
        if (!replace) {
          inserted[id]++;
          continue;
        }
      }
  
      inserted[id] = 1;
      ids.push(id);
  
      var elem = document.getElementById(prefix + id);
      var create = false;
  
      if (!elem) {
        create = true;
  
        elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');
        elem.id = prefix + id;
  
        if (media) {
          elem.setAttribute('media', media);
        }
      }
  
      var cssText = css;
      if (sourceMap) {
        cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
        cssText += '\n/*# sourceURL=' + sourceMap.file + '*/';
      }
  
      if ('textContent' in elem) {
        elem.textContent = cssText;
      } else {
        elem.styleSheet.cssText = cssText;
      }
  
      if (create) {
        if (prepend) {
          document.head.insertBefore(elem, document.head.childNodes[0]);
        } else {
          document.head.appendChild(elem);
        }
      }
    }
  
    return removeCss.bind(null, ids);
  }
  
  module.exports = insertCss;

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ },
/* 10 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /* eslint-disable max-len */
  /* jscs:disable maximumLineLength */
  
  var port = exports.port = process.env.PORT || 3000;
  var host = exports.host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  
  var databaseUrl = exports.databaseUrl = process.env.DATABASE_URL || 'postgresql://demo:Lqk62xg6TBm5UhfR@demo.ctbl5itzitm4.us-east-1.rds.amazonaws.com:5432/membership01';
  
  var analytics = exports.analytics = {
  
    // https://analytics.google.com/
    google: { trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X' }
  
  };
  
  var auth = exports.auth = {
  
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },
  
    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },
  
    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },
  
    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  
  };

/***/ },
/* 11 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 12 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("graphql");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(87), __esModule: true };

/***/ },
/* 15 */
/***/ function(module, exports) {

  "use strict";
  
  exports.__esModule = true;
  
  exports.default = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(90), __esModule: true };

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(92), __esModule: true };

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  exports.__esModule = true;
  
  var _defineProperty = __webpack_require__(50);
  
  var _defineProperty2 = _interopRequireDefault(_defineProperty);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        (0, _defineProperty2.default)(target, descriptor.key, descriptor);
      }
    }
  
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

/***/ },
/* 21 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/assign");

/***/ },
/* 22 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 23 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _create = __webpack_require__(14);
  
  var _create2 = _interopRequireDefault(_create);
  
  var _classCallCheck2 = __webpack_require__(15);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  var Match = function Match(route, path, keys, match) {
    (0, _classCallCheck3.default)(this, Match);
  
    this.route = route;
    this.path = path;
    this.params = (0, _create2.default)(null);
    for (var i = 1; i < match.length; i++) {
      this.params[keys[i - 1].name] = decodeParam(match[i]);
    }
  };
  
  function decodeParam(val) {
    if (!(typeof val === 'string' || val instanceof String)) {
      return val;
    }
  
    try {
      return decodeURIComponent(val);
    } catch (e) {
      var err = new TypeError('Failed to decode param \'' + val + '\'');
      err.status = 400;
      throw err;
    }
  }
  
  exports.default = Match;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _classCallCheck2 = __webpack_require__(15);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(20);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _pathToRegexp = __webpack_require__(76);
  
  var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);
  
  var _Match = __webpack_require__(24);
  
  var _Match2 = _interopRequireDefault(_Match);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  var Route = function () {
    function Route(path, handlers) {
      (0, _classCallCheck3.default)(this, Route);
  
      this.path = path;
      this.handlers = handlers;
      this.regExp = (0, _pathToRegexp2.default)(path, this.keys = []);
    }
  
    (0, _createClass3.default)(Route, [{
      key: 'match',
      value: function match(path) {
        var m = this.regExp.exec(path);
        return m ? new _Match2.default(this, path, this.keys, m) : null;
      }
    }]);
    return Route;
  }();
  
  exports.default = Route;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _slicedToArray2 = __webpack_require__(53);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _regenerator = __webpack_require__(55);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _getIterator2 = __webpack_require__(16);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  var _asyncToGenerator2 = __webpack_require__(52);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _create = __webpack_require__(14);
  
  var _create2 = _interopRequireDefault(_create);
  
  var _classCallCheck2 = __webpack_require__(15);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(20);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _Route = __webpack_require__(25);
  
  var _Route2 = _interopRequireDefault(_Route);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var emptyFunction = function emptyFunction() {}; /**
                                                    * React Routing | http://www.kriasoft.com/react-routing
                                                    * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
                                                    */
  
  var Router = function () {
  
    /**
     * Creates a new instance of the `Router` class.
     */
  
    function Router(initialize) {
      (0, _classCallCheck3.default)(this, Router);
  
      this.routes = [];
      this.events = (0, _create2.default)(null);
  
      if (typeof initialize === 'function') {
        initialize(this.on.bind(this));
      }
    }
  
    /**
     * Adds a new route to the routing table or registers an event listener.
     *
     * @param {String} path A string in the Express format, an array of strings, or a regular expression.
     * @param {Function|Array} handlers Asynchronous route handler function(s).
     */
  
  
    (0, _createClass3.default)(Router, [{
      key: 'on',
      value: function on(path) {
        for (var _len = arguments.length, handlers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          handlers[_key - 1] = arguments[_key];
        }
  
        if (path === 'error') {
          this.events[path] = handlers[0];
        } else {
          this.routes.push(new _Route2.default(path, handlers));
        }
      }
    }, {
      key: 'dispatch',
      value: function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(state, cb) {
          var next = function () {
            var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
              var _handlers$next;
  
              var _value, _value2, _match, _handler;
  
              return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!((_handlers$next = handlers.next(), value = _handlers$next.value, done = _handlers$next.done, _handlers$next) && !done)) {
                        _context2.next = 16;
                        break;
                      }
  
                      _value = value;
                      _value2 = (0, _slicedToArray3.default)(_value, 2);
                      _match = _value2[0];
                      _handler = _value2[1];
  
                      state.params = _match.params;
  
                      if (!(_handler.length > 1)) {
                        _context2.next = 12;
                        break;
                      }
  
                      _context2.next = 9;
                      return _handler(state, next);
  
                    case 9:
                      _context2.t0 = _context2.sent;
                      _context2.next = 15;
                      break;
  
                    case 12:
                      _context2.next = 14;
                      return _handler(state);
  
                    case 14:
                      _context2.t0 = _context2.sent;
  
                    case 15:
                      return _context2.abrupt('return', _context2.t0);
  
                    case 16:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
            return function next() {
              return ref.apply(this, arguments);
            };
          }();
  
          var routes, handlers, value, result, done;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (typeof state === 'string' || state instanceof String) {
                    state = { path: state };
                  }
                  cb = cb || emptyFunction;
                  routes = this.routes;
                  handlers = _regenerator2.default.mark(function _callee() {
                    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, route, match, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, handler;
  
                    return _regenerator2.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 3;
                            _iterator = (0, _getIterator3.default)(routes);
  
                          case 5:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                              _context.next = 38;
                              break;
                            }
  
                            route = _step.value;
                            match = route.match(state.path);
  
                            if (!match) {
                              _context.next = 35;
                              break;
                            }
  
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context.prev = 12;
                            _iterator2 = (0, _getIterator3.default)(match.route.handlers);
  
                          case 14:
                            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                              _context.next = 21;
                              break;
                            }
  
                            handler = _step2.value;
                            _context.next = 18;
                            return [match, handler];
  
                          case 18:
                            _iteratorNormalCompletion2 = true;
                            _context.next = 14;
                            break;
  
                          case 21:
                            _context.next = 27;
                            break;
  
                          case 23:
                            _context.prev = 23;
                            _context.t0 = _context['catch'](12);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context.t0;
  
                          case 27:
                            _context.prev = 27;
                            _context.prev = 28;
  
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                              _iterator2.return();
                            }
  
                          case 30:
                            _context.prev = 30;
  
                            if (!_didIteratorError2) {
                              _context.next = 33;
                              break;
                            }
  
                            throw _iteratorError2;
  
                          case 33:
                            return _context.finish(30);
  
                          case 34:
                            return _context.finish(27);
  
                          case 35:
                            _iteratorNormalCompletion = true;
                            _context.next = 5;
                            break;
  
                          case 38:
                            _context.next = 44;
                            break;
  
                          case 40:
                            _context.prev = 40;
                            _context.t1 = _context['catch'](3);
                            _didIteratorError = true;
                            _iteratorError = _context.t1;
  
                          case 44:
                            _context.prev = 44;
                            _context.prev = 45;
  
                            if (!_iteratorNormalCompletion && _iterator.return) {
                              _iterator.return();
                            }
  
                          case 47:
                            _context.prev = 47;
  
                            if (!_didIteratorError) {
                              _context.next = 50;
                              break;
                            }
  
                            throw _iteratorError;
  
                          case 50:
                            return _context.finish(47);
  
                          case 51:
                            return _context.finish(44);
  
                          case 52:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, this, [[3, 40, 44, 52], [12, 23, 27, 35], [28,, 30, 34], [45,, 47, 51]]);
                  })();
                  value = undefined, result = undefined, done = false;
  
                case 5:
                  if (done) {
                    _context3.next = 15;
                    break;
                  }
  
                  _context3.next = 8;
                  return next();
  
                case 8:
                  result = _context3.sent;
  
                  if (!result) {
                    _context3.next = 13;
                    break;
                  }
  
                  state.statusCode = typeof state.statusCode === 'number' ? state.statusCode : 200;
                  cb(state, result);
                  return _context3.abrupt('return');
  
                case 13:
                  _context3.next = 5;
                  break;
  
                case 15:
                  if (!this.events.error) {
                    _context3.next = 31;
                    break;
                  }
  
                  _context3.prev = 16;
  
                  state.statusCode = 404;
                  _context3.next = 20;
                  return this.events.error(state, new Error('Cannot found a route matching \'' + state.path + '\'.'));
  
                case 20:
                  result = _context3.sent;
  
                  cb(state, result);
                  _context3.next = 31;
                  break;
  
                case 24:
                  _context3.prev = 24;
                  _context3.t0 = _context3['catch'](16);
  
                  state.statusCode = 500;
                  _context3.next = 29;
                  return this.events.error(state, _context3.t0);
  
                case 29:
                  result = _context3.sent;
  
                  cb(state, result);
  
                case 31:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[16, 24]]);
        }));
        return function dispatch(_x, _x2) {
          return ref.apply(this, arguments);
        };
      }()
    }]);
    return Router;
  }();
  
  exports.default = Router;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(2);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(6);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(5);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(67);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _NotesList = __webpack_require__(38);
  
  var _NotesList2 = _interopRequireDefault(_NotesList);
  
  var _emptyFunction = __webpack_require__(96);
  
  var _emptyFunction2 = _interopRequireDefault(_emptyFunction);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var App = function (_Component) {
    (0, _inherits3.default)(App, _Component);
  
    function App() {
      (0, _classCallCheck3.default)(this, App);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
    }
  
    (0, _createClass3.default)(App, [{
      key: 'componentWillMount',
  
      // onSetTitle: PropTypes.func.isRequired,
      // onSetMeta: PropTypes.func.isRequired,
      // onPageNotFound: PropTypes.func.isRequired,
      value: function componentWillMount() {
        var insertCss = this.props.context.insertCss;
  
        this.removeCss = insertCss(_App2.default);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeCss();
      }
    }, {
      key: 'getChildContext',
      value: function getChildContext() {
        var context = this.props.context;
        return {
          insertCss: context.insertCss || _emptyFunction2.default
          // onSetTitle: context.onSetTitle || emptyFunction,
          // onSetMeta: context.onSetMeta || emptyFunction,
          // onPageNotFound: context.onPageNotFound || emptyFunction
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var templates = [{ title: 'Hola!! Esto es una plantilla', buttonText: 'Guardar', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauricio Colmenero sagittis pellentesque lacus eleifend lacinia...', backgroundImage: 'http://getmdl.io/assets/demos/welcome_card.jpg' }, { title: 'Otra plantilla de nota', buttonText: 'Guardar', text: 'Comprar huevos', backgroundImage: 'http://getmdl.io/assets/demos/welcome_card.jpg' }];
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { id: 'notes-container', className: 'snippet-demo-container demo-card demo-card__wide' },
            _react2.default.createElement(_NotesList2.default, { notesList: templates })
          )
        );
      }
    }]);
    return App;
  }(_react.Component);
  
  App.childContextTypes = {
    insertCss: _react.PropTypes.func.isRequired };
  exports.default = App;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(2);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(6);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(5);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ConfirmButton = function (_Component) {
    (0, _inherits3.default)(ConfirmButton, _Component);
  
    function ConfirmButton(props) {
      (0, _classCallCheck3.default)(this, ConfirmButton);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ConfirmButton).call(this, props));
  
      _this.handleClick = _this.handleClick.bind(_this);
      return _this;
    }
  
    (0, _createClass3.default)(ConfirmButton, [{
      key: 'handleClick',
      value: function handleClick() {
        this.props.saveNote();
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'a',
          { className: 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect', onClick: this.handleClick },
          this.props.text
        );
      }
    }]);
    return ConfirmButton;
  }(_react.Component);
  
  exports.default = ConfirmButton;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(2);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(6);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(5);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(9);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ContactPage = __webpack_require__(68);
  
  var _ContactPage2 = _interopRequireDefault(_ContactPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Contact Us'; /**
                             * React Starter Kit (https://www.reactstarterkit.com/)
                             *
                             * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                             *
                             * This source code is licensed under the MIT license found in the
                             * LICENSE.txt file in the root directory of this source tree.
                             */
  
  var ContactPage = function (_Component) {
    (0, _inherits3.default)(ContactPage, _Component);
  
    function ContactPage() {
      (0, _classCallCheck3.default)(this, ContactPage);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ContactPage).apply(this, arguments));
    }
  
    (0, _createClass3.default)(ContactPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: _ContactPage2.default.root },
          _react2.default.createElement(
            'div',
            { className: _ContactPage2.default.container },
            _react2.default.createElement(
              'h1',
              null,
              title
            ),
            _react2.default.createElement(
              'p',
              null,
              '...'
            )
          )
        );
      }
    }]);
    return ContactPage;
  }(_react.Component);
  
  ContactPage.contextTypes = {
    onSetTitle: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(ContactPage, _ContactPage2.default);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(2);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(6);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(5);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(9);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ErrorPage = __webpack_require__(69);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Error'; /**
                        * React Starter Kit (https://www.reactstarterkit.com/)
                        *
                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                        *
                        * This source code is licensed under the MIT license found in the
                        * LICENSE.txt file in the root directory of this source tree.
                        */
  
  var ErrorPage = function (_Component) {
    (0, _inherits3.default)(ErrorPage, _Component);
  
    function ErrorPage() {
      (0, _classCallCheck3.default)(this, ErrorPage);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ErrorPage).apply(this, arguments));
    }
  
    (0, _createClass3.default)(ErrorPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            title
          ),
          _react2.default.createElement(
            'p',
            null,
            'Sorry, an critical error occurred on this page.'
          )
        );
      }
    }]);
    return ErrorPage;
  }(_react.Component);
  
  ErrorPage.contextTypes = {
    onSetTitle: _react.PropTypes.func.isRequired,
    onPageNotFound: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(ErrorPage, _ErrorPage2.default);

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(2);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(6);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(5);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _config = __webpack_require__(10);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // https://analytics.google.com/
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var trackingCode = 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' + ('ga(\'create\',\'' + _config.analytics.google.trackingId + '\',\'auto\');ga(\'send\',\'pageview\')');
  
  var Html = function (_Component) {
    (0, _inherits3.default)(Html, _Component);
  
    function Html() {
      (0, _classCallCheck3.default)(this, Html);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Html).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Html, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'html',
          { className: 'no-js', lang: '' },
          _react2.default.createElement(
            'head',
            null,
            _react2.default.createElement('meta', { charSet: 'utf-8' }),
            _react2.default.createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' }),
            _react2.default.createElement(
              'title',
              null,
              this.props.title
            ),
            _react2.default.createElement('meta', { name: 'description', content: this.props.description }),
            _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
            _react2.default.createElement('link', { rel: 'apple-touch-icon', href: 'apple-touch-icon.png' }),
            _react2.default.createElement('style', { id: 'css', dangerouslySetInnerHTML: { __html: this.props.css } })
          ),
          _react2.default.createElement(
            'body',
            null,
            _react2.default.createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: this.props.body } }),
            _react2.default.createElement('script', { src: this.props.entry }),
            _react2.default.createElement('script', { dangerouslySetInnerHTML: { __html: trackingCode } }),
            _react2.default.createElement('script', { src: 'https://www.google-analytics.com/analytics.js', async: true, defer: true })
          )
        );
      }
    }]);
    return Html;
  }(_react.Component);
  
  Html.propTypes = {
    title: _react.PropTypes.string,
    description: _react.PropTypes.string,
    css: _react.PropTypes.string,
    body: _react.PropTypes.string.isRequired,
    entry: _react.PropTypes.string.isRequired
  };
  Html.defaultProps = {
    title: '',
    description: ''
  };
  exports.default = Html;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(2);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(6);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(5);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(9);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _LoginPage = __webpack_require__(70);
  
  var _LoginPage2 = _interopRequireDefault(_LoginPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Log In'; /**
                         * React Starter Kit (https://www.reactstarterkit.com/)
                         *
                         * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                         *
                         * This source code is licensed under the MIT license found in the
                         * LICENSE.txt file in the root directory of this source tree.
                         */
  
  var LoginPage = function (_Component) {
    (0, _inherits3.default)(LoginPage, _Component);
  
    function LoginPage() {
      (0, _classCallCheck3.default)(this, LoginPage);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(LoginPage).apply(this, arguments));
    }
  
    (0, _createClass3.default)(LoginPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: _LoginPage2.default.root },
          _react2.default.createElement(
            'div',
            { className: _LoginPage2.default.container },
            _react2.default.createElement(
              'h1',
              null,
              title
            ),
            _react2.default.createElement(
              'p',
              null,
              '...'
            )
          )
        );
      }
    }]);
    return LoginPage;
  }(_react.Component);
  
  LoginPage.contextTypes = {
    onSetTitle: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(LoginPage, _LoginPage2.default);

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(2);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(6);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(5);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(9);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _NotFoundPage = __webpack_require__(71);
  
  var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Page Not Found'; /**
                                 * React Starter Kit (https://www.reactstarterkit.com/)
                                 *
                                 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                 *
                                 * This source code is licensed under the MIT license found in the
                                 * LICENSE.txt file in the root directory of this source tree.
                                 */
  
  var NotFoundPage = function (_Component) {
    (0, _inherits3.default)(NotFoundPage, _Component);
  
    function NotFoundPage() {
      (0, _classCallCheck3.default)(this, NotFoundPage);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NotFoundPage).apply(this, arguments));
    }
  
    (0, _createClass3.default)(NotFoundPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
        this.context.onPageNotFound();
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            title
          ),
          _react2.default.createElement(
            'p',
            null,
            'Sorry, but the page you were trying to view does not exist.'
          )
        );
      }
    }]);
    return NotFoundPage;
  }(_react.Component);
  
  NotFoundPage.contextTypes = {
    onSetTitle: _react.PropTypes.func.isRequired,
    onPageNotFound: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(NotFoundPage, _NotFoundPage2.default);

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(2);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(6);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(5);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _NoteTitle = __webpack_require__(37);
  
  var _NoteTitle2 = _interopRequireDefault(_NoteTitle);
  
  var _NoteBody = __webpack_require__(35);
  
  var _NoteBody2 = _interopRequireDefault(_NoteBody);
  
  var _NoteFooter = __webpack_require__(36);
  
  var _NoteFooter2 = _interopRequireDefault(_NoteFooter);
  
  var _withStyles = __webpack_require__(9);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Note = __webpack_require__(72);
  
  var _Note2 = _interopRequireDefault(_Note);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Note = function (_Component) {
    (0, _inherits3.default)(Note, _Component);
  
    function Note(props) {
      (0, _classCallCheck3.default)(this, Note);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Note).call(this, props));
  
      _this.state = {
        title: props.title,
        text: props.text,
        backgroundImage: props.backgroundImage,
        buttonText: 'Guardar'
      };
  
      _this.updateTitle = _this.updateTitle.bind(_this);
      _this.updateBody = _this.updateBody.bind(_this);
      _this.updateBackgroundImage = _this.updateBackgroundImage.bind(_this);
      _this.addNote = _this.addNote.bind(_this);
      return _this;
    }
  
    (0, _createClass3.default)(Note, [{
      key: 'updateTitle',
      value: function updateTitle(value) {
        this.state.title = value;
      }
    }, {
      key: 'updateBody',
      value: function updateBody(value) {
        this.state.text = value;
      }
    }, {
      key: 'updateBackgroundImage',
      value: function updateBackgroundImage(value) {
        this.state.backgroundImage = value;
      }
    }, {
      key: 'addNote',
      value: function addNote() {
        var element = {
          title: this.state.title,
          text: this.state.text,
          backgroundImage: this.state.backgroundImage,
          buttonText: this.state.buttonText
        };
  
        this.props.addNoteToList(element);
      }
      // <div className='demo-card-wide mdl-card mdl-shadow--2dp'>
  
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: _Note2.default.card },
          _react2.default.createElement(_NoteTitle2.default, { title: this.state.title, backgroundImage: this.state.backgroundImage, onChange: this.updateTitle }),
          _react2.default.createElement(_NoteBody2.default, { text: this.state.text, onChange: this.updateBody, onChange: this.updateBody }),
          _react2.default.createElement(_NoteFooter2.default, { buttonText: this.props.buttonText, handleClick: this.addNote })
        );
      }
    }]);
    return Note;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(Note, _Note2.default);

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(2);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(6);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(5);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(9);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _NoteBody = __webpack_require__(73);
  
  var _NoteBody2 = _interopRequireDefault(_NoteBody);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var NoteBody = function (_Component) {
    (0, _inherits3.default)(NoteBody, _Component);
  
    function NoteBody(props) {
      (0, _classCallCheck3.default)(this, NoteBody);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NoteBody).call(this, props));
  
      _this.state = {
        text: props.text
      };
      _this.handleChange = _this.handleChange.bind(_this);
      return _this;
    }
  
    (0, _createClass3.default)(NoteBody, [{
      key: 'handleChange',
      value: function handleChange(event) {
        var text = event.target.value;
        this.props.onChange(text);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'form',
          { className: _NoteBody2.default.background, action: '#' },
          _react2.default.createElement(
            'div',
            { className: _NoteBody2.default.body },
            _react2.default.createElement('textarea', {
              className: _NoteBody2.default.input,
              type: 'text',
              rows: '3',
              id: 'sample5',
              defaultValue: this.state.text,
              onChange: this.handleChange }),
            _react2.default.createElement('label', { className: 'mdl-textfield__label', htmlFor: 'sample5' })
          )
        );
      }
    }]);
    return NoteBody;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(NoteBody, _NoteBody2.default);

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(2);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(6);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(5);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ConfirmButton = __webpack_require__(28);
  
  var _ConfirmButton2 = _interopRequireDefault(_ConfirmButton);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var NoteFooter = function (_Component) {
    (0, _inherits3.default)(NoteFooter, _Component);
  
    function NoteFooter() {
      (0, _classCallCheck3.default)(this, NoteFooter);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NoteFooter).apply(this, arguments));
    }
  
    (0, _createClass3.default)(NoteFooter, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: 'mdl-card__actions mdl-card--border' },
          _react2.default.createElement(_ConfirmButton2.default, { text: this.props.buttonText, saveNote: this.props.handleClick })
        );
      }
    }]);
    return NoteFooter;
  }(_react.Component);
  
  exports.default = NoteFooter;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(2);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(6);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(5);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(9);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _NoteTitle = __webpack_require__(74);
  
  var _NoteTitle2 = _interopRequireDefault(_NoteTitle);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var NoteTitle = function (_Component) {
    (0, _inherits3.default)(NoteTitle, _Component);
  
    function NoteTitle(props) {
      (0, _classCallCheck3.default)(this, NoteTitle);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NoteTitle).call(this, props));
  
      _this.state = {
        title: props.title
      };
      _this.handleChange = _this.handleChange.bind(_this);
      return _this;
    }
  
    (0, _createClass3.default)(NoteTitle, [{
      key: 'handleChange',
      value: function handleChange(event) {
        var text = event.target.value;
        this.props.onChange(text);
      }
    }, {
      key: 'render',
      value: function render() {
        var styles = {
          background: 'url(' + this.props.backgroundImage + ') center / cover',
          position: 'relative'
        };
        // <div className='mdl-textfield mdl-js-textfield mdl-text-editable'>
        return _react2.default.createElement(
          'form',
          { action: '#', className: _NoteTitle2.default.background, style: styles },
          _react2.default.createElement(
            'div',
            { className: _NoteTitle2.default.title },
            _react2.default.createElement('input', {
              className: _NoteTitle2.default.input,
              type: 'text',
              id: 'sample1',
              placeholder: 'Escribe el título de la nota...',
              maxLength: '10',
              defaultValue: this.state.title,
              onChange: this.handleChange })
          )
        );
      }
    }]);
    return NoteTitle;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(NoteTitle, _NoteTitle2.default);

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(2);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(6);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(5);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Note = __webpack_require__(34);
  
  var _Note2 = _interopRequireDefault(_Note);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // import s from './NotesList.scss'
  
  var NotesList = function (_Component) {
    (0, _inherits3.default)(NotesList, _Component);
  
    function NotesList(props) {
      (0, _classCallCheck3.default)(this, NotesList);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NotesList).call(this, props));
  
      _this.state = {
        notesList: props.notesList
      };
  
      _this.addNoteToList = _this.addNoteToList.bind(_this);
      return _this;
    }
  
    (0, _createClass3.default)(NotesList, [{
      key: 'addNoteToList',
      value: function addNoteToList(element) {
        this.state.notesList.push(element);
        this.setState(this.state);
        console.log(this.state.notes);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;
  
        return _react2.default.createElement(
          'ul',
          { className: 'notes-list' },
          this.state.notesList.map(function (note) {
            return _react2.default.createElement(_Note2.default, {
              title: note.title,
              buttonText: note.buttonText,
              text: note.text,
              backgroundImage: note.backgroundImage,
              addNoteToList: _this2.addNoteToList });
          }, this)
        );
      }
    }]);
    return NotesList;
  }(_react.Component);
  
  exports.default = NotesList;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(2);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(6);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(5);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(9);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _RegisterPage = __webpack_require__(75);
  
  var _RegisterPage2 = _interopRequireDefault(_RegisterPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New User Registration'; /**
                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                        *
                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                        *
                                        * This source code is licensed under the MIT license found in the
                                        * LICENSE.txt file in the root directory of this source tree.
                                        */
  
  var RegisterPage = function (_Component) {
    (0, _inherits3.default)(RegisterPage, _Component);
  
    function RegisterPage() {
      (0, _classCallCheck3.default)(this, RegisterPage);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(RegisterPage).apply(this, arguments));
    }
  
    (0, _createClass3.default)(RegisterPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: _RegisterPage2.default.root },
          _react2.default.createElement(
            'div',
            { className: _RegisterPage2.default.container },
            _react2.default.createElement(
              'h1',
              null,
              title
            ),
            _react2.default.createElement(
              'p',
              null,
              '...'
            )
          )
        );
      }
    }]);
    return RegisterPage;
  }(_react.Component);
  
  RegisterPage.contextTypes = {
    onSetTitle: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(RegisterPage, _RegisterPage2.default);

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _pg = __webpack_require__(104);
  
  var _pg2 = _interopRequireDefault(_pg);
  
  var _bluebird = __webpack_require__(22);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _config = __webpack_require__(10);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // TODO: Customize database connection settings
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
  _pg2.default.defaults.ssl = true; /**
                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                     *
                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                     *
                                     * This source code is licensed under the MIT license found in the
                                     * LICENSE.txt file in the root directory of this source tree.
                                     */
  
  _pg2.default.defaults.poolSize = 2;
  _pg2.default.defaults.application_name = 'RSK';
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
  
  /**
   * Promise-based wrapper for pg.Client
   * https://github.com/brianc/node-postgres/wiki/Client
   */
  function AsyncClient(client) {
    this.client = client;
    this.query = this.query.bind(this);
    this.end = this.end.bind(this);
  }
  
  AsyncClient.prototype.query = function query(sql) {
    var _this = this;
  
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
  
    return new _bluebird2.default(function (resolve, reject) {
      if (args.length) {
        _this.client.query(sql, args, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      } else {
        _this.client.query(sql, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      }
    });
  };
  
  AsyncClient.prototype.end = function end() {
    this.client.end();
  };
  
  /**
   * Promise-based wrapper for pg.connect()
   * https://github.com/brianc/node-postgres/wiki/pg
   */
  _pg2.default.connect = function (connect) {
    return function (callback) {
      return new _bluebird2.default(function (resolve, reject) {
        connect.call(_pg2.default, _config.databaseUrl, function (err, client, done) {
          if (err) {
            if (client) {
              done(client);
            }
  
            reject(err);
          } else {
            callback(new AsyncClient(client)).then(function () {
              done();
              resolve();
            }).catch(function (error) {
              done(client);
              reject(error);
            });
          }
        });
      });
    };
  }(_pg2.default.connect);
  
  exports.default = _pg2.default;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Response = exports.Headers = exports.Request = exports.default = undefined;
  
  var _nodeFetch = __webpack_require__(101);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(10);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2.default)(localUrl(url), options);
  }
  
  exports.default = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(12);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(11);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _passport = __webpack_require__(102);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _passportFacebook = __webpack_require__(103);
  
  var _db = __webpack_require__(40);
  
  var _db2 = _interopRequireDefault(_db);
  
  var _config = __webpack_require__(10);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Sign in with Facebook.
   */
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /**
   * Passport.js reference implementation.
   * The database schema used in this sample is available at
   * https://github.com/membership/membership.db/tree/master/postgres
   */
  
  _passport2.default.use(new _passportFacebook.Strategy({
    clientID: _config.auth.facebook.id,
    clientSecret: _config.auth.facebook.secret,
    callbackURL: '/login/facebook/return',
    profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {
    var loginName = 'facebook';
    _db2.default.connect(function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
        var query = _ref.query;
        var result, userId;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!req.user) {
                  _context.next = 24;
                  break;
                }
  
                _context.next = 3;
                return query('SELECT 1 FROM user_login WHERE name = $1 AND key = $2', loginName, profile.id);
  
              case 3:
                result = _context.sent;
  
                if (!result.rowCount) {
                  _context.next = 8;
                  break;
                }
  
                // There is already a Facebook account that belongs to you.
                // Sign in with that account or delete it, then link it with your current account.
                done();
                _context.next = 22;
                break;
  
              case 8:
                _context.next = 10;
                return query('\n          INSERT INTO user_account (id, email) SELECT $1, $2::character\n            WHERE NOT EXISTS (SELECT 1 FROM user_account WHERE id = $1);', req.user.id, profile._json.email);
  
              case 10:
                _context.next = 12;
                return query('\n          INSERT INTO user_login (user_id, name, key) VALUES ($1, \'facebook\', $2);', req.user.id, profile.id);
  
              case 12:
                _context.next = 14;
                return query('\n          INSERT INTO user_claim (user_id, type, value) VALUES\n            ($1, \'urn:facebook:access_token\', $3);', req.user.id, profile.id);
  
              case 14:
                _context.next = 16;
                return query('\n          INSERT INTO user_profile (user_id) SELECT $1\n            WHERE NOT EXISTS (SELECT 1 FROM user_profile WHERE user_id = $1);', req.user.id);
  
              case 16:
                _context.next = 18;
                return query('\n          UPDATE user_profile SET\n            display_name = COALESCE(NULLIF(display_name, \'\'), $2),\n            gender       = COALESCE(NULLIF(gender, \'\'), $3),\n            picture      = COALESCE(NULLIF(picture, \'\'), $4),\n          WHERE user_id = $1;', req.user.id, profile.displayName, profile._json.gender, 'https://graph.facebook.com/' + profile.id + '/picture?type=large');
  
              case 18:
                _context.next = 20;
                return query('\n          SELECT id, email FROM user_account WHERE id = $1;', req.user.id);
  
              case 20:
                result = _context.sent;
  
                done(null, result.rows[0]);
  
              case 22:
                _context.next = 52;
                break;
  
              case 24:
                _context.next = 26;
                return query('\n        SELECT u.id, u.email FROM user_account AS u\n          LEFT JOIN user_login AS l ON l.user_id = u.id\n        WHERE l.name = $1 AND l.key = $2', loginName, profile.id);
  
              case 26:
                result = _context.sent;
  
                if (!result.rowCount) {
                  _context.next = 31;
                  break;
                }
  
                done(null, result.rows[0]);
                _context.next = 52;
                break;
  
              case 31:
                _context.next = 33;
                return query('SELECT 1 FROM user_account WHERE email = $1', profile._json.email);
  
              case 33:
                result = _context.sent;
  
                if (!result.rowCount) {
                  _context.next = 38;
                  break;
                }
  
                // There is already an account using this email address. Sign in to
                // that account and link it with Facebook manually from Account Settings.
                done(null);
                _context.next = 52;
                break;
  
              case 38:
                _context.next = 40;
                return query('\n            INSERT INTO user_account (email) VALUES ($1) RETURNING (id)', profile._json.email);
  
              case 40:
                result = _context.sent;
                userId = result.rows[0].id;
                _context.next = 44;
                return query('\n            INSERT INTO user_login (user_id, name, key) VALUES ($1, \'facebook\', $2)', userId, profile.id);
  
              case 44:
                _context.next = 46;
                return query('\n            INSERT INTO user_claim (user_id, type, value) VALUES\n              ($1, \'urn:facebook:access_token\', $2);', userId, accessToken);
  
              case 46:
                _context.next = 48;
                return query('\n            INSERT INTO user_profile (user_id, display_name, gender, picture)\n            VALUES ($1, $2, $3, $4);', userId, profile.displayName, profile._json.gender, 'https://graph.facebook.com/' + profile.id + '/picture?type=large');
  
              case 48:
                _context.next = 50;
                return query('SELECT id, email FROM user_account WHERE id = $1;', userId);
  
              case 50:
                result = _context.sent;
  
                done(null, result.rows[0]);
  
              case 52:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      })),
          _this = undefined;
      return function (_x) {
        return ref.apply(_this, arguments);
      };
    }()).catch(done);
  }));
  
  exports.default = _passport2.default;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(12);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(11);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _assign = __webpack_require__(21);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _fs = __webpack_require__(98);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  var _path = __webpack_require__(23);
  
  var _bluebird = __webpack_require__(22);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _jade = __webpack_require__(99);
  
  var _jade2 = _interopRequireDefault(_jade);
  
  var _frontMatter = __webpack_require__(97);
  
  var _frontMatter2 = _interopRequireDefault(_frontMatter);
  
  var _graphql = __webpack_require__(13);
  
  var _ContentType = __webpack_require__(46);
  
  var _ContentType2 = _interopRequireDefault(_ContentType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // A folder with Jade/Markdown/HTML content pages
  var CONTENT_DIR = (0, _path.join)(__dirname, './content');
  
  // Extract 'front matter' metadata and generate HTML
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var parseJade = function parseJade(path, jadeContent) {
    var fmContent = (0, _frontMatter2.default)(jadeContent);
    var htmlContent = _jade2.default.render(fmContent.body);
    return (0, _assign2.default)({ path: path, content: htmlContent }, fmContent.attributes);
  };
  
  var readFile = _bluebird2.default.promisify(_fs2.default.readFile);
  var fileExists = function fileExists(filename) {
    return new _bluebird2.default(function (resolve) {
      _fs2.default.exists(filename, resolve);
    });
  };
  
  exports.default = {
    type: _ContentType2.default,
    args: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref, _ref2) {
      var _this = this;
  
      var request = _ref.request;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var fileName, source;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fileName = (0, _path.join)(CONTENT_DIR, (path === '/' ? '/index' : path) + '.jade');
                _context.next = 3;
                return fileExists(fileName);
  
              case 3:
                if (_context.sent) {
                  _context.next = 5;
                  break;
                }
  
                fileName = (0, _path.join)(CONTENT_DIR, path + '/index.jade');
  
              case 5:
                _context.next = 7;
                return fileExists(fileName);
  
              case 7:
                if (_context.sent) {
                  _context.next = 9;
                  break;
                }
  
                return _context.abrupt('return', null);
  
              case 9:
                _context.next = 11;
                return readFile(fileName, { encoding: 'utf8' });
  
              case 11:
                source = _context.sent;
                return _context.abrupt('return', parseJade(path, source));
  
              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _UserType = __webpack_require__(47);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    type: _UserType2.default,
    resolve: function resolve(_ref) {
      var request = _ref.request;
  
      return request.user && {
        id: request.user.id,
        email: request.user.email
      };
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(13);
  
  var schema = new _graphql.GraphQLSchema({
    query: new _graphql.GraphQLObjectType({
      name: 'Query',
      fields: {
        me: __webpack_require__(44).default,
        content: __webpack_require__(43).default
      }
    })
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = schema;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(13);
  
  var ContentType = new _graphql.GraphQLObjectType({
    name: 'Content',
    fields: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      content: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      component: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = ContentType;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(13);
  
  var UserType = new _graphql.GraphQLObjectType({
    name: 'User',
    fields: {
      id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
      email: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = UserType;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(12);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(11);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Router = __webpack_require__(26);
  
  var _Router2 = _interopRequireDefault(_Router);
  
  var _fetch = __webpack_require__(41);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _App = __webpack_require__(27);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _ContactPage = __webpack_require__(29);
  
  var _ContactPage2 = _interopRequireDefault(_ContactPage);
  
  var _LoginPage = __webpack_require__(32);
  
  var _LoginPage2 = _interopRequireDefault(_LoginPage);
  
  var _RegisterPage = __webpack_require__(39);
  
  var _RegisterPage2 = _interopRequireDefault(_RegisterPage);
  
  var _NotFoundPage = __webpack_require__(33);
  
  var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);
  
  var _ErrorPage = __webpack_require__(30);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var router = new _Router2.default(function (on) {
    on('*', function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state, next) {
        var component;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return next();
  
              case 2:
                component = _context.sent;
                return _context.abrupt('return', component && _react2.default.createElement(
                  _App2.default,
                  { context: state.context },
                  component
                ));
  
              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      })),
          _this = undefined;
      return function (_x, _x2) {
        return ref.apply(_this, arguments);
      };
    }());
  
    on('/contact', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', _react2.default.createElement(_ContactPage2.default, null));
  
            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    })));
  
    on('/login', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt('return', _react2.default.createElement(_LoginPage2.default, null));
  
            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    })));
  
    on('/register', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt('return', _react2.default.createElement(_RegisterPage2.default, null));
  
            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    })));
  
    // on('*', async (state) => {
    //   const query = `/graphql?query={content(path:"${state.path}"){path,title,content,component}}`;
    //   const response = await fetch(query);
    //   const { data } = await response.json();
    //   return data && data.content && <ContentPage {...data.content} />;
    // });
  
    on('error', function (state, error) {
      return state.statusCode === 404 ? _react2.default.createElement(
        _App2.default,
        { context: state.context, error: error },
        _react2.default.createElement(_NotFoundPage2.default, null)
      ) : _react2.default.createElement(
        _App2.default,
        { context: state.context, error: error },
        _react2.default.createElement(_ErrorPage2.default, null)
      );
    });
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = router;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  exports.__esModule = true;
  
  var _promise = __webpack_require__(17);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new _promise2.default(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }
  
          if (info.done) {
            resolve(value);
          } else {
            _promise2.default.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }
  
        step("next");
      });
    };
  };

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  exports.__esModule = true;
  
  var _isIterable2 = __webpack_require__(49);
  
  var _isIterable3 = _interopRequireDefault(_isIterable2);
  
  var _getIterator2 = __webpack_require__(16);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;
  
      try {
        for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
  
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
  
      return _arr;
    }
  
    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if ((0, _isIterable3.default)(Object(arr))) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _typeof = typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _Symbol === "function" && obj.constructor === _Symbol ? "symbol" : typeof obj; };
  
  exports.__esModule = true;
  
  var _iterator = __webpack_require__(19);
  
  var _iterator2 = _interopRequireDefault(_iterator);
  
  var _symbol = __webpack_require__(18);
  
  var _symbol2 = _interopRequireDefault(_symbol);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof(obj);
  } : function (obj) {
    return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
  };

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  // This method of obtaining a reference to the global object needs to be
  // kept identical to the way it is obtained in runtime.js
  var g =
    typeof global === "object" ? global :
    typeof window === "object" ? window :
    typeof self === "object" ? self : this;
  
  // Use `getOwnPropertyNames` because not all browsers support calling
  // `hasOwnProperty` on the global `self` object in a worker. See #183.
  var hadRuntime = g.regeneratorRuntime &&
    Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
  
  // Save the old regeneratorRuntime in case it needs to be restored later.
  var oldRuntime = hadRuntime && g.regeneratorRuntime;
  
  // Force reevalutation of runtime.js.
  g.regeneratorRuntime = undefined;
  
  module.exports = __webpack_require__(56);
  
  if (hadRuntime) {
    // Restore the original runtime.
    g.regeneratorRuntime = oldRuntime;
  } else {
    // Remove the global property added by runtime.js.
    try {
      delete g.regeneratorRuntime;
    } catch(e) {
      g.regeneratorRuntime = undefined;
    }
  }
  
  module.exports = { "default": module.exports, __esModule: true };


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function(module) {"use strict";
  
  var _promise = __webpack_require__(17);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _setPrototypeOf = __webpack_require__(51);
  
  var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
  
  var _create = __webpack_require__(14);
  
  var _create2 = _interopRequireDefault(_create);
  
  var _typeof2 = __webpack_require__(54);
  
  var _typeof3 = _interopRequireDefault(_typeof2);
  
  var _iterator = __webpack_require__(19);
  
  var _iterator2 = _interopRequireDefault(_iterator);
  
  var _symbol = __webpack_require__(18);
  
  var _symbol2 = _interopRequireDefault(_symbol);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Copyright (c) 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
   * additional grant of patent rights can be found in the PATENTS file in
   * the same directory.
   */
  
  !function (global) {
    "use strict";
  
    var hasOwn = Object.prototype.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var iteratorSymbol = typeof _symbol2.default === "function" && _iterator2.default || "@@iterator";
  
    var inModule = ( false ? "undefined" : (0, _typeof3.default)(module)) === "object";
    var runtime = global.regeneratorRuntime;
    if (runtime) {
      if (inModule) {
        // If regeneratorRuntime is defined globally and we're in a module,
        // make the exports object identical to regeneratorRuntime.
        module.exports = runtime;
      }
      // Don't bother evaluating the rest of this file if the runtime was
      // already defined globally.
      return;
    }
  
    // Define the runtime globally (as expected by generated code) as either
    // module.exports (if we're in a module) or a new, empty object.
    runtime = global.regeneratorRuntime = inModule ? module.exports : {};
  
    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided, then outerFn.prototype instanceof Generator.
      var generator = (0, _create2.default)((outerFn || Generator).prototype);
      var context = new Context(tryLocsList || []);
  
      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);
  
      return generator;
    }
    runtime.wrap = wrap;
  
    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }
  
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
  
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};
  
    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
  
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = "GeneratorFunction";
  
    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }
  
    runtime.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction ||
      // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
  
    runtime.mark = function (genFun) {
      if (_setPrototypeOf2.default) {
        (0, _setPrototypeOf2.default)(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
      }
      genFun.prototype = (0, _create2.default)(Gp);
      return genFun;
    };
  
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `value instanceof AwaitArgument` to determine if the yielded value is
    // meant to be awaited. Some may consider the name of this method too
    // cutesy, but they are curmudgeons.
    runtime.awrap = function (arg) {
      return new AwaitArgument(arg);
    };
  
    function AwaitArgument(arg) {
      this.arg = arg;
    }
  
    function AsyncIterator(generator) {
      // This invoke function is written in a style that assumes some
      // calling function (or Promise) will handle exceptions.
      function invoke(method, arg) {
        var result = generator[method](arg);
        var value = result.value;
        return value instanceof AwaitArgument ? _promise2.default.resolve(value.arg).then(invokeNext, invokeThrow) : _promise2.default.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          return result;
        });
      }
  
      if ((typeof process === "undefined" ? "undefined" : (0, _typeof3.default)(process)) === "object" && process.domain) {
        invoke = process.domain.bind(invoke);
      }
  
      var invokeNext = invoke.bind(generator, "next");
      var invokeThrow = invoke.bind(generator, "throw");
      var invokeReturn = invoke.bind(generator, "return");
      var previousPromise;
  
      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return invoke(method, arg);
        }
  
        return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
        // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : new _promise2.default(function (resolve) {
          resolve(callInvokeWithMethodAndArg());
        });
      }
  
      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }
  
    defineIteratorMethods(AsyncIterator.prototype);
  
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    runtime.async = function (innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
  
      return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };
  
    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
  
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
  
        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }
  
          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }
  
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
              // A return or throw (when the delegate iterator has no throw
              // method) always terminates the yield* loop.
              context.delegate = null;
  
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              var returnMethod = delegate.iterator["return"];
              if (returnMethod) {
                var record = tryCatch(returnMethod, delegate.iterator, arg);
                if (record.type === "throw") {
                  // If the return method threw an exception, let that
                  // exception prevail over the original return or throw.
                  method = "throw";
                  arg = record.arg;
                  continue;
                }
              }
  
              if (method === "return") {
                // Continue with the outer return, now that the delegate
                // iterator has been terminated.
                continue;
              }
            }
  
            var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);
  
            if (record.type === "throw") {
              context.delegate = null;
  
              // Like returning generator.throw(uncaught), but without the
              // overhead of an extra function call.
              method = "throw";
              arg = record.arg;
              continue;
            }
  
            // Delegate generator ran and handled its own exceptions so
            // regardless of what the method was, we continue as if it is
            // "next" with an undefined arg.
            method = "next";
            arg = undefined;
  
            var info = record.arg;
            if (info.done) {
              context[delegate.resultName] = info.value;
              context.next = delegate.nextLoc;
            } else {
              state = GenStateSuspendedYield;
              return info;
            }
  
            context.delegate = null;
          }
  
          if (method === "next") {
            context._sent = arg;
  
            if (state === GenStateSuspendedYield) {
              context.sent = arg;
            } else {
              context.sent = undefined;
            }
          } else if (method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw arg;
            }
  
            if (context.dispatchException(arg)) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              method = "next";
              arg = undefined;
            }
          } else if (method === "return") {
            context.abrupt("return", arg);
          }
  
          state = GenStateExecuting;
  
          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;
  
            var info = {
              value: record.arg,
              done: context.done
            };
  
            if (record.arg === ContinueSentinel) {
              if (context.delegate && method === "next") {
                // Deliberately forget the last sent value so that we don't
                // accidentally pass it on to the delegate.
                arg = undefined;
              }
            } else {
              return info;
            }
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(arg) call above.
            method = "throw";
            arg = record.arg;
          }
        }
      };
    }
  
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
  
    Gp[iteratorSymbol] = function () {
      return this;
    };
  
    Gp.toString = function () {
      return "[object Generator]";
    };
  
    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };
  
      if (1 in locs) {
        entry.catchLoc = locs[1];
      }
  
      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }
  
      this.tryEntries.push(entry);
    }
  
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }
  
    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }
  
    runtime.keys = function (object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();
  
      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }
  
        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };
  
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
  
        if (typeof iterable.next === "function") {
          return iterable;
        }
  
        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }
  
            next.value = undefined;
            next.done = true;
  
            return next;
          };
  
          return next.next = next;
        }
      }
  
      // Return an iterator with no values.
      return { next: doneResult };
    }
    runtime.values = values;
  
    function doneResult() {
      return { value: undefined, done: true };
    }
  
    Context.prototype = {
      constructor: Context,
  
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = undefined;
        this.done = false;
        this.delegate = null;
  
        this.tryEntries.forEach(resetTryEntry);
  
        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },
  
      stop: function stop() {
        this.done = true;
  
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }
  
        return this.rval;
      },
  
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }
  
        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;
          return !!caught;
        }
  
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;
  
          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }
  
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");
  
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
  
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
  
        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }
  
        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;
  
        if (finallyEntry) {
          this.next = finallyEntry.finallyLoc;
        } else {
          this.complete(record);
        }
  
        return ContinueSentinel;
      },
  
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }
  
        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = record.arg;
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
      },
  
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
  
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
  
        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },
  
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };
  
        return ContinueSentinel;
      }
    };
  }(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  (typeof global === "undefined" ? "undefined" : (0, _typeof3.default)(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : (0, _typeof3.default)(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : (0, _typeof3.default)(self)) === "object" ? self : undefined);
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(77)(module)))

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(7)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS and IE text size adjust after device orientation change,\n *    without disabling user zoom.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\n\narticle, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio, canvas, progress, video {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.\n */\n\n[hidden], template {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * Improve readability of focused elements when they are also in an\n * active/hover state.\n */\n\na:active, a:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\n\nb, strong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub, sup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\n\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode, kbd, pre, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\n\nbutton, input, optgroup, select, textarea {\n  color: inherit; /* 1 */\n  font: inherit; /* 2 */\n  margin: 0; /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton, select {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton, html input[type=\"button\"], input[type=\"reset\"], input[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n  cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled], html input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner, input::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"], input[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button, input[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome.\n */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box; /* 2 */\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button, input[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n  border: 0; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd, th {\n  padding: 0;\n}\n\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */\n\n/*\r\n * Colors\r\n * ========================================================================== */\n\n/* #222 */\n\n/* #404040 */\n\n/* #555 */\n\n/* #777 */\n\n/* #eee */\n\n/*\r\n * Typography\r\n * ========================================================================== */\n\n/*\r\n * Layout\r\n * ========================================================================== */\n\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\n\n/* Extra small screen / phone */\n\n/* Small screen / tablet */\n\n/* Medium screen / desktop */\n\n/* Large screen / wide desktop */\n\n/*\r\n * Animations\r\n * ========================================================================== */\n\n/*\r\n * Cards\r\n * ========================================================================== */\n\n/*\n * Base styles\n * ========================================================================== */\n\nhtml {\n  color: #222;\n  font-weight: 100;\n  font-size: 1em; /* ~16px; */\n  font-family: 'Segoe UI','HelveticaNeue-Light',sans-serif;\n  line-height: 1.375; /* ~22px */\n}\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio, canvas, iframe, img, svg, video {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n.browserupgrade {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *, *:before, *:after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a, a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^=\"#\"]:after, a[href^=\"javascript:\"]:after {\n    content: \"\";\n  }\n\n  pre, blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr, img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p, h2, h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2, h3 {\n    page-break-after: avoid;\n  }\n}\n", "", {"version":3,"sources":["/./src/components/App/App.scss","/./node_modules/normalize.css/normalize.css","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH,4EAA4E;;AAE5E;;;;GAIG;;AAEH;EACE,wBAAwB,CAAC,OAAO;EAChC,2BAA2B,CAAC,OAAO;EACnC,+BAA+B,CAAC,OAAO;CACxC;;AAED;;GAEG;;AAEH;EACE,UAAU;CACX;;AAED;gFACgF;;AAEhF;;;;;GAKG;;AAEH;EAaE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;EAIE,sBAAsB,CAAC,OAAO;EAC9B,yBAAyB,CAAC,OAAO;CAClC;;AAED;;;GAGG;;AAEH;EACE,cAAc;EACd,UAAU;CACX;;AAED;;;GAGG;;AAEH;EAEE,cAAc;CACf;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,8BAA8B;CAC/B;;AAED;;;GAGG;;AAEH;EAEE,WAAW;CACZ;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,0BAA0B;CAC3B;;AAED;;GAEG;;AAEH;EAEE,kBAAkB;CACnB;;AAED;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;;GAGG;;AAEH;EACE,eAAe;EACf,iBAAiB;CAClB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;EACjB,YAAY;CACb;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;GAEG;;AAEH;EAEE,eAAe;EACf,eAAe;EACf,mBAAmB;EACnB,yBAAyB;CAC1B;;AAED;EACE,YAAY;CACb;;AAED;EACE,gBAAgB;CACjB;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,UAAU;CACX;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;GAEG;;AAEH;EACE,gCAAwB;UAAxB,wBAAwB;EACxB,UAAU;CACX;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;GAEG;;AAEH;EAIE,kCAAkC;EAClC,eAAe;CAChB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;;;;GAKG;;AAEH;EAKE,eAAe,CAAC,OAAO;EACvB,cAAc,CAAC,OAAO;EACtB,UAAU,CAAC,OAAO;CACnB;;AAED;;GAEG;;AAEH;EACE,kBAAkB;CACnB;;AAED;;;;;GAKG;;AAEH;EAEE,qBAAqB;CACtB;;AAED;;;;;;GAMG;;AAEH;EAIE,2BAA2B,CAAC,OAAO;EACnC,gBAAgB,CAAC,OAAO;CACzB;;AAED;;GAEG;;AAEH;EAEE,gBAAgB;CACjB;;AAED;;GAEG;;AAEH;EAEE,UAAU;EACV,WAAW;CACZ;;AAED;;;GAGG;;AAEH;EACE,oBAAoB;CACrB;;AAED;;;;;;GAMG;;AAEH;EAEE,+BAAuB;UAAvB,uBAAuB,CAAC,OAAO;EAC/B,WAAW,CAAC,OAAO;CACpB;;AAED;;;;GAIG;;AAEH;EAEE,aAAa;CACd;;AAED;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,gCAAwB;UAAxB,wBAAwB,CAAC,OAAO;CACjC;;AAED;;;;GAIG;;AAEH;EAEE,yBAAyB;CAC1B;;AAED;;GAEG;;AAEH;EACE,0BAA0B;EAC1B,cAAc;EACd,+BAA+B;CAChC;;AAED;;;GAGG;;AAEH;EACE,UAAU,CAAC,OAAO;EAClB,WAAW,CAAC,OAAO;CACpB;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;EACE,kBAAkB;CACnB;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,0BAA0B;EAC1B,kBAAkB;CACnB;;AAED;EAEE,WAAW;CACZ;;AD5ZD,yEAAyE;;AEXzE;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAGlE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;AAIhF;;gFAEgF;;AF1BhF;;gFAEgF;;AAEhF;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe,CAAC,YAAY;EAC5B,yDAA+B;EAC/B,mBAAmB,CAAC,WAAW;CAChC;;AAED;;;;;;GAMG;;AAEH;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;;GAEG;;AAEH;EACE,eAAe;EACf,YAAY;EACZ,UAAU;EACV,2BAA2B;EAC3B,cAAc;EACd,WAAW;CACZ;;AAED;;;;GAIG;;AAEH;EAME,uBAAuB;CACxB;;AAED;;GAEG;;AAEH;EACE,UAAU;EACV,UAAU;EACV,WAAW;CACZ;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;gFAEgF;;AAEhF;EACE,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;EACZ,iBAAiB;CAClB;;AAED;;;;gFAIgF;;AAEhF;EACE;IAGE,mCAAmC;IACnC,uBAAuB,CAAC,+DAA+D;IACvF,oCAA4B;YAA5B,4BAA4B;IAC5B,6BAA6B;GAC9B;;EAED;IAEE,2BAA2B;GAC5B;;EAED;IACE,6BAA6B;GAC9B;;EAED;IACE,8BAA8B;GAC/B;;EAED;;;KAGG;;EAEH;IAEE,YAAY;GACb;;EAED;IAEE,uBAAuB;IACvB,yBAAyB;GAC1B;;EAED;;;KAGG;;EAEH;IACE,4BAA4B;GAC7B;;EAED;IAEE,yBAAyB;GAC1B;;EAED;IACE,2BAA2B;GAC5B;;EAED;IAGE,WAAW;IACX,UAAU;GACX;;EAED;IAEE,wBAAwB;GACzB;CACF","file":"App.scss","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../../node_modules/normalize.css/normalize.css';\n\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */\n\n@import '../variables.scss';\n\n/*\n * Base styles\n * ========================================================================== */\n\nhtml {\n  color: #222;\n  font-weight: 100;\n  font-size: 1em; /* ~16px; */\n  font-family: $font-family-base;\n  line-height: 1.375; /* ~22px */\n}\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio,\ncanvas,\niframe,\nimg,\nsvg,\nvideo {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n:global(.browserupgrade) {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *,\n  *:before,\n  *:after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^=\"#\"]:after,\n  a[href^=\"javascript:\"]:after {\n    content: \"\";\n  }\n\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n}\n","/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS and IE text size adjust after device orientation change,\n *    without disabling user zoom.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.\n */\n\n[hidden],\ntemplate {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * Improve readability of focused elements when they are also in an\n * active/hover state.\n */\n\na:active,\na:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\n\nb,\nstrong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\n\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit; /* 1 */\n  font: inherit; /* 2 */\n  margin: 0; /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton,\nhtml input[type=\"button\"], /* 1 */\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n  cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome.\n */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  box-sizing: content-box; /* 2 */\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n  border: 0; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n$red-dark: #D32F2F;\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n\r\n/*\r\n * Cards\r\n * ========================================================================== */\r\n\r\n  $card-font-size: 16px !default;\r\n  $card-width: 512px !default;\r\n  $card-height: 200px !default;\r\n  $card-z-index: 1 !default;\r\n  $card-background-color: unquote(\"rgb(#{$white-base})\") !default;\r\n  $card-text-color: unquote(\"rgb(#{$gray-darker})\") !default;\r\n  $card-horizontal-padding: 16px !default;\r\n  $card-vertical-padding: 16px !default;\r\n  $card-title-perspective-origin-x: 165px !default;\r\n  $card-title-perspective-origin-y: 56px !default;\r\n  $card-title-transform-origin-x: 165px !default;\r\n  $card-title-transform-origin-y: 56px !default;\r\n  $card-border-color: rgba(0,0,0,0.1) !default;\r\n  $input-text-vertical-spacing: 20px !default;\r\n  $input-text-font-size: 16px !default;\r\n  $input-text-bottom-border-color: unquote(\"rgba(#{$gray-darker}, 0.12)\") !default;\r\n  $performance_font: 'Helvetica', 'Arial', sans-serif !default;\r\n  $input-text-padding: 4px !default;\r\n  $input-text-width: 100% !default;\r\n  $input-text-error-color: unquote(\"rgb(#{$red-dark})\") !default;\r\n  $input-text-disabled-color: $input-text-bottom-border-color !default;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(7)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n/* #222 */\r\n\r\n/* #404040 */\r\n\r\n/* #555 */\r\n\r\n/* #777 */\r\n\r\n/* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n/* Extra small screen / phone */\r\n\r\n/* Small screen / tablet */\r\n\r\n/* Medium screen / desktop */\r\n\r\n/* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n/*\r\n * Cards\r\n * ========================================================================== */\r\n\r\n.ContactPage_root_c4z {\r\n\r\n}\r\n\r\n.ContactPage_container_2pQ {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 1000px;\r\n}\r\n", "", {"version":3,"sources":["/./src/components/ContactPage/ContactPage.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAGlE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;AAIhF;;gFAEgF;;AD9BhF;;CAEC;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAA8B;CAC/B","file":"ContactPage.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n@import '../variables.scss';\r\n\r\n.root {\r\n\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: $max-content-width;\r\n}\r\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n$red-dark: #D32F2F;\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n\r\n/*\r\n * Cards\r\n * ========================================================================== */\r\n\r\n  $card-font-size: 16px !default;\r\n  $card-width: 512px !default;\r\n  $card-height: 200px !default;\r\n  $card-z-index: 1 !default;\r\n  $card-background-color: unquote(\"rgb(#{$white-base})\") !default;\r\n  $card-text-color: unquote(\"rgb(#{$gray-darker})\") !default;\r\n  $card-horizontal-padding: 16px !default;\r\n  $card-vertical-padding: 16px !default;\r\n  $card-title-perspective-origin-x: 165px !default;\r\n  $card-title-perspective-origin-y: 56px !default;\r\n  $card-title-transform-origin-x: 165px !default;\r\n  $card-title-transform-origin-y: 56px !default;\r\n  $card-border-color: rgba(0,0,0,0.1) !default;\r\n  $input-text-vertical-spacing: 20px !default;\r\n  $input-text-font-size: 16px !default;\r\n  $input-text-bottom-border-color: unquote(\"rgba(#{$gray-darker}, 0.12)\") !default;\r\n  $performance_font: 'Helvetica', 'Arial', sans-serif !default;\r\n  $input-text-padding: 4px !default;\r\n  $input-text-width: 100% !default;\r\n  $input-text-error-color: unquote(\"rgb(#{$red-dark})\") !default;\r\n  $input-text-disabled-color: $input-text-bottom-border-color !default;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "ContactPage_root_c4z",
  	"container": "ContactPage_container_2pQ"
  };

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(7)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n* {\r\n  margin: 0;\r\n  line-height: 1.2;\r\n}\r\n\r\nhtml {\r\n  display: table;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #888;\r\n  text-align: center;\r\n  font-family: sans-serif;\r\n}\r\n\r\nbody {\r\n  display: table-cell;\r\n  margin: 2em auto;\r\n  vertical-align: middle;\r\n}\r\n\r\nh1 {\r\n  color: #555;\r\n  font-weight: 400;\r\n  font-size: 2em;\r\n}\r\n\r\np {\r\n  margin: 0 auto;\r\n  width: 280px;\r\n}\r\n\r\n@media only screen and (max-width: 280px) {\r\n\r\n  body, p {\r\n    width: 95%;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 1.5em;\r\n    margin: 0 0 0.3em;\r\n\r\n  }\r\n\r\n}\r\n", "", {"version":3,"sources":["/./src/components/ErrorPage/ErrorPage.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,UAAU;EACV,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB,wBAAwB;CACzB;;AAED;EACE,oBAAoB;EACpB,iBAAiB;EACjB,uBAAuB;CACxB;;AAED;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;;EAEE;IACE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;;GAEnB;;CAEF","file":"ErrorPage.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n* {\r\n  margin: 0;\r\n  line-height: 1.2;\r\n}\r\n\r\nhtml {\r\n  display: table;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #888;\r\n  text-align: center;\r\n  font-family: sans-serif;\r\n}\r\n\r\nbody {\r\n  display: table-cell;\r\n  margin: 2em auto;\r\n  vertical-align: middle;\r\n}\r\n\r\nh1 {\r\n  color: #555;\r\n  font-weight: 400;\r\n  font-size: 2em;\r\n}\r\n\r\np {\r\n  margin: 0 auto;\r\n  width: 280px;\r\n}\r\n\r\n@media only screen and (max-width: 280px) {\r\n\r\n  body, p {\r\n    width: 95%;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 1.5em;\r\n    margin: 0 0 0.3em;\r\n\r\n  }\r\n\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(7)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n/* #222 */\r\n\r\n/* #404040 */\r\n\r\n/* #555 */\r\n\r\n/* #777 */\r\n\r\n/* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n/* Extra small screen / phone */\r\n\r\n/* Small screen / tablet */\r\n\r\n/* Medium screen / desktop */\r\n\r\n/* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n/*\r\n * Cards\r\n * ========================================================================== */\r\n\r\n.LoginPage_root_5f7 {\r\n\r\n}\r\n\r\n.LoginPage_container_2c5 {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 1000px;\r\n}\r\n", "", {"version":3,"sources":["/./src/components/LoginPage/LoginPage.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAGlE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;AAIhF;;gFAEgF;;AD9BhF;;CAEC;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAA8B;CAC/B","file":"LoginPage.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n@import '../variables.scss';\r\n\r\n.root {\r\n\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: $max-content-width;\r\n}\r\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n$red-dark: #D32F2F;\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n\r\n/*\r\n * Cards\r\n * ========================================================================== */\r\n\r\n  $card-font-size: 16px !default;\r\n  $card-width: 512px !default;\r\n  $card-height: 200px !default;\r\n  $card-z-index: 1 !default;\r\n  $card-background-color: unquote(\"rgb(#{$white-base})\") !default;\r\n  $card-text-color: unquote(\"rgb(#{$gray-darker})\") !default;\r\n  $card-horizontal-padding: 16px !default;\r\n  $card-vertical-padding: 16px !default;\r\n  $card-title-perspective-origin-x: 165px !default;\r\n  $card-title-perspective-origin-y: 56px !default;\r\n  $card-title-transform-origin-x: 165px !default;\r\n  $card-title-transform-origin-y: 56px !default;\r\n  $card-border-color: rgba(0,0,0,0.1) !default;\r\n  $input-text-vertical-spacing: 20px !default;\r\n  $input-text-font-size: 16px !default;\r\n  $input-text-bottom-border-color: unquote(\"rgba(#{$gray-darker}, 0.12)\") !default;\r\n  $performance_font: 'Helvetica', 'Arial', sans-serif !default;\r\n  $input-text-padding: 4px !default;\r\n  $input-text-width: 100% !default;\r\n  $input-text-error-color: unquote(\"rgb(#{$red-dark})\") !default;\r\n  $input-text-disabled-color: $input-text-bottom-border-color !default;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "LoginPage_root_5f7",
  	"container": "LoginPage_container_2c5"
  };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(7)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n* {\r\n  margin: 0;\r\n  line-height: 1.2;\r\n}\r\n\r\nhtml {\r\n  display: table;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #888;\r\n  text-align: center;\r\n  font-family: sans-serif;\r\n}\r\n\r\nbody {\r\n  display: table-cell;\r\n  margin: 2em auto;\r\n  vertical-align: middle;\r\n}\r\n\r\nh1 {\r\n  color: #555;\r\n  font-weight: 400;\r\n  font-size: 2em;\r\n}\r\n\r\np {\r\n  margin: 0 auto;\r\n  width: 280px;\r\n}\r\n\r\n@media only screen and (max-width: 280px) {\r\n\r\n  body, p {\r\n    width: 95%;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 1.5em;\r\n    margin: 0 0 0.3em;\r\n  }\r\n\r\n}\r\n", "", {"version":3,"sources":["/./src/components/NotFoundPage/NotFoundPage.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,UAAU;EACV,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB,wBAAwB;CACzB;;AAED;EACE,oBAAoB;EACpB,iBAAiB;EACjB,uBAAuB;CACxB;;AAED;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;;EAEE;IACE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;GACnB;;CAEF","file":"NotFoundPage.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n* {\r\n  margin: 0;\r\n  line-height: 1.2;\r\n}\r\n\r\nhtml {\r\n  display: table;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #888;\r\n  text-align: center;\r\n  font-family: sans-serif;\r\n}\r\n\r\nbody {\r\n  display: table-cell;\r\n  margin: 2em auto;\r\n  vertical-align: middle;\r\n}\r\n\r\nh1 {\r\n  color: #555;\r\n  font-weight: 400;\r\n  font-size: 2em;\r\n}\r\n\r\np {\r\n  margin: 0 auto;\r\n  width: 280px;\r\n}\r\n\r\n@media only screen and (max-width: 280px) {\r\n\r\n  body, p {\r\n    width: 95%;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 1.5em;\r\n    margin: 0 0 0.3em;\r\n  }\r\n\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(7)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n /*\r\n * Colors\r\n * ========================================================================== */\n /* #222 */\n /* #404040 */\n /* #555 */\n /* #777 */\n /* #eee */\n /*\r\n * Typography\r\n * ========================================================================== */\n /*\r\n * Layout\r\n * ========================================================================== */\n /*\r\n * Media queries breakpoints\r\n * ========================================================================== */\n /* Extra small screen / phone */\n /* Small screen / tablet */\n /* Medium screen / desktop */\n /* Large screen / wide desktop */\n /*\r\n * Animations\r\n * ========================================================================== */\n /*\r\n * Cards\r\n * ========================================================================== */\n .Note_card_3hu {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  font-size: 16px;\n  font-weight: 400;\n  min-height: 200px;\n  overflow: hidden;\n  width: 512px;\n  z-index: 1;\n  position: relative;\n  background: unquote(\"rgb(#{hsl(255, 255, 255)})\");\n  border-radius: 2px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin-bottom: 30px;\n}\n /* .mdl-card__media {*/\n /*   background-color: $card-image-placeholder-color;*/\n /*   background-repeat: repeat;*/\n /*   background-position: 50% 50%;*/\n /*   background-size: cover;*/\n /*   background-origin: padding-box;*/\n /*   background-attachment: scroll;*/\n /*   box-sizing: border-box;*/\n /* }*/\n /**/\n /* .mdl-card__title {*/\n /*   align-items: center;*/\n /*   color: $card-text-color;*/\n /*   display: block;*/\n /*   display: flex;*/\n /*   justify-content: stretch;*/\n /*   line-height: normal;*/\n /*   padding: $card-vertical-padding $card-horizontal-padding;*/\n /*   perspective-origin: $card-title-perspective-origin-x $card-title-perspective-origin-y;*/\n /*   transform-origin: $card-title-transform-origin-x $card-title-transform-origin-y;*/\n /*   box-sizing: border-box;*/\n /**/\n /*   &.mdl-card--border {*/\n /*     border-bottom: 1px solid $card-border-color;*/\n /*   }*/\n /**/\n /*   &.demo-card-wide {*/\n /*     color: $white-base;*/\n /*     height: 176px;*/\n /*   }*/\n /* }*/\n /**/\n /* .mdl-card__title-text {*/\n /*   align-self: flex-end;*/\n /*   color: inherit;*/\n /*   display: block;*/\n /*   display: flex;*/\n /*   font-size: $card-title-font-size;*/\n /*   font-weight: $card-title-text-font-weight;*/\n /*   line-height: normal;*/\n /*   overflow: hidden;*/\n /*   transform-origin: $card-title-text-transform-origin-x $card-title-text-transform-origin-y;*/\n /*   margin: 0;*/\n /* }*/\n /**/\n /* .mdl-card__subtitle-text {*/\n /*   font-size: $card-subtitle-font-size;*/\n /*   color: $card-subtitle-color;*/\n /*   margin: 0;*/\n /* }*/\n /**/\n /* .mdl-card__supporting-text {*/\n /*   color: $card-supporting-text-text-color;*/\n /*   font-size: $card-supporting-text-font-size;*/\n /*   line-height: $card-supporting-text-line-height;*/\n /*   overflow: hidden;*/\n /*   padding: $card-vertical-padding $card-horizontal-padding;*/\n /*   width: 90%;*/\n /* }*/\n /**/\n /**/\n /* .mdl-card__actions {*/\n /*   font-size: $card-actions-font-size;*/\n /*   line-height: normal;*/\n /*   width: 100%;*/\n /*   background-color: rgba(0,0,0,0);*/\n /*   padding: 8px;*/\n /*   box-sizing: border-box;*/\n /**/\n /*   &.mdl-card--border {*/\n /*     border-top: 1px solid $card-border-color;*/\n /*   }*/\n /* }*/\n /**/\n /* .mdl-card--expand {*/\n /*   flex-grow: 1;*/\n /* }*/\n /**/\n /**/\n /* .mdl-card__menu {*/\n /*   position: absolute;*/\n /*   right: 16px;*/\n /*   top: 16px;*/\n /* }*/\n", "", {"version":3,"sources":["/./src/components/Note/Note.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;GAcG;CCdH;;gFAEgF;CAGxB,UAAU;CACV,aAAa;CACb,UAAU;CACV,UAAU;CACV,UAAU;CAGlE;;gFAEgF;CAIhF;;gFAEgF;CAIhF;;gFAEgF;CAEhD,gCAAgC;CAChC,2BAA2B;CAC3B,6BAA6B;CAC7B,iCAAiC;CAEjE;;gFAEgF;CAIhF;;gFAEgF;CDxBhF;EACE,qBAAc;EAAd,sBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,6BAAuB;EAAvB,8BAAuB;EAAvB,+BAAuB;MAAvB,2BAAuB;UAAvB,uBAAuB;EACvB,gBAA2B;EAC3B,iBAAiB;EACjB,kBAAyB;EACzB,iBAAiB;EACjB,aAAmB;EACnB,WAAuB;EACvB,mBAAmB;EACnB,kDAAmC;EACnC,mBAAmB;EACnB,+BAAuB;UAAvB,uBAAuB;EACvB,oBAAoB;CACrB;CAED,uBAAqB;CACrB,uDAAqD;CACrD,iCAA+B;CAC/B,oCAAkC;CAClC,8BAA4B;CAC5B,sCAAoC;CACpC,qCAAmC;CACnC,8BAA4B;CAC5B,MAAI;CACJ,IAAE;CACF,uBAAqB;CACrB,2BAAyB;CACzB,+BAA6B;CAC7B,sBAAoB;CACpB,qBAAmB;CACnB,gCAA8B;CAC9B,2BAAyB;CACzB,gEAA8D;CAC9D,6FAA2F;CAC3F,uFAAqF;CACrF,8BAA4B;CAC5B,IAAE;CACF,2BAAyB;CACzB,qDAAmD;CACnD,QAAM;CACN,IAAE;CACF,yBAAuB;CACvB,4BAA0B;CAC1B,uBAAqB;CACrB,QAAM;CACN,MAAI;CACJ,IAAE;CACF,4BAA0B;CAC1B,4BAA0B;CAC1B,sBAAoB;CACpB,sBAAoB;CACpB,qBAAmB;CACnB,wCAAsC;CACtC,iDAA+C;CAC/C,2BAAyB;CACzB,wBAAsB;CACtB,iGAA+F;CAC/F,iBAAe;CACf,MAAI;CACJ,IAAE;CACF,+BAA6B;CAC7B,2CAAyC;CACzC,mCAAiC;CACjC,iBAAe;CACf,MAAI;CACJ,IAAE;CACF,iCAA+B;CAC/B,+CAA6C;CAC7C,kDAAgD;CAChD,sDAAoD;CACpD,wBAAsB;CACtB,gEAA8D;CAC9D,kBAAgB;CAChB,MAAI;CACJ,IAAE;CACF,IAAE;CACF,yBAAuB;CACvB,0CAAwC;CACxC,2BAAyB;CACzB,mBAAiB;CACjB,uCAAqC;CACrC,oBAAkB;CAClB,8BAA4B;CAC5B,IAAE;CACF,2BAAyB;CACzB,kDAAgD;CAChD,QAAM;CACN,MAAI;CACJ,IAAE;CACF,wBAAsB;CACtB,oBAAkB;CAClB,MAAI;CACJ,IAAE;CACF,IAAE;CACF,sBAAoB;CACpB,0BAAwB;CACxB,mBAAiB;CACjB,iBAAe;CACf,MAAI","file":"Note.scss","sourcesContent":["/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n @import '../variables.scss';\n\n.card {\n  display: flex;\n  flex-direction: column;\n  font-size: $card-font-size;\n  font-weight: 400;\n  min-height: $card-height;\n  overflow: hidden;\n  width: $card-width;\n  z-index: $card-z-index;\n  position: relative;\n  background: $card-background-color;\n  border-radius: 2px;\n  box-sizing: border-box;\n  margin-bottom: 30px;\n}\n\n// .mdl-card__media {\n//   background-color: $card-image-placeholder-color;\n//   background-repeat: repeat;\n//   background-position: 50% 50%;\n//   background-size: cover;\n//   background-origin: padding-box;\n//   background-attachment: scroll;\n//   box-sizing: border-box;\n// }\n//\n// .mdl-card__title {\n//   align-items: center;\n//   color: $card-text-color;\n//   display: block;\n//   display: flex;\n//   justify-content: stretch;\n//   line-height: normal;\n//   padding: $card-vertical-padding $card-horizontal-padding;\n//   perspective-origin: $card-title-perspective-origin-x $card-title-perspective-origin-y;\n//   transform-origin: $card-title-transform-origin-x $card-title-transform-origin-y;\n//   box-sizing: border-box;\n//\n//   &.mdl-card--border {\n//     border-bottom: 1px solid $card-border-color;\n//   }\n//\n//   &.demo-card-wide {\n//     color: $white-base;\n//     height: 176px;\n//   }\n// }\n//\n// .mdl-card__title-text {\n//   align-self: flex-end;\n//   color: inherit;\n//   display: block;\n//   display: flex;\n//   font-size: $card-title-font-size;\n//   font-weight: $card-title-text-font-weight;\n//   line-height: normal;\n//   overflow: hidden;\n//   transform-origin: $card-title-text-transform-origin-x $card-title-text-transform-origin-y;\n//   margin: 0;\n// }\n//\n// .mdl-card__subtitle-text {\n//   font-size: $card-subtitle-font-size;\n//   color: $card-subtitle-color;\n//   margin: 0;\n// }\n//\n// .mdl-card__supporting-text {\n//   color: $card-supporting-text-text-color;\n//   font-size: $card-supporting-text-font-size;\n//   line-height: $card-supporting-text-line-height;\n//   overflow: hidden;\n//   padding: $card-vertical-padding $card-horizontal-padding;\n//   width: 90%;\n// }\n//\n//\n// .mdl-card__actions {\n//   font-size: $card-actions-font-size;\n//   line-height: normal;\n//   width: 100%;\n//   background-color: rgba(0,0,0,0);\n//   padding: 8px;\n//   box-sizing: border-box;\n//\n//   &.mdl-card--border {\n//     border-top: 1px solid $card-border-color;\n//   }\n// }\n//\n// .mdl-card--expand {\n//   flex-grow: 1;\n// }\n//\n//\n// .mdl-card__menu {\n//   position: absolute;\n//   right: 16px;\n//   top: 16px;\n// }\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n$red-dark: #D32F2F;\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n\r\n/*\r\n * Cards\r\n * ========================================================================== */\r\n\r\n  $card-font-size: 16px !default;\r\n  $card-width: 512px !default;\r\n  $card-height: 200px !default;\r\n  $card-z-index: 1 !default;\r\n  $card-background-color: unquote(\"rgb(#{$white-base})\") !default;\r\n  $card-text-color: unquote(\"rgb(#{$gray-darker})\") !default;\r\n  $card-horizontal-padding: 16px !default;\r\n  $card-vertical-padding: 16px !default;\r\n  $card-title-perspective-origin-x: 165px !default;\r\n  $card-title-perspective-origin-y: 56px !default;\r\n  $card-title-transform-origin-x: 165px !default;\r\n  $card-title-transform-origin-y: 56px !default;\r\n  $card-border-color: rgba(0,0,0,0.1) !default;\r\n  $input-text-vertical-spacing: 20px !default;\r\n  $input-text-font-size: 16px !default;\r\n  $input-text-bottom-border-color: unquote(\"rgba(#{$gray-darker}, 0.12)\") !default;\r\n  $performance_font: 'Helvetica', 'Arial', sans-serif !default;\r\n  $input-text-padding: 4px !default;\r\n  $input-text-width: 100% !default;\r\n  $input-text-error-color: unquote(\"rgb(#{$red-dark})\") !default;\r\n  $input-text-disabled-color: $input-text-bottom-border-color !default;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"card": "Note_card_3hu"
  };

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(7)();
  // imports
  
  
  // module
  exports.push([module.id, "/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n/* #222 */\r\n\r\n/* #404040 */\r\n\r\n/* #555 */\r\n\r\n/* #777 */\r\n\r\n/* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n/* Extra small screen / phone */\r\n\r\n/* Small screen / tablet */\r\n\r\n/* Medium screen / desktop */\r\n\r\n/* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n/*\r\n * Cards\r\n * ========================================================================== */\r\n\r\n.NoteBody_background_3_G {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: unquote(\"rgb(#{rgb(36, 36, 36)})\");\n  display: block;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: stretch;\n  -webkit-justify-content: stretch;\n      -ms-flex-pack: stretch;\n          justify-content: stretch;\n  line-height: normal;\n  padding: 16px 16px;\n  -webkit-perspective-origin: 165px 56px;\n          perspective-origin: 165px 56px;\n  -webkit-transform-origin: 165px 56px;\n      -ms-transform-origin: 165px 56px;\n       -o-transform-origin: 165px 56px;\n          transform-origin: 165px 56px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  border-bottom: 1px solid rgba(0,0,0,0.1);\n  color: hsl(255, 255, 255);\n  height: 176px;\n}\r\n\r\n.NoteBody_body_rXj {\n    /* position: relative;*/\n    font-size: 16px;\n    display: inline-block;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    width: 300px;\n    max-width: 100%;\n    margin: 0;\n    padding: 20px 0\n\n    /* Align buttons, if used.*/\n}\r\n\r\n.NoteBody_body_rXj .NoteBody_button_1lM {\n  position: absolute;\n  bottom: 20px;\n}\r\n\r\n.NoteBody_input_235 {\n    border: none;\n    border-bottom: 1px solid unquote(\"rgba(#{rgb(36, 36, 36)}, 0.12)\");\n    display: block;\n    font-size: 16px;\n    font-family: 'Helvetica','Arial',sans-serif;\n    margin: 0;\n    padding: 4px 0;\n    width: 100%;\n    background: none;\n    text-align: left;\n    color: inherit;\n}\r\n\r\n.NoteBody_input_235 .NoteBody_is-invalid_1pk {\n  border-color: unquote(\"rgb(#{#D32F2F})\");\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\r\n\r\n.NoteBody_input_235 .NoteBody_is-disabled_6dZ {\n  background-color: transparent;\n  border-bottom: 1px dotted unquote(\"rgba(#{rgb(36, 36, 36)}, 0.12)\");\n  color: $input-text-disabled-text-color;\n}\r\n\r\n.NoteBody_input_235:focus {\n  outline: none;\n}\n", "", {"version":3,"sources":["/./src/components/variables.scss","/./src/components/NoteBody/NoteBody.scss"],"names":[],"mappings":"AAAA;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAGlE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;AAIhF;;gFAEgF;;ACtChF;EACE,0BAAoB;EAApB,4BAAoB;MAApB,uBAAoB;UAApB,oBAAoB;EACpB,0CAAwB;EACxB,eAAe;EACf,qBAAc;EAAd,sBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,0BAAyB;EAAzB,iCAAyB;MAAzB,uBAAyB;UAAzB,yBAAyB;EACzB,oBAAoB;EACpB,mBAAyD;EACzD,uCAAsF;UAAtF,+BAAsF;EACtF,qCAAgF;MAAhF,iCAAgF;OAAhF,gCAAgF;UAAhF,6BAAgF;EAChF,+BAAuB;UAAvB,uBAAuB;EACvB,yCAA4C;EAC5C,0BAAmB;EACnB,cAAc;CACf;;AAED;IACI,wBAAsB;IACtB,gBAAiC;IACjC,sBAAsB;IACtB,+BAAuB;YAAvB,uBAAuB;IACvB,aAAa;IACb,gBAAgB;IAChB,UAAU;IACV,eAAwC;;IAExC,4BAA0B;CAK7B;;AAJG;EACE,mBAAmB;EACnB,aAAqC;CACtC;;AAGL;IACI,aAAa;IACb,mEAAyD;IACzD,eAAe;IACf,gBAAiC;IACjC,4CAA+B;IAC/B,UAAU;IACV,eAA+B;IAC/B,YAAyB;IACzB,iBAAiB;IACjB,iBAAiB;IACjB,eAAe;CAgBlB;;AAVG;EACE,yCAAsC;EACtC,yBAAiB;UAAjB,iBAAiB;CAClB;;AAED;EACE,8BAA8B;EAC9B,oEAAqD;EACrD,uCAAuC;CACxC;;AAbD;EACE,cAAc;CACf","file":"NoteBody.scss","sourcesContent":["/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n$red-dark: #D32F2F;\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n\r\n/*\r\n * Cards\r\n * ========================================================================== */\r\n\r\n  $card-font-size: 16px !default;\r\n  $card-width: 512px !default;\r\n  $card-height: 200px !default;\r\n  $card-z-index: 1 !default;\r\n  $card-background-color: unquote(\"rgb(#{$white-base})\") !default;\r\n  $card-text-color: unquote(\"rgb(#{$gray-darker})\") !default;\r\n  $card-horizontal-padding: 16px !default;\r\n  $card-vertical-padding: 16px !default;\r\n  $card-title-perspective-origin-x: 165px !default;\r\n  $card-title-perspective-origin-y: 56px !default;\r\n  $card-title-transform-origin-x: 165px !default;\r\n  $card-title-transform-origin-y: 56px !default;\r\n  $card-border-color: rgba(0,0,0,0.1) !default;\r\n  $input-text-vertical-spacing: 20px !default;\r\n  $input-text-font-size: 16px !default;\r\n  $input-text-bottom-border-color: unquote(\"rgba(#{$gray-darker}, 0.12)\") !default;\r\n  $performance_font: 'Helvetica', 'Arial', sans-serif !default;\r\n  $input-text-padding: 4px !default;\r\n  $input-text-width: 100% !default;\r\n  $input-text-error-color: unquote(\"rgb(#{$red-dark})\") !default;\r\n  $input-text-disabled-color: $input-text-bottom-border-color !default;\r\n","\n@import \"../variables.scss\";\n\n.background {\n  align-items: center;\n  color: $card-text-color;\n  display: block;\n  display: flex;\n  justify-content: stretch;\n  line-height: normal;\n  padding: $card-vertical-padding $card-horizontal-padding;\n  perspective-origin: $card-title-perspective-origin-x $card-title-perspective-origin-y;\n  transform-origin: $card-title-transform-origin-x $card-title-transform-origin-y;\n  box-sizing: border-box;\n  border-bottom: 1px solid $card-border-color;\n  color: $white-base;\n  height: 176px;\n}\n\n.body {\n    // position: relative;\n    font-size: $input-text-font-size;\n    display: inline-block;\n    box-sizing: border-box;\n    width: 300px;\n    max-width: 100%;\n    margin: 0;\n    padding: $input-text-vertical-spacing 0;\n\n    // Align buttons, if used.\n    & .button {\n      position: absolute;\n      bottom: $input-text-vertical-spacing;\n    }\n}\n\n.input {\n    border: none;\n    border-bottom: 1px solid $input-text-bottom-border-color;\n    display: block;\n    font-size: $input-text-font-size;\n    font-family: $performance_font;\n    margin: 0;\n    padding: $input-text-padding 0;\n    width: $input-text-width;\n    background: none;\n    text-align: left;\n    color: inherit;\n\n    &:focus {\n      outline: none;\n    }\n\n    .is-invalid {\n      border-color: $input-text-error-color;\n      box-shadow: none;\n    }\n\n    .is-disabled {\n      background-color: transparent;\n      border-bottom: 1px dotted $input-text-disabled-color;\n      color: $input-text-disabled-text-color;\n    }\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"background": "NoteBody_background_3_G",
  	"body": "NoteBody_body_rXj",
  	"button": "NoteBody_button_1lM",
  	"input": "NoteBody_input_235",
  	"is-invalid": "NoteBody_is-invalid_1pk",
  	"is-disabled": "NoteBody_is-disabled_6dZ"
  };

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(7)();
  // imports
  
  
  // module
  exports.push([module.id, "/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n/* #222 */\r\n\r\n/* #404040 */\r\n\r\n/* #555 */\r\n\r\n/* #777 */\r\n\r\n/* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n/* Extra small screen / phone */\r\n\r\n/* Small screen / tablet */\r\n\r\n/* Medium screen / desktop */\r\n\r\n/* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n/*\r\n * Cards\r\n * ========================================================================== */\r\n\r\n.NoteTitle_background_1Fe {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: unquote(\"rgb(#{rgb(36, 36, 36)})\");\n  display: block;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: stretch;\n  -webkit-justify-content: stretch;\n      -ms-flex-pack: stretch;\n          justify-content: stretch;\n  line-height: normal;\n  padding: 16px 16px;\n  -webkit-perspective-origin: 165px 56px;\n          perspective-origin: 165px 56px;\n  -webkit-transform-origin: 165px 56px;\n      -ms-transform-origin: 165px 56px;\n       -o-transform-origin: 165px 56px;\n          transform-origin: 165px 56px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  border-bottom: 1px solid rgba(0,0,0,0.1);\n  color: hsl(255, 255, 255);\n  height: 176px;\n}\r\n\r\n.NoteTitle_title_22V {\n    /* position: relative;*/\n    font-size: 16px;\n    display: inline-block;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    width: 300px;\n    max-width: 100%;\n    margin: 0;\n    padding: 20px 0;\n    position: absolute;\n    bottom: 0\n\n    /* Align buttons, if used.*/\n}\r\n\r\n.NoteTitle_title_22V .NoteTitle_button_2vE {\n  position: absolute;\n  bottom: 20px;\n}\r\n\r\n.NoteTitle_input_3xA {\n    border: none;\n    border-bottom: 1px solid unquote(\"rgba(#{rgb(36, 36, 36)}, 0.12)\");\n    display: block;\n    font-size: 16px;\n    font-family: 'Helvetica','Arial',sans-serif;\n    margin: 0;\n    padding: 4px 0;\n    width: 100%;\n    background: none;\n    text-align: left;\n    color: inherit;\n}\r\n\r\n.NoteTitle_input_3xA .NoteTitle_is-invalid_ox9 {\n  border-color: unquote(\"rgb(#{#D32F2F})\");\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\r\n\r\n.NoteTitle_input_3xA .NoteTitle_is-disabled_2pj {\n  background-color: transparent;\n  border-bottom: 1px dotted unquote(\"rgba(#{rgb(36, 36, 36)}, 0.12)\");\n  color: $input-text-disabled-text-color;\n}\r\n\r\n.NoteTitle_input_3xA:focus {\n  outline: none;\n}\n", "", {"version":3,"sources":["/./src/components/variables.scss","/./src/components/NoteTitle/NoteTitle.scss"],"names":[],"mappings":"AAAA;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAGlE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;AAIhF;;gFAEgF;;ACtChF;EACE,0BAAoB;EAApB,4BAAoB;MAApB,uBAAoB;UAApB,oBAAoB;EACpB,0CAAwB;EACxB,eAAe;EACf,qBAAc;EAAd,sBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,0BAAyB;EAAzB,iCAAyB;MAAzB,uBAAyB;UAAzB,yBAAyB;EACzB,oBAAoB;EACpB,mBAAyD;EACzD,uCAAsF;UAAtF,+BAAsF;EACtF,qCAAgF;MAAhF,iCAAgF;OAAhF,gCAAgF;UAAhF,6BAAgF;EAChF,+BAAuB;UAAvB,uBAAuB;EACvB,yCAA4C;EAC5C,0BAAmB;EACnB,cAAc;CACf;;AAED;IACI,wBAAsB;IACtB,gBAAiC;IACjC,sBAAsB;IACtB,+BAAuB;YAAvB,uBAAuB;IACvB,aAAa;IACb,gBAAgB;IAChB,UAAU;IACV,gBAAwC;IACxC,mBAAmB;IACnB,SAAU;;IAEV,4BAA0B;CAK7B;;AAJG;EACE,mBAAmB;EACnB,aAAqC;CACtC;;AAGL;IACI,aAAa;IACb,mEAAyD;IACzD,eAAe;IACf,gBAAiC;IACjC,4CAA+B;IAC/B,UAAU;IACV,eAA+B;IAC/B,YAAyB;IACzB,iBAAiB;IACjB,iBAAiB;IACjB,eAAe;CAgBlB;;AAVG;EACE,yCAAsC;EACtC,yBAAiB;UAAjB,iBAAiB;CAClB;;AAED;EACE,8BAA8B;EAC9B,oEAAqD;EACrD,uCAAuC;CACxC;;AAbD;EACE,cAAc;CACf","file":"NoteTitle.scss","sourcesContent":["/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n$red-dark: #D32F2F;\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n\r\n/*\r\n * Cards\r\n * ========================================================================== */\r\n\r\n  $card-font-size: 16px !default;\r\n  $card-width: 512px !default;\r\n  $card-height: 200px !default;\r\n  $card-z-index: 1 !default;\r\n  $card-background-color: unquote(\"rgb(#{$white-base})\") !default;\r\n  $card-text-color: unquote(\"rgb(#{$gray-darker})\") !default;\r\n  $card-horizontal-padding: 16px !default;\r\n  $card-vertical-padding: 16px !default;\r\n  $card-title-perspective-origin-x: 165px !default;\r\n  $card-title-perspective-origin-y: 56px !default;\r\n  $card-title-transform-origin-x: 165px !default;\r\n  $card-title-transform-origin-y: 56px !default;\r\n  $card-border-color: rgba(0,0,0,0.1) !default;\r\n  $input-text-vertical-spacing: 20px !default;\r\n  $input-text-font-size: 16px !default;\r\n  $input-text-bottom-border-color: unquote(\"rgba(#{$gray-darker}, 0.12)\") !default;\r\n  $performance_font: 'Helvetica', 'Arial', sans-serif !default;\r\n  $input-text-padding: 4px !default;\r\n  $input-text-width: 100% !default;\r\n  $input-text-error-color: unquote(\"rgb(#{$red-dark})\") !default;\r\n  $input-text-disabled-color: $input-text-bottom-border-color !default;\r\n","\n@import \"../variables.scss\";\n\n.background {\n  align-items: center;\n  color: $card-text-color;\n  display: block;\n  display: flex;\n  justify-content: stretch;\n  line-height: normal;\n  padding: $card-vertical-padding $card-horizontal-padding;\n  perspective-origin: $card-title-perspective-origin-x $card-title-perspective-origin-y;\n  transform-origin: $card-title-transform-origin-x $card-title-transform-origin-y;\n  box-sizing: border-box;\n  border-bottom: 1px solid $card-border-color;\n  color: $white-base;\n  height: 176px;\n}\n\n.title {\n    // position: relative;\n    font-size: $input-text-font-size;\n    display: inline-block;\n    box-sizing: border-box;\n    width: 300px;\n    max-width: 100%;\n    margin: 0;\n    padding: $input-text-vertical-spacing 0;\n    position: absolute;\n    bottom: 0;\n\n    // Align buttons, if used.\n    & .button {\n      position: absolute;\n      bottom: $input-text-vertical-spacing;\n    }\n}\n\n.input {\n    border: none;\n    border-bottom: 1px solid $input-text-bottom-border-color;\n    display: block;\n    font-size: $input-text-font-size;\n    font-family: $performance_font;\n    margin: 0;\n    padding: $input-text-padding 0;\n    width: $input-text-width;\n    background: none;\n    text-align: left;\n    color: inherit;\n\n    &:focus {\n      outline: none;\n    }\n\n    .is-invalid {\n      border-color: $input-text-error-color;\n      box-shadow: none;\n    }\n\n    .is-disabled {\n      background-color: transparent;\n      border-bottom: 1px dotted $input-text-disabled-color;\n      color: $input-text-disabled-text-color;\n    }\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"background": "NoteTitle_background_1Fe",
  	"title": "NoteTitle_title_22V",
  	"button": "NoteTitle_button_2vE",
  	"input": "NoteTitle_input_3xA",
  	"is-invalid": "NoteTitle_is-invalid_ox9",
  	"is-disabled": "NoteTitle_is-disabled_2pj"
  };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(7)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n/* #222 */\r\n\r\n/* #404040 */\r\n\r\n/* #555 */\r\n\r\n/* #777 */\r\n\r\n/* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n/* Extra small screen / phone */\r\n\r\n/* Small screen / tablet */\r\n\r\n/* Medium screen / desktop */\r\n\r\n/* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n/*\r\n * Cards\r\n * ========================================================================== */\r\n\r\n.RegisterPage_root_2Yr {\r\n\r\n}\r\n\r\n.RegisterPage_container_6L5 {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 1000px;\r\n}\r\n", "", {"version":3,"sources":["/./src/components/RegisterPage/RegisterPage.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAGlE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;AAIhF;;gFAEgF;;AD9BhF;;CAEC;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAA8B;CAC/B","file":"RegisterPage.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n@import '../variables.scss';\r\n\r\n.root {\r\n\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: $max-content-width;\r\n}\r\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n$red-dark: #D32F2F;\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n\r\n/*\r\n * Cards\r\n * ========================================================================== */\r\n\r\n  $card-font-size: 16px !default;\r\n  $card-width: 512px !default;\r\n  $card-height: 200px !default;\r\n  $card-z-index: 1 !default;\r\n  $card-background-color: unquote(\"rgb(#{$white-base})\") !default;\r\n  $card-text-color: unquote(\"rgb(#{$gray-darker})\") !default;\r\n  $card-horizontal-padding: 16px !default;\r\n  $card-vertical-padding: 16px !default;\r\n  $card-title-perspective-origin-x: 165px !default;\r\n  $card-title-perspective-origin-y: 56px !default;\r\n  $card-title-transform-origin-x: 165px !default;\r\n  $card-title-transform-origin-y: 56px !default;\r\n  $card-border-color: rgba(0,0,0,0.1) !default;\r\n  $input-text-vertical-spacing: 20px !default;\r\n  $input-text-font-size: 16px !default;\r\n  $input-text-bottom-border-color: unquote(\"rgba(#{$gray-darker}, 0.12)\") !default;\r\n  $performance_font: 'Helvetica', 'Arial', sans-serif !default;\r\n  $input-text-padding: 4px !default;\r\n  $input-text-width: 100% !default;\r\n  $input-text-error-color: unquote(\"rgb(#{$red-dark})\") !default;\r\n  $input-text-disabled-color: $input-text-bottom-border-color !default;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "RegisterPage_root_2Yr",
  	"container": "RegisterPage_container_6L5"
  };

/***/ },
/* 66 */
/***/ function(module, exports) {

  module.exports = Array.isArray || function (arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
  };


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(57);
      var insertCss = __webpack_require__(8);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./App.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./App.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(58);
      var insertCss = __webpack_require__(8);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./ContactPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./ContactPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(59);
      var insertCss = __webpack_require__(8);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./ErrorPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./ErrorPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(60);
      var insertCss = __webpack_require__(8);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./LoginPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./LoginPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(61);
      var insertCss = __webpack_require__(8);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./NotFoundPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./NotFoundPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(62);
      var insertCss = __webpack_require__(8);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Note.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Note.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(63);
      var insertCss = __webpack_require__(8);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./NoteBody.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./NoteBody.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(64);
      var insertCss = __webpack_require__(8);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./NoteTitle.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./NoteTitle.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(65);
      var insertCss = __webpack_require__(8);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./RegisterPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./RegisterPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  var isarray = __webpack_require__(66)
  
  /**
   * Expose `pathToRegexp`.
   */
  module.exports = pathToRegexp
  module.exports.parse = parse
  module.exports.compile = compile
  module.exports.tokensToFunction = tokensToFunction
  module.exports.tokensToRegExp = tokensToRegExp
  
  /**
   * The main path matching regexp utility.
   *
   * @type {RegExp}
   */
  var PATH_REGEXP = new RegExp([
    // Match escaped characters that would otherwise appear in future matches.
    // This allows the user to escape special characters that won't transform.
    '(\\\\.)',
    // Match Express-style parameters and un-named parameters with a prefix
    // and optional suffixes. Matches appear as:
    //
    // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
    // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
    // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
    '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
  ].join('|'), 'g')
  
  /**
   * Parse a string for the raw tokens.
   *
   * @param  {String} str
   * @return {Array}
   */
  function parse (str) {
    var tokens = []
    var key = 0
    var index = 0
    var path = ''
    var res
  
    while ((res = PATH_REGEXP.exec(str)) != null) {
      var m = res[0]
      var escaped = res[1]
      var offset = res.index
      path += str.slice(index, offset)
      index = offset + m.length
  
      // Ignore already escaped sequences.
      if (escaped) {
        path += escaped[1]
        continue
      }
  
      // Push the current path onto the tokens.
      if (path) {
        tokens.push(path)
        path = ''
      }
  
      var prefix = res[2]
      var name = res[3]
      var capture = res[4]
      var group = res[5]
      var suffix = res[6]
      var asterisk = res[7]
  
      var repeat = suffix === '+' || suffix === '*'
      var optional = suffix === '?' || suffix === '*'
      var delimiter = prefix || '/'
      var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')
  
      tokens.push({
        name: name || key++,
        prefix: prefix || '',
        delimiter: delimiter,
        optional: optional,
        repeat: repeat,
        pattern: escapeGroup(pattern)
      })
    }
  
    // Match any characters still remaining.
    if (index < str.length) {
      path += str.substr(index)
    }
  
    // If the path exists, push it onto the end.
    if (path) {
      tokens.push(path)
    }
  
    return tokens
  }
  
  /**
   * Compile a string to a template function for the path.
   *
   * @param  {String}   str
   * @return {Function}
   */
  function compile (str) {
    return tokensToFunction(parse(str))
  }
  
  /**
   * Expose a method for transforming tokens into the path function.
   */
  function tokensToFunction (tokens) {
    // Compile all the tokens into regexps.
    var matches = new Array(tokens.length)
  
    // Compile all the patterns before compilation.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] === 'object') {
        matches[i] = new RegExp('^' + tokens[i].pattern + '$')
      }
    }
  
    return function (obj) {
      var path = ''
      var data = obj || {}
  
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i]
  
        if (typeof token === 'string') {
          path += token
  
          continue
        }
  
        var value = data[token.name]
        var segment
  
        if (value == null) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to be defined')
          }
        }
  
        if (isarray(value)) {
          if (!token.repeat) {
            throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
          }
  
          if (value.length === 0) {
            if (token.optional) {
              continue
            } else {
              throw new TypeError('Expected "' + token.name + '" to not be empty')
            }
          }
  
          for (var j = 0; j < value.length; j++) {
            segment = encodeURIComponent(value[j])
  
            if (!matches[i].test(segment)) {
              throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
            }
  
            path += (j === 0 ? token.prefix : token.delimiter) + segment
          }
  
          continue
        }
  
        segment = encodeURIComponent(value)
  
        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
        }
  
        path += token.prefix + segment
      }
  
      return path
    }
  }
  
  /**
   * Escape a regular expression string.
   *
   * @param  {String} str
   * @return {String}
   */
  function escapeString (str) {
    return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
  }
  
  /**
   * Escape the capturing group by escaping special characters and meaning.
   *
   * @param  {String} group
   * @return {String}
   */
  function escapeGroup (group) {
    return group.replace(/([=!:$\/()])/g, '\\$1')
  }
  
  /**
   * Attach the keys as a property of the regexp.
   *
   * @param  {RegExp} re
   * @param  {Array}  keys
   * @return {RegExp}
   */
  function attachKeys (re, keys) {
    re.keys = keys
    return re
  }
  
  /**
   * Get the flags for a regexp from the options.
   *
   * @param  {Object} options
   * @return {String}
   */
  function flags (options) {
    return options.sensitive ? '' : 'i'
  }
  
  /**
   * Pull out keys from a regexp.
   *
   * @param  {RegExp} path
   * @param  {Array}  keys
   * @return {RegExp}
   */
  function regexpToRegexp (path, keys) {
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g)
  
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: null,
          delimiter: null,
          optional: false,
          repeat: false,
          pattern: null
        })
      }
    }
  
    return attachKeys(path, keys)
  }
  
  /**
   * Transform an array into a regexp.
   *
   * @param  {Array}  path
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function arrayToRegexp (path, keys, options) {
    var parts = []
  
    for (var i = 0; i < path.length; i++) {
      parts.push(pathToRegexp(path[i], keys, options).source)
    }
  
    var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))
  
    return attachKeys(regexp, keys)
  }
  
  /**
   * Create a path regexp from string input.
   *
   * @param  {String} path
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function stringToRegexp (path, keys, options) {
    var tokens = parse(path)
    var re = tokensToRegExp(tokens, options)
  
    // Attach keys back to the regexp.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] !== 'string') {
        keys.push(tokens[i])
      }
    }
  
    return attachKeys(re, keys)
  }
  
  /**
   * Expose a function for taking tokens and returning a RegExp.
   *
   * @param  {Array}  tokens
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function tokensToRegExp (tokens, options) {
    options = options || {}
  
    var strict = options.strict
    var end = options.end !== false
    var route = ''
    var lastToken = tokens[tokens.length - 1]
    var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)
  
    // Iterate over the tokens and create our regexp string.
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]
  
      if (typeof token === 'string') {
        route += escapeString(token)
      } else {
        var prefix = escapeString(token.prefix)
        var capture = token.pattern
  
        if (token.repeat) {
          capture += '(?:' + prefix + capture + ')*'
        }
  
        if (token.optional) {
          if (prefix) {
            capture = '(?:' + prefix + '(' + capture + '))?'
          } else {
            capture = '(' + capture + ')?'
          }
        } else {
          capture = prefix + '(' + capture + ')'
        }
  
        route += capture
      }
    }
  
    // In non-strict mode we allow a slash at the end of match. If the path to
    // match already ends with a slash, we remove it for consistency. The slash
    // is valid at the end of a path match, not in the middle. This is important
    // in non-ending mode, where "/test/" shouldn't match "/test//route".
    if (!strict) {
      route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
    }
  
    if (end) {
      route += '$'
    } else {
      // In non-ending mode, we need the capturing groups to match as much as
      // possible by using a positive lookahead to the end or next path segment.
      route += strict && endsWithSlash ? '' : '(?=\\/|$)'
    }
  
    return new RegExp('^' + route, flags(options))
  }
  
  /**
   * Normalize the given path string, returning a regular expression.
   *
   * An empty array can be passed in for the keys, which will hold the
   * placeholder key descriptions. For example, using `/user/:id`, `keys` will
   * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
   *
   * @param  {(String|RegExp|Array)} path
   * @param  {Array}                 [keys]
   * @param  {Object}                [options]
   * @return {RegExp}
   */
  function pathToRegexp (path, keys, options) {
    keys = keys || []
  
    if (!isarray(keys)) {
      options = keys
      keys = []
    } else if (!options) {
      options = {}
    }
  
    if (path instanceof RegExp) {
      return regexpToRegexp(path, keys, options)
    }
  
    if (isarray(path)) {
      return arrayToRegexp(path, keys, options)
    }
  
    return stringToRegexp(path, keys, options)
  }


/***/ },
/* 77 */
/***/ function(module, exports) {

  module.exports = function(module) {
  	if(!module.webpackPolyfill) {
  		module.deprecate = function() {};
  		module.paths = [];
  		// module.parent = undefined by default
  		module.children = [];
  		module.webpackPolyfill = 1;
  	}
  	return module;
  }


/***/ },
/* 78 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 79 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 80 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 81 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 82 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 83 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 84 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 85 */
/***/ function(module, exports) {

  module.exports = require("core-js/library/fn/get-iterator");

/***/ },
/* 86 */
/***/ function(module, exports) {

  module.exports = require("core-js/library/fn/is-iterable");

/***/ },
/* 87 */
/***/ function(module, exports) {

  module.exports = require("core-js/library/fn/object/create");

/***/ },
/* 88 */
/***/ function(module, exports) {

  module.exports = require("core-js/library/fn/object/define-property");

/***/ },
/* 89 */
/***/ function(module, exports) {

  module.exports = require("core-js/library/fn/object/set-prototype-of");

/***/ },
/* 90 */
/***/ function(module, exports) {

  module.exports = require("core-js/library/fn/promise");

/***/ },
/* 91 */
/***/ function(module, exports) {

  module.exports = require("core-js/library/fn/symbol");

/***/ },
/* 92 */
/***/ function(module, exports) {

  module.exports = require("core-js/library/fn/symbol/iterator");

/***/ },
/* 93 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 94 */
/***/ function(module, exports) {

  module.exports = require("express-graphql");

/***/ },
/* 95 */
/***/ function(module, exports) {

  module.exports = require("express-jwt");

/***/ },
/* 96 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ },
/* 97 */
/***/ function(module, exports) {

  module.exports = require("front-matter");

/***/ },
/* 98 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 99 */
/***/ function(module, exports) {

  module.exports = require("jade");

/***/ },
/* 100 */
/***/ function(module, exports) {

  module.exports = require("jsonwebtoken");

/***/ },
/* 101 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 102 */
/***/ function(module, exports) {

  module.exports = require("passport");

/***/ },
/* 103 */
/***/ function(module, exports) {

  module.exports = require("passport-facebook");

/***/ },
/* 104 */
/***/ function(module, exports) {

  module.exports = require("pg");

/***/ },
/* 105 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map