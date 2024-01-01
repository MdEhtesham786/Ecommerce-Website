let decrementsArr = document.querySelectorAll('button[data-action="decrement"]');
let incrementsArr = document.querySelectorAll('button[data-action="increment"]');
let quantityArr = document.querySelectorAll('.quantity');
let priceArr = document.querySelectorAll('.price');
let total = document.getElementById('total');
let subtotal = document.getElementById('subtotal');
let shippingPrice = document.getElementById('shippingPrice');
console.log(shippingPrice);
incrementsArr.forEach((increment, i) => {
    increment.addEventListener('click', () => {
        if (quantityArr[i].value < 10) {
            quantityArr[i].value++;
            let newPrice = parseInt(priceArr[i].getAttribute('data-price'));
            priceArr[i].innerText = newPrice * parseInt(quantityArr[i].value);
            subtotal.innerText = 0;
            priceArr.forEach((price) => {
                subtotal.innerText = parseInt(subtotal.innerText) + parseInt(price.innerText);
            });
            if (parseInt(subtotal.innerText) < 500) {
                shippingPrice.innerText = 40;
            } else {
                shippingPrice.innerText = '0.00';
            }
            total.innerText = parseInt(shippingPrice.innerText) + parseInt(subtotal.innerText);
        }
    });
});
decrementsArr.forEach((decrement, i) => {
    decrement.addEventListener('click', () => {
        if (quantityArr[i].value !== '1')
            quantityArr[i].value--;
        let newPrice = parseInt(priceArr[i].getAttribute('data-price'));
        priceArr[i].innerText = newPrice * parseInt(quantityArr[i].value);
        subtotal.innerText = 0;
        priceArr.forEach((price) => {
            subtotal.innerText = parseInt(subtotal.innerText) + parseInt(price.innerText);
        });
        if (parseInt(subtotal.innerText) < 500) {
            shippingPrice.innerText = 40;
        } else {
            shippingPrice.innerText = '0.00';
        }
        total.innerText = parseInt(shippingPrice.innerText) + parseInt(subtotal.innerText);

    });
});