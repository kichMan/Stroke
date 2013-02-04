"use strict";

var Utk = Utk || {};
Utk.ext = Utk.ext || {};

(function(self, ui, managerStep){

    managerStep = function(elem, step){
        var ext = this;

        merge(elem, ext.fn);
        createWrap();
//        init();
        
        
        Object.defineProperty(elem, 'step', {
            get: function(){ return ext._step; },
            set: function(val){ ext._step = val; }
        });

        function init(){
            //Перебирает потомков, кэширует текущий
            //@todo нужна функция которая будет в фазу всплытия
            //присваивать вновь созданному элементу класс remove
            //Или вовсе пересмотреть реализацию, например ранее
            //кэшировать активный источник
            var steps   = elem.wrap.children,
                ln      = --steps.length;
            
            alert(steps[ln]);
//            ext._step = 10;
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
            elem.wrap = wrap;
            elem.wrap.addEventListener('DOMSubtreeModified', init, true);
//            elem.addEventListener('DOMSubtreeModified', init, true);
            return elem;
        }

        return elem;
    };

    managerStep.prototype = {
        _step           : 0,
        elWrap          : 'div',
        clWrap          : 'wrap',
        clRemove        : 'remove',
        fn              : {
            trigger     : function(){}
        }
    };

    self.managerStep = managerStep;
})(Utk.ext, Utk.ui);