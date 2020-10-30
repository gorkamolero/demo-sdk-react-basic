var Theme = Extension.getService('Theme6');

var hungry = window.hungry;

var dog={}, owner={}, recommendations;


var productsToExclude=[];
var productsToRecommend=[];
var getByKey = Extension.getByKey;

function contains(item, list) {
    return list.indexOf(item)!=-1;
}

function addAsSet(list, holder) {
    list.forEach(function (item) {
        if (!contains(item, holder)) holder.push(item);
    });
}

function addRecommendedProduct(productKey) {
    var addedProduct;

    if (!contains(productKey, productsToExclude)) {
        var entry = getByKey(productsToRecommend, 'key', productKey);

        if (!entry) {
            var type = getByKey(hungry.products,'product',productKey).type;
            addedProduct = {key: productKey, type: type};
            productsToRecommend.push(addedProduct);
        }
    }

    return addedProduct;
}

function addRecommendedProducts(products, smarttext) {
    products.forEach(function(productKey){
        addRecommendedProduct(productKey, smarttext);
    });
}

function isExcluded(product) {
    return contains(product, productsToExclude);
}

function getMultipleValues(answer) {
    var resp = [];
    if (!answer) return resp;

    answer.split(',').forEach(function(item){
        resp.push(item.trim());
    });

    return resp;
}

function excludeAllergenicProducts() {
    getMultipleValues(dog.allergies).forEach(function(ingredient){
        var items = hungry.allergiesMap[ingredient];
        if (items) addAsSet(items, productsToExclude);
    });
}

function excludePickyProducts() {
    //if (dog.picky == 'picky_high' || dog.picky == 'picky_sometimes') {
    getMultipleValues(dog.pickyIngredients).forEach(function(ingredient){
        var products = hungry.picky[ingredient];
        if (products) {
            addAsSet(products, productsToExclude);
        }
    });
    //}
}

function excludeGrainProducts() {
    if (dog.grain=='grain_free') {
        addAsSet(['chicken_rice'], productsToExclude);
    }
}

function getProductsOfType(products, type) {
    var resp=[];
    if (products) {
        products.forEach(function(productKey){
            if (isOfType(productKey,type)) resp.push(productKey);
        });
    }

    return resp;
}

function setConcernProducts() {
    getMultipleValues(dog.concerns).forEach(function(concern){
        var entry = hungry.rules[concern];
        var supplements=getProductsOfType(entry.products, 'chews');
        addRecommendedProducts(supplements, entry.smarttext);
    });
}

function calculateAgeInMonths(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    return ageDifMs/(1000*60*60*24*30);
}

function setOldAgeRecommendation() {
    var today = new Date();
    var bday = new Date(dog.month+'/'+today.getDate()+'/'+dog.year);

    var months = calculateAgeInMonths(bday);

    if (months>=7*12) {
        addRecommendedProduct('multivitamin', 'is a senior dog');
    } else {
        addRecommendedProduct('multivitamin');
    }
}

function setOverUnderRecommendations() {
    var entry = hungry.rules[dog.weight];
    var supplements=getProductsOfType(entry.products, 'chews');
    addRecommendedProducts(supplements, entry.smarttext);
}

function setActivityRecommendations() {
    var entry = hungry.rules[dog.activity];
    var supplements=getProductsOfType(entry.products, 'chews');
    addRecommendedProducts(supplements, entry.smarttext);
}

function setPickyRecommendations() {
    var entry = hungry.rules[dog.picky];
    var supplements=getProductsOfType(entry.products, 'chews');
    addRecommendedProducts(supplements, entry.smarttext);
}

function isOfType(id, type) {
    return getByKey(hungry.products,'product',id).type==type;
}

function setBreedRecommendationsForSupplements() {
    getMultipleValues(dog.breeds).forEach(function(breed){
        var entry = hungry.breedsMap[breed];
        var supplements=getProductsOfType(entry.products, 'chews');
        addRecommendedProducts(supplements, entry.smarttext);
    });
}

