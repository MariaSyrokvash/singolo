
const nav = document.querySelector("nav ul");
const menuLinks = document.querySelectorAll('nav ul li a');

menuLinks.forEach( link => link.addEventListener('click', (event) => {
  nav.querySelectorAll('a').forEach(e => e.classList.remove('current'));
  event.target.classList.add("current");
}));

document.addEventListener('scroll', changeLink);
window.onload = changeLink();

function changeLink(event) {
  const currentPosition = window.scrollY;
  const section = document.querySelectorAll('[id]');

  section.forEach( tag => {
    if (tag.offsetTop - 120 <= currentPosition &&
       (tag.offsetTop + tag.offsetHeight - 120) > currentPosition) {
      menuLinks.forEach( link => {
        link.classList.remove("current");
        if(tag.getAttribute("id") === link.getAttribute("href").substring(1)) {
          link.classList.add("current");
        }
      });
    }
  });
}

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

// выделение картинок в портфолио

let preview = document.querySelector('.preview-set');
preview.addEventListener('click', (event) =>{
    preview.querySelectorAll('.preview__img').forEach(el => el.classList.remove('image_selected'));
    if(event.target.tagName === 'IMG'){
        event.target.classList.add('image_selected');
    }  
})


let picSet = document.querySelectorAll('.preview-set img');
let portfolioTags = document.querySelectorAll('.tag');

portfolioTags.forEach(el => el.addEventListener('click', (event) => {
  if (!event.target.classList.contains('tag_selected') && !event.target.parentElement.classList.contains('tag_bordered')) {
   portfolioTags.forEach(el => el.classList.remove('tag_selected'));
    if (event.target.tagName === 'SPAN') {
      event.target.classList.add('tag_selected');
    } else {
      event.target.parentElement.classList.add('tag_bordered');
    }
    shiftImages();
  }
}));

function shiftImages() {
  let sources = Array.from(picSet).map(el => el.getAttribute('src'));
  sources.push(sources[0]);
  sources.shift();
  for (let i = 0; i < sources.length; i++) {
    picSet.item(i).setAttribute('src', sources[i]);
  }
  picSet.forEach(el => el.classList.remove('outline'));
}

// Модальное окно


let modal = document.getElementById("myModal");
let btnSubmit = document.getElementById("myBtn");
let btnClose = document.getElementById("close");


function myBtn() {
  event.preventDefault(); //отменяем дефолтное поведение

  let subject = document.getElementById('subject').value;
  let desc = document.getElementById('desc').value;
  let theme = subject ? '<b>Тема: </b>' + subject  :'<b> Без темы </b>';
  let textDescription = desc ? '<b>Описание: </b>' + subject  :'<b> Без описания </b>';

  let html = '<h1>Письмо отправлено</h1><br>' + '<br>' + theme +'<br>' + textDescription;
  let result = document.getElementById('result');

  result.innerHTML = html; //отправляем содержимое input в модальное окно
};
 
document.getElementById('myBtn').addEventListener('click', myBtn); //вышаем слушатель на кнопку submit

btnSubmit.onclick = function() { // при клике кнопки submit - показываем модальное окно
  event.preventDefault();
  modal.style.display = "block";
}

btnClose.onclick = function() {  //при клике на ОК модального окна - закрывается
  modal.style.display = "none";
  document.getElementById('myform').reset();  //сбрасываем value
}

window.onclick = function(event) { //при клике вне модального окна - модальное окно закрывается и сбрасываются value
  if (event.target == modal) {
    modal.style.display = "none";
    document.getElementById('myform').reset();
  }
}
