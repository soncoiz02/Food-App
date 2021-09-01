const apiUrl = 'https://son-food-app.herokuapp.com/api/'
const getApi = (cate) => {
    fetch(apiUrl + cate)
        .then(respons => respons.json())
        .then(data => handleData(data))
}
const handleData = (data) => {
    let dataItem = data
    let perPage = 18
    let currentPage = 1
    const renderItem = (currentNum, dataItem) => {
        const listProduct = document.querySelector('.list-products')
        listProduct.innerHTML = ''
        currentPage = currentNum
        let start = (currentPage - 1) * perPage
        let end = currentPage * perPage
        const rate = (number) => {
            let rating = ''
            for( let i = 0; i < number; i++){
              rating += `<i class="fas fa-star"></i>`
            }
            return rating
        }
        let listItem = dataItem.map((item, index) => {
            if (index >= start && index < end) {
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
                        
                        <a href="detail.html?id=${item.id}" class="btn-order">
                            Order Now
                        </a>
                    </div>
                `
            }
        })
        listProduct.insertAdjacentHTML('beforeend', listItem.join(''))
    }
    let pageNumber = Math.round(dataItem.length / perPage)

    const renderBtnNum = (pageNum) => {
        const pagination = document.querySelector('.pagination')
        pagination.innerHTML = ''
        if(pageNum > 5){
            for (let i = 0; i < 6; i++) {
                let html = `
                    <button data-num="${i + 1}" class="btn-number">${i + 1}</button>
                `
                pagination.insertAdjacentHTML('beforeend', html)
            }
        }
        else{
            for (let i = 0; i < pageNum; i++) {
                let html = `
                    <button data-num="${i + 1}" class="btn-number">${i + 1}</button>
                `
                pagination.insertAdjacentHTML('beforeend', html)
            }
        }
    }
    const activeBtn = (number) => {
        const btnNumber = document.querySelectorAll('.btn-number')
        btnNumber.forEach(e => {
            if (e.getAttribute('data-num') == number) {
                if (document.querySelector('button.active')) {
                    document.querySelector('button.active').classList.remove('active')
                }
                e.classList.add('active')
            }
        })
    }
    const paging = () => {
        let dataNum = 0
        const btnNumber = document.querySelectorAll('.btn-number')
        const btnLenght = btnNumber.length
        const lastBtn = btnNumber[btnLenght - 1]
        const firstBtn = btnNumber[0]
            btnNumber.forEach(e => {
                e.onclick = () => {
                    dataNum = e.getAttribute('data-num')
                    renderItem(dataNum, dataItem)
                    activeBtn(dataNum)
                    document.body.scrollTop = 300;
                    document.documentElement.scrollTop = 300;
                }
            })
            lastBtn.onclick = () =>{
                if(lastBtn.getAttribute('data-num') >= 6){
                    for(let i = 0; i < btnLenght; i++){
                        btnNumber[i].textContent = Number(btnNumber[i].textContent) + 1
                        btnNumber[i].setAttribute('data-num', Number(btnNumber[i].textContent))
                    }
                    dataNum = lastBtn.getAttribute('data-num')
                    console.log(dataNum - 1)
                    renderItem(dataNum - 1, dataItem)
                    activeBtn(dataNum - 1)
                    document.body.scrollTop = 300;
                    document.documentElement.scrollTop = 300;
                }
                else{
                    dataNum = lastBtn.getAttribute('data-num')
                    renderItem(dataNum, dataItem)
                    activeBtn(dataNum)
                    document.body.scrollTop = 300;
                    document.documentElement.scrollTop = 300;
                }
            }
            firstBtn.onclick = () =>{
                if(firstBtn.getAttribute('data-num') >= 2){
                    for(let i = 0; i < btnLenght; i++){
                        btnNumber[i].textContent = Number(btnNumber[i].textContent) - 1
                        btnNumber[i].setAttribute('data-num', Number(btnNumber[i].textContent))
                    }
                    dataNum = Number(firstBtn.getAttribute('data-num'))
                    renderItem(dataNum + 1, dataItem)
                    activeBtn(dataNum + 1)
                    document.body.scrollTop = 300;
                    document.documentElement.scrollTop = 300;
                }
                else{
                    dataNum = firstBtn.getAttribute('data-num')
                    renderItem(dataNum, dataItem)
                    activeBtn(dataNum)
                    document.body.scrollTop = 300;
                    document.documentElement.scrollTop = 300;
                }
            }
        
    }
    renderItem(currentPage, dataItem)
    renderBtnNum(pageNumber)
    activeBtn(currentPage)
    paging()
}
getApi('our-foods')
const listMenu = document.querySelector('.list-menu')
const showMore = () => {
    document.querySelector('.btn-see').onclick = () => {
        listMenu.classList.toggle('active')
    }
}
showMore()

const activeMenu = () => {
    const listItemMenu = listMenu.children
    let dataFilter = ''
    for (let i = 0; i < listItemMenu.length; i++) {
        listItemMenu[i].onclick = () => {
            if (document.querySelector('li.active')) {
                document.querySelector('li.active').classList.remove('active')
            }
            listItemMenu[i].classList.add('active')
            dataFilter = listItemMenu[i].getAttribute('data-filter')
            getApi(dataFilter)
            document.body.scrollTop = 300;
            document.documentElement.scrollTop = 300;
        }
    }
}
activeMenu()

const search = () => {
    const btnSearch = document.querySelector('.btn-search')
    btnSearch.onclick = () => {
        let searchValue = document.querySelector('#search').value
        fetch('https://son-food-app.herokuapp.com/api//our-foods/?name_like=' + searchValue)
        .then(respons => respons.json())
        .then(data => handleData(data))
    }
}
search()
fetch('https://son-food-app.herokuapp.com/api/cart-data')
        .then(respons => respons.json())
        .then(data => handleCart(data))
const handleCart = (data) =>{
    showCartNumberItem(data)
}
const showCartNumberItem = (cartData) =>{
    const cartNumberItem = document.querySelector('.number-item') 
    if(cartData.length > 0){
        cartNumberItem.classList.add('active')
        cartNumberItem.innerHTML = cartData.length
    }
    else{
        cartNumberItem.classList.remove('active')
    }
}