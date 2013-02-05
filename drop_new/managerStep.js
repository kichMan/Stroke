"use strict";

var Utk = Utk || {};
Utk.ext = Utk.ext || {};

(function(self, animation, managerStep){

    managerStep = function(elem, step){
        var ext = this;

        ext._step = step++ || 0;
//        merge(elem, ext.fn);
        createWrap();
        init();

        Object.defineProperty(elem, 'step', {
            get: function(){ return ext._step; },
            set: function(val){ ext._step = val; }
        });

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

        function createEvents(){}

        return elem;
    };

    managerStep.prototype = {
        _step           : 0,
        elCurr          : false,
        elWrap          : 'div',
        clWrap          : 'wrap',
        clRemove        : 'remove',
        
        trigList        : {},
        trigger         : function(){},
        events          : {
            //инициализируются функции прототипа
            onFirst     : function(){},
            onLast      : function(){},
            onNext      : function(){},
            onPrev      : function(){},
            onStart     : function(){},
            onFinish    : function(){}
        }

    };

    self.managerStep = managerStep;
})(Utk.ext, Utk.ui.animation);