"use strict";

var Utk = Utk || {};
Utk.event = Utk.event || {};

(function(self, Ready){
    Ready = function(){
        var self = this;

        function execute (){
            document.removeEventListener('DOMContentLoaded', execute, false);
            self.list.forEach(function(v){
                v.call(document);
            });
        }

        return function(fn){
            self.list.push(fn);
            if(!!self.bind){
                return;
            }
            document.addEventListener('DOMContentLoaded', execute, false);
            self.bind = true;
        };
    };

    Ready.prototype = {
        list    : [],
        bind    : false
    };
    
    document.ready  = new Ready;
    self.ready      = Ready;
})(Utk.event);