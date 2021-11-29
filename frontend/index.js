
const content = document.getElementById('content-div')
const svgdiv = content.getElementsByClassName('wave-trans')


for (var i = 0; i < svgdiv.length; ++i) {
    makeBubbles(svgdiv[i])
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
    console.log(left,size)
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
    item.parentNode.insertBefore(bubblediv, item)
    setTimeout(() => bubblediv.remove(), 5000)
}

function randomNum(min, max) {
    return Math.random() * (max - min + 1) + min
}