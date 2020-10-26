var subscriptionId = 0; // Extension.getConfig('meta').recharge.subscriptionId;

var Theme = Extension.getService('Theme6');

var recommendations = Extension.getSessionValue('recommendations');
var answers = Extension.getSessionValue('answers');
var kibble, mixin, supplement;
var values = window.hungry.values;
var products = window.hungry.products;
local.buttonAnimation={};


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

local.scrollH=function(offset){
    var carrousel = document.querySelector('.products-carrousel');
    var newOffset = carrousel.scrollLeft+offset;

    smoothScrollRelative(carrousel, offset, 200, false);

    local.state.showLeftScroll=newOffset>15;
    local.state.showRightScroll=(carrousel.scrollWidth-carrousel.clientWidth)>newOffset;
};

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

local.isAnySelected=function(){
    return supplement&&supplement.selected || kibble&&kibble.selected || mixin&&mixin.selected;
};

local.getTotalProducts=function(){
    var total=0;
    if (kibble && kibble.selected) total++;

    if (supplement && supplement.selected) total++;

    if (mixin && mixin.selected) total++;

    return total;
};

local.getTotalPrice=function(){
    var total=0;

    if (kibble && kibble.selected) {
        total += kibble.price;
    }

    if (supplement && supplement.selected){
        total += supplement.price;
    }

    if (mixin && mixin.selected) {
        total += mixin.price;
    }

    return total;
};

local.startOver=function(){
    Theme.setStorageValue('currentDog',1);
    window.pz.addDog=false;
    local.restart();
};

local.addAnotherDog=function(){  
    if (!local.addingToCart){
      local.addingToCart=true;

      addToCart(function(){
        local.addingToCart=false;
          var currentDog = Theme.getStorageValue('currentDog',1);

          Theme.setStorageValue('currentDog',currentDog+1);
          window.pz.addDog=true;
          local.restart();
      });
    }
};

local.goToCheckout=function(){
  if (!local.addingToCart){
      local.addingToCart=true;
  
      addToCart(function(response){
        local.addingToCart=false;
        Extension.goToUrl('/cart');
      });
  }
};

local.getBackgroundImage=function(img) {
    return img?{'background-image': 'url(' + img + ')'}:{};
};

local.close=function(){
    Extension.ExecuteJS('reChargeProcessCart()');
};

local.getReviewsPage = function(min, max) {
    var input = [];
    for (var i = min; i <= max; i += 1) {
        if (kibble.reviews[i]) input.push(kibble.reviews[i]);
    }
    return input;
};

local.Reviews = function(review, length){
    var input = review;

    input = input.substring(0, length);

    return input;
};


local.truncate = function(text, length){
    return text.length>length?text.substring(0, length):text;
};

local.truncateTexts = function(text, length){
    var input = text;

    input = input.substring(0, length);

    return input;
};

