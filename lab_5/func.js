$(document).ready(function() {
    function openModal(targetModelId) {
        $("#" + targetModelId).fadeIn(400);
        $(".overlay").fadeIn(400);
    }

    function closeModal() {
        $(".modal").fadeOut(400);
        $(".overlay").fadeOut(400);
    }

    const buttons = document.querySelectorAll(".btn_nblock");
    buttons.forEach(element => {
        const targetModelId = element.getAttribute("target-model-id");

        element.addEventListener("click", () => openModal(targetModelId));
    });

    document.querySelector(".overlay").addEventListener("click", () => closeModal());
});