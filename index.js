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
        <div class="jn_txt text-center"><span class="dq_dengji_b">0</span>/<span>${item['最大等級']}</span></div>


        <div class="skill-z-index" style="display:none">
          <table class="tg">
            <thead>
              <tr>
                <th class="tg-abn1"><span style="font-weight:normal;color:#FFF;background-color:#46BDC6">名稱</span></th>
                <th class="tg-abn1"><span style="font-weight:normal;color:#FFF;background-color:#46BDC6">等級</span></th>
                <th class="tg-abn1"><span style="font-weight:normal;color:#FFF;background-color:#46BDC6">階段</span></th>
                <th class="tg-abn1"><span style="font-weight:normal;color:#FFF;background-color:#46BDC6">類型</span></th>
                <th class="tg-abn1"><span style="font-weight:normal;color:#FFF;background-color:#46BDC6">對象</span></th>
                <th class="tg-abn1"><span style="font-weight:normal;color:#FFF;background-color:#46BDC6">屬性</span></th>
                <th class="tg-abn1"><span style="font-weight:normal;color:#FFF;background-color:#46BDC6">說明</span></th>
                <th class="tg-abn1"><span style="font-weight:normal;color:#FFF;background-color:#46BDC6">距離/範圍</span></th>
                <th class="tg-abn1"><span style="font-weight:normal;color:#FFF;background-color:#46BDC6">持續</span></th>
                <th class="tg-abn1"><span style="font-weight:normal;color:#FFF;background-color:#46BDC6">冷卻</span></th>
              </tr>
            </thead>
            <tbody>
              <tr id="tableRow">
                <td class="tg-4bam"><span style="font-weight:normal;background-color:#FFF">${item['名稱']}</span></td>
                <td class="tg-4bam"><span style="font-weight:normal;background-color:#FFF">${item['等級']}</span></td>
                <td class="tg-4bam"><span style="font-weight:normal;background-color:#FFF">${item['階段']}</span></td>
                <td class="tg-4bam"><span style="font-weight:normal;background-color:#FFF">${item['類型']}</span></td>
                <td class="tg-4bam"><span style="font-weight:normal;background-color:#FFF">${item['對象']}</span></td>
                <td class="tg-onj3"><span style="font-weight:normal;color:#999;background-color:#FFF">${item['屬性']}</span></td>
                <td class="tg-4bam"><span style="font-weight:normal;background-color:#FFF">${item['說明']}</span></td>
                <td class="tg-4bam"><span style="font-weight:normal;background-color:#FFF">${item['距離/範圍']}</span></td>
                <td class="tg-4bam"><span style="font-weight:normal;background-color:#FFF">${item['持續']}</span></td>
                <td class="tg-4bam"><span style="font-weight:normal;background-color:#FFF">${item['冷卻']}</span></td>
              </tr>
            </tbody>
          </table>
          <p>
            <table class="tg">
              <thead>
                <tr>
                  <th class="tg-c7yp"><span style="font-weight:normal;background-color:#FFF9CE">等級</span></th>
                  <th class="tg-c7yp"><span style="font-weight:normal;background-color:#FFF9CE">點數</span></th>
                  <th class="tg-c7yp"><span style="font-weight:normal;background-color:#FFF9CE">AP</span></th>
                  <th class="tg-c7yp"><span style="font-weight:normal;background-color:#FFF9CE">傷害/增益</span></th>
                  
                  <th class="tg-c7yp"><span style="font-weight:normal;background-color:#FFF9CE">持續時間</span></th>
                  <th class="tg-c7yp"><span style="font-weight:normal;background-color:#FFF9CE">冷卻時間(集中滿)</span></th>
                  <th class="tg-c7yp"><span style="font-weight:normal;background-color:#FFF9CE">傷害值/效果值</span></th>
                </tr>
              </thead>
              <tbody>
    `
    item.levels.forEach(level => {
      const ap = level['AP消耗'] ? level['AP消耗'] / 2 : ''

      html += `
        <tr>
          <td class="tg-f4yw"><span style="font-weight:normal;background-color:#FFF">${level['技能等級']}</span></td>
          <td class="tg-f4yw"><span style="font-weight:normal;background-color:#FFF">${level['技能點數']}</span></td>
          <td class="tg-f4yw"><span style="font-weight:normal;background-color:#FFF">${ap}</span></td>
          <td class="tg-f4yw"><span style="font-weight:normal;background-color:#FFF">${level['距離範圍']}</span></td>
          <td class="tg-f4yw"><span>${level['持續時間']}</span></td>
          <td class="tg-f4yw"><span style="font-weight:normal;background-color:#FFF">${level['冷卻時間(集中滿)']}</span></td>
          <td class="tg-f4yw"><span style="font-weight:normal;background-color:#FFF">${level['傷害值/效果值']}</span></td>
        </tr>
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
    const needCount =  Number(data[spiritName][skillIndex].levels[currentLevel]['技能點數'])

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
    const needCount =  Number(data[spiritName][skillIndex].levels[currentLevel - 1]['技能點數'])

    console.log(currentLevel)
    getCount (needCount, 'subtract', remainingCount)

    currentLevel -= 1
    levelBox.textContent = currentLevel
    
    
    
  }
})


