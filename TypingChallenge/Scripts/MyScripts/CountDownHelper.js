// Magic Variables
var intival = 1000;
var lessThanTen = 10;
var timeLength = 59;

// When true test is running
var testingInput = false;
// When true test is not running but updating ui
var wrappingup = false;

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
// AutoDetect Keys for instant test starting

function keyDetection(event)
{
    if (!wrappingup)
    {
        // Starts Test
        if (!testingInput)
        {
            testingInput = true;
            displayTextCharCount = displayText.innerText.length;
            displayTextWordCount = displayText.innerText.split(" ").length;
            enableInput();   
            
            setCurrentTypedCount();
            // runs async with test
            setUiPanel3(0, 0, 0);
        }
        // Checks to make sure is not over character limit
        else
        {
            userInput.focus();
            setCurrentTypedCount();
        }
    }
}
// Keep tracks of time sepratlly
function setUiPanel3(secs,min,hours)
{

    if (testingInput && !wrappingup)
    {
        timerElem.innerHTML = convertTimeIntoString(secs, min, hours);
        secs++;
        if (secs > timeLength)
        {
            secs = 0;
            min++;
        }

        if (min > timeLength)
        {
            min = 0;
            hours++;
        }

        setTimeout('setUiPanel3(' + secs.toString() + ',' + min.toString() + ',' + hours.toString() + ')', intival);
    }
    else
    {       
        setTimeout('setTestResults(' + secs.toString() + ',' + min.toString() + ',' + hours.toString() + ')', 10);
    }        
  
}

function convertTimeIntoString(secs, min, hours)
{
    var secStr = secs < lessThanTen ? "0" + secs.toString() : secs.toString();
    var minStr = min < lessThanTen ? "0" + min.toString() : min.toString();
    var hoursStr = hours < lessThanTen ? "0" + hours.toString() : hours.toString();

    return "Time:"+hoursStr + ":" + minStr + ":" + secStr;
}

// Checks current count and stops input once max characters is reached
function setCurrentTypedCount()
{
    testingInput = userInput.value.length < displayTextCharCount - 1;
    wordsTypedElem.innerText = userInput.value.split(" ").length + " Words Typed ";
   
    if (!testingInput)
    {
        wrappingup = true;
        setTimeout("disableInput()", 1);          
    } 
}

function enableInput()
{
    userInput.removeAttribute("disabled");
    userInput.focus();
}
function disableInput()
{
    userInput.setAttribute("disabled", "disabled");     
}

// Calculates Words per minute and error rating then displays them
function setTestResults(secs, min, hours)
{
    var totalTimemins = (secs + min * 60 + hours * 60 * 60) / 60;
    var errorRating = findErrorsAndRating(totalTimemins);

    wordsPercent.innerText = (Math.floor(userInput.value.split(" ").length / totalTimemins)).toString() + " WPM; with " + Math.floor(errorRating) + "% Errors ";    
}

// Finds Errors and returns a percentage of Error- shows place of errors
function findErrorsAndRating(totalTimemins)
{
    var length = userInput.value.split(" ").length;     
    var Error = 0;
    
    var userInputArray = userInput.value.split(" ");
    var displayTextArray = displayText.innerHTML.split(" ");
  
    for (var i = 0; i < length; i++)
    {

        if (userInputArray[i] !== displayTextArray[i])
        {         
          var errorEle = document.createElement("error");
          errorEle.setAttribute("class", "InError");
          errorEle.innerHTML = " " + userInputArray[i];
          debug.appendChild(errorEle);
          Error++;
        }
        else
        {
           var CorecEle = document.createElement("correct");
           
           CorecEle.innerHTML = " " + userInputArray[i];
           debug.appendChild(CorecEle);
        }
               
    }
    var toPercentage = 100;
    return Error / length * toPercentage;
}

// Clean up UI for reuse;
function resetTest()
{
    testingInput = false;
    wrappingup = false;
    userInput.value = "";   
    wordsTypedElem.innerText = "";
    debug.innerHTML = "";
    wordsPercent.innerText = "";
    timerElem.innerHTML = "Start typing sample";
}