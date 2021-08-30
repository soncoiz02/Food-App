const apiUrl = 'http://localhost:3000/api/'
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
                        <a href="#" class="name">${item.name}</a>
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
        listProduct.insertAdjacentHTML('beforeend', listItem.join(''))
    }
    let pageNumber = Math.round(dataItem.length / perPage)

    const renderBtnNum = (pageNum) => {
        const pagination = document.querySelector('.pagination')
        pagination.innerHTML = ''
        for (let i = 0; i < pageNum; i++) {
            let html = `
                <button data-num="${i + 1}" class="btn-number">${i + 1}</button>
            `
            pagination.insertAdjacentHTML('beforeend', html)
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
        btnNumber.forEach(e => {
            e.onclick = () => {
                dataNum = e.getAttribute('data-num')
                renderItem(dataNum, dataItem)
                activeBtn(dataNum)
                document.body.scrollTop = 300;
                document.documentElement.scrollTop = 300;
            }
        })
    }
    renderItem(currentPage, dataItem)
    renderBtnNum(pageNumber)
    activeBtn(currentPage)
    paging()
}
getApi('best-foods')
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
