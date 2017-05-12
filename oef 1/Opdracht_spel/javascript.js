var Teller = 0;
var TellerDiamant = 0;
var punten = 0;
var redderSpawn = 0;
var diamantSpawn = 0;
var enemySpawn = 0;
var hit_list_Persoon = [];
var hit_list_redder = [];
var hit_list_diamant = [];
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
var test = $('.Vijand');
var Vijanden = [];
var x, y;
var X, Y;
var article = $("article");

function Vijand(x, y) {
    "use strict";
	this.element = $('<div/>', {
		class: "Vijand"
	});
	this.x = X;
	this.y = Y;
	this.element.css('left', X);
	this.element.css('bottom', Y);
	this.element.appendTo(article);
	
}

function test1() {
    
    
    Vijanden.push(new Vijand(pTop, pLeft)); 
}

$(function () {
    "use strict";
    pTop = $("#Persoon").position().top;
    pLeft = $("#Persoon").position().left;
    $('article').css('height', articelH * 70);
    $('article').css('width', articelW * 70);
    $('article').css('left', PlayerW);
    $('article').css('top', PlayerH);
    test1();
  
    
});

$(document).ready(function () {
    $("#StartKnop").click(function () {
       $("body").load("index.html");
    });
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
   
    
     veldHeight = $('article').height();
    veldWidth = $('article').width();
    playerHeight = $("#Persoon").height();
    playerWidth = $("#Persoon").width();
}