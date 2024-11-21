"use strict"

const showLeftColumnBtn = document.getElementById("showLeftColumnBtn");
const showRightColumnBtn = document.getElementById("showRightColumnBtn");
const showBothBtn = document.getElementById("showBothBtn");

const rightColumn = document.getElementById("rightColumn") // получаем правую колонку
const leftColumn = document.getElementById("leftColumn")
const catImg = document.getElementById("catImg")
const dogImg = document.getElementById("dogImg")

// function draw(movementPercentage, leftColumnWidthInPercentage, rightColumnWidthInPercentage) {
//     leftColumn.style.width = movementPercentage + leftColumnWidthInPercentage + '%';
//     rightColumn.style.width = rightColumnWidthInPercentage - movementPercentage + '%';
// }

function ColumnExpansionAnimation (expandingColumnWidth, shrinkingColumnWidth, expandingColumnSide, expandindColumnTarget) {
    let movementPercentage = 0;
    let start = Date.now(); // запомнить время начала
    let timer = setInterval(function() {
        // сколько времени прошло с начала анимации?
        let timePassed = Date.now() - start;

        if (timePassed >= 1000) {
            clearInterval(timer); 
            movementPercentage = 0;
            return;
        }

        movementPercentage = movementPercentage + 2;

        const expandingColumnNewWidth = expandingColumnWidth + movementPercentage;
        const shrinkingColumnNewWidth = shrinkingColumnWidth - movementPercentage;

        if (expandingColumnNewWidth > expandindColumnTarget) {
            clearInterval(timer); 
            movementPercentage = 0;
            return;
        }

        if (expandingColumnSide === "left") {
            leftColumn.style.width = expandingColumnNewWidth + '%';
            rightColumn.style.width = shrinkingColumnNewWidth + '%';
        }
        else if (expandingColumnSide === "right") {
            leftColumn.style.width = shrinkingColumnNewWidth + '%';
            rightColumn.style.width = expandingColumnNewWidth + '%';
        }

        //draw(movementPercentage, leftColumnWidthInPercentage, rightColumnWidthInPercentage);

    }, 10);

 
}

showLeftColumnBtn.addEventListener("click", () => {

    showBothBtn.classList.remove("activeBtn");
    showBothBtn.classList.add("inactiveBtn");

    showRightColumnBtn.classList.remove("activeBtn");
    showRightColumnBtn.classList.add("inactiveBtn")

    showLeftColumnBtn.classList.remove("inactiveBtn");
    showLeftColumnBtn.classList.add("activeBtn");

    $("#dogImg").fadeOut(400);

    setTimeout(async () => {
        // rightColumn.style.width = "10%";   
        // leftColumn.style.width = "90%";

        const rightColumnwidthInPixels = rightColumn.offsetWidth;
        const rightColumnParentWidthInPixels = rightColumn.parentElement.offsetWidth;
        const rightColumnWidthInPercentage = (rightColumnwidthInPixels / rightColumnParentWidthInPixels) * 100; // стартовая ширина в процентах

        const leftColumnwidthInPixels = leftColumn.offsetWidth;
        const leftColumnParentWidthInPixels = leftColumn.parentElement.offsetWidth;
        const leftColumnWidthInPercentage = (leftColumnwidthInPixels / leftColumnParentWidthInPixels) * 100; // стартовая ширина в процентах

        ColumnExpansionAnimation(leftColumnWidthInPercentage, rightColumnWidthInPercentage, "left", 88);

        setTimeout(async () => {
            $("#catImg").fadeIn(400);
        }, 200)
    }, 400)
})

showRightColumnBtn.addEventListener("click", () => {

    showBothBtn.classList.remove("activeBtn");
    showBothBtn.classList.add("inactiveBtn")

    showLeftColumnBtn.classList.remove("activeBtn");
    showLeftColumnBtn.classList.add("inactiveBtn");

    showRightColumnBtn.classList.remove("inactiveBtn");
    showRightColumnBtn.classList.add("activeBtn");

    $("#catImg").fadeOut(400);

    setTimeout(async () => {
        // rightColumn.style.width = "90%";
        // leftColumn.style.width = "10%";

        const rightColumnwidthInPixels = rightColumn.offsetWidth;
        const rightColumnParentWidthInPixels = rightColumn.parentElement.offsetWidth;
        const rightColumnWidthInPercentage = (rightColumnwidthInPixels / rightColumnParentWidthInPixels) * 100; // стартовая ширина в процентах

        const leftColumnwidthInPixels = leftColumn.offsetWidth;
        const leftColumnParentWidthInPixels = leftColumn.parentElement.offsetWidth;
        const leftColumnWidthInPercentage = (leftColumnwidthInPixels / leftColumnParentWidthInPixels) * 100; // стартовая ширина в процентах

        ColumnExpansionAnimation(rightColumnWidthInPercentage, leftColumnWidthInPercentage, "right", 88);

        setTimeout(async () => {
            $("#dogImg").fadeIn(400);
        }, 200)
    }, 400)
})

showBothBtn.addEventListener("click", () => {

    showRightColumnBtn.classList.remove("activeBtn");
    showRightColumnBtn.classList.add("inactiveBtn")

    showLeftColumnBtn.classList.remove("activeBtn");
    showLeftColumnBtn.classList.add("inactiveBtn")

    showBothBtn.classList.remove("inactiveBtn");
    showBothBtn.classList.add("activeBtn");

    const rightColumnwidthInPixels = rightColumn.offsetWidth;
    const rightColumnParentWidthInPixels = rightColumn.parentElement.offsetWidth;
    const rightColumnWidthInPercentage = (rightColumnwidthInPixels / rightColumnParentWidthInPixels) * 100; // стартовая ширина в процентах

    const leftColumnwidthInPixels = leftColumn.offsetWidth;
    const leftColumnParentWidthInPixels = leftColumn.parentElement.offsetWidth;
    const leftColumnWidthInPercentage = (leftColumnwidthInPixels / leftColumnParentWidthInPixels) * 100; // стартовая ширина в процентах

    if (rightColumnWidthInPercentage < 20) { // расширяем правую колонку

        ColumnExpansionAnimation(rightColumnWidthInPercentage, leftColumnWidthInPercentage, "right", 50);
        setTimeout(async () => {
            // rightColumn.style.width = "90%";
            // leftColumn.style.width = "10%";

            $("#dogImg").fadeIn(400);
        }, 200)

    }

    else if (leftColumnWidthInPercentage < 20) { // расширяем левую колонку
        
        ColumnExpansionAnimation(leftColumnWidthInPercentage, rightColumnWidthInPercentage, "left", 50);
        setTimeout(async () => {
            // rightColumn.style.width = "10%";   
            // leftColumn.style.width = "90%";
    
            $("#catImg").fadeIn(400);
        }, 200)        
    }




    // rightColumn.style.width = "90%";
    // leftColumn.style.width = "90%";

    // catImg.classList.remove("hidden")
    // dogImg.classList.remove("hidden")
})














