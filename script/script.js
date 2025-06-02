var typed = new Typed(".multiple-text", {
    strings: ["Developer", "Multimedia Editor"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true

})

// circle skill ////////////////////////////////////////////////////////////////////////////////////////

const circles = document.querySelectorAll('.circle');
circles.forEach(elem=>{
    var dots = elem.getAttribute('data-dots')
    var marked = elem.getAttribute('data-percent')
    var percent = Math.floor(dots*marked/100) 
    var points = "";
    var rotate = 360 / dots;


    for(let i = 0 ; i < dots ; i++){
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }

    elem.innerHTML= points;

    const pointsmarked = elem.querySelectorAll('.points')
    for(let i = 0; i<percent ; i++){
        pointsmarked[i].classList.add('marked')
    }
})
// TOGGLE ICON //

let menuIcon = document.querySelector('#menu-icon');
let navBar = document.querySelector('.nav-bar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navBar.classList.toggle('active');
}

// SCROLL SECTIONS//

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id')

        if(top >= offset && top <offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    // STICKY NAVBAR // 
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100)
};



const langButtons = document.querySelectorAll("[data-language]")
const textsToChange = document.querySelectorAll("[data-section]")

langButtons.forEach((button) =>{
    button.addEventListener("click", () => {
        fetch(`../languages/${button.dataset.language}.json`)
            .then (res => res.json())
            .then (data => {
                textsToChange.forEach((el) =>{
                    const section = el.dataset.section;
                    const value = el.dataset.value;

                    el.innerHTML = data[section][value];

                })
            })
    }) 
})