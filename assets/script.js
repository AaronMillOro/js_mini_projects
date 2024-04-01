/* 
Script containing the logic to populate several projects with vanilla HTML, CSS and JavaScript
*/
const BASE_URL = 'https://aaronmilloro.github.io'
const PROJECTS = [
    {   
        'id': 0,
        'name_part1': 'Movie', 
        'name_part2': 'app', 
        'name_part3': 'Api', 
        'image': 'assets/img/movie_app_api.png',
        'url': BASE_URL + '/movie_app_api/',
        'description': 'A JavaScript API that displays the lastest films from the TMDB API. For each film, the following values are displayed: the title, the overview and the score'
    }, 
    {
        'id': 1,
        'name_part1': 'Dad\'s', 
        'name_part2': 'jokes', 
        'name_part3': 'Api', 
        'image': 'assets/img/dad_jokes_api.png',
        'url': BASE_URL + '/dad_jokes_api/',
        'description': 'Javascript API that shows random (silly) jokes from the site icanhazdadjoke'
    }, 
    {
        'id': 2,
        'name_part1': 'JS', 
        'name_part2': 'drawing', 
        'name_part3': 'App', 
        'image': 'assets/img/drawing_app.png',
        'url': BASE_URL + '/drawing_app/',
        'description': 'Application with a canvas space to draws continuous lines with different point sizes and a color picker available'
    }, 
    {
        'id': 3,
        'name_part1': 'Drinking', 
        'name_part2': 'Water', 
        'name_part3': 'App', 
        'image': 'assets/img/drink_water.png',
        'url': BASE_URL + '/drink_water/',
        'description': 'Animation of counting glasses to fill a 2-L water container. The counter is reversible'
    }, 
    {
        'id': 4,
        'name_part1': 'CRUD', 
        'name_part2': 'JavaScript', 
        'name_part3': 'library', 
        'image': 'assets/img/library.png',
        'url': BASE_URL + '/library/',
        'description': 'A custom library based on a list of books. The list that can be modified by adding or by deleting the book'
    }, 
    {
        'id': 5,
        'name_part1': 'Signup', 
        'name_part2': 'webpage', 
        'name_part3': 'form', 
        'image': 'assets/img/signup_form.png',
        'url': BASE_URL + '/signup_form/',
        'description': 'Page layout with a signup form from the ODIN project'
    }, 
    {
        'id': 6, 
        'name_part1': 'Light/dark', 
        'name_part2': 'toggable', 
        'name_part3': 'clock', 
        'image': 'assets/img/toggable_clock.png',
        'url': BASE_URL + '/toggable_clock/',
        'description': 'Application with an analog/digital clock with toggable dark:light layout. The current date is also displayed'
    }, 
]

const menu = document.querySelector('.nav-menu > ul')
const cards = document.querySelector('.cards')
const btnPrev = document.getElementById('prev')
const btnNext = document.getElementById('next')
let currentProj = PROJECTS[0]

populateMainProj(currentProj)

btnNext.addEventListener('click', () => {
    if (currentProj.id < PROJECTS.length-1 ){
        nextProj = PROJECTS[currentProj.id + 1]
        populateMainProj(nextProj)
        currentProj = nextProj
    } else {
        populateMainProj(PROJECTS[0])
        currentProj = PROJECTS[0]
    }
})

btnPrev.addEventListener('click', () => {
    if (currentProj.id === 0){
        currentProj = PROJECTS[PROJECTS.length - 1]
        populateMainProj(currentProj)
    } else {
        prevProj = PROJECTS[currentProj.id - 1]
        populateMainProj(prevProj)
        currentProj = prevProj
    }
})


function populateMainProj(project){
    const titleP1 = document.querySelector('.title-part1')
    const titleP2 = document.querySelector('.title-part2')
    const titleP3 = document.querySelector('.title-part3')
    const img = document.querySelector('.img-main')
    const link = document.querySelector('#main-project > div > a')
    const description = document.querySelector('.description-main')
    titleP1.innerText = project.name_part1
    titleP2.innerText = project.name_part2
    titleP3.innerText = project.name_part3
    link.setAttribute('href', project.url)
    img.setAttribute('src', project.image)
    description.innerText = project.description
}

PROJECTS.forEach(project => {
    const fullTitle = project.name_part1 + ' ' + project.name_part2 + ' ' + project.name_part3
    const menuItem = createMenuItem(project, fullTitle)
    menu.appendChild(menuItem)
    const card = createCard(project, fullTitle)
    cards.appendChild(card)
})


function createMenuItem(project, fullTitle){
    const projectLink = document.createElement('a')
    projectLink.setAttribute('target', '_blank')
    projectLink.setAttribute('href', project.url)
    const menuItem = document.createElement('li')
    projectLink.innerText = fullTitle
    menuItem.classList.add('nav-item')
    menuItem.appendChild(projectLink)
    return menuItem
}


function createCard(project, fullTitle){
    const projectLink = document.createElement('a')
    projectLink.setAttribute('target', '_blank')
    projectLink.setAttribute('href', project.url)
    const cardItem = document.createElement('div')
    const projectImage = document.createElement('img')
    const cardTitle = document.createElement('h3')
    projectImage.setAttribute('src', project.image)
    projectImage.setAttribute('alt', fullTitle)
    cardTitle.innerText = fullTitle
    cardItem.classList.add('card')
    cardItem.appendChild(projectImage)
    cardItem.appendChild(cardTitle)
    projectLink.appendChild(cardItem)
    return projectLink
}
