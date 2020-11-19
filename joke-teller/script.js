const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Jokes URL
const jokeAPIUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
let joke = '';

//Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '75e07daf70a04c50ba96a6e32b640371',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get Jokes from Joke API
async function getJokes() {
    try {
        const response = await fetch(jokeAPIUrl);
        jokeData = await response.json();
        if (jokeData.type === 'twopart') {
            joke = `${jokeData.setup}...${jokeData.delivery}`;
        }else {
            joke = jokeData.joke;
        }
        tellMe(joke);
    } catch (error) {
        console.log(error);
    }
}

//Enable Button after Audio finished
function enableButton () {
    button.disabled = false;
}

button.addEventListener('click', async () => {
    button.disabled = true;
    await getJokes();
});
audioElement.addEventListener('ended',enableButton);