local.displayKibbleModal=function(){
    var modal = document.getElementById("kibbleModal");
    modal.style.display = "flex";
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

function reChargeProcessCart(token){
    console.log('token', token);
  
  var ga_linker = '';
  var myshopify_domain='hungrybark.myshopify.com';
  try { 
      ga_linker = ga.getAll()[0].get('linkerParam'); 
    } catch(err) { 
      ga_linker =''; 
    }
  var checkout_url= "https://checkout.hungrybark.com/r/checkout?myshopify_domain="+myshopify_domain+"&cart_token="+token+"&"+ga_linker+"&";
    console.log(checkout_url);
    return checkout_url;
}

function addToCart(callback){
    var items = [];
  
    var action = local.onetime?'one-time':'4';
  
    if (mixin && mixin.selected) {
        items.push({id:mixin.pzProduct.sku, action:action, qty:1, rechargeId:mixin.pzProduct.meta.recharge.id});
    }
  
    if (supplement && supplement.selected) {
        items.push({id:supplement.pzProduct.sku, action:action, qty:1, rechargeId:supplement.pzProduct.meta.recharge.id});
    }

    if (kibble && kibble.selected){
        items.push({id:kibble.pzProduct.sku, action:action, qty:1, rechargeId:kibble.pzProduct.meta.recharge.id});
    }

    if (items.length>0) {
        local.state.busy=true;
        Extension.executeJS('pzAddAllToCart', callback, true, [items, local.dogName, subscriptionId]);
    } else {
        callback();
    }
}

function setGoals() {
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

    if (kibble) {
        template = template.replace(/%kibble_cals%/g, kibble.calories);
        template = template.replace(/%kibble_cups%/g, kibble.serving);
        template = template.replace(/%kibble_lbs14%/g, kibble.lbs14);

        var ingredients = values['ing_'+kibble.key];
        kibble.ingredients=ingredients;
        var picture = values['img_'+kibble.key];
        template = template.replace(/%kibble_picture%/g, picture);
    }

    slide.htmlTemplate=Extension.replaceTextParams(template);
}

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

function enableReviewsSlider() {
    Extension.waitForElement(extension, '#reviewSwipeMob', function (reviewSlide) {
        var startX, startY, dist, elapsedTime, startTime;

        reviewSlide.addEventListener('touchstart', function (e) {
            var touchobj = e.changedTouches[0];
            dist = 0;
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime(); // record time when finger first makes contact with surface

        }, false);

        reviewSlide.addEventListener('touchmove', function (e) {

        }, false);

        reviewSlide.addEventListener('touchend', function (e) {
            var touchobj = e.changedTouches[0];
            dist = touchobj.pageX - startX; // get total dist traveled by finger while in contact with surface
            elapsedTime = new Date().getTime() - startTime; // get time elapsed

            if (Math.abs(dist) > 50) {
                e.preventDefault();

                var inc = dist < 0 ? 1 : -1;

                local.$apply(function () {
                    var page = kibble.reviewPage + inc;
                    if (page > kibble.reviews.length) {
                        page--;
                    } else if (page < 1) {
                        page++;
                    }
                    local.page = page;
                    kibble.reviewPage = page;
                });
            }
        }, false);
    });

    Extension.waitForElement(extension, '#reviewSwipeTab', function (reviewSlide) {
        var startX, startY, dist, elapsedTime, startTime;

        reviewSlide.addEventListener('touchstart', function (e) {
            var touchobj = e.changedTouches[0];
            dist = 0;
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime(); // record time when finger first makes contact with surface

        }, false);

        reviewSlide.addEventListener('touchmove', function (e) {

        }, false);

        reviewSlide.addEventListener('touchend', function (e) {
            var touchobj = e.changedTouches[0];
            dist = touchobj.pageX - startX; // get total dist traveled by finger while in contact with surface
            elapsedTime = new Date().getTime() - startTime; // get time elapsed

            if (Math.abs(dist) > 50) {
                e.preventDefault();

                var inc = dist < 0 ? 1 : -1;

                local.$apply(function () {
                    var page = kibble.reviewPage + inc;
                    if (page > ((kibble.reviews.length) - 1)) {
                        page = page - 1;
                    } else if (page < 1) {
                        page = page + 1;
                    }

                    kibble.reviewPage = page;
                });
            }


        }, false);
    });
}

function setDesktopMobile(){
    local.mobile=window.innerWidth<1113;
    local.desktop=!local.mobile;

    if(window.innerWidth <= 1112 && window.innerWidth >= 501){
        local.progressBar = 394;
        local.discount20 = 125;
    }
    else if(window.innerWidth <= 500 ){
        local.discount20 = 92;
    }

}

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

local.setPurchaseFrecuency=function(onetime){  
  local.onetime = onetime;
  local.slideHandle = onetime?'One-Time Purchase':'Subscribe & Save 20%';    
};

local.getShippingText=function() {
    return local.getTotalPrice()*0.9*2>=50?"(w/ free shipping)":"(plus s&h)";
};

window.addEventListener("resize", function(){
    local.$apply(setDesktopMobile);
}); 



function init() {
    local.state={
        busy:false,
        page:1
    };

    local.dogName = answers.dog.name[0].toUpperCase() + answers.dog.name.slice(1);
    if (local.dogName.length>=12) { local.dogName = local.truncate((answers.dog.name[0].toUpperCase() + answers.dog.name.slice(1)), 12) + '...'; }
    local.dogBreed = answers.dog.breeds;
    local.humanName = answers.owner.firstName;
    local.dogweight = answers.dog.weightValue;

    local.setPurchaseFrecuency(false);


    // Simulate no product
    //recommendations.supplements=[];
    //recommendations.kibble=null;
    //recommendations.mixin=null;

    // Load products
    if (recommendations.kibble) {
        kibble = recommendations.kibble;
        kibble.pzProduct = Extension.getByKey(etc.results, 'altId', kibble.sku);
        kibble.price = kibble.pzProduct.price;

        kibble.reviewPage = 1;

        kibble.tab='plan';

        kibble.stars = Extension.getByKey(products, 'product', kibble.key).stars;

        var reviews = JSON.parse(window.hungry.values.reviews);

        kibble.reviews = reviews[kibble.key];

        kibble.stars=43;

        kibble.images=values['p_img_'+kibble.key].split(',');

        kibble.selectedImage=1;

        kibble.selected = true;

        var descNoDogName = Extension.getByKey(products, 'product', kibble.key).description;
        kibble.desc = descNoDogName.replace('[DOG NAME]', local.dogName);

        var kibbleVals = window.hungry.values['vals_'+kibble.key].split(',');

        kibble.values=[
            {top:'Min', mid:kibbleVals[0], bottom:'Crude Protein', symbol:'%'},
            {top:'Min', mid:kibbleVals[1], bottom:'Crude FAT', symbol:'%'},
            {top:'Max', mid:kibbleVals[2], bottom:'Crude Fiber', symbol:'%'},
            {top:'Max', mid:kibbleVals[3], bottom:'Moisture', symbol:'%'},
            {top:'Min', mid:kibbleVals[4], bottom:'Omega-6 Fatty Acids*', symbol:'%'},
            {top:'Min', mid:kibbleVals[5], bottom:'Omega-3 Fatty Acids*', symbol:'%'},
            {top:'Min', mid:kibbleVals[6], bottom:'Billion CFU/lb.', symbol:''},
        ];

        enableReviewsSlider();

        local.kibble=kibble;
    }

    if (recommendations.mixin) {
        mixin = recommendations.mixin;
        mixin.pzProduct = Extension.getByKey(etc.results, 'altId', mixin.sku);
        mixin.selected = false;
        mixin.tab = 'description';
        mixin.price = mixin.pzProduct.price;

        var productData = Extension.getByKey(products, 'product', mixin.key);
        mixin.images=values['p_img_'+mixin.key].split(',');
        mixin.selectedImage=0;
        mixin.nutrition=values['nut_'+mixin.key];
        mixin.stars = productData.stars;
        var descNoDogName = productData.description;
        mixin.desc = descNoDogName.replace('[DOG NAME]', local.dogName);

        local.mixin=mixin;
    }

    if (recommendations.supplements.length>0) {
      if (answers.dog.concerns && answers.dog.concerns.length>0) {
        supplement = recommendations.supplements[0];
      } else { 
        ['hip_joint', 'probiotic', 'omega', 'calming', 'multivitamin'].forEach(function(key){
              if (!supplement) supplement = Extension.getByKey(recommendations.supplements, 'key', key);
          });
        }

        supplement.pzProduct = Extension.getByKey(etc.results, 'altId', supplement.sku);
        supplement.price = supplement.pzProduct.price; //new price for 1 unit of supplement;
        supplement.images=values['p_img_'+supplement.key].split(',');
        supplement.selectedImage=0;
        supplement.nutrition=values['nut_'+supplement.key];
        supplement.stars = Extension.getByKey(products, 'product', supplement.key).stars;
        supplement.selected = false;
        supplement.tab = 'description';
        var descNoDogName = Extension.getByKey(products, 'product', supplement.key).description;
        supplement.desc = descNoDogName.replace('[DOG NAME]', local.dogName);
        local.supplement=supplement;
    }

    setGoals();
    replaceTexts();

    setTimeout(function(){
        Extension.executeJS('pzRefreshProgressBar', null, null, [-1, 0]);
    },100);

    Extension.waitForElement(extension, '.products-carrousel', function(carrousel){
        local.state.showRightScroll=carrousel.scrollWidth>carrousel.clientWidth;
    });

    setDesktopMobile();

    Extension.executeJS('hideProgress()');

}

init();


(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:1884595,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');