function addMixin() {
    var kibble = dog.kibble?dog.kibble.key:null;

    var mixin;

    if (kibble=='salmon') {
        if (!isExcluded('m_chicken')) mixin='m_chicken';
    } else if (kibble=='turkey_duck' || kibble=='lamb_turkey') {
        if (!isExcluded('m_beef')) mixin='m_beef';
    } else if (kibble=='chicken_rice') {
        if (!isExcluded('m_salmon')) mixin='m_salmon';
    }

    if (!mixin) {
        if (!isExcluded('m_beef')) {
            mixin='m_beef';
        } else if (!isExcluded('m_salmon')) {
            mixin='m_salmon';
        } else if (!isExcluded('m_chicken')) {
            mixin='m_chicken';
        }
    }

    if (mixin) {
        var product = addRecommendedProduct(mixin);
        // Bags for 14 days
        if (dog.weightValue<=50) {
            product.bags=1;
            product.skuSuffix = '1bag';
        } else {
            product.bags=2;
            product.skuSuffix = '2bag';
        }
    }
}

function addKibble() {
    var kibble;

    if (dog.grain=='grain_inclusive' && !isExcluded('chicken_rice')) {
        kibble = 'chicken_rice';
    }

    var products=[];
    getMultipleValues(dog.concerns).forEach(function(concern){
        var entry = hungry.rules[concern];
        addAsSet(entry.products, products);
    });

    addAsSet(hungry.rules[dog.weight].products, products);
    addAsSet(hungry.rules[dog.activity].products, products);
    addAsSet(hungry.rules[dog.picky].products, products);


    if (!kibble) {
        getProductsOfType(products, 'kibble').forEach(function(productKey){
            if (!kibble && !isExcluded(productKey)) {
                kibble = productKey;
            }
        });
    }

    if (!kibble) {
        getMultipleValues(dog.breeds).forEach(function (breed) {
            hungry.breedsMap[breed].products.forEach(function (key) {
                if (isOfType(key, 'kibble')) {
                    if (!kibble && !isExcluded(key)) {
                        kibble = key;
                    }
                }
            });
        });
    }

    if (!kibble) {
        if (!isExcluded('chicken_rice')) {
            kibble = 'chicken_rice';
        } else if (!isExcluded('turkey_duck')) {
            kibble = 'turkey_duck';
        } else if (!isExcluded('lamb_turkey')) {
            kibble = 'lamb_turkey';
        } else if (!isExcluded('salmon')) {
            kibble = 'salmon';
        }
    }


    if (kibble) {
        dog.kibble = addRecommendedProduct(kibble);
        setKibbleQty(dog.kibble);
    } else {
        dog.referenceKibble = {key:'chicken_rice'};
        setKibbleQty(dog.referenceKibble);
    }
}


function setKibbleQty(product) {
    var kibble = product.key;

    var caloriesTable, cupWeight;

    if (kibble=='salmon') {
        caloriesTable=hungry.kibble.salmonTurkeyDuck;
        cupWeight=0.30247;
    } else if (kibble=='chicken_rice') {
        caloriesTable=hungry.kibble.chickenRice;
        cupWeight=0.269404;
    } else if (kibble=='turkey_duck') {
        caloriesTable=hungry.kibble.salmonTurkeyDuck;
        cupWeight=0.30247;
    } else if (kibble=='lamb_turkey') {
        caloriesTable=hungry.kibble.lambTurkey;
        cupWeight=0.31482;
    }

    var colPrefix;

    var mainBreed = dog.breeds.split(',')[0]; // first?
    var size = window.hungry.breedsMap[mainBreed].size;
    dog.size=size;
    var adultMonths;

    if (size=='xs') {
        adultMonths=8;
    } else if (size=='small') {
        adultMonths=10;
    } else if (size=='med') {
        adultMonths=12;
    } else if (size=='large') {
        adultMonths=15;
    } else if (size=='xl') {
        adultMonths=19;
    }

    var today = new Date();
    var bday = new Date(dog.month+'/'+today.getDate()+'/'+dog.year);
    var months = calculateAgeInMonths(bday);

    if (months<adultMonths) {
        colPrefix = 'pu';
        dog.lifeStage='puppy';
    } else {
        dog.lifeStage='adult';
        if (dog.weight=='weight_over') {
            colPrefix = 'ow';
        } else if (dog.weight=='weight_under'){
            colPrefix = 'uw';
        } else {
            if (dog.activity=='activity_lazy') {
                colPrefix = 'la';
            } else if (dog.activity=='activity_high') {
                colPrefix = 'ha';
            } else {
                colPrefix = 'ta';
            }
        }
    }

    var row = getByKey(caloriesTable, 'weight', dog.weightValue);
    product.calories = row[colPrefix+'_cal'];
    product.serving = row[colPrefix+'_serv']; // Cups per day
    product.lbs1 = product.serving*cupWeight;
    product.lbs14 = Math.ceil(product.lbs1*14);
    product.skuSuffix = product.lbs14;
}


