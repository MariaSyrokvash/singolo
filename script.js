// изменение навигации в хедере
let headerList = document.querySelector('.header__list');

headerList.addEventListener('click', (event) => {
  headerList.querySelectorAll('.header__link').forEach(item => {
      item.classList.remove('header__link--current');
  });
  event.target.classList.add('header__link--current');
});


// карусель

let slide = document.querySelectorAll('.slider__phone');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + slide.length) % slide.length;
}

function hideItem(direction) {
	isEnabled = false;
	slide[currentItem].classList.add(direction);
	slide[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
	slide[currentItem].classList.add('next', direction);
	slide[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.left').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});

// выключение экранов
document.querySelector('.slider__phone--vertical').addEventListener('click', (e) => {
  let offDisplay = document.querySelector('.vertical-off');
  if ( offDisplay.style.display == 'block' ) {
    offDisplay.style.display = 'none';
  } else {
      offDisplay.style.display = 'block';
  };
  offDisplay.addEventListener('click', (e) => {
    offDisplay.style.display = 'none';
  })
});

document.querySelector('.slider__phone--horizontal').addEventListener('click', (e) => {
  let offDisplay = document.querySelector('.horizontal-off');
  if ( offDisplay.style.display == 'block' ) {
    offDisplay.style.display = 'none';
  } else {
      offDisplay.style.display = 'block';
  };
  offDisplay.addEventListener('click', (e) => {
    offDisplay.style.display = 'none';
  })
});


// переключение тегов

let portfolioTags = document.querySelector('.portfolio__tags');

portfolioTags.addEventListener('click', (event) => {
  portfolioTags.querySelectorAll('.tag').forEach(item => {
      item.classList.remove('tag_selected');
  });
  event.target.classList.add('tag_selected');
});



// выделение картинок в портфолио

let preview = document.querySelector('.preview-set');
preview.addEventListener('click', (event) =>{
    preview.querySelectorAll('.preview__img').forEach(el => el.classList.remove('image_selected'));
    if(event.target.tagName === 'IMG'){
        event.target.classList.add('image_selected');
    }  
})

