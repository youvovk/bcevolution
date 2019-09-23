'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to, from) {
  if (from === undefined) from = '';

  var toParts = (to && to.split('/')) || [];
  var fromParts = (from && from.split('/')) || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) fromParts.unshift('..');

  if (
    mustEndAbs &&
    fromParts[0] !== '' &&
    (!fromParts[0] || !isAbsolute(fromParts[0]))
  )
    fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

function valueOf(obj) {
  return obj.valueOf ? obj.valueOf() : Object.prototype.valueOf.call(obj);
}

function valueEqual(a, b) {
  // Test for strict equality first.
  if (a === b) return true;

  // Otherwise, if either of them == null they are not equal.
  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return (
      Array.isArray(b) &&
      a.length === b.length &&
      a.every(function(item, index) {
        return valueEqual(item, b[index]);
      })
    );
  }

  if (typeof a === 'object' || typeof b === 'object') {
    var aValue = valueOf(a);
    var bValue = valueOf(b);

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    return Object.keys(Object.assign({}, a, b)).every(function(key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}

var isProduction = process.env.NODE_ENV === 'production';
function warning(condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }

    var text = "Warning: " + message;

    if (typeof console !== 'undefined') {
      console.warn(text);
    }

    try {
      throw Error(text);
    } catch (x) {}
  }
}

var isProduction$1 = process.env.NODE_ENV === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
  if (condition) {
    return;
  }

  if (isProduction$1) {
    throw new Error(prefix);
  } else {
    throw new Error(prefix + ": " + (message || ''));
  }
}

function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
}
function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
}
function hasBasename(path, prefix) {
  return path.toLowerCase().indexOf(prefix.toLowerCase()) === 0 && '/?#'.indexOf(path.charAt(prefix.length)) !== -1;
}
function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}
function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
}
function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';
  var hashIndex = pathname.indexOf('#');

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
}
function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;
  var path = pathname || '/';
  if (search && search !== '?') path += search.charAt(0) === '?' ? search : "?" + search;
  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : "#" + hash;
  return path;
}

function createLocation(path, state, key, currentLocation) {
  var location;

  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = parsePath(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);
    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = resolvePathname(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
}
function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && valueEqual(a.state, b.state);
}

function createTransitionManager() {
  var prompt = null;

  function setPrompt(nextPrompt) {
    process.env.NODE_ENV !== "production" ? warning(prompt == null, 'A history supports only one prompt at a time') : void 0;
    prompt = nextPrompt;
    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  }

  function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          process.env.NODE_ENV !== "production" ? warning(false, 'A history needs a getUserConfirmation function in order to use a prompt message') : void 0;
          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }

  var listeners = [];

  function appendListener(fn) {
    var isActive = true;

    function listener() {
      if (isActive) fn.apply(void 0, arguments);
    }

    listeners.push(listener);
    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function notifyListeners() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(void 0, args);
    });
  }

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function getConfirmation(message, callback) {
  callback(window.confirm(message)); // eslint-disable-line no-alert
}
/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */

function supportsHistory() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
  return window.history && 'pushState' in window.history;
}
/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */

function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
}
/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
}
/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */

function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
}

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
}
/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */


function createBrowserHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ? process.env.NODE_ENV !== "production" ? invariant(false, 'Browser history needs a DOM') : invariant(false) : void 0;
  var globalHistory = window.history;
  var canUseHistory = supportsHistory();
  var needsHashChangeListener = !supportsPopStateOnHashChange();
  var _props = props,
      _props$forceRefresh = _props.forceRefresh,
      forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';

  function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;
    var path = pathname + search + hash;
    process.env.NODE_ENV !== "production" ? warning(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".') : void 0;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path, state, key);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (isExtraneousPopstateEvent(event)) return;
    handlePop(getDOMLocation(event.state));
  }

  function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  }

  var forceNextPop = false;

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allKeys.indexOf(fromLocation.key);
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key]; // Public interface

  function createHref(location) {
    return basename + createPath(location);
  }

  function push(path, state) {
    process.env.NODE_ENV !== "production" ? warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.pushState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex + 1);
          nextKeys.push(location.key);
          allKeys = nextKeys;
          setState({
            action: action,
            location: location
          });
        }
      } else {
        process.env.NODE_ENV !== "production" ? warning(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history') : void 0;
        window.location.href = href;
      }
    });
  }

  function replace(path, state) {
    process.env.NODE_ENV !== "production" ? warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.replaceState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          if (prevIndex !== -1) allKeys[prevIndex] = location.key;
          setState({
            action: action,
            location: location
          });
        }
      } else {
        process.env.NODE_ENV !== "production" ? warning(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history') : void 0;
        window.location.replace(href);
      }
    });
  }

  function go(n) {
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

var HashChangeEvent$1 = 'hashchange';
var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + stripLeadingSlash(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: stripLeadingSlash,
    decodePath: addLeadingSlash
  },
  slash: {
    encodePath: addLeadingSlash,
    decodePath: addLeadingSlash
  }
};

function stripHash(url) {
  var hashIndex = url.indexOf('#');
  return hashIndex === -1 ? url : url.slice(0, hashIndex);
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
}

function pushHashPath(path) {
  window.location.hash = path;
}

function replaceHashPath(path) {
  window.location.replace(stripHash(window.location.href) + '#' + path);
}

function createHashHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ? process.env.NODE_ENV !== "production" ? invariant(false, 'Hash history needs a DOM') : invariant(false) : void 0;
  var globalHistory = window.history;
  var canGoWithoutReload = supportsGoWithoutReloadUsingHash();
  var _props = props,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$hashType = _props.hashType,
      hashType = _props$hashType === void 0 ? 'slash' : _props$hashType;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;

  function getDOMLocation() {
    var path = decodePath(getHashPath());
    process.env.NODE_ENV !== "production" ? warning(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".') : void 0;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  var forceNextPop = false;
  var ignorePath = null;

  function locationsAreEqual$$1(a, b) {
    return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash;
  }

  function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;
      if (!forceNextPop && locationsAreEqual$$1(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === createPath(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;
      handlePop(location);
    }
  }

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf(createPath(toLocation));
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  } // Ensure the hash is encoded properly before doing anything else.


  var path = getHashPath();
  var encodedPath = encodePath(path);
  if (path !== encodedPath) replaceHashPath(encodedPath);
  var initialLocation = getDOMLocation();
  var allPaths = [createPath(initialLocation)]; // Public interface

  function createHref(location) {
    var baseTag = document.querySelector('base');
    var href = '';

    if (baseTag && baseTag.getAttribute('href')) {
      href = stripHash(window.location.href);
    }

    return href + '#' + encodePath(basename + createPath(location));
  }

  function push(path, state) {
    process.env.NODE_ENV !== "production" ? warning(state === undefined, 'Hash history cannot push state; it is ignored') : void 0;
    var action = 'PUSH';
    var location = createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);
        var prevIndex = allPaths.lastIndexOf(createPath(history.location));
        var nextPaths = allPaths.slice(0, prevIndex + 1);
        nextPaths.push(path);
        allPaths = nextPaths;
        setState({
          action: action,
          location: location
        });
      } else {
        process.env.NODE_ENV !== "production" ? warning(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack') : void 0;
        setState();
      }
    });
  }

  function replace(path, state) {
    process.env.NODE_ENV !== "production" ? warning(state === undefined, 'Hash history cannot replace state; it is ignored') : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf(createPath(history.location));
      if (prevIndex !== -1) allPaths[prevIndex] = path;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
    process.env.NODE_ENV !== "production" ? warning(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : void 0;
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(HashChangeEvent$1, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(HashChangeEvent$1, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
}
/**
 * Creates a history object that stores locations in memory.
 */


function createMemoryHistory(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      getUserConfirmation = _props.getUserConfirmation,
      _props$initialEntries = _props.initialEntries,
      initialEntries = _props$initialEntries === void 0 ? ['/'] : _props$initialEntries,
      _props$initialIndex = _props.initialIndex,
      initialIndex = _props$initialIndex === void 0 ? 0 : _props$initialIndex,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var transitionManager = createTransitionManager();

  function setState(nextState) {
    _extends(history, nextState);

    history.length = history.entries.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? createLocation(entry, undefined, createKey()) : createLocation(entry, undefined, entry.key || createKey());
  }); // Public interface

  var createHref = createPath;

  function push(path, state) {
    process.env.NODE_ENV !== "production" ? warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;
      var nextEntries = history.entries.slice(0);

      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  }

  function replace(path, state) {
    process.env.NODE_ENV !== "production" ? warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      history.entries[history.index] = location;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);
    var action = 'POP';
    var location = history.entries[nextIndex];
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  }

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    return transitionManager.setPrompt(prompt);
  }

  function listen(listener) {
    return transitionManager.appendListener(listener);
  }

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };
  return history;
}

