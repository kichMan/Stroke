"use strick";
/**
 * Slider ver 1
 * с аппаратным ускорением
 * 
 * Need crossbrowsers:
 * ++IE8++
 * Array.forEach
 * Object.hasOwnProperty
 * Window.getComputedStyle
 * Element.addEventListener
 * Element.childElementCount
 * Element.children[0]
 * Element.nextElementSibling
 * Element.previousElementSibling
 * ++IE9++
 * DOMElement.classList
 * 
 * ++Other++
 * Object.defineProperty
 * DOMElement.dataset
 */

var App = App || {};
App.ext = App.ext || {};

(function(self, Slider){

    /**
     * Property & crossbrowsers
     * 
     * STEP MANAGER
     * 
     * @param DOMElement container
     * @param object nav
     * @param object options
     */
    Slider = function (self, step) {

        merge(self, this);
        createWrap();
        createEvents();

        self.initSteps(step);

        Object.defineProperty(self, 'step', {
            get : function () {return this._step;},

            set : function (val) {
                var test    = getStep(val);

                if(this.isMove === false && test !== false){

                    onStart(this._step, val);
                    //Animation
                    this.animation(val, function(){
                        onFinish(this._step, val);
                    });
                    //init
                    this._step = val;
                }
            }
        });
        
        //PRIVATE FUNCTION
        function merge (f, s, prop) {
            for(prop in s){
                f[prop] = s[prop];
            }
        }

        function createWrap () {
            var wrap    = document.createElement('div'),
                frgm    = document.createDocumentFragment(),
                coll    = [];

            merge(coll, self.children);
            coll.forEach(function (v) {frgm.appendChild(v);});

            wrap.className  = 'wrap';
            wrap.insertBefore(frgm, null);
            self.insertBefore(wrap, null);
            self.wrap = wrap;

            return self;
        }

        function createEvents () {
            var tmp = {};
            self.events.forEach(function(v){
                self[v] = function(fn){
                    self.events[v].push(fn);
                };
                tmp[v] = [];
            });
            self.events = tmp;
            return self;
        }

        function getStep(i){
            var first   = 0,
                last    = --self.steps.length;

            if(i >= first && i <= last && i !== self._step){
                return i;
            }
            return false;
        }

        //Default events
        function onStart (start, finish){
            var com     = start < finish ? 'onNext' : 'onPrev';

            self.isMove = true;

            self.trigger(com);
            self.trigger('onStart', start, finish);
        }

        function onFinish(start, finish){
            var com     = finish === 0 ? true : false;

            self.isMove = false;

            if(!!com){
                self.trigger('onFirst', start);
            }

            if(!com && finish === --self.steps.length){
                
                self.trigger('onLast', start);
            }

            self.trigger('onFinish', start, finish);
        }
        
        
        //END METHOD

        return self;
    };

    //Method
    Slider.prototype = {
        step            : 0,
        isMove          : false,
        steps           : [],
        events          : [
            'onFirst',
            'onLast',
            'onNext',
            'onPrev',
            'onStart',
            'onFinish'
        ],

        trigger         : function(name){
            var ev      = this.events[name];

            if(!!ev){
                ev.forEach(function(v){
                    v.call(this, Array.prototype.slice.call(arguments, 1));
                });
            }

            return this;
        },
        initSteps       : function(id){
            var steps   = this.wrap.children,
                remName = 'remove',
                det, i, tmp;

            if(typeof id === 'number'){
                det = function (i){
                    if(id === i){
                        steps[i].classList.remove(remName);
                        return i;
                    }else{
                        steps[i].classList.add(remName);
                        return false;
                    }
                };
            }else{
                det = function (i){
                    return !steps[i].classList.contains(remName) ? i : false;
                };
            }

            for(i = 0; i < steps.length; i++){
                if((tmp = det(i)) !== false){
                    this._step = tmp;
                }
            }

            this.steps = steps;
            return this.steps.length;
        },
        

        
        /**
         * @param number $id
         * @param function $fn onFinish
         */
        animation       : function(finish, move){
            var start   = this._step,
                wrap    = this.wrap,
                moveTo  = finish < start ? 'toLeft' : 'toRight';

            //add
            wrap.children[finish].classList.remove('remove');
            wrap.classList.add(moveTo);

            wrap.addEventListener(getCrossTransition(), onEnd, false);

            function onEnd(){
                this.removeEventListener(getCrossTransition(), onEnd, false);
                //delete
                this.children[start].classList.add('remove');
                this.classList.remove(moveTo);
                move();
            }

            function getCrossTransition(){ return 'webkitTransitionEnd'; }
        }
    };

    //Init
    self.Slider = Slider;
})(App.ext);


//Create
(function(self, setElem){

    setElem = function(){
        var container   = document.body.querySelector('.container_12'),
            navigate    = document.body.querySelector('.navTabs'),
            elem        = new self.ext.Slider(container);

        navigate.addEventListener('click', function(e){
            var type    = e.target.dataset.navtabs || 0;
            if(!type){
                return false;
            }
            switch(type){
                case 'toLeft'   :elem.step--; break;
                case 'toRight'  :elem.step++; break;
            }
            
        }, false);

        elem.onFirst(   function(){ alert('first'); });
        elem.onLast(    function(){ alert('last'); });
        elem.onNext(    function(){ alert('next'); });
        elem.onPrev(    function(){ alert('prev'); });
        elem.onStart(   function(){ alert('start'); });
        elem.onFinish(  function(){ alert('finish'); });

    };

    document.addEventListener('DOMContentLoaded', setElem, false);

})(App);