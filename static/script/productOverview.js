let colorRadio = document.querySelectorAll('.color-choice');
let sizeRadio = document.querySelectorAll('.size-choice');

//colorRadio 
colorRadio.forEach((radio, i) => {
    radio.addEventListener('click', () => {
        for (let i = 0; i < colorRadio.length; i++) {
            colorRadio[i].classList.remove('ring');
            colorRadio[i].classList.remove('ring-offset-1');
        }
        radio.classList.add('ring');
        radio.classList.add('ring-offset-1');
    });
});
//sizeRadio
sizeRadio.forEach((radio) => {

    radio.addEventListener('click', () => {
        for (let i = 0; i < sizeRadio.length; i++) {
            sizeRadio[i].classList.remove('ring-2');
            sizeRadio[i].classList.remove('ring-indigo-500');
        }
        radio.classList.add('ring-2');
        radio.classList.add('ring-indigo-500');

    });
});

