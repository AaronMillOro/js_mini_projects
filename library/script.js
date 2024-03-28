const btnAdd = document.getElementById('btn-add')
const btnConfirm = document.getElementById('btn-add-confirm')
const dialog = document.querySelector('dialog')

btnAdd.addEventListener('click', () => {
    dialog.showModal()
})

