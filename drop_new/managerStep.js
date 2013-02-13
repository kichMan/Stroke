/**
 * Need crossbrowsers method
 * 
 * bind
 * classList
 * forEach
 * 
 * @link http://www.quirksmode.org/dom/w3c_core.html
 * Element.nextElementSibling
 * Element.previousElementSibling
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
        createWrap();
        init();
        createEvents();

        
        /**
         * set  должен получать либо строку, либо число
         */
        Object.defineProperty(elem, 'step', {
            get: function(){return ext._step;},
            set: function(step){
                var command;

                //Если строковый указатель
                //@todo рассмотреть вариант с определением именно здесь
                if(step === 'next'){
                    step = ext._step + 1;
                }
                if(step === 'prev'){
                    step = ext._step - 1;
                }

                step = step++;

                if(step === ext._step || step < 0){
                    return false;
                }

                command = step > ext._step ? 'onNext' : 'onPrev';
                if(!!ext.trigger(command, step)){
                    ext._step = step;
                }
            }
        });

        /*
         * @todo Инициализировать id шага, после инициализации объекта
         */
        function init(){
            var steps   = ext.elWrap.children,
                i       = 0,
                command;

            if(!steps){
                return false;
            }

            if(!ext.elCurr){
                ext.elCurr = steps[ext._step];
            }

            //основная задача
            for(i; i < steps.length; i++){
                command = steps[i] !== ext.elCurr ? 'add' : 'remove';
                steps[i].classList[command](ext.clRemove);
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

            if(!!ev && (res = ev.apply(source, arg)) !== false){
                this.trigList[name].forEach(function(fn){
                    fn.apply(source, (res instanceof Array ? res: [res]));
                });
                return true;
            }

            return false;
        },

        events          : {
            /**
             * инициализируются функции прототипа
             * временно, перемещение только по соседям
             * @param store Объект хранилище
             */
            onNext      : function(store, step){
                var currEl  = store.elCurr,
                    nextEl  = currEl.nextElementSibling;
                
                if(!nextEl){
                    return false;
                }
                
                store.trigger('onStart');

                /*test degin*/
                alert('===========');
                alert('next');
                alert(arguments);
                alert('===========');
                /*test end*/
                return;
            },
            onPrev      : function(store, step){
                var currEl  = store.elCurr,
                    nextEl  = currEl.previousElementSibling;

                if(!nextEl){
                    return false;
                }
                store.trigger('onStart', currEl, nextEl);
                
                /*test degin*/
                alert('===========');
                alert('prev');
                alert(arguments);
                alert('===========');
                /*test end*/

                return;
            },
            onFirst     : function(){},
            onLast      : function(){},
            onStart     : function(){},
            onFinish    : function(){}
        },

        animation       : function(){}

    };

    self.managerStep = managerStep;
})(Utk.ext, Utk.ui.animation);