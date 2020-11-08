const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];


function showLoader () {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoader () {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//Get Quotes from API
async function getQuote() {
    showLoader();
    const proxyUrl = 'https://safe-ocean-91696.herokuapp.com/'
    //const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        apiQuotes = await response.json();
        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

        if (quote.author === null) {
            authorText.textContent = 'Unknown';
        } else {
            authorText.textContent = quote.author;
        }
        //Check Quote length to determine Styling
        if (quote.text.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.textContent = quote.text;
        
    } catch (error){
        getQuote();
    }
    hideLoader();
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//EventListeners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click', tweetQuote);

hideLoader();