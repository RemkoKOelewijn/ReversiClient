const Game = (function(url){
    //Configuratie en state waarden
    let configMap = {
        apiUrl: url
    }

    // Private function init
    const privateInit = function(){
        console.log(configMap.apiUrl);
    }

    // Waarde/object geretourneerd aan de outer scope
    return {
        init: privateInit
    }

    })('/api/url')
    
    Game.Reversi = (function(){
        console.log('hallo, vanuit module Reversi')

        let configMap = {}

        privateInit = function(){
            console.log("dit is de private functie")
        }

        return {
            init: privateInit
        }      
    })() 

    Game.Data = (function(){
        console.log('hallo, vanuit module Data')

        let configMap = {}

        privateInit = function(){
            console.log("dit is de private functie")
        }

        return {
            init: privateInit
        }      
    })() 

    Game.Model = (function(){
        console.log('hallo, vanuit module Model')

        let configMap = {}

        privateInit = function(){
            console.log("dit is de private functie")
        }

        return {
            init: privateInit
        }      
    })() 


