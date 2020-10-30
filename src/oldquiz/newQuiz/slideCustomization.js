var subscriptionId = 0; //Extension.getConfig('meta').recharge.subscriptionId;
var recommendations = Extension.getSessionValue('recommendations');
var answers = Extension.getSessionValue('answers');
local.dogName = answers.dog.name;
local.dogBreed = answers.dog.breeds;
local.humanName = answers.owner.firstName;
local.dogweight = answers.dog.weightValue;
local.purMode = true;
local.purFrequency = '3';
var reviewPage;
local.subscribe = true;
local.slideHandle = 'Subscribe & Save 20%';

local.buttonAnimation={};



// Simulate no product
//recommendations.supplements=[];
//recommendations.kibble=null;
//recommendations.mixin=null;

var kibble, mixin;
var values = window.hungry.values;
var products = window.hungry.products;
var chewImages = {
	'omega':['https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Happy_Heart_1.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Happy_Heart_2.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Happy_Heart_3.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Happy_Heart_5.png'],
    'calming':['https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Chill_Chew_1.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Chill_Chew_2.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Chill_Chew_3.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Chill_Chew_5.png'],
    'multivitamin': ['https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Whole_Health_1.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Whole_Health_2.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Whole_Health_3.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Whole_Health_5.png'],
    'probiotic':['https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Balanced_Belly_1.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Balanced_Belly_2.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Balanced_Belly_3.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Balanced_Belly_5.png?v=1585809203'],
    'hip_joint':['https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Move_Groove_1.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Move_Groove_2.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Move_Groove_3.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Move_Groove_5.png']
};

var noMixin = false;

if(recommendations.mixin){
  mixin = recommendations.mixin;
  local.mixin = mixin;
  local.mixin.selected = true;
  local.mixin.tab = 'description';
   }
else {
  noMixin = true;
}




local.state={
    busy:false,
    page:1
};

local.nextSection=function(val) {
    local.state.page+=val;
    document.querySelector('.w-slide-end.auto-height').scrollTop=0;
};

local.canContinue=function() {
    return local.state.page<3;
};

local.canBack=function() {
    return local.state.page>1;
};

local.canCheckout=function() {
    return local.state.page==3;
};





local.getGoalColum = function(min, max) {
    var input = [];
    for (var i = min; i <= max; i += 1) {
        if (local.goals[i]) input.push(local.goals[i]);
    }
    return input;
};




function setScroll(el, pos, vertical) {
    if (vertical) {
        el.scrollTop=pos;
    } else {
        el.scrollLeft=pos;
    }
}

function smoothScrollRelative(el, offset, time, vertical) {
    var orig = vertical?el.scrollTop:el.scrollLeft;
    var curTime = 0;
    var delta = offset/100;

    while (curTime <= time) {
        orig+=delta;
        window.setTimeout(setScroll, curTime, el, orig, vertical);

        curTime += time / 100;
    }
}

function smoothVerticalScrolling(el, newTop, time) {
    var currentTop = el.offsetTop;
    var curTime = 0;
    var top = currentTop;
    var delta = (newTop-currentTop)/100;

    while (curTime <= time) {
        top+=delta;
        window.setTimeout(setScroll, curTime, el, top, true);
        curTime += time / 100;
    }
}

local.scrollH=function(offset){
    var carrousel = document.querySelector('.products-carrousel');
    var newOffset = carrousel.scrollLeft+offset;

    smoothScrollRelative(carrousel, offset, 200, false);

    local.state.showLeftScroll=newOffset>15;
    local.state.showRightScroll=(carrousel.scrollWidth-carrousel.clientWidth)>newOffset;
};

Extension.waitForElement(extension, '.products-carrousel', function(carrousel){
    local.state.showRightScroll=carrousel.scrollWidth>carrousel.clientWidth;
});



