window.XCOVIBE = window.XCOVIBE || {};

XCOVIBE.ui = (() => {

    function toast(message) {
        const toast = document.getElementById("toast");
        const messageBox = document.getElementById("toastMessage");

        if (!toast || !messageBox) return;

        messageBox.textContent = message;

        toast.classList.add("show");

        clearTimeout(toast.timer);

        toast.timer = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }


    function openModal(id) {
        const modal = document.getElementById(id);

        if (!modal) return;

        modal.classList.add("show");
        document.body.classList.add("modal-open");
    }


    function closeModal(id) {
        const modal = document.getElementById(id);

        if (!modal) return;

        modal.classList.remove("show");

        if (!document.querySelector(".modal-overlay.show")) {
            document.body.classList.remove("modal-open");
        }
    }


    function closeAllModals() {
        document
            .querySelectorAll(".modal-overlay.show")
            .forEach(modal => {
                modal.classList.remove("show");
            });

        document.body.classList.remove("modal-open");
    }


    function init() {

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeAllModals();
            }

        });


        document
            .querySelectorAll(".modal-overlay")
            .forEach(modal => {

                modal.addEventListener("click", event => {

                    if (event.target === modal) {
                        closeModal(modal.id);
                    }

                });

            });

    }


    return {
        toast,
        openModal,
        closeModal,
        closeAllModals,
        init
    };

})();