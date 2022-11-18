(function(){
let a;
function f(){
  if(!a) a=Object.keys(GAME).find(z=> GAME[z] && GAME[z]['1_1']);
  return a;
}
Object.defineProperty(GAME,'mapcell',{get: function(){ return GAME[f()]; }});
})();

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
GAME.questAction = function(){
    if(this.quest_action){
         GAME.socket.emit('ga',{a:22,type:7,id:GAME.quest_action_qid,cnt:GAME.quest_action_max});
    }
}
$(document).bind('keydown', '1', function(){
        if(JQS.chm.is(":focus") == false){
          $('#gh_game_helper .gh_exp').click()
        }
        return false;
    });
var wait2 = 1
var checkSSJ = true;
var a= 0;
// -----------------------------------

// global constants
const VERSION = 'v0.1.3'

const SENZU_BLUE = 'SENZU_BLUE'
const SENZU_GREEN = 'SENZU_GREEN'
const SENZU_YELLOW = 'SENZU_YELLOW'
const SENZU_RED = 'SENZU_RED'
var collectBlueSenzuOn = false; //zatrzyamnie skryptu po zebraniu maksymalnej ilooci niebieskich fasolek

// -----------------------------------

// ===================================
// user config
/**
 * Określa ilość niebieskich senzu, które będą używane podczas odnawiania PA
 */
const CONF_BLUE_AMOUNT = Math.floor(GAME.getCharMaxPr() / 100 * 0.10)

/**
 * Określa ilość zielonych senzu, które będą używane podczas odnawiania PA
 */
const CONF_GREEN_AMOUNT = Math.floor(GAME.char_data.pr_max/40000)

/**
 * Określa ilość żółtych senzu, które będą używane podczas odnawiania PA
 */
const CONF_YELLOW_AMOUNT = 1

/**
 * Określa przy jakiej ilości PA mają zostać użyte senzu
 */
var CONF_MIN_PA = Math.floor(GAME.getCharMaxPr() / 100 * 0.4)

/**
 * Określa jakia powinna zostać użyta subka
 *
 * false - wyłączone odpalanie subki
 * <0-7> - wartości od 0 do 7, gdzie kolejno 0 to ostka, natomiast 7 to x2
 */


/**
 * Określa jakie senzu powinny zostać użyte przy odnawianiu PA
 *
 * false - Jeśli wybór ma być automatyczny (blue -> green -> yellow -> red)
 * SENZU_<typ> - Jeśli ma użyc konkretnego senzu (np. SENZU_RED)
 *
 * !Chwilowo wspiera tylko BLUE, GREEN, YELLOW i RED
 */
const CONF_SENZU = false
// ===================================

// -----------------------------------
// elements
const $doubler_bar = document.getElementById('doubler_bar')
const $ssj_bar = document.getElementById('ssj_bar')
// -----------------------------------

// -----------------------------------
// script variables
let left = false
let right = true
let up = false
let down = false
var CONF_SUB = false
let antybotPath = false
let stop = true
let moveTimeout
let collectedCSK = 0
var zmiana = true;
var tabela99;
var gk=GAME.pid;

// -----------------------------------

// -----------------------------------


/* TEMPLATE */
const $css = "#gh_game_helper {min-width:100px; padding:5px; border:solid gray 1px; background:rgba(22, 22, 93, 0.81); color:gold; position: fixed; top: 40px; right: 5px; z-index:5;}#gh_game_helper .gh_button {cursor:pointer;text-align:center; border-bottom:solid gray 1px;}";

const $html = "<div class='gh_button gh_exp'>EXP <b class='gh_status red'>Off</b></div><div class='gh_button gh_xost'>xOst <b class='gh_status red'>Off</b></div><div class='gh_button gh_x20'>x20 <b class='gh_status red'>Off</b></div><div class='gh_button gh_limit'>Limit <b class='gh_status red'>Off</b></div>";

$('body').append("<div id='gh_game_helper'>"+$html+"</div>").append("<style>"+$css+"</style>");

