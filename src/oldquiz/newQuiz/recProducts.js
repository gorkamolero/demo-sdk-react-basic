var hungry = window.hungry;

var dog={}, owner={};
  

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

function addRecommendedProduct(productKey, smarttext) {
	var addedProduct;
	
    if (!contains(productKey, productsToExclude)) {
        var entry = getByKey(productsToRecommend, 'key', productKey);

        if (!entry) {
			var type = getByKey(hungry.products,'group',productKey).type;
			addedProduct = {key: productKey, smarttext: smarttext, type:type};
            productsToRecommend.push(addedProduct);
        } else if (!entry.smarttext) {
            entry.smarttext=smarttext;
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
    return getByKey(hungry.products,'group',id).type==type;
}

function setBreedRecommendationsForSupplements() {
    getMultipleValues(dog.breeds).forEach(function(breed){
		var entry = hungry.breedsMap[breed];
		var supplements=getProductsOfType(entry.products, 'chews');
		addRecommendedProducts(supplements, entry.smarttext);
    });
}

function addMixins() {
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
      	var cup28 = dog.kibble?dog.kibble.cups28:dog.referenceKibble.cups28;
      	var cup1 = dog.kibble?dog.kibble.cups1:dog.referenceKibble.cups1;
		setMixinQty(product, cup1);
      
	}
}

function setMixinQty(mixin, cups1) {
	mixin.perday = Math.floor(30/cups1);
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
	product.serving = row[colPrefix+'_serv'];
	product.cups28 = product.serving*7; // changed 28 to 7 to get cups for 7days
  	product.cups7 = product.serving*7;
  	product.cups1 = product.serving; // cups per day
	product.lbs28 = product.cups28*cupWeight;
  	product.lbs7 = product.cups7*cupWeight; // weight of cups for 7days
  	product.lbs7 = product.lbs7.toFixed(1); // rounded weight to 1decimal place
  	product.cpdlbs = product.cups1*cupWeight; // cpdlbs = cup per day weight
  	product.cpdlbs = product.cpdlbs;

	row = Extension.getByKey(hungry.kibble.bags, 'weight', Math.ceil(product.lbs28));
	product.bags4=row.bags4;
    product.bags12=row.bags12;
    product.bags24=row.bags24;
}


function addSupplementQty(product){
    var key = product.key;
    var weight = dog.weightValue;
    var jars;

    if (key=='hip_joint') {
        if (weight<=25) {
            jars=1;
        } else if(weight>=26 && weight<=70) {
            jars=2;
        } else if(weight>=71 && weight<=120) {
            jars=3;
        } else {
            jars=3;
        }

    } else if (key=='omega') {
        if (weight<=25) {
            jars=1;
        } else if(weight>=26 && weight<=70) {
            jars=2;
        } else if(weight>=71 && weight<=120) {
            jars=3;
        } else {
            jars=3;
        }

    } else if (key=='probiotic') {
        if (weight<=25) {
            jars=2;
        } else if(weight>=26 && weight<=70) {
            jars=3;
        } else if(weight>=71 && weight<=120) {
            jars=4;
        } else {
            jars=4;
        }

    } else if (key=='multivitamin') {
        if (weight<=25) {
            jars=1;
        } else if(weight>=26 && weight<=70) {
            jars=2;
        } else if(weight>=71 && weight<=120) {
            jars=3;
        } else {
            jars=3;
        }

    } else if (key=='calming') {
        if (weight<=25) {
            jars=2;
        } else if(weight>=26 && weight<=70) {
            jars=3;
        } else if(weight>=71 && weight<=120) {
            jars=4;
        } else {
            jars=4;
        }
    }

    product.jars = jars;
  	
}

function setSupplementsQty() {
	productsToRecommend.forEach(function(product) {
		if (product.type=='chews') {
			addSupplementQty(product);
		}
	});
}

function addSupplements(){
	setConcernProducts();
	setOldAgeRecommendation();
	setOverUnderRecommendations();
	setActivityRecommendations();
	setPickyRecommendations();
	setBreedRecommendationsForSupplements();
	setSupplementsQty();
}

function sendCartAttrs() {
  	var currentDog = Extension.getLocalStorageItem('currentDog') || 1;

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
    productsToRecommend.forEach(function(p){
      if (p.type=='kibble') {
        var dataP4 = getByKey(hungry.products, 'product', p.key+'_4');  
        
        if (p.bags4>0) {	        
          products.push(dataP4.id,p.bags4);
        }
        
        if (p.bags12>0) {	        
            var dataP12 = getByKey(hungry.products, 'product', p.key+'_12');
            products.push(dataP12.id,p.bags12);
        }

        if (p.bags24>0) {	        
            var dataP24 = getByKey(hungry.products, 'product', p.key+'_24');
            products.push(dataP24.id,p.bags24);
        }
      } else if (p.type=='mixin') {
        var dataP = getByKey(hungry.products, 'product', p.key);
        products.push(dataP.id,p.bags);
      } else if (p.type=='chews') {
        var dataP = getByKey(hungry.products, 'product', p.key);
        products.push(dataP.id,p.jars);
      }
    });
  
	dogAttributes[dogNotation+'_recs']=products.join(',');
  
    Extension.executeJS('pzSendCartAttrs', null, false, [dogAttributes]);

}


function setAnswers(){
    dog = {
      name: Extension.getFormResponse(101, slides, 11, history),
      gender: Extension.getFormResponse(124, slides, 8, history),
      weight: Extension.getFormResponse(112, slides, 4, history),
      weightValue: Extension.getFormResponse(112, slides, 1, history),
      activity: Extension.getFormResponse(112, slides, 5, history),
      picky: Extension.getFormResponse(113, slides, 1, history),
      pickyIngredients: Extension.getFormResponse(113, slides, 2, history),
      breeds: Extension.getFormResponse(124, slides, 9, history),
      mix: Extension.getFormResponse(124, slides, 13, history),
      allergies: Extension.getFormResponse(114, slides, 1, history),
      concerns: Extension.getFormResponse(114, slides, 3, history),
      grain: Extension.getFormResponse(114, slides, 5, history),
      month: Extension.getFormResponse(124, slides, 14, history),
      year: Extension.getFormResponse(124, slides, 15, history),
    };

    var currentDog = Extension.getLocalStorageItem('currentDog') || 1;
    if (currentDog==1) {
      owner = {
        dogsInHousehold: Extension.getFormResponse(101, slides, 12, history),
        firstName: Extension.getFormResponse(115, slides, 3, history),
        // gender: Extension.getFormResponse(100, slides, 4, history),
        // birthday: Extension.getFormResponse(115, slides, 1, history),
        email: Extension.getFormResponse(115, slides, 2, history)
      };
      Extension.setLocalStorageItem('owner',owner);
    } else {
      owner = Extension.getLocalStorageItem('owner');
    } 
  
  Extension.setSessionValue('answers', {dog:dog, owner:owner});
  window.hungry.answers = {dog:dog, owner:owner}
}

var HBRecommendations = {};
function setRecommendations(){
  var skus=[];
  
  var recommendations= {
    kibble:null,
    mixin:null,
    supplements:[]  
  };
  
  productsToRecommend.forEach(function(p){
    if (p.type=='kibble') {
      var dataP4 = getByKey(hungry.products, 'product', p.key+'_4');
      var dataP12 = getByKey(hungry.products, 'product', p.key+'_12');
      var dataP24 = getByKey(hungry.products, 'product', p.key+'_24');
      
      p.product4Id = dataP4.id;
      p.product12Id = dataP12.id;
      p.product24Id = dataP24.id;

      p.title = dataP4.title;
      recommendations.kibble=p;
      
      skus.push(dataP4.id);
      skus.push(dataP12.id);
      skus.push(dataP24.id);
    } else if (p.type=='mixin') {
      var dataP = getByKey(hungry.products, 'product', p.key);
      
      p.productId = dataP.id;
      p.title = dataP.title;
      recommendations.mixin=p;
      
      skus.push(dataP.id);
    } else if (p.type=='chews') {
      var dataP = getByKey(hungry.products, 'product', p.key);
      
      p.productId = dataP.id;
      p.title = dataP.title;
      recommendations.supplements.push(p);
      
      skus.push(dataP.id);
    }
  });
  
  results=[];
  skus.forEach(function(sku){
    Extension.addResult('sku', sku, model, results);
  });
  
  HBRecommendations = recommendations;
  console.log("recommendations",recommendations);
  Extension.setSessionValue('recommendations', recommendations);
}

function excludedNotAvailableProducts(){
  window.hungry.products.forEach(function(p){
    if (!p.available) addAsSet( [p.group], productsToExclude);
  });  
}

setAnswers();
console.log("dog",dog);
excludedNotAvailableProducts();
excludeAllergenicProducts();
excludePickyProducts();
excludeGrainProducts();
addKibble();
addMixins();
addSupplements();
sendCartAttrs();
setRecommendations();


console.log("productsToExclude",productsToExclude);
console.log("productsToRecommend",productsToRecommend);

var currentDog = Extension.getLocalStorageItem('currentDog') || 1;
var data = {dog:dog, owner:owner, recommendations: HBRecommendations, currentDog: currentDog};

window.pickzen.gorka = 'gorka';

window.pickzen.ctrl={
  data: data,
  reviews: JSON.parse(window.hungry.values.reviews),
  dogName: window.hungry.answers.dog.name,
  dogBreed: window.hungry.answers.dog.breeds,
  humanName: window.hungry.answers.owner.firstName,
  dogweight: window.hungry.answers.dog.weightValue,
  purMode: true,
  purFrequency = '3',
  subscribe = true,
  slideHandle = 'Subscribe & Save 20%',
  values: window.hungry.values,
  products: window.hungry.products,
  chewImages = {
    'omega':['https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Happy_Heart_1.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Happy_Heart_2.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Happy_Heart_3.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Happy_Heart_5.png'],
    'calming':['https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Chill_Chew_1.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Chill_Chew_2.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Chill_Chew_3.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Chill_Chew_5.png'],
    'multivitamin': ['https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Whole_Health_1.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Whole_Health_2.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Whole_Health_3.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Whole_Health_5.png'],
    'probiotic':['https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Balanced_Belly_1.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Balanced_Belly_2.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Balanced_Belly_3.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Balanced_Belly_5.png?v=1585809203'],
    'hip_joint':['https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Move_Groove_1.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Move_Groove_2.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Move_Groove_3.png','https://cdn.shopify.com/s/files/1/0080/0561/5687/files/Chew_Move_Groove_5.png']
  },

};