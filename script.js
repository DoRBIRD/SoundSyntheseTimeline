//Canvas Attribute
var
width = innerWidth/2-10,
height = innerHeight-37,
canvas = document.getElementById("index"),
image = new Image();
image.src = "logo.png";

BtnZoomIn = new Image();
BtnZoomIn.src = "BtnZoomIn.jpg";
BtnZoomOut = new Image();
BtnZoomOut.src = "BtnZoomOut.jpg";
background = new Image();
background.src = "background.jpg"
ausblendung = new Image();
ausblendung.src = "ausblendung.png";
ausblendungo = new Image();
ausblendungo.src = "ausblendungoben.png";
logo2 = new Image();
logo2.src = "yamahaLogo.jpg";
marker = new Image();
marker.src = "marker.png";
noten = new Image();
noten.src = "1.png";
noten2 = new Image();
noten2.src = "2.png";
noten3 = new Image();
noten3.src = "3.png";


ctx = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;
canvas.setAttribute('tabindex', 1);

webpage = document.getElementById("webpage");
var webpagewidth =innerWidth/2-25;
webpage.width =  webpagewidth;
webpage.height = innerHeight-37;
webpage.margin = "0px";
webpage.padding = "0px";
webpage.borer = "0px";

//Attribute für die Anwendung
var lMitte = [];
lMitte.dicke = 10,
heightY = 0,
zoomfaktor = 3,
standardabstand = 20,

//Daten
heute = new Date();
startjahr = 1800;
if (startjahr < 1800){startjahr = 1800;}
endjahr = heute.getFullYear();
if (endjahr < 2015){endjahr = 2015;}
anzahljahre = endjahr-startjahr;

colorList=new Array('#113F8C','#01A4A4','#00A1CB','#61AE24','#D0D102','#32742C','#D70060','#E54028','#F18D05');
colorcounter=0;


function verkleinern(){
		$( this).animate({
			width : innerWidth/3-10,
			webpagewidth: innerWidth*2/3-25
		}, {
		progress: function( now, fx ) {
			animateVerkleinern();
		}, fail: function(){
			//alert("Hallo");
		},
	});
	
}

function vergroessern(){
		$( this).animate({
			webpagewidth: innerWidth/2-25,
			width : innerWidth/2-10
			
		}, {
		progress: function( now, fx ) {
			animateVerkleinern();
		}, fail: function(){
			//alert("Hallo");
		},
	});
	
}

function animateVerkleinern(){
	canvas.width = width;
	webpage.width = webpagewidth;
	zeitstrahlZeichnen(zoomfaktor);
}

window.onload = function(){
	zeitstrahlZeichnen(zoomfaktor);
}


//WICHTIG! hier werden die events drin gespeichert.
var eventListe = [];

//liste aller kategorien, wird automatisch erweitert
var kategorieListe = [];



//Text, der an den x und y koordinaten mit einer mitgegebenen schriftart gezeichnet wird
function standardText(text,x,y){
	ctx.font="13px Arial";
	ctx.fillText(text,x,y);
}

function grosserText(text,x,y){
	ctx.font="20px Arial";
	ctx.fillText(text,x,y);
}

function stringToColor(){
	
}

//ist fuer das zeichnen des gesamten zeitstrahls verantwortlich. wird immer ausgefuehrt, wenn der nutzer navigiert.
//faktor: mitgegebener zoomfaktor
function zeitstrahlZeichnen(faktor){
	//1.alles loeschen
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//Dynamischer Hintergrund:
	
	ctx.drawImage(background,0,0+heightY*.1,background.width,background.height);
	ctx.drawImage(noten3,0,0+heightY*.2,noten.width,noten.height);
	ctx.drawImage(noten2,0,0+heightY*.3,noten.width,noten.height);
	ctx.drawImage(noten,0,0+heightY*.4,noten.width,noten.height);
	//ctx.drawImage(image,10,canvas.height*8/10);
	ctx.drawImage(BtnZoomIn,width-width/5-20,height/10+20,10,10);
	ctx.drawImage(BtnZoomOut,width-width/5+110, height/10+20,10,10);
	//2. mittellinie
	mittellinieZeichnen();
	
	//3. daten neben die mittellinie zeichnen
	zahlenZeichnen();
	
	//4. events zeichnen
	eventsZeichnen();
	
	//5. zeichnet zoombalken + tastenbelegung oben rechts.
	zoomBalkenZeichnen();
	
	if(ausgewaehltesEvent!=null){
		ctx.fillStyle = eventListe[ausgewaehltesEvent].color,
		
		grosserText("Beschreibung:",width/2+100,200);
		standardText(eventListe[ausgewaehltesEvent].langtext,width/2+100,300);
		ctx.drawImage(logo2,width/2+100,700,logo2.width,logo2.height);
	}

	//6. zeichnet die ausgewaehlten kategorien
	kategorieListeZeichnen();
	
	//ctx.drawImage(ausblendungo,0,0,width,ausblendungo.height);
	//ctx.drawImage(ausblendung,0,height-100,width,ausblendung.height);
	//7. zeichnet scrollbalken
	//ctx.fillStyle = '#FFFFFF';
	//ctx.fillRect(10,heightY*zoomfaktor,10,200);
}



