//TODO Implement Long Polling

const Game = (function(url){
    let configMap = {
        apiUrl: url
    }

    const privateInit = function(){
        console.log(configMap.apiUrl);
    }

    // Waarde/object geretourneerd aan de outer scope
    return {
        init: privateInit
    }

    })('/api/url')
    
    Game.Reversi = (function(){
        console.log("JOOOOO")
        
        var color = "white"

        var _placeFiche = function(x, y){
            console.log(color)
            let square = $(`#square${x}_${y}`).find("span")

            let squareOccupied = square.hasClass("whitePiece") || square.hasClass("blackPiece")
            if (squareOccupied) return

            console.log(`${color} piece geplaatst op: ${x}, ${y}`)
            if(color === "white" && !square.hasClass("whitePiece")){
                color = "black"
                square.addClass("whitePiece")
            } else if (color === "black"){
                color = "white"
                square.addClass("blackPiece")
            }
        }

        console.log("bithc2");
        return {
            placeFiche: _placeFiche
        }      
        console.log("bithc");
    })() 

    Game.Data = (function(){
        var dataInit = function(environment){
            stateMap.environment = environment 
            if(environment == 'development'){
                return getMockData()
            } else if(environment == 'production'){
                return _get('api/Spel/Beurt')
            } else {
                throw new Error("Environment " + environment + " is niet geldig!")
            }        
        }

        const configMap = {
            mock: [
                {
                    url: 'api/Spel/Beurt',
                    data: 0
                }
                ]
        }
        
        let stateMap = {environment : 'development'}

        const getMockData = function(){
            const mockData = configMap.mock;
            
            return new Promise((resolve, reject) => {
                resolve(mockData);
            });
        }

        const _get = function(url){
                return $.get(url)
            .then(r => {
                return r
            }).catch(e => {
                console.log(e.message);
            });
        }
        
        return {
            init : dataInit,
            get : _get
        }
    })() 

    Game.Model = (function(){
        console.log('hallo, vanuit module Model')

        let configMap = {}

        let stateMap;

        var privateInit = function(){
            _getCurrentGameState();
            console.log("dit is de private functie")
        }

        const _getGameState = function(){
            //aanvraag via Game.Data
            //controle of ontvangen data valide is
            let gameState = Game.Data.get("/api/Spel/Beurt/<token>")
            if(gameState == 0 || gameState == 1 || gameState == 2){
                return gameState
            } else {
                throw new Error("Game state is niet goed ontvangen!")
            }
        }

        const _getCurrentGameState = function(){
            console.log("oke")
            stateMap = setInterval(_getGameState, 2000)
        }

        return {
            init: privateInit,
            getGameState : _getGameState
        }      
    })() 


