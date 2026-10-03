/* =========================================================
   XCOVIBE COMMUNITY
   DISCUSSION / COMMENT / REPLY
   ========================================================= */


/* =========================================================
   ACCOUNT
   ========================================================= */

function discussionGetAccount() {

    const data =
        localStorage.getItem(
            "xcovibe-account"
        );

    if (!data) {
        return null;
    }

    try {

        return JSON.parse(data);

    } catch (error) {

        return null;

    }

}


function discussionIsLoggedIn() {

    return (
        localStorage.getItem(
            "xcovibe-logged-in"
        ) === "true"
        &&
        discussionGetAccount() !== null
    );

}


/* =========================================================
   LOGIN REQUIRED
   ========================================================= */

function requireDiscussionLogin() {

    if (discussionIsLoggedIn()) {

        return true;

    }

    if (
        typeof openAccountModal ===
        "function"
    ) {

        openAccountModal();

    }

    if (
        typeof showToast ===
        "function"
    ) {

        showToast(
            "Silakan Login atau Register terlebih dahulu."
        );

    }

    return false;

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeDiscussionHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* =========================================================
   COMMENT STORAGE
   ========================================================= */

function getDiscussionComments() {

    const data =
        localStorage.getItem(
            "xcovibe-comments"
        );

    if (!data) {

        return {};

    }

    try {

        return JSON.parse(data);

    } catch (error) {

        return {};

    }

}


function saveDiscussionComments(
    comments
) {

    localStorage.setItem(
        "xcovibe-comments",
        JSON.stringify(comments)
    );

}


/* =========================================================
   POST ID
   ========================================================= */

function getPostId(post) {

    if (!post.dataset.postId) {

        post.dataset.postId =
            "post-" +
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .substring(2, 8);

    }

    return post.dataset.postId;

}


/* =========================================================
   FIND COMMENT BUTTON
   ========================================================= */

function getCommentButton(post) {

    const buttons =
        post.querySelectorAll(
            ".post-actions button"
        );


    for (
        let i = 0;
        i < buttons.length;
        i++
    ) {

        if (
            buttons[i]
                .textContent
                .includes("💬")
        ) {

            return buttons[i];

        }

    }

    return null;

}


/* =========================================================
   UPDATE COMMENT COUNT
   ========================================================= */

function updateCommentCount(post) {

    const button =
        getCommentButton(post);


    if (!button) {

        return;

    }


    const count =
        button.querySelector("span");


    if (!count) {

        return;

    }


    const postId =
        getPostId(post);


    const comments =
        getDiscussionComments();


    const total =
        comments[postId]
            ? comments[postId].length
            : 0;


    /*
       Jumlah komentar hanya berdasarkan
       komentar yang benar-benar dibuat.
    */

    count.textContent =
        total;

}


/* =========================================================
   CREATE COMMENT AREA
   ========================================================= */

function createCommentArea(post) {

    if (
        post.querySelector(
            ".discussion-comments"
        )
    ) {

        return;

    }


    const postId =
        getPostId(post);


    const comments =
        getDiscussionComments();


    const postComments =
        comments[postId] || [];


    const container =
        document.createElement("div");

    container.className =
        "discussion-comments";


    container.innerHTML = `

        <div class="comments-header">

            <strong>
                Comments
            </strong>

            <span class="comment-total">
                ${postComments.length}
            </span>

        </div>


        <div class="comment-list"></div>


        <form class="comment-form">

            <input
                type="text"
                class="comment-input"
                placeholder="Tulis komentar..."
                maxlength="500"
                autocomplete="off"
            >

            <button
                type="submit"
                class="comment-submit"
            >
                Send
            </button>

        </form>

    `;


    const actions =
        post.querySelector(
            ".post-actions"
        );


    if (actions) {

        actions.after(container);

    }


    renderComments(
        post,
        postComments
    );


    updateCommentCount(
        post
    );


    const form =
        container.querySelector(
            ".comment-form"
        );


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (
                !requireDiscussionLogin()
            ) {

                return;

            }


            const input =
                container.querySelector(
                    ".comment-input"
                );


            const text =
                input.value.trim();


            if (!text) {

                return;

            }


            addComment(
                post,
                text
            );


            input.value = "";

        }
    );

}


