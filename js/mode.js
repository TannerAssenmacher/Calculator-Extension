const toggle = document.getElementById('toggleDark');
const calculator = document.querySelector('.calculator');
const content = document.getElementById('display');

toggle.addEventListener('click', function()
{
    this.classList.toggle('bi-moon');
    if(this.classList.toggle('bi-brightness-high-fill'))
    {
        calculator.style.background = 'white';
        toggle.style.color = '#FF5F1F';
        content.style.color = 'black';
        calculator.style.transition = '1.5s';
    }
    else 
    {
        calculator.style.background = 'black';
        toggle.style.color = '#FF5F1F';
        content.style.color = 'white';
        calculator.style.transition = '1.5s';
    }
})