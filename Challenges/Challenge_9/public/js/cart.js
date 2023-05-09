const btnSubstract = document.getElementById('btnSubstract');
const btnPlus = document.getElementById('btnPlus');
const counterSpan = document.getElementById('counterSpan');
const stockSpan = document.getElementById('stockSpan');

//console.log(stockSpan.innerText)

let counter = 0;

btnSubstract.addEventListener('click', () => {
    if(stockSpan.innerText <= 0) return null
    counter--;
    counterSpan.innerHTML = counter;
});

btnPlus.addEventListener('click', () => {
    if(stockSpan.innerText <= 0) return null
    counter++;
    counterSpan.innerHTML = counter;
});