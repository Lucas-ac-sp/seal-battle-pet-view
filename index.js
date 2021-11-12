const BASE_URL = "http://localhost:3000";
const Index_URL = BASE_URL + "/api/fires";
let data = {}
let level = ''
let spirit = ''
let html = ''
let countHtml = ''
const zero = document.querySelector('#zero')
const one = document.querySelector('#one')
const two = document.querySelector('#two')
const three = document.querySelector('#three')
const four = document.querySelector('#four')
const renderSkill = document.querySelector('#renderSkill')
const spiritColor = document.querySelector('.spiritColor')

const form = document.querySelector('#form')
const KillImage = document.querySelector('#KillImage')
const levelInput = document.querySelector('#level-input')
const countNode = document.querySelector('.countNode')
let countBox = ''
let remainingCountBox = ''

getData()
async function getData() {
  try {
    
    const get = await axios.get(Index_URL)
    data = get.data
    const loading = document.querySelector('.loading')
    loading.classList.remove('text-center');
    loading.style.marginTop = ''
    loading.firstElementChild.classList.remove('spinner-border', 'text-secondary')
    loading.firstElementChild.firstElementChild.classList.remove('visually-hidden')
  } catch (error) {
    console.log('getData', error)
  }
}

function getCheckedValue (inputName) {
  let selectedOption = ""
  document.querySelectorAll(`[name=${inputName}]`).forEach((item) => {
    if(item.checked) {
      selectedOption = item.value
    }
  })
  return selectedOption
}

function getHtml (spirit, index) {
  index.forEach(i => {
    const item = data[spirit][i]

    html += `
      <div class="me-3">
        <img class="img-fluid" onmouseover="mouse (this, 'block')" onmouseout="mouse (this, 'none')" src=${item['圖片']} alt="技能圖片" data-index="${i}" data-name="${spirit}" data-level="${item['等級']}"></img>
        <div class="jn_txt text-center"><span>0</span>/<span>${item['limit']}</span></div>

        <div class="skill-z-index text-center" style="display:none">
         <h5 class="d-inline" style="color:#005AB5">${item['名稱']}</h5>
         <h5 class="d-inline ml-1">${item['英文']}</h5>
         <h6 class="mt-2"style="color:#984B4B">${item['說明']}</h6>
          
          <table class="tg mt-1">
            <thead>
              <tr>
    `
            let keys = Object.keys(item)
            keys = keys.filter(key => {
              return key !== '名稱' && key !== '英文' && key !== '說明' && key !== '圖片' && key !== 'limit' && key !== 'levels'
            })

            keys.forEach(key => {
              html += `
                <th class="tg-abn1"><span style="font-weight:normal;color:#FFF;background-color:#46BDC6">${key}</span></th>
              `
            })
                
    html += `
              </tr>
            </thead>
            <tbody>
              <tr id="tableRow">
    ` 
            keys.forEach(key => {
              if (key === '屬性') {
                const value = item['屬性']
                let color = ''

                switch (value) {
                  case '火':
                    color = 'color:#FF0000'
                    break
                  case '光':
                    color = 'color:#FF8000'
                    break
                  case '水':
                    color = 'color:#005AB5'
                    break
                  case '闇':
                    color = 'color:#272727'
                    break
                }

                html += `
                  <td class="tg-4bam"><span style="font-weight:normal;background-color:#FFF;${color}">${item[key]}</span></td>
                `
              } else {
                html += `
                  <td class="tg-4bam"><span style="font-weight:normal;background-color:#FFF">${item[key]}</span></td>
                `
              }
            })
                
    html += `      
              </tr>
            </tbody>
          </table 
          <div>
            <table class="tg mt-3">
              <thead>
                <tr>
    `
              const levelKeys = Object.keys(item.levels[0])
              levelKeys.forEach(key => {
                html += `
                  <th class="tg-c7yp"><span style="font-weight:normal;background-color:#FFF9CE">${key}</span></th>
                `
              })
 
    html += `
                </tr>
              </thead>
              <tbody>
    `
            item.levels.forEach(level => {
              html += `
                <tr>
              `
          levelKeys.forEach(key => {
              if (key === 'AP') {
                html += `
                  <td class="tg-f4yw"><span style="font-weight:normal;background-color:#FFF">${level[key] / 2}</span></td>
                `
              } else  {
                html += `
                  <td class="tg-f4yw"><span style="font-weight:normal;background-color:#FFF">${level[key]}</span></td>
                `
              }
            })

              html += `
                <tr>
              `
          })

    html += `
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `
  })
}