local.goToStep=function(step){
    var anchor;
    if (step==2) {
        anchor = document.querySelector('.section-supplements');
    } else if (step==3) {
        anchor = document.querySelector('.section-mixin');
    }

    var pos = anchor.offsetTop-100;
    //Extension.executeJS('pzScroll', null, null, [pos]);

    var holder = document.querySelector('.w-slide-end.auto-height');
    smoothVerticalScrolling(holder, pos, 200);
    //holder.scrollTop=pos;
};


if (recommendations.kibble) {
    recommendations.kibble.pzProduct4 = Extension.getByKey(etc.results, 'altId', recommendations.kibble.product4Id);
    recommendations.kibble.pzProduct12 = Extension.getByKey(etc.results, 'altId', recommendations.kibble.product12Id);
    recommendations.kibble.pzProduct24 = Extension.getByKey(etc.results, 'altId', recommendations.kibble.product24Id);
}

if (recommendations.mixin) {
    recommendations.mixin.pzProduct = Extension.getByKey(etc.results, 'altId', recommendations.mixin.productId);
}

var selectedSupplement;

recommendations.supplements.forEach(function(item){
    item.pzProduct = Extension.getByKey(etc.results, 'altId', item.productId);  
});

if (answers.dog.concerns && answers.dog.concerns.length>0) {
    selectedSupplement = recommendations.supplements[0];
}

if (!selectedSupplement) {
  ['hip_joint', 'probiotic', 'omega', 'calming', 'multivitamin'].forEach(function(key){                                                          
    if (!selectedSupplement) selectedSupplement = Extension.getByKey(recommendations.supplements, 'key', key);
  });
}

if (selectedSupplement) recommendations.supplements=[selectedSupplement];



if (recommendations.kibble) {
    kibble = recommendations.kibble;
    local.kibble = kibble;
    //kibble.bags4=2;
    //kibble.bags12=3;
    //kibble.bags24=6;
    kibble.price =
        kibble.pzProduct4.price +
        kibble.pzProduct12.price +
        kibble.pzProduct24.price;

    // Price of 24lbs, 12lbs and 4lbs bags of Kibble
    kibble.price4lbs =
        kibble.pzProduct4.price;

    kibble.price12lbs =
        kibble.pzProduct12.price;

    kibble.price24lbs =
        kibble.pzProduct24.price;

    // calculatig the cost per day for kibble

    kibble.price4lbsx = kibble.price4lbs/4;

    kibble.price12lbsx = kibble.price12lbs/12;

    kibble.price24lbsx = kibble.price24lbs/24;

    kibble.cpd4 = kibble.cpdlbs*kibble.price4lbsx;

    kibble.cpd4 = kibble.cpd4;

    kibble.cpd12 = kibble.cpdlbs*kibble.price12lbsx;

    kibble.cpd12 = kibble.cpd12;

    kibble.cpd24 = kibble.cpdlbs*kibble.price24lbsx;

    kibble.cpd24 = kibble.cpd24;
  
  	kibble.reviewPage = 1;
 	
  	kibble.kibbleType = kibble.pzProduct4.title;
  	if( kibble.kibbleType == 'Superfoods w/ Salmon (Grain-Free) - 4 lbs')
       {
         kibble.kibbleType = 'salmon';
       }
  else if(kibble.kibbleType == 'Superfoods w/ Turkey + Duck (Grain-Free) - 4 lbs'){
    	kibble.kibbleType = 'turkeyDuck';
           }
  else if(kibble.kibbleType == 'Superfoods w/ Chicken, Turkey + Brown Rice - 4 lbs'){
    	kibble.kibbleType = 'ChickenTurkey';
           }
  else if(kibble.kibbleType == 'Superfoods w/ Lamb + Turkey (Grain-Free) - 4 lbs'){
    	kibble.kibbleType = 'lambTurkey';
           }
  	//console.log(kibble.kibbleType);


    // if (kibble.bags4>0) kibble.bags4Image='https://cdn.pickzen.com/clients/hungry-bark/'+kibble.key+'_4_'+kibble.bags4+'.png';
    //  if (kibble.bags12>0) kibble.bags12Image='https://cdn.pickzen.com/clients/hungry-bark/'+kibble.key+'_12_'+kibble.bags12+'.png';

    //kibble.bags4Title='('+kibble.bags4+') 4 lb Bag'+(kibble.bags4!=1?'s':'');
    //kibble.bags12Title='('+kibble.bags12+') 12 lb Bag'+(kibble.bags12!=1?'s':'');
	local.purFrequency = '3';
    kibble.action = local.purFrequency; // Default 3 week subscription
    kibble.tab='plan';
    kibble.bagSize='4-lbs'; // Default to select
    kibble.bagQty='1'; // Default to select

    kibble.stars = Extension.getByKey(products, 'group', kibble.key).stars;

    var reviews = JSON.parse(window.hungry.values.reviews);
  	
    kibble.reviews = reviews[kibble.key];

    kibble.stars=43;

    kibble.images=values['p_img_'+kibble.key].split(',');

    kibble.selectedImage=1;
  	
  	kibble.selected = true;
}

