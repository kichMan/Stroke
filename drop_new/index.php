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
        <script>
            window.alert = function(s){console.log(s);};
        </script>
        <script src="ready.js"></script>
        <script src="animation.js"></script>
        <script src="area.js"></script>
        
        <style>
            .moveDown
            {
                opacity: 0;
                -webkit-transform: translateX(-100px);
                -webkit-transition: -webkit-transform 1s ease, opacity 1s ease;
            }
            .remove
            {
                display: none;
            }
        </style>
        <script>
            (function(self, setElem){
                document.ready(function(){
                    var selects = document.querySelectorAll('select'),
                        i;

                    for(i = 0; i < selects.length; i++){
                        self.areaDropDown(selects[i])
                    }

                    selects[0].active = true;
            //        selects[1].active = true;
                    alert(selects[0]);
                });
            })(Utk.ui);
        </script>
    </head>
	<body>
        <select style="width:100px" class="widget1">
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
            <option>option 5</option>
        </select>

        <select style="width:100px" class="widget2">
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
            <option>option 5</option>
        </select>
	</body>
</html>