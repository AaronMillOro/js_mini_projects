/* 
Script containing the logic to populate several projects with vanilla HTML, CSS and JavaScript
*/
const BASE_URL = 'http://127.0.0.1:5500'
const PROJECTS = [
    {
        'name_part1': 'Movie', 
        'name_part2': 'app', 
        'name_part3': 'Api', 
        'image': 'assets/img/movie_app_api.png',
        'url': BASE_URL + '/movie_app_api/',
        'description': 'A JavaScript API that displays the lastest films from the TMDB API. For each film, the following values are displayed: the title, the overview and the score'
    }, 
    {
        'name_part1': 'Dad\'s', 
        'name_part2': 'jokes', 
        'name_part3': 'Api', 
        'image': 'assets/img/dad_jokes_api.png',
        'url': BASE_URL + '/dad_jokes_api/',
        'description': 'Javascript API that shows random (silly) jokes from the site icanhazdadjoke'
    }, 
    {
        'name_part1': 'JS', 
        'name_part2': 'drawing', 
        'name_part3': 'App', 
        'image': 'assets/img/drawing_app.png',
        'url': BASE_URL + '/drawing_app/',
        'description': 'Application with a canvas space to draws continuous lines with different point sizes and a color picker available'
    }, 
]

const menu = document.querySelector('.nav-menu > ul')
const cards = document.querySelector('.cards')

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