local.reviews = JSON.parse(window.hungry.values.reviews);
  	

local.supplements = recommendations.supplements;

local.supplements.forEach(function(p){
    // p.price = p.jars*p.pzProduct.price;
    p.price = p.pzProduct.price; //new price for 1 unit of supplement
  	local.purFrequency = '3';
    p.action = local.purFrequency; // Default 4 week subscription
    p.jarQty ='1';
  	p.selectedImage=0;
  	p.images = chewImages[p.key];
    p.PD = 60/p.jars;
    p.PD = Math.floor(p.PD);
    p.nutrition=values['nut_'+p.key];
    p.jarsTitle = '('+p.jars+') Jar'+(p.jars!=1?'s':'');
    p.stars = Extension.getByKey(products, 'group', p.key).stars;
    console.log(p.PD);
  	p.selected = true;
  	p.tab = 'description';
});



local.kibble = kibble;
if (mixin) {
    mixin.price = mixin.pzProduct.price; //updated
    mixin.priceNew = mixin.pzProduct.price; // new price because user will now choose bag quantity
  	local.purFrequency = '3';
    mixin.action = local.purFrequency; // Default 4 week subscription
    mixin.bagQty= '1';
    if (recommendations.kibble){
        kibble = recommendations.kibble; // because I want to use a kibble variable here
        mixin.PD = 30/kibble.cups1;
        mixin.PD = Math.floor(mixin.PD);
      	mixin.PW = (mixin.bagQty*mixin.PD)/7;
      	mixin.PW = mixin.PW/7;
      	mixin.PW = Math.floor((mixin.bagQty*mixin.PD)/7);
    }
    else
    {
        mixin.PD = mixin.perday;
      	mixin.PW = mixin.bagQty*mixin.PD;
      	mixin.PW = mixin.PW/7;
      	mixin.PW = Math.floor(mixin.PW);
        // mixin.PD = 30/mixin.cup1;
        // mixin.PD = Math.floor(mixin.PD);
    }


    var productData = Extension.getByKey(products, 'group', mixin.key);
    mixin.images=values['p_img_'+mixin.key].split(',');
    mixin.selectedImage=0;
    mixin.nutrition=values['nut_'+mixin.key];
    mixin.stars = productData.stars;
    mixin.bagsTitle = '('+mixin.bags+') Bag'+(mixin.bags!=1?'s':'');
}

local.purchaseSelector=function(event){
  purMode = event.target.checked;
  
  if(purMode == true){
   	local.purMode = true;
    local.purFrequency = 'one-time';
    if(local.kibble){
      local.kibble.action = 'one-time';
    }
    if(local.supplements){
      local.supplements.forEach(function(p){
        p.action = 'one-time'; 
      });

     }
    if(local.mixin){
      local.mixin.action = 'one-time';
     }
    local.oneTime = true;
    local.subscribe = false;
    local.slideHandle = 'One-Time Purchase';  
    
    }
  else if(purMode == false){
   	local.purMode = false;
    local.purFrequency = '3';
    if(local.kibble){
      local.kibble.action = local.purFrequency;
    }
    if(local.supplements){
      local.supplements.forEach(function(p){
        p.action = local.purFrequency; 
      });

     }
    if(local.mixin){
      local.mixin.action = local.purFrequency;
     }
    local.subscribe = true;
    local.oneTime = false;
    local.slideHandle = 'Subscribe & Save 20%';  
  }
  
  
};

              
              
