/* =========================================================
   XCOVIBE COMMUNITY
   SCRIPT.JS
   ========================================================= */


/* =========================================================
   THEME
   ========================================================= */

const savedTheme =
    localStorage.getItem("xcovibe-theme");


if (savedTheme) {

    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );

} else {

    document.documentElement.setAttribute(
        "data-theme",
        "system"
    );

}


/* =========================================================
   SEARCH
   ========================================================= */

const searchInput =
    document.getElementById("searchInput");

const emptyResult =
    document.getElementById("emptyResult");


function getPosts() {

    return document.querySelectorAll(".post");

}


function updateSearch() {

    if (!searchInput) return;

    const keyword =
        searchInput.value
            .toLowerCase()
            .trim();

    let visiblePosts = 0;


    getPosts().forEach(function (post) {

        const content =
            post.textContent.toLowerCase();


        if (content.includes(keyword)) {

            post.style.display = "block";

            visiblePosts++;

        } else {

            post.style.display = "none";

        }

    });


    if (emptyResult) {

        if (visiblePosts === 0) {

            emptyResult.style.display = "block";

        } else {

            emptyResult.style.display = "none";

        }

    }

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        updateSearch
    );

}


/* =========================================================
   COMMUNITY FILTER
   ========================================================= */

const communityButtons =
    document.querySelectorAll(
        ".community-item"
    );


communityButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            communityButtons.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            this.classList.add("active");


            const category =
                this.dataset.category;


            let visiblePosts = 0;


            getPosts().forEach(
                function (post) {

                    const postCategory =
                        post.dataset.category;


                    if (
                        category === "all" ||
                        postCategory === category
                    ) {

                        post.style.display =
                            "block";

                        visiblePosts++;

                    } else {

                        post.style.display =
                            "none";

                    }

                }
            );


            if (emptyResult) {

                if (visiblePosts === 0) {

                    emptyResult.style.display =
                        "block";

                } else {

                    emptyResult.style.display =
                        "none";

                }

            }

        }
    );

});


/* =========================================================
   ACCOUNT DATA
   ========================================================= */

function getAccount() {

    const account =
        localStorage.getItem(
            "xcovibe-account"
        );


    if (!account) {

        return null;

    }


    try {

        return JSON.parse(account);

    } catch (error) {

        return null;

    }

}


function isLoggedIn() {

    const account =
        getAccount();


    const session =
        localStorage.getItem(
            "xcovibe-logged-in"
        );


    return (
        account !== null &&
        session === "true"
    );

}


/* =========================================================
   TOAST
   ========================================================= */

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById(
        "toastMessage"
    );

let toastTimer;


function showToast(message) {

    if (!toast || !toastMessage) return;


    clearTimeout(toastTimer);


    toastMessage.textContent =
        message;


    toast.classList.add("show");


    toastTimer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* =========================================================
   LIKE
   ========================================================= */

function activateLikeButton(button) {

    if (!button) return;


    button.addEventListener(
        "click",
        function () {

            this.classList.toggle(
                "liked"
            );


            const count =
                this.querySelector(
                    "span"
                );


            if (!count) return;


            let number =
                parseInt(
                    count.textContent,
                    10
                ) || 0;


            if (
                this.classList.contains(
                    "liked"
                )
            ) {

                number++;


                this.firstChild.textContent =
                    "♥ ";

            } else {

                number =
                    Math.max(
                        0,
                        number - 1
                    );


                this.firstChild.textContent =
                    "♡ ";

            }


            count.textContent =
                number;

        }
    );

}


document
    .querySelectorAll(".like-btn")
    .forEach(
        activateLikeButton
    );


/* =========================================================
   SORT
   ========================================================= */

const sortButton =
    document.getElementById(
        "sortBtn"
    );


if (sortButton) {

    sortButton.addEventListener(
        "click",
        function () {

            if (
                this.textContent.includes(
                    "Latest"
                )
            ) {

                this.textContent =
                    "Popular ↓";

            } else {

                this.textContent =
                    "Latest ↓";

            }

        }
    );

}


/* =========================================================
   ACCOUNT REQUIRED MODAL
   ========================================================= */

const accountModal =
    document.getElementById(
        "accountModal"
    );


const closeAccountModal =
    document.getElementById(
        "closeAccountModal"
    );


const accountLoginBtn =
    document.getElementById(
        "accountLoginBtn"
    );


const accountRegisterBtn =
    document.getElementById(
        "accountRegisterBtn"
    );


function openAccountModal() {

    if (!accountModal) return;


    accountModal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


function closeAccountChoice() {

    if (!accountModal) return;


    accountModal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


if (closeAccountModal) {

    closeAccountModal.addEventListener(
        "click",
        closeAccountChoice
    );

}


if (accountModal) {

    accountModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                accountModal
            ) {

                closeAccountChoice();

            }

        }
    );

}


