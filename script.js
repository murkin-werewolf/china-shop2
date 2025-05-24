let cart = [];
let totalPrice = 0;

// Добавление товара в корзину
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.parentElement;
        const name = product.dataset.name;
        const price = parseInt(product.dataset.price);

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        totalPrice += price;
        updateCart();
    });
});

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        
        // Формируем безопасный текст без шаблонных строк для jshint
        listItem.textContent = item.name + ' - ' + item.price + '₽ × ' + item.quantity;
        
        // Создаем кнопки через createElement, чтобы избежать ошибок с innerHTML
        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.classList.add('decrease');
        decreaseButton.setAttribute('data-index', index);

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.classList.add('increase');
        increaseButton.setAttribute('data-index', index);

        const removeButton = document.createElement('button');
        removeButton.textContent = '❌';
        removeButton.classList.add('remove');
        removeButton.setAttribute('data-index', index);

        // Добавляем элементы в строку списка
        listItem.appendChild(decreaseButton);
        listItem.appendChild(increaseButton);
        listItem.appendChild(removeButton);
        cartItems.appendChild(listItem);
    });

    document.getElementById('total-price').textContent = 'Общая сумма: ' + totalPrice + '₽';

    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            cart[index].quantity++;
            totalPrice += cart[index].price;
            updateCart();
        });
    });

    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                totalPrice -= cart[index].price;
            } else {
                totalPrice -= cart[index].price;
                cart.splice(index, 1);
            }
            updateCart();
        });
    });

    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            totalPrice -= cart[index].price * cart[index].quantity;
            cart.splice(index, 1);
            updateCart();
        });
    });
}


// Выпадающее меню
document.getElementById('dropdown-button').addEventListener('click', function() {
    const menu = document.getElementById('dropdown-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
document.getElementById('clear-cart-button').addEventListener('click', function() {
    cart = [];    
    totalPrice = 0;
    updateCart();
    
});

document.getElementById('search-input').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();    
    document.querySelectorAll('.product').forEach(product => {
        const name = product.dataset.name.toLowerCase();
        product.style.display = name.includes(searchValue)  ? 'block' : 'none'; 
});
 });                                              




