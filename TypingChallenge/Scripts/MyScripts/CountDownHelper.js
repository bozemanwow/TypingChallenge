var intival = 1000;
var counting = false;
var displayTextCharCount = 0;
var displayTextWordCount = 0;
var timeLength = 59;
var timerElem = document.getElementById("Timer");
var wordsTypedElem = document.getElementById("WordsTyped");
var displayText = document.getElementById("Panel1");
var userInput = document.getElementById("Panel2");
var WordsPercent = document.getElementById("WordsPercent");


document.onkeypress = keyDetection;

function keyDetection(event)
{
    if (!counting)
    {
        userInput.focus();
        Startcount();
    }
}

function Startcount() {
    
    if (!counting)
    {
        
        
        displayTextCharCount = displayText.innerText.length;
        displayTextWordCount = displayText.innerText.split(" ").length;
        counting = true;
       
        setUiPanel3(0, 0, 0);
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
    var secStr = secs < 10 ? "0" + secs.toString() : secs.toString();
    var minStr = min < 10 ? "0" + min.toString() : min.toString();
    var hoursStr = hours < 10 ? "0" + hours.toString() : hours.toString();

    return hoursStr + ":" + minStr + ":" + secStr;
}

function setCurrentTypedCount()
{
    counting = userInput.value.length <= displayTextCharCount;
    if (counting)
    {
        wordsTypedElem.innerText = userInput.value.split(" ").length + " Words Typed ";
        setTimeout('setCurrentTypedCount()', 1);
    }
    else

}

function setTestResults()
{

}