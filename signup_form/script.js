const pass1 = document.getElementById('password')
const pass2 = document.getElementById('confirm-password')
const errorMsg = document.querySelector('.error-msg')

pass1.addEventListener('input', verify_password)
pass2.addEventListener('input', verify_password)

function verify_password() {
    if (pass1.value !== "" && pass2.value !== "") {
        if (pass1.value === pass2.value) {
            pass1.classList.remove('error')
            pass2.classList.remove('error')
            errorMsg.innerText = ''
        } else {
            pass1.classList.add('error')
            pass2.classList.add('error')
            errorMsg.innerText = '* Passwords do not match'
        }
    } 
}