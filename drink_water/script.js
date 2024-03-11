const remained = document.getElementById('remained')
const liters = document.getElementById('liter')
const percentage = document.getElementById('percentage')
const smallCups = document.querySelectorAll('.cup-small')
const totalVol = 2000
const mlPerCup =  totalVol / smallCups.length


smallCups.forEach((cup, idx) => {
    percentage.innerText = ""
    cup.addEventListener('click', () => {
        highlightCUps(idx)
    })
})


function highlightCUps(extIdx) {
    // to toggle the current cup cheking the last cup that has no sibling
    if (smallCups[extIdx].classList.contains('full') && (
        (smallCups[extIdx].nextElementSibling === null) || 
        (!smallCups[extIdx].nextElementSibling.classList.contains('full')))){
        extIdx--
    }

    smallCups.forEach((cup, idx) => {
        if(extIdx >= idx) {
            cup.classList.add('full')
            updateBigCup(idx)
        } else {
            cup.classList.remove('full')
            updateBigCup(extIdx)
        }
    })
}


function calcVolume(idx){
    return ((idx + 1) * mlPerCup)
}


function calcPercentageDrank(idx){
    return (calcVolume(idx) / totalVol ) * 100
}

function formatVolume(vol){
    if (vol >= 1000) {
        return (vol / 1000) + ' L'
    } else {
        return vol + ' mL'
    }
}


function updateBigCup(idx) {
    const drank = calcPercentageDrank(idx)
    percentage.innerText = drank + ' %'
    percentage.style.height = drank + '%'
    liters.innerText = formatVolume(totalVol - calcVolume(idx))
    if (drank === 100) {
        remained.style.height = 0
    } else if (drank === 0){
        percentage.style.height = 0
        percentage.innerText = ''
    } else { }
}