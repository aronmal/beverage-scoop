
const content = document.getElementById('content-div')
const svgdiv = content.getElementsByClassName('wave-trans')


for (var i = 0; i < svgdiv.length; ++i) {
    makeBubbles(svgdiv[i])
}

async function makeBubbles(item) {
    console.log(offsetInterval)
    setInterval(() => {
        const offsetTimout = Math.round(randomNum(0,5000))
        setTimeout(() => createBubble(item), offsetTimout)
    }, 5000);
}

function createBubble(item) {
    const size = `${Math.round((randomNum(0.5,2)) * 100) / 100}rem`
    const left = `${Math.round(randomNum(10,90))}%`
    console.log(size)
    console.log(left)
    const bubblediv = document.createElement('div')
    const bubble = document.createElement('div')
    bubblediv.classList.add('bubble-div')
    bubblediv.style.height = size
    bubblediv.style.width = size
    bubblediv.style.left = left
    bubble.classList.add('bubble')
    bubble.style.height = size
    bubble.style.width = size
    bubblediv.appendChild(bubble)
    item.parentNode.insertBefore(bubblediv, item)
    setTimeout(() => bubblediv.remove(), 6000)
}

function randomNum(min, max) {
    return Math.random() * (max - min + 1) + min
}