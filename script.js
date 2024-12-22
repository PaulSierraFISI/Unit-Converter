import data from "./data.js"

const measure = document.querySelector('#measure');
const convertFrom = document.querySelector('#convertFrom');
const convertTo = document.querySelector('#convertTo');
const valueToConvert = document.querySelector('#valueToConvert');
const newValue = document.querySelector('#newValue');

eventListeners();

function eventListeners(){
    document.addEventListener('DOMContentLoaded', chargeMeasures);
    measure.addEventListener('change',updateForm);
    convertFrom.addEventListener('change',convertValue);
    convertTo.addEventListener('change',convertValue);
    valueToConvert.addEventListener('input',convertValue);
}

async function chargeMeasures(){    
    try { 
        //Creating measure options         
        for (let e of data){   
            const measureOption = document.createElement("option");
            measureOption.value = e ["key"];
            measureOption.text =  e ["measure"];
            measure.add(measureOption);             
        }
        updateForm();
        newValue.textContent = "0.00"                
    } catch (error) {
        console.log(error);
    }
}

async function updateForm(){
    const selectedMeasure = data.find((e)=>e["key"] === measure.value);    
    populateSelectOptions(convertFrom, selectedMeasure["units"]);
    populateSelectOptions(convertTo, selectedMeasure["units"]);
}

function populateSelectOptions(selectElement, units){
    removeAllChildren(selectElement);
    for (let unit of units){        
        const option = document.createElement("option");
        option.value = unit["value"];
        option.text =  unit["key"];
        selectElement.add(option);
    }
}

function removeAllChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
}

function convertValue(){ 
    const fromUnit = convertFrom.value;
    const toUnit = convertTo.value;
    const input = valueToConvert.value==""? 0 : parseFloat(valueToConvert.value);
    let result;

    //Sended Parameters Validation
    const info = data.find((e)=>e.key==measure.value);    
    let fromUnitObject;
    let toUnitObject;
    if(info!=undefined){         
        fromUnitObject = info["units"].find((e)=>e.value == fromUnit);        
        toUnitObject = info["units"].find((e)=>e.value == toUnit);     

        console.log(fromUnitObject.conversionFactor);
        console.log(toUnitObject.conversionFactor);
        
        if(fromUnitObject == undefined || toUnitObject == undefined){
            throw new Error()
        }
    }else{
        throw new Error()
    }

    if (fromUnit === toUnit) result = input;
    
    switch(measure.value){
        case "0": result = convertTemperature(fromUnit, toUnit, input) ;break; //temperature
        case "1": result = convertWeightOrLenght(fromUnitObject.conversionFactor, toUnitObject.conversionFactor, input);break; //Weight
        case "2": result = convertWeightOrLenght(fromUnitObject.conversionFactor, toUnitObject.conversionFactor, input);break; //Lenght
        default: throw new Error();
    }
        
    newValue.textContent = result;
}

function convertTemperature(fromUnit, toUnit, input){
    let celsiusValue;
    if (fromUnit == "c") {
        celsiusValue = input;        
    } else if (fromUnit == "f") {
        celsiusValue = (input - 32) * 5 / 9;
    } else if (fromUnit == "k") {
        celsiusValue = input - 273.15;
    }
    
    let result;
    if (toUnit == "c") result = celsiusValue;
    if (toUnit == "f") result = celsiusValue * 9 / 5 + 32;
    if (toUnit == "k") result = celsiusValue + 273.15;

    return parseFloat(result);
}


function convertWeightOrLenght(fromUnit, toUnit, input){     
    let referenceUnitValue = input/fromUnit;
    return referenceUnitValue * toUnit;
}



