const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let imagesLoaded = 0;
let ready = false;
let initialLoad = true;
const initialCount = 10;
const subsequentLoadCount = 30;
let picLoadCount = initialCount;

//UnSplash API
//const proxyUrl = 'https://safe-ocean-91696.herokuapp.com/';
const apiKey = `V62OpcYQMJvU2xMYebDd38865Lvkp7EjJbZPSFq8PI4`;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picLoadCount}`;


//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    //console.log(imagesLoaded);
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        imagesLoaded = 0;
    }
}
//Helper function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Create Elements for links & Photo Images, and ADD to DOM
function displayPhotos () {
    totalImages = photosArray.length;
    //run for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const anchorElement = document.createElement('a');
        setAttributes(anchorElement, {
            href: photo.links.html,
            target: '_blank'
        });
        //Create <img> for photo
        const imgElement = document.createElement('img');
        setAttributes(imgElement, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        //Event listener to Check when each image is finished loading
        imgElement.addEventListener('load', imageLoaded);
        
        //Put <img> inside <a>, then put both inside imag-container element
        anchorElement.appendChild(imgElement);
        imageContainer.appendChild(anchorElement);
    });
}
//Get photos from Unsplash API 
async function getPhotos () {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (initialLoad) {
            picLoadCount = subsequentLoadCount;
            apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picLoadCount}`;
            initialLoad = false;
        }
    } catch (error) {
        console.log(error);
    }
}


//Check scrolling at bottom ofpage to load more photos
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) && ready) {
        ready = false;
        getPhotos();
    }
});

//On Load
getPhotos();