function kategorieListeZeichnen(){
	ctx.fillStyle = '#222222';
	//ctx.fillRect(width*2/3,height*2/3,width*1/3-10,height*1/3-10);	
	ctx.fillStyle = '#FFFFFF';
	grosserText("Kategorien:",width*2/3+10,height*2/3-10);
	//standardText("Aktive Kategorien werden gruen, inaktive rot angezeigt.",width*2/3+10,height*2/3-40)
	textMitZeilenumbruch(kategorieListe,width*2/3, height*2/3)

}

//zeichnet die attribute "Name" eines mitgegebenen arrays als zeilenumbruch

//TODO: 
//provisiorisch und unflexible, keine ahnung wie das sonst geht.. (soll von aussen ausgewähltes attribut zeichnen können)
function textMitZeilenumbruch(text,x,y){

	for(var i = 0; i<text.length ; i++){
		var derText = text[i].name;
		ctx.fillStyle = text[i].color;
		
		if(!text[i].aktiv){
			ctx.fillStyle = '#565656';
			derText+= " (inaktiv)";
		}
		ctx.drawImage(BtnZoomIn,x+10, 10+y+20*i,10,10);
		standardText(derText, x+30, 20+y+20*i);
	}
}



function mittellinieZeichnen(){
	//mittellinie wird mithilfe einer vorgegebenen dicke (lmitte.dicke) in der mitte der canvas gezeichnet (vertikal)
	drawShadow((width-lMitte.dicke)/2,0,lMitte.dicke,canvas.height)
	ctx.fillStyle = '#FFFFFF';
	ctx.fillRect((width-lMitte.dicke)/2,0,lMitte.dicke,canvas.height)
}

function drawShadow(xs,ys,w,h){
	ctx.globalAlpha = .3;
	ctx.fillStyle = '#000000';
	ctx.fillRect(xs+5,ys+5,w,h);
	ctx.globalAlpha = 1;
}

function toHex(str) {
	var hex = '';
	for(var i=0;i<3;i++) {
		hex += ''+(str.charCodeAt(i)*2).toString(16);
	}
	console.log(hex);
	return '#'+hex;

}

//WICHTIG!
//gibt die YPosition für ein ntes element zurueck, die auf dem bildschirm "gezeichnet" wird.

function getDrawnY(p){
	if(p==undefined){
		p = 0;
	}
	return (p+1)*zoomfaktor*standardabstand+heightY;
}

function zahlenZeichnen(){
	//geht alle jahre durch (von 0 aus zaehlend)
	for (i = 0; i <= anzahljahre; i++){
		//vertikale Position des jeweiligen Jahres wird durch folgende formel berechnet (heightY ist dabei die scrollhoehe des users.): 
		var posY = getDrawnY(i);
		ctx.fillStyle = '#FFFFFF';
		
		
		//ab einem bestimmten zoomfaktor zeichnet das programm manche werte nicht mehr / faerbt diese grau
		
		//zeichnen der striche rechts neben der mittellinie
		if(zoomfaktor <= .25){
			if((i+startjahr)%5 == 0){
				ctx.fillRect(width/2+lMitte.dicke/2,posY,10,2)
			}
		}else{
			ctx.fillRect(width/2+lMitte.dicke/2,posY,10,2)
		}
		
		//zeichnen der eigentlichen daten.
		ctx.fillStyle = '#797979';
		if(zoomfaktor>=1){
			if((i+startjahr)%5==0){
				ctx.fillStyle = '#FFFFFF';
			}
			
			standardText(startjahr+i,width/2+lMitte.dicke/2+10,posY+4);
		}else{
			if((i+startjahr)%5 == 0){
				ctx.fillStyle = '#FFFFFF';
				standardText(startjahr+i,width/2+lMitte.dicke/2+10,posY+4);
			}
		}
	}
}