/* =========================================================
   REGISTER MODAL
   ========================================================= */

const registerButton =
    document.querySelector(
        ".register-btn"
    );


const registerModal =
    document.getElementById(
        "registerModal"
    );


const closeRegister =
    document.getElementById(
        "closeRegister"
    );


const cancelRegister =
    document.getElementById(
        "cancelRegister"
    );


const registerForm =
    document.getElementById(
        "registerForm"
    );


function openRegisterModal() {

    if (!registerModal) return;


    registerModal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";


    setTimeout(
        function () {

            const usernameInput =
                document.getElementById(
                    "registerUsername"
                );


            if (usernameInput) {

                usernameInput.focus();

            }

        },
        100
    );

}


function closeRegisterModal() {

    if (!registerModal) return;


    registerModal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


if (closeRegister) {

    closeRegister.addEventListener(
        "click",
        closeRegisterModal
    );

}


if (cancelRegister) {

    cancelRegister.addEventListener(
        "click",
        closeRegisterModal
    );

}


if (registerModal) {

    registerModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                registerModal
            ) {

                closeRegisterModal();

            }

        }
    );

}


/* =========================================================
   ACCOUNT MODAL -> REGISTER
   ========================================================= */

if (accountRegisterBtn) {

    accountRegisterBtn.addEventListener(
        "click",
        function () {

            closeAccountChoice();

            openRegisterModal();

        }
    );

}


/* =========================================================
   LOGIN MODAL
   Dibuat otomatis oleh JavaScript
   ========================================================= */

let loginModal = null;


function createLoginModal() {

    const existingModal =
        document.getElementById(
            "loginModal"
        );


    if (existingModal) {

        loginModal =
            existingModal;

        return loginModal;

    }


    loginModal =
        document.createElement(
            "div"
        );


    loginModal.id =
        "loginModal";


    loginModal.className =
        "modal-overlay";


    loginModal.innerHTML = `

        <div class="modal-content">

            <div class="modal-header">

                <div>

                    <span class="section-label">
                        XCOVIBE
                    </span>

                    <h2>
                        Login to XCOVIBE
                    </h2>

                    <p class="login-subtitle">
                        Masuk kembali dan lanjutkan vibe kamu.
                    </p>

                </div>


                <button
                    type="button"
                    class="modal-close"
                    id="closeLogin"
                    aria-label="Tutup login"
                >
                    &times;
                </button>

            </div>


            <form id="loginForm">

                <label for="loginIdentifier">
                    Username atau Email
                </label>


                <input
                    type="text"
                    id="loginIdentifier"
                    placeholder="Username atau email"
                    autocomplete="username"
                    required
                >


                <label for="loginPassword">
                    Password
                </label>


                <input
                    type="password"
                    id="loginPassword"
                    placeholder="Masukkan password"
                    autocomplete="current-password"
                    required
                >


                <div class="modal-actions">

                    <button
                        type="button"
                        class="cancel-btn"
                        id="cancelLogin"
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        class="publish-btn"
                    >
                        Login
                    </button>

                </div>

            </form>

        </div>

    `;


    document.body.appendChild(
        loginModal
    );


    /* =====================================================
       LOGIN CLOSE BUTTON
       X
       ===================================================== */

    const closeLogin =
        document.getElementById(
            "closeLogin"
        );


    if (closeLogin) {

        closeLogin.onclick =
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                closeLoginModal();

            };

    }


    /* =====================================================
       LOGIN CANCEL BUTTON
       ===================================================== */

    const cancelLogin =
        document.getElementById(
            "cancelLogin"
        );


    if (cancelLogin) {

        cancelLogin.onclick =
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                closeLoginModal();

            };

    }


    /* =====================================================
       CLICK OUTSIDE LOGIN
       ===================================================== */

    loginModal.onclick =
        function (event) {

            if (
                event.target ===
                loginModal
            ) {

                closeLoginModal();

            }

        };


    /* =====================================================
       LOGIN FORM
       ===================================================== */

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const identifier =
                    document
                        .getElementById(
                            "loginIdentifier"
                        )
                        .value
                        .trim()
                        .toLowerCase();


                const password =
                    document
                        .getElementById(
                            "loginPassword"
                        )
                        .value;


                const account =
                    getAccount();


                /*
                   BELUM ADA AKUN
                */

                if (!account) {

                    closeLoginModal();

                    openRegisterModal();

                    showToast(
                        "Belum punya akun. Silakan Register terlebih dahulu."
                    );

                    return;

                }


                /*
                   CEK USERNAME
                */

                const usernameMatch =
                    account.username &&
                    account.username
                        .toLowerCase() ===
                    identifier;


                /*
                   CEK EMAIL
                */

                const emailMatch =
                    account.email &&
                    account.email
                        .toLowerCase() ===
                    identifier;


                /*
                   USERNAME / EMAIL SALAH
                */

                if (
                    !usernameMatch &&
                    !emailMatch
                ) {

                    showToast(
                        "Username atau email tidak ditemukan."
                    );

                    return;

                }


                /*
                   PASSWORD SALAH
                */

                if (
                    account.password !==
                    password
                ) {

                    showToast(
                        "Password salah."
                    );

                    return;

                }


                /*
                   LOGIN BERHASIL
                */

                localStorage.setItem(
                    "xcovibe-logged-in",
                    "true"
                );


                loginForm.reset();


                closeLoginModal();


                updateAuthDisplay();


                showToast(
                    "Login berhasil. Selamat datang, @" +
                    account.username +
                    "!"
                );

            }
        );

    }


    return loginModal;

}


