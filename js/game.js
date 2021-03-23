//TODO Implement Long Polling

const Game = (function(url, speltoken){
    let configMap = {
        apiUrl: url,
        spelToken: speltoken
    }

    const _getApiUrl = function(){
        return configMap.apiUrl
    }

    const _getSpelToken = function(){
        return configMap.spelToken
    }

    // Waarde/object geretourneerd aan de outer scope
    return {
        getApiUrl: _getApiUrl,
        getSpelToken: _getSpelToken
    }

    })('https://localhost:44395/api/', "2c250846-cdda-4d3b-8745-0fea08574a74")
    
    Game.Reversi = ( function() {
        
        $.get(Game.getApiUrl() + "spel/" + Game.getSpelToken() + "/bord",
        function(data){
            for(var i = 0; i < data.length; i++){
                console.log(data[i])
                var _array = data[i]
                for(var j = 0; j < _array.length; j++){
                    var kleur = _array[j]
                    if(kleur != 0){
                        console.log("J = " + j + ", I = " + i)
                        console.log(kleur)
                        _placeFiche(i, j, color)
                    }
                }
            }
        })
            

        var color = "white"

        var _placeFiche = function(x, y, color){
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

        return {
            placeFiche: _placeFiche
        }      
    })() 

    Game.Data = (function(){
        var dataInit = function(environment){
            stateMap.environment = environment 
            if(environment == 'development'){
                return getMockData()
            } else if(environment == 'production'){
                return _get(configMap.apiUrl + 'Spel/Beurt')
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
                console.log(r)
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
            let gameState = Game.Data.get("https://localhost:44395/api/spel")
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


