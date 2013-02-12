<?php
/*=======================================================================================*/
setlocale(LC_ALL, "ru_RU.utf8");
header('Content-type: text/html; charset=utf-8');
/*=======================================================================================*/
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Test slider ver 1</title>
        <link rel="stylesheet" href="https://gist.github.com/raw/4496380/7dc6fe6161ca2dcfd6b5c3d43e6fd4d972d0cc2a/gistfile1.css">
        <link rel="stylesheet" href="style.css">
        <script>
            window.alert = function(s){console.log(s);};
        </script>
        <script src="helpers.js"></script>
        <script src="ready.js"></script>
        <script src="animation.js"></script>
        <script src="area.js"></script>
        <script src="managerStep.js"></script>
        
        <style></style>
        <script>
            (function(self, setElem){
                document.ready(function(){
                    var cont1   = document.querySelector('.test1'),
                        cont2   = document.querySelector('.test2'),
                        btn_l   = document.querySelector('.btn_actionLeft'),
                        btn_r   = document.querySelector('.btn_actionRight'),
                        
                        elem1   = new Utk.ext.managerStep(cont1, 2),
                        elem2   = new Utk.ext.managerStep(cont2);
                        
                    elem1.onNext(function(arr){
                        alert(this);
                    });

                    elem1.step = 'onNext';
                    alert(elem1);
                    elem1.step = 1;



                    /*
                    btn_l.onclick = function(){
                        var div = document.createElement('div');
                        cont.wrap.appendChild(div);
                    }
                    
                    btn_r.onclick = function(){
                        alert(cont._step);
                    };
                    */

                });
            })(Utk.ui);
        </script>
    </head>
	<body>
        <div class="container_12 test1">
            <div class="children remove">
                <div class="grid_3">1</div>
                <div class="grid_3">2</div>
                <div class="grid_3">3</div>
                <div class="grid_3">4</div>
            </div>
            <div class="children">
                <div class="grid_3">5</div>
                <div class="grid_3">6</div>
                <div class="grid_3">7</div>
                <div class="grid_3">8</div>
            </div>
            <div class="children remove">
                <div class="grid_3">9</div>
                <div class="grid_3">10</div>
                <div class="grid_3">11</div>
                <div class="grid_3">12</div>
            </div>
        </div>

        <div class="container_12 test2">
            <div class="children remove">
                <div class="grid_3">1</div>
                <div class="grid_3">2</div>
                <div class="grid_3">3</div>
                <div class="grid_3">4</div>
            </div>
            <div class="children">
                <div class="grid_3">5</div>
                <div class="grid_3">6</div>
                <div class="grid_3">7</div>
                <div class="grid_3">8</div>
            </div>
            <div class="children remove">
                <div class="grid_3">9</div>
                <div class="grid_3">10</div>
                <div class="grid_3">11</div>
                <div class="grid_3">12</div>
            </div>
        </div>

        <center class="navTabs">
            <button class="btn_actionLeft" data-navtabs= "toLeft">Left</button>
            <button class="btn_actionRight thisClass isClass" data-navtabs="toRight">Right</button>
        </center>
	</body>
</html>


