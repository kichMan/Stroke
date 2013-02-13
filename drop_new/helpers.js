/**
 * ===============================================
 * HELPERS
 * ===============================================
 */

 //FOR IE8
/**
 * Method forEach
 * 
 * Not have only IE8 and ver. FF < 1.5
 * @link https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach
 */
if(!Array.prototype.forEach){
    Array.prototype.forEach = function(fn, scope) {
        for(var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope, this[i], i, this);
        }
    };
}
/**
 * String.trim()
 * @link https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/Trim
 */
if(!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g,'');
    };
}
/**
 * Array.indexOf()
 * 
 * @link https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
 */
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        if (this == null) {
            throw new TypeError();
        }

        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}
/**
 * Event.addEventListener
 * 
 * @todo Add events to DOMNode
 */
if(!('addEventListener' in window) && !!('attachEvent' in window)){
    var elem = (window.HTMLElement || window.Element).prototype;
    elem.addEventListener = function(ev, fn){
        this.attachEvent('on' + ev, fn);
    };
}

/**
 * Method getPrototypeOf
 */
if(!Object.getPrototypeOf){
    Object.getPrototypeOf = function (obj) {
        if({}.__proto__){
            return obj.__proto__;
        }else{
            return obj.constructor.prototype;
        }
    };
}

//ALL BROWSERS

/**
 * Object.defineProperty
 * 
 * Has conflict with jQuery
 * 
Object.prototype.defineProperty = function(obj, prop, desc){
    if('defineProperty' in Object){
        try {
            Object.defineProperty(obj, prop, desc);
        } catch (e){
            if (e.number === -0x7FF5EC54) {
                desc.enumerable = false;
                Object.defineProperty(obj, prop, desc);
            }
        }
    }else{
        obj.__defineGetter__(prop, desc.get);
        obj.__defineSetter__(prop, desc.set);
    }
};
*/

/**
 * Bind method
 * @link https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind
 */
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - reseted!");
        }

        var aArgs   = Array.prototype.slice.call(arguments, 1),
            fToBind = this, 
            fNOP    = function () {},
            fBound  = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

/**
 * Library classList
 * 
 * @link https://developer.mozilla.org/en-US/docs/DOM/element.classList
 */
window.alert = function(s){console.log(s);};

if (!("classList" in document.createElement("a"))) {

    (function (window) {
        if (!('HTMLElement' in window) && !('Element' in window)){
            return;
        }

        var elemCtrProto    = (window.HTMLElement || window.Element).prototype,
            ClassList;

        function merge(f, s, prop){
            for(prop in s){
                f[prop] = s[prop];
            }
        }
        
        ClassList = function (elem) {
            var trimmedClasses  = elem.className.trim(),
                classes         = trimmedClasses
                                ? trimmedClasses.split(/\s+/) : [],
                i;

            for (i = 0; i < classes.length; i++) {
                this.push(classes[i]);
            }

            this._updateClassName = function () {
                elem.className = this.toString();
            };

        };
        ClassList.prototype = new Array;
        merge(ClassList.prototype, {
            item: function(i){
                return this[i] || null;
            },
            contains: function(token){
                return this.indexOf(token) !== -1;
            },
            add: function(){
                var tokens = arguments,
                    i = 0,
                    l = tokens.length,
                    token,
                    updated = false;

                do {
                    token = tokens[i] + "";
                    if (this.indexOf(token) === -1) {
                        this.push(token);
                        updated = true;
                    }
                }
                while (++i < l);

                if (updated) {
                    this._updateClassName();
                }
            },
            remove      : function(){
                var tokens = arguments,
                    i = 0,
                    l = tokens.length,
                    token,
                    updated = false;

                do {
                    token = tokens[i] + "";
                    var index = this.indexOf(token);
                    if (index !== -1) {
                        this.splice(index, 1);
                        updated = true;
                    }
                }
                while (++i < l);

                if (updated) {
                    this._updateClassName();
                }
            },
            toggle      : function(token, forse){
                var result  = this.contains(token),
                    method  = result
                            ? forse !== true && "remove"
                            : forse !== false && "add";

                if (method) {
                    this[method](token);
                }

                return result;
            },
            toString    : function(){
                return this.join(" ");
            }
        });

        Object.defineProperty(elemCtrProto, 'classList', {
            get         : function(){ return new ClassList(this); },
            set         : function(){}
        });

    })(window);
}