var Teller = 0;
var TellerDiamant = 0;
var punten = 0;
var hit_list_Persoon = [];
var redderSpawn = 0;
var diamantSpawn = 0;
var hit_list_redder = [];
var hit_list_diamant = [];
var enemySpawn = 0;
var Opengeklapt = true;
var articelH = Math.floor(window.innerHeight / 70);
var articelW = Math.floor(window.innerWidth / 70);
var PlayerW = ((window.innerWidth) - (articelW * 70)) / 2;
var PlayerH = ((window.innerHeight) - (articelH * 70)) / 2;
var speler = '<div id="Persoon"></div>';
var pLeft = 0;
var pTop = 0;
var veldHeight;
var veldWidth;
var playerHeight;
var playerWidth;
var playerX;
var playerY;
$(function () {
    pTop = $("#Persoon").position().top;
    pLeft = $("#Persoon").position().left;
    $('article').css('height', articelH * 70);
    $('article').css('width', articelW * 70);
    $('article').css('left', PlayerW);
    $('article').css('left', PlayerH);
    hit_list_Persoon = $("#Persoon").collision(".Pokeball");
    
     veldHeight = $('article').height();
    veldWidth = $('article').width();
    playerHeight = $("#Persoon").height();
    playerWidth = $("#Persoon").width();

    if (hit_list_Persoon.length > 0) {
        if (Teller % 2 == 2 && Teller < 4) {
            $("body").append('<div class="Pokeball"> </div> ');
        }
        else {
            $(".Redder").remove();
        }
        redderSpawn = Math.floor((Math.random() * 100));
        if (redderSpawn >= 55) {
            $("body").append('<div class="Redder"></div>');
            spawnEnemy(".Redder");
        }
        $(".Pokeball").css("visibility", "hidden");
        $(".Vijand").css("visibility", "hidden");
        $("body").css("background-color", "black");
      
      
        Teller += 1;
        UpdateTeller();
        spawnEnemy(".Pokeball");
        enemySpawn = Math.floor((Math.random() * 100));
        if (enemySpawn >= 0) {
            if (enemySpawn >= 0 && enemySpawn < 33) {
                $(".Vijand").css("background-image", "url(Images/cart_pokemon18.gif)");
            }
            if (enemySpawn >= 34 && enemySpawn < 66) {
                $(".Vijand").css("background-image", "url(Images/enemy.gif)");
            }
            $("body").append('<div class="Vijand"></div>');
            if (enemySpawn > 67 && enemySpawn < 100) {
                $(".Vijand").css("background-image", "url(Images/Ferreligator.png)");
            }
            $(".Vijand").css("visibility", "visible");
            spawnEnemy(".Vijand");
        }
    }
    else {
        $(".Pokeball").css("visibility", "visible");
        $(".Vijand").css("visibility", "visible");
        $("body").css("background-color", "black");
        //if (Teller >= 3) {
        //    $("body").css("background-color", "blue");
        //}
        //else {
        //    $("body").css("background-color", "white");
    }
    hit_list_redder = $("#Persoon").collision(".Redder");
    if (hit_list_redder.length > 0) {
        if (Teller >= 5) {
            Teller = Teller - 5;
            $(".Redder").remove();
            $(".Vijand").remove();
            UpdateTeller();
        }
    }
    hit_list_diamant = $("#Persoon").collision(".Diamant");
    if (hit_list_diamant.length > 0) {
        if (TellerDiamant === 10) {
            $(".Evolutie").css("background-image", "url(Images/giphy.gif)");
            $(".Diamant").remove();
            UpdateTellerDiamant();
        }
    }
    TellerDiamant += 1;
    diamantSpawn = Math.floor((Math.random() * 100));
    if (diamantSpawn >= 75) {
        $(".Diamant").css("background-image", "url(Images/dia.gif)");
    }
    $(".Redder").css("visibility", "visible");
    spawnDiamant(".Diamant");
});

function spawnEnemy(naam) {
    var posx = (Math.random() * ($(document).width() - 50)).toFixed();
    var posy = (Math.random() * ($(document).height() - 50)).toFixed();
    hit_list_Persoon = [];
    $(naam).each(function (i, Pokeball) {
        $(Pokeball).css({
            position: 'absolute'
            , left: ((Math.random() * ($(document).width() - 50)).toFixed()) + 'px'
            , top: ((Math.random() * ($(document).height() - 50)).toFixed()) + 'px'
        });
    });
    //    function spawnShaymin() {
    //    var posx = (Math.random() * ($(document).width() - 50)).toFixed();
    //            var posy = (Math.random() * ($(document).height() - 50)).toFixed();
    //            
    //            hit_list_Shaymin = [];
    //             $(".Shaymin").each(function (i, Shaymin) {
    //                 $(Shaymin).css({
    //                position: 'absolute'
    //                , left: ((Math.random() * ($(document).width() - 50)).toFixed()) + 'px'
    //                , top: ((Math.random() * ($(document).height() - 50)).toFixed()) + 'px'
    //            , });
    //             });
    // }
}

function spawnDiamant(naam) {
    var posx = (Math.random() * ($(document).width() - 30)).toFixed();
    var posy = (Math.random() * ($(document).height() - 30)).toFixed();
    hit_list_Persoon = [];
    $(naam).each(function (i, Diamant) {
        $(Diamant).css({
            position: 'absolute'
            , left: ((Math.random() * ($(document).width() - 50)).toFixed()) + 'px'
            , top: ((Math.random() * ($(document).height() - 50)).toFixed()) + 'px'
        , });
    });
}

function UpdateTeller() {
    $("#Score").empty(Teller);
    $("#Score").append("Pokeballs: " + Teller);
}

function UpdateTellerDiamant() {
    $("#DiamantScore").empty(TellerDiamant);
    $("#DiamantScore").append("Diamanten: " + TellerDiamant);
}
//$(function () {
//    $("ul").click(function () {
//        $(this).hide();
//       Opengeklapt = false;
//   });
$(document).ready(function () {
   
    $("button").click(function () {
        $("ul").hide(1000);
    });
    $("#InstructieKnop").click(function () {
        if (!Opengeklapt) {
            $("ul").show();
            Opengeklapt = true;
        }
        else {
            $("ul").hide();
            Opengeklapt = false;
        }
    });
});
//keyboard functies
document.onkeydown = function (e) {
    //var positie = $("#Persoon").position();
    var hoek;
    switch (e.keyCode) {
    case 37: //links
        if (pLeft > 0) {
            pLeft -= 10;
            $("#Persoon").css('left', pLeft + 'px');
        }
        hoek = 0;
        break;
    case 38: //boven
        if (pTop > 0) {
            pTop -= 10;
            $("#Persoon").css('top', pTop + 'px');
        }
        hoek = 0;
        break;
    case 39: //rechts
        if (pLeft < (veldWidth - playerWidth)) {
            pLeft += 10;
            $("#Persoon").css('left', pLeft + 'px');
        }
        hoek = 0;
        break;
    case 40: //onder
        if (pTop < (veldHeight - playerHeight)) {
            pTop += 10;
            $("#Persoon").css('top', pTop + 'px');
        }
        hoek = 0;
        break;
    }
};