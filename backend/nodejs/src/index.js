
const content = document.getElementById('content-div')
const drinkDivs = content.getElementsByClassName('drink-div')
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
    // console.log(buttons[i])
}
// const buttonDrinkClasses = buttons[0].parentNode.parentNode.className.split(/\s+/)
// console.log(buttonDrinkClasses[buttonDrinkClasses.length - 1])
// $(element).attr("class").split(' ');

// var classList = buttons[0].parentNode.parentNode.className.split(/\s+/);
// for (var i = 0; i < classList.length; i++) {
//     if (classList[i] === 'someClass') {
//         //do something
//     }
// }

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


for (var i = 0; i < drinkDivs.length; ++i) {
    makeBubbles(drinkDivs[i])
}

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
async function fetching() {
await fetch('http://localhost:5000/api/post', postOptions)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))

await fetch('http://localhost:5000/test', getOptions)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}
fetching()
test3()