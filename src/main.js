import './clear.css'
import './main.css'
import './slider.css'
import './decoration.css'

let play = false // воспроизводится ли сейчас музыка?
let prevSeason = '' // предыдущее состояние нажатой кнопки (было выбрано время года)

const audio = new Audio()
audio.loop = true // непрерывное воспроизведение

const btns = document.querySelectorAll('.button') // кнопки в одном массиве
const bg = document.querySelector('#bg') // объект для изменения картинки бэкграунда
const vol = document.querySelector('.slider') // ползунок изменения громкости (inpur)
const blur = document.querySelector('#blur') // слой поверх бэкграунда для блура картинки

console.log(btns)

function noiseChange (event) {
  let div // указатель на кликнутый <div> для смены стилей
  let img // указатель на кликнутый <img> для смены иконки
  let season // кликнутое время года
  const targ = event.target // элемент на котором кликнули
  console.log(targ)
  if (targ.id) { // если у элемента есть id - значит это <div>
    div = targ
    img = targ.firstElementChild
  } else {
    div = targ.parentElement
    img = targ
  }
  season = `${div.id}`

  // обработка нажатий
  if (play) { // идет воспроизведение
    if (prevSeason === season) { // нажали ту-же самую кнопку
      blur.classList.add('blur') // добавляем блюр фона
      audio.pause()
      play = false
      img.src = `assets/icons/${season}.svg` // возвращаем иконку времени года
      prevSeason = '' // никакой сезон не выбран
      for (const btn of btns) { // делаем возможным нажатие любых кнопок
        btn.classList.add('rotate')
        btn.classList.remove('opa')
      }
    }
  } else {
    bg.className = season // прописываем класс времени года в бэкграунд
    blur.classList.remove('blur') // добавляем блюр фона
    audio.src = `assets/sounds/${season}.mp3`
    audio.play() // включаем воспроизведение звуков
    img.src = 'assets/icons/pause.svg' // вешаем иконку паузы
    play = true
    prevSeason = season // запоминаем какое время года воспроизводится
    for (const btn of btns) { // запрещаем нажатие всех кнопок
      btn.classList.remove('rotate')
      btn.classList.add('opa')
    }
    div.classList.add('rotate') // разрешаем нажатие npm для нужного сезона
    div.classList.remove('opa')
  }
}

// функция обрабатывающая регулятор громкости
vol.onclick = function (event) {
  audio.volume = +vol.value / 100
}

// вешаем на кнопки обрабочик нажатия
for (const btn of btns) {
  btn.addEventListener('click', noiseChange)
}
