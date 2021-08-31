const currentUrl = window.location.search
const apiUrl = 'http://localhost:3000/api/our-foods'
fetch(apiUrl + currentUrl)
    .then(respons => respons.json())
    .then(data => handleData(data))

fetch(apiUrl)
    .then(respons => respons.json())
    .then(data => render(data))

const handleData = (data) => {
    data = data.splice(0,1)
    let dataProduct = data
    const rate = (number) => {
        let rating = ''
        for (let i = 0; i < number; i++) {
            rating += `<i class="fas fa-star"></i>`
        }
        return rating
    }
    const renderData = (data) => {
        let item = data.map(e => {
            return `
            <div class="container">
                <div class="product-detail-img">
                    <div class="large-img">
                        <img src="${e.img}" alt="">
                    </div>
                    <div class="small-img">
                        <img src="${e.img}" alt="">
                    </div>
                </div>
                <div class="product-detail-content">
                    <h3 class="name">${e.name}</h3>
                    <div class="rating">
                        ${rate(e.rate)}
                    </div>
                    <div class="price">${e.price}$</div>
                    <div class="country">
                        <i class="fas fa-map-marker-alt"></i>
                        Country: ${e.country}
                    </div>
                    <div class="dsc">${e.dsc}</div>
                    <div class="size">
                        <p>Choose Size</p>
                        <div class="list-size">
                            <input type="radio" id="size-s" name="size" value="S">
                            <label for="size-s">
                                S-Small
                            </label>
                            <input type="radio" id="size-m" name="size" value="M">
                            <label for="size-m">
                                M-Medium
                            </label>
                            <input type="radio" id="size-;" name="size" value="L">
                            <label for="size-;">
                                L-Large
                            </label>
                        </div>
                    </div>
                    <div class="quantity">
                        <button class="btn-minus">-</button>
                        <input type="number" id="quantity" value="1">
                        <button class="btn-plus">+</button>
                    </div>
                    <div class="check">
                        <p><i class="far fa-check-circle"></i>Freeship within 10km</p>
                        <p><i class="far fa-check-circle"></i>Foods are delivered in about 30 minutes to 1 hour</p>
                    </div>
                    <div class="btn-add">
                        <input type="submit" value="Order Now" id="btn-add">
                    </div>
                </div>
            </div>
            `
        })
        
        document.querySelector('.product-detail').insertAdjacentHTML('beforeend', item.join())
    }
    
    renderData(dataProduct)
    const updateValue = () =>{
        const btnPlus = document.querySelector('.btn-plus')
        const btnMinus = document.querySelector('.btn-minus')
        let quantityValue = document.querySelector('#quantity')
        console.log(quantityValue)
        btnPlus.onclick = () =>{
            quantityValue.value = Number(quantityValue.value) + 1
        }
        btnMinus.onclick = () => {
            if(quantityValue.value <= 0){
                return
            }
            else{
                quantityValue.value = Number(quantityValue.value) - 1
            }
        }
    }
    updateValue()
}

const render = (data) => {
    const rate = (number) => {
        let rating = ''
        for( let i = 0; i < number; i++){
          rating += `<i class="fas fa-star"></i>`
        }
        return rating
    }
    let item = data.map((item, index) => {
        if(index >= 0 && index < 4){
            return `
            <div class="item">
                <div class="img">
                    <img src="${item.img}" alt="">
                    <div class="rating">${rate(item.rate)}</div>
                </div>
                <div class="hot">Hot</div>
                <a href="detail.html?id=${item.id}" class="name">${item.name}</a>
                <p class="dsc">${item.dsc}</p>
                <div class="detail">
                    <div class="country">
                        <i class="fas fa-map-marker-alt"></i>
                        ${item.country}
                    </div>
                    <div class="price">${Math.round(item.price)}$</div>
                </div>
                
                <a href="#" class="btn-order">
                    Order Now
                </a>
            </div>
            `
        }
    })
    document.querySelector('.list-product').insertAdjacentHTML('beforeend', item.join(''))
}


fetch('http://localhost:3000/api/comment')
    .then(respons => respons.json())
    .then(data => renderComment(data))

const renderComment = (data) => {
    let item = data.map(item => {
        return `
        <div class="item-cmt">
            <div class="avt">
                ${item.user}
            </div>
            <div class="cmt">
                <div class="rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <p>${item.value}</p>
            </div>
        </div>
        `
    })
    document.querySelector('.comment-list').insertAdjacentHTML('beforeend', item.join(''))
}

const pushComment = () => {
    const btn = document.querySelector('#btn-comment')
    const commentApi = 'http://localhost:3000/api/comment'
    btn.onclick = () =>{
        let commentValue = document.querySelector('#comment').value
        let commentData = {
            id: Math.floor(Math.random() * 100),
            user: "S",
            value: commentValue
        }

        fetch(commentApi, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(commentData)
        })
        .then(respons => respons.json())
        .then(data => renderComment(data))
    }
}
pushComment()