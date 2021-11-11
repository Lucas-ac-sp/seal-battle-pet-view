const BASE_URL = "http://localhost:3000";
const Index_URL = BASE_URL + "/api/fires";
let data = {}
getData()
let level = ''
let spirit = ''
// let phase = '' 
// let conditions = ''
let html = ''
let countHtml = ''
// const a = '幼生期'
// const b = '成長期'
// const c = '茁壯期'
// const d = '終極型態'

const form = document.querySelector('#form')
const KillImage = document.querySelector('.Kill-image')
const levelInput = document.querySelector('#level-input')
const countNode = document.querySelector('.countNode')
let countBox = ''
let remainingCountBox = ''
// let tableRow = ''



async function getData() {
  try {
    
    const get = await axios.get(Index_URL)
    data = (get.data)
    console.log('成功獲得資料')
    
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

function getHtml (spirit) {
  data[spirit].forEach((item, i) => {

    html += `
      <div class="">
        <img class="image"onmouseover="mouse (this, 'block')" onmouseout="mouse (this, 'none')" src=${item['圖片']} alt="技能圖片" data-index="${i}" data-name="${spirit}" data-level="${item['等級']}"></img>
        <div class="jn_txt text-center"><span class="dq_dengji_b">0</span>/<span>${item['limit']}</span></div>

        <div class="skill-z-index" style="display:none">
         <h5 class="d-inline" style="color:#005AB5">${item['名稱']}</h5>
         <h5 class="d-inline ml-1">${item['英文']}</h5>
         <h6 class="mt-2"style="color:#AD5A5A">${item['說明']}</h6>
          
          <table class="tg">
            <thead>
              <tr>
    `
            let keys = Object.keys(item)
            console.log(keys)
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
                    color = 'color:#FFA042'
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
          </table>
          <p>
            <table class="tg">
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
          </p>
        </div>
      </div>
    `
  })
}

function getCount (needCount, action, remainingCount) {
  remainingCount = action === 'add' ? remainingCount - needCount : remainingCount + needCount
  remainingCountBox.textContent = remainingCount
  
  let usedCount = Number(countBox.textContent)
  usedCount = action === 'add' ? usedCount + needCount : usedCount - needCount
  countBox.textContent = usedCount
}

function mouse (node, action) {
  node.nextElementSibling.nextElementSibling.style.display = action
}



form.addEventListener('submit', async (event) => {
  // 防止網頁自動跳轉
  event.preventDefault()
  level = Number(levelInput.value)
  spirit = getCheckedValue('spirit')
  // phase = getCheckedValue('phase')
  // conditions = spirit + phase
  html = ''

  getHtml('基本技能')

  // data['基本技能'].forEach(item => {
  //   html += `
  //     <div class="">
  //       <img src=${item['圖片']} alt=""></img>
  //       <div class="jn_txt text-center"><span class="dq_dengji_b">0</span>/<span>${item['最大等級']}</span></div>
  //     </div>
  //   `
  // })

  getHtml(spirit)

  KillImage.innerHTML = html
  countHtml = ''
  countHtml += `
    <span>已用點數 :</span><span id="count">0</span><span>剩餘點數 :</span><span id="remainingCount">${(level - 1 ) * 3}</span>
  `
  countNode.innerHTML = countHtml
  countBox = document.querySelector('#count')
  remainingCountBox = document.querySelector('#remainingCount')

  // tableRow = document.querySelectorAll('#tableRow')
  
  // tableRow.forEach((row, index) => {
  //   const tableData = row.querySelectorAll('td')
  //   // 優化-只挖出需要的值
  //   const values =  Object.values(data[spirit][index])
    
  //   tableData.forEach((data, i) => {
  //     data.textContent = values[i]
  //   })
  // })

})

KillImage.addEventListener('click', (event) => {
  const target = event.target
  
  if (target.tagName !== 'IMG') return

  const levelBox = target.nextElementSibling.firstElementChild
  let currentLevel = Number(levelBox.textContent)
  const maxLevel = Number(target.nextElementSibling.lastElementChild.textContent)
  
  if (currentLevel < maxLevel) {
    const needLevel = Number(target.dataset.level)
    console.log(level)
    console.log(needLevel)
    if (level < needLevel) return alert(`等級需要 >= ${needLevel}`)

    let remainingCount = Number(remainingCountBox.textContent)
    const spiritName = target.dataset.name
    const skillIndex = Number(target.dataset.index)
    const needCount =  Number(data[spiritName][skillIndex].levels[currentLevel]['點數'])

    if (remainingCount < needCount) return alert(`剩餘點數需要 >= ${needCount}`)

    currentLevel += 1
    levelBox.textContent = currentLevel
    console.log(currentLevel)
  
    getCount (needCount, 'add', remainingCount)
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

    console.log(currentLevel)
    getCount (needCount, 'subtract', remainingCount)

    currentLevel -= 1
    levelBox.textContent = currentLevel
    
    
    
  }
})


