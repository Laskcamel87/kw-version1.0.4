GAME.emit = function(order,data,force){
	if(!this.is_loading||force){
		this.load_start();
		this.socket.emit(order,data);
	}
	else if(this.debug) console.log('failed order',order,data);
}
GAME.emitOrder = function(data,force=false){
	this.emit('ga',data,force);
}
GAME.initiate = function(){
	$('#player_login').text(this.login);
	$('#game_win').show();
	if(this.char_id==0&&this.pid>0){
		this.emitOrder({a:1});
	}
	var len=this.servers.length,con='';
	for(var i=0;i<len;i++){
		con+='<option value="'+this.servers[i]+'">'+LNG['server'+this.servers[i]]+'</option>';
	}
	$('#available_servers').html(con);
	$('#available_servers option[value='+this.server+']').prop('selected',true);
}
$(document).bind('keydown', '1', function(){
        if(JQS.chm.is(":focus") == false){
          $('#gh_game_helper .gh_pvp').click()
        }
        return false;
    });


var caseNumber = 0;
var wait = 5; //chodzenie
var wait2 =1; //chodzenie
var czekajpvp=200; //czeka po przejściu
var licznik=0;
var zmyl=0;
var antybot=false
var stop = true;
var dogory=false;
var loc;
var move1=false;
var move2=false;
var move3=false;
var tabelka=[1,2,4]; //wpisz numery imperiów oprócz swojego 1 - RR, 2- Bogowie, 3 - Demony, 4 - Sayian
var adimp=false;  //zaznacz true jeśli pełnisz funkcję imperatora lub admirała swojego imperium
var i=0;
var d=0;
var licznik2=0;
var wojny=false;
var wojnabogowie=false;
var wojnademony=false;
var wojnasaiyan=false;
var wojnarr=false;
var jestembogiem=false;    // Imperium Bogów
var jestemkrolem=false;     // Imperium Saiyan
var jestemimperatorem=false;   //Imperium Armii Czerwonej Wstęgi
var jestemdemonem=true;      //Imperium Demonów Mrozu
var w=0;
var ilewojen;
var rr=false;
var saiyan=false;
var god=false;
var demon=false;
var WK=false
var gk=GAME.pid;

const VERSION = 'v0.1.3'

/* TEMPLATE */
const $css = "#gh_game_helper {min-width:100px; padding:5px; border:solid gray 1px; background:rgba(22, 22, 93, 0.81); color:gold; position: fixed; top: 40px; right: 5px; z-index:5;}#gh_game_helper .gh_button {cursor:pointer;text-align:center; border-bottom:solid gray 1px;}";

const $html = "<div class='gh_button gh_pvp'>PVP <b class='gh_status red'>Off</b></div><div class='gh_button gh_wi'>WI <b class='gh_status red'>Off</b></div>";

$('body').append("<div id='gh_game_helper'>"+$html+"</div>").append("<style>"+$css+"</style>");


$('#gh_game_helper .gh_pvp').click(() => {
	if (stop) {
		$('#gh_game_helper .gh_pvp')
		$(".gh_pvp .gh_status").removeClass("red").addClass("green").html("On");
		stop = false
		start()
	} else {
		$('#gh_game_helper .gh_pvp')
		$(".gh_pvp .gh_status").removeClass("green").addClass("red").html("Off");
		stop = true
	}
});
$('#gh_game_helper .gh_wi').click(() => {
	if (adimp) {
		$('#gh_game_helper .gh_wi')
		$(".gh_wi .gh_status").removeClass("green").addClass("red").html("Off");
		adimp = false
	} else {
		$('#gh_game_helper .gh_wi')
		$(".gh_wi .gh_status").removeClass("red").addClass("green").html("On");
		adimp = true
	}
});
var tabela99;


