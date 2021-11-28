
const content = document.getElementById('content-div')
const svgdiv = content.getElementsByClassName('wave-trans')


for (var i = 0; i < svgdiv.length; ++i) {
    createbubble(svgdiv[i])
}

function createbubble(item) {
    const size = `${Math.round((randomNum(0.5,2)) * 100) / 100}rem`
    console.log(size)
    const bubblediv = document.createElement('div')
    const bubble = document.createElement('div')
    bubblediv.classList.add('bubble-div')
    bubblediv.style.height = size
    bubblediv.style.width = size
    bubble.classList.add('bubble')
    bubble.style.height = size
    bubble.style.width = size
    bubblediv.appendChild(bubble)
    item.parentNode.insertBefore(bubblediv, item)
}

function randomNum(min, max) {
    return Math.random() * (max - min + 1) + min
}