var history = /*#__PURE__*/Object.freeze({
	createBrowserHistory: createBrowserHistory,
	createHashHistory: createHashHistory,
	createMemoryHistory: createMemoryHistory,
	createLocation: createLocation,
	locationsAreEqual: locationsAreEqual,
	parsePath: parsePath,
	createPath: createPath
});

var reactQueryParams = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
/*
  Copyright (c) 2017 Jeff Butsch

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/





function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isUndefined(value) {
  return value === undefined;
}

function isNil(value) {
  // eslint-disable-next-line
  return value == null;
}

function isObject(value) {
  var type = typeof value === "undefined" ? "undefined" : _typeof(value);
  // eslint-disable-next-line
  return value != null && (type == "object" || type == "function");
}

function startsWith(value, searchString, position) {
  position = position || 0;
  return value.substr(position, searchString.length) === searchString;
}

function endsWith(value, searchString, position) {
  var subjectString = value.toString();
  if (typeof position !== "number" || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
    position = subjectString.length;
  }
  position -= searchString.length;
  var lastIndex = subjectString.lastIndexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}

/**
 * React Query Params Component base class
 * Support: https://github.com/jeff3dx/react-query-params
 */

var ReactQueryParams = function (_Component) {
  _inherits(ReactQueryParams, _Component);

  function ReactQueryParams(router) {
    _classCallCheck(this, ReactQueryParams);

    var _this = _possibleConstructorReturn(this, (ReactQueryParams.__proto__ || Object.getPrototypeOf(ReactQueryParams)).call(this));

    if (_this.context && _this.context.router) {
      _this.history = _this.context.router;
    } else {
      _this.history = (0, history.createBrowserHistory)();
    }
    return _this;
  }

  /* Clear the query param cache */


  _createClass(ReactQueryParams, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate() {
      this._queryParamsCache = null;

      if (_get(ReactQueryParams.prototype.__proto__ || Object.getPrototypeOf(ReactQueryParams.prototype), "componentWillUpdate", this)) {
        _get(ReactQueryParams.prototype.__proto__ || Object.getPrototypeOf(ReactQueryParams.prototype), "componentWillUpdate", this).call(this);
      }
    }

    /**
     * Convert boolean string to boolean type.
     * Any query param set to "true" or "false" will be converted to a boolean type.
     * @param {string} value - the query param string value
     */

  }, {
    key: "_boolify",
    value: function _boolify(value) {
      if (typeof value === "string") {
        var value2 = value.toLowerCase().trim();
        if (value2 === "true") {
          return true;
        } else if (value2 === "false") {
          return false;
        }
      }
      return value;
    }

    /**
     * If query param string is object-like try to parse it
     */

  }, {
    key: "_queryParamToObject",
    value: function _queryParamToObject(value) {
      var result = value;
      if (typeof value === "string" && (startsWith(value, "[") && endsWith(value, "]") || startsWith(value, "{") && endsWith(value, "}"))) {
        try {
          result = JSON.parse(decodeURIComponent(value));
        } catch (ex) {
          console.error(ex);
          // Can't parse so fall back to verbatim value
          result = value;
        }
      }
      return result;
    }
  }, {
    key: "_resolveSearchParams",
    value: function _resolveSearchParams() {
      var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

      var searchParams = {};

      if (source.location.query) {
        searchParams = source.location.query;
      } else if (source.location.search) {
        var queryString = (source.location.search || '').replace('?', '');

        searchParams = queryString.split('&').filter(function (pair) {
          return !!pair && ~pair.indexOf('=');
        }).map(function (pair) {
          return pair.split('=');
        }).reduce(function (aggregated) {
          var current = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

          aggregated[current[0]] = current[1];
          return aggregated;
        }, searchParams);
      }
      return searchParams;
    }

    /**
     * Returns a map of all query params including default values. Params that match
     * the default value do not show up in the URL but are still available here.
     */

  }, {
    key: "getQueryParam",


    /**
     * Get one query param value.
     * @param {string} key - The query param key
     * @param {object} props - Optional. An alternate props object to use instead of the current props
     */
    value: function getQueryParam(key) {
      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

      var defaults = this.defaultQueryParams || {};
      var searchParams = this._resolveSearchParams(source);
      var result = isUndefined(searchParams[key]) ? searchParams[key] : defaults[key];
      result = this._boolify(result);
      result = this._queryParamToObject(result);
      return result;
    }

    /**
     * Set query param values. Merges changes similar to setState().
     * @param {object} params - Object of key:values to overlay on current query param values.
     * @param {boolean} addHistory - true = add browser history, default false.
     */

  }, {
    key: "setQueryParams",
    value: function setQueryParams(params) {
      var addHistory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var searchParams = this._resolveSearchParams();

      var nextQueryParams = _extends({}, searchParams, params);
      var defaults = this.defaultQueryParams || {};

      Object.keys(nextQueryParams).forEach(function (key) {
        // If it's an object value (object, array, etc.) convert it to a string
        if (isObject(nextQueryParams[key])) {
          try {
            nextQueryParams[key] = JSON.stringify(nextQueryParams[key]);
          } catch (ex) {
            console.log("react-query-params -- Failed to serialize queryParam " + key, ex);
            nextQueryParams[key] = "";
          }
        }
        // Remove params that match the default
        if (nextQueryParams[key] === defaults[key]) {
          delete nextQueryParams[key];
        }
      });

      var search = "?" + Object.keys(nextQueryParams).map(function (key) {
        return key + "=" + nextQueryParams[key];
      }).join("&");

      if (addHistory) {
        this.history.push({ pathname: window.location.pathname, search: search });
      } else {
        this.history.replace({ pathname: window.location.pathname, search: search });
      }

      // Clear the cache
      this._queryParamsCache = null;

      this.forceUpdate();
    }
  }, {
    key: "queryParams",
    get: function get() {
      var _this2 = this;

      if (isNil(this._queryParamsCache)) {
        var searchParams = this._resolveSearchParams();

        var defaults = this.defaultQueryParams || {};
        var all = _extends({}, defaults, searchParams);
        Object.keys(all).forEach(function (key) {
          all[key] = _this2._boolify(all[key]);
          all[key] = _this2._queryParamToObject(all[key]);
        });
        this._queryParamsCache = all;
      }
      return this._queryParamsCache;
    }
  }]);

  return ReactQueryParams;
}(React__default.Component);

