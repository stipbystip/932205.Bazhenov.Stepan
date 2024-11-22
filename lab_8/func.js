"use strict"

const initialItem = document.querySelector(".list__itemsContainer__initialItem")
const itemsContainer = document.getElementById("itemsContainer")
const addItemBtn = document.getElementById("addItemBtn")
const saveBtn = document.getElementById("saveBtn")

const data = [
    ["первый", "123"],
    ["второй", "456"],
    ["третий", "789"],
    ["четвертый", "012"],
    ["пятый", "345"],
    ["шестой", "678"],
    ["седьмой", "901"]
]

function swapItemsStandart(node1, node2) { // первый элемент меняется местами со вторым 
    node1.parentNode.replaceChild(node1, node2);
    node1.parentNode.insertBefore(node2, node1); 
}

function itemsListEmptynessCheck() {
    const items = itemsContainer.querySelectorAll(".list__itemsContainer__item")


    if (items.length === 0) {
        initialItem.style.display = "none"
        itemsContainer.appendChild(initialItem)
        $(".list__itemsContainer__initialItem").fadeIn(100)
        return true
    }
}

function listHeightAnimation(animationType) {
    return new Promise(function(resolve, reject) {
        const itemsAmount = itemsContainer.children.length

        if (itemsAmount === 0) {
            resolve()
        }
        else {

            if (animationType === "grow") {
                let heightChange = 0
    
                const currentHeight = itemsContainer.offsetHeight
                const heightGrowGoal = 40 + currentHeight
        
                const interval = setInterval(() => {
                    heightChange = heightChange + 2
                    const newHeight = currentHeight + heightChange

                    itemsContainer.style.height = newHeight + "px"
        
                    if(newHeight > heightGrowGoal) {
                        itemsContainer.style.height = heightGrowGoal + "px"

                        resolve()
                        clearInterval(interval)
                    }
        
                    
                }, 10)
            } 

            else if (animationType === "reduction") {
                let heightChange = 0
    
                const currentHeight = itemsContainer.offsetHeight
                const heightReductionGoal = currentHeight - 40
            
                const interval = setInterval(() => {
                    heightChange = heightChange + 2
                    const newHeight = currentHeight - heightChange

                    itemsContainer.style.height = newHeight + "px"
            
                    if(newHeight < heightReductionGoal) {
                        itemsContainer.style.height = heightReductionGoal + "px"
                        resolve()
                        clearInterval(interval)
                    }
            
                    
                }, 10)
            }
        }
    })
}

function itemOpacityAnimation(item, animationType) {

    return new Promise(function(resolve, reject) {

        if (animationType === "grow") {
            const currentOpacity = 0
            const opacityGoal = 1
            let opacityChange = 0
        
            const interval = setInterval(() => {
                opacityChange = opacityChange + 0.03
                let newOpacity = currentOpacity + opacityChange
                item.style.opacity = newOpacity
        
                if(newOpacity > opacityGoal) {
                    
                    item.style.opacity = 1
                    clearInterval(interval)
                    resolve()
                }
        
            }, 10)
        }
    
        else if (animationType === "reduction") {
            const currentOpacity = 1
            const opacityGoal = 0
            let opacityChange = 0
        
            const interval = setInterval(() => {
                opacityChange = opacityChange + 0.03
                let newOpacity = currentOpacity - opacityChange
                item.style.opacity = newOpacity
        
                if(newOpacity < opacityGoal) {
                    item.style.opacity = 0
                    clearInterval(interval)
                    resolve()
                }
        
            }, 10)
        }
    })
}

