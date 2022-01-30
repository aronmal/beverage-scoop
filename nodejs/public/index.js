// initialising some things
const headerTemplate = document.getElementById('header-template')
const contentTemplate = document.getElementById('content-template')
const headerTime = document.getElementById('time')
const headerRight = document.getElementById('header-right')
const content = document.getElementById('content-div')

var configData
var newConfigData

// clock function
function clock() {
    var h = new Date().getHours();
    var m = new Date().getMinutes();
    // var s = new Date().getSeconds();

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    // s = s < 10 ? "0" + s : s;

    //If not the same, replace
    if (headerTime.innerHTML !== `${h}:${m}`) {
        headerTime.innerHTML = `${h}:${m}`
    }
}
// execute to display without delay
clock()
// execute every second to refresh in real time 
setInterval(clock, 1000);

async function deleteAll() {
    let items = []

    await fetchLoad()
    console.log('[WARN] Starting to delete drink-divs ...')
    for (var i = 0; i < configData.ids.length; ++i) {
        items.push(document.getElementById(configData.ids[i] + '-header'))
        items.push(document.getElementById(configData.ids[i]))
    }
    for (var i = 0; i < items.length; ++i) {
        items[i].parentNode.removeChild(items[i])
    }
}


async function createDivElements() {
    await fetchLoad()
    console.log('[INFO] Starting to create drink-divs ...')
    for (var i = 0; i < configData.drinks.length; ++i) {
        const drink = configData.drinks[i]
        const headerTemplateClone = headerTemplate.content.cloneNode(true)
        headerRight.insertBefore(headerTemplateClone,headerRight.childNodes[headerRight.childNodes.length-3])
        const headerItems = document.getElementsByClassName('drink-level')
        const headerItem = headerItems[headerItems.length-1]
        headerItem.classList.add(drink.class)
        headerItem.getElementsByClassName('drink-name')[0].innerText = drink.drinkname
        headerItem.getElementsByClassName('level-percent')[0].innerText = drink.level + '%'
        var transformWaveMax
        var transformWaveMin
        var transformWave
        var transformBrandMax
        var transformBrandMin
        var transformBrand
        transformWaveMax = Number(getComputedStyle(headerRight).getPropertyValue('--transform-wave-trans-max'))
        transformWaveMin = Number(getComputedStyle(headerRight).getPropertyValue('--transform-wave-trans-min'))
        transformWave = Math.round((configData.drinks[i].level/100) * (transformWaveMax - transformWaveMin) + transformWaveMin)
        headerItem.style.setProperty('--transform-wave-trans', transformWave + "%")

        const contentTemplateClone = contentTemplate.content.cloneNode(true)
        content.insertBefore(contentTemplateClone,content.childNodes[content.childNodes.length-3])
        const contentItems = document.getElementsByClassName('content-drink')
        const contentItem = contentItems[contentItems.length-1]
        contentItem.classList.add(drink.class)
        contentItem.getElementsByClassName('drink-name')[0].innerText = drink.drinkname
        contentItem.getElementsByClassName('percentage')[0].innerText = drink.percentage + '%'
        transformWaveMax = Number(getComputedStyle(content).getPropertyValue('--transform-wave-trans-max'))
        transformWaveMin = Number(getComputedStyle(content).getPropertyValue('--transform-wave-trans-min'))
        transformWave = Math.round((configData.drinks[i].percentage/100) * (transformWaveMax - transformWaveMin) + transformWaveMin)
        contentItem.style.setProperty('--transform-wave-trans', transformWave + "%")
        transformBrandMax = Number(getComputedStyle(content).getPropertyValue('--transform-brand-name-max'))
        transformBrandMin = Number(getComputedStyle(content).getPropertyValue('--transform-brand-name-min'))
        transformBrand = Math.round(((1-configData.drinks[i].percentage/100) * (transformBrandMax - transformBrandMin) + transformBrandMin))
        contentItem.style.setProperty('--transform-brand-name', transformBrand + "%")
    }
    console.log(`[INFO] All done, ${configData.drinks.length} drinks created!`)
}

function buttonsAddingEventListener() {
    let buttons = []
    const buttonsUp = document.getElementsByClassName('percent-up')
    const buttonsDown = document.getElementsByClassName('percent-down')
    for (var i = 0; i < buttonsUp.length; ++i) {
        buttons.push(buttonsUp[i])
    }
    for (var i = 0; i < buttonsDown.length; ++i) {
        buttons.push(buttonsDown[i])
    }
    for (var i = 0; i < buttons.length; ++i) {
        const aButton = buttons[i]
        buttons[i].addEventListener('click', () => buttonClicked(aButton))
    }
}

