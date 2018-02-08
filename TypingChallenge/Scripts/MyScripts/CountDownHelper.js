var intival = 1000;
var lessThanTen = 10;
var counting = false;
var displayTextCharCount = 0;
var displayTextWordCount = 0;
var timeLength = 59;
var timerElem = document.getElementById("Timer");
var wordsTypedElem = document.getElementById("WordsTyped");
var displayText = document.getElementById("Panel1");
var userInput = document.getElementById("Panel2");
var wordsPercent = document.getElementById("WordsPercent");


document.onkeypress = keyDetection;

function keyDetection(event)
{
    if (!counting)
    {
        displayTextCharCount = displayText.innerText.length;
        displayTextWordCount = displayText.innerText.split(" ").length;
        userInput.removeAttribute("disabled");
        userInput.focus();  
        setCurrentTypedCount();
        setUiPanel3(0, 0, 0);
        
    }
    else
    {
        userInput.focus();  
        setCurrentTypedCount();
    }
}

function setUiPanel3(secs,min,hours)
{
   
    if (counting)
    {
        timerElem.innerHTML = convertToTimerstring(secs, min, hours);
        secs++;
        if (secs > timeLength) {

            secs = 0;
            min++;
        }

        if (min > timeLength) {

            min = 0;
            hours++;
        }

        setTimeout('setUiPanel3(' + secs.toString() + ',' + min.toString() + ',' + hours.toString() + ')', intival);
    }
}

function convertToTimerstring(secs, min, hours)
{
    var secStr = secs < lessThanTen ? "0" + secs.toString() : secs.toString();
    var minStr = min < lessThanTen ? "0" + min.toString() : min.toString();
    var hoursStr = hours < lessThanTen ? "0" + hours.toString() : hours.toString();

    return hoursStr + ":" + minStr + ":" + secStr;
}

function setCurrentTypedCount()
{
    counting = userInput.value.length <= displayTextCharCount;
    wordsTypedElem.innerText = userInput.value.split(" ").length + " Words Typed ";
    if (!counting) {
        userInput.setAttribute("disabled", "disabled");
    }
}

function setTestResults()
{

}

function resetTest()
{
    counting = false;
    userInput.value = "";
    timerElem.innerHTML = "Start typing sample";
}