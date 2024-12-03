const form = document.querySelector('#convertForm');
const measure = document.querySelector('#measure');
const convertFrom = document.querySelector('#convertFrom');
const convertTo = document.querySelector('#convertTo');
const valueToConvert = document.querySelector('#valueToConvert');

eventListeners();

function eventListeners(){
    measure.addEventListener('change',convertirValor);
    convertFrom.addEventListener('change',convertirValor);
    convertTo.addEventListener('change',convertirValor);
    valueToConvert.addEventListener('input',convertirValor);
}

function convertirValor(){

    

}