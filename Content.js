GAME.emitOrder = (data) => GAME.socket.emit('ga',data);
var tabela99=[433273,464892,479357,476597,468932,210845,426373,393700,449850,433094,462458,291156,342270,479673,481132,220784,395234,322483,480606,458895,460037,318583,479201,356936,480620,463612,481193,345396,426491,480228,463136,481092,47839,472686,441347,336486];
    var freeAssist = document.createElement('button');
    freeAssist.innerHTML = "ASYSTUJ WSZYSTKIM ZA DARMO"
    freeAssist.className = "newBtn option"

$("[data-option='clan_assist_all']").parent().append(freeAssist)
    freeAssist.onclick = function () { 
      let total = $.makeArray($(".btn_small_gold.option[data-option='clan_assist']:visible"))
      let interval = setInterval( function() {
        let el = total.pop()
        console.log(el)

        if(!el) return clearInterval(interval)
        GAME.emitOrder({a:39,type:55,tid:$(el).data('tid'),target:$(el).data('target')})
      }, 50)
    }
$(document).bind('keydown', '3', function(){
        if(JQS.chm.is(":focus") == false){
			GAME.socket.emit('ga',{a:14,type:3});
			setTimeout(() => { 
          var arr = $.map($('.use_buff:checked'), function(e,i) {
					return +e.value;
				});
var btype = $('input[name="bless_type"]:checked').val();
GAME.socket.emit('ga',{a:14,type:5,buffs:arr,players:$('#bless_players').val(),btype:btype});
}, 500); 
        }
        return false;
    });
	$(document).bind('keydown', '2', function(){
        if(JQS.chm.is(":focus") == false){
           GAME.socket.emit('ga',{a:15,type:13});
        }
        return false;
    });
 var checkkkk=true;
	$(document).bind('keydown', '4', function(){
        if(JQS.chm.is(":focus") == false){
          checkkkk=true;
		vip();
        }
        return false;
    }); 