/* ACTIONS */
$('#gh_game_helper .gh_exp').click(() => {
	if (stop) {
		$('#gh_game_helper .gh_exp')
		$(".gh_exp .gh_status").removeClass("red").addClass("green").html("On");
		stop = false
		move()
	} else {
		$('#gh_game_helper .gh_exp')
		$(".gh_exp .gh_status").removeClass("green").addClass("red").html("Off");
		stop = true
	}
});
$('#gh_game_helper .gh_limit').click(() => {
	if (!collectBlueSenzuOn) {
		$('#gh_game_helper .gh_limit')
		$(".gh_limit .gh_status").removeClass("red").addClass("green").html("On");
		collectBlueSenzuOn = true;
	} else {
		$('#gh_game_helper .gh_limit')
		$(".gh_limit .gh_status").removeClass("green").addClass("red").html("Off");
		setTimeout(() => { move() }, 500);
		collectBlueSenzuOn = false;
	}
});
$('#gh_game_helper .gh_x20').click(() => {
	if (zmiana) {
		$('#gh_game_helper .gh_x20')
		$(".gh_x20 .gh_status").removeClass("red").addClass("green").html("On");
		CONF_SUB = 1;
		zmiana=false;
		$(".gh_xost .gh_status").removeClass("green").addClass("red").html("Off");
	} else {
		$('#gh_game_helper .gh_x20')
		$(".gh_x20 .gh_status").removeClass("green").addClass("red").html("Off");
		CONF_SUB = false;
		zmiana=true;
	}
});
$('#gh_game_helper .gh_xost').click(() => {
	if (zmiana) {
		$('#gh_game_helper .gh_xost')
		$(".gh_xost .gh_status").removeClass("red").addClass("green").html("On");
		CONF_SUB = 0;
		zmiana=false;
		$(".gh_x20 .gh_status").removeClass("green").addClass("red").html("Off");
	} else {
		$('#gh_game_helper .gh_xost')
		$(".gh_xost .gh_status").removeClass("green").addClass("red").html("Off");
		CONF_SUB = false;	
		zmiana=true;
	}	
});

// -----------------------------------
function collectBlueSenzu(){
if(collectBlueSenzuOn){
if(GAME.char_data.senzu_limit < GAME.senzu_limit()){ //Sprawdzenie czy ilooa zebranych fasolek jest mniejsza od maksymalnej dopuszczalnej liczby fasolek do zebrania
return true;
}else {
return false;
}
}else{
return true;
}
}
// -----------------------------------
// functions
/**
 * Recursive function for finding path to the target.
 *
 * @param {Number} x - current X position
 * @param {Number} y - current Y position
 * @param {Array} path - array with cell positions as a path to the target
 * @returns {Array} - array with cell positions as a path to the target
 */
function check (x, y, path, p, tX, tY) {
	x = parseInt(x)
	y = parseInt(y)
	tX = parseInt(tX)
	tY = parseInt(tY)

	const cP = x+"_"+y // current position

	const p1 = (x-1)+"_"+(y-1)
	const d1 = !path.includes(p1) && p[p1]

	const p2 = (x)+"_"+(y-1)
	const d2 = !path.includes(p2) && p[p2]

	const p3 = (x+1)+"_"+(y-1)
	const d3 = !path.includes(p3) && p[p3]

	const p4 = (x-1)+"_"+(y)
	const d4 = !path.includes(p4) && p[p4]

	const p5 = (x+1)+"_"+(y)
	const d5 = !path.includes(p5) && p[p5]

	const p6 = (x-1)+"_"+(y+1)
	const d6 = !path.includes(p6) && p[p6]

	const p7 = (x)+"_"+(y+1)
	const d7 = !path.includes(p7) && p[p7]

	const p8 = (x+1)+"_"+(y+1)
	const d8 = !path.includes(p8) && p[p8]

	// debugger

	// found player position path
	if (x === tX && y === tY) return [...path, cP]

	let r = false

	if (d1 === 1) {
		r = check(x - 1, y - 1, [...path, cP], p, tX, tY)
		if (r) return r
	}

	if (d2 === 1) {
		r = check(x, y - 1, [...path, cP], p, tX, tY)
		if (r) return r
	}

	if (d3 === 1) {
		r = check(x + 1, y - 1, [...path, cP], p, tX, tY)
		if (r) return r
	}

	if (d4 === 1) {
		r = check(x - 1, y, [...path, cP], p, tX, tY)
		if (r) return r
	}

	if (d5 === 1) {
		r = check(x + 1, y, [...path, cP], p, tX, tY)
		if (r) return r
	}

	if (d6 === 1) {
		r = check(x - 1, y + 1, [...path, cP], p, tX, tY)
		if (r) return r
	}

	if (d7 === 1) {
		r = check(x, y + 1, [...path, cP], p, tX, tY)
		if (r) return r
	}

	if (d8 === 1) {
		r = check(x + 1, y + 1, [...path, cP], p, tX, tY)
		if (r) return r
	}

	return false
}

