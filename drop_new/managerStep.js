/**
 * Need crossbrowsers method
 * 
 * bind
 * classList
 * forEach
 * 
 */

"use strict";

var Utk = Utk || {};
Utk.ext = Utk.ext || {};

(function(self, animation, managerStep){

    managerStep = function(elem, step){
        var ext = this;

        ext.source      = elem;
        ext._step       = step++ || 0;
        ext.trigList    = {};

        //Call private function
//        merge(elem, ext.fn);
        createWrap();
        init();
        createEvents();

        
        /**
         * set  должен получать либо строку, либо объект, либо число
         */
        Object.defineProperty(elem, 'step', {
            get: function(){return ext._step;},
            set: function(step){
                //Если символьный указатель
                if(typeof step === 'string' && !!ext.events[step]){
                    ext.trigger(step, true);
                    return false;
                }
                ext._step = step;
            }
        });

        /*
         * @todo Инициализировать id шага, после инициализации объекта
         */
        function init(){
            var steps = ext.elWrap.children;

            if(!steps){
                return false;
            }

            if(!ext.elCurr){
                ext.elCurr = steps[ext._step];
            }

            //основная задача
            for(var i = 0; i < steps.length; i++){
                if(steps[i] !== ext.elCurr){
                    steps[i].classList.add(ext.clRemove);
                }else{
                    steps[i].classList.remove(ext.clRemove);
                }
            }

            return false;
        }

        function merge (f, s, prop) {
            for(prop in s){
                f[prop] = s[prop];
            }
        }

        function createWrap(){
            var wrap    = document.createElement(ext.elWrap),
                frgm    = document.createDocumentFragment(),
                coll    = [];

            merge(coll, elem.children);
            coll.forEach(function (v) {frgm.appendChild(v);});

            wrap.className  = ext.clWrap;
            wrap.insertBefore(frgm, null);
            elem.insertBefore(wrap, null);
            wrap.addEventListener('DOMSubtreeModified', init, false);
            ext.elWrap = wrap;
            return elem;
        }

        function createEvents(){
            var ev_names    = ext.events,
                list        = ext.trigList,
                name;

            for(name in ev_names){
                list[name] = [];
                elem[name] = function(name, fn){
                    list[name].push(fn);
                }.bind(elem, name);
            }
        }

        return elem;
    };

    managerStep.prototype = {
        _step           : 0,
        elCurr          : false,
        elWrap          : 'div',
        clWrap          : 'wrap',
        clRemove        : 'remove',

        trigger         : function(name){
            var arg     = Array.prototype.slice.call(arguments, 1),
                source  = this.source,
                ev      = this.events[name],
                res;

            arg.unshift(this);

            if(!!ev && !!(res = ev.apply(source, arg))){
                this.trigList[name].forEach(function(fn){
                    fn.apply(source, res);
                });
                return true;
            }

            return false;
        },

        events          : {
            /**
             * инициализируются функции прототипа
             * @param store Объект хранилище
             */
            onFirst     : function(){},
            onLast      : function(){},
            onNext      : function(store, isStart){
                alert(arguments);
                return false;
            },
            onPrev      : function(){},
            onStart     : function(){},
            onFinish    : function(){}
        },

        animation       : function(){}

    };

    self.managerStep = managerStep;
})(Utk.ext, Utk.ui.animation);