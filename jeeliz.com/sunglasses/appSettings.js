var APPSETTINGS = {
  //google analytics:
  googleAnalyticsID: 'UA-78159065-1',
  googleAnalyticsDebug: false, // boolean, if debug mode for GA

  // APPURL:
  appProdUrl: 'https://localhost:8082/src/index.html',

  // services:
  doodleServiceURL: 'https://poll.jeeliz.com',
  glassesDBServiceURL: 'https://glassesdb.jeeliz.com',
  staticServiceURL: 'https://appstatic.jeeliz.com/jeefit',
  fallbackServiceURL: 'https://fallbackglassesdb.jeeliz.com',
  indexDBstoreName: 'jeelizState-store2',
  // local
  // productDataServiceURL: 'http://localhost:8084',

  isRandomModelOrder: true, // randomize the order of the models

  officialWebsiteLinks: {
    /*'5953beb00ec85313791c9aa8': {
      url: 'https://www.ray-ban.com/usa/sunglasses/aviator/plp',
      brand: 'Ray-Ban'
    }, // aviator
    '595cbd395b8f453699cf0276': {
      url: 'https://www.ray-ban.com/usa/sunglasses/wayfarer/plp',
      brand: 'Ray-Ban'
    }, // original wayfarer
    '595cbd525b8f453699cf0277': {
      url: 'https://www.ray-ban.com/usa/sunglasses/round/plp',
      brand: 'Ray-Ban'
    }, // round
    '595cbd5e5b8f453699cf0278': {
      url: 'https://www.ray-ban.com/usa/sunglasses/clubmaster/plp',
      brand: 'Ray-Ban'
    }, // clubround
    '595cbd655b8f453699cf0279': {
      url: 'https://www.ray-ban.com/usa/sunglasses/clubmaster/plp',
      brand: 'Ray-Ban'
    }, // clubmaster
    '595cbd735b8f453699cf027a': {
      url: 'https://www.ray-ban.com/usa/sunglasses/justin/plp',
      brand: 'Ray-Ban'
    }, // justin
    '595cbd855b8f453699cf027b': {
      url: 'https://www.ray-ban.com/usa/sunglasses/erika/plp',
      brand: 'Ray-Ban'
    }, // erika
    '595cbd8c5b8f453699cf027c': {
      url: 'https://www.ray-ban.com/usa/sunglasses/round-style/plp',
      brand: 'Ray-Ban'
    }, // caravan
    '595cbd925b8f453699cf027d': {
      url: 'https://www.ray-ban.com/usa/sunglasses/pilot/plp',
      brand: 'Ray-Ban'
    }, // cockpit
    '595cbd9d5b8f453699cf027e': {
      url: 'https://www.ray-ban.com/usa/sunglasses/round-style/plp',
      brand: 'Ray-Ban'
    }, // round double bridge
    '595cbda65b8f453699cf027f': {
      url: 'https://www.ray-ban.com/usa/sunglasses/rectangle/tech/plp',
      brand: 'Ray-Ban'
    }, // andy
    '595cbdad5b8f453699cf0280': {
      url: 'https://www.ray-ban.com/usa/sunglasses/men-s/square/plp',
      brand: 'Ray-Ban'
    }, // chris
    '595cbde65b8f453699cf0281': {
      url: 'https://www.ray-ban.com/usa/sunglasses/highstreet/plp',
      brand: 'Ray-Ban'
    }, // boyfriend
    '595cbdfc5b8f453699cf0282': {
      url: 'https://www.ray-ban.com/usa/sunglasses/rectangle/plp',
      brand: 'Ray-Ban'
    }, // predator
    '595cc64b5b8f453699cf0283': {
      url: 'https://www.ray-ban.com/usa/sunglasses/new-wayfarer/plp',
      brand: 'Ray-Ban'
    }, // new wayfarer
    '5979a8fc5ba9dd1b0c01d230': {
      url: 'https://www.ray-ban.com/SearchDisplay?storeId=10151&catalogId=22552&langId=-1&pageSize=9&beginIndex=0&searchSource=Q&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&searchType=1000&viewMode=Rayban&newpage=true&clientSide=true&searchTerm=ferrari',
      brand: 'Ray-Ban'
    }, // ferrari

    '5979e7943d20d717d895fefe': {
      url: 'http://www.carreraworld.com/fr/fr/sunglasses/car/2016/CARRERA-113-S.24047700357HD.html',
      brand: 'Carrera'
    }, // 113s
    '5979e79f3d20d717d895feff': {
      url: 'http://www.carreraworld.com/fr/fr/sunglasses/car/2016/CARRERA-114-S.2404780035570.html',
      brand: 'Carrera'
    }, // 114s
    '5979e7a93d20d717d895ff00': {
      url: 'http://www.carreraworld.com/fr/fr/sunglasses/car/2016/CARRERA-116-S.2404800035170.html',
      brand: 'Carrera'
    }, // 116s
    '5979e7bc3d20d717d895ff01': {
      url: 'http://www.carreraworld.com/fr/fr/sunglasses/car/2016/CARRERA-119-S.233426GTN55P9.html',
      brand: 'Carrera'
    }, // 119s
    '5979e7cb3d20d717d895ff02': {
      url: 'http://www.carreraworld.com/fr/fr/sunglasses/car/2013/CARRERA-5003.240364DDL58JJ.html',
      brand: 'Carrera'
    }, // 5003
    '5979e7d33d20d717d895ff03': {
      url: 'http://www.carreraworld.com/fr/fr/sunglasses/car/2016/CARRERA-5029NS.240457D2849D5.html',
      brand: 'Carrera'
    }, // 5029
    '5979e7da3d20d717d895ff04': {
      url: 'http://www.carreraworld.com/fr/fr/sunglasses/car/2013/CARRERA-6008.24626910050DJ.html',
      brand: 'Carrera'
    }, // 6008
    '597b5c19c082945a10c2c36d': {
      url: 'http://www.carreraworld.com/fr/fr/sunglasses/car/2016/CARRERA-118-S.233425GTN57P9.html',
      brand: 'Carrera'
    }, // 118s

    '5979e7ef3d20d717d895ff05': {
      url: 'http://fr.oakley.com/fr/mens/sunglasses/lifestyle-sunglasses/frogskins-lite/category/m02030065',
      brand: 'Oakley'
    }, // frogskins
    '5979e7f33d20d717d895ff06': {
      url: 'http://fr.oakley.com/fr/mens/sunglasses/sport-sunglasses/flak-jacket-reg-/category/m0203014',
      brand: 'Oakley'
    }, // flak
    '5979e7f83d20d717d895ff07': {
      url: 'http://fr.oakley.com/fr/mens/sunglasses/lifestyle-sunglasses/latch-trade-/category/m02040001',
      brand: 'Oakley'
    }, // latch
    '5979e8023d20d717d895ff08': {
      url: 'http://fr.oakley.com/fr/search?text=catalyst',
      brand: 'Oakley'
    }, // catalyst
    '5979e80c3d20d717d895ff09': {
      url: 'http://fr.oakley.com/fr/mens/sunglasses/lifestyle-sunglasses/holbrook-trade-/category/m0204003',
      brand: 'Oakley'
    }, // holbrook
    '598c7d78cd4e93687747db40': {
      url: 'http://fr.oakley.com/fr/mens/sunglasses/sport-sunglasses/radar-ev-trade-/category/m0203012',
      brand: 'Oakley'
    }, // radar path
    '598c7d80cd4e93687747db41': {
      url: 'http://fr.oakley.com/fr/mens/sunglasses/sport-sunglasses/jawbreaker-trade-/category/m0203013',
      brand: 'Oakley'
    }, // jawbreaker
    '598c7d8fcd4e93687747db42': {
      url: 'http://fr.oakley.com/fr/mens/sunglasses/sport-sunglasses/m2-frame-trade-/category/m020305',
      brand: 'Oakley'
    }, // M2 00

    '59a695c5645e5a6d9aa94728': {
      url: 'https://www.persol.com/usa/icons-collection-649-series',
      brand: 'Persol'
    }, // 649
    '59a695d2645e5a6d9aa94729': {
      url: 'https://www.persol.com/netherlands/icons-collection-cellor-series/',
      brand: 'Persol'
    }, // cellor
    '59a695d9645e5a6d9aa9472a': {
      url: 'https://www.persol.com/netherlands/icons-collection-714-series/',
      brand: 'Persol'
    }, // 714

    '59b2b463553d246a2c652639': {
      url: 'http://polaroideyewear.com/en/sunglasses/pld/2014/PLD-1013-S.html',
      brand: 'Polaroid'
    }, // 1013
    '59b2b46c553d246a2c65263a': {
      url: 'http://polaroideyewear.com/en/sunglasses/pld/2014/PLD-4005-S.html',
      brand: 'Polaroid'
    }, // 2014
    '59b2b470553d246a2c65263b': {
      url: 'http://polaroideyewear.com/en/sunglasses/pld/2015/PLD-4023-S.html',
      brand: 'Polaroid'
    }, // 4023
    '59b2b475553d246a2c65263c': {
      url: 'http://polaroideyewear.com/en/sunglasses/pld/2015/PLD-6003-N-S.html',
      brand: 'Polaroid'
    }, // 6003
    '59b2b482553d246a2c65263d': {
      url: 'http://polaroideyewear.com/en/sunglasses/pld/2015/PLD-6009-S-M.html',
      brand: 'Polaroid'
    }, // 6009
    '59b2b48a553d246a2c65263e': {
      url: 'http://polaroideyewear.com/en/sunglasses/pld/2016/PLD-6016-S.html',
      brand: 'Polaroid'
    }, // 2016
    '59b2b48f553d246a2c65263f': {
      url: 'http://polaroideyewear.com/en/sunglasses/pls/2016/PLD-7009-S.blue-green-2337120rnbc3.html',
      brand: 'Polaroid'
    }
    */
  },

  recaptchaKey: "6LdBoiEUAAAAAMYPK4O6iNAZts-6D8L1M0L1ooCd",
  mailServiceURL: 'https://mail.jeeliz.com/sendEmail.php',

  //capture image :
  nDetectPassBeforeTakePicture: 4, // number of detection passes before saving the picture
  savedImageWidthPx: 640,// width of the user screenshot stored in the app state

  maxModelsFetched: 25, //max number of fetched models at the same time = number of models per page in jeecarouzel

  mobileEnableCarouzelByDefault: true, 

  defaultLanguage: 'en', //should be in i18nTranslations.js

  //LOCALE VALUE BY DEFAULT :
  currencyBeforePrice: true, // default locale value - can be overwritten
  currencySeparator: ',',
  currency: '$', // or '$'
  productDataLocale: 'US', // FR or US
  priceRange: [0,500], 

  locales: { //do not depends from language, only location
    fr: {
      currencyBeforePrice: false,
      currencySeparator: '.',
      currency: '€', // or '$'
      productDataLocale: 'FR',
      priceRange: [0,500] 
    },

    us: {
      currencyBeforePrice: true,
      currencySeparator: ',',
      currency: '$', // or '$'
      productDataLocale: 'US',
      priceRange: [0, 500]
    }
  },

  maxNumberPictures: 9,
  isCropPicturesSquare: true, // apply only if picture is landscape

  isShowWelcomePage: true, // display the WelcomePage component
  isShowSettingsFilter: false,

  isStampSlideImage: true,
  stampMinDisplacement: 0.1, // between 0 and 1. 0-> always stamp, 1-> stamp only if like/dislike on release
  stampLike: 'images/sticker_like.png',
  stampDislike: 'images/sticker_nope.png',
  stampLikeRelativeWidth: 0.4, // 1->100% of the width of the canvas
  stampDislikeRelativeWidth: 0.4,
  stampLikeTopOffset: 20, // in pixels, from the tom
  stampLikeSideOffset: 20, // in pixels, from the left
  stampDislikeTopOffset: 20,
  stampDislikeSideOffset: 20, // in pixels, from the right
  stampLikeRotation: -20, // in degrees
  stampDislikeRotation: 20,


  isFallbackReadExif: true, // read EXIT metadata on uploaded image to extract orientation
  isCanToggleToFallback: false, // toggled false on 2020-02-03 since fallbackGlassesDB webservice has been undeployed
  hideHintTimeout: 7000, // in ms
  displayReviews: false,

  toggleNextOnLike: true,
  toggleNextOnDislike: true,
  displayFilterOption: true,

  toggleNextTimeout: 800, // in milliseconds, minimum delay between model changes

  initialModelSelectedIndex: 0, // not 0 to avoid white space in the beginning of JeeCarouzel

  // debug options
  debugSKU: false,// 'rayban_aviator_noir_vert'
  debugLocale: false,// 'us', // to force the value for the locale (not language, localisation)
  debugLanguage: false, // false , // to force a value for the language
  disableServiceWorkersHosts: ['localhost', '127.0.0.1'],

  // timeout for our warning in Gallery
  timeoutWarning: 5000,
};

// DEBUG ZONE - ALL SHOULD BE DISABLED IN PROD
// APPSETTINGS.debugLocale='us'
// APPSETTINGS.disableServiceWorkersHosts=[]
// APPSETTINGS.doodleServiceURL='http://localhost:3051'
// APPSETTINGS.glassesDBServiceURL='http://127.0.0.1:8085'

if (typeof(module) !== 'undefined') { // when required in react
  module.exports = APPSETTINGS
}