function zoomBalkenZeichnen(){
	//zeichnet zoombalken oben rechts + infotext
	ctx.fillStyle = '#FFFFFF';
	standardText("Zoomstufe: " + parseInt(zoomfaktor*100,10)/100 + "x",width-width/5,height/10);
	ctx.fillRect(width-width/5,height/10+20,103,10)
	ctx.fillStyle = '#548400';
	ctx.fillRect(width-width/5+zoomfaktor*10-2,height/10+20,6,10)
	
	
	// now images to work with dynamic numbers
	// ctx.fillStyle = '#FFFFFF';
	// ctx.fillRect(width-width/5-20,height/10+20,10,10)	
	// ctx.fillRect(width-width/5+110,height/10+20,10,10)
	
	// ctx.fillStyle = '#548400';
	// ctx.fillRect(width-width/5-20,height/10+24,10,2)
	// ctx.fillRect(width-width/5+110,height/10+24,10,2)
	// ctx.fillRect(width-width/5+114,height/10+20,2,10)
}

//prueft ob array.name einem mitgegebenem namen entspricht.
//TODO:
//sehr provisorisch und unsauber im moment, da man es nur für arrays mit dem attribut "NAME" verwenden kann.
//!!!!!!
function containsString(obj,array){
	for(var i = 0; i < array.length;i++){
		if(array[i].name === obj){
			return true;
		}
	}
	return false;
}

function containsStringAtPlace(obj,array){
	for(var i = 0; i < array.length;i++){
		if(array[i].name === obj){
			return i;
		}
	}
	return -1;
}
//kategorie deaktivieren (derzeit noch ueber konsole)
//TODO:
function kategorieAendern(i){

	kategorieListe[i].aktiv = !kategorieListe[i].aktiv;
	zeitstrahlZeichnen();
	return kategorieListe[i];
}

function eventErstellen(start,ende,text,langtext,kategorie, webpage){
	//erstellt ein event mit einem startjahr, einem endjahr, einer beschreibung und einer Farbe.
	webpage = "http://insw2.fk4.hs-bremen.de:1680/de/index.php/"+text+"?useformat=mobile";
	dauer = ende-start;
	ebene = 1;
	if(start!=ende) ebene=1;
	for(i= 0; i < eventListe.length; i++){
		e = eventListe[i];
		
		//ordnet dieses automatisch ein (damit sich zwei events nicht überschneiden können.)
		
		if(start != ende){
			if(schneidenSich(start,ende,e.start,e.end)){
					if(e.dauer > dauer){
						ebene++;
					}else{
						e.ebene++;
					}
			}
		}else{
			ebene = -1;
		}
	}

	
	//Color hochzaehler
	color=colorList[colorcounter%(colorList.length-1)];
	//colorcounter++;
	

	//fuegt die kategorie der liste hinzu, falls diese noch nicht existiert.
	var pushIn = {name: kategorie, aktiv: true,color : color};
		if(!containsString(kategorie,kategorieListe)){
			
			kategorieListe.push(pushIn);
			colorcounter++;
			
			
		}
	color = colorList[containsStringAtPlace(kategorie,kategorieListe)];
	//color = toHex(kategorie);
	eventListe.push({start: start, end: ende, text: text, color: color,dauer: dauer, ebene: ebene,langtext:langtext, kategorie: kategorie,webpage:webpage})
	
}

function kategorieAktiv(kategorie){
	return kategorieListe[containsStringAtPlace(kategorie,kategorieListe)].aktiv;
}

function schneidenSich(start1,ende1,start2,ende2){
	//testet, ob zwei events sich schneiden
	if(liegtDazwischen(start1,start2,ende2)||liegtDazwischen(ende1,start2,ende2)||liegtDazwischen(start2,start1,ende1)||liegtDazwischen(ende2,start1,ende1) /* || start1 == start2 && ende1 == ende2 */){
		
		return true;
	}
	
	return false;
}



function liegtDazwischen(punkt,start,ende){
	//unterfunktion von schneidenSich
	if(start <= punkt && punkt <= ende){
		return true;
	}
	
	return false;
}

