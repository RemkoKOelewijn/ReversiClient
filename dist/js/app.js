"use strict";

var Game = function (url) {
  var configMap = {
    apiUrl: url
  };

  var privateInit = function privateInit() {
    console.log(configMap.apiUrl);
  }; // Waarde/object geretourneerd aan de outer scope


  return {
    init: privateInit
  };
}('/api/url');

Game.Reversi = function () {
  console.log('hallo, vanuit module Reversi');
  var configMap = {};

  privateInit = function privateInit() {
    console.log("dit is de private functie");
  };

  return {
    init: privateInit
  };
}();

Game.Data = function () {
  dataInit = function dataInit(environment) {
    stateMap.environment = environment;

    if (environment == 'development') {
      return getMockData();
    } else if (environment == 'production') {
      return _get('api/Spel/Beurt');
    } else {
      throw new Error("Environment " + environment + " is niet geldig!");
    }
  };

  var configMap = {
    mock: [{
      url: 'api/Spel/Beurt',
      data: 0
    }]
  };
  var stateMap = {
    environment: 'development'
  };

  var getMockData = function getMockData() {
    var mockData = configMap.mock;
    return new Promise(function (resolve, reject) {
      resolve(mockData);
    });
  };

  var _get = function _get(url) {
    return $.get(url).then(function (r) {
      return r;
    })["catch"](function (e) {
      console.log(e.message);
    });
  };

  return {
    init: dataInit,
    get: _get
  };
}();

Game.Model = function () {
  console.log('hallo, vanuit module Model');
  var configMap = {};
  var stateMap;

  privateInit = function privateInit() {
    _getCurrentGameState();

    console.log("dit is de private functie");
  };

  var _getGameState = function _getGameState() {
    //aanvraag via Game.Data
    //controle of ontvangen data valide is
    var gameState = Game.Data.get("/api/Spel/Beurt/<token>");

    if (gameState == 0 || gameState == 1 || gameState == 2) {
      return gameState;
    } else {
      throw new Error("Game state is niet goed ontvangen!");
    }
  };

  var _getCurrentGameState = function _getCurrentGameState() {
    console.log("oke");
    stateMap = setInterval(_getGameState, 2000);
  };

  return {
    init: privateInit,
    getGameState: _getGameState
  };
}();