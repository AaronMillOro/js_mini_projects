const btnToggle = document.querySelector('#toggle')
const hourElem = document.querySelector('.neddle.hour')
const minutesElem = document.querySelector('.neddle.minute')
const secondElem = document.querySelector('.neddle.second')
const timeElem = document.querySelector('.time')
const dateElem = document.querySelector('.text-date')
const dayNumberElem = document.querySelector('.circle')


const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec' 
]

const days = {
    1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 
    5: 'Friday', 6: 'Saturday', 7:'Sunday'
}


setInterval(setTime, 1000)

btnToggle.addEventListener('click', (e) =>  {
    const html = document.querySelector('html')
    if (html.classList.contains('dark')){
        html.classList.remove('dark') 
        e.target.innerHTML = 'Light mode'   
    } else {
        html.classList.add('dark') 
        e.target.innerHTML = 'Dark mode'
    }
})



function setTime(){
    const time = new Date()
    const hour = time.getHours()
    const ampm = hour >= 12 ? 'PM':'AM'
    const hourForClock = scaleValues(hour % 12, 0, 12, 0, 360)
    const minutes = time.getMinutes()
    const minForClock = scaleValues(minutes, 0, 59, 0, 360)
    const second = scaleValues(time.getSeconds(), 0, 59, 0, 360)
    const day = time.getDay()
    const month = time.getMonth()
    const date = time.getDate()  
    
    hourElem.style.transform = `translate(-50%, -100%) rotate(${hourForClock}deg)`
    minutesElem.style.transform = `translate(-50%, -100%) rotate(${minForClock}deg)`
    secondElem.style.transform = `translate(-50%, -100%) rotate(${second}deg)`
    if (minutes < 10) {
        timeElem.innerText = `${hour}:0${minutes} ${ampm}`
    } else {
        timeElem.innerText = `${hour}:${minutes} ${ampm}`
    }
    dateElem.innerText = `${days[day]}, ${months[month]}`
    dayNumberElem.innerText = date
}


function scaleValues(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}