function getCount (needCount, action, remainingCount) {
  remainingCount = action === 'plus' ? remainingCount - needCount : remainingCount + needCount
  remainingCountBox.textContent = remainingCount
  
  let usedCount = Number(countBox.textContent)
  usedCount = action === 'plus' ? usedCount + needCount : usedCount - needCount
  countBox.textContent = usedCount
}

function mouse (node, action) {
  node.nextElementSibling.nextElementSibling.style.display = action
}

form.addEventListener('submit', async (event) => {
  // 防止網頁自動跳轉
  event.preventDefault()
  spirit = getCheckedValue('spirit')
  if (!spirit) return alert('請選擇一個戰鬥寵物')
 
  level = Number(levelInput.value)
  
  html = ''
  getHtml('基本技能', [0, 1, 2, 3, 4 , 5, 6])
  zero.innerHTML = html

  html = ''
  getHtml(spirit, [0, 1, 2])
  one.innerHTML = html

  html = ''
  getHtml(spirit, [3, 4])
  two.innerHTML = html

  html = ''
  getHtml(spirit, [5, 6])
  three.innerHTML = html

  html = ''
  getHtml(spirit, [7])
  four.innerHTML = html

  countHtml = ''
  countHtml += `
    <span>使用 : </span><span class="me-2" id="count" style="color: #007979">0</span><span>剩餘 : </span><span id="remainingCount" style="color: #EA0000">${(level - 1 ) * 3}</span>
  `
  countNode.innerHTML = countHtml

  countBox = document.querySelector('#count')
  remainingCountBox = document.querySelector('#remainingCount')

  let color = ''
  switch (spirit) {
    case '火之精靈':
      color = '#FF0000'
      break
    case '光之精靈':
      color = '#FF8000'
      break
    case '黑暗精靈':
      color = '#272727'
      break
    case '水之精靈':
      color = '#005AB5'
      break
  }
  spiritColor.textContent = spirit
  spiritColor.style.color = color
  renderSkill.style.display = ''
})

KillImage.addEventListener('click', (event) => {
  const target = event.target
  
  if (target.tagName !== 'IMG') return

  const levelBox = target.nextElementSibling.firstElementChild
  let currentLevel = Number(levelBox.textContent)
  const maxLevel = Number(target.nextElementSibling.lastElementChild.textContent)
  
  if (currentLevel < maxLevel) {
    const needLevel = Number(target.dataset.level)

    if (level < needLevel) return alert(`戰寵等級需要 >= ${needLevel}`)

    let remainingCount = Number(remainingCountBox.textContent)
    const spiritName = target.dataset.name
    const skillIndex = Number(target.dataset.index)
    const needCount =  Number(data[spiritName][skillIndex].levels[currentLevel]['點數'])

    if (remainingCount < needCount) return alert(`必要點數 : ${needCount}  剩餘點數 : ${remainingCount}`)

    currentLevel += 1
    levelBox.textContent = currentLevel

    getCount (needCount, 'plus', remainingCount)
  }
})

KillImage.addEventListener('contextmenu', (event) => {
  const target = event.target
  
  if (target.tagName !== 'IMG') return 

  const levelBox = target.nextElementSibling.firstElementChild
  let currentLevel = Number(levelBox.textContent)
  
  if (currentLevel === 0) {
    return event.preventDefault()
  } else {
    event.preventDefault()
    let remainingCount = Number(remainingCountBox.textContent)
    const spiritName = target.dataset.name
    const skillIndex = Number(target.dataset.index)
    const needCount =  Number(data[spiritName][skillIndex].levels[currentLevel - 1]['點數'])

    getCount (needCount, 'minus', remainingCount)

    currentLevel -= 1
    levelBox.textContent = currentLevel
  }
})
