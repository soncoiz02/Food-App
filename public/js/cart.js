const cartDataApi = 'https://son-food-app.herokuapp.com/api/cart-data'
fetch(cartDataApi)
    .then(respons => respons.json())
    .then(data => handleData(data))

const handleData = (data) =>{
    if(data.length > 0){
        document.querySelector('.cart').classList.add('active')
        document.querySelector('.cart-empty').classList.remove('active')
        renderData(data)
    }
    else{
        document.querySelector('.cart').classList.remove('active')
        document.querySelector('.cart-empty').classList.add('active')
    }
    updateValue(data)
    deleteCart(data)
}

const renderData = (cartData) =>{
    let cartItem = cartData.map(item => {
        return `
        <div class="cart-item">
            <div class="detail">
                <div class="img">
                    <img src="${item.img}" alt="">
                </div>
                <a href="detail.html?id=${item.id}" class="name">${item.name}</a>
            </div>
            <div class="size">
                Size
                <p>${item.size}</p>
            </div>
            <div class="price">
                Price
                <p>${Math.round(item.price)}$</p>
            </div>
            <div class="quantity">
                Quantity
                <div class="quantity-form">
                    <button class="btn-minus">-</button>
                    <input type="number" id="quantity" value="${item.quantity}">
                    <button class="btn-plus">+</button>
                </div>
            </div>
            <div class="total">
                Total
                <p id="total"></p>
            </div>
            <div class="delete">
                Delete
                <div class="btn-delete"><i class="fas fa-trash-alt"></i></div>
            </div>
        </div>
        `
    })

    document.querySelector('.cart-list').innerHTML = cartItem.join('')
    const total = document.querySelectorAll('#total')
    cartData.forEach((e, index) => {
        sumTotal(total[index],e.price, e.quantity)
    });
    sumCartTotal()
    document.querySelector('.btn-active').onclick = () => document.querySelector('.top').classList.toggle('active')
}
const updateValue = (data) =>{
    const btnPlus = document.querySelectorAll('.btn-plus')
    const btnMinus = document.querySelectorAll('.btn-minus')
    let quantityValue = document.querySelectorAll('#quantity')
    let total = document.querySelectorAll('#total')
    btnPlus.forEach((btn, index) => {
        btn.onclick = () =>{
            quantityValue[index].value = Number(quantityValue[index].value) + 1
            data.forEach(e => {
                sumTotal(total[index], data[index].price, quantityValue[index].value)
                sumCartTotal()
            })
        }     
    })
    btnMinus.forEach((btn, index) =>{
        btn.onclick = () => {
            if(quantityValue[index].value <= 0){
                return
            }
            else{
                quantityValue[index].value = Number(quantityValue[index].value) - 1
                    sumTotal(total[index], data[index].price, quantityValue[index].value)
                    sumCartTotal()
            }
        }
    })
}

const sumTotal = (total, price, quantity)=>{
    price = Number(price)
    quantity = Number(quantity)
    let sumTotal = 0
    sumTotal = Math.round(price * quantity)
    total.innerHTML = `${sumTotal}$`
}

const sumCartTotal = () =>{
    let allTotal = document.querySelectorAll('#total')
    let sumTotal = 0
    const cartTotal = document.querySelector('.total-product')
    allTotal.forEach(e => {
        let total = Number(e.innerHTML.slice(0,-1))
        sumTotal += total
        cartTotal.innerHTML = `${sumTotal}$`
    })
}

const deleteCart = (data) => {
    const btnDelete = document.querySelectorAll('.btn-delete')
    btnDelete.forEach((e, index) => {
        e.onclick = () =>{
            fetch(cartDataApi + '/' + data[index].id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            fetch(cartDataApi)
                .then(respons => respons.json())
                .then(data => handleData(data))
        }
    })
}

const activeMobile = () =>{
    const mobileHeader = document.querySelector('.mobile')
    const btnBar = document.querySelector('.btn-bar')
    const mobileNav = document.querySelector('.mobile-box')
    btnBar.onclick = () => {
      btnBar.classList.toggle('active')
      mobileHeader.classList.toggle('active')
    }
    mobileHeader.onclick = () =>{
      btnBar.classList.remove('active')
      mobileHeader.classList.remove('active')
    }
  }
  
  activeMobile()