function swapItems(item, swapDirection) {
    if (swapDirection === "top") {

        const topBlankItem = document.createElement("div")
        topBlankItem.classList.add("list__itemsContainer__item__blankItem")

        const bottomBlankItem = document.createElement("div")
        bottomBlankItem.classList.add("list__itemsContainer__item__blankItem")
        bottomBlankItem.style.height = "0"

        const itemAbove = item.previousElementSibling // элемент (сверху) с которым будет меняться местами выбранный элемент
        itemOpacityAnimation(itemAbove, "reduction").then( () => {
            swapItemsAnimation(item, topBlankItem, bottomBlankItem, itemAbove, swapDirection).then(() => {
                itemsContainer.removeChild(topBlankItem)
                itemsContainer.replaceChild(itemAbove, bottomBlankItem)
                itemOpacityAnimation(itemAbove, "grow")
            })
        })

    }

    else if (swapDirection === "bottom") {
        const topBlankItem = document.createElement("div")
        topBlankItem.classList.add("list__itemsContainer__item__blankItem")
        topBlankItem.style.height = "0"

        const bottomBlankItem = document.createElement("div")
        bottomBlankItem.classList.add("list__itemsContainer__item__blankItem")

        const itemBelow = item.nextElementSibling // элемент (снизу) с которым будет меняться местами выбранный элемент
        itemOpacityAnimation(itemBelow, "reduction").then( () => {
            swapItemsAnimation(item, topBlankItem, bottomBlankItem, itemBelow, swapDirection).then(() => {
                itemsContainer.removeChild(bottomBlankItem)
                itemsContainer.replaceChild(itemBelow, topBlankItem)
                itemOpacityAnimation(itemBelow, "grow")
            })
        })
    }
}

function swapItemsAnimation (item, topBlankItem, bottomBlankItem, neighbourItem, animationType) {

    if (animationType === "top") {
        return new Promise(function(resolve, reject) {
            itemsContainer.replaceChild(topBlankItem, neighbourItem)
            item.insertAdjacentElement("afterend",bottomBlankItem);

            let currentBottomBlankItemHeight = 0
            let currentTopBlankItemHeight = 40
            let heightChange = 0

            const interval = setInterval(() => {
                heightChange = heightChange + 1.5

                const newBottomBlankItemHeight = currentBottomBlankItemHeight + heightChange
                const newTopBlankItemHeight = currentTopBlankItemHeight - heightChange

                if (newBottomBlankItemHeight >= 40 && newTopBlankItemHeight <= 0) {
                    topBlankItem.style.height = 0 + "px"
                    bottomBlankItem.style.height = 40 + "px"
                    clearInterval(interval)
                    resolve()
                }

                topBlankItem.style.height = newTopBlankItemHeight + "px"
                bottomBlankItem.style.height = newBottomBlankItemHeight + "px"

            }, 10)
        })
    }

    else if (animationType === "bottom") {

        return new Promise(function(resolve, reject) {
            itemsContainer.replaceChild(bottomBlankItem, neighbourItem)
            item.insertAdjacentElement("beforebegin",topBlankItem);

            let currentBottomBlankItemHeight = 40
            let currentTopBlankItemHeight = 0
            let heightChange = 0

            const interval = setInterval(() => {
                heightChange = heightChange + 1.5

                const newBottomBlankItemHeight = currentBottomBlankItemHeight - heightChange
                const newTopBlankItemHeight = currentTopBlankItemHeight + heightChange

                if (newBottomBlankItemHeight <= 0 && newTopBlankItemHeight >= 40) {
                    topBlankItem.style.height = 40 + "px"
                    bottomBlankItem.style.height = 0 + "px"
                    clearInterval(interval)
                    resolve()
                }

                topBlankItem.style.height = newTopBlankItemHeight + "px"
                bottomBlankItem.style.height = newBottomBlankItemHeight + "px"

            }, 10)
        })

    }
       
}