exports.default = ReactQueryParams;
});

var ReactQueryParams = unwrapExports(reactQueryParams);

var serverUrl = "https://www.adserving247.com";

var sendLead = function sendLead(endPoint, leadData) {
    return postData(endPoint, leadData).then(function (res) {
        return res;
    });
};

var postData = function postData() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return fetch(serverUrl + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data)
    }).then(function (res) {
        return res.json();
    }).catch(function (res) {
        return res;
    });
};

function csvJSON(csv) {
    var lines = csv.split('\n');
    var result = [];
    var headers = lines[0].split(',');

    for (var i = 1; i < lines.length; i++) {
        if (!lines[i]) continue;
        var obj = {};
        var currentline = lines[i].split(',');

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
}

var checkPasswordLength = function checkPasswordLength(input) {

    if (input.length === 8) {
        return true;
    } else {
        return false;
    }
};

var checkSpecial = function checkSpecial(input) {
    return input.length > 0 && !/[^a-zA-Z0-9\-\/]/.test(input);
};

var checkLetter = function checkLetter(input) {

    if (input.length > 0) {
        return input.toUpperCase() != input;
    }

    return false;
};

var checkCap = function checkCap(input) {

    var bool = false;

    if (input.length > 0) {
        for (var i = 0; i <= input.length; i++) {
            if (!/[^A-Z\-\/]/.test(input[i])) {
                bool = true;
            }
        }
    }

    return bool;
};

var checkNumber = function checkNumber(input) {

    var bool = false;

    if (input.length > 0) {
        for (var i = 0; i <= input.length; i++) {
            if (!/[^0-9\-\/]/.test(input[i])) {
                bool = true;
            }
        }
    }

    return bool;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends$1 = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var LpFramework = function (_ReactQueryParams) {
  inherits(LpFramework, _ReactQueryParams);

  function LpFramework(props) {
    classCallCheck(this, LpFramework);

    var _this = possibleConstructorReturn(this, (LpFramework.__proto__ || Object.getPrototypeOf(LpFramework)).call(this, props));

    _this.sBidTrackingLoaded = function () {
      _this.setState({
        leadData: _extends$1({}, _this.state.leadData, { click_id: window.sbidTracking ? window.sbidTracking.getSession() : "" })
      }, function () {});
    };

    _this.updateStateByLanguage = function (lang, countryCode, phonePrefix) {
      var defaultLangJson = _this.state.languages['en'];

      switch (lang) {
        default:
          _this.updateState(countryCode, defaultLangJson, phonePrefix, 'en');
          break;
        case 'DK':
          var langJsonDa = _this.state.languages['da'] ? _this.state.languages['da'] : defaultLangJson;

          _this.updateState(countryCode, langJsonDa, phonePrefix, 'da');
          break;
        case 'NO':
          var langJsonNo = _this.state.languages['no'] ? _this.state.languages['no'] : defaultLangJson;

          _this.updateState(countryCode, langJsonNo, phonePrefix, 'no');
          break;
        case 'EN':
          var langJsonEn = _this.state.languages['en'] ? _this.state.languages['en'] : defaultLangJson;

          _this.updateState(countryCode, langJsonEn, phonePrefix, 'en');
          break;
        case 'NL':
          var langJsonNl = _this.state.languages['nl'] ? _this.state.languages['nl'] : defaultLangJson;

          _this.updateState(countryCode, langJsonNl, phonePrefix, 'nl');
          break;
        case 'AU':
          var langJsonAu = _this.state.languages['en'] ? _this.state.languages['en'] : defaultLangJson;

          _this.updateState(countryCode, langJsonAu, phonePrefix, 'en');
          break;
        case 'SG':
          var langJsonSg = _this.state.languages['en'] ? _this.state.languages['en'] : defaultLangJson;

          _this.updateState(countryCode, langJsonSg, phonePrefix, 'en');
          break;
        case 'FI':
          var langJsonFi = _this.state.languages['fi'] ? _this.state.languages['fi'] : defaultLangJson;

          _this.updateState(countryCode, langJsonFi, phonePrefix, 'fi');
          break;
        case 'SV':
          var langJsonSv = _this.state.languages['sv'] ? _this.state.languages['sv'] : defaultLangJson;

          _this.updateState(countryCode, langJsonSv, phonePrefix, 'sv');
          break;
        case 'DE':
          var langJsonDe = _this.state.languages['de'] ? _this.state.languages['de'] : defaultLangJson;

          _this.updateState(countryCode, langJsonDe, phonePrefix, 'de');
          break;
        case 'PL':
          var langJsonPl = _this.state.languages['pl'] ? _this.state.languages['pl'] : defaultLangJson;

          _this.updateState(countryCode, langJsonPl, phonePrefix, 'pl');
          break;
        case 'ES':
          var langJsonEs = _this.state.languages['es'] ? _this.state.languages['es'] : defaultLangJson;

          _this.updateState(countryCode, langJsonEs, phonePrefix, 'es');
          break;
      }
    };

    _this.handleLeadStep = function (data) {

      if (window.sbidTracking) {
        window.sbidTracking.settings.params.email = _this.state.email;
        window.sbidTracking.settings.params.fname = _this.state.fname;
        window.sbidTracking.settings.params.lname = _this.state.lname;
        window.sbidTracking.track({ e: 'lead_next1' });
      }
      sendLead('/lead_first_step', _this.state.leadData).then(function (res) {
        if (window.sbidTracking) {
          window.sbidTracking.settings.params.lead_id_first_step = res.leadid;
          window.sbidTracking.track({ e: 'lead_next1' });
        }

        _this.setState({
          leadData: _extends$1({}, _this.state.leadData, data)
        }, function () {});
      });
    };

    _this.validateParams = function (params) {

      var errors = [];
      Object.keys(params).forEach(function (p) {

        if (p === "email") {
          if (params[p].length === 0) {
            errors.push("Email is empty");
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(params[p])) {
            errors.push("Invalid email format");
          }
        } else if (p === "last_name") {
          if (params[p].length === 0) {
            errors.push("Last name is empty");
          }
          if (!/^([^0-9]*)$/.test(params[p])) {
            errors.push("Please enter last name without digits");
          }
        } else if (p === "first_name") {
          if (params[p].length === 0) {
            errors.push("First name is empty");
          }
          if (!/^([^0-9]*)$/.test(params[p])) {
            errors.push("Please enter first name without digits");
          }
        } else if (p === "password") {
          if (params[p].length === 0) {
            errors.push("Password is empty");
          }
          // Check if between 8 and 12 letters
          if (!checkPasswordLength(params[p])) {
            errors.push("The password must be 8 characters long");
          }

          // Check if contains special characters
          if (!checkSpecial(params[p])) {
            errors.push("Must not contain special characters");
          }

          // Check if has at least 1 lowercase letter
          if (!checkLetter(params[p])) {
            errors.push("Must contain at least 1 small letter");
          }

          // Check if has at least 1 capital
          if (!checkCap(params[p])) {
            errors.push("Must contain at least 1 capital letter");
          }

          // Check if contains a number
          if (!checkNumber(params[p])) {
            errors.push("Must contain at least 1 number");
          }
        } else if (p === "agree_2") {
          if (!params[p]) {
            errors.push("Please accept conditions if you want to proceed");
          }
        }
      });

      return {
        success: errors.length === 0,
        errors: errors
      };
    };

    _this.handleSubmit = function (data) {
      if (window.sbidTracking) {
        window.sbidTracking.settings.params.phone_number = data.phone_number;
      }

      var phoneNumber = {
        phone_number: data.phone_number
      };
      if (!data.phone_country_prefix) {
        phoneNumber = {
          phone_number: _this.state.leadData.phone_country_prefix + data.phone_number
        };
      }

      _this.setState({
        leadData: _extends$1({}, _this.state.leadData, data, phoneNumber)

      }, function () {

        console.log(_this.state.leadData);
        sendLead('/leads', _this.state.leadData).then(function (res) {

          if (window.sbidTracking) {
            window.sbidTracking.track({ e: 'lead_submit' });
          }

          if (res.success !== undefined) {
            if (res.success === false) {

              if (window.sbidTracking) {
                window.sbidTracking.settings.params.lead_id = res.leadid;
                window.sbidTracking.settings.params.lead_status = "0";
              }

              alert("Due to recent regulatory restriction in your country " + "we are unable to connect you " + "to a suitable brokerage firm. We will contact once the situation will be changed.");

              // alert(response.redirectUrl);
            } else {
              if (_this.queryParams.pxl) {
                var iFrame = document.createElement('iframe');
                iFrame.setAttribute("src", decodeURIComponent(_this.queryParams.pxl));
                iFrame.style.height = "1px";
                iFrame.style.width = "1px";
                document.body.appendChild(iFrame);
              }

              if (window.sbidTracking) {
                window.sbidTracking.settings.params.lead_id = res.leadid;

                window.sbidTracking.settings.params.lead_status = "1";
              }
              window.location.replace(res.redirectUrl);
            }
          } else {
            if (window.sbidTracking) {
              window.sbidTracking.settings.params.lead_status = "0";
            }
            alert("Due to recent regulatory restriction in your country " + "we are unable to connect you " + "to a suitable brokerage firm. We will contact once the situation will be changed.");
          }
        });
      });
    };

    _this.readTextFile = function (file, callback) {
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, false);
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            var allText = rawFile.responseText;

            var countriesJSON = csvJSON(allText);
            _this.setState({
              countriesData: countriesJSON
            }, function () {
              callback();
            });
          }
        }
      };
      rawFile.send(null);
    };

    _this.handleChange = function (value) {
      _this.setState(defineProperty({}, value, value));
    };

    _this.state = {
      languages: null,
      languageJson: null,
      countryCode: "en",
      page: 'main',
      leadData: {
        account_id: _this.queryParams.acc ? parseInt(_this.queryParams.acc) : 89,
        click_id: window.sbidTracking ? window.sbidTracking.getSession() : "",
        phone_country_prefix: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        campaign: _this.queryParams.camp ? parseInt(_this.queryParams.camp) : 1,
        dp1: _this.queryParams.dp1 ? _this.queryParams.dp1 : "",
        dp2: _this.queryParams.dp2 ? _this.queryParams.dp2 : "",
        dp3: _this.queryParams.dp3 ? _this.queryParams.dp3 : "",
        dp4: _this.queryParams.dp4 ? _this.queryParams.dp4 : "",
        dp5: _this.queryParams.dp5 ? _this.queryParams.dp5 : "",
        password: "",
        publisher_click_id: _this.queryParams.pub_cid ? _this.queryParams.pub_cid : "",
        page_url: window.location.toString(),
        ref_url: "",
        language: navigator.language.split('-')[0],
        funnel_name: props.funnel_name,
        validation: _this.queryParams.validation ? parseInt(_this.queryParams.validation.toString()) : 1,
        pixel: _this.queryParams.pxl ? _this.queryParams.pxl : ""

      }
    };
    return _this;
  }

  createClass(LpFramework, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (window.location.host.indexOf("localhost") > -1) {
        this.setQueryParams({
          validation: 3
        });
      }

      var script = document.createElement("script");

      script.src = "https://d2tjvvl6yqo45i.cloudfront.net/analytics/" + this.state.leadData.account_id + "/script.js";
      script.async = true;

      document.body.appendChild(script);

      window.sbidTracking = window.sbidTracking || { q: [], track: function track(data) {
          this.q.push(data);
        }, getSession: function getSession() {
          return '-1';
        } };
      //track regular pageview
      sbidTracking.track();

      window.sbidTracking.settings = {
        params: {
          lead_status: "0"
        }
      };

      this.setState({ languages: this.props.resourceFile });

      this.sBidTrackingLoaded();

      if (document.getElementById("sb_trk")) {
        document.getElementById("sb_trk").addEventListener("tracking_loaded", this.sBidTrackingLoaded);
      }

      var file = require("./countries.csv");

      this.readTextFile(file, function () {
        if (_this2.queryParams.lan) {
          var country = _this2.state.countriesData.filter(function (c) {
            return c["ISO 3166-1 2 Letter Code"] === _this2.queryParams.lan.toUpperCase();
          })[0];

          if (country) {
            var lang = country["ISO 3166-1 2 Letter Code"];
            var countryCode = country["ISO 3166-1 2 Letter Code"];
            var phonePrefix = country["ITU-T Telephone Code"];

            _this2.updateStateByLanguage(lang, countryCode, phonePrefix);
          } else {
            _this2.updateStateByLanguage('DK', 'DK', '45');
          }
        } else {
          postData('/language').then(function (res) {
            var phonePrefix = '+' + _this2.state.countriesData.filter(function (c) {
              return c["ISO 3166-1 2 Letter Code"] === res.countryCode;
            })[0]['ITU-T Telephone Code'];
            _this2.updateStateByLanguage(res.lang, res.countryCode, phonePrefix);
            return res.countryCode;
          });
        }
      });
    }
  }, {
    key: 'updateState',
    value: function updateState(countryCode, languageJson, phonePrefix, lang) {
      this.setState({
        languageJson: languageJson,
        countryCode: countryCode,
        leadData: _extends$1({}, this.state.leadData, {
          phone_country_prefix: (phonePrefix.indexOf("+") > 0 ? "+" : "") + (phonePrefix ? phonePrefix.toString() : ""),
          language: lang
        })
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var currentLanguageJson = this.state.languageJson;

      var languageManager = function languageManager(item) {
        if (item) {
          return currentLanguageJson[item];
        } else {
          return currentLanguageJson;
        }
      };

      // console.log(this.state.languageJson);
      // console.log(this.state.languages);

      var childrenWithProps = React__default.Children.map(this.props.children, function (child) {
        return React__default.cloneElement(child, {
          languageManager: languageManager,
          onSubmitLead: _this3.handleSubmit,
          handleLeadStep: _this3.handleLeadStep,
          validateParams: _this3.validateParams,
          language: _this3.state.leadData.language,
          phone_country_prefix: _this3.state.leadData.phone_country_prefix,
          countryCode: _this3.state.countryCode
        });
      });

      if (languageManager()) {
        return React__default.createElement(
          'div',
          null,
          childrenWithProps
        );
      } else {
        return null;
      }
    }
  }]);
  return LpFramework;
}(ReactQueryParams);

LpFramework.propTypes = {
  children: PropTypes.element.isRequired,
  funnel_name: PropTypes.element.isRequired
};


var LpFrameworkWrapper = function LpFrameworkWrapper(_ref) {
  var onSubmitLead = _ref.onSubmitLead,
      funnel_name = _ref.funnel_name,
      languageManager = _ref.languageManager,
      handleLeadStep = _ref.handleLeadStep,
      validateParams = _ref.validateParams,
      language = _ref.language,
      phone_country_prefix = _ref.phone_country_prefix,
      countryCode = _ref.countryCode,
      Component = _ref.Component;
  return React__default.createElement(Component, {
    onSubmit: onSubmitLead,
    languageManager: languageManager,
    validateParams: validateParams,
    handleLeadStep: handleLeadStep,
    language: language,
    phone_country_prefix: phone_country_prefix,
    countryCode: countryCode
  });
};

exports.default = LpFramework;
exports.LpFrameworkWrapper = LpFrameworkWrapper;
//# sourceMappingURL=index.js.map
