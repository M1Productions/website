window.onload = function () { mainFunc(); }
$("input").change(function () {
  console.log("Hallo Welt");
});

function reset() {
  document.getElementById("cha_lv").value = "90";
  document.getElementById("atk_p").value = "0";
  document.getElementById("tal_a").value = "0";
  document.getElementById("spec_mul").value = "0";
  document.getElementById("ele_mas").value = "0";
  document.getElementById("ele_b").value = "0";
  document.getElementById("dmg_b").value = "0";
  document.getElementById("flat_dmg_b").value = "0";
  document.getElementById("re_b").value = "0";
  document.getElementById("def_red").value = "0";
  document.getElementById("def_ignore").value = "0";
  document.getElementById("cri_dmg").value = "50";
  document.getElementById("e_lv").value = "90";
  document.getElementById("e_res").value = "10";
  document.getElementById("e_res_d").value = "0";
  document.getElementById("e_dmg_red").value = "0";
  mainFunc();
}

function mainFunc(){  
  chknum("cha_lv",90);
  chknum("atk_p",0);
  chknum("tal_a",0);
  chknum("spec_mul",0);
  chknum("ele_mas",0);
  chknum("ele_b",0);
  chknum("dmg_b",0);
  chknum("flat_dmg_b",0);
  chknum("re_b",0);
  chknum("def_red",0);
  chknum("def_ignore",0);
  chkcri("cri_dmg",50);
  chknum("e_lv",90);
  chknum("e_res",0);
  chknum("e_res_d",0);
  chknum("e_dmg_red",0);
  
  const level_multiplier = [
  17.165605,
  18.535048,
  19.904854,
  21.274903,
  22.6454,
  24.649613,
  26.640643,
  28.868587,
  31.367679,
  34.143343,
  37.201,
  40.66,
  44.446668,
  48.563519,
  53.74848,
  59.081897,
  64.420047,
  69.724455,
  75.123137,
  80.584775,
  86.112028,
  91.703742,
  97.244628,
  102.812644,
  108.409563,
  113.201694,
  118.102906,
  122.979318,
  129.72733,
  136.29291,
  142.67085,
  149.029029,
  155.416987,
  161.825495,
  169.106313,
  176.518077,
  184.072741,
  191.709518,
  199.556908,
  207.382042,
  215.3989,
  224.165667,
  233.50216,
  243.350573,
  256.063067,
  268.543493,
  281.526075,
  295.013648,
  309.067188,
  323.601597,
  336.757542,
  350.530312,
  364.482705,
  378.619181,
  398.600417,
  416.398254,
  434.386996,
  452.951051,
  472.606217,
  492.88489,
  513.568543,
  539.103198,
  565.510563,
  592.538753,
  624.443427,
  651.470148,
  679.49683,
  707.79406,
  736.671422,
  765.640231,
  794.773403,
  824.677397,
  851.157781,
  877.74209,
  914.229123,
  946.746752,
  979.411386,
  1011.223022,
  1044.791746,
  1077.443668,
  1109.99754,
  1142.976615,
  1176.369483,
  1210.184393,
  1253.835659,
  1288.952801,
  1325.484092,
  1363.456928,
  1405.097377,
  1446.853458,
  1488.215547,
  1528.444567,
  1580.367911,
  1630.847528,
  1711.197785,
  1780.453941,
  1847.322809,
  1911.474309,
  1972.864342,
  2030.071808
];
 
  var atk_p = parseFloat($("#atk_p").val());
  var tal_a = parseFloat($("#tal_a").val());
  var spec_mul = parseFloat($("#spec_mul").val());
  var em_mas = parseFloat($("#ele_mas").val());
  var ele_b = parseFloat($("#ele_b").val());
  var dmg_b = parseFloat($("#dmg_b").val());
  var flat_dmg_b = parseFloat($("#flat_dmg_b").val());
  var re_b = parseFloat($("#re_b").val());
  var def_red = parseFloat($("#def_red").val());
  var def_ignore = parseFloat($("#def_ignore").val());
  var cri_dmg = parseFloat($("#cri_dmg").val());
  var cha_lv = parseInt($("#cha_lv").val(), 10);
  var e_lv = parseFloat($("#e_lv").val());
  var e_res = parseFloat($("#e_res").val());
  var e_res_d = parseFloat($("#e_res_d").val());
  var e_dmg_red = parseFloat($("#e_dmg_red").val());
  
  cha_lv = cha_lv - 1;
  
  if (def_red > 90) {
    def_red = 90;
  }

  if($('#cri_chk').is(":checked")){    
  }else{ cri_dmg = 0;}
  
  var base_dmg = atk_p * (tal_a/100);
  var res_multiplier = 1;
  if (e_res - e_res_d < 0) {
    res_multiplier = 1 - ((e_res-e_res_d)/200);
  } else if (e_res - e_res_d < 75) {
    res_multiplier = 1 - ((e_res-e_res_d)/100);
  } else {
    res_multiplier = 1 / (4 * ((e_res-e_res_d)/100) + 1);
  }
  var def_multiplier = (cha_lv+1+100)/((1-def_red/100)*(1-def_ignore/100)*(e_lv+100)+(cha_lv+1+100));
  
  var s_flat_dmg_b = 1.25 * level_multiplier[cha_lv] * (1 + (5 * em_mas)/(1200 + em_mas) + re_b/100);
  var a_flat_dmg_b = 1.15 * level_multiplier[cha_lv] * (1 + (5 * em_mas)/(1200 + em_mas) + re_b/100);
  
  var dmg = ((base_dmg*(1+spec_mul/100))+flat_dmg_b)*(1+((dmg_b+ele_b)/100)-e_dmg_red/100)*def_multiplier*res_multiplier*(1+cri_dmg/100);
  var s_dmg = ((base_dmg*(1+spec_mul/100))+flat_dmg_b+s_flat_dmg_b)*(1+((dmg_b+ele_b)/100)-e_dmg_red/100)*def_multiplier*res_multiplier*(1+cri_dmg/100);
  var a_dmg = ((base_dmg*(1+spec_mul/100))+flat_dmg_b+a_flat_dmg_b)*(1+((dmg_b+ele_b)/100)-e_dmg_red/100)*def_multiplier*res_multiplier*(1+cri_dmg/100);
  var subbloom_dmg = 3 * level_multiplier[cha_lv] * (1 + ((16 * em_mas) / (2000 + em_mas)) + re_b/100) * res_multiplier;
  
  amplifying(em_mas,re_b,dmg);
  overloaded(em_mas,level_multiplier[cha_lv],re_b/100,res_multiplier);
  elecha(em_mas,level_multiplier[cha_lv],re_b/100,res_multiplier);
  supcon(em_mas,level_multiplier[cha_lv],re_b/100,res_multiplier);
  frozen(em_mas,level_multiplier[cha_lv],re_b/100,res_multiplier);
  swirl(em_mas,level_multiplier[cha_lv],re_b/100,res_multiplier);
  
  // Burning
  var burning_dmg = 0.25 * level_multiplier[cha_lv] * (1 + ((16 * em_mas) / (2000 + em_mas)) + re_b) * res_multiplier;
  document.getElementById("burn").innerHTML = burning_dmg.toFixed(0);
  
  document.getElementById("spread").innerHTML = s_dmg.toFixed(0);
  document.getElementById("aggravate").innerHTML = a_dmg.toFixed(0);
  document.getElementById("hyperbloom").innerHTML = subbloom_dmg.toFixed(0);
  document.getElementById("burgeon").innerHTML = subbloom_dmg.toFixed(0);
}

