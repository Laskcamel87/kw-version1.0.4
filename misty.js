//Konfiguracja
var wait; //szybkoœæ skryptu 1-1000 im mniejsza wartoœæ tym szybciej
var useBlueBeans = true; // czy ma byæ u¿yta niebieska fasolka
var useRedBeans = false; // czy ma byæ u¿yta czerwona fasolka
var quantityBlue = Math.floor(GAME.getCharMaxPr() / 100 * 0.7); //ile ma byæ u¿ytych niebieskich fasolek 
var limitPA = Math.floor(GAME.getCharMaxPr() / 100 * 0.2) // iloœæ PA przy której u¿ywana jest fasolka 
var stop = true; //zatrzyamnie skryptu
var killMystic = true; //zbijanie mistic
var checkSSJ=true;
var usedSenzu = false; // nie zmieniać tu nic
//---------------------------------------------------------------------------------------------------------
var checkOST = true;; //automatycznie włącza subke 
var downb = false;
var whatNow = 0;
var subka=false;
var zmiana=true;
var $doubler_bar = document.getElementById('doubler_bar')
//---------------------WYGLAD----------------------------------

const $css = "#gh_game_helper {min-width:100px; padding:5px; border:solid gray 1px; background:rgba(22, 22, 93, 0.81); color:gold; position: fixed; top: 40px; right: 5px; z-index:5;}#gh_game_helper .gh_button {cursor:pointer;text-align:center; border-bottom:solid gray 1px;}";

const $html = "<div class='gh_button gh_exp'>Resp <b class='gh_status red'>Off</b></div><div class='gh_button gh_xost'>xOst <b class='gh_status red'>Off</b></div><div class='gh_button gh_x20'>x20 <b class='gh_status red'>Off</b></div><div class='gh_button gh_senzu'>Senzu <b class='gh_status red'>BLUE</b></div>";

$('body').append("<div id='gh_game_helper'>"+$html+"</div>").append("<style>"+$css+"</style>");
var gk=GAME.pid;
/* ACTIONS */
$('#gh_game_helper .gh_exp').click(() => {
	if (stop) {
		$('#gh_game_helper .gh_exp')
		$(".gh_exp .gh_status").removeClass("red").addClass("green").html("On");
		stop = false
	} else {
		$('#gh_game_helper .gh_exp')
		$(".gh_exp .gh_status").removeClass("green").addClass("red").html("Off");
		stop = true
	}
});
$('#gh_game_helper .gh_x20').click(() => {
	if (zmiana) {
		$('#gh_game_helper .gh_x20')
		$(".gh_x20 .gh_status").removeClass("red").addClass("green").html("On");
		subka = 1;
		zmiana=false;
		$(".gh_xost .gh_status").removeClass("green").addClass("red").html("Off");
	} else {
		$('#gh_game_helper .gh_x20')
		$(".gh_x20 .gh_status").removeClass("green").addClass("red").html("Off");
		subka = false;
		zmiana=true;
	}
});
$('#gh_game_helper .gh_xost').click(() => {
	if (zmiana) {
		$('#gh_game_helper .gh_xost')
		$(".gh_xost .gh_status").removeClass("red").addClass("green").html("On");
		subka = 0;
		zmiana=false;
		$(".gh_x20 .gh_status").removeClass("green").addClass("red").html("Off");
	} else {
		$('#gh_game_helper .gh_xost')
		$(".gh_xost .gh_status").removeClass("green").addClass("red").html("Off");
		subka = false;	
		zmiana=true;
	}	
});
$('#gh_game_helper .gh_senzu').click(() => {
	if (useBlueBeans) {
		$('#gh_game_helper .gh_senzu')
		$(".gh_senzu .gh_status").removeClass("red").addClass("red").html("RED");
		useRedBeans = true;
        useBlueBeans = false;
	} else {
		$('#gh_game_helper .gh_senzu')
		$(".gh_senzu .gh_status").removeClass("red").addClass("red").html("BLUE");
		useRedBeans = false;
        useBlueBeans = true;
	}	
});
$(document).bind('keydown', '1', function(){
        if(JQS.chm.is(":focus") == false){
          $('#gh_game_helper .gh_exp').click()
        }
        return false;
    });
