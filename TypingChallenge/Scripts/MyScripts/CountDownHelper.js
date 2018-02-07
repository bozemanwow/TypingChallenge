var intival = 1000;
var counting = false;
var timerElem = document.getElementById("Timer");
var wordsTypedElem = document.getElementById("WordsTyped");
var userInput = document.getElementById("Panel2");
function Startcount(secs) {

    
    if (!counting)
    {
        counting = true;
       
        
        countDown(secs);
       
    }
    
}
function countDown(secs)
{
    var numOfwords = userInput.value.split(" ").length;
    timerElem.innerHTML = "Timer " + secs + "!" + numOfwords.toString();
        secs--;

        

        wordsTypedElem.innerHTML = numOfwords + "/" + 100;

        if (secs >= 0)
            var timer = setTimeout('countDown(' + secs + ')', intival);
        else {

            counting = false;

        }
}