GAME.komunikat = function(kom){
	if(this.koms.indexOf(kom)==-1){
		if(this.komc=30) this.komc=30;
		var ind=this.koms.push(kom)-1;
		JQS.kcc.append('<div class="kom" style="top:'+this.komc+'%"><div class="close_kom" data-ind="'+ind+'"><b>X</b></div><div class="content">'+kom+'</div></div>');
		this.komc++;
		kom_close_bind();
	}
}
GAME.questAction = function(){
    if(this.quest_action){
         GAME.socket.emit('ga',{a:22,type:7,id:GAME.quest_action_qid,cnt:GAME.quest_action_max});
    }
}
	

      GAME.parseQuickOpts = function(){
      var opts='';
      if(this.quick_opts.tutorial){
        this.tutorials=this.quick_opts.tutorial;
        opts+='<img id="open_tuts" src="/gfx/layout/helper.png" class="qlink2 option" data-option="open_tuts" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.lab358+'</div>" />';
        $.getJSON('/json/tutorial.json', function(json){
          GAME.tutorial_data=json.tuts;
          GAME.checkTutorial();
        });
      }
      
      if(this.quick_opts.private_planet) opts+='<div class="option qlink priv" data-option="private_teleport" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.lab138+'</div>"></div>';
      if(this.quick_opts.teleport) opts+='<div class="option qlink tele" data-option="use_teleport" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.lab140+'</div>"></div>';
      if(this.quick_opts.travel) opts+='<div class="option qlink trav" data-option="use_travel" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.lab141+'</div>"></div>';
      if(this.quick_opts.ssj) opts+='<div class="option qlink ssj'+this.quick_opts.ssj[1]+'" data-option="use_transform" data-tech="'+this.quick_opts.ssj[0]+'"data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.lab139+'</div>"></div>';
      if(this.quick_opts.online_reward) opts+='<div class="option qlink dail" data-option="daily_reward" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.lab176+'</div>"></div>';
      if(this.quick_opts.bless) opts+='<div class="select_page qlink bles" data-page="game_buffs" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.lab188+'</div>"></div>';
      if(this.quick_opts.sub&&this.quick_opts.sub.length) opts+='<div class="option qlink subs" data-option="quick_use_subs" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.lab189+'</div>"></div>';
      if(this.quick_opts.senzus&&this.quick_opts.senzus.length){
        opts+='<div class="option qlink senz" data-option="quick_use_senzu" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.lab190+'</div>"></div>';
      }
      if(this.quick_opts.empire) opts+='<div class="select_page qlink emp'+this.quick_opts.empire+'" data-page="game_empire" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['empire'+this.quick_opts.empire]+'</div>"></div>';
      opts+='<div class="clan_planet_fast option qlink priv" onClick="GAME.emitOrder({a:39,type:32});" data-toggle="tooltip" data-original-title="<div class=tt>Planeta Klanowa</div>"></div>';
      $('#quick_bar').html(opts);
      option_bind();
      tooltip_bind();
      page_bind();
    } 
  


    function upgrade_item(){
      var iid=parseInt(GAME.dragged_item.sel.data('item_id'));
      var max=GAME.dragged_item.stack;
      var kom;
      if(parseInt(GAME.dragged_item.sel.data('class')) == 12) {
        kom='<div>'+LNG.lab40+'<br /><img src="'+GAME.dragged_item.img+'" /><div class="game_input small"><input id="upg_am" type="text" value="1" /></div><button class="set_max btn_small_gold" data-target="#upg_am" data-max="'+max+'">MAX</button><br />Na jaki +<div class="game_input small"><input id="super_desired_lvl" type="text" value="1"></div></br>Ile subek<div class="game_input small"><input id="super_subs" type="text" value="1"></div><br /><button class="option btn_small_gold" onclick="upgrading('+GAME.dragged_item.sel.data('base_item_id')+')">osa :)</button></div></br>'+LNG.lab36+': <b id="upg_succes_chance">??</b>%<br />'+LNG.lab41+': <b id="upg_sub_left"></b><br /><button class="option btn_small_gold" data-option="upg2_item">OK</button></div>';
      } else {
        kom='<div>'+LNG.lab40+'<br /><img src="'+GAME.dragged_item.img+'" /><div class="game_input small"><input id="upg_am" type="text" value="1" /></div><button class="set_max btn_small_gold" data-target="#upg_am" data-max="'+max+'">MAX</button><br /><br />'+LNG.lab36+': <b id="upg_succes_chance">??</b>%<br />'+LNG.lab41+': <b id="upg_sub_left"></b><br /><button class="option btn_small_gold" data-option="upg2_item">OK</button></div>';
      }
     GAME.komunikat(kom);
      setmaxBind()
      option_bind();
      GAME.emitOrder({a:12,type:9,iid:iid});
    }

    function upgrading(item_id, level, subs){
     var level = parseInt($("#super_desired_lvl").val());
     var subs = parseInt($("#super_subs").val());
     var inter = setInterval(
      function() {
        var $el = $("[data-base_item_id=" + item_id + "]")
        var el_id = $el.data('item_id')  
        if($el.data('upgrade') < level & subs > 0){
          GAME.emitOrder({a:12,type:10,iid:el_id,page:GAME.ekw_page,am:parseInt($('#upg_am').val())});
          subs --;
        } else {
          clearInterval(inter)
        }
      }, 200)
  }
  function morePlayers(){
   var more_players = $("#player_list_con").find("[data-option=load_more_players]");

   if(more_players.is(':visible')){
      more_players.click();
      window.setTimeout(morePlayers, 50);
   } else {
      killThemAll();
   }
}

function killThemAll(){
   $('.player').each(function(x){
      //todo skip killed players
      var player = $(this);

      var canAttack = player.find('button').is(':visible');

      if(canAttack ){
         var id = player.find('.poption').data('char_id');
         GAME.socket.emit('ga', {a:24, char_id:id,quick:1});
		 
		  
		 
		  
      }
   });
}


function getPlayerLevel(data){
   var textLevel = data.find('div.belka > span').text();

   if(Number(textLevel.charAt(0))){
      return parseInt(textLevel);
   } else {
      return parseInt(textLevel.substring(1));
   }
}
$(document).bind('keydown', 'b', function(){
        if(JQS.chm.is(":focus") == false){
           morePlayers()
        }
        return false;
    });