/* =========================================================
   OPEN LOGIN
   ========================================================= */

function openLoginModal() {

    const modal =
        createLoginModal();


    if (!modal) return;


    closeAccountChoice();


    modal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";


    setTimeout(
        function () {

            const input =
                document.getElementById(
                    "loginIdentifier"
                );


            if (input) {

                input.focus();

            }

        },
        100
    );

}


/* =========================================================
   CLOSE LOGIN
   ========================================================= */

function closeLoginModal() {

    const modal =
        document.getElementById(
            "loginModal"
        );


    if (!modal) return;


    modal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   ACCOUNT MODAL -> LOGIN
   ========================================================= */

if (accountLoginBtn) {

    accountLoginBtn.onclick =
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            openLoginModal();

        };

}


/* =========================================================
   REGISTER PROCESS
   ========================================================= */

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                document
                    .getElementById(
                        "registerUsername"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "registerEmail"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "registerPassword"
                    )
                    .value;


            const confirmPassword =
                document
                    .getElementById(
                        "registerConfirmPassword"
                    )
                    .value;


            /* USERNAME */

            if (
                username.length < 3
            ) {

                showToast(
                    "Username minimal 3 karakter."
                );

                return;

            }


            /* USERNAME FORMAT */

            const usernamePattern =
                /^[a-zA-Z0-9_]+$/;


            if (
                !usernamePattern.test(
                    username
                )
            ) {

                showToast(
                    "Username hanya boleh huruf, angka, dan underscore."
                );

                return;

            }


            /* PASSWORD */

            if (
                password.length < 6
            ) {

                showToast(
                    "Password minimal 6 karakter."
                );

                return;

            }


            /* CONFIRM PASSWORD */

            if (
                password !==
                confirmPassword
            ) {

                showToast(
                    "Konfirmasi password tidak cocok."
                );

                return;

            }


            /* CEK AKUN */

            const existingAccount =
                getAccount();


            if (
                existingAccount
            ) {

                showToast(
                    "Akun sudah terdaftar di browser ini."
                );

                return;

            }


            /* CREATE ACCOUNT */

            const account = {

                username:
                    username,

                email:
                    email,

                password:
                    password

            };


            localStorage.setItem(
                "xcovibe-account",
                JSON.stringify(
                    account
                )
            );


            localStorage.setItem(
                "xcovibe-username",
                username
            );


            /*
               REGISTER LANGSUNG
               DIANGGAP LOGIN
            */

            localStorage.setItem(
                "xcovibe-logged-in",
                "true"
            );


            registerForm.reset();


            closeRegisterModal();


            updateAuthDisplay();


            showToast(
                "Akun berhasil dibuat. Selamat datang, @" +
                username +
                "!"
            );

        }
    );

}


/* =========================================================
   TOP LOGIN BUTTON
   ========================================================= */

const loginButton =
    document.querySelector(
        ".login-btn"
    );


if (loginButton) {

    loginButton.addEventListener(
        "click",
        function () {

            /*
               SUDAH LOGIN
            */

            if (
                isLoggedIn()
            ) {

                const account =
                    getAccount();


                showToast(
                    "Kamu sedang login sebagai @" +
                    account.username +
                    "."
                );

                return;

            }


            /*
               BELUM ADA AKUN
            */

            const account =
                getAccount();


            if (!account) {

                openRegisterModal();


                showToast(
                    "Belum punya akun? Silakan Register terlebih dahulu."
                );


                return;

            }


            /*
               SUDAH PUNYA AKUN
               TAPI BELUM LOGIN
            */

            openLoginModal();

        }
    );

}


