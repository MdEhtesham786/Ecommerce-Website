let colorRadio = document.querySelectorAll('.color-choice');
let sizeRadio = document.querySelectorAll('.size-choice');
let totalrating = document.getElementById('totalRating');
let moreReviews = document.querySelector('.moreReviews');
let reviewBox = document.getElementById('reviewBox');
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
// Read more Logic
let readMore = document.querySelectorAll('.readMore');
let articles = document.querySelectorAll('article');
articles.forEach((article, i) => {
    if (article.scrollHeight > article.clientHeight) {
        // article.classList.add('')
        readMore[i].classList.remove('hidden');
    }
});
readMore.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        articles[i].classList.toggle('h-44');
        if (btn.innerText === 'Read more') {
            btn.innerText = 'Read less';
        } else {
            btn.innerText = 'Read more';
        }
    });
});
if (reviewBox.scrollHeight > reviewBox.clientHeight) {
    moreReviews.classList.remove('hidden');
}
moreReviews.addEventListener('click', () => {
    reviewBox.classList.toggle('h-[55rem]');
    if (moreReviews.innerText === 'More Reviews') {
        moreReviews.innerText = 'Less Reviews';
    } else {
        moreReviews.innerText = 'More Reviews';

    }
})