/* =========================================================
   RENDER COMMENTS
   ========================================================= */

function renderComments(
    post,
    postComments
) {

    const container =
        post.querySelector(
            ".discussion-comments"
        );


    if (!container) {

        return;

    }


    const list =
        container.querySelector(
            ".comment-list"
        );


    const total =
        container.querySelector(
            ".comment-total"
        );


    total.textContent =
        postComments.length;


    list.innerHTML = "";


    if (
        postComments.length === 0
    ) {

        list.innerHTML = `

            <div class="no-comments">

                Belum ada komentar.
                Jadilah yang pertama berkomentar.

            </div>

        `;

        return;

    }


    postComments.forEach(
        function (comment) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "comment-item";


            const replies =
                comment.replies || [];


            item.innerHTML = `

                <div class="comment-avatar">

                    ${escapeDiscussionHTML(
                        comment.username
                            .charAt(0)
                            .toUpperCase()
                    )}

                </div>


                <div class="comment-body">

                    <div class="comment-meta">

                        <strong>
                            @${escapeDiscussionHTML(
                                comment.username
                            )}
                        </strong>

                        <span>
                            ${comment.time}
                        </span>

                    </div>


                    <p>
                        ${escapeDiscussionHTML(
                            comment.text
                        )}
                    </p>


                    <div class="comment-tools">

                        <button
                            type="button"
                            class="reply-btn"
                            data-comment-id="${comment.id}"
                        >
                            ↩ Reply
                        </button>

                    </div>


                    <div
                        class="reply-area"
                        id="reply-${comment.id}"
                    ></div>


                    <div class="reply-list">

                        ${replies
                            .map(
                                function (reply) {

                                    return `

                                        <div class="reply-item">

                                            <div class="reply-avatar">

                                                ${escapeDiscussionHTML(
                                                    reply.username
                                                        .charAt(0)
                                                        .toUpperCase()
                                                )}

                                            </div>


                                            <div>

                                                <div class="comment-meta">

                                                    <strong>
                                                        @${escapeDiscussionHTML(
                                                            reply.username
                                                        )}
                                                    </strong>

                                                    <span>
                                                        ${reply.time}
                                                    </span>

                                                </div>


                                                <p>
                                                    ${escapeDiscussionHTML(
                                                        reply.text
                                                    )}
                                                </p>

                                            </div>

                                        </div>

                                    `;

                                }
                            )
                            .join("")
                        }

                    </div>

                </div>

            `;


            list.appendChild(
                item
            );


            const replyButton =
                item.querySelector(
                    ".reply-btn"
                );


            replyButton.addEventListener(
                "click",
                function () {

                    if (
                        !requireDiscussionLogin()
                    ) {

                        return;

                    }


                    showReplyForm(
                        post,
                        comment
                    );

                }
            );

        }
    );

}


/* =========================================================
   ADD COMMENT
   ========================================================= */

function addComment(
    post,
    text
) {

    const account =
        discussionGetAccount();


    if (!account) {

        return;

    }


    const postId =
        getPostId(post);


    const comments =
        getDiscussionComments();


    if (!comments[postId]) {

        comments[postId] = [];

    }


    comments[postId].push({

        id:
            "comment-" +
            Date.now(),

        username:
            account.username,

        text:
            text,

        time:
            "Baru saja",

        replies:
            []

    });


    saveDiscussionComments(
        comments
    );


    renderComments(
        post,
        comments[postId]
    );


    updateCommentCount(
        post
    );


    if (
        typeof showToast ===
        "function"
    ) {

        showToast(
            "Komentar berhasil ditambahkan."
        );

    }

}


/* =========================================================
   REPLY FORM
   ========================================================= */

