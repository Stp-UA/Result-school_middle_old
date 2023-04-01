import './clear.css'
import './main.css'
import './slider.css'
import './decoration.css'

let play:boolean = false // воспроизводится ли сейчас музыка?
let prevSeason:string = '' // предыдущее состояние нажатой кнопки (было выбрано время года)

const audio:HTMLAudioElement = new Audio()
audio.loop = true // непрерывное воспроизведение

const btns = document.querySelectorAll('.button') as NodeList // кнопки в одном массиве
const bg = document.querySelector('#bg') as HTMLDivElement // объект для изменения картинки бэкграунда
const vol = document.querySelector('.slider') as HTMLInputElement // ползунок изменения громкости (inpur)
const blur = document.querySelector('#blur') as HTMLDivElement // слой поверх бэкграунда для блюра картинки

function noiseChange(event:HTMLElement):void {
  let div: HTMLDivElement // указатель на кликнутый <div> для смены стилей
  let img: HTMLImageElement // указатель на кликнутый <img> для смены иконки
  let season:string // кликнутое время года
  const targ:HTMLDivElement | HTMLImageElement = event.target // элемент на котором кликнули
  console.log(targ)
  if (targ.id) { // если у элемента есть id - значит это <div>
    div = targ
    img = targ.firstElementChild
  } else {
    div = targ.parentElement
    img = targ
  }
  season = `${div.id}`  //eslint-disable-line

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
    div.classList.add('rotate') // разрешаем нажатие для нужного сезона
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
