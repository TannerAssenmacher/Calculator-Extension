const toggle = document.getElementById('theme-toggler')
const body = document.querySelector('body');
// const themeToggleBtn = document.querySelector('.theme-toggler');
// const calculator = document.querySelector('.calculator');


// const toggleIcon = document.querySelector('.toggler-icon');
// let isDark = true;
// themeToggleBtn.onclick = () => {
//     calculator.classList.toggle('dark');
//     themeToggleBtn.classList.toggle('active');
//     isDark = !isDark;
// }

toggle.addEventListner('click', function(){
    this.classList.toggle('far fa-moon');
    if(this.classList.toggle('fas fa-moon')){
        body.style.background = 'white';
        body.style.color = 'black'
        body.style.transition = '1s';
    }else {
        body.style.background = 'black';
        body.style.color = 'white'
        body.style.transition = '1s';
    }
})