/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _MaskInput = __webpack_require__(2);

var _MaskInput2 = _interopRequireDefault(_MaskInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MaskInput = new _MaskInput2.default(document.querySelector('.js-input'), {
  mask: '0000-0000-0000-0000'
});

var MaskInput2 = new _MaskInput2.default(document.querySelector('.js-input-mask'), {
  mask: '0000-0000-0000-0000',
  alwaysShowMask: true,
  maskChar: '_'
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    USER: 1,
    CHAR: 2,
    MASK: 3
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inputCore = __webpack_require__(6);

var _subscribeEvent = __webpack_require__(7);

var _subscribeEvent2 = _interopRequireDefault(_subscribeEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KEYBOARD = {
  BACKSPACE: 8,
  DELETE: 46
};
/**
 * Adapter of react-maskInput to vanilaJs
 */

var MaskInput = function () {
  function MaskInput(element, _ref) {
    var _this = this;

    var _ref$mask = _ref.mask,
        mask = _ref$mask === undefined ? _inputCore.defaults.mask : _ref$mask,
        _ref$value = _ref.value,
        value = _ref$value === undefined ? '' : _ref$value,
        reformat = _ref.reformat,
        maskString = _ref.maskString,
        _ref$maskChar = _ref.maskChar,
        maskChar = _ref$maskChar === undefined ? _inputCore.defaults.maskChar : _ref$maskChar,
        _ref$maskFormat = _ref.maskFormat,
        maskFormat = _ref$maskFormat === undefined ? _inputCore.defaults.maskFormat : _ref$maskFormat,
        showMask = _ref.showMask,
        alwaysShowMask = _ref.alwaysShowMask,
        onChange = _ref.onChange;

    _classCallCheck(this, MaskInput);

    this.showValue = function () {
      if (_this.showMask && (_this.canSetSelection || _this.props.alwaysShowMask)) {
        _this.element.value = _this.input.getMaskedValue();
        return;
      }
      _this.element.value = _this.input.getVisibleValue();
    };

    this.setSelection = function () {
      if (!_this.canSetSelection) {
        return;
      }
      var selection = _this.input.getSelection();
      _this.element.setSelectionRange(selection.start, selection.end);

      var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (fn) {
        return setTimeout(fn, 0);
      };
      // For android
      raf(function () {
        return _this.element.setSelectionRange(selection.start, selection.end);
      });
    };

    this.onPaste = function (e) {
      e.preventDefault();
      _this.getSelection();

      // getData value needed for IE also works in FF & Chrome
      _this.input.paste(e.clipboardData.getData('Text'));

      _this.showValue();

      // Timeout needed for IE
      setTimeout(_this.setSelection, 0);

      _this.props.onChange && _this.props.onChange(e);
    };

    this.onChange = function (e) {
      var currentValue = void 0;
      if (_this.showMask && (_this.canSetSelection || _this.props.alwaysShowMask)) {
        currentValue = _this.input.getMaskedValue();
      } else {
        currentValue = _this.input.getVisibleValue();
      }

      // fix conflict by update value in mask model
      if (e.target.value !== currentValue) {
        _this.getSelection();
        _this.input.setValue(e.target.value);

        _this.showValue();

        setTimeout(_this.setSelection, 0);
      }
      _this.props.onChange && _this.props.onChange(e);
    };

    this.onKeyPress = function (e) {
      if (e.metaKey || e.altKey || e.ctrlKey || e.key === 'Enter') {
        return;
      }

      e.preventDefault();
      _this.getSelection();
      _this.input.input(e.key || e.data || String.fromCharCode(e.which));
      _this.showValue();
      _this.setSelection();
      _this.props.onChange && _this.props.onChange(e);
    };

    this.onKeyDown = function (e) {
      if (e.which === KEYBOARD.BACKSPACE) {
        e.preventDefault();
        _this.getSelection();
        _this.input.removePreviosOrSelected();

        _this.showValue();
        _this.setSelection();

        _this.props.onChange && _this.props.onChange(e);
      }

      if (e.which === KEYBOARD.DELETE) {
        e.preventDefault();
        _this.getSelection();
        _this.input.removeNextOrSelected();

        _this.showValue();
        _this.setSelection();

        _this.props.onChange && _this.props.onChange(e);
      }
    };

    this.onFocus = function () {
      _this.canSetSelection = true;
    };

    this.onBlur = function () {
      _this.canSetSelection = false;
    };

    this.input = this.input = (0, _inputCore.createInput)({
      value: value,
      reformat: reformat,
      maskString: maskString,
      maskChar: maskChar,
      mask: mask,
      maskFormat: maskFormat
    });

    this.props = {
      mask: mask,
      value: value,
      reformat: reformat,
      maskChar: maskChar,
      maskFormat: maskFormat,
      maskString: maskString,
      showMask: showMask,
      alwaysShowMask: alwaysShowMask,
      onChange: onChange
    };

    this.showMask = alwaysShowMask || showMask;

    this.element = element;
    this.showValue();
    this.subscribe();
  }

  _createClass(MaskInput, [{
    key: 'getSelection',
    value: function getSelection() {
      this.input.setSelection({
        start: this.element.selectionStart,
        end: this.element.selectionEnd
      });
    }
  }, {
    key: 'subscribe',
    value: function subscribe() {
      this.unsubscribe = {
        onPaste: (0, _subscribeEvent2.default)(this.element, 'paste', this.onPaste),
        onKeyDown: (0, _subscribeEvent2.default)(this.element, 'keydown', this.onKeyDown),
        onKeyPress: (0, _subscribeEvent2.default)(this.element, this.keyPressPropName(), this.onKeyPress),
        onChange: (0, _subscribeEvent2.default)(this.element, 'change', this.onChange),
        onFocus: (0, _subscribeEvent2.default)(this.element, 'focus', this.onFocus),
        onBlur: (0, _subscribeEvent2.default)(this.element, 'blur', this.onBlur)
      };
    }
  }, {
    key: 'keyPressPropName',
    value: function keyPressPropName() {
      if (typeof navigator !== 'undefined' && navigator.userAgent.match(/Android/i)) {
        return 'beforeinput';
      }
      return 'keypress';
    }
  }, {
    key: 'setProps',
    value: function setProps(_ref2) {
      var mask = _ref2.mask,
          value = _ref2.value,
          reformat = _ref2.reformat,
          maskString = _ref2.maskString,
          maskChar = _ref2.maskChar,
          maskFormat = _ref2.maskFormat,
          showMask = _ref2.showMask,
          alwaysShowMask = _ref2.alwaysShowMask,
          onChange = _ref2.onChange;

      var updated = false;

      if (this.props.onChange !== onChange) {
        this.props.onChange = onChange;
      }

      if (this.props.alwaysShowMask !== alwaysShowMask || this.props.showMask !== showMask) {
        this.showMask = alwaysShowMask || showMask;

        this.props.alwaysShowMask = alwaysShowMask;
        this.props.showMask = showMask;

        updated = true;
      }

      if (maskFormat && maskFormat !== this.props.maskFormat) {
        this.input.setMaskFormat(maskFormat);

        this.props.maskFormat = maskFormat;

        updated = true;
      }

      if (mask !== this.props.mask) {
        this.input.setMask(mask);

        this.props.mask = mask;

        updated = true;
      }

      if (maskString !== this.props.maskString) {
        this.input.setMaskString(maskString);

        this.props.maskString = maskString;

        updated = true;
      }

      if (maskChar !== this.props.maskChar) {
        this.input.setMaskChar(maskChar);

        this.props.maskChar = maskChar;

        updated = true;
      }

      if (reformat !== this.props.reformat) {
        this.input.setReformat(reformat);

        this.props.reformat = reformat;

        updated = true;
      }

      if (value !== this.props.value) {
        this.input.setValue(value);

        this.props.value = value;

        updated = true;
      }

      if (updated) {
        this.showValue();
        this.setSelection();
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.unsubscribe.onPaste();
      this.unsubscribe.onKeyDown();
      this.unsubscribe.onKeyPress();
      this.unsubscribe.onChange();
      this.unsubscribe.onFocus();
      this.unsubscribe.onBlur();
    }
  }]);

  return MaskInput;
}();

exports.default = MaskInput;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = defineMaskList;
/**
 *
 * @param {String} mask
 * @param format
 * @returns {Array}
 */
function defineMaskList(mask, format) {
    if (!mask) {
        return [];
    }

    var stack = [];
    var escape = false;

    for (var i = 0; i < mask.length; i++) {
        var item = format[mask[i]];
        if (escape && item) {
            item = null;
            escape = false;
        }
        if (!item) {
            if (!escape && mask[i] === '\\') {
                escape = true;
                continue;
            }
            escape = false;
            stack.push({
                char: mask[i],
                next: null
            });
        } else if (item.regexp) {
            stack.push(item);
        }
    }

    return stack;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = inputValue;

var _charTypesEnum = __webpack_require__(1);

var _charTypesEnum2 = _interopRequireDefault(_charTypesEnum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inputValue(_ref) {
    var data = _ref.data,
        _ref$input = _ref.input,
        input = _ref$input === undefined ? '' : _ref$input,
        selection = _ref.selection,
        mask = _ref.mask,
        maskChar = _ref.maskChar,
        maskString = _ref.maskString;

    var value = [];
    var maskedValue = '';

    var maskIndex = 0;
    var valueIndex = 0;
    var pastedIndex = 0;

    var inputValuesApplied = 0;

    while (mask[maskIndex]) {
        var item = data.length > valueIndex ? data[valueIndex] : null;
        var maskPart = mask[maskIndex];

        var pastedValuesStack = null;
        if (selection.start <= maskIndex && pastedIndex < input.length) {
            pastedValuesStack = input.slice(pastedIndex);
        }

        // Обработка захардкоженных в маску символов. 
        if (maskPart.char) {
            // Если есть вводимые пользователем значение, в первую очередь проверяем его.
            // Но не проверяем по всему стеку.
            if (pastedValuesStack && pastedValuesStack[0] === maskPart.char) {
                pastedIndex++;
            } else {
                if (item && (item.char === maskPart.char || item.type !== _charTypesEnum2.default.USER) || input) {
                    valueIndex++;
                }
            }

            value.push({
                char: maskPart.char,
                type: _charTypesEnum2.default.CHAR
            });

            if (pastedValuesStack) {
                inputValuesApplied++;
            }

            maskedValue += maskPart.char;
        }

        // Кастомный текст
        if (maskPart.regexp) {
            var part = null;

            // Если есть вводимое пользователем значение, то проверям его. 
            // Причем пробегаемся по стеку вводимых значений, пока не найдем нужное
            if (pastedValuesStack) {
                var i = 0;
                while (!maskPart.regexp.test(pastedValuesStack[i]) && pastedValuesStack.length > i) {
                    i++;
                    pastedIndex++;
                }
                if (pastedValuesStack.length > i) {
                    pastedIndex++;
                    inputValuesApplied++;

                    // Игнорируем предыдущее значение в инпуте
                    valueIndex++;

                    part = pastedValuesStack[i];
                    value.push({
                        char: part,
                        type: _charTypesEnum2.default.USER
                    });
                    maskedValue += part;
                }
            }

            // В пользовательском вводе нет или невалидные данные. Пытаемся аплаить те данные, что были раньше или заменяем на плейсхолдер
            if (!part) {
                // Если произошел сдвиг, пропускаем лишнее значение
                if (item && item.type === _charTypesEnum2.default.CHAR && data.length > valueIndex + 1) {
                    valueIndex++;
                    continue;
                }
                if (item && item.type === _charTypesEnum2.default.USER && maskPart.regexp.test(item.char)) {
                    value.push({
                        char: item.char,
                        type: _charTypesEnum2.default.USER
                    });
                    maskedValue += item.char;
                    valueIndex++;
                } else {
                    part = maskString ? maskString[maskIndex] : maskChar;

                    value.push({
                        char: part,
                        type: _charTypesEnum2.default.MASK
                    });

                    if (data.length > maskIndex) {
                        valueIndex++;
                    }

                    maskedValue += part;
                }
            }
        }

        maskIndex++;
    }

    var selectionPosition = selection.start + inputValuesApplied;

    // Удаляем все ведующие maskChar
    var bound = value.length - 1;
    var charsCount = 0;
    while (bound >= 0 && value[bound].type !== _charTypesEnum2.default.USER) {
        if (value[bound].type === _charTypesEnum2.default.MASK) {
            charsCount = 0;
        }
        if (value[bound].type === _charTypesEnum2.default.CHAR) {
            charsCount++;
        }
        bound--;
    }
    bound += charsCount;

    var visibleValue = '';
    for (var _i = 0; _i <= bound; _i++) {
        visibleValue += value[_i].char;
    }

    return {
        value: value,
        visibleValue: visibleValue,
        maskedValue: maskedValue,
        selection: {
            start: selectionPosition,
            end: selectionPosition
        }
    };
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = removeSelectedRange;

var _charTypesEnum = __webpack_require__(1);

var _charTypesEnum2 = _interopRequireDefault(_charTypesEnum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeSelectedRange(_ref) {
    var value = _ref.value,
        selection = _ref.selection,
        reformat = _ref.reformat,
        mask = _ref.mask,
        maskChar = _ref.maskChar,
        maskString = _ref.maskString;

    var copyMaskChar = function copyMaskChar(count) {
        var res = [];
        for (var i = 0; i < count; i++) {
            res.push({
                char: maskChar,
                type: _charTypesEnum2.default.MASK
            });
        }
        return res;
    };

    var pasteMaskSymbols = function pasteMaskSymbols() {
        if (reformat) {
            return '';
        }

        if (maskString) {
            var res = [];
            for (var i = selection.start; i < selection.end; i++) {
                res.push({
                    char: maskString[i],
                    type: _charTypesEnum2.default.MASK
                });
            }
            return res;
        }

        return copyMaskChar(selection.end - selection.start);
    };

    if (selection.end < selection.start) {
        var tmp = selection.end;
        selection.end = selection.start;
        selection.start = tmp;
    }

    if (selection.start === selection.end) {
        return value;
    }

    if (value.length > selection.start) {
        return value.slice(0, selection.start).concat(pasteMaskSymbols(), value.slice(selection.end, value.length));
    }

    return value;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createInput = exports.defaults = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _defineMaskList = __webpack_require__(3);

var _defineMaskList2 = _interopRequireDefault(_defineMaskList);

var _inputValue = __webpack_require__(4);

var _inputValue2 = _interopRequireDefault(_inputValue);

var _removeSelectedRange = __webpack_require__(5);

var _removeSelectedRange2 = _interopRequireDefault(_removeSelectedRange);

var _charTypesEnum = __webpack_require__(1);

var _charTypesEnum2 = _interopRequireDefault(_charTypesEnum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputCore = function () {
    function InputCore(_ref) {
        var value = _ref.value,
            mask = _ref.mask,
            reformat = _ref.reformat,
            maskFormat = _ref.maskFormat,
            maskChar = _ref.maskChar,
            maskString = _ref.maskString;

        _classCallCheck(this, InputCore);

        if (maskString && maskString.length !== mask.length) {
            throw new Error('maskString must have same length as mask');
        }
        if (maskChar.length > 1) {
            throw new Error('maskChar must have only 1 char');
        }
        this._maskString = maskString;
        this._maskChar = maskChar;
        this._reformat = reformat;
        this.selection = { start: 0, end: 0 };

        this.setMaskFormat(maskFormat);
        this._mask = (0, _defineMaskList2.default)(mask, this._maskFormat);

        this.setValue(value);
    }

    /**
     * Заполняет _maskFormat, который является объектом byId объектов
     * @param {Array} maskFormat     
     */


    _createClass(InputCore, [{
        key: 'setMaskFormat',
        value: function setMaskFormat(maskFormat) {
            this._maskFormat = maskFormat.reduce(function (store, item) {
                store[item.str] = item;
                return store;
            }, {});
        }
    }, {
        key: 'input',
        value: function input(_input) {
            var _value = this._value;

            var result = void 0;

            if (this._reformat) {
                result = this._reformat({
                    data: _value,
                    input: _input,
                    selection: this.selection
                });
            } else {

                _value = (0, _removeSelectedRange2.default)({
                    value: _value,
                    selection: this.selection,
                    mask: this._mask,
                    maskChar: this._maskChar,
                    maskString: this._maskString
                });
                this.selection.end = this.selection.start;

                result = (0, _inputValue2.default)({
                    data: _value,
                    input: _input,
                    selection: this.selection,
                    mask: this._mask,
                    maskChar: this._maskChar,
                    maskString: this._maskString
                });
            }

            this._value = result.value;
            this._maskedValue = result.maskedValue;
            this._visibleValue = result.visibleValue;
            this.setSelection(result.selection);
        }
    }, {
        key: 'setSelection',
        value: function setSelection(_ref2) {
            var start = _ref2.start,
                end = _ref2.end;

            this.selection = {
                start: start,
                end: end
            };
        }
    }, {
        key: 'getSelection',
        value: function getSelection() {
            return {
                start: this.selection.start,
                end: this.selection.end
            };
        }
    }, {
        key: 'backspace',
        value: function backspace() {
            this.removePreviosOrSelected();
        }
    }, {
        key: 'paste',
        value: function paste(value) {
            this.input(value);
        }

        /**
         * Определяет циклический список, в котором учтены циклы маски, по которой будет проходить итерации.
         * @param {String} mask
         * @returns {{head: {}, hasCycle: boolean}}
         */

    }, {
        key: 'setMask',
        value: function setMask(mask) {

            this._mask = (0, _defineMaskList2.default)(mask, this._maskFormat);

            this.setValue(this._value);
        }
    }, {
        key: 'getState',
        value: function getState() {
            return {
                value: this.getValue(),
                maskedValue: this.getMaskedValue(),
                visibleValue: this.getVisibleValue(),
                selection: this.getSelection()
            };
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this._value;
        }
    }, {
        key: 'setReformat',
        value: function setReformat(reformat) {
            this._reformat = reformat;
            this.setValue(this._value);
        }
    }, {
        key: 'getMaskedValue',
        value: function getMaskedValue() {
            return this._maskedValue;
        }
    }, {
        key: 'getVisibleValue',
        value: function getVisibleValue() {
            return this._visibleValue;
        }
    }, {
        key: 'setMaskChar',
        value: function setMaskChar(maskChar) {
            if (maskChar.length > 1) {
                throw new Error('maskChar must have only 1 char');
            }

            this._maskChar = maskChar;

            this.setValue(this._value);
        }
    }, {
        key: 'setMaskString',
        value: function setMaskString(maskString) {
            if (maskString && maskString.length !== this._mask.length) {
                throw new Error('maskString must have same length as mask');
            }

            this._maskString = maskString;

            this.setValue(this._value);
        }
    }, {
        key: 'removePreviosOrSelected',
        value: function removePreviosOrSelected() {
            if (this.selection.start === this.selection.end) {
                this.selection.start = this.selection.end - 1;
                if (this.selection.start < 0) {
                    this.selection.start = 0;
                }
            }

            this.input('');
        }
    }, {
        key: 'removeNextOrSelected',
        value: function removeNextOrSelected() {
            if (this.selection.start === this.selection.end) {
                this.selection.end++;
            }

            this.input('');
        }
    }, {
        key: 'setValue',
        value: function setValue(data) {
            var result = void 0;

            if (this._reformat) {
                result = this._reformat({
                    data: data,
                    selection: this.selection
                });
            } else {
                var dataList = data;
                if (!Array.isArray(dataList)) {
                    dataList = [];
                    for (var i = 0; i < data.length; i++) {
                        dataList.push({
                            char: data[i],
                            type: _charTypesEnum2.default.USER
                        });
                    }
                }
                result = (0, _inputValue2.default)({
                    data: dataList,
                    selection: this.selection,
                    mask: this._mask,
                    maskChar: this._maskChar,
                    maskString: this._maskString
                });
            }

            this._value = result.value;
            this._maskedValue = result.maskedValue;
            this._visibleValue = result.visibleValue;
            this.setSelection(result.selection);
        }
    }]);

    return InputCore;
}();

var defaults = exports.defaults = {
    maskFormat: [{
        str: '0',
        regexp: /[0-9]/
    }, {
        str: '*',
        regexp: /./
    }, {
        str: 'a',
        regexp: /[a-zA-Z]/
    }],
    maskChar: '',
    showMask: false,
    removeSelectedRange: _removeSelectedRange2.default
};

var createInput = exports.createInput = function createInput(_ref3) {
    var value = _ref3.value,
        maskString = _ref3.maskString,
        mask = _ref3.mask,
        reformat = _ref3.reformat,
        _ref3$maskFormat = _ref3.maskFormat,
        maskFormat = _ref3$maskFormat === undefined ? defaults.maskFormat : _ref3$maskFormat,
        _ref3$maskChar = _ref3.maskChar,
        maskChar = _ref3$maskChar === undefined ? defaults.maskChar : _ref3$maskChar;

    var _reformat = reformat;
    var _mask = mask;
    if (!_reformat && !_mask) {
        _reformat = function _reformat(value) {
            return value;
        };
    } else if (_reformat) {
        _mask = null;
    }

    return new InputCore({ value: value, mask: _mask, reformat: _reformat, maskFormat: maskFormat, maskChar: maskChar, maskString: maskString });
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

!function() {
    'use strict';

    function subscribeEvent(element, event, handler, addSubscription, removeSubscription) {
        var unsubscribeFunction = removeSubscription;
        var unsubscribe = function() {
            element[unsubscribeFunction](event, handler);
        };

        if (addSubscription) {
            element[addSubscription](event, handler);
            return unsubscribe;
        }

        if (element.addEventListener) {
            element.addEventListener(event, handler);
            unsubscribeFunction = 'removeEventListener';
            return unsubscribe;

        }
        if (element.attachEvent) {
            event = 'on' + event;
            element.attachEvent(event, handler);
            unsubscribeFunction = 'detachEvent';
            return unsubscribe;
        }
        if (element.on) {
            element.on(event, handler);
            unsubscribeFunction = 'off';
            return unsubscribe;
        }
    }

    function subscribe(element, event, handler) {
        return subscribeEvent(element, event, handler);
    }

    subscribe.define = function(addSubscription, removeSubscription) {
        return function(element, event, handler) {
            return subscribeEvent(element, event, handler, addSubscription, removeSubscription);
        };
    };

    (function(subscribe) {
        if (true) {
            // CommonJS
            module.exports = subscribe;
        } else if (typeof define === 'function' && define.amd) {
            // AMD. anonymous module
            define(subscribe);
        } else {
            // Global scope
            global.subscribeEvent = subscribe;
        }
    })(subscribe);
}();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODkzMzIxODgxZTcwZTYwYTIxNmIiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9pbnB1dC1jb3JlL2xpYi9jb25zdGFudHMvY2hhclR5cGVzRW51bS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTWFza0lucHV0LmpzIiwid2VicGFjazovLy8uL34vaW5wdXQtY29yZS9saWIvZnVuY3Rpb25zL2RlZmluZU1hc2tMaXN0LmpzIiwid2VicGFjazovLy8uL34vaW5wdXQtY29yZS9saWIvZnVuY3Rpb25zL2lucHV0VmFsdWUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pbnB1dC1jb3JlL2xpYi9mdW5jdGlvbnMvcmVtb3ZlU2VsZWN0ZWRSYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2lucHV0LWNvcmUvbGliL2lucHV0Q29yZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3N1YnNjcmliZS1ldmVudC9zdWJzY3JpYmUuanMiXSwibmFtZXMiOlsiTWFza0lucHV0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibWFzayIsIk1hc2tJbnB1dDIiLCJhbHdheXNTaG93TWFzayIsIm1hc2tDaGFyIiwiS0VZQk9BUkQiLCJCQUNLU1BBQ0UiLCJERUxFVEUiLCJlbGVtZW50IiwidmFsdWUiLCJyZWZvcm1hdCIsIm1hc2tTdHJpbmciLCJtYXNrRm9ybWF0Iiwic2hvd01hc2siLCJvbkNoYW5nZSIsInNob3dWYWx1ZSIsImNhblNldFNlbGVjdGlvbiIsInByb3BzIiwiaW5wdXQiLCJnZXRNYXNrZWRWYWx1ZSIsImdldFZpc2libGVWYWx1ZSIsInNldFNlbGVjdGlvbiIsInNlbGVjdGlvbiIsImdldFNlbGVjdGlvbiIsInNldFNlbGVjdGlvblJhbmdlIiwic3RhcnQiLCJlbmQiLCJyYWYiLCJ3aW5kb3ciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzZXRUaW1lb3V0IiwiZm4iLCJvblBhc3RlIiwiZSIsInByZXZlbnREZWZhdWx0IiwicGFzdGUiLCJjbGlwYm9hcmREYXRhIiwiZ2V0RGF0YSIsImN1cnJlbnRWYWx1ZSIsInRhcmdldCIsInNldFZhbHVlIiwib25LZXlQcmVzcyIsIm1ldGFLZXkiLCJhbHRLZXkiLCJjdHJsS2V5Iiwia2V5IiwiZGF0YSIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIndoaWNoIiwib25LZXlEb3duIiwicmVtb3ZlUHJldmlvc09yU2VsZWN0ZWQiLCJyZW1vdmVOZXh0T3JTZWxlY3RlZCIsIm9uRm9jdXMiLCJvbkJsdXIiLCJzdWJzY3JpYmUiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInVuc3Vic2NyaWJlIiwia2V5UHJlc3NQcm9wTmFtZSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm1hdGNoIiwidXBkYXRlZCIsInNldE1hc2tGb3JtYXQiLCJzZXRNYXNrIiwic2V0TWFza1N0cmluZyIsInNldE1hc2tDaGFyIiwic2V0UmVmb3JtYXQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQ2hFQTs7Ozs7O0FBRUEsSUFBTUEsWUFBWSx3QkFBbUJDLFNB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QjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCLHNCQUFzQixRQUFRO0FBQzlCOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGlCQUFpQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSwwQkFBMEIscUhBQXFIO0FBQy9JLEU7Ozs7OztBQ2pUQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyxHIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODkzMzIxODgxZTcwZTYwYTIxNmIiLCJpbXBvcnQgUGxhaW5NYXNrSW5wdXQgZnJvbSAnLi4vc3JjL01hc2tJbnB1dCc7XG5cbmNvbnN0IE1hc2tJbnB1dCA9IG5ldyBQbGFpbk1hc2tJbnB1dChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtaW5wdXQnKSwge1xuICBtYXNrOiAnMDAwMC0wMDAwLTAwMDAtMDAwMCcsXG59KTtcblxuY29uc3QgTWFza0lucHV0MiA9IG5ldyBQbGFpbk1hc2tJbnB1dChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtaW5wdXQtbWFzaycpLCB7XG4gIG1hc2s6ICcwMDAwLTAwMDAtMDAwMC0wMDAwJyxcbiAgYWx3YXlzU2hvd01hc2s6IHRydWUsXG4gIG1hc2tDaGFyOiAnXycsXG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2V4YW1wbGVzL2luZGV4LmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgICBVU0VSOiAxLFxuICAgIENIQVI6IDIsXG4gICAgTUFTSzogM1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaW5wdXQtY29yZS9saWIvY29uc3RhbnRzL2NoYXJUeXBlc0VudW0uanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY3JlYXRlSW5wdXQsIGRlZmF1bHRzIH0gZnJvbSAnaW5wdXQtY29yZSc7XG5pbXBvcnQgc3Vic2NyaWJlIGZyb20gJ3N1YnNjcmliZS1ldmVudCc7XG5cbmNvbnN0IEtFWUJPQVJEID0ge1xuICBCQUNLU1BBQ0U6IDgsXG4gIERFTEVURTogNDYsXG59O1xuLyoqXG4gKiBBZGFwdGVyIG9mIHJlYWN0LW1hc2tJbnB1dCB0byB2YW5pbGFKc1xuICovXG5jbGFzcyBNYXNrSW5wdXQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50LFxuICAgIHtcbiAgICAgIG1hc2sgPSBkZWZhdWx0cy5tYXNrLFxuICAgICAgdmFsdWUgPSAnJyxcbiAgICAgIHJlZm9ybWF0LFxuICAgICAgbWFza1N0cmluZyxcbiAgICAgIG1hc2tDaGFyID0gZGVmYXVsdHMubWFza0NoYXIsXG4gICAgICBtYXNrRm9ybWF0ID0gZGVmYXVsdHMubWFza0Zvcm1hdCxcbiAgICAgIHNob3dNYXNrLFxuICAgICAgYWx3YXlzU2hvd01hc2ssXG4gICAgICBvbkNoYW5nZSxcbiAgICB9XG4gICkge1xuICAgIHRoaXMuaW5wdXQgPSB0aGlzLmlucHV0ID0gY3JlYXRlSW5wdXQoe1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgcmVmb3JtYXQ6IHJlZm9ybWF0LFxuICAgICAgbWFza1N0cmluZzogbWFza1N0cmluZyxcbiAgICAgIG1hc2tDaGFyOiBtYXNrQ2hhcixcbiAgICAgIG1hc2s6IG1hc2ssXG4gICAgICBtYXNrRm9ybWF0OiBtYXNrRm9ybWF0LFxuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9wcyA9IHtcbiAgICAgIG1hc2ssXG4gICAgICB2YWx1ZSxcbiAgICAgIHJlZm9ybWF0LFxuICAgICAgbWFza0NoYXIsXG4gICAgICBtYXNrRm9ybWF0LFxuICAgICAgbWFza1N0cmluZyxcbiAgICAgIHNob3dNYXNrLFxuICAgICAgYWx3YXlzU2hvd01hc2ssXG4gICAgICBvbkNoYW5nZSxcbiAgICB9O1xuXG4gICAgdGhpcy5zaG93TWFzayA9IGFsd2F5c1Nob3dNYXNrIHx8IHNob3dNYXNrO1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLnNob3dWYWx1ZSgpO1xuICAgIHRoaXMuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBzaG93VmFsdWUgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc2hvd01hc2sgJiYgKHRoaXMuY2FuU2V0U2VsZWN0aW9uIHx8IHRoaXMucHJvcHMuYWx3YXlzU2hvd01hc2spKSB7XG4gICAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSB0aGlzLmlucHV0LmdldE1hc2tlZFZhbHVlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IHRoaXMuaW5wdXQuZ2V0VmlzaWJsZVZhbHVlKCk7XG4gIH07XG5cbiAgc2V0U2VsZWN0aW9uID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5jYW5TZXRTZWxlY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5pbnB1dC5nZXRTZWxlY3Rpb24oKTtcbiAgICB0aGlzLmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uLnN0YXJ0LCBzZWxlY3Rpb24uZW5kKTtcblxuICAgIGNvbnN0IHJhZiA9XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAoZm4gPT4gc2V0VGltZW91dChmbiwgMCkpO1xuICAgIC8vIEZvciBhbmRyb2lkXG4gICAgcmFmKCgpID0+IHRoaXMuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb24uc3RhcnQsIHNlbGVjdGlvbi5lbmQpKTtcbiAgfTtcblxuICBnZXRTZWxlY3Rpb24oKSB7XG4gICAgdGhpcy5pbnB1dC5zZXRTZWxlY3Rpb24oe1xuICAgICAgc3RhcnQ6IHRoaXMuZWxlbWVudC5zZWxlY3Rpb25TdGFydCxcbiAgICAgIGVuZDogdGhpcy5lbGVtZW50LnNlbGVjdGlvbkVuZCxcbiAgICB9KTtcbiAgfVxuXG4gIHN1YnNjcmliZSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlID0ge1xuICAgICAgb25QYXN0ZTogc3Vic2NyaWJlKHRoaXMuZWxlbWVudCwgJ3Bhc3RlJywgdGhpcy5vblBhc3RlKSxcbiAgICAgIG9uS2V5RG93bjogc3Vic2NyaWJlKHRoaXMuZWxlbWVudCwgJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93biksXG4gICAgICBvbktleVByZXNzOiBzdWJzY3JpYmUodGhpcy5lbGVtZW50LCB0aGlzLmtleVByZXNzUHJvcE5hbWUoKSwgdGhpcy5vbktleVByZXNzKSxcbiAgICAgIG9uQ2hhbmdlOiBzdWJzY3JpYmUodGhpcy5lbGVtZW50LCAnY2hhbmdlJywgdGhpcy5vbkNoYW5nZSksXG4gICAgICBvbkZvY3VzOiBzdWJzY3JpYmUodGhpcy5lbGVtZW50LCAnZm9jdXMnLCB0aGlzLm9uRm9jdXMpLFxuICAgICAgb25CbHVyOiBzdWJzY3JpYmUodGhpcy5lbGVtZW50LCAnYmx1cicsIHRoaXMub25CbHVyKSxcbiAgICB9O1xuICB9XG5cbiAgb25QYXN0ZSA9IGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmdldFNlbGVjdGlvbigpO1xuXG4gICAgLy8gZ2V0RGF0YSB2YWx1ZSBuZWVkZWQgZm9yIElFIGFsc28gd29ya3MgaW4gRkYgJiBDaHJvbWVcbiAgICB0aGlzLmlucHV0LnBhc3RlKGUuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCdUZXh0JykpO1xuXG4gICAgdGhpcy5zaG93VmFsdWUoKTtcblxuICAgIC8vIFRpbWVvdXQgbmVlZGVkIGZvciBJRVxuICAgIHNldFRpbWVvdXQodGhpcy5zZXRTZWxlY3Rpb24sIDApO1xuXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSAmJiB0aGlzLnByb3BzLm9uQ2hhbmdlKGUpO1xuICB9O1xuXG4gIG9uQ2hhbmdlID0gZSA9PiB7XG4gICAgbGV0IGN1cnJlbnRWYWx1ZTtcbiAgICBpZiAodGhpcy5zaG93TWFzayAmJiAodGhpcy5jYW5TZXRTZWxlY3Rpb24gfHwgdGhpcy5wcm9wcy5hbHdheXNTaG93TWFzaykpIHtcbiAgICAgIGN1cnJlbnRWYWx1ZSA9IHRoaXMuaW5wdXQuZ2V0TWFza2VkVmFsdWUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudFZhbHVlID0gdGhpcy5pbnB1dC5nZXRWaXNpYmxlVmFsdWUoKTtcbiAgICB9XG5cbiAgICAvLyBmaXggY29uZmxpY3QgYnkgdXBkYXRlIHZhbHVlIGluIG1hc2sgbW9kZWxcbiAgICBpZiAoZS50YXJnZXQudmFsdWUgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgIHRoaXMuaW5wdXQuc2V0VmFsdWUoZS50YXJnZXQudmFsdWUpO1xuXG4gICAgICB0aGlzLnNob3dWYWx1ZSgpO1xuXG4gICAgICBzZXRUaW1lb3V0KHRoaXMuc2V0U2VsZWN0aW9uLCAwKTtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSAmJiB0aGlzLnByb3BzLm9uQ2hhbmdlKGUpO1xuICB9O1xuXG4gIG9uS2V5UHJlc3MgPSBlID0+IHtcbiAgICBpZiAoZS5tZXRhS2V5IHx8IGUuYWx0S2V5IHx8IGUuY3RybEtleSB8fCBlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmdldFNlbGVjdGlvbigpO1xuICAgIHRoaXMuaW5wdXQuaW5wdXQoZS5rZXkgfHwgZS5kYXRhIHx8IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCkpO1xuICAgIHRoaXMuc2hvd1ZhbHVlKCk7XG4gICAgdGhpcy5zZXRTZWxlY3Rpb24oKTtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlICYmIHRoaXMucHJvcHMub25DaGFuZ2UoZSk7XG4gIH07XG5cbiAgb25LZXlEb3duID0gZSA9PiB7XG4gICAgaWYgKGUud2hpY2ggPT09IEtFWUJPQVJELkJBQ0tTUEFDRSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgIHRoaXMuaW5wdXQucmVtb3ZlUHJldmlvc09yU2VsZWN0ZWQoKTtcblxuICAgICAgdGhpcy5zaG93VmFsdWUoKTtcbiAgICAgIHRoaXMuc2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZShlKTtcbiAgICB9XG5cbiAgICBpZiAoZS53aGljaCA9PT0gS0VZQk9BUkQuREVMRVRFKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmdldFNlbGVjdGlvbigpO1xuICAgICAgdGhpcy5pbnB1dC5yZW1vdmVOZXh0T3JTZWxlY3RlZCgpO1xuXG4gICAgICB0aGlzLnNob3dWYWx1ZSgpO1xuICAgICAgdGhpcy5zZXRTZWxlY3Rpb24oKTtcblxuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSAmJiB0aGlzLnByb3BzLm9uQ2hhbmdlKGUpO1xuICAgIH1cbiAgfTtcblxuICBvbkZvY3VzID0gKCkgPT4ge1xuICAgIHRoaXMuY2FuU2V0U2VsZWN0aW9uID0gdHJ1ZTtcbiAgfTtcblxuICBvbkJsdXIgPSAoKSA9PiB7XG4gICAgdGhpcy5jYW5TZXRTZWxlY3Rpb24gPSBmYWxzZTtcbiAgfTtcblxuICBrZXlQcmVzc1Byb3BOYW1lKCkge1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BbmRyb2lkL2kpKSB7XG4gICAgICByZXR1cm4gJ2JlZm9yZWlucHV0JztcbiAgICB9XG4gICAgcmV0dXJuICdrZXlwcmVzcyc7XG4gIH1cblxuICBzZXRQcm9wcyh7IG1hc2ssIHZhbHVlLCByZWZvcm1hdCwgbWFza1N0cmluZywgbWFza0NoYXIsIG1hc2tGb3JtYXQsIHNob3dNYXNrLCBhbHdheXNTaG93TWFzaywgb25DaGFuZ2UgfSkge1xuICAgIGxldCB1cGRhdGVkID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSAhPT0gb25DaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UgPSBvbkNoYW5nZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5hbHdheXNTaG93TWFzayAhPT0gYWx3YXlzU2hvd01hc2sgfHwgdGhpcy5wcm9wcy5zaG93TWFzayAhPT0gc2hvd01hc2spIHtcbiAgICAgIHRoaXMuc2hvd01hc2sgPSBhbHdheXNTaG93TWFzayB8fCBzaG93TWFzaztcblxuICAgICAgdGhpcy5wcm9wcy5hbHdheXNTaG93TWFzayA9IGFsd2F5c1Nob3dNYXNrO1xuICAgICAgdGhpcy5wcm9wcy5zaG93TWFzayA9IHNob3dNYXNrO1xuXG4gICAgICB1cGRhdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAobWFza0Zvcm1hdCAmJiBtYXNrRm9ybWF0ICE9PSB0aGlzLnByb3BzLm1hc2tGb3JtYXQpIHtcbiAgICAgIHRoaXMuaW5wdXQuc2V0TWFza0Zvcm1hdChtYXNrRm9ybWF0KTtcblxuICAgICAgdGhpcy5wcm9wcy5tYXNrRm9ybWF0ID0gbWFza0Zvcm1hdDtcblxuICAgICAgdXBkYXRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG1hc2sgIT09IHRoaXMucHJvcHMubWFzaykge1xuICAgICAgdGhpcy5pbnB1dC5zZXRNYXNrKG1hc2spO1xuXG4gICAgICB0aGlzLnByb3BzLm1hc2sgPSBtYXNrO1xuXG4gICAgICB1cGRhdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAobWFza1N0cmluZyAhPT0gdGhpcy5wcm9wcy5tYXNrU3RyaW5nKSB7XG4gICAgICB0aGlzLmlucHV0LnNldE1hc2tTdHJpbmcobWFza1N0cmluZyk7XG5cbiAgICAgIHRoaXMucHJvcHMubWFza1N0cmluZyA9IG1hc2tTdHJpbmc7XG5cbiAgICAgIHVwZGF0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChtYXNrQ2hhciAhPT0gdGhpcy5wcm9wcy5tYXNrQ2hhcikge1xuICAgICAgdGhpcy5pbnB1dC5zZXRNYXNrQ2hhcihtYXNrQ2hhcik7XG5cbiAgICAgIHRoaXMucHJvcHMubWFza0NoYXIgPSBtYXNrQ2hhcjtcblxuICAgICAgdXBkYXRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHJlZm9ybWF0ICE9PSB0aGlzLnByb3BzLnJlZm9ybWF0KSB7XG4gICAgICB0aGlzLmlucHV0LnNldFJlZm9ybWF0KHJlZm9ybWF0KTtcblxuICAgICAgdGhpcy5wcm9wcy5yZWZvcm1hdCA9IHJlZm9ybWF0O1xuXG4gICAgICB1cGRhdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgIT09IHRoaXMucHJvcHMudmFsdWUpIHtcbiAgICAgIHRoaXMuaW5wdXQuc2V0VmFsdWUodmFsdWUpO1xuXG4gICAgICB0aGlzLnByb3BzLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgIHVwZGF0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh1cGRhdGVkKSB7XG4gICAgICB0aGlzLnNob3dWYWx1ZSgpO1xuICAgICAgdGhpcy5zZXRTZWxlY3Rpb24oKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMudW5zdWJzY3JpYmUub25QYXN0ZSgpO1xuICAgIHRoaXMudW5zdWJzY3JpYmUub25LZXlEb3duKCk7XG4gICAgdGhpcy51bnN1YnNjcmliZS5vbktleVByZXNzKCk7XG4gICAgdGhpcy51bnN1YnNjcmliZS5vbkNoYW5nZSgpO1xuICAgIHRoaXMudW5zdWJzY3JpYmUub25Gb2N1cygpO1xuICAgIHRoaXMudW5zdWJzY3JpYmUub25CbHVyKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFza0lucHV0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL01hc2tJbnB1dC5qcyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmaW5lTWFza0xpc3Q7XG4vKipcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWFza1xuICogQHBhcmFtIGZvcm1hdFxuICogQHJldHVybnMge0FycmF5fVxuICovXG5mdW5jdGlvbiBkZWZpbmVNYXNrTGlzdChtYXNrLCBmb3JtYXQpIHtcbiAgICBpZiAoIW1hc2spIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHZhciBzdGFjayA9IFtdO1xuICAgIHZhciBlc2NhcGUgPSBmYWxzZTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWFzay5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaXRlbSA9IGZvcm1hdFttYXNrW2ldXTtcbiAgICAgICAgaWYgKGVzY2FwZSAmJiBpdGVtKSB7XG4gICAgICAgICAgICBpdGVtID0gbnVsbDtcbiAgICAgICAgICAgIGVzY2FwZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXRlbSkge1xuICAgICAgICAgICAgaWYgKCFlc2NhcGUgJiYgbWFza1tpXSA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgICAgZXNjYXBlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVzY2FwZSA9IGZhbHNlO1xuICAgICAgICAgICAgc3RhY2sucHVzaCh7XG4gICAgICAgICAgICAgICAgY2hhcjogbWFza1tpXSxcbiAgICAgICAgICAgICAgICBuZXh0OiBudWxsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnJlZ2V4cCkge1xuICAgICAgICAgICAgc3RhY2sucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdGFjaztcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaW5wdXQtY29yZS9saWIvZnVuY3Rpb25zL2RlZmluZU1hc2tMaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaW5wdXRWYWx1ZTtcblxudmFyIF9jaGFyVHlwZXNFbnVtID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzL2NoYXJUeXBlc0VudW0uanMnKTtcblxudmFyIF9jaGFyVHlwZXNFbnVtMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NoYXJUeXBlc0VudW0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBpbnB1dFZhbHVlKF9yZWYpIHtcbiAgICB2YXIgZGF0YSA9IF9yZWYuZGF0YSxcbiAgICAgICAgX3JlZiRpbnB1dCA9IF9yZWYuaW5wdXQsXG4gICAgICAgIGlucHV0ID0gX3JlZiRpbnB1dCA9PT0gdW5kZWZpbmVkID8gJycgOiBfcmVmJGlucHV0LFxuICAgICAgICBzZWxlY3Rpb24gPSBfcmVmLnNlbGVjdGlvbixcbiAgICAgICAgbWFzayA9IF9yZWYubWFzayxcbiAgICAgICAgbWFza0NoYXIgPSBfcmVmLm1hc2tDaGFyLFxuICAgICAgICBtYXNrU3RyaW5nID0gX3JlZi5tYXNrU3RyaW5nO1xuXG4gICAgdmFyIHZhbHVlID0gW107XG4gICAgdmFyIG1hc2tlZFZhbHVlID0gJyc7XG5cbiAgICB2YXIgbWFza0luZGV4ID0gMDtcbiAgICB2YXIgdmFsdWVJbmRleCA9IDA7XG4gICAgdmFyIHBhc3RlZEluZGV4ID0gMDtcblxuICAgIHZhciBpbnB1dFZhbHVlc0FwcGxpZWQgPSAwO1xuXG4gICAgd2hpbGUgKG1hc2tbbWFza0luZGV4XSkge1xuICAgICAgICB2YXIgaXRlbSA9IGRhdGEubGVuZ3RoID4gdmFsdWVJbmRleCA/IGRhdGFbdmFsdWVJbmRleF0gOiBudWxsO1xuICAgICAgICB2YXIgbWFza1BhcnQgPSBtYXNrW21hc2tJbmRleF07XG5cbiAgICAgICAgdmFyIHBhc3RlZFZhbHVlc1N0YWNrID0gbnVsbDtcbiAgICAgICAgaWYgKHNlbGVjdGlvbi5zdGFydCA8PSBtYXNrSW5kZXggJiYgcGFzdGVkSW5kZXggPCBpbnB1dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHBhc3RlZFZhbHVlc1N0YWNrID0gaW5wdXQuc2xpY2UocGFzdGVkSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0J7QsdGA0LDQsdC+0YLQutCwINC30LDRhdCw0YDQtNC60L7QttC10L3QvdGL0YUg0LIg0LzQsNGB0LrRgyDRgdC40LzQstC+0LvQvtCyLiBcbiAgICAgICAgaWYgKG1hc2tQYXJ0LmNoYXIpIHtcbiAgICAgICAgICAgIC8vINCV0YHQu9C4INC10YHRgtGMINCy0LLQvtC00LjQvNGL0LUg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C10Lwg0LfQvdCw0YfQtdC90LjQtSwg0LIg0L/QtdGA0LLRg9GOINC+0YfQtdGA0LXQtNGMINC/0YDQvtCy0LXRgNGP0LXQvCDQtdCz0L4uXG4gICAgICAgICAgICAvLyDQndC+INC90LUg0L/RgNC+0LLQtdGA0Y/QtdC8INC/0L4g0LLRgdC10LzRgyDRgdGC0LXQutGDLlxuICAgICAgICAgICAgaWYgKHBhc3RlZFZhbHVlc1N0YWNrICYmIHBhc3RlZFZhbHVlc1N0YWNrWzBdID09PSBtYXNrUGFydC5jaGFyKSB7XG4gICAgICAgICAgICAgICAgcGFzdGVkSW5kZXgrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gJiYgKGl0ZW0uY2hhciA9PT0gbWFza1BhcnQuY2hhciB8fCBpdGVtLnR5cGUgIT09IF9jaGFyVHlwZXNFbnVtMi5kZWZhdWx0LlVTRVIpIHx8IGlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlSW5kZXgrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhbHVlLnB1c2goe1xuICAgICAgICAgICAgICAgIGNoYXI6IG1hc2tQYXJ0LmNoYXIsXG4gICAgICAgICAgICAgICAgdHlwZTogX2NoYXJUeXBlc0VudW0yLmRlZmF1bHQuQ0hBUlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChwYXN0ZWRWYWx1ZXNTdGFjaykge1xuICAgICAgICAgICAgICAgIGlucHV0VmFsdWVzQXBwbGllZCsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtYXNrZWRWYWx1ZSArPSBtYXNrUGFydC5jaGFyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0JrQsNGB0YLQvtC80L3Ri9C5INGC0LXQutGB0YJcbiAgICAgICAgaWYgKG1hc2tQYXJ0LnJlZ2V4cCkge1xuICAgICAgICAgICAgdmFyIHBhcnQgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyDQldGB0LvQuCDQtdGB0YLRjCDQstCy0L7QtNC40LzQvtC1INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC8INC30L3QsNGH0LXQvdC40LUsINGC0L4g0L/RgNC+0LLQtdGA0Y/QvCDQtdCz0L4uIFxuICAgICAgICAgICAgLy8g0J/RgNC40YfQtdC8INC/0YDQvtCx0LXQs9Cw0LXQvNGB0Y8g0L/QviDRgdGC0LXQutGDINCy0LLQvtC00LjQvNGL0YUg0LfQvdCw0YfQtdC90LjQuSwg0L/QvtC60LAg0L3QtSDQvdCw0LnQtNC10Lwg0L3Rg9C20L3QvtC1XG4gICAgICAgICAgICBpZiAocGFzdGVkVmFsdWVzU3RhY2spIHtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKCFtYXNrUGFydC5yZWdleHAudGVzdChwYXN0ZWRWYWx1ZXNTdGFja1tpXSkgJiYgcGFzdGVkVmFsdWVzU3RhY2subGVuZ3RoID4gaSkge1xuICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgIHBhc3RlZEluZGV4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwYXN0ZWRWYWx1ZXNTdGFjay5sZW5ndGggPiBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhc3RlZEluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0VmFsdWVzQXBwbGllZCsrO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vINCY0LPQvdC+0YDQuNGA0YPQtdC8INC/0YDQtdC00YvQtNGD0YnQtdC1INC30L3QsNGH0LXQvdC40LUg0LIg0LjQvdC/0YPRgtC1XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlSW5kZXgrKztcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0ID0gcGFzdGVkVmFsdWVzU3RhY2tbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcjogcGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IF9jaGFyVHlwZXNFbnVtMi5kZWZhdWx0LlVTRVJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG1hc2tlZFZhbHVlICs9IHBhcnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDQkiDQv9C+0LvRjNC30L7QstCw0YLQtdC70YzRgdC60L7QvCDQstCy0L7QtNC1INC90LXRgiDQuNC70Lgg0L3QtdCy0LDQu9C40LTQvdGL0LUg0LTQsNC90L3Ri9C1LiDQn9GL0YLQsNC10LzRgdGPINCw0L/Qu9Cw0LjRgtGMINGC0LUg0LTQsNC90L3Ri9C1LCDRh9GC0L4g0LHRi9C70Lgg0YDQsNC90YzRiNC1INC40LvQuCDQt9Cw0LzQtdC90Y/QtdC8INC90LAg0L/Qu9C10LnRgdGF0L7Qu9C00LXRgFxuICAgICAgICAgICAgaWYgKCFwYXJ0KSB7XG4gICAgICAgICAgICAgICAgLy8g0JXRgdC70Lgg0L/RgNC+0LjQt9C+0YjQtdC7INGB0LTQstC40LMsINC/0YDQvtC/0YPRgdC60LDQtdC8INC70LjRiNC90LXQtSDQt9C90LDRh9C10L3QuNC1XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS50eXBlID09PSBfY2hhclR5cGVzRW51bTIuZGVmYXVsdC5DSEFSICYmIGRhdGEubGVuZ3RoID4gdmFsdWVJbmRleCArIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS50eXBlID09PSBfY2hhclR5cGVzRW51bTIuZGVmYXVsdC5VU0VSICYmIG1hc2tQYXJ0LnJlZ2V4cC50ZXN0KGl0ZW0uY2hhcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFyOiBpdGVtLmNoYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBfY2hhclR5cGVzRW51bTIuZGVmYXVsdC5VU0VSXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBtYXNrZWRWYWx1ZSArPSBpdGVtLmNoYXI7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlSW5kZXgrKztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0ID0gbWFza1N0cmluZyA/IG1hc2tTdHJpbmdbbWFza0luZGV4XSA6IG1hc2tDaGFyO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcjogcGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IF9jaGFyVHlwZXNFbnVtMi5kZWZhdWx0Lk1BU0tcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gbWFza0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZUluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBtYXNrZWRWYWx1ZSArPSBwYXJ0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG1hc2tJbmRleCsrO1xuICAgIH1cblxuICAgIHZhciBzZWxlY3Rpb25Qb3NpdGlvbiA9IHNlbGVjdGlvbi5zdGFydCArIGlucHV0VmFsdWVzQXBwbGllZDtcblxuICAgIC8vINCj0LTQsNC70Y/QtdC8INCy0YHQtSDQstC10LTRg9GO0YnQuNC1IG1hc2tDaGFyXG4gICAgdmFyIGJvdW5kID0gdmFsdWUubGVuZ3RoIC0gMTtcbiAgICB2YXIgY2hhcnNDb3VudCA9IDA7XG4gICAgd2hpbGUgKGJvdW5kID49IDAgJiYgdmFsdWVbYm91bmRdLnR5cGUgIT09IF9jaGFyVHlwZXNFbnVtMi5kZWZhdWx0LlVTRVIpIHtcbiAgICAgICAgaWYgKHZhbHVlW2JvdW5kXS50eXBlID09PSBfY2hhclR5cGVzRW51bTIuZGVmYXVsdC5NQVNLKSB7XG4gICAgICAgICAgICBjaGFyc0NvdW50ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWVbYm91bmRdLnR5cGUgPT09IF9jaGFyVHlwZXNFbnVtMi5kZWZhdWx0LkNIQVIpIHtcbiAgICAgICAgICAgIGNoYXJzQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgICBib3VuZC0tO1xuICAgIH1cbiAgICBib3VuZCArPSBjaGFyc0NvdW50O1xuXG4gICAgdmFyIHZpc2libGVWYWx1ZSA9ICcnO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPD0gYm91bmQ7IF9pKyspIHtcbiAgICAgICAgdmlzaWJsZVZhbHVlICs9IHZhbHVlW19pXS5jaGFyO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgdmlzaWJsZVZhbHVlOiB2aXNpYmxlVmFsdWUsXG4gICAgICAgIG1hc2tlZFZhbHVlOiBtYXNrZWRWYWx1ZSxcbiAgICAgICAgc2VsZWN0aW9uOiB7XG4gICAgICAgICAgICBzdGFydDogc2VsZWN0aW9uUG9zaXRpb24sXG4gICAgICAgICAgICBlbmQ6IHNlbGVjdGlvblBvc2l0aW9uXG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9pbnB1dC1jb3JlL2xpYi9mdW5jdGlvbnMvaW5wdXRWYWx1ZS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHJlbW92ZVNlbGVjdGVkUmFuZ2U7XG5cbnZhciBfY2hhclR5cGVzRW51bSA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cy9jaGFyVHlwZXNFbnVtJyk7XG5cbnZhciBfY2hhclR5cGVzRW51bTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jaGFyVHlwZXNFbnVtKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gcmVtb3ZlU2VsZWN0ZWRSYW5nZShfcmVmKSB7XG4gICAgdmFyIHZhbHVlID0gX3JlZi52YWx1ZSxcbiAgICAgICAgc2VsZWN0aW9uID0gX3JlZi5zZWxlY3Rpb24sXG4gICAgICAgIHJlZm9ybWF0ID0gX3JlZi5yZWZvcm1hdCxcbiAgICAgICAgbWFzayA9IF9yZWYubWFzayxcbiAgICAgICAgbWFza0NoYXIgPSBfcmVmLm1hc2tDaGFyLFxuICAgICAgICBtYXNrU3RyaW5nID0gX3JlZi5tYXNrU3RyaW5nO1xuXG4gICAgdmFyIGNvcHlNYXNrQ2hhciA9IGZ1bmN0aW9uIGNvcHlNYXNrQ2hhcihjb3VudCkge1xuICAgICAgICB2YXIgcmVzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgcmVzLnB1c2goe1xuICAgICAgICAgICAgICAgIGNoYXI6IG1hc2tDaGFyLFxuICAgICAgICAgICAgICAgIHR5cGU6IF9jaGFyVHlwZXNFbnVtMi5kZWZhdWx0Lk1BU0tcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfTtcblxuICAgIHZhciBwYXN0ZU1hc2tTeW1ib2xzID0gZnVuY3Rpb24gcGFzdGVNYXNrU3ltYm9scygpIHtcbiAgICAgICAgaWYgKHJlZm9ybWF0KSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWFza1N0cmluZykge1xuICAgICAgICAgICAgdmFyIHJlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHNlbGVjdGlvbi5zdGFydDsgaSA8IHNlbGVjdGlvbi5lbmQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgY2hhcjogbWFza1N0cmluZ1tpXSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogX2NoYXJUeXBlc0VudW0yLmRlZmF1bHQuTUFTS1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb3B5TWFza0NoYXIoc2VsZWN0aW9uLmVuZCAtIHNlbGVjdGlvbi5zdGFydCk7XG4gICAgfTtcblxuICAgIGlmIChzZWxlY3Rpb24uZW5kIDwgc2VsZWN0aW9uLnN0YXJ0KSB7XG4gICAgICAgIHZhciB0bXAgPSBzZWxlY3Rpb24uZW5kO1xuICAgICAgICBzZWxlY3Rpb24uZW5kID0gc2VsZWN0aW9uLnN0YXJ0O1xuICAgICAgICBzZWxlY3Rpb24uc3RhcnQgPSB0bXA7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdGlvbi5zdGFydCA9PT0gc2VsZWN0aW9uLmVuZCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlLmxlbmd0aCA+IHNlbGVjdGlvbi5zdGFydCkge1xuICAgICAgICByZXR1cm4gdmFsdWUuc2xpY2UoMCwgc2VsZWN0aW9uLnN0YXJ0KS5jb25jYXQocGFzdGVNYXNrU3ltYm9scygpLCB2YWx1ZS5zbGljZShzZWxlY3Rpb24uZW5kLCB2YWx1ZS5sZW5ndGgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2lucHV0LWNvcmUvbGliL2Z1bmN0aW9ucy9yZW1vdmVTZWxlY3RlZFJhbmdlLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jcmVhdGVJbnB1dCA9IGV4cG9ydHMuZGVmYXVsdHMgPSB1bmRlZmluZWQ7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZGVmaW5lTWFza0xpc3QgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9kZWZpbmVNYXNrTGlzdCcpO1xuXG52YXIgX2RlZmluZU1hc2tMaXN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZU1hc2tMaXN0KTtcblxudmFyIF9pbnB1dFZhbHVlID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvaW5wdXRWYWx1ZScpO1xuXG52YXIgX2lucHV0VmFsdWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5wdXRWYWx1ZSk7XG5cbnZhciBfcmVtb3ZlU2VsZWN0ZWRSYW5nZSA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL3JlbW92ZVNlbGVjdGVkUmFuZ2UnKTtcblxudmFyIF9yZW1vdmVTZWxlY3RlZFJhbmdlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlbW92ZVNlbGVjdGVkUmFuZ2UpO1xuXG52YXIgX2NoYXJUeXBlc0VudW0gPSByZXF1aXJlKCcuL2NvbnN0YW50cy9jaGFyVHlwZXNFbnVtJyk7XG5cbnZhciBfY2hhclR5cGVzRW51bTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jaGFyVHlwZXNFbnVtKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIElucHV0Q29yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJbnB1dENvcmUoX3JlZikge1xuICAgICAgICB2YXIgdmFsdWUgPSBfcmVmLnZhbHVlLFxuICAgICAgICAgICAgbWFzayA9IF9yZWYubWFzayxcbiAgICAgICAgICAgIHJlZm9ybWF0ID0gX3JlZi5yZWZvcm1hdCxcbiAgICAgICAgICAgIG1hc2tGb3JtYXQgPSBfcmVmLm1hc2tGb3JtYXQsXG4gICAgICAgICAgICBtYXNrQ2hhciA9IF9yZWYubWFza0NoYXIsXG4gICAgICAgICAgICBtYXNrU3RyaW5nID0gX3JlZi5tYXNrU3RyaW5nO1xuXG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBJbnB1dENvcmUpO1xuXG4gICAgICAgIGlmIChtYXNrU3RyaW5nICYmIG1hc2tTdHJpbmcubGVuZ3RoICE9PSBtYXNrLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtYXNrU3RyaW5nIG11c3QgaGF2ZSBzYW1lIGxlbmd0aCBhcyBtYXNrJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hc2tDaGFyLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbWFza0NoYXIgbXVzdCBoYXZlIG9ubHkgMSBjaGFyJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFza1N0cmluZyA9IG1hc2tTdHJpbmc7XG4gICAgICAgIHRoaXMuX21hc2tDaGFyID0gbWFza0NoYXI7XG4gICAgICAgIHRoaXMuX3JlZm9ybWF0ID0gcmVmb3JtYXQ7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uID0geyBzdGFydDogMCwgZW5kOiAwIH07XG5cbiAgICAgICAgdGhpcy5zZXRNYXNrRm9ybWF0KG1hc2tGb3JtYXQpO1xuICAgICAgICB0aGlzLl9tYXNrID0gKDAsIF9kZWZpbmVNYXNrTGlzdDIuZGVmYXVsdCkobWFzaywgdGhpcy5fbWFza0Zvcm1hdCk7XG5cbiAgICAgICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JfQsNC/0L7Qu9C90Y/QtdGCIF9tYXNrRm9ybWF0LCDQutC+0YLQvtGA0YvQuSDRj9Cy0LvRj9C10YLRgdGPINC+0LHRitC10LrRgtC+0LwgYnlJZCDQvtCx0YrQtdC60YLQvtCyXG4gICAgICogQHBhcmFtIHtBcnJheX0gbWFza0Zvcm1hdCAgICAgXG4gICAgICovXG5cblxuICAgIF9jcmVhdGVDbGFzcyhJbnB1dENvcmUsIFt7XG4gICAgICAgIGtleTogJ3NldE1hc2tGb3JtYXQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0TWFza0Zvcm1hdChtYXNrRm9ybWF0KSB7XG4gICAgICAgICAgICB0aGlzLl9tYXNrRm9ybWF0ID0gbWFza0Zvcm1hdC5yZWR1Y2UoZnVuY3Rpb24gKHN0b3JlLCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgc3RvcmVbaXRlbS5zdHJdID0gaXRlbTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RvcmU7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2lucHV0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGlucHV0KF9pbnB1dCkge1xuICAgICAgICAgICAgdmFyIF92YWx1ZSA9IHRoaXMuX3ZhbHVlO1xuXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdm9pZCAwO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVmb3JtYXQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9yZWZvcm1hdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IF92YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IF9pbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiB0aGlzLnNlbGVjdGlvblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIF92YWx1ZSA9ICgwLCBfcmVtb3ZlU2VsZWN0ZWRSYW5nZTIuZGVmYXVsdCkoe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IHRoaXMuc2VsZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICBtYXNrOiB0aGlzLl9tYXNrLFxuICAgICAgICAgICAgICAgICAgICBtYXNrQ2hhcjogdGhpcy5fbWFza0NoYXIsXG4gICAgICAgICAgICAgICAgICAgIG1hc2tTdHJpbmc6IHRoaXMuX21hc2tTdHJpbmdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5lbmQgPSB0aGlzLnNlbGVjdGlvbi5zdGFydDtcblxuICAgICAgICAgICAgICAgIHJlc3VsdCA9ICgwLCBfaW5wdXRWYWx1ZTIuZGVmYXVsdCkoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBfdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0OiBfaW5wdXQsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogdGhpcy5zZWxlY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6IHRoaXMuX21hc2ssXG4gICAgICAgICAgICAgICAgICAgIG1hc2tDaGFyOiB0aGlzLl9tYXNrQ2hhcixcbiAgICAgICAgICAgICAgICAgICAgbWFza1N0cmluZzogdGhpcy5fbWFza1N0cmluZ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX21hc2tlZFZhbHVlID0gcmVzdWx0Lm1hc2tlZFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fdmlzaWJsZVZhbHVlID0gcmVzdWx0LnZpc2libGVWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uKHJlc3VsdC5zZWxlY3Rpb24pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZXRTZWxlY3Rpb24nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0U2VsZWN0aW9uKF9yZWYyKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSBfcmVmMi5zdGFydCxcbiAgICAgICAgICAgICAgICBlbmQgPSBfcmVmMi5lbmQ7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgICAgICBlbmQ6IGVuZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0U2VsZWN0aW9uJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldFNlbGVjdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHRoaXMuc2VsZWN0aW9uLnN0YXJ0LFxuICAgICAgICAgICAgICAgIGVuZDogdGhpcy5zZWxlY3Rpb24uZW5kXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdiYWNrc3BhY2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYmFja3NwYWNlKCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVQcmV2aW9zT3JTZWxlY3RlZCgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwYXN0ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwYXN0ZSh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog0J7Qv9GA0LXQtNC10LvRj9C10YIg0YbQuNC60LvQuNGH0LXRgdC60LjQuSDRgdC/0LjRgdC+0LosINCyINC60L7RgtC+0YDQvtC8INGD0YfRgtC10L3RiyDRhtC40LrQu9GLINC80LDRgdC60LgsINC/0L4g0LrQvtGC0L7RgNC+0Lkg0LHRg9C00LXRgiDQv9GA0L7RhdC+0LTQuNGC0Ywg0LjRgtC10YDQsNGG0LjQuC5cbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG1hc2tcbiAgICAgICAgICogQHJldHVybnMge3toZWFkOiB7fSwgaGFzQ3ljbGU6IGJvb2xlYW59fVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2V0TWFzaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRNYXNrKG1hc2spIHtcblxuICAgICAgICAgICAgdGhpcy5fbWFzayA9ICgwLCBfZGVmaW5lTWFza0xpc3QyLmRlZmF1bHQpKG1hc2ssIHRoaXMuX21hc2tGb3JtYXQpO1xuXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0U3RhdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmdldFZhbHVlKCksXG4gICAgICAgICAgICAgICAgbWFza2VkVmFsdWU6IHRoaXMuZ2V0TWFza2VkVmFsdWUoKSxcbiAgICAgICAgICAgICAgICB2aXNpYmxlVmFsdWU6IHRoaXMuZ2V0VmlzaWJsZVZhbHVlKCksXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiB0aGlzLmdldFNlbGVjdGlvbigpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRWYWx1ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2V0UmVmb3JtYXQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0UmVmb3JtYXQocmVmb3JtYXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlZm9ybWF0ID0gcmVmb3JtYXQ7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0TWFza2VkVmFsdWUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0TWFza2VkVmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFza2VkVmFsdWU7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldFZpc2libGVWYWx1ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRWaXNpYmxlVmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZVZhbHVlO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZXRNYXNrQ2hhcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRNYXNrQ2hhcihtYXNrQ2hhcikge1xuICAgICAgICAgICAgaWYgKG1hc2tDaGFyLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21hc2tDaGFyIG11c3QgaGF2ZSBvbmx5IDEgY2hhcicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9tYXNrQ2hhciA9IG1hc2tDaGFyO1xuXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2V0TWFza1N0cmluZycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRNYXNrU3RyaW5nKG1hc2tTdHJpbmcpIHtcbiAgICAgICAgICAgIGlmIChtYXNrU3RyaW5nICYmIG1hc2tTdHJpbmcubGVuZ3RoICE9PSB0aGlzLl9tYXNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbWFza1N0cmluZyBtdXN0IGhhdmUgc2FtZSBsZW5ndGggYXMgbWFzaycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9tYXNrU3RyaW5nID0gbWFza1N0cmluZztcblxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh0aGlzLl92YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbW92ZVByZXZpb3NPclNlbGVjdGVkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZVByZXZpb3NPclNlbGVjdGVkKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uLnN0YXJ0ID09PSB0aGlzLnNlbGVjdGlvbi5lbmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5zdGFydCA9IHRoaXMuc2VsZWN0aW9uLmVuZCAtIDE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uLnN0YXJ0IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5zdGFydCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmlucHV0KCcnKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVtb3ZlTmV4dE9yU2VsZWN0ZWQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlTmV4dE9yU2VsZWN0ZWQoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24uc3RhcnQgPT09IHRoaXMuc2VsZWN0aW9uLmVuZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLmVuZCsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmlucHV0KCcnKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2V0VmFsdWUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0VmFsdWUoZGF0YSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHZvaWQgMDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3JlZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fcmVmb3JtYXQoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IHRoaXMuc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhTGlzdCA9IGRhdGE7XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGFMaXN0KSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhTGlzdCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFMaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXI6IGRhdGFbaV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogX2NoYXJUeXBlc0VudW0yLmRlZmF1bHQuVVNFUlxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gKDAsIF9pbnB1dFZhbHVlMi5kZWZhdWx0KSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFMaXN0LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IHRoaXMuc2VsZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICBtYXNrOiB0aGlzLl9tYXNrLFxuICAgICAgICAgICAgICAgICAgICBtYXNrQ2hhcjogdGhpcy5fbWFza0NoYXIsXG4gICAgICAgICAgICAgICAgICAgIG1hc2tTdHJpbmc6IHRoaXMuX21hc2tTdHJpbmdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9tYXNrZWRWYWx1ZSA9IHJlc3VsdC5tYXNrZWRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX3Zpc2libGVWYWx1ZSA9IHJlc3VsdC52aXNpYmxlVmFsdWU7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbihyZXN1bHQuc2VsZWN0aW9uKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBJbnB1dENvcmU7XG59KCk7XG5cbnZhciBkZWZhdWx0cyA9IGV4cG9ydHMuZGVmYXVsdHMgPSB7XG4gICAgbWFza0Zvcm1hdDogW3tcbiAgICAgICAgc3RyOiAnMCcsXG4gICAgICAgIHJlZ2V4cDogL1swLTldL1xuICAgIH0sIHtcbiAgICAgICAgc3RyOiAnKicsXG4gICAgICAgIHJlZ2V4cDogLy4vXG4gICAgfSwge1xuICAgICAgICBzdHI6ICdhJyxcbiAgICAgICAgcmVnZXhwOiAvW2EtekEtWl0vXG4gICAgfV0sXG4gICAgbWFza0NoYXI6ICcnLFxuICAgIHNob3dNYXNrOiBmYWxzZSxcbiAgICByZW1vdmVTZWxlY3RlZFJhbmdlOiBfcmVtb3ZlU2VsZWN0ZWRSYW5nZTIuZGVmYXVsdFxufTtcblxudmFyIGNyZWF0ZUlucHV0ID0gZXhwb3J0cy5jcmVhdGVJbnB1dCA9IGZ1bmN0aW9uIGNyZWF0ZUlucHV0KF9yZWYzKSB7XG4gICAgdmFyIHZhbHVlID0gX3JlZjMudmFsdWUsXG4gICAgICAgIG1hc2tTdHJpbmcgPSBfcmVmMy5tYXNrU3RyaW5nLFxuICAgICAgICBtYXNrID0gX3JlZjMubWFzayxcbiAgICAgICAgcmVmb3JtYXQgPSBfcmVmMy5yZWZvcm1hdCxcbiAgICAgICAgX3JlZjMkbWFza0Zvcm1hdCA9IF9yZWYzLm1hc2tGb3JtYXQsXG4gICAgICAgIG1hc2tGb3JtYXQgPSBfcmVmMyRtYXNrRm9ybWF0ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0cy5tYXNrRm9ybWF0IDogX3JlZjMkbWFza0Zvcm1hdCxcbiAgICAgICAgX3JlZjMkbWFza0NoYXIgPSBfcmVmMy5tYXNrQ2hhcixcbiAgICAgICAgbWFza0NoYXIgPSBfcmVmMyRtYXNrQ2hhciA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdHMubWFza0NoYXIgOiBfcmVmMyRtYXNrQ2hhcjtcblxuICAgIHZhciBfcmVmb3JtYXQgPSByZWZvcm1hdDtcbiAgICB2YXIgX21hc2sgPSBtYXNrO1xuICAgIGlmICghX3JlZm9ybWF0ICYmICFfbWFzaykge1xuICAgICAgICBfcmVmb3JtYXQgPSBmdW5jdGlvbiBfcmVmb3JtYXQodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKF9yZWZvcm1hdCkge1xuICAgICAgICBfbWFzayA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBJbnB1dENvcmUoeyB2YWx1ZTogdmFsdWUsIG1hc2s6IF9tYXNrLCByZWZvcm1hdDogX3JlZm9ybWF0LCBtYXNrRm9ybWF0OiBtYXNrRm9ybWF0LCBtYXNrQ2hhcjogbWFza0NoYXIsIG1hc2tTdHJpbmc6IG1hc2tTdHJpbmcgfSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9pbnB1dC1jb3JlL2xpYi9pbnB1dENvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiIWZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGZ1bmN0aW9uIHN1YnNjcmliZUV2ZW50KGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyLCBhZGRTdWJzY3JpcHRpb24sIHJlbW92ZVN1YnNjcmlwdGlvbikge1xuICAgICAgICB2YXIgdW5zdWJzY3JpYmVGdW5jdGlvbiA9IHJlbW92ZVN1YnNjcmlwdGlvbjtcbiAgICAgICAgdmFyIHVuc3Vic2NyaWJlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbGVtZW50W3Vuc3Vic2NyaWJlRnVuY3Rpb25dKGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYWRkU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBlbGVtZW50W2FkZFN1YnNjcmlwdGlvbl0oZXZlbnQsIGhhbmRsZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHVuc3Vic2NyaWJlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlRnVuY3Rpb24gPSAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG4gICAgICAgICAgICByZXR1cm4gdW5zdWJzY3JpYmU7XG5cbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbWVudC5hdHRhY2hFdmVudCkge1xuICAgICAgICAgICAgZXZlbnQgPSAnb24nICsgZXZlbnQ7XG4gICAgICAgICAgICBlbGVtZW50LmF0dGFjaEV2ZW50KGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlRnVuY3Rpb24gPSAnZGV0YWNoRXZlbnQnO1xuICAgICAgICAgICAgcmV0dXJuIHVuc3Vic2NyaWJlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbGVtZW50Lm9uKSB7XG4gICAgICAgICAgICBlbGVtZW50Lm9uKGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlRnVuY3Rpb24gPSAnb2ZmJztcbiAgICAgICAgICAgIHJldHVybiB1bnN1YnNjcmliZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN1YnNjcmliZShlbGVtZW50LCBldmVudCwgaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gc3Vic2NyaWJlRXZlbnQoZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZS5kZWZpbmUgPSBmdW5jdGlvbihhZGRTdWJzY3JpcHRpb24sIHJlbW92ZVN1YnNjcmlwdGlvbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBzdWJzY3JpYmVFdmVudChlbGVtZW50LCBldmVudCwgaGFuZGxlciwgYWRkU3Vic2NyaXB0aW9uLCByZW1vdmVTdWJzY3JpcHRpb24pO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAoZnVuY3Rpb24oc3Vic2NyaWJlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIC8vIENvbW1vbkpTXG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHN1YnNjcmliZTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgICAgIC8vIEFNRC4gYW5vbnltb3VzIG1vZHVsZVxuICAgICAgICAgICAgZGVmaW5lKHN1YnNjcmliZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBHbG9iYWwgc2NvcGVcbiAgICAgICAgICAgIGdsb2JhbC5zdWJzY3JpYmVFdmVudCA9IHN1YnNjcmliZTtcbiAgICAgICAgfVxuICAgIH0pKHN1YnNjcmliZSk7XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3N1YnNjcmliZS1ldmVudC9zdWJzY3JpYmUuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==