local.getPurchaseFrequency=function(frequency) {
  if(local.purFrequency != 'one-time'){
    
    if(local.kibble){
      local.kibble.action = frequency;
    }
    
    if(local.supplements){
      local.supplements.forEach(function(p){
        p.action = frequency; 
      });

     }
    if(local.mixin){
      local.mixin.action = frequency;
     }
   
  }
 
};




console.log("recommendations", recommendations);

local.isAnySupplementSelected=function(){
    var resp=false;

    local.supplements.forEach(function(p){
        if (p.selected) resp=true;
    });

    return resp;
};

local.isAnySelected=function(){
    return local.isAnySupplementSelected() || local.kibble&&local.kibble.selected || local.mixin&&local.mixin.selected;
};

local.getProductQty=function(){
    var total=0;
    if (local.kibble && local.kibble.selected) {
      total = local.kibble.bagQty;
      total = parseInt(total, 10);
    }
  	
  	local.supplements.forEach(function(p){
        if (p.selected) {
            total = total + parseInt(p.jarQty, 10);
        }
    });
  
  if (local.mixin && local.mixin.selected) {
        total += parseInt(mixin.bagQty, 10);
    }

    return total;
};


local.getTotalKibbleBags=function(){
    var total=0;
    if (local.kibble && local.kibble.selected) total = local.kibble.bagQty;

    return total;
};

local.getTotalProducts=function(){
    var total=0;
    if (local.kibble && local.kibble.selected) total++;

    local.supplements.forEach(function(p){
        if (p.selected) total++;
    });

    if (local.mixin && local.mixin.selected) total++;

    return total;
};

local.getTotalPrice=function(){
    var total=0;
    if (local.kibble && local.kibble.selected) {
        //kibble_price to find the price based on the bag size chosen
        kibble_price = local.kibble.bagSize =='4-lbs' ? kibble.price4lbs 
        : local.kibble.bagSize =='12-lbs' ? kibble.price12lbs
        : kibble.price24lbs;
        total += !isNaN(local.kibble.action) ?local.kibble.bagQty*kibble_price*0.8:local.kibble.bagQty*kibble_price;
    }

    local.supplements.forEach(function(p){
        if (p.selected) {
            total += p.action!='one-time'?p.price*0.8*p.jarQty : p.price * p.jarQty;
        }
    });

    if (local.mixin && local.mixin.selected) {
        total += local.mixin.action!='one-time'?local.mixin.price * 0.8 * mixin.bagQty : local.mixin.price * mixin.bagQty;
    }
    return total;
};


local.startOver=function(){
    Extension.setStorageValue('currentDog',1);
    window.pz.addDog=false;
    local.restart();
};

local.addAnotherDog=function(){
    addToCart(function(){
        var currentDog = Extension.getLocalStorageItem('currentDog') || 1;
      	
        Extension.setLocalStorageItem('currentDog',currentDog+1);
        window.pz.addDog=true;
        local.restart();
    });
};

local.goToCheckout=function(){
  console.log("goToCheckout");
    addToCart(function(){
        Extension.goToUrl('/cart');
    });
};