/* =========================================================
   REGISTER / LOGOUT BUTTON
   ========================================================= */

if (registerButton) {

    registerButton.addEventListener(
        "click",
        function () {

            /*
               LOGOUT
            */

            if (
                registerButton.classList.contains(
                    "logout-mode"
                )
            ) {

                localStorage.removeItem(
                    "xcovibe-logged-in"
                );


                updateAuthDisplay();


                showToast(
                    "Kamu telah logout."
                );


                return;

            }


            /*
               REGISTER
            */

            openRegisterModal();

        }
    );

}


/* =========================================================
   CREATE DISCUSSION
   ========================================================= */

const createButton =
    document.querySelector(
        ".create-btn"
    );


const createModal =
    document.getElementById(
        "createModal"
    );


const closeModal =
    document.getElementById(
        "closeModal"
    );


const cancelModal =
    document.getElementById(
        "cancelModal"
    );


const createForm =
    document.getElementById(
        "createForm"
    );


/* OPEN CREATE */

if (createButton) {

    createButton.addEventListener(
        "click",
        function () {

            /*
               BELUM LOGIN
               -> JOIN XCOVIBE
            */

            if (
                !isLoggedIn()
            ) {

                openAccountModal();

                return;

            }


            /*
               SUDAH LOGIN
               -> CREATE DISCUSSION
            */

            if (!createModal) return;


            createModal.classList.add(
                "active"
            );


            document.body.style.overflow =
                "hidden";


            setTimeout(
                function () {

                    const titleInput =
                        document.getElementById(
                            "postTitle"
                        );


                    if (titleInput) {

                        titleInput.focus();

                    }

                },
                100
            );

        }
    );

}


/* CLOSE CREATE */

function closeCreateModal() {

    if (!createModal) return;


    createModal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeCreateModal
    );

}


if (cancelModal) {

    cancelModal.addEventListener(
        "click",
        closeCreateModal
    );

}


/* CLICK OUTSIDE CREATE */

if (createModal) {

    createModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                createModal
            ) {

                closeCreateModal();

            }

        }
    );

}


/* =========================================================
   CREATE POST
   ========================================================= */

if (createForm) {

    createForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /*
               PENGAMAN LOGIN
            */

            if (
                !isLoggedIn()
            ) {

                closeCreateModal();

                openAccountModal();

                return;

            }


            const title =
                document
                    .getElementById(
                        "postTitle"
                    )
                    .value
                    .trim();


            const category =
                document
                    .getElementById(
                        "postCategory"
                    )
                    .value;


            const content =
                document
                    .getElementById(
                        "postContent"
                    )
                    .value
                    .trim();


            /*
               VALIDASI
            */

            if (
                !title ||
                !content
            ) {

                showToast(
                    "Judul dan isi diskusi wajib diisi."
                );

                return;

            }


            const account =
                getAccount();


            if (!account) {

                closeCreateModal();

                openAccountModal();

                return;

            }


            const username =
                account.username;


            const categoryNames = {

                general:
                    "General",

                gaming:
                    "Gaming",

                technology:
                    "Technology",

                creative:
                    "Creative"

            };


            const categoryName =
                categoryNames[
                    category
                ] ||
                "General";


            const avatar =
                username
                    .charAt(0)
                    .toUpperCase();


            /*
               CREATE ARTICLE
            */

            const newPost =
                document.createElement(
                    "article"
                );


            newPost.className =
                "post";


            newPost.dataset.category =
                category;


            newPost.innerHTML = `

                <div class="post-top">

                    <div class="user-info">

                        <div class="avatar">
                            ${escapeHTML(avatar)}
                        </div>

                        <div>

                            <strong>
                                ${escapeHTML(username)}
                            </strong>

                            <span>
                                ${escapeHTML(categoryName)}
                                · just now
                            </span>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="more-btn"
                    >
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

                    <button
                        type="button"
                        class="like-btn"
                    >

                        ♡

                        <span>
                            0
                        </span>

                    </button>


                    <button
                        type="button"
                        class="comment-btn"
                    >

                        💬

                        <span>
                            0
                        </span>

                    </button>


                    <button
                        type="button"
                    >
                        ↗ Share
                    </button>

                </div>

            `;


            const feed =
                document.querySelector(
                    ".feed"
                );


            const feedHeader =
                document.querySelector(
                    ".feed-header"
                );


            if (!feed) {

                showToast(
                    "Feed tidak ditemukan."
                );

                return;

            }


            const empty =
                document.getElementById(
                    "emptyResult"
                );


            /*
               MASUKKAN POST
            */

            if (empty) {

                feed.insertBefore(
                    newPost,
                    empty
                );

            } else if (
                feedHeader &&
                feedHeader.nextElementSibling
            ) {

                feed.insertBefore(
                    newPost,
                    feedHeader.nextElementSibling
                );

            } else {

                feed.appendChild(
                    newPost
                );

            }


            /*
               AKTIFKAN LIKE
            */

            activateLikeButton(
                newPost.querySelector(
                    ".like-btn"
                )
            );


            createForm.reset();


            closeCreateModal();


            showToast(
                "Diskusi berhasil dibuat."
            );

        }
    );

}


