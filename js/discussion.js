window.XCOVIBE = window.XCOVIBE || {};

XCOVIBE.discussion = (() => {

    function escapeHTML(text) {

        const div = document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }


    function openCreateDiscussion() {

        if (!XCOVIBE.account.isLoggedIn()) {

            XCOVIBE.ui.openModal("accountModal");

            return;
        }

        XCOVIBE.ui.openModal("createModal");

    }


    function closeCreateDiscussion() {

        XCOVIBE.ui.closeModal("createModal");

    }


    function createPost(event) {

        event.preventDefault();


        if (!XCOVIBE.account.isLoggedIn()) {

            closeCreateDiscussion();

            XCOVIBE.ui.openModal("accountModal");

            return;
        }


        const title =
            document
                .getElementById("postTitle")
                .value
                .trim();

        const category =
            document
                .getElementById("postCategory")
                .value;

        const content =
            document
                .getElementById("postContent")
                .value
                .trim();


        if (!title || !content) {

            XCOVIBE.ui.toast(
                "Judul dan isi diskusi wajib diisi."
            );

            return;
        }


        const account =
            XCOVIBE.account.getAccount();


        const post = document.createElement("article");

        post.className = "post";

        post.dataset.category = category;


        post.innerHTML = `

            <div class="post-top">

                <div class="user-info">

                    <div class="avatar">
                        ${escapeHTML(
                            account.username
                                .charAt(0)
                                .toUpperCase()
                        )}
                    </div>

                    <div>

                        <strong>
                            ${escapeHTML(account.username)}
                        </strong>

                        <span>
                            ${escapeHTML(category)}
                            · just now
                        </span>

                    </div>

                </div>

                <button class="more-btn">
                    •••
                </button>

            </div>


            <h2>
                ${escapeHTML(title)}
            </h2>


            <p>
                ${escapeHTML(content)}
            </p>


            <div class="post-actions">

                <button class="like-btn">
                    ♡
                    <span>0</span>
                </button>

                <button class="comment-btn">
                    💬
                    <span>0</span>
                </button>

                <button class="share-btn">
                    ↗ Share
                </button>

            </div>
        `;


        const feed =
            document.querySelector(".feed");

        const emptyResult =
            document.getElementById("emptyResult");


        feed.insertBefore(
            post,
            emptyResult
        );


        const form =
            document.getElementById("createForm");

        form.reset();


        closeCreateDiscussion();


        XCOVIBE.ui.toast(
            "Diskusi berhasil dibuat."
        );


        attachLikeButton(
            post.querySelector(".like-btn")
        );

    }


    function attachLikeButton(button) {

        if (!button) return;

        button.addEventListener(
            "click",
            () => {

                const count =
                    button.querySelector("span");

                if (!count) return;


                const liked =
                    button.classList.toggle("liked");


                let number =
                    parseInt(
                        count.textContent,
                        10
                    ) || 0;


                number += liked ? 1 : -1;

                count.textContent =
                    Math.max(0, number);


                button.firstChild.textContent =
                    liked ? "♥ " : "♡ ";

            }
        );

    }


    function init() {

        document
            .querySelector(".create-btn")
            ?.addEventListener(
                "click",
                openCreateDiscussion
            );


        document
            .getElementById("closeAccountModal")
            ?.addEventListener(
                "click",
                () => XCOVIBE.ui.closeModal(
                    "accountModal"
                )
            );


        document
            .getElementById("closeModal")
            ?.addEventListener(
                "click",
                closeCreateDiscussion
            );


        document
            .getElementById("cancelModal")
            ?.addEventListener(
                "click",
                closeCreateDiscussion
            );


        document
            .getElementById("createForm")
            ?.addEventListener(
                "submit",
                createPost
            );


        document
            .querySelectorAll(".like-btn")
            .forEach(attachLikeButton);

    }


    return {
        init,
        openCreateDiscussion
    };

})();