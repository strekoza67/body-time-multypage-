// Classes

class ServiceCard {
  constructor(src, alt, title, firstLine, firstLineOldPrice, secondtLine, secondLineOldPrice, thirdtLine, thirdLineOldPrice, parentSelector) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.firstLine = firstLine;
    this.firstLineOldPrice = firstLineOldPrice;
    this.secondLine = secondtLine;
    this.secondLineOldPrice = secondLineOldPrice;
    this.thirdLine = thirdtLine;
    this.thirdLineOldPrice = thirdLineOldPrice;
    this.parent = document.querySelector(parentSelector);
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = `
      <div class="services__item">
        <img class="services__item-img" src=${this.src} alt=${this.alt}>
        <div class="services__item-title">${this.title}</div>
        <div class="services__item-descr">${this.firstLine} <span> ${this.firstLineOldPrice}</span></div>
        <div class="services__item-descr">${this.secondLine} <span> ${this.secondLineOldPrice}</span></div>
        <div class="services__item-descr">${this.thirdLine} <span> ${this.thirdLineOldPrice}</span></div>
      </div>
    `;
    this.parent.append(element);
  }
}

new ServiceCard(
  "images/service-1.jpg",
  "service-1",
  "RF-лифтинг лица (тела)",
  "1 сеанс - 1000 руб.",
  "",
  "4 сеанса - 3600 руб.",
  "4000 р.",
  "8 сеансов - 6400 руб.",
  "8000 р.",
  ".services__items"
).render();

new ServiceCard(
  "images/service-2.jpg",
  "service-2",
  "Ультрозвуковая кавитация",
  "1 сеанс - 900 руб.",
  "",
  "4 сеанса - 3200 руб.",
  "4000 р.",
  "8 сеансов - 5600 руб.",
  "8000 р.",
  ".services__items"
).render();

new ServiceCard(
  "images/service-3.jpg",
  "service-3",
  "Миостимуляция тела",
  "1 сеанс - 450 руб.",
  "",
  "5 сеанса - 2000 руб.",
  "2250 р.",
  "10 сеансов - 3000 руб.",
  "4500 р.",
  ".services__items"
).render();
new ServiceCard(
  "images/service-4.jpg",
  "service-4",
  "Миостимуляция лица",
  "10 сеансов - 5000 руб.",
  "7000 р.",
  "",
  " ",
  "",
  "",
  ".services__items"
).render();

// Scroll

function scroll(selector) {
  let scrollLink = document.querySelectorAll(selector);

  scrollLink.forEach(item => {
    addEventListener('click', (e) => {
      e.preventDefault();

      console.log('clicked');

      let id = e.target.getAttribute('href').replace('#', '');

      window.scrollTo({
        top: document.getElementById(id).offsetTop,
        behavior: 'smooth',
      });
    });
  });
}

scroll('.menu__list-link');

let scrollBtn = document.querySelector('.scroll-btn');

scrollBtn.addEventListener('click', (e) => {
  if (e.target.matches('.scroll-btn')) {
    e.preventDefault();

    console.log('clicked');

    const id = scrollBtn.getAttribute('href').replace('#', '');

    window.scrollTo({
      top: document.getElementById(id).offsetTop,
      behavior: 'smooth',
    });
  }
});


// Slider

const slides = document.querySelectorAll('.stocks__slide'),
  slider = document.querySelector('.stocks__slider'),
  prev = document.querySelector('.stocks__slider-prev'),
  next = document.querySelector('.stocks__slider-next'),
  slidesWrapper = document.querySelector('.stocks__slider-wrapper'),
  slidesField = document.querySelector('.stocks__slider-inner'),
  width = window.getComputedStyle(slidesWrapper).width;
let sliderIndex = 1;
let offset = 0;

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.4s all';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
  slide.style.width = width;
});

slider.style.position = 'relative';

// Dots

let indicators = document.querySelector('.stocks__slider-dots');
let dots = [];

for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement('li');
  dot.setAttribute('data-slide-to', i + 1);
  dot.style.cssText = `
    background: #AEACAA;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    cursor: pointer;
  `;

  if (i == 0) {
    dot.style.background = '#363431';
  }
  indicators.append(dot);
  dots.push(dot);
}

function deleteNotDigits(str) {
  return +str.replace(/\D/g, '');
}

next.addEventListener('click', () => {
  if (offset == deleteNotDigits(width) * (slides.length - 1)) {
    offset = 0;
  } else {
    offset += +width.replace(/\D/g, '');
  }

  slidesField.style.transform = `translateX(-${offset}px)`;

  if (sliderIndex == slides.length) {
    sliderIndex = 1;
  } else {
    sliderIndex++;
  }

  dots.forEach(dot => dot.style.background = '#AEACAA');
  dots[sliderIndex - 1].style.background = '#363431';

});

prev.addEventListener('click', () => {
  if (offset == 0) {
    offset += deleteNotDigits(width) * (slides.length - 1);
  } else {
    offset -= +width.replace(/\D/g, '');
  }

  slidesField.style.transform = `translateX(-${offset}px)`;

  if (sliderIndex == 1) {
    sliderIndex = slides.length;
  } else {
    sliderIndex--;
  }

  dots.forEach(dot => dot.style.background = '#AEACAA');
  dots[sliderIndex - 1].style.background = '#363431';
});

dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    const slideTo = e.target.getAttribute('data-slide-to');

    sliderIndex = slideTo;
    offset = deleteNotDigits(width) * (slideTo - 1);

    slidesField.style.transform = `translateX(-${offset}px)`;

    dots.forEach(dot => dot.style.background = '#AEACAA');
    dots[sliderIndex - 1].style.background = '#363431';
  });
});

// Modals
function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
  let trigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector),
    close = document.querySelector(closeSelector),
    window = document.querySelector('[data-modal]'),
    scroll = calcScroll();

  trigger.forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target) {
        e.preventDefault();
      }

      window.style.display = 'none';
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = `${scroll}px`;
    });

    close.addEventListener('click', (e) => {
      window.style.display = 'none';
      modal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.marginRight = `0px`;
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        window.style.display = 'none';
        modal.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.marginRight = `0px`;
      }
    });
  });
}

function calcScroll() {
  let div = document.createElement('div');

  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';

  document.body.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollWidth;
}

bindModal('.first__btn', '.popup', '.popup__close');

// Burger-menu

let burgerBtn = document.querySelector('.menu__burger'),
  menu = document.querySelector('.menu');

burgerBtn.addEventListener('click', (e) => {
  menu.style.left = '0';
  console.log('cool');
});

