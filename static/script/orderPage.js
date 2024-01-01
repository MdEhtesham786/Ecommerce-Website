let filterBar = document.getElementById('filterBar');
let hoverBtn = document.getElementById('hoverBtn');
let btnArr = document.querySelectorAll('#filterBar button');
let previousContent = 'Orders';
btnArr[0].style.color = 'black';
let changeColor = () => {
    btnArr.forEach((btn) => {
        btn.style.color = 'gray';
    });
};
btnArr.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
        let content = e.target.innerText;
        if (content === 'Not Yet Shipped') {
            changeColor();
            if (previousContent === 'Orders') {
                hoverBtn.style.width = '23.7rem';
                setTimeout(() => {
                    hoverBtn.style.left = '19.2%';
                    hoverBtn.style.width = '11.5rem';
                }, 200);
            } else {
                hoverBtn.style.width = '23.7rem';
                hoverBtn.style.left = '19.2%';
                setTimeout(() => {
                    hoverBtn.style.width = '11.5rem';
                }, 200);
            }

            previousContent = 'Not Yet Shipped';
            btn.style.color = 'black';

            // btnArr[0].style.background = 'linear-gradient(to right, red 10%, blue 0%)';
        } else if (content === 'Cancelled Orders') {
            changeColor();
            if (previousContent === 'Not Yet Shipped') {
                hoverBtn.style.width = '23.7rem';
                setTimeout(() => {
                    hoverBtn.style.left = '32.2%';
                    hoverBtn.style.width = '11.5rem';
                }, 200);
            } else {
                hoverBtn.style.width = '36rem';
                setTimeout(() => {
                    hoverBtn.style.left = '32.2%';
                    hoverBtn.style.width = '11.5rem';
                }, 200);
            }
            previousContent = 'Cancelled Orders';
            btn.style.color = 'black';

        } else if (content === 'Orders') {
            changeColor();
            if (previousContent === 'Not Yet Shipped') {
                hoverBtn.style.width = '23.7rem';
                hoverBtn.style.left = '6.3%';
                setTimeout(() => {
                    hoverBtn.style.width = '11.5rem';
                }, 200);
            } else {
                hoverBtn.style.width = '36rem';
                hoverBtn.style.left = '6.3%';
                setTimeout(() => {
                    hoverBtn.style.width = '11.5rem';
                }, 200);
            }
            previousContent = 'Orders';
            btn.style.color = 'black';

        }
    });
});