var testvar = 0;


//==== EVENTS ZEICHNEN ====//
function eventsZeichnen(){
	//zeichnet alle events aus der eventListe an der richtigen position
	var posYZaehler=0;
	var lastMilestoneYear=0;
	var counterSameYearMS=0;
	for(i = 0; i < eventListe.length; i++){
		
		var e = eventListe[i];

		if(kategorieAktiv(e.kategorie) == true){
			//Position & Groesse Berechnen
			var start = getDrawnY(e.start-startjahr);
			var size = getDrawnY(e.end-e.start)-heightY+2;
			var posX = (width-lMitte.dicke)/2-20-20*e.ebene;
			
			//Position fuer den Text
			var posText = posX-200;
			var posTextY = 20;
			
			/*
			if(e.start == e.end){
				posX = (width-lMitte.dicke)/2+60
				
				posText = posX+30
				posTextY = 0;
			}*/
			if(e.start == e.end){
					var markersize=10;
					ctx.fillStyle = e.color;
				 	ctx.beginPath();
					ctx.arc(posX, start, markersize, 0, Math.PI*2, true);
					ctx.closePath();
					ctx.fill(); 
					
					ctx.beginPath();
					ctx.moveTo(posX,start+markersize);
					ctx.lineTo(posX+markersize*3,start);
					ctx.lineTo(posX,start-markersize);
					ctx.fill();
					
			}else{
			
			
				drawShadow(posX,start,10,size);
				ctx.fillStyle = e.color;
				ctx.fillRect(posX-1,start,12,2)        //   --   Start-segment
				ctx.fillRect(posX,start,10,size);      //   ||   Middle-segment
				ctx.fillRect(posX-1,start+size-2,12,2) //   --   End-segment
			}
			
			start = start+size/2;
			
	
			if(e.start!=e.end){
				standardText(e.start + "-" + e.end,20,start);
				start+=20;
			}else{
				if(lastMilestoneYear==e.start){
					counterSameYearMS++;
					start+=10*counterSameYearMS;
				}else{
					counterSameYearMS=0;
				}
				lastMilestoneYear=e.start;
			}
			if(ausgewaehltesEvent == i){
				grosserText(e.text, 20,start)
			}else{
				standardText(e.text, 20,start)
				
			}
			posYZaehler++;
		}
		
	}
	
}

function getJahrAnhandPosition(pos){
	//gibt ein Jahr anhand seiner vertikalen position zurueck. -> als gleitkommazahl 
	//bsp: 2001,42 ; 1990
	return (pos-heightY)/(zoomfaktor*standardabstand)-1+startjahr;
}

function zoomIn(f){
	//zoomt vertikal hinein
	if(f==null){
		f =.1
	}
	if(zoomfaktor+f<=10){
		easeZoom(f);
	}
	zeitstrahlZeichnen(zoomfaktor);
	
}

function easeZoom(f){
	$(this).stop();
	$( this).animate({
			zoomfaktor: zoomfaktor+f
		}, {
		step: function( now, fx ) {
			zeitstrahlZeichnen(zoomfaktor);
		}, complete: function(){
			
		},easing: "linear"
	});
}

function zoomOut(f){
	//zoomt vertikal raus
	
	heightY=0;
	if(f==null){
		f=-.1
	}
	if(zoomfaktor-f>=.3){
		easeZoom(f);
	}
	zeitstrahlZeichnen(zoomfaktor);
	
}

function zoomStufe(f){
	//legt eine feste zoomstufe fest
	zoomfaktor = f;
	zeitstrahlZeichnen(zoomfaktor);
}
var moving = false;
function move(speed){
	//verschiebt den zeitstrahl vertikal um <speed> einheiten.
	
	$(this).stop();
	$( this).animate({
			heightY: heightY+speed*zoomfaktor
		}, {
		step: function( now, fx ) {
			zeitstrahlZeichnen(zoomfaktor);
		}, complete: function(){
			
		}, fail: function(){
			//alert("Hallo");
		}, easing : "linear",
	});
	
	zeitstrahlZeichnen(zoomfaktor);
	
}
$(window).bind('mousewheel DOMMouseScroll', function(event){
    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
		move(500);
    }
    else {
        move(-500);
    }
});

function scrolleJahre(anzahl){
	move(-20*anzahl);
}
var zaehler = 0;



//=====KEYDOWN=====



