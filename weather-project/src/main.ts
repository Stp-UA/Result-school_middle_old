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

// функция обрабатывающая регулятор громкости
vol.onclick = function () {
  audio.volume = +vol.value / 100
}

// вешаем на кнопки обрабочик нажатия
btns.forEach(function (btn) {
  let element = btn as HTMLElement
  element.onclick = function (event) {
    let targ = event.target as HTMLElement
    let div: HTMLDivElement // указатель на кликнутый <div> для смены стилей
    let img: HTMLImageElement // указатель на кликнутый <img> для смены иконки
    let season:string // кликнутое время года
    if (targ.id) { // если у элемента есть id - значит это <div>
      div = targ as HTMLDivElement
      img = targ.firstElementChild as HTMLImageElement
    } else {
      div = targ.parentElement as HTMLDivElement
      img = targ as HTMLImageElement
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
        btns.forEach(function (btn) { // делаем возможным нажатие любых кнопок
          let element = btn as HTMLElement
          element.classList.add('rotate')
          element.classList.remove('opa')
        })
      }
    } else {
      bg.className = season // прописываем класс времени года в бэкграунд
      blur.classList.remove('blur') // добавляем блюр фона
      audio.src = `assets/sounds/${season}.mp3`
      audio.play() // включаем воспроизведение звуков
      img.src = 'assets/icons/pause.svg' // вешаем иконку паузы
      play = true
      prevSeason = season // запоминаем какое время года воспроизводится
      btns.forEach(function (btn) { // делаем не возможным нажатие любых кнопок
        let element = btn as HTMLElement
        element.classList.remove('rotate')
        element.classList.add('opa')
      })
    div.classList.add('rotate') // разрешаем нажатие для нужного сезона
    div.classList.remove('opa')
    }
  }
})