//-----------------------------------------------------

GAME.emitOrder = (data) => GAME.socket.emit('ga',data);

GAME.questAction = () => {
	if(GAME.quest_action){
		GAME.emitOrder({a:22,type:7,id:GAME.quest_action_qid,cnt:GAME.quest_action_max});
    }
}
var tabela99;

function start(){
	if(!stop && !checkTR() && !checkSU() && tabela99.includes(gk)){
		action();
		go();
		window.setTimeout(start,wait);
	}else{
		window.setTimeout(start,wait);
	}
}

function action(){
	switch(whatNow){
		case 0:
			whatNow++;
			kill();
		break;
		case 1:
			whatNow++;
			if(killMystic){ kill_mystic(); }
		break;
		case 2:
			whatNow++;
			kill_auto();
		break;
		case 3:
			whatNow++;
			kill_epic();
		break;
		case 4:
			whatNow++;
			go();
		break;
		default: kill(); whatNow=0; break;
	}
}

function checkSU(){
	if(checkOST && !stop){
		if($("#doubler_bar")[0].attributes[2].value=="display: none;" && subka !== false){
			GAME.emitOrder({a:12,type:14,iid:GAME.quick_opts.sub[subka].id,page:GAME.ekw_page,am:1});
			
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}
function kill(){
	// check if mob exists on field and has no multi fight yet
	if(GAME.field_mobs[0].ranks[4]>0){
		kill_epic();  // kill epic if exists
	}else if(GAME.field_mobs[0].ranks[5]>0){
		kill_mystic(); // kill mystic if exists
	}else{
		GAME.emitOrder({a: 13, mob_num: 0, fo: GAME.map_options.ma}); // multi attack
	}
}

function checkTR(){
	if(!stop && checkSSJ && GAME.quick_opts.ssj){
		if($("#ssj_bar").css("display") === "none"){
			GAME.emitOrder({a: 18, type: 5, tech_id: GAME.quick_opts.ssj[0]});
			return true;
		}else if($('#ssj_status').text()=="--:--:--"){
			GAME.emitOrder({a:18,type:6});     //wylacza ssj
			window.setTimeout(checkTR,wait);
		}else{
			return false;
		}
	}else{
		return false;
	}
}




function go(){
	if(!usedSenzu && GAME.char_data.pr < limitPA && (useBlueBeans || useRedBeans)&& tabela99.includes(gk)){
		usedSenzu = true;
		if(useBlueBeans){
			stop = true;
			use_blue(quantityBlue);
		}
		
		if(useRedBeans){
			stop = true;
			use_red();
		}
	}
	
	if(downb){
		go_down();
	}else{
		go_up();
	}
}

function go_down(){
	GAME.emitOrder({a:4,dir:4,vo:GAME.map_options.vo});
	downb = false;
}

function go_up(){
	GAME.emitOrder({a:4,dir:5,vo:GAME.map_options.vo});
	downb = true;
}

function kill_auto(){
	GAME.emitOrder({a:13, mob_num:0, fo:GAME.map_options.ma});
}

function kill_mystic(){
	GAME.emitOrder({a:7,mob_num:0,rank:5,quick:1});
}

function kill_epic(){
	GAME.emitOrder({a:7,order:2,quick:1,fo:GAME.map_options.ma});
}

function use_blue(x){
    var blue = GAME.quick_opts.senzus.find(senzu => senzu.item_id === 1244);
	setTimeout(() => {
		GAME.emitOrder({a:12,type:14,iid:blue.id,page:GAME.ekw_page,am:x});
		stop = false;
	}, 1000);
	
	setTimeout(() => { usedSenzu = false; }, 40000);
}
if(GAME.server==1){
	wait=0;
start();
start();
start();
start();
start();
}
if(GAME.server!=1){
	wait=0;
start();
start();
start();
start();
start();
start();
}
function use_red(){
    var red = GAME.quick_opts.senzus.find(senzu => senzu.item_id === 1243);
	setTimeout(() => {
		GAME.emitOrder({a:12,type:14,iid:red.id,page:GAME.ekw_page,am:1});
		stop = false;
	}, 1000);

	setTimeout(() => { usedSenzu = false; }, 60000);
}