function addSupplementQty(product){
    var weight = dog.weightValue;
    var aux;
    if (weight<25) {
        aux='0';
    } else if (weight<70) {
        aux='25';
    } else {
        aux=70;
    }

    // Aqui hacemos lo mismo que en setKibbleQty: sacamos la cantidad de una tabla a falta que nos digan como sacarlo
    var chewsPerDay = parseInt(Extension.getByKey(hungry.chewsPerDay, 'key', product.key+'-'+aux).value);
    var chewsPer14Days = chewsPerDay*14;

    var size;
    if (chewsPer14Days<=14) {
        size=14;
    } else if (chewsPer14Days<=28) {
        size=28;
    } else if (chewsPer14Days<=42) {
        size=42;
    } else if (chewsPer14Days<=56) {
        size=56;
    }

    product.chews1 = chewsPerDay;
    product.chews14 = chewsPer14Days;
    product.skuSuffix=size+'ct';
}

function addSupplements(){
    setConcernProducts();
    setOldAgeRecommendation();
    setOverUnderRecommendations();
    setActivityRecommendations();
    setPickyRecommendations();
    setBreedRecommendationsForSupplements();

    productsToRecommend.forEach(function(product) {
        if (product.type=='chews') {
            addSupplementQty(product);
        }
    });
}

function sendCartAttrs() {
    var currentDog = Theme.getStorageValue('currentDog',1);

    var dogAttributes = {};

    if (currentDog==1) {
        dogAttributes.pz_generic = {
            dogs_in_household: owner.dogsInHousehold,
            human_information: {
                first_name: owner.firstName,
                gender: owner.gender,
                birthday: owner.birthday,
                email: owner.email
            }
        };
    }

    var kibble = dog.kibble || dog.referenceKibble;

    var dogNotation = 'pz_dog_' + currentDog;
    dogAttributes[dogNotation] = {
        name: dog.name,
        gender: dog.gender,
        breed: dog.breeds,
        activity_level: dog.activity,
        body_type: dog.weight,
        weight: dog.weightValue,
        birthday: {
            month: dog.month,
            year: dog.year
        },
        eating_habits: dog.picky,
        dislikes: dog.pickyIngredients,
        allergies: dog.allergies,
        health_goals: dog.concerns,
        calories:kibble.calories,
        cups:kibble.serving,
        lifestage:dog.lifeStage,
        grain:dog.grain
    };

    var products=[];
    if (recommendations.kibble) products.push(recommendations.kibble.sku,recommendations.kibble.lbs14);
  if (recommendations.mixin) products.push(recommendations.mixin.sku,recommendations.mixin.bags);

    recommendations.supplements.forEach(function(p){
      products.push(p.sku,p.chews14);
    });

    dogAttributes[dogNotation+'_recs']=products.join(',');

    Extension.executeJS('pzSendCartAttrs', null, false, [dogAttributes]);

}

function sendToRoswell() {
    try {
        var currentDog = Theme.getStorageValue( 'currentDog', 1 );
        var dogAttributes = {};

        dogAttributes.pz_generic = {
            dogs_in_household: Theme.getSavedResponse( 100, 1 ),
            human_information: {
                firstName: Theme.getSavedResponse( 100, 2 ),
                gender: Theme.getSavedResponse( 100, 4 ),
                birthday: Theme.getSavedResponse( 115, 1 ),
                email: Theme.getSavedResponse( 115, 2 )
            }
        };

        var kibble = dog.kibble || dog.referenceKibble;

        var dogNotation = 'pz_dog_' + currentDog;
        dogAttributes[ dogNotation ] = {
            name: dog.name,
            gender: dog.gender,
            breed: dog.breeds,
            activity_level: dog.activity,
            body_type: dog.weight,
            weight: dog.weightValue,
            birthday: {
                month: dog.month,
                year: dog.year
            },
            eating_habits: dog.picky,
            dislikes: dog.pickyIngredients,
            allergies: dog.allergies,
            health_goals: dog.concerns,
            calories:kibble.calories,
            cups:kibble.serving,
            lbs14: kibble.lbs14,
            lifestage:dog.lifeStage,
            grain:dog.grain
        };

        dogAttributes[ dogNotation + '_recs' ]= Extension.getSessionValue( 'recommendations' );

        console.log(JSON.stringify(dogAttributes));
        Extension.postRequest( "https://hungrybark.herokuapp.com/pickzen/results", "json", dogAttributes, function ( response ) {
            console.log( 'RS API response: ' + response );
        } );
        /*    Extension.postRequest( "https://hungrybark.roswellstudios.com/pickzen/results", "json", dogAttributes, function ( response ) {
              console.log( 'RS API response: ' + response );
            } );

                Extension.postRequest( "https://victor-roswell.ngrok.io/pickzen/results", "json", dogAttributes, function ( response ) {
              console.log( 'RS DEV response: ' + response );
            } );
            */


    } catch ( e ) {
        console.log( e );
    }
}

