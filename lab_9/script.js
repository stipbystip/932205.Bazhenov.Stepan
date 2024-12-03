"use strict"


const numbersInputBox = document.querySelector(".numbersInputContainer__numbers") // окно, в котором происходит ввод чисел и знаков
const allButtons = document.querySelectorAll(".buttonsContainer__button") // все кнопки
const numBtns = document.querySelectorAll("[number-btn-id]") // кнопки с числами
const signBtns = document.querySelectorAll("[sign-btn-id]") // кнопки с математическими знаками
const controlBtns = document.querySelectorAll("[control-btn-id]") // кнопки удаления и получения результата


document.querySelectorAll('.buttonsContainer__button').forEach(button => {
    button.addEventListener('click', function (e) {
        // Создаем элемент волны
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        // Вычисляем позицию нажатия
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        // Добавляем волну и удаляем ее после анимации
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600); // Время должно совпадать с duration анимации
    });
});


function getLastInputElementType() {
    const elementsString = numbersInputBox.textContent
    const elementsArray = elementsString.split(" ")
    const lastIndex = elementsArray.length - 1
    const lastElement = elementsArray[lastIndex]

    if (lastElement.slice(-1) === ".") {
        return ("NaN")
    }
    
    for (let i = 0; i < lastElement.length; i++) {
        if (lastElement[i] === ".") {
            return ("float")
        }
    }

    // определяем тип данных последнего элемента, конвертируем в нужный тип данных и возвращаем
    const lastElementInteger = parseInt(lastElement)

    if (isNaN(lastElementInteger)) {
        const lastElementFloat = parseFloat(lastElement)
        if (isNaN(lastElementFloat)) {
            // console.log("NaN")
            return ("NaN")
        }
        else {
            // console.log("float")
            return ("float")
        }
    }
    else {
        // console.log("int")
        return ("int")
    }
}


function deleteLastInputElement () {
    let elementsString = numbersInputBox.textContent
    const elementsArray = elementsString.split(" ") // convert to array from string
    let lastElement = elementsArray[elementsArray.length - 1] // last string 

    if (lastElement === "") {
        elementsArray.pop() // delete blank element
        elementsArray.pop() // delete sign
    }
    else {
        lastElement = lastElement.split("") // преобразуем строку в массив char ов
        lastElement.pop() // delete last element
        lastElement = lastElement.join("") // convert backwards

        elementsArray.pop()
        elementsArray.push(lastElement) // add edited string
    }
    

    elementsString = elementsArray.join(" ") // convert back to string from array of elements
    numbersInputBox.textContent = elementsString
}


