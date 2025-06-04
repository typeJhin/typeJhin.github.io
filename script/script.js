
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
        const softSkillsMap = {
          0: "teamwork",
          1: "projectManagement",
          2: "creativity",
          3: "communication",
        };

        Object.keys(softSkillsMap).forEach((index) => {
          const element = document.querySelectorAll(".skill-right .box .text small")[index];
          const key = softSkillsMap[index];
          if (element && data.skills.softSkills[key]) {
            element.textContent = data.skills.softSkills[key];
          }
        });

        // Portfolio
        const portfolioBoxes = document.querySelectorAll(".portfolio-box");
        if (data.portfolio.projects && data.portfolio.projects.length === portfolioBoxes.length) {
          portfolioBoxes.forEach((box, i) => {
            const title = box.querySelector("h4");
            const desc = box.querySelector("p");
            title.textContent = data.portfolio.projects[i].title;
            desc.textContent = data.portfolio.projects[i].description;
          });
        }

        // Título del portfolio (puede tener HTML como <span>)
        const portfolioTitle = document.querySelector("#portfolio .heading");
        if (portfolioTitle && data.portfolio.title) {
          portfolioTitle.innerHTML = data.portfolio.title;
        }

        // Contacto - placeholders
        const formInputs = document.querySelectorAll("form [data-section='form']");
        formInputs.forEach((input) => {
          const value = input.dataset.value;
          const placeholderText = data.contact.form[value];
          if (placeholderText) {
            if (input.tagName.toLowerCase() === "input" || input.tagName.toLowerCase() === "textarea") {
              input.placeholder = placeholderText;
            } else {
              input.textContent = placeholderText;
            }
          }
        });
        const aboutParagraph = document.getElementById("about-paragraph");
        const readMoreBtn = document.getElementById("read-more-btn");

        if (
          aboutParagraph &&
          readMoreBtn &&
          data.about.paragraphShort &&
          data.about.paragraphLong &&
          data.about.readMore &&
          data.about.readLess
        ) {
          // Inicializamos el párrafo y botón
          aboutParagraph.innerText = data.about.paragraphShort;
          readMoreBtn.textContent = data.about.readMore;

          // Guardamos los textos en el botón como atributos
          readMoreBtn.dataset.short = data.about.paragraphShort;
          readMoreBtn.dataset.long = data.about.paragraphLong;
          readMoreBtn.dataset.more = data.about.readMore;
          readMoreBtn.dataset.less = data.about.readLess;
          readMoreBtn.dataset.expanded = "false"; // Estado inicial

          readMoreBtn.onclick = () => {
            const isExpanded = readMoreBtn.dataset.expanded === "true";

            if (isExpanded) {
              aboutParagraph.innerText = readMoreBtn.dataset.short;
              readMoreBtn.textContent = readMoreBtn.dataset.more;
              readMoreBtn.dataset.expanded = "false";
              aboutParagraph.classList.remove("expanded");
            } else {
              aboutParagraph.innerText = readMoreBtn.dataset.long;
              readMoreBtn.textContent = readMoreBtn.dataset.less;
              readMoreBtn.dataset.expanded = "true";
              aboutParagraph.classList.add("expanded");
            }
          };
        }
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
