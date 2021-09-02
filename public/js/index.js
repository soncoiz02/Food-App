const urlApi = 'https://son-food-app.herokuapp.com/api/burgers'

fetch(urlApi)
  .then((response) => response.json())
  .then((data) => showDish(data))

const showDish = (data) => {
  const arr = data.splice(0, 10)
  console.log(arr)
  const rate = (number) => {
    let rating = ''
    for (let i = 0; i < number; i++) {
      rating += `<i class="fas fa-star"></i>`
    }
    return rating
  }
  const showItem = arr.map((item) =>
    `<div class="swiper-slide">
        <div class="img">
            <img src="${item.img}" alt="">
        </div>
        <div class="rating">
        ${rate(item.rate)}
        </div>
        <div class="detail">
            <a href="detail.html?id=${item.id}" class="name">${item.name}</a>
            <p class="dsc">${item.dsc}</p>
            <div class="sub-detail">
                <div class="country"><i class="fas fa-map-marker-alt"></i>${item.country}</div>
                <div class="price">${Math.round(item.price)}$</div>
            </div>
        </div>
        <a href="detail.html?id=${item.id}" class="btn-order">Order Now</a>
    </div>
    `
  )
  document.querySelector('.swiper-hotest').insertAdjacentHTML('beforeend', showItem.join(''))
}

window.onscroll = () => {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector(".header").classList.add('active')
  } else {
    document.querySelector(".header").classList.remove('active')
  }
}
const element = document.querySelectorAll('section')
console.log(element)
fetch('https://son-food-app.herokuapp.com/api/cart-data')
  .then(respons => respons.json())
  .then(data => handleCart(data))
const handleCart = (data) => {
  showCartNumberItem(data)
}
const showCartNumberItem = (cartData) => {
  const cartNumberItem = document.querySelector('.number-item')
  if (cartData.length > 0) {
    cartNumberItem.classList.add('active')
    cartNumberItem.innerHTML = cartData.length
  }
  else {
    cartNumberItem.classList.remove('active')
  }
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

const handleSwiper = () => {
  let ipadWidth = window.matchMedia("(max-width: 1025px) and (min-width: 769px)")
  let mobileWidth = window.matchMedia("(max-width: 768px)")
  if (ipadWidth.matches) {
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 50,
      freeMode: true,
    });
    var swipers = new Swiper(".mySwipers", {
      slidesPerView: 2,
      spaceBetween: 30,
      freeMode: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
  else if(mobileWidth.matches){
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 2,
      spaceBetween: 30,
      freeMode: true,
    });
    var swipers = new Swiper(".mySwipers", {
      slidesPerView: 1,
      spaceBetween: 20,
      freeMode: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
  else {
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 5,
      spaceBetween: 70,
      freeMode: true,
    });
    var swipers = new Swiper(".mySwipers", {
      slidesPerView: 3,
      spaceBetween: 80,
      freeMode: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
}
handleSwiper()
  const sr = ScrollReveal({
    origin: 'top',
    distance: '40px',
    duration: 1000,
    reset: true
  })
  sr.reveal('.icon, .menu, .about, .hotest, .why, .customers')