const quoteContainer = document.getElementById ('quote-container');
const quoteText = document.getElementById ('quote');
const authorText = document.getElementById ('author');
const newQuoteBtn = document.getElementById ('new-quote');
const twitterBtn = document.getElementById ('twitter');
const loader = document.getElementById('loader');

let apiQuotes = [];



function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
 }

 function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
 }

// show new quote
function newQuote() {
    showLoadingSpinner();
    //pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if Author field is blank
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else{
        authorText.textContent = quote.author;
    }
    

    //check quote length

if (quote.text.length > 50) {
    quoteText.classList.add('long-quote');
}else{
    quoteText.classList.remove('long-quote');
}
//set quote, hide loader 
quoteText.textContent = quote.text;
removeLoadingSpinner();
}

// Get Quotes from API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //Catch Error here
    }
}

//tweet quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}


//Event listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on Load

getQuotes();
