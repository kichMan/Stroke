"use strict";

var Utk = Utk || {};
Utk.ui = Utk.ui || {};

(function(self, Animation){

    Animation = function(){
        var self = this;

        return function(name, meth){
            if(!name){
                return false;
            }

            meth = meth || function(){};
            this.classList.add(name);
            this.addEventListener(self.getTransition(), onEnd, false);
            function onEnd(){
                this.removeEventListener(self.getTransition(), onEnd, false);
                this.classList.remove(name);
                meth.call(this);
            };
            return this;
        };
    };

    Animation.prototype = {
        /**
         * @todo Create all browsers
         */
        getTransition: function (){
            return 'webkitTransitionEnd';
        }
    };

    self.animation = new Animation;
})(Utk.ui);