function start(){
if(stop === false && tabela99.includes(gk))
{
    if(GAME.clan_wars.length < 10 && GAME.char_data.klan_id==12){
    GAME.emitOrder({a:39,type:24,shorts:"DIVINE;Legend;WEARE;DRAG;ODR;Heroes;MMM;CURSED;Mocarz;DESIRE;POWER;GODS;OP;Angels;WT;CONTRA;Boobs;SPARTA;HG;GOS;DEATH"});
}
    if(GAME.clan_wars.length < 10 && GAME.server==9){
    GAME.emitOrder({a:39,type:24,shorts:"Royal;Devils;KG;LEGION;DuoLin;NGNL;biedra;PGR;CN;NDL;SuP;Senju;KChK;Reb;BFKILL;AF;Ever;SC;ARE;PF;MR"});
}
if(parseInt($('#clan_war_cnt').text()) < 25 && GAME.server==1 && GAME.char_data.klan_id==3542 ||  parseInt($('#clan_war_cnt').text()) < 20 && GAME.server==1 && GAME.char_data.klan_id==3434){
    GAME.emitOrder({a:39,type:24,shorts:"fdsfsd;DK;PAKT;ZONG;DEMON;DOME;Legend;FRSPG;Saiyan;UVM;Ramizb;DARK;Shadow;MoOEn;MWars;LWDB;GM;Soul;JSKA;Say;Ssc;ZSCH;BDS;gimme;SSJL;SDS;CORP;PT;ROYALE;LEGION;BSS;BTK;WBB;LORDS;KNIGHT;LSSJ;BHD;ABCDEG;SzMR;GSayan;SKS"});
			}
	if(!GAME.is_loading && !stop && tabela99.includes(gk)){
	if(!GAME.is_loading && tabela99.includes(gk)){
	if(!checkAntyBot() || !GAME.is_loading && !stop && tabela99.includes(gk)){
action();
	}
	else{window.setTimeout(idziewgore,6000);}
	}
	else {window.setTimeout(start,wait);}
	}
	else {window.setTimeout(start,wait);}
}
	function action(){
switch (caseNumber) {
case 0:
caseNumber++;
check_position_x();
break;
case 1:
caseNumber++;
check_position_y();	
break;
case 2:
caseNumber++;
check_players();
break;
case 3:
caseNumber++;
check_players2();
break;
case 4:
caseNumber++;
kill_players();
break;
case 5:
caseNumber++;
check_location();
break;
case 6:
caseNumber++;
go();
break;
case 7:
caseNumber++;
wojny1();
break;
case 8:
caseNumber++;
check_war();
break;
case 9:
caseNumber=0;
w_w2();
break;
default:
}}}

function go(){
var x = GAME.char_data.x;
var y = GAME.char_data.y;	
		
	

	if (x==11 && y==11 && dogory && loc==1 ){
	cofanie2();
}
else if (x==15 && y==15 && move3 && loc==2){
	cofanie();
}
else if (x==2 && y==11 && loc==1 && move1){
	przejdz();
	window.setTimeout(go_right,1000);
	}
	else if (x==1 && y==1 && loc==2 && move3){
	przejdz();
	window.setTimeout(go_right,1000);
	}
	
	else if(x==7 && y ==7 && loc==2 && move2 || x==9 && y==7 && loc==2 && move2){
		prawodol();
		
	}
	else if(x==8 && y==8 && loc==2 && move2 || x==10 && y==8 && loc==2 && move2){
		prawogora();
	}
	else if(x==10 && y==11 && loc==1){
	dogory=true;
	 go_right();}
	else if(x==10 && y==2 && loc==1){
		dogory=false;
		go_left();
	}
	else if(x==5 && y==10 && loc==1){
	move1=true;
	 go_left();}
	 else if(x==10 && y==10 && loc==1){
	move1=true;
	 go_left();}
	else if(x==3 && y==1 && loc==2){
		move1=false;
		go_right();
	}
	
	else if (x==3 && y==10 && loc==1){
	lewodol();
	}
	else if (x==2 && y==8 && loc==1){
	prawodol();
	}
	else if (x==11 && y==11 && loc==1 || x==15 && y==15 && loc==2){
	go_up();
}
else if(x==5 && y==7 && loc==2){
	move2=true;
	 go_right();}
	else if(x==13 && y==7 && loc==2){
		move2=false;
		go_right();
	}
	else if(x==12 && y==15 && loc==2){
	move3=true;
	 go_right();}
	else if(x==5 && y==11 && loc==1){
		move3=false;
		go_right();
	}
	else if(x==10 && y==15 && loc==2){
	move3=true;
	 go_right();}
	else if(x==7 && y==11 && loc==1){
		move3=false;
		go_right();
	}
	else if (x==7 && y==7 && loc==2){
	go_down();
	}

 else if (x<11 && y%2!==0 && loc==1 || x<15 && y%2!==0 && loc==2){
	go_right();
}
else if (x>2 && y%2==0 && loc==1 || x>1 && y%2==0 && loc==2){
	go_left();
}
else if (x==11 && loc==1 || x==2 && loc==1 || x==3 && y==9 && loc==1 || x==1 && loc==2 || x==15 && loc==2 || x==7 && y==7 && loc==2){
	go_down();
	
}
}