canvas.onkeydown=function(evt){
zaehler ++;
console.log(zaehler);
	//gedrueckte tasten des users
	evt = evt || window.event;
	var kk = evt.keyCode
	//bei + taste : zoom in
	if(kk==187){
		zoomIn();
	}
	//bei - taste : zoom out
	else if(kk == 189){
		zoomOut();
	}
	//bei pfeil nach oben: 1 jahr nach oben scrollen
	else if(kk == 38){
		scrolleJahre(-1);
		
	}
	//bei pfeil nach unten: 1 jahr nach unten scrollen
	else if(kk == 40){
		scrolleJahre(1);
	}
	//bei taste 0 : lege fixe zoomstufe .1 fest
	else if(kk == 48){
		zoomStufe(.1);
	}else if(kk == 65){
		
		if(bool){
			vergroessern();
		}else{
			verkleinern();
		}
		bool=!bool;
	}
	
};

var bool = false;


//===================== MouseWheelZoom ===================== 
/*
// For Chrome
window.addEventListener('mousewheel', mouseWheelEvent);

// For Firefox
window.addEventListener('DOMMouseScroll', mouseWheelEvent);

function mouseWheelEvent(e) {
    var delta = e.wheelDelta ? e.wheelDelta : -e.detail;
	if(delta<0){
		move(40)
	}else{
		move(-40)
	}
}
*/

//===========================================================  


function getTotalY(y){
	return y*zoomfaktor+heightY;
}

var ausgewaehltesEvent = null;
var mouseY

onmousemove=function mDown(evt){
	var x = evt.clientX;     // horizontale position
	mouseY = getTotalY(evt.clientY); //vertikale Position vom Mauszeiger (endgueltig) + scrollbarabstand
	var y2 = evt.clientY;
	pruefeEvent(x,mouseY,y2);

	
	zeitstrahlZeichnen(zoomfaktor);
}
	//BtnZoomOut X
	var cox  = width-width/5+116;
	var cox2 = cox + 15
	//BtnZoomIn X
	var cix  = width-width/5-16;
	var cix2 = cix + 16
	//BtnZoomOut & BtnZoomIn Y
	var cy  = height/10+25;
	var cy2 = cy + 15;
	

onclick=function mDown(evt){
	
	var x = evt.clientX;     // horizontale position
	var y2 = evt.clientY;     // horizontale position
	var y = getTotalY(evt.clientY); //vertikale Position vom rMauszeiger (endgueltig) + scrollbarabstand; also the wrong number to use =.=
	//console.log("Geklickt bei "+ x + " - " + y2 + "        Y(total): " + y);
	//console.log("cix: " + cix + " cix2: " + cix2 + " cy: " + cy + " cy2: " + cy2);
	//console.log("cox: " + cox + " cox2: " + cox2 + " cy: " + cy + " cy2: " + cy2);
	// console.log(" zoomfaktor: " + zoomfaktor);
	// console.log(" totalY " + getTotalY(y));
	//console.log(" ");
	
	pressZoom(x,y2);
	if(ausgewaehltesEvent!=null){
		if(eventListe[ausgewaehltesEvent].webpage!=undefined){
			webpage.src = eventListe[ausgewaehltesEvent].webpage;
		}
		
	}
	
}



function pressZoom(x,y){
// variables are not available here, therefore static numbers are used again :/
/* 	cox2 = cox + BtnZoomOut.width
	cix2 = cix + BtnZoomOut.width
	cy2  = cy  + BtnZoomOut.height;
 */
	if(x>=cox && x<=cox2 && y>=cy && y<=cy2)zoomOut();
		// if(x>=width-width/5-20&&x<=width-width/5-10&&y>=getTotalY(height/10+20)&&y<=getTotalY(height/10+30))zoomOut();
	if(x>=cix && x<= cix2 && y>= cy && y<= cy2)zoomIn();
		// if(x>=width-width/5+110&&x<=width-width/5+120&&y>=getTotalY(height/10+20)&&y<=getTotalY(height/10+30))zoomIn();
	if(x>=10 && x<=10+image.width && y>=height*8/10 && y<=height*8/10+image.height)webpage.src="http://87.106.49.122/w/index.php/ARP";
}

locked = false;