function setAnswers(){
    dog = {
        name : Extension.getFormResponse(101, slides, 11, history),
        gender: Extension.getFormResponse(101, slides, 8, history),
        weight : Extension.getFormResponse(112, slides, 4, history),
        weightValue : parseInt(Extension.getFormResponse(112, slides, 1, history)),
        activity : Extension.getFormResponse(101, slides, 10, history),
        picky : Extension.getFormResponse(113, slides, 1, history),
        pickyIngredients : Extension.getFormResponse(113, slides, 2, history),
        breeds : Extension.getFormResponse(101, slides, 9, history),
        allergies : Extension.getFormResponse(114, slides, 1, history),
        concerns : Extension.getFormResponse(114, slides, 3, history),
        grain : Extension.getFormResponse(114, slides, 5, history),
        month : Extension.getFormResponse(112, slides, 2, history),
        year : Extension.getFormResponse(112, slides, 3, history)
    };

    var currentDog = Theme.getStorageValue('currentDog',1);
    if (currentDog==1) {
        owner = {
            dogsInHousehold: Extension.getFormResponse(100, slides, 1, history),
            firstName: Extension.getFormResponse(100, slides, 2, history),
            gender: Extension.getFormResponse(100, slides, 4, history),
            birthday: Extension.getFormResponse(115, slides, 1, history),
            email: Extension.getFormResponse(115, slides, 2, history)
        };
        Theme.setStorageValue('owner',owner);
    } else {
        owner = Theme.getStorageValue('owner');
    }

    Extension.setSessionValue('answers', {dog:dog, owner:owner});
}

function assign(source, dest) {
    for (var key in source) {
        dest[key]=source[key];
    }
}

function setRecommendations(){
    var skus=[];

    recommendations= {
        kibble:null,
        mixin:null,
        supplements:[]
    };

    productsToRecommend.forEach(function(p){
        var data =  getByKey(hungry.products, 'product', p.key);
        if (data) {
          assign(data, p);
          p.sku = data.skuPrefix+'2w-'+p.skuSuffix; // Ex CTBR-2w-1

          if (p.type=='kibble' || p.type=='mixin') {
              recommendations[p.type]=p;
          } else {
              recommendations.supplements.push(p);
          }

          skus.push(p.sku);
        } else {
          console.error("Product not found",p);
        }
    });

    results=[];
    skus.forEach(function(sku){
        Extension.addResult('sku', sku, model, results);
    });

    Extension.setSessionValue('recommendations', recommendations);
}

function excludedNotAvailableProducts(){
    window.hungry.products.forEach(function(p){
        if (!p.available) addAsSet( [p.product], productsToExclude);
    });
}

setAnswers();
excludedNotAvailableProducts();
excludeAllergenicProducts();
excludePickyProducts();
excludeGrainProducts();
addKibble();
addMixin();
addSupplements();
setRecommendations();
sendCartAttrs();

console.log("Recommendations",recommendations);


sendToRoswell();

var currentDog = Theme.getStorageValue('currentDog',1);
var data = {dog:dog, owner:owner, recommendations: recommendations, currentDog: currentDog};

Extension.postRequest('https://vpa.hungrybark.com/quiz/create', 'json', data);
Extension.postRequest('https://hungrybark-pr.herokuapp.com/quiz/create', 'json', data);
Extension.executeJS("pzFBEvent('CompleteRegistration')");

var Session = Extension.getSession();
Session.fbEvent('pzCustom', {q:Session.getCode(), c:'['+hash(dog.size)+']['+hash(dog.lifeStage)+']'});

