import './main.css'

const root = document.querySelector('#app')

function renderItem(item, index) {
  const li = document.createElement('li')
  li.textContent = item.title
  if (index % 2 === 0) {
    li.style.color = 'red'
  }
  root.append(li)
}

data.forEach(renderItem)