//prueft ein bestimmtes event
function pruefeEvent(x,mouseY,y2,click){
	if(locked ==false){
	ausgewaehltesEvent = null;
	for(i = 0; i < eventListe.length;i++){

		e = eventListe[i];
		if(kategorieAktiv(e.kategorie)){
			startX = (width-lMitte.dicke)/2-15-20*e.ebene;
			endeX = startX + 13;
			
			
			
			startY = getDrawnY(e.start-startjahr)+7;
			endeY =  startY +getDrawnY(e.end-e.start)-heightY+2;
			
			if(endeX >= x && x >= startX && y2 >= startY && y2 <= endeY){
				ausgewaehltesEvent = i;
				return i;
			}
		}
	}
}
	return false;
}

//hier sind die ganzen werte drin..
function main(){
	//hier werden alle events erstellt.
	
	//Hersteller
	eventErstellen(1935,endjahr,"Yamaha","",'Hersteller', 0);
	eventErstellen(1853 ,1955,"Wurlitzer Electric Piano","Bis zur Herausgabe.",'Hersteller', 0);
	
	
	//Milestones
 	eventErstellen(1962,1962,"Chamberlin/Mellotron","",'Meilenstein',0);
	eventErstellen(1964,1964,"Robert Moog Modularsystem","",'Meilenstein',0);
	eventErstellen(1968,1968,"Hohner Clavinet D6","",'Meilenstein',0);
	eventErstellen(1971,1971,"Moog, Minimoog","",'Meilenstein',0);
	eventErstellen(1972,1972,"Arp Odyssey","",'Meilenstein',0);
	eventErstellen(1973,1973,"Roland SH-1000","",'Meilenstein',0);
	eventErstellen(1973,1973,"Oberheim","",'Meilenstein',0);
	eventErstellen(1975,1975,"Moog, Polymoog","",'Meilenstein',0);
	eventErstellen(1976,1976,"New England Digital","",'Meilenstein',0);
	eventErstellen(1977,1977,"Yamaha CS-80","",'Meilenstein',0);
	eventErstellen(1978,1978,"Sequential Cirquits Prophet 5","",'Meilenstein',0);
	eventErstellen(1978,1978,"Korg MS10/MS20","",'Meilenstein',0);
	eventErstellen(1979,1979,"CMI Fairlight","",'Meilenstein',0);
	eventErstellen(1980,1980,"PPG Wavecomputer 360","",'Meilenstein',0);
	eventErstellen(1980,1980,"Oberheim OBXa","",'Meilenstein',0);
	eventErstellen(1980,1980,"Korg Polysix","",'Meilenstein',0);
	eventErstellen(1981,1981,"Roland Jupiter 8","",'Meilenstein',0);
	eventErstellen(1981,1981,"Yamaha GS1","",'Meilenstein',0);
	eventErstellen(1983,1983,"Yamaha CP-70 Electric Grand","",'Meilenstein',0);
	eventErstellen(1983,1983,"Yamaha DX7","",'Meilenstein',0);
	eventErstellen(1984,1984,"Casio CZ-101 (Phase Distortion Synthese)","",'Meilenstein',0);
	eventErstellen(1984,1984,"Akai S612 Sampler","",'Meilenstein',0);
	eventErstellen(1985,1985,"Akai S900 Sampler","",'Meilenstein',0);
	eventErstellen(1986,1986,"Sequential Cirquits Prophet VS","",'Meilenstein',0);
	eventErstellen(1987,1987,"Roland D-50","",'Meilenstein',0);
	eventErstellen(1988,1988,"Korg M1","",'Meilenstein',0);
	eventErstellen(1990,1990,"Korg Wavestation","",'Meilenstein',0);
	eventErstellen(1991,1991,"Roland Sound Canvas SC-55","",'Meilenstein',0);
	eventErstellen(1992,1992,"Novation","",'Meilenstein',0);
	eventErstellen(1994,1994,"Yamaha VL1","",'Meilenstein',0);
	eventErstellen(1995,1995,"Clavia Nordlead","",'Meilenstein',0);
	eventErstellen(1996,1996,"Kawai K5000","",'Meilenstein',0);
	eventErstellen(1997,1997,"Yamaha AN1x","",'Meilenstein',0);
	eventErstellen(1997,1997,"Roland JP-8000","",'Meilenstein',0);
	eventErstellen(1998,1998,"Novation Super Nova","",'Meilenstein',0);
	eventErstellen(2001,2001,"Hartmann Music Neuron","",'Meilenstein',0); 

	zeitstrahlZeichnen(zoomfaktor);
}

main();