function cofanie(){
	y = GAME.char_data.y
	if(y<=1){
		window.setTimeout(start,wait);
	}
	else{
	GAME.emitOrder({a:4,dir:6,vo:GAME.map_options.vo});
window.setTimeout(cofanie,50);
}
}

function cofanie2(){
	y = GAME.char_data.y
	if(y<=2){
		window.setTimeout(start,wait);
	}
	else{
	GAME.emitOrder({a:4,dir:2,vo:GAME.map_options.vo});
	move1=true;
window.setTimeout(cofanie2,50);
}
}
function prawodol(){
	GAME.emitOrder({a:4,dir:3,vo:GAME.map_options.vo});
	window.setTimeout(start,wait);
}

function prawogora(){
	GAME.emitOrder({a:4,dir:5,vo:GAME.map_options.vo});
	
	window.setTimeout(start,wait);
}
function lewodol(){
	GAME.emitOrder({a:4,dir:4,vo:GAME.map_options.vo});
	window.setTimeout(start,wait);
}

function go_up(){
	GAME.emitOrder({a:4,dir:2,vo:GAME.map_options.vo});
window.setTimeout(start,wait);
}


function go_down(){
	GAME.emitOrder({a:4,dir:1,vo:GAME.map_options.vo});
	window.setTimeout(start,wait);
}

function go_left(){
	GAME.emitOrder({a:4,dir:8,vo:GAME.map_options.vo});
	window.setTimeout(start,wait);
}

function go_right(){
GAME.emitOrder({a:4,dir:7,vo:GAME.map_options.vo});
window.setTimeout(start,wait);
}
function check_position_x(){
x = GAME.char_data.x
window.setTimeout(start,wait);
}
function check_position_y(){
y = GAME.char_data.y
window.setTimeout(start,wait);
}

 

function checkAntyBot(){
if(GAME.premiumData === undefined || GAME.premiumData === null){
return false;
}else{
	obecnyy=$('#map_y').text();
	obecnyx=$('#map_x').text();
tab=GAME.premiumData;
tab1=Object.entries(tab);
dlugosctablicy=tab1.length;
tab2=tab1[dlugosctablicy-1];
tab3=tab2[0].split("_");
koordx=parseInt(tab3[0]);
koordy=parseInt(tab3[1]);
return true;
}

}
function idziewgore(){
	y=parseInt($('#map_y').text());
	if(y<koordy){
		GAME.map_move(1);  //do dołu
		window.setTimeout(idziewboki,waitzagadka);
	}
	else if (y>koordy){
		GAME.map_move(2);    // do góry
		window.setTimeout(idziewboki,waitzagadka);
	}
	else if(y==koordy){
		window.setTimeout(idziewboki,waitzagadka);
	}
}

function idziewboki(){
	x=parseInt($('#map_x').text());
	if(x<koordx){
		GAME.map_move(7);  // w prawo
		window.setTimeout(idziewgore,waitzagadka);
	}
	else if (x>koordx){
		GAME.map_move(8); // w lewo
		window.setTimeout(idziewgore,waitzagadka);
	}
	else if(x==koordx  && y==koordy){
		window.setTimeout(powrot,waitzagadka);
	}
	else {window.setTimeout(idziewgore,waitzagadka);
	}
}


function powrot(){
	x=parseInt($('#map_x').text());
	if(x<obecnyx){
		GAME.map_move(7); //w prawo
		window.setTimeout(powrot2,waitzagadka);
	}
	else if (x>obecnyx){
		GAME.map_move(8); // w lewo
		window.setTimeout(powrot2,waitzagadka);
	}
	else if(x==obecnyx){
		window.setTimeout(powrot2,waitzagadka);
	}
}