/**
 * Returns move direction.
 * Same as used by game.
 *
 * 	6	2	5
 * 	8		7
 * 	4	1	3
 * @param {Number} x - current X position
 * @param {Number} y - current Y position
 * @param {Number} nx - next X position
 * @param {Number} ny - nexy Y position
 * @returns {Number} - move direction
 */
function getDir(x, y, nx, ny) {
	x = parseInt(x)
	y = parseInt(y)
	nx = parseInt(nx)
	ny = parseInt(ny)
	if (x > nx && y > ny) return 6
	if (x === nx && y > ny) return 2
	if (x < nx && y > ny) return 5
	if (x > nx && y === ny) return 8
	if (x < nx && y === ny) return 7
	if (x > nx && y < ny) return 4
	if (x === nx && y < ny) return 1
	if (x < nx && y < ny) return 3
}

/**
 * Converts array with positions to directions array.
 *
 * @param {Array} result - array with results
 * @returns {Array} - array with directions
 */
function getMoves (result) {
	return result
	// get move directions
		.map((item, index, arr) => {
			if (!arr[index + 1]) return
			const [x, y] = item.split('_')
			const [nx, ny] = arr[index + 1].split('_')
			return getDir(x, y, nx, ny)
		})
		// filter only moves
		.filter(item => item)
}

/**
 * Returns position with target cell
 *
 * @returns {Array}
 */
function getFinalPosition(premiumData) {
	return Object.keys(premiumData)
		.filter(key => premiumData[key] === 2)[0]
		.split('_')
}
// -----------------------------------

function canGoLeft () {
	const x = GAME.char_data.x;
	const y = GAME.char_data.y;

	return GAME.mapcell[(x)+"_"+(y-1)] && GAME.mapcell[(x)+"_"+(y-1)].m == 1
}

function canGoRight () {
	const x = GAME.char_data.x;
	const y = GAME.char_data.y;

	return GAME.mapcell[(x)+"_"+(y+1)] && GAME.mapcell[(x)+"_"+(y+1)].m == 1
}

function canGoUp () {
	const x = GAME.char_data.x;
	const y = GAME.char_data.y;
	
	return GAME.mapcell[(x-1)+"_"+(y)] && GAME.mapcell[(x-1)+"_"+(y)].m == 1
}

function canGoDown () {
	const x = GAME.char_data.x;
	const y = GAME.char_data.y;
	
	return GAME.mapcell[(x+1)+"_"+(y)] && GAME.mapcell[(x+1)+"_"+(y)].m == 1
}

function goLeft () {
	if (canGoLeft()) {
		GAME.emitOrder({a:4,dir:2,vo:GAME.map_options.vo});
	} else {
		down = true
		move()
	}
}

function goRight () {
	if (canGoRight()) {
		GAME.emitOrder({a:4,dir:1,vo:GAME.map_options.vo});
	} else {
		down = true
		move()
	}
}

function goUp () {
	if (canGoUp()) {
		GAME.emitOrder({a:4,dir:8,vo:GAME.map_options.vo});
	} else {
		up = false
		right = canGoRight()
		left = canGoLeft()
		move()
	}
}

function goDown () {
	down = false

	if (right) {
		right = false
		left = true
	} else {
		right = true
		left = false
	}

	if (canGoDown()) {
		GAME.emitOrder({a:4,dir:7,vo:GAME.map_options.vo});
	} else {
		if (!canGoLeft() || !canGoRight()) {
			right = false
			left = false
			up = true
		}
		move ()
	}
}

function isAntybotActive () {
	return !!GAME.premiumData
}

// ===================================
// FIGHT
function fight (mob_num = 0) {
	if (stop) return

	// check if mob exists on field and has no multi fight yet
	if(MF() > 0 && GAME.field_mf < 2){
        GAME.emitOrder({a:7,order:2,quick:1,fo:GAME.map_options.ma}); // kill elite if exists
    }else if (GAME.field_mobs[mob_num].ranks[3] && GAME.mf[GAME.field_mobs[mob_num].mob_id] !== 3) fightLegend(mob_num) // kill legend if exists
	else if (GAME.field_mobs[mob_num].ranks[4]) fightEpic(mob_num) // kill epic if exists
	else if (GAME.field_mobs[mob_num].ranks[5]) fightMystic(mob_num) // kill mystic if exists
	else GAME.emitOrder({a: 13, mob_num: mob_num, fo: GAME.map_options.ma}) // multi attack
}