async function buttonClicked(theButton) {
    const buttonParentClasses = theButton.parentNode.parentNode.className.split(/\s+/)
    const drink = buttonParentClasses[buttonParentClasses.length - 1]
    const buttonState = theButton.className.split(/\s+/)
    const state = buttonState[buttonState.length - 1]

    var status
    var e
    var diff
    var percentageSum = 0

    await fetchLoad()
    for (var i = 0; i < configData.drinks.length; ++i) {
        if (drink == configData.drinks[i].class) {
            if (state == 'percent-up'){
                e = i
                diff = 5
                status = 'ok'
            } else if (state == 'percent-down') {
                e = i
                diff = -5
                status = 'ok'
            } else {
                errorMessage('Button state (class) not valid... Please Check!')
            }
        }
    }
    if (status == 'ok') {
        newConfigData.drinks[e].percentage = configData.drinks[e].percentage + diff
        for (var i = 0; i < newConfigData.drinks.length; ++i) {
            percentageSum = percentageSum + newConfigData.drinks[i].percentage
        }
        if (newConfigData.drinks[e].percentage < 0) {
            errorMessage('negative number not allowed')
            return displayErrorMessage('Weniger als 0% geht nicht! ;)')
        } else if (percentageSum > 100) {
            errorMessage('over 100%')
            return displayErrorMessage('Alles zusammen ist mehr als 100%!')
        } else {
            await fetchSave()
            const contentItem = document.getElementById(configData.ids[e])
            contentItem.getElementsByClassName('percentage')[0].innerText = configData.drinks[e].percentage + '%'
            var transformWaveMax
            var transformWaveMin
            var transformWave
            var transformBrandMax
            var transformBrandMin
            var transformBrand
            transformWaveMax = Number(getComputedStyle(content).getPropertyValue('--transform-wave-trans-max'))
            transformWaveMin = Number(getComputedStyle(content).getPropertyValue('--transform-wave-trans-min'))
            transformWave = Math.round((configData.drinks[e].percentage/100) * (transformWaveMax - transformWaveMin) + transformWaveMin)
            contentItem.style.setProperty('--transform-wave-trans', transformWave + "%")
            transformBrandMax = Number(getComputedStyle(content).getPropertyValue('--transform-brand-name-max'))
            transformBrandMin = Number(getComputedStyle(content).getPropertyValue('--transform-brand-name-min'))
            transformBrand = Math.round(((1-configData.drinks[e].percentage/100) * (transformBrandMax - transformBrandMin) + transformBrandMin))
            contentItem.style.setProperty('--transform-brand-name', transformBrand + "%")
            console.log(`[All done! ${drink} has ${state}ed and saved]`)
        }
    } else {
        errorMessage('Button drink-name (class) not valid... Please Check!')
    }
}

async function errorMessage(text) {
    console.log('[ERROR] ' + text)
}

function launchBubbles() {
    const drinkDivs = content.getElementsByClassName('drink-div')
    for (var i = 0; i < drinkDivs.length; ++i) {
        makeBubbles(drinkDivs[i])
    }
}
function makeBubbles(item) {
    setInterval(() => {
        const offsetTimout = Math.round(randomNum(0,2000))
        setTimeout(() => createBubble(item), offsetTimout)
    }, 1000);
}
function createBubble(item) {
    const size = `${Math.round((randomNum(0.5,1.5)) * 100) / 100}rem`
    const left = `${Math.round(randomNum(10,90))}%`
    // console.log(left,size)
    const bubblediv = document.createElement('div')
    const bubble = document.createElement('div')
    bubblediv.classList.add('bubble-div')
    bubblediv.style.height = size
    bubblediv.style.width = size
    bubblediv.style.left = left
    bubblediv.style.animation = 'bubblesY 5s linear'
    bubblediv.style.animationFillMode = 'forwards'
    bubble.classList.add('bubble')
    bubble.style.height = size
    bubble.style.width = size
    bubble.style.animation = 'bubblesX .4s ease-in-out alternate infinite'
    bubblediv.appendChild(bubble)
    item.appendChild(bubblediv)
    // item.parentNode.insertBefore(bubblediv, item.nextSibling)
    setTimeout(() => bubblediv.remove(), 5000)
}

function randomNum(min, max) {
    return Math.random() * (max - min + 1) + min
}

async function fetchLoad() {
    const getOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await fetch('/api/get', getOptions)
        .then(res => res.json())
        .then(data => {
            configData = data
            newConfigData = configData
            console.log('[INFO] Received configData')})
        .catch(error => {console.log(error)
            errorMessage('No Connection to Backend/API')
            displayErrorMessage('Fehler beim abrufen der Konfiguration!')})
}
async function fetchSave() {
    const postOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newConfigData)
    }
    await fetch('/api/post', postOptions)
        // .then(res => res.json())
        // .then(data => console.log(data))
        .catch(error => console.log(error))
    fetchLoad()
}

function displayErrorMessage(errorMessage) {
    const p = document.getElementById('message')
    p.innerHTML = errorMessage
    p.style.animation = 'error-message 2s'
    setTimeout (() => {
        p.innerHTML = null
        p.style.animation = null
    }, 2000)
}

async function startup() {
    await createDivElements()
    launchBubbles()
    buttonsAddingEventListener()
}

async function pageRefresh() {
    deleteAll()
    startup()
}

// starting up
startup()