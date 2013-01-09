<?php
/*============================================================================*/
setlocale(LC_ALL, "ru_RU.utf8");
header('Content-type: text/html; charset=utf-8');
/*============================================================================*/
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Test stroke ver 1</title>
		<!--960_12_col.css-->
        <link rel="stylesheet" href="https://gist.github.com/raw/4496380/7dc6fe6161ca2dcfd6b5c3d43e6fd4d972d0cc2a/gistfile1.css">
        <link rel="stylesheet" href="style.css">
        <script>
            window.alert = function(s){console.log(s);};
        </script>
        <script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
        <script src="stroke.js"></script>
    </head>
	<body>
        <div class="container_12">
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
        <hr>
        <center class="navTabs">
            <button class="btn_actionLeft" data-navtabs= "toLeft">Left</button>
            <button class="btn_actionRight" data-navtabs="toRight">Right</button>
        </center>
	</body>
</html>