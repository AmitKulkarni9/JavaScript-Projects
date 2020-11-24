const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textbox = document.getElementById('text-box');
const darkImage1 = 'img/undraw_proud_coder_dark.svg';
const lightImage1 = 'img/undraw_proud_coder_light.svg';
const darkImage2 = 'img/undraw_feeling_proud_dark.svg';
const lightImage2 = 'img/undraw_feeling_proud_light.svg';
const darkImage3 = 'img/undraw_conceptual_idea_dark.svg';
const lightImage3 = 'img/undraw_conceptual_idea_light.svg';


//Dark-Light Mode Styling
function darkLightMode(currentTheme) {
    nav.style.backgroundColor = (currentTheme === 'dark') ? 'rgb(0 0 0 /50%)' : 'rgb(255 255 255 /50%)';
    textbox.style.backgroundColor = (currentTheme === 'dark') ? 'rgb(255 255 255 /50%)' : 'rgb(0 0 0 /50%)';
    toggleIcon.children[0].textContent = (currentTheme === 'dark') ? 'Dark Mode' : 'Light Mode';
    image1.src = (currentTheme === 'dark') ? darkImage1 : lightImage1;
    image2.src = (currentTheme === 'dark') ? darkImage2 : lightImage2;
    image3.src = (currentTheme === 'dark') ? darkImage3 : lightImage3;
    (currentTheme === 'dark') ? toggleIcon.children[1].classList.replace('fa-sun','fa-moon') : toggleIcon.children[1].classList.replace('fa-moon','fa-sun');
}

//Switch Theme Dynamically
function switchTheme (event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme','dark');
        let currentTheme = localStorage.getItem('theme');
        darkLightMode(currentTheme);
    } else {
        document.documentElement.setAttribute('data-theme','light');
        localStorage.setItem('theme','light');
        let currentTheme = localStorage.getItem('theme');
        darkLightMode(currentTheme);
    }
}

//Event Listener
toggleSwitch.addEventListener('change',switchTheme);

//Check local Storage for Theme
let currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark'){
    document.documentElement.setAttribute('data-theme','dark');
    toggleSwitch.checked = true;
    darkLightMode(currentTheme);
}else {
    document.documentElement.setAttribute('data-theme','light');
    toggleSwitch.checked = false;
    darkLightMode(currentTheme);
}
