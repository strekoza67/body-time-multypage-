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