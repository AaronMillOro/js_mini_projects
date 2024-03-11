const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let currentSize = document.getElementById('size')
const increase =  document.getElementById('increase')
const decrease =  document.getElementById('decrease')
const clear =  document.getElementById('clear')
const colorPicker =  document.getElementById('color')

let size = 20   // for draw circle
let isPressed = false
let color = 'black'
let x
let y

decrease.addEventListener('click', (e) => {
    if (parseInt(currentSize.innerText) > 5){
        size = parseInt(currentSize.innerText) - 5
        currentSize.innerText = size
    }
})

increase.addEventListener('click', (e) => {
    if (parseInt(currentSize.innerText) < 50){
        size = parseInt(currentSize.innerText) + 5
        currentSize.innerText = size
    }
})

colorPicker.addEventListener('change', (e) => {
    color = e.target.value
})

clear.addEventListener('click', () => clearSpace())

canvas.addEventListener('mousedown', (e) => {
    isPressed = true
    x = e.offsetX
    y = e.offsetY
})

canvas.addEventListener('mouseup', (e) => {
    isPressed = false
    x = undefined
    y = undefined
})


canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX
        const y2 = e.offsetY

        drawCircle(x2, y2)
        drawLine(x, y, x2, y2) // to fill gaps between points
        x = x2
        y = y2
    }
})

function drawCircle(x, y) {
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2  // to have the same size of the circle
    ctx.stroke()
}

function clearSpace(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    size = 20
    currentSize.innerText = size
    color = 'black'
    colorPicker.value = color
}
