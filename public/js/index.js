var swiper = new Swiper(".mySwiper", {
  slidesPerView: 5,
  spaceBetween: 50,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
var swipers = new Swiper(".mySwipers", {
  slidesPerView: 3,
  spaceBetween: 50,
  freeMode: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


const urlApi = 'https://ig-food-menus.herokuapp.com/burgers'

fetch(urlApi)
  .then((response) => response.json())
  .then((data) => showDish(data))

const showDish = (data) => {
  const arr = data.splice(0, 10)
  console.log(arr)
  const rate = (number) => {
    let rating = ''
    for( let i = 0; i < number; i++){
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
            <h5>${item.name}</h5>
            <p class="dsc">${item.dsc}</p>
            <div class="sub-detail">
                <div class="country"><i class="fas fa-map-marker-alt"></i>${item.country}</div>
                <div class="price">${item.price}$</div>
            </div>
        </div>
        <a href="#" class="btn-order">Order Now</a>
    </div>
    `
  )
  document.querySelector('.swiper-hotest').insertAdjacentHTML('beforeend', showItem.join('')) 
}

window.onscroll = () =>{
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector(".header").classList.add('active')
  } else {
    document.querySelector(".header").classList.remove('active')
  }
}
const element = document.querySelectorAll('section')
console.log(element)

const sr = ScrollReveal({
  origin: 'top',
  distance: '40px',
  duration: 1000,
  reset: true
})
sr.reveal('.icon, .menu, .about, .hotest, .why, .customers')