function MF(){
    r = 0;
    for(i=0; i<GAME.map_options.ma.length-1; i++){
        if(GAME.map_options.ma[i] === 1){
            r += parseInt(GAME.field_mobs[0].ranks[i]);
        }
    }
    
    return r;
}
function fightLegend (mob_num = 0) {
	GAME.emitOrder({a: 7, mob_num: mob_num, rank: 3, quick: 1});
}

function fightEpic (mob_num = 0) {
	GAME.emitOrder({a: 7, mob_num: mob_num, rank: 4, quick: 1});
}

function fightMystic (mob_num = 0) {
	GAME.emitOrder({a: 7, mob_num: mob_num, rank: 5, quick: 1});
}

function areMobsOnField() {
	const mob_index = GAME.field_mobs.findIndex(field_mob => {
		return field_mob.ranks.some((rank, index) => {
			// first part checks if multiattack option for specified mob rank is enabled
			// second part checks if mob with specified rank exists in the cell
			return GAME.map_options.ma[index] && rank > 0
		})
	})

	if (mob_index === -1) return false
	else return { mob_num: mob_index }
}

// ===================================
// SENZU
function getSenzu(type) {
  switch (type) {
    case SENZU_BLUE:
      return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 1244)
    case SENZU_GREEN:
      return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 1242)
    case SENZU_YELLOW:
      return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 1260)
    case SENZU_RED:
      return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 1243)
  }
}

function useSenzu () {
	if (stop) return

	if (isAntybotActive()) {
		move()
		return
	}

	const blue = getSenzu(SENZU_BLUE)
	const green = getSenzu(SENZU_GREEN)
	const yellow = getSenzu(SENZU_YELLOW)
	const red = getSenzu(SENZU_RED)

	switch (CONF_SENZU) {
		case SENZU_BLUE:
			useBlue(Math.min(CONF_BLUE_AMOUNT, blue.stack))
			break

		case SENZU_GREEN:
		  useGreen(Math.min(CONF_GREEN_AMOUNT, green.stack))
		  break

		case SENZU_YELLOW:
		  useYellow(Math.min(CONF_YELLOW_AMOUNT, yellow.stack))
		  break

		case SENZU_RED:
		  useRed()
		  break

		default:
			if (blue && blue.stack > 0)
				useBlue(Math.min(CONF_BLUE_AMOUNT, blue.stack))
			else if (red && red.stack > 0)
				useRed()
	}
}

function useBlue(amount = CONF_BLUE_AMOUNT) {
  const blue = getSenzu(SENZU_BLUE)

  if (!blue) {
    move()
    return
  }

	GAME.emitOrder({
		a: 12,
		type: 14,
		iid: blue.id,
		page: GAME.ekw_page,
		am: amount
	})
}

function useGreen(amount = CONF_GREEN_AMOUNT) {
  const green = getSenzu(SENZU_GREEN)

  if (!green) {
    move()
    return
  }

  GAME.emitOrder({
    a: 12,
    type: 14,
    iid: green.id,
    page: GAME.ekw_page,
    am: amount
  })
}

function useYellow(amount = CONF_YELLOW_AMOUNT) {
  const yellow = getSenzu(SENZU_YELLOW)

  if (!yellow) {
    move()
    return
  }

  GAME.emitOrder({
    a: 12,
    type: 14,
    iid: yellow.id,
    page: GAME.ekw_page,
    am: amount
  })
}

function useRed() {
  const red = getSenzu(SENZU_RED)

  if (!red) {
    move()
    return
  }

  GAME.emitOrder({
    a: 12,
    type: 14,
    iid: red.id,
    page: GAME.ekw_page,
    am: 1
  })
}

// ===================================
// SUBSTANCE
function useSub () {
	GAME.emitOrder({
		a: 12,
		type: 19,
		iid: GAME.quick_opts.sub[CONF_SUB].id
	})
}
function useSub1 () {
	GAME.emitOrder({
		a: 12,
		type: 15
	})
}

