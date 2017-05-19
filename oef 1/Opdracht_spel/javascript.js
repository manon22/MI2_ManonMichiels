var Teller = 0;
var TellerDiamant = 0;
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
var EW,EH = 0;
var MaxVijand = 5;

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
var article = document.getElementsByTagName("article");

function Vijand(x, y) {
    "use strict";
	this.element = $('<div/>', {
		class: "Vijand"
	});
	this.X = x;
	this.Y = y;
	this.element.css('left', x);
	this.element.css('top', y);
	this.element.appendTo(article);
    this.Richting ="rechts";
	
}
function beweeg() {
	"use strict";
	//console.log('loopt door');
	var i;
	for (i = 0; i < Vijanden.length; i += 1) {
		Vijanden[i].beweeg();
	}
}

Vijand.prototype.beweeg = function () {
	"use strict";
	if (this.Richting === "links") {
		if (this.X > 0) {
			this.links();
		} else {
			this.Richting = "rechts";
			this.rechts();
		}
	}
	if (this.Richting === "rechts") {
		if (this.X < (Math.floor(window.innerWidth - 100))) {
			this.rechts();
		} else {
			this.Richting = "links";
			this.links();
		}
	}
};

Vijand.prototype.links = function () {
	"use strict";
	this.element.animate({
		left: "-=20"
	}, 1);
	this.X -= 20;
};
Vijand.prototype.rechts = function () {
	"use strict";
	this.element.animate({
		left: "+=20"
	}, 1);
	this.X += 20;
};

function test1() {
    if (Vijanden.length < MaxVijand){
         EW = Math.floor(Math.random() * window.innerWidth);
        EH = Math.floor(Math.random() * window.innerHeight);
        Vijanden.push(new Vijand(EW, EH));
        //$('h1').show(0);
    }
    
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
    setInterval(test1, 2000);
    setInterval(beweeg, 100);
  
    
});

$(document).ready(function () {
    $("#StartKnop").click(function () {
       $("body").load("index.html");
    });
    $(article).click(function () {
        $("ul").hide(1000);
        $('h1').hide(0);
       
        
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


function spawnEnemy(naam) {
	console.log('test');
    var posx = Math.floor(Math.random() * window.innerWidth - 100);
    var posy = Math.floor(Math.random() * window.innerHeight - 100);
    hit_list_Persoon = [];
    $(naam).each(function (i, Pokeball) {
		console.log('test2');
        $("#Pokeball").css({
            position: 'absolute'
            , left: posx + 'px'
            , top: posy + 'px'
        });
    });
}

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
		check();
        break;
    case 38: //boven
        if (pTop > 0) {
            pTop -= 10;
            $("#Persoon").css('top', pTop + 'px');
        }
        hoek = 0;
			check();
        break;
    case 39: //rechts
        if (pLeft < (veldWidth - playerWidth)) {
            pLeft += 10;
            $("#Persoon").css('left', pLeft + 'px');
        }
        hoek = 0;
			check();
        break;
    case 40: //onder
        if (pTop < (veldHeight - playerHeight)) {
            pTop += 10;
            $("#Persoon").css('top', pTop + 'px');
        }
        hoek = 0;
			check();
        break;

    }
   
    hit_list_Persoon = $("#Persoon").collision("#Pokeball");
    
    veldHeight = $('article').height();
    veldWidth = $('article').width();
    playerHeight = $("#Persoon").height();
    playerWidth = $("#Persoon").width();
    
    

};
function check() {
	
	if (hit_list_Persoon.length > 0){
		
		spawnEnemy("#Pokeball");
        Teller += 1;
        document.getElementById('Score').innerHTML = 'Pokeballs: ' + Teller;
        
        

	}


}
	
	
	