function calculate () {
    let elementsString = numbersInputBox.textContent
    const elementsArray = elementsString.split(" ")


    function checkForImportantSigns () { // важные знаки это умножение и деление
        for (let i = 0; i < elementsArray.length; i++) {
            if (elementsArray[i] === "*" || elementsArray[i] === "/") {
                return true
            }
        }

        return false
    }


    function checkForLessImportantSigns () { // сложение вычитание
        for (let i = 0; i < elementsArray.length; i++) {
            if (elementsArray[i] === "+" || elementsArray[i] === "-") {
                return true
            }
        }

        return false
    }


    function getNumberType (number) {
        for (let i = 0; i < number.length; i++) {
            if (number[i] === ".") {
                return ("float")
            }
        }
    
        return ("int")
    }


    // сначала выполняем все важные операции - операции уумножения и деления 
    for (let i = 0; checkForImportantSigns() === true; i++) { // цикл будет итерироваться пока в numbersInputBox находятся важные знаки
        if (elementsArray[i] === "*" || elementsArray[i] === "/") { // ищем самые важные операции
            if (elementsArray[i] === "*") {

                let firstNum = elementsArray[i - 1] // первый множитель
                if (getNumberType(firstNum) === "float") { // преобразуем в нужный тип 
                    firstNum = parseFloat(firstNum)
                } else {
                    firstNum = parseInt(firstNum)
                }

                let secondNum = elementsArray[i + 1] // второй множитель
                if (getNumberType(secondNum) === "float") { // преобразуем в нужный тип 
                    secondNum = parseFloat(secondNum)
                } else {
                    secondNum = parseInt(secondNum)
                }

                let result = firstNum * secondNum // результат умножения

                elementsArray[i - 1] = result // записываем результат в массив
                elementsArray.splice(i, 2) // удаляем лишние старые элементы массива
            }
            if (elementsArray[i] === "/") {

                let firstNum = elementsArray[i - 1] // первый множитель
                if (getNumberType(firstNum) === "float") { // преобразуем в нужный тип 
                    firstNum = parseFloat(firstNum)
                } else {
                    firstNum = parseInt(firstNum)
                }
                
                let secondNum = elementsArray[i + 1] // второй множитель
                if (getNumberType(secondNum) === "float") { // преобразуем в нужный тип 
                    secondNum = parseFloat(secondNum)
                } else {
                    secondNum = parseInt(secondNum)
                }

                let result = firstNum / secondNum // результат деления

                elementsArray[i - 1] = result // записываем результат в массив
                elementsArray.splice(i, 2) // удаляем лишние старые элементы массива
            }
        }

        if (i === elementsArray.length) { // если итератор доходит до конца массива, то обновляем итератор и начинаем сначала
            i = 0
        }
    }

    // выполняем операции сложения и вычитания 
    for (let i = 0; checkForLessImportantSigns() === true; i++) {

        if (elementsArray[i] === "+" || elementsArray[i] === "-") { 
            if (elementsArray[i] === "+") {
                let firstNum = elementsArray[i - 1]
                if (getNumberType(firstNum) === "float") { // преобразуем в нужный тип 
                    firstNum = parseFloat(firstNum)
                } else {
                    firstNum = parseInt(firstNum)
                }
                
                let secondNum = elementsArray[i + 1]
                if (getNumberType(secondNum) === "float") { // преобразуем в нужный тип 
                    secondNum = parseFloat(secondNum)
                } else {
                    secondNum = parseInt(secondNum)
                }
                
                let result = firstNum + secondNum 

                elementsArray[i - 1] = result
                elementsArray.splice(i, 2)
            }
            if (elementsArray[i] === "-") {
                let firstNum = parseInt(elementsArray[i - 1])
                if (getNumberType(firstNum) === "float") { // преобразуем в нужный тип 
                    firstNum = parseFloat(firstNum)
                } else {
                    firstNum = parseInt(firstNum)
                }

                let secondNum = parseInt(elementsArray[i + 1]) 
                if (getNumberType(secondNum) === "float") { // преобразуем в нужный тип 
                    secondNum = parseFloat(secondNum)
                } else {
                    secondNum = parseInt(secondNum)
                }

                let result = firstNum - secondNum

                elementsArray[i - 1] = result
                elementsArray.splice(i, 2) 
            }
        }

        if (i === elementsArray.length) { // если итератор доходит до конца массива, то обновляем итератор и начинаем сначала
            i = 0
        }
        
    }

    elementsString = elementsArray.join(" ")
    numbersInputBox.textContent = elementsString
}


numBtns.forEach(btn => {
    const number = btn.getAttribute("number-btn-id")
    btn.addEventListener("click", () => {
        numbersInputBox.textContent = numbersInputBox.textContent + number
    })
})


signBtns.forEach(btn => {
    const sign = btn.getAttribute("sign-btn-id")
    btn.addEventListener("click", () => {

        const lastInputElementType = getLastInputElementType()
        if (sign === "divide" && lastInputElementType !== "NaN") {
            numbersInputBox.textContent = numbersInputBox.textContent + " / "
        }
        else if (sign === "multiply" && lastInputElementType !== "NaN") {
            numbersInputBox.textContent = numbersInputBox.textContent + " * "
        }
        else if (sign === "plus" && lastInputElementType !== "NaN") {
            numbersInputBox.textContent = numbersInputBox.textContent + " + "
        }
        else if (sign === "minus" && lastInputElementType !== "NaN") {
            numbersInputBox.textContent = numbersInputBox.textContent + " - "
        }
        else if (sign === "dot" && lastInputElementType === "int") {
            numbersInputBox.textContent = numbersInputBox.textContent + "."
        }
    })
})


controlBtns.forEach(btn => {
    const operationType = btn.getAttribute("control-btn-id")
    btn.addEventListener("click", () => {
        if (operationType === "clear") {
            deleteLastInputElement()
        }
        else if (operationType === "clearAll") {
            numbersInputBox.textContent = ""
        }
        else if (operationType === "result") {
            calculate()
        }
    })
})
































