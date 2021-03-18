class FeedbackWidget{
    constructor(elementId) {
        this._elementId = elementId;
    }
    
    get elementId() { //getter, set keyword voor setter methode
        return this._elementId;
        }
    
    show(elementId, message, type){
        if(type == "succes"){
            $(elementId).removeClass("feedback-danger")
            $(elementId).addClass("feedback-succes")
        } else {
            $(elementId).removeClass("feedback-succes")
            $(elementId).addClass("feedback-danger")
        }       
        
        $(elementId).attr('style', 'display:block')
        $(elementId).text(message)
        $(elementId).append("<button class=\"feedback-button\"> Akkoord </button>")
        $(elementId).css('opacity', 1);
        
        this.log({
            message: message,
            type: type
        })
    }

    hide(elementId){
        $(elementId).css('opacity', 0);
    }

    log(message){
        let feedbackLogArray = JSON.parse(localStorage.getItem("feedback-widget")) || [];
        
        if(feedbackLogArray.length == 10){
            feedbackLogArray.shift()
        }
        feedbackLogArray.push(message)
        localStorage.setItem("feedback-widget", JSON.stringify(feedbackLogArray))
    }

    removeLog(){
        localStorage.removeItem("feedback-widget");
    }

    history(){
        let feedbackWidgetArray = JSON.parse(localStorage.getItem("feedback-widget")) || [];

        $(feedbackWidgetArray).each(function(index, value){
            document.getElementById("history").innerHTML += "type " + value.type + " - " + value.message + "<br>"
        });
    }
}

$( document ).ready(function() {
    var widgetControl = new FeedbackWidget("control")

    $("#showSucces").on("click", function(){
        console.log("showSucces")
        widgetControl.show("#feedback", "succes getoond", "succes")
    })

    $("#showDanger").on("click", function(){
        console.log("showDanger")
        widgetControl.show("#feedback", "danger getoond", "danger")
    })

    $("#changeSuccesText").on("click", function(){
        console.log("changeSuccesText")
        widgetControl.show("#feedback", "Tekst veranderd", "succes")
    })

    $("#hideWidget").on("click", function(){
        console.log("hideWidget")
        widgetControl.hide("#feedback")
    })
    });
    


