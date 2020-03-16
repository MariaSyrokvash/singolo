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


function myBtn() {
   event.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var desc = document.getElementById('desc').value;
    var html = '<h1>Форма отправлена</h1><br><b>Имя :</b>' + (name || 'Без имени') + '<br><b>Почта :</b>' + (email || 'Без емейла') + '<br><b>Тема :</b>' + (subject || 'Без темы') + '<br><b>Описание :</b>' + (desc || 'Без описания');
 
    document.getElementById('result').innerHTML = html;
}
 
document.getElementById('myBtn').addEventListener('click', myBtn);

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}