// ===================================


// ===================================
// SSJ
function checkTR()
{
	if(checkSSJ && GAME.quick_opts.ssj)
	{
		if($("#ssj_bar")[0].attributes[2].value=="display: none;")
		{
			GAME.emitOrder({a: 18, type: 5, tech_id: GAME.quick_opts.ssj[0]});
			return true;
		}
		else if ($('#ssj_status').text()=="--:--:--"){
			GAME.emitOrder({a:18,type:6});     //wylacza ssj
			window.setTimeout(checkTR,wait2);
		}
		else
		{
			return false;
		}
	}
	else
	{
		return false;
	}
}
// ===================================
// CSK
function collectCSK () {
if($(".black_db").length>0){

    GAME.emitOrder({a:21,bid:document.getElementsByClassName("black_db")[0].attributes[2].value});
    document.getElementsByClassName("black_db")[0].remove();
//if($(".black_db")[$(".black_db").length-1].style[3] != "opacity")
//$(".black_db")[$(".black_db").length-1].click();
}
}

// ===================================
// MOVE
function move () {
	if (stop) return
	if (!collectBlueSenzu())
	return

	if (moveTimeout) clearTimeout(moveTimeout)
	moveTimeout = setTimeout(move, 200) // trigger move after 7 seconds without move action

	if (GAME.char_data.pr <= CONF_MIN_PA) {
		useSenzu()
		return
	}
	if(CONF_SUB !== false && ($doubler_bar.style.display === 'none' || GAME.doubler_end * 1000 < new Date().getTime())) {
		 setTimeout(function(){useSub()},500);
		return
	}
	if($ssj_bar.style.display === 'none' || GAME.ssj_end * 1000 < new Date().getTime()) {
		setTimeout(function(){checkTR()},500);
		return
	}
	subkaa=$('#doubler_status').text();
	if (CONF_SUB !== false && subkaa <= '00:00:02') {
		setTimeout(function(){useSub1()},500);
		return
	}
	

	if (isAntybotActive()) {
		console.log('antybot active')

		const x = GAME.char_data.x
		const y = GAME.char_data.y

		const premiumData = {...GAME.premiumData, [(x)+"_"+(y)]: 1}

		const [tX, tY] = getFinalPosition(premiumData)

		if (!antybotPath) {
			console.time('path')
			const p = {...premiumData, [(tX)+"_"+(tY)]: 1}
			const result = check(x, y, [], p, tX, tY)
			const moves = result && getMoves(result)

			antybotPath = [...moves]
			console.timeEnd('path')
			console.log('PATH', antybotPath)

			// moves.pop() // don't move to last cell
			// antybotPath.pop() // don't move to last cell
		}

		const dir = antybotPath.shift()
		if (dir) {
			GAME.emitOrder({a:4, dir: dir, vo:GAME.map_options.vo})
		} else {
			antybotPath = false
		}

		return
	}

	if (down) goDown()
	else if (up) goUp()
	else if (left) goLeft()
	else if (right) goRight()
}

// ===================================
// RESPONSE HANDLING
function handleResponse (res) {
	// on move response
	if (res.a === 4 && res.char_id === GAME.char_id && tabela99.includes(gk)){
		// when in the cell are some mobs
		const mobs = areMobsOnField()
		if (mobs) {
			fight(mobs.mob_num)
			return
		}
		 setTimeout(() => { fight(); }, wait2);
	}

	// on fight response
	else if (res.a === 7 && tabela99.includes(gk)) {
		// when in the cell are some mobs
		const mobs = areMobsOnField()
		if (mobs) {
			fight(mobs.mob_num)
			return
		}
		setTimeout(() => { move(); }, wait2);
	}

	// on senzu use response
	else if (res.a === 12 && res.type === 14 && tabela99.includes(gk)) move()

	else if (res.a === 18 && res.ssj && tabela99.includes(gk)) { // Use ssj response
        setTimeout(() => {  move(); }, 100);
    } else if (res.a === 12 && res.type === 19 && tabela99.includes(gk)) { // Use sub respone
        setTimeout(() => {  move(); }, 100);
    } 



	// on empty response (e.g. when player can't move)
	else if (res.a === undefined ) setTimeout(() => {
		console.log('try to move')
		antybotPath = false
		move()
	}, 50);
}

GAME.socket.on('gr', handleResponse);