function powrot2(){
	y=parseInt($('#map_y').text());
	if(y<obecnyy){
		GAME.map_move(1); // do dołu
		window.setTimeout(powrot,waitzagadka);
	}
	else if (y>obecnyy){
		GAME.map_move(2);  // do góry
		window.setTimeout(powrot,waitzagadka);
	}
	else if(y==obecnyy && x==obecnyx){
		window.setTimeout(start,waitzagadka);
	}
	else {window.setTimeout(powrot,waitzagadka);
	}
}

function check_players(){
	
	if(0<document.getElementById("player_list_con").childElementCount){
		y = GAME.char_data.y
		tabb=document.getElementById("player_list_con").children[0].children[1].children[0].textContent.split(":");
	if(document.getElementById("player_list_con").children[0].children[1].childElementCount==3){
		tabb=document.getElementById("player_list_con").children[0].children[1].children[0].textContent.split(":");
		if( parseInt(tabb[1])<=1 && y==2){
			window.setTimeout(check_players,1500);}
		else{
			window.setTimeout(start,wait);}
		}else{
			window.setTimeout(start,wait);}
	}else {window.setTimeout(start,wait);}

}
function check_players2(){
	if(0<document.getElementById("player_list_con").childElementCount){
		tabb=document.getElementById("player_list_con").children[0].children[1].children[0].textContent.split(":");
	if( parseInt(tabb[2])<=30 && parseInt(tabb[1])<=0 ){	
			window.setTimeout(check_players2,1500);}
			else {
			window.setTimeout(start,czekajpvp)}
			}else {window.setTimeout(start,czekajpvp)
	}
}

function kill_players(){
if($("#player_list_con").find("[data-option=load_more_players]").length==1){
    $("#player_list_con").find("[data-option=load_more_players]").click();
	window.setTimeout(kill_players,150);
	}
       else if(licznik<document.getElementById("player_list_con").childElementCount){
            if(document.getElementById("player_list_con").children[licznik].children[1].children[0].attributes[1].value==="gpvp_attack" || document.getElementById("player_list_con").children[licznik].children[1].children[1].attributes[1].value==="gpvp_attack")
            {GAME.emitOrder({a:24,type:1,char_id:document.getElementById("player_list_con").children[licznik].children[0].children[1].attributes[2].value,quick:1});
        licznik++;
        window.setTimeout(kill_players,czekajpvp);
        }
        else {GAME.emitOrder({a:24,char_id:document.getElementById("player_list_con").children[licznik].children[1].children[1].attributes[2].value,quick:1});
        licznik++;
        window.setTimeout(kill_players,czekajpvp);

        }
        }
    else {window.setTimeout(start,wait);
    licznik=0;
	kom_clear();}
}
	

function przejdz(){
		
			GAME.emitOrder({a:6,tpid:0});
			
			window.setTimeout(stop,1000);
		move3=false;
		move1=false;
	}
	
			
function check_location(){
	if($('#map_name').text()==="Głębia")
	{ 	loc=1;
		
		
		window.setTimeout(start,wait);}
         else if($('#map_name').text()==="Głębia Rajskiej Sali"){
			loc=2;
			
		
			window.setTimeout(start,wait);}
			else {
					loc=7;
					//czekajpvp=100;
				window.setTimeout(start,wait);}
		
}

function w_w(){
window.setTimeout(start,wait);
}
function check_war(){
window.setTimeout(start,wait);
}

function w_w2(){
	window.setTimeout(start,wait);
}

function wojny1(){
	if(!GAME.emp_enemies.includes(1) && ![GAME.char_data.empire].includes(1) && adimp){
		GAME.emitOrder({a:50,type:7,target:1});
		window.setTimeout(start,wait);
	} else if(!GAME.emp_enemies.includes(2) && ![GAME.char_data.empire].includes(2) && adimp){
		GAME.emitOrder({a:50,type:7,target:2});
		window.setTimeout(start,wait);
	} else if(!GAME.emp_enemies.includes(3) && ![GAME.char_data.empire].includes(3) && adimp){
		GAME.emitOrder({a:50,type:7,target:3});
		window.setTimeout(start,wait);
	} else if(!GAME.emp_enemies.includes(4) && ![GAME.char_data.empire].includes(4) && adimp){
		GAME.emitOrder({a:50,type:7,target:4});
		window.setTimeout(start,wait);
	} else {
		window.setTimeout(start,wait);
	}
}	

start();