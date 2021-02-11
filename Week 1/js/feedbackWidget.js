class FeedbackWidget{
    constructor(elementId) {
        this._elementId = elementId;
    }
    
    get elementId() { //getter, set keyword voor setter methode
        return this._elementId;
        }
    
    show(elementId, message, type){
        var x = document.getElementById(elementId);
        x.style.display == "block"          
    }

    hide(elementId){
        var x = document.getElementById(elementId);
        x.style.display = "none"
    }

    log(message){
        let feedbackWidgetArray = JSON.parse(localStorage.getItem("feedback-widget")) || [];
        feedbackWidgetArray.push(JSON.stringify(message))

        if(feedbackWidgetArray.length > 10) {
            feedbackWidgetArray.shift();
        }

        localStorage.setItem("feedback-widget", JSON.stringify(feedbackWidgetArray));
    }

    removeLog(){
        localStorage.removeItem("feedback-widget");
    }

    history(){
        let feedbackWidgetArray = JSON.parse(localStorage.getItem("feedback-widget")) || [];

        let stringMessage = "";
        $(feedbackWidgetArray).each(function(index, value){
            stringMessage += "type " + JSON.parse(value).type + " - " + JSON.parse(value).message + "</n>\n";
        });

        this.show(stringMessage);
    }
}

$( document ).ready(function() {
    console.log( "ready!" );

    widget = new FeedbackWidget("widget")
    $("#click").on("click", function(){
        console.log("KLIK!")
        widget.show("feedback-danger")
        console.log("HUH")
    })
    });
    


