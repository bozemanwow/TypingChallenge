/* Bozeman Todd Code*/
// Magic Variables
var clockIntival = 1000;
var lessThanTen = 10;
var timeLength = 59;
var inputOffset = 1;
var timeScale = 60;
// When true test is running
var testingInput = false;
// When true test is not running but updating ui
var wrappingup = false;

var displayTextCharCount = 0;
var displayTextWordCount = 0;


// Elements
var timerElem = document.getElementById("Timer");
var wordsTypedElem = document.getElementById("WordsTyped");
var errorElem = document.getElementById("Error");
var displayText = document.getElementById("Panel1");
var userInput = document.getElementById("Panel2");;
var inputDisplay = document.getElementById("Display");
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
            // starts async clock
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

        setTimeout('setUiPanel3(' + secs.toString() + ',' + min.toString() + ',' + hours.toString() + ')', clockIntival);
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
    testingInput = userInput.value.length < displayTextCharCount - inputOffset;
    wordsTypedElem.innerText = userInput.value.split(" ").length + " Words Typed ";
   
    if (!testingInput)
    {
        wrappingup = true;
        setTimeout("disableInput()", 1);          
    } 
}

// Replaces div with textarea
function enableInput()
{
    setUsetInputDisplay("textarea");
    userInput.focus();
}

//stops input
function disableInput()
{   
    userInput.setAttribute("disabled", "disabled");     
}

function setUsetInputDisplay(type)
{
    if (userInput != null)
        inputDisplay.removeChild(userInput);

    userInput = document.createElement(type);
    userInput.setAttribute("class", "col-md-1 jumbotron");
    userInput.setAttribute("id", "Panel2");
    inputDisplay.appendChild(userInput);
}

// Calculates Words per minute and error rating then displays them
function setTestResults(secs, min, hours)
{    
    var totalTimemins = (secs + min * timeScale + hours * timeScale * timeScale) / timeScale;
    wordsPercent.innerText = (Math.floor(userInput.value.split(" ").length / totalTimemins)).toString() + " WPM";    

    var errorRating = displayErrorsAndGetRating(totalTimemins);   
    errorElem.innerHTML = " With " + Math.floor(errorRating) + "% Errors ";
}

// Finds Errors and returns a percentage of Error- shows place of errors
// Replaces Text area with div
function displayErrorsAndGetRating(totalTimemins)
{
    var length = userInput.value.split(" ").length;     
    var Error = 0;
    
    var userInputArray = userInput.value.split(" ");
    var displayTextArray = displayText.innerHTML.split(" ");

    setUsetInputDisplay("div");

    for (var i = 0; i < length; i++)
    {

        if (userInputArray[i] !== displayTextArray[i])
        {         
          var errorEle = document.createElement("error");
          errorEle.setAttribute("class", "InError");
          errorEle.innerHTML = " " + userInputArray[i];
          userInput.appendChild(errorEle);
          Error++;
        }
        else
        {
           var corecEle = document.createElement("correct");           
           corecEle.innerHTML = " " + userInputArray[i];
           userInput.appendChild(corecEle);
        }
               
    }
    
    var toPercentage = 100;
    return Error / length * toPercentage;
}

// Clean up UI for reuse;
function resetTest()
{
    setUsetInputDisplay("temp");
    testingInput = false;
    wrappingup = false;
    userInput.value = "";   
    wordsTypedElem.innerText = "";
    debug.innerHTML = "";
    wordsPercent.innerText = "";
    errorElem.innerHTML = "";
    timerElem.innerHTML = "Start typing sample text to begin test";
    
}

