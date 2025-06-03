
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



const langButtons = document.querySelectorAll("[data-language]");
const textsToChange = document.querySelectorAll("[data-section]");
let typedInstance = null;

function loadLanguage(lang) {
  fetch(`../languages/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      // Textos simples
        textsToChange.forEach((el) => {
        const section = el.dataset.section;
        const value = el.dataset.value;

        if (data[section] && typeof data[section][value] === 'string') {
            // Detectar si es la línea del título con el span
            if (section === "home" && value === "descriptionTitle") {
            el.innerHTML = `${data[section][value]} <span class="multiple-text"></span>`;
            } else {
            el.innerHTML = data[section][value];
            }
        }
        });

      // Renderizar sección Educación
      if (data.education && Array.isArray(data.education.items)) {
        const educationList = document.getElementById('education-list');
        educationList.innerHTML = ''; // Limpiar antes

        data.education.items.forEach(item => {
          const itemHTML = `
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-date">${item.date}</div>
              <div class="timeline-content">
                <h3>${item.institution}</h3>
                ${item.details ? `<h4>${item.details}</h4>` : ''}
                <p>${item.career}</p>
              </div>
            </div>
          `;
          educationList.innerHTML += itemHTML;
        });
      }

      // 🔄 Typed.js (sección dinámica)
      if (data.home.typedStrings && Array.isArray(data.home.typedStrings)) {
        if (typedInstance) {
          typedInstance.destroy();
        }
        typedInstance = new Typed(".multiple-text", {
          strings: data.home.typedStrings,
          typeSpeed: 100,
          backSpeed: 100,
          backDelay: 1000,
          loop: true
        });
      }
    })
    .catch(err => console.error("Error cargando el idioma:", err));
}

// Cambiar idioma al hacer clic
langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    loadLanguage(button.dataset.language);
  });
});

// Cargar español por defecto
document.addEventListener("DOMContentLoaded", () => {
  loadLanguage("es");
});
