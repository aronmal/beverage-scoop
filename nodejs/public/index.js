
const headerTemplate = document.getElementById('header-template')
const contentTemplate = document.getElementById('content-template')
const headerTime = document.getElementById('time')
const headerRight = document.getElementById('header-right')
const content = document.getElementById('content-div')

var configData

function clock() {
    var h = new Date().getHours();
    var m = new Date().getMinutes();
    // var s = new Date().getSeconds();

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    // s = s < 10 ? "0" + s : s;

    if (headerTime.innerHTML !== `${h}:${m}`) {
        headerTime.innerHTML = `${h}:${m}`
    }
}

clock()
setInterval(clock(), 1000);



// const drinkDivs = content.getElementsByClassName('drink-div')
// let buttons = []
// const buttonsUp = document.getElementsByClassName('percent-up')
// const buttonsDown = document.getElementsByClassName('percent-down')
// for (var i = 0; i < buttonsUp.length; ++i) {
//     buttons.push(buttonsUp[i])
// }
// for (var i = 0; i < buttonsDown.length; ++i) {
//     buttons.push(buttonsDown[i])
// }
// for (var i = 0; i < buttons.length; ++i) {
//     // console.log(buttons[i])
// }
// const buttonDrinkClasses = buttons[0].parentNode.parentNode.className.split(/\s+/)
// console.log(buttonDrinkClasses[buttonDrinkClasses.length - 1])
// $(element).attr("class").split(' ');

// var classList = buttons[0].parentNode.parentNode.className.split(/\s+/);
// for (var i = 0; i < classList.length; i++) {
//     if (classList[i] === 'someClass') {
//         //do something
//     }
// }


async function createDivElements() {

    await fetchLoad()
    console.log('Starting to create drink-divs ...')
    for (var i = 0; i < configData[0].drinks.length; ++i) {
        const drink = configData[0].drinks[i]
        const id = configData[0].ids[i]
        const headerId = id + '-header'
        const headerTemplateClone = headerTemplate.content.cloneNode(true)
        headerRight.appendChild(headerTemplateClone)
        const headerUnassigned = document.getElementById('header-template-unassigned')
        headerUnassigned.id = (headerId)
        const headerItem = document.getElementById(headerId)
        headerItem.classList.add(drink.class)
        headerItem.getElementsByClassName('drink-name')[0].innerText = drink.drinkname
        headerItem.getElementsByClassName('level-percent')[0].innerText = drink.level + '%'

        const contentTemplateClone = contentTemplate.content.cloneNode(true)
        content.appendChild(contentTemplateClone)
        const contentUnassigned = document.getElementById('content-template-unassigned')
        contentUnassigned.id = (id)
        const contentItem = document.getElementById(id)
        contentItem.classList.add(drink.class)
        contentItem.getElementsByClassName('drink-name')[0].innerText = drink.drinkname
        contentItem.getElementsByClassName('percentage')[0].innerText = drink.percentage + '%'
        console.log(`#${id} ${drink.drinkname} created`)
    }
    console.log(`All done! ${configData[0].drinks.length} created`)
}





function test3() {
    if (true) {
        buttons[0].addEventListener('click', e => {
            console.log('clicked1')
        })
        buttons[1].addEventListener('click', e => {
            console.log('clicked2')
        })
    }
    console.log('something')
}


// for (var i = 0; i < drinkDivs.length; ++i) {
//     makeBubbles(drinkDivs[i])
// }

async function makeBubbles(item) {
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

const data = [{"drinkname":"Fanta","class":"fanta","level":50,"percentage":20}]
const postOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
}
const getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}
async function fetchLoad() {
await fetch('/api/test', getOptions)
    .then(res => res.json())
    .then(data => {configData = data; console.log(configData)})
    .catch(error => console.log(error))

}
async function fetchSave() {
    fetch('/api/post', postOptions)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    fetchLoad()
}

createDivElements()