function addToCart(callback){
    var items = [];

    if (local.kibble && local.kibble.selected){
        var kibble = local.kibble;

        if (kibble.bagSize == "4-lbs") {
            items.push({id:kibble.pzProduct4.sku, action:kibble.action, qty:kibble.bagQty, rechargeId:kibble.pzProduct4.meta.recharge.id, product:kibble.pzProduct4});
        }

        if (kibble.bagSize == "12-lbs"){
            items.push({id:kibble.pzProduct12.sku, action:kibble.action, qty:kibble.bagQty, rechargeId:kibble.pzProduct12.meta.recharge.id, product:kibble.pzProduct12});
        }

        if (kibble.bagSize == "24-lbs"){
            items.push({id:kibble.pzProduct24.sku, action:kibble.action, qty:kibble.bagQty, rechargeId:kibble.pzProduct24.meta.recharge.id, product:kibble.pzProduct24});
        }
    }

    local.supplements.forEach(function(p){
        if (p.selected) {
            items.push({id:p.pzProduct.sku, action:p.action, qty:p.jarQty, rechargeId:p.pzProduct.meta.recharge.id, product:p.pzProduct});
        }
    });
  
    if (local.mixin && local.mixin.selected) {
        items.push({id:local.mixin.pzProduct.sku, action:local.mixin.action, qty:local.mixin.bagQty, rechargeId:local.mixin.pzProduct.meta.recharge.id, product:local.mixin.pzProduct});
    }

    if (items.length>0) {

        local.state.busy=true;
        Extension.executeJS('pzAddAllToCart', callback, true, [items, local.dogName, subscriptionId]);
    } else {
        callback();
    }
}

var goals=[];
goals[0] = answers.dog.lifeStage=='adult'?'Adult lifestage':'Puppy lifestage';
var weigthSel = answers.dog.weight;
var weightGoal;
if (weigthSel=='weight_under') {
    weightGoal='Gain Weight';
} else if (weigthSel=='weight_right') {
    weightGoal='Maintain Weight';
} else if (weigthSel=='weight_over') {
    weightGoal='Lose Weight';
}
goals.push(weightGoal);
goals.push('Allergy-Free');

var concerns = answers.dog.concerns;
if (concerns){
    concerns.split(',').forEach(function(c){
        var text;
        if (c=='concern_digestion') text='Digestion';
        else if (c=='concern_immunity') text='Immunity support';
        else if (c=='concern_heart') text='Heart health';
        else if (c=='concern_skin') text='Skin/Coat';
        else if (c=='concern_bones') text='Bone health';
        else if (c=='concern_brain') text='Brain health';
        else if (c=='concern_hipjoint') text='Hip & joint health';
        else if (c=='concern_mobility') text='Improved mobility';
        else if (c=='concern_longevity') text='Life longevity';
        else if (c=='concern_stress') text='Stress and anxiety';

        goals.push(text);
    });
}
local.goals=goals;

if (local.kibble) {
    var kibbleVals = window.hungry.values['vals_'+local.kibble.key].split(',');

    local.kibble.values=[
        {top:'Min', mid:kibbleVals[0], bottom:'Crude Protein', symbol:'%'},
        {top:'Min', mid:kibbleVals[1], bottom:'Crude FAT', symbol:'%'},
        {top:'Max', mid:kibbleVals[2], bottom:'Crude Fiber', symbol:'%'},
        {top:'Max', mid:kibbleVals[3], bottom:'Moisture', symbol:'%'},
        {top:'Min', mid:kibbleVals[4], bottom:'Omega-6 Fatty Acids*', symbol:'%'},
        {top:'Min', mid:kibbleVals[5], bottom:'Omega-3 Fatty Acids*', symbol:'%'},
        {top:'Min', mid:kibbleVals[6], bottom:'Billion CFU/lb.', symbol:''},
    ];
}

