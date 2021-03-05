class FeedbackWidget{
    constructor(elementId) {
        this._elementId = elementId;
    }
    
    get elementId() { //getter, set keyword voor setter methode
        return this._elementId;
        }
    
    show(elementId, message, type){
        if(type == "succes"){
            $(elementId).removeClass("alert alert-danger")
            $(elementId).addClass("alert alert-success")
            $(elementId).text(message)
            $(elementId).attr('style', 'display:block')
        } else {
            $(elementId).removeClass("alert alert-succes")
            $(elementId).addClass("alert alert-danger")
            $(elementId).text(message)
            $(elementId).attr('style', 'display:block')
        }        
        
        this.log({
            message: message,
            type: type
        })
    }

    hide(elementId){
        $(elementId).attr("style", "display:none")
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
    widgetControl = new FeedbackWidget("control")

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
    