/* =========================================================
   AUTH DISPLAY
   ========================================================= */

function updateAuthDisplay() {

    if (
        !loginButton ||
        !registerButton
    ) {

        return;

    }


    const account =
        getAccount();


    /*
       LOGIN
    */

    if (
        account &&
        isLoggedIn()
    ) {

        loginButton.textContent =
            "@" +
            account.username;


        loginButton.classList.add(
            "logged-user"
        );


        registerButton.textContent =
            "Logout";


        registerButton.classList.add(
            "logout-mode"
        );

    }


    /*
       LOGOUT
    */

    else {

        loginButton.textContent =
            "Login";


        loginButton.classList.remove(
            "logged-user"
        );


        registerButton.textContent =
            "Register";


        registerButton.classList.remove(
            "logout-mode"
        );

    }

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        /*
           ACCOUNT MODAL
        */

        if (
            accountModal &&
            accountModal.classList.contains(
                "active"
            )
        ) {

            closeAccountChoice();

        }


        /*
           LOGIN MODAL
        */

        const currentLoginModal =
            document.getElementById(
                "loginModal"
            );


        if (
            currentLoginModal &&
            currentLoginModal.classList.contains(
                "active"
            )
        ) {

            closeLoginModal();

        }


        /*
           REGISTER MODAL
        */

        if (
            registerModal &&
            registerModal.classList.contains(
                "active"
            )
        ) {

            closeRegisterModal();

        }


        /*
           CREATE MODAL
        */

        if (
            createModal &&
            createModal.classList.contains(
                "active"
            )
        ) {

            closeCreateModal();

        }

    }
);


/* =========================================================
   MOBILE SEARCH
   ========================================================= */

const mobileSearch =
    document.querySelector(
        ".mobile-nav a:nth-child(3)"
    );


if (
    mobileSearch &&
    searchInput
) {

    mobileSearch.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            searchInput.focus();


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   COMMENT / REPLY
   Belum login -> Join XCOVIBE
   Sudah login -> sementara tampilkan toast
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const commentButton =
            event.target.closest(
                ".comment-btn"
            );


        if (!commentButton) return;


        if (
            !isLoggedIn()
        ) {

            event.preventDefault();

            openAccountModal();

            return;

        }


        showToast(
            "Fitur balas diskusi sedang disiapkan."
        );

    }
);


/* =========================================================
   INITIAL STATE
   ========================================================= */

updateAuthDisplay();


/*
   Buat login modal saat halaman siap.
   Ini tidak membuka popup,
   hanya menyiapkan sistemnya.
*/

createLoginModal();
/* =========================================================
   LOGIN POPUP - CLOSE FIX
   ========================================================= */

function forceCloseLoginPopup() {
    const loginModal = document.getElementById("loginModal");

    if (!loginModal) return;

    loginModal.classList.remove("active");
    loginModal.style.display = "none";

    document.body.style.overflow = "";
}


/* X */

document.addEventListener("click", function (event) {

    if (event.target.closest("#closeLogin")) {

        event.preventDefault();
        event.stopPropagation();

        forceCloseLoginPopup();

    }

});


/* CANCEL */

document.addEventListener("click", function (event) {

    if (event.target.closest("#cancelLogin")) {

        event.preventDefault();
        event.stopPropagation();

        forceCloseLoginPopup();

    }

});


/* KLIK DI LUAR FRAME */

document.addEventListener("click", function (event) {

    const loginModal =
        document.getElementById("loginModal");

    if (!loginModal) return;

    if (event.target === loginModal) {

        forceCloseLoginPopup();

    }

});


/* ESC */

document.addEventListener("keydown", function (event) {

    if (event.key !== "Escape") return;

    forceCloseLoginPopup();

});