function replaceTexts(){
    var template = slide.htmlTemplate;
    var values = window.hungry.values;

    var st10;
    if (answers.dog.picky=='picky_high' || answers.dog.picky=='picky_sometimes') {
        st10 = values.st10_picky;
        st10 = st10.replace(/%picky_type%/g, answers.dog.picky=='picky_high'?'PICKY EATER':'SOMEWHAT PICKY EATER');
    } else if (answers.dog.weight=='weight_under') {
        st10 = values.st10_underweight;
    } else if (answers.dog.activity=='activity_high') {
        st10 = values.st10_active;
    } else {
        st10 = values.st10_other;
    }

    template = template.replace(/%st10%/g,st10);
    template = template.replace(/%possessive%/g, answers.dog.gender=='Male'?'his':'her');
    template = template.replace(/%pronoum%/g, answers.dog.gender=='Male'?'him':'her');

    if (local.kibble) {
        template = template.replace(/%kibble_cals%/g, local.kibble.calories);
        template = template.replace(/%kibble_cups%/g, local.kibble.serving);
        template = template.replace(/%kibble_lbs7%/g, local.kibble.lbs7);

        var ingredients = values['ing_'+local.kibble.key];
        //template = template.replace(/%kibble_ingredients%/g, ingredients);
        local.kibble.ingredients=ingredients;
        var picture = values['img_'+local.kibble.key];
        template = template.replace(/%kibble_picture%/g, picture);
    }

    slide.htmlTemplate= Extension.replaceTextParams(template);
}

replaceTexts();

local.getBackgroundImage=function(img) {
    return img?{'background-image': 'url(' + img + ')'}:{};
};

local.close=function(){
    Extension.goToUrl('https://hungrybark.com');
};

local.kibbleValidation=function(){
	if (local.kibble.bagQty=='0'||local.kibble.bagSize=='0')
    {
      var elem = document.getElementById('error-message-kibble');
      setTimeout(function() {
        elem.className="hide";
     }, 30000);
      elem.classList.remove("hide");
      elem.style.display='block'; 
    }
};




//NEW CODE BY PAUL

local.getReviewsPage = function(min, max) {
  var input = [];
  for (var i = min; i <= max; i += 1) {
        if (kibble.reviews[i]) input.push(kibble.reviews[i]);
    }
    return input;
};


local.truncateReviews = function(review, length){
  var input = review;
  
 input = input.substring(0, length);
  
  return input;
};



local.kibblePW=function(kibBag, KibBagQty) {
  if(kibBag == '4-lbs')
  {
    kibBag = 4;
  }
  if(kibBag == '12-lbs')
  {
    kibBag = 12;
  }
  if(kibBag == '24-lbs')
  {
    kibBag = 24;
  }
  KibblePW = local.kibble.lbs7/7;
  KibblePW = (KibBagQty*kibBag)/KibblePW;
  KibblePW = Math.floor(KibblePW);
   if (KibblePW < 2 && KibblePW >= 1) 
   {
     return KibblePW + ' day'; 
   }
  else 
  {
    return KibblePW + ' days';
  }
  
};


local.kibblePW=function(kibBag, KibBagQty) {
  if(kibBag == '4-lbs')
  {
    kibBag = 4;
  }
  if(kibBag == '12-lbs')
  {
    kibBag = 12;
  }
  if(kibBag == '24-lbs')
  {
    kibBag = 24;
  }
  KibblePW = local.kibble.lbs7/7;
  KibblePW = (KibBagQty*kibBag)/KibblePW;
  KibblePW = Math.floor(KibblePW);
   if (KibblePW < 2 && KibblePW >= 1) 
   {
     return KibblePW + ' day'; 
   }
  else 
  {
    return KibblePW + ' days';
  }
  
};


local.displayKibbleModal=function(){
  
var modal = document.getElementById("kibbleModal");
 modal.style.display = "flex";
  //document.body.style.height = "100vh";
  //document.body.style.overflowY = "hidden";
  //document.body.style.position = 'fixed';
//document.body.style.top = `-${window.scrollY}px`;
};

local.closeKibbleModal=function() {
  
  var modal = document.getElementById("kibbleModal");
  modal.style.display = "none";
};



local.displaySupModal=function(){
  
var modal = document.getElementById("supModal");
 modal.style.display = "flex";
};

local.closeSupModal=function() {
  
  var modal = document.getElementById("supModal");
  modal.style.display = "none";
};




