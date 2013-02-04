"use strict";

var Utk = Utk || {};
Utk.ui = Utk.ui || {};

//Новый движок выпадающего списка
(function(self, areaDropDown){
    /**
     * @param area
     * @param control
     * @returns method generate
     */
    areaDropDown = function(){
        var self = this,
            prop;

        function trigger (author){
            self.list.forEach(function(v){
                if(v != author){
                    v.active = false;
                }
            });
        };

        return function(elem){
            for(prop in self.property){
                elem[prop] = self.property[prop];
            }

            elem  = self.create(elem);

            Object.defineProperty(elem, 'active', {
                get: function(){
                    return this._active;
                },
                set: function(v){
                    var event = !!v ? 'onShow': 'onHide';
                    if(!!v){
                        trigger(this);
                    }
                    this[event]();
                    this._active = v;
                }
            });

            self.list.push(elem);
            return elem;
        };
    };

    areaDropDown.prototype = {
        list    : [],
        create  : function(elem){
            //Здесь отрисовка
            return elem;
        },
        property: {
            _active: false,
            onShow: function(){
                this.classList.remove('remove');
            },
            onHide: function(){
                self.animation.call(this, 'moveDown', function(){
                    this.classList.add('remove');
                });
            }
        }
    };
    self.areaDropDown = new areaDropDown;
})(Utk.ui);