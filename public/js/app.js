console.log('Javascript loaded successfully')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const paragraph1 = document.querySelector('#result')
const paragraph2 = document.querySelector('#result2')

weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()
    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            paragraph1.textContent = data.error
            paragraph2.textContent = ''
        }else{
            paragraph1.textContent = data.address
            paragraph2.textContent = data.forecast
        }
    })
})
})