function addItem(counter) {
    const item = document.createElement("div")
    let currentData = data[counter]
    item.classList.add("list__itemsContainer__item")
    item.id = counter;

    const itemInnerHtml =  `<div class="list__itemsContainer__item__text">
                                ${currentData[0]}
                            </div>
                            <div class="list__itemsContainer__item__numbers">
                                ${currentData[1]}
                            </div>
                            <a href="#" class="list__itemsContainer__item__button" move-top-btn-id="${counter}">
                                <img src="arrowTop.svg" class="list__itemsContainer__item__button__svg">
                            </a>
                            <a href="#" class="list__itemsContainer__item__button" move-bottom-btn-id="${counter}">
                                <img src="arrowBottom.svg" class="list__itemsContainer__item__button__svg">
                            </a>
                            <a href="#" class="list__itemsContainer__item__button" delete-btn-id="${counter}">
                                <img src="cross.svg" class="list__itemsContainer__item__button__svg">
                            </a>`
    
    item.innerHTML = itemInnerHtml
    itemsContainer.appendChild(item)

    itemOpacityAnimation(item, "grow") // анимация появления

    const moveTopBtn = document.querySelector('[move-top-btn-id="' + counter + '"]')
    const moveBottomBtn = document.querySelector('[move-bottom-btn-id="' + counter + '"]')
    const deleteBtn = document.querySelector('[delete-btn-id="' + counter + '"]')

    moveTopBtn.addEventListener("click", () => {
        if (itemsContainer.querySelectorAll(".list__itemsContainer__item").length > 1) {
           

            swapItems(item, "top")
        }
    })

    moveBottomBtn.addEventListener("click", () => {
        if (itemsContainer.querySelectorAll(".list__itemsContainer__item").length > 1) {
            

            swapItems(item, "bottom")
        }
    })

    deleteBtn.addEventListener("click", () => {

        itemOpacityAnimation(item, "reduction").then(function() { // анимация исчезновения элемента
            const blankItem = document.createElement("div")
            blankItem.classList.add("list__itemsContainer__item__blankItem")
            itemsContainer.replaceChild(blankItem, item)
    
            listHeightAnimation("reduction").then( function() { // анимация уменьшения бокса
                itemsContainer.removeChild(blankItem)
                itemsListEmptynessCheck()
            })
        })
    })
}



let counter = 0;
addItemBtn.addEventListener("click", () => {

    if (itemsListEmptynessCheck()) {
        $(".list__itemsContainer__initialItem").fadeOut(300)
        itemsContainer.removeChild(initialItem)
    }

    if (counter <= 6) {

        listHeightAnimation("grow").then( function() {
            addItem(counter)
            counter++
        })
    } 
    
    else {
        addItemBtn.style.transform = "scale(1.05)"

        setTimeout(() => {
            addItemBtn.style.transform = "scale(1)";
        }, 200);

    }
})

addItemBtn.addEventListener("mousedown", () => {
    if (counter <= 6) {
        addItemBtn.style.backgroundColor = "rgb(220, 220, 220)"
    }
})

addItemBtn.addEventListener("mouseup", () => {
    if (counter <= 6) {
        addItemBtn.style.backgroundColor = "rgb(220, 220, 220)"

        setTimeout(() => {
    
            addItemBtn.style.backgroundColor = "white"
        }, 150)
    }
})

addItemBtn.addEventListener("mouseout", () => {
    addItemBtn.style.backgroundColor = "white"
})

saveBtn.addEventListener("click", () => {
    $(".jsonOutputContainer__jsonOutput").fadeOut(200)
    setTimeout(() => {
        let dataSet = { }
    
        const items = Array.from(itemsContainer.children)
        items.forEach(item => {
            const itemText = item.querySelector(".list__itemsContainer__item__text").textContent.trim()
            const itemNumbers = item.querySelector(".list__itemsContainer__item__numbers").textContent.trim()

            dataSet[itemText] = itemNumbers
        });

        const jsonDataSet = JSON.stringify(dataSet, null, 4)

        const jsonOutput = document.querySelector(".jsonOutputContainer__jsonOutput")
        jsonOutput.textContent = jsonDataSet

        $(".jsonOutputContainer__jsonOutput").fadeIn(200)
    }, 200)

})

saveBtn.addEventListener("mousedown", () => {
    saveBtn.style.backgroundColor = "rgb(220, 220, 220)"
})

saveBtn.addEventListener("mouseup", () => {
    saveBtn.style.backgroundColor = "rgb(220, 220, 220)"

    setTimeout(() => {

        saveBtn.style.backgroundColor = "white"
    }, 150)
})

saveBtn.addEventListener("mouseout", () => {
    saveBtn.style.backgroundColor = "white"
})