function showReplyForm(
    post,
    comment
) {

    const area =
        post.querySelector(
            "#reply-" +
            comment.id
        );


    if (!area) {

        return;

    }


    if (
        area.querySelector(
            ".reply-form"
        )
    ) {

        return;

    }


    area.innerHTML = `

        <form class="reply-form">

            <input
                type="text"
                class="reply-input"
                placeholder="Tulis balasan..."
                maxlength="500"
                autocomplete="off"
            >

            <button
                type="submit"
            >
                Reply
            </button>

        </form>

    `;


    const form =
        area.querySelector(
            ".reply-form"
        );


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const input =
                form.querySelector(
                    ".reply-input"
                );


            const text =
                input.value.trim();


            if (!text) {

                return;

            }


            addReply(
                post,
                comment.id,
                text
            );

        }
    );


    area
        .querySelector(
            ".reply-input"
        )
        .focus();

}


/* =========================================================
   ADD REPLY
   ========================================================= */

function addReply(
    post,
    commentId,
    text
) {

    const account =
        discussionGetAccount();


    if (!account) {

        return;

    }


    const postId =
        getPostId(post);


    const comments =
        getDiscussionComments();


    const postComments =
        comments[postId] || [];


    const comment =
        postComments.find(
            function (item) {

                return (
                    item.id ===
                    commentId
                );

            }
        );


    if (!comment) {

        return;

    }


    if (!comment.replies) {

        comment.replies = [];

    }


    comment.replies.push({

        id:
            "reply-" +
            Date.now(),

        username:
            account.username,

        text:
            text,

        time:
            "Baru saja"

    });


    saveDiscussionComments(
        comments
    );


    renderComments(
        post,
        postComments
    );


    updateCommentCount(
        post
    );


    if (
        typeof showToast ===
        "function"
    ) {

        showToast(
            "Balasan berhasil ditambahkan."
        );

    }

}


/* =========================================================
   COMMENT BUTTON
   ========================================================= */

function activateCommentButton(
    post
) {

    const button =
        getCommentButton(post);


    if (!button) {

        return;

    }


    /*
       Tandai supaya listener tidak
       dipasang dua kali.
    */

    if (
        button.dataset.commentReady ===
        "true"
    ) {

        return;

    }


    button.dataset.commentReady =
        "true";


    button.addEventListener(
        "click",
        function (event) {

            /*
               Jangan ubah angka komentar
               hanya karena tombol diklik.
            */

            event.preventDefault();


            /*
               Kalau belum login,
               popup muncul dan angka
               tetap sama.
            */

            if (
                !discussionIsLoggedIn()
            ) {

                requireDiscussionLogin();

                return;

            }


            createCommentArea(
                post
            );


            const area =
                post.querySelector(
                    ".discussion-comments"
                );


            area.classList.toggle(
                "comments-open"
            );


            if (
                area.classList.contains(
                    "comments-open"
                )
            ) {

                area.scrollIntoView({
                    behavior:
                        "smooth",
                    block:
                        "nearest"
                });

            }

        }
    );

}


/* =========================================================
   LIKE — CAPTURE MODE
   ========================================================= */

function protectLikeButton(
    button
) {

    if (!button) {

        return;

    }


    if (
        button.dataset.loginProtected ===
        "true"
    ) {

        return;

    }


    button.dataset.loginProtected =
        "true";


    /*
       Capture mode sengaja digunakan
       supaya event ini berjalan SEBELUM
       handler Like lama dari script.js.
    */

    button.addEventListener(
        "click",
        function (event) {

            if (
                discussionIsLoggedIn()
            ) {

                /*
                   User sudah login.
                   Biarkan handler Like
                   lama bekerja normal.
                */

                return;

            }


            /*
               BELUM LOGIN:
               hentikan SEMUA handler
               Like sebelum angka berubah.
            */

            event.preventDefault();
            event.stopImmediatePropagation();


            requireDiscussionLogin();

        },
        true
    );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

function initializeDiscussionFeatures() {

    const posts =
        document.querySelectorAll(
            ".post"
        );


    posts.forEach(
        function (post) {

            getPostId(post);

            activateCommentButton(
                post
            );

            protectLikeButton(
                post.querySelector(
                    ".like-btn"
                )
            );

        }
    );

}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeDiscussionFeatures();

    }
);