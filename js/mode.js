const toggle = document.getElementById('toggleDark');
const calculator = document.querySelector('.calculator');
const content = document.getElementById('display');

toggle.addEventListener('click', function(){
    this.classList.toggle('bi-moon');
    if(this.classList.toggle('bi-brightness-high-fill')){
        calculator.style.background = 'white';
        toggle.style.color = 'black';
        content.style.color = 'black';
        calculator.style.transition = '1.5s';
    }else {
        calculator.style.background = 'black';
        toggle.style.color = 'white';
        content.style.color = 'white';
        calculator.style.transition = '1.5s';
    }
})