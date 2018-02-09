// Magic Variables
var intival = 1000;
var lessThanTen = 10;
var testingInput = false;
var wrappingup = false;
var timeLength = 59;


var displayTextCharCount = 0;
var displayTextWordCount = 0;


// Elements
var timerElem = document.getElementById("Timer");
var wordsTypedElem = document.getElementById("WordsTyped");
var displayText = document.getElementById("Panel1");
var userInput = document.getElementById("Panel2");
var wordsPercent = document.getElementById("WPM");
var debug = document.getElementById("Debug");

document.onkeypress = keyDetection;

function keyDetection(event)
{
    if (!wrappingup) {
        if (!testingInput) {
            testingInput = true;
            displayTextCharCount = displayText.innerText.length;
            displayTextWordCount = displayText.innerText.split(" ").length;
            userInput.removeAttribute("disabled");
            userInput.focus();
            setCurrentTypedCount();
            setUiPanel3(0, 0, 0);

        }
        else {
            userInput.focus();
            setCurrentTypedCount();
        }
    }
}

function setUiPanel3(secs,min,hours)
{
   
    if (testingInput) {
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
    else
    {
        wrappingup = true;
        setTimeout('setTestResults(' + secs.toString() + ',' + min.toString() + ',' + hours.toString() + ')', 10);
    }
        
  
}

function convertToTimerstring(secs, min, hours)
{
    var secStr = secs < lessThanTen ? "0" + secs.toString() : secs.toString();
    var minStr = min < lessThanTen ? "0" + min.toString() : min.toString();
    var hoursStr = hours < lessThanTen ? "0" + hours.toString() : hours.toString();

    return "Time:"+hoursStr + ":" + minStr + ":" + secStr;
}

function setCurrentTypedCount()
{
    testingInput = userInput.value.length < displayTextCharCount - 1;
    wordsTypedElem.innerText = userInput.value.split(" ").length + " Words Typed ";
   
    if (!testingInput)
    {
        setTimeout("disableInput()", 1);
          
    }
 
}
function disableInput()
{
    userInput.setAttribute("disabled", "disabled");     
}
function setTestResults(secs, min, hours)
{
    var totalTimemins = (secs + min * 60 + hours * 60 * 60) / 60;
    var errorOffset = findErrors();
    debug.innerHTML = totalTimemins.toString() + " " + userInput.value.split(" ").length.toString();
    wordsPercent.innerText = (Math.floor(userInput.value.split(" ").length / totalTimemins)).toString() + " WPM ";
    
}
function findErrors()
{
    return -1;
}
function resetTest()
{
    testingInput = false;
    wrappingup = false;
    userInput.value = "";
    timerElem.innerHTML = "Start typing sample";
    wordsTypedElem.innerText = debug.innerHTML = wordsPercent.innerText = "";
}