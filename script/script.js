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