$(document).bind('keydown', 'x', function(){
        if(JQS.chm.is(":focus") == false){
			var mine_id=$( "#field_opts_con" ).find("[data-option=start_mine]").attr("data-mid");
			var quest_idd1=$( "#quest_con" ).find("[data-option=quest_duel]").attr("data-qid");;
          var quest_idd = $( "#quest_con" ).find("[data-option=finish_quest]").attr("data-qb_id");
if($( "#quest_con" ).find("[data-option=finish_quest]").length==1){
GAME.socket.emit('ga',{a:22,type:2,button:1,id:quest_idd});
}
if($( "#quest_con" ).find("[data-option=finish_quest]").prevObject[0].outerText.includes("Substancji") && $( "#quest_con" ).find("[data-option=finish_quest]").length==3){
GAME.socket.emit('ga',{a:22,type:2,button:3,id:quest_idd});
}
if($( "#quest_con" ).find("[data-option=finish_quest]").prevObject[0].outerText.includes("Nuda") && $( "#quest_con" ).find("[data-option=finish_quest]").length==3){
GAME.socket.emit('ga',{a:22,type:2,button:2,id:quest_idd});
}
if(mine_id){
	GAME.socket.emit('ga',{a:22,type:8,mid:mine_id});
}
if(quest_idd1){
GAME.socket.emit('ga',{a:22,type:6,id:quest_idd1});
}
GAME.socket.emit('ga',{a:22,type:1});
setTimeout(() => { $('#fight_view').fadeOut(); }, 500);
kom_clear();
        }
        return false;
    }); 
$(document).bind('keydown', 'n', function(){
        if(JQS.chm.is(":focus") == false){
			GAME.socket.emit('ga',{a:12,page:1,used:1}); //ŁADUJE STRONĘ EKWIPUNKU
          kompresory();
        }
        return false;
    });
function kompresory() {
	var kompresor_id = 	$( "#ekw_page_items" ).find("div[data-base_item_id=1618]").attr("data-item_id");
 var quest_id = $( "#quest_con" ).find("[data-option=compress_items]").attr("data-qb_id");
    GAME.emitOrder({
        a: 22,
        type: 10,
        item_id: parseInt(kompresor_id),
        qb_id: parseInt(quest_id)

    });
 
}
GAME.getEmpDetails = function(petd){
    if (petd.active == 1){
    en=petd.energy;
    id=petd.id;}
    var res='<div class=ptt>';
    var nextp=this.employe_exp(petd.level+1);
	res+='<img src=/gfx/employee/'+petd.type+'.png width=100 align=left /><b>'+petd.name+'</b><br /><b>'+LNG['emptyp'+petd.type]+'</b> - <b class=item'+petd.class+'>'+LNG['item_class'+petd.class]+'</b><br />'+LNG.lab1+': <b>'+this.dots(petd.level)+'</b><br />EXP: <b>'+this.dots(petd.exp)+' / '+this.dots(nextp)+'</b><br /><br /><b class=orange>'+LNG.lab286+'</b><br />';
	res+=LNG.lab313+': <b>'+petd.energy+'</b> / <b>'+petd.maxenergy+'</b><br />';
	if (petd.qualified) res+='<b class=green>'+LNG.lab314+'</b><br />';
	res+='</div>';
	return res;
}
function vip(){
	GAME.socket.emit('ga',{a:54,type:0});
	var lvl=$( "#monthly_vip_rewards" ).find("[class='vip_cat  option']").attr("data-level");
	var lvl1=$( "#general_vip_rewards" ).find("[class='vip_cat  option']").attr("data-level");
	if(GAME.char_data.gvip_score>=0 && checkkkk){
		GAME.socket.emit('ga',{a:54,type:0});
		checkkkk=false;
		window.setTimeout(vip,100);
	} else if($( "#monthly_vip_rewards" ).find("[class='vip_cat  option']").length!=0){
		GAME.socket.emit('ga',{a:54,type:1,vip:0,level:lvl});
		window.setTimeout(vip,100);
	} else if($( "#general_vip_rewards" ).find("[class='vip_cat  option']").length!=0){
		GAME.socket.emit('ga',{a:54,type:1,vip:1,level:lvl1});
		window.setTimeout(vip,100);
	} else {
		GAME.komunikat("Odebrano wszystkie możliwe nagrody z Vipa!!!")
	}
}
$("#bless_type_2").click();
GAME.abbreviateNumber = function(number, decPlaces=2) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);

    // Enumerate number abbreviations
    var abbrev = ["K", "M", "Mld","B","Bld","T","Quad","Quin","Sext","Sep","Oct","Non","Dec","Und","Duo","Tre","Quat","Quind","Sexd","Sept","Octo","Nove","Vigi"];

    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);

        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
             // This gives us nice rounding to a particular decimal place.
             number = Math.floor(number*decPlaces/size)/decPlaces;

             // Handle special case where we round up to the next abbreviation
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }

             // Add the letter for the abbreviation
             number += ' '+abbrev[i];

             // We are done... stop
             break;
        }
    }
    return number;
}
GAME.komunikat("Dodano 2 liczby po przecinku." + "<br>" + "Dodano odświeżanie listy zadań pod X." + "<br>" + "Poprawiono rozwijanie listy graczy na mapie.")