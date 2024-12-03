const background = document.querySelector('.background');

background.addEventListener('click', () => {
   background.classList.add('remove');
});

const lamp = document.querySelector('.lamp__image');
const light = document.querySelector('.light');
const figures = document.querySelector('.objects__figures');

lamp.addEventListener('mousedown', () => {
   lamp.classList.add('mousedown');
});

lamp.addEventListener('mouseup', () => {
   lamp.classList.remove('mousedown');
});

lamp.addEventListener('click', () => {
   light.classList.toggle('on');
   figures.classList.toggle('display');
});

const rabbit = document.querySelector('.objects__rabbit');
const bird = document.querySelector('.objects__bird');
const rabbitClickable = document.querySelector('.rabbit__clickable');
const birdClickable = document.querySelector('.bird__clickable');

rabbitClickable.addEventListener('click', () => {
    rabbitClickable.classList.add("hide");
    birdClickable.classList.remove("hide");

    rabbit.classList.add('hide');
    bird.classList.remove('hide');
});

birdClickable.addEventListener('click', () => {
    rabbitClickable.classList.remove("hide");
    birdClickable.classList.add("hide");

    bird.classList.add('hide');
    rabbit.classList.remove('hide');
});