local.displayMixinModal=function(){
  
var modal = document.getElementById("mixinModal");
 modal.style.display = "flex";

};

local.closeMixinModal=function() {
  
  var modal = document.getElementById("mixinModal");
  modal.style.display = "none";
};


local.addDogInfo=function(){
  
var modal = document.getElementById("addDogInfo");
 modal.style.display = "flex";

};

local.closeaddDogInfo=function() {
  
  var modal = document.getElementById("addDogInfo");
  modal.style.display = "none";
};



window.onclick = function(event) {
  var kibmodal = document.getElementById("kibbleModal");
  var mixinmodal = document.getElementById("mixinModal");
  var supmodal = document.getElementById("supModal");
  var addDogInfo = document.getElementById("addDogInfo");
  
  if (event.target == kibmodal) {
    kibmodal.style.display = "none";
  }
  
  if (event.target == mixinmodal) {
    mixinmodal.style.display = "none";
  }
  
  if (event.target == supmodal) {
    supmodal.style.display = "none";
  }
  
  if (event.target == addDogInfo) {
    addDogInfo.style.display = "none";
  }
  
};

local.mixinPW=function(Mixqty) {
  MixinPW = Mixqty*mixin.PD;
  MixinPW = Math.floor(MixinPW);
  if (MixinPW < 2 && MixinPW >= 1 ) 
   {
     return MixinPW + ' day'; 
   }
  else  
  {
    return MixinPW + ' days';
  }
  
};

local.kibbleqtyIncrement=function(qty){
  if(local.kibble){
    kibble = local.kibble;
      kibble.bagQty = qty;
      kibble.bagQty = parseInt(kibble.bagQty, 10);
      kibble.bagQty = kibble.bagQty+1;
      if(kibble.bagQty >= 10){
        kibble.bagQty = 10;
         }
      kibble.bagQty = kibble.bagQty.toString();
    }
  
};

local.kibbleqtydecrement=function(qty){
  if(local.kibble){
    kibble = local.kibble;
    kibble.bagQty = qty;
    kibble.bagQty = parseInt(kibble.bagQty, 10);
    kibble.bagQty = kibble.bagQty-1;
    if(kibble.bagQty <= 1){
      kibble.bagQty = 1;
       }
    kibble.bagQty = kibble.bagQty.toString();
  }
  
};

local.supplementqtydecrement=function(qty){
  if(local.supplements){
      local.supplements.forEach(function(p){
        p.jarQty = qty;
        p.jarQty = parseInt(p.jarQty, 10);
        p.jarQty = p.jarQty-1;
        if(p.jarQty <= 1) p.jarQty = 1;
        p.jarQty = p.jarQty.toString();
      });
     }
};


local.supplementqtyIncrement=function(qty){
  if(local.supplements){
      local.supplements.forEach(function(p){
        p.jarQty = qty;
        p.jarQty = parseInt(p.jarQty, 10);
        p.jarQty = p.jarQty+1;
        if(p.jarQty >= 10) p.jarQty = 10;
        p.jarQty = p.jarQty.toString();
      });
     }
};


local.mixinqtyIncrement=function(qty){
  if(local.mixin){
    mixin = local.mixin;
      mixin.bagQty = qty;
      mixin.bagQty = parseInt(mixin.bagQty, 10);
      mixin.bagQty = mixin.bagQty+1;
      if(mixin.bagQty >= 10){
        mixin.bagQty = 10;
         }
      mixin.bagQty = mixin.bagQty.toString();
     }
  
};

local.mixinqtydecrement=function(qty){
   if(local.mixin){
    mixin = local.mixin;
    mixin.bagQty = qty;
    mixin.bagQty = parseInt(mixin.bagQty, 10);
    mixin.bagQty = mixin.bagQty-1;
    if(mixin.bagQty <= 1){
      mixin.bagQty = 1;
       }
    mixin.bagQty = mixin.bagQty.toString();
   }
  
};