function chknum(id,pc){
  var chk = $("#"+id).val();
  if (isNaN(chk) || chk<1) {
    $("#"+id).val(pc);    
  }
}

function chkcri(id,pc){
  var chk = $("#"+id).val();
  if (isNaN(chk) || chk<50) {
    $("#"+id).val(pc);    
  }
}

function amplifying(em,react_bonus,dmg){
  //Vaporize
  var em_bonus = 2.78 * (em/(em+1400));
  var f_amp_multiplier = 2 * (1 + em_bonus + react_bonus/100);
  var r_amp_multiplier = 1.5 * (1 + em_bonus + react_bonus/100);
  
  var FtW = r_amp_multiplier * dmg;
  var WtF = f_amp_multiplier * dmg;
  
  document.getElementById("vapFtW").innerHTML = FtW.toFixed(0);
  document.getElementById("vapWtF").innerHTML = WtF.toFixed(0);
  document.getElementById("melItF").innerHTML = WtF.toFixed(0); 
  document.getElementById("melFtI").innerHTML = FtW.toFixed(0); 
}

function overloaded(em,level_multiplier,react_bonus,res_multiplier){
  //Overloaded
  var dmg = 2 * level_multiplier * (1 + ((16 * em) / (2000 + em)) + react_bonus) * res_multiplier;
  document.getElementById("overl").innerHTML = dmg.toFixed(0);
  document.getElementById("bloom").innerHTML = dmg.toFixed(0);
}

function elecha(em,level_multiplier,react_bonus,res_multiplier){
  //Electro-Charged  
  var dmg = 1.2 * level_multiplier * (1 + ((16 * em) / (2000 + em)) + react_bonus) * res_multiplier
  document.getElementById("elecha").innerHTML = dmg.toFixed(0);
}

function supcon(em,level_multiplier,react_bonus,res_multiplier){
  //Superconduct  
  var dmg = 0.5 * level_multiplier * (1 + ((16 * em) / (2000 + em)) + react_bonus) * res_multiplier
  document.getElementById("supcon").innerHTML = dmg.toFixed(0);
}

function frozen(em,level_multiplier,react_bonus,res_multiplier){
  //Shattered
  var dmg = 1.5 * level_multiplier * (1 + ((16 * em) / (2000 + em)) + react_bonus) * res_multiplier
  document.getElementById("frozen").innerHTML = dmg.toFixed(0);
}

function swirl(em,level_multiplier,react_bonus,res_multiplier){
  //Swirl
  var dmg = 0.6 * level_multiplier * (1 + ((16 * em) / (2000 + em)) + react_bonus) * res_multiplier
  document.getElementById("swirlF").innerHTML = dmg.toFixed(0);
  document.getElementById("swirlW").innerHTML = dmg.toFixed(0);
  document.getElementById("swirlI").innerHTML = dmg.toFixed(0);
  document.getElementById("swirlE").innerHTML = dmg.toFixed(0);
}
