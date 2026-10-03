/* =========================================================
   XCOVIBE COMMUNITY
   ACCOUNT + COMMUNITY SYSTEM
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const searchInput =
        document.getElementById("searchInput");

    const emptyResult =
        document.getElementById("emptyResult");

    const sortButton =
        document.getElementById("sortBtn");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    const loginButton =
        document.querySelector(".login-btn");

    const registerButton =
        document.querySelector(".register-btn");

    const createButton =
        document.querySelector(".create-btn");

    const accountModal =
        document.getElementById("accountModal");

    const closeAccountModal =
        document.getElementById("closeAccountModal");

    const accountLoginBtn =
        document.getElementById("accountLoginBtn");

    const accountRegisterBtn =
        document.getElementById("accountRegisterBtn");

    const registerModal =
        document.getElementById("registerModal");

    const closeRegister =
        document.getElementById("closeRegister");

    const cancelRegister =
        document.getElementById("cancelRegister");

    const registerForm =
        document.getElementById("registerForm");

    const createModal =
        document.getElementById("createModal");

    const closeModal =
        document.getElementById("closeModal");

    const cancelModal =
        document.getElementById("cancelModal");

    const createForm =
        document.getElementById("createForm");


    /* =====================================================
       STORAGE
       ===================================================== */

    const ACCOUNTS_KEY =
        "xcovibe-accounts";

    const CURRENT_USER_KEY =
        "xcovibe-current-user";

    const LOGGED_IN_KEY =
        "xcovibe-logged-in";

    const LEGACY_ACCOUNT_KEY =
        "xcovibe-account";


    /* =====================================================
       TOAST
       ===================================================== */

    let toastTimer;

    function showToast(message) {

        if (!toast || !toastMessage) {
            return;
        }

        clearTimeout(toastTimer);

        toastMessage.textContent = message;

        toast.classList.add("show");

        toastTimer = setTimeout(function () {

            toast.classList.remove("show");

        }, 3000);

    }


    /* =====================================================
       ACCOUNT STORAGE
       ===================================================== */

    function getAccounts() {

        const saved =
            localStorage.getItem(ACCOUNTS_KEY);

        if (!saved) {
            return [];
        }

        try {

            const accounts =
                JSON.parse(saved);

            return Array.isArray(accounts)
                ? accounts
                : [];

        } catch (error) {

            return [];

        }

    }


    function saveAccounts(accounts) {

        localStorage.setItem(
            ACCOUNTS_KEY,
            JSON.stringify(accounts)
        );

    }


    /*
       MIGRASI SISTEM LAMA

       Kalau sebelumnya ada:
       xcovibe-account

       akun tersebut dipindahkan
       ke sistem multi-account.
    */

    function migrateOldAccount() {

        const oldAccount =
            localStorage.getItem(
                LEGACY_ACCOUNT_KEY
            );

        if (!oldAccount) {
            return;
        }

        try {

            const account =
                JSON.parse(oldAccount);

            if (
                !account ||
                !account.username ||
                !account.email ||
                !account.password
            ) {
                return;
            }

            const accounts =
                getAccounts();

            const alreadyExists =
                accounts.some(function (item) {

                    return (
                        item.username.toLowerCase() ===
                        account.username.toLowerCase()
                    );

                });

            if (!alreadyExists) {

                accounts.push({
                    username: account.username,
                    email: account.email,
                    password: account.password
                });

                saveAccounts(accounts);

            }

        } catch (error) {

            console.log(
                "Migrasi akun lama gagal."
            );

        }

    }


    migrateOldAccount();


    /* =====================================================
       CURRENT USER
       ===================================================== */

    function getCurrentUsername() {

        return localStorage.getItem(
            CURRENT_USER_KEY
        );

    }


    function getCurrentAccount() {

        const username =
            getCurrentUsername();

        if (!username) {
            return null;
        }

        const accounts =
            getAccounts();

        return accounts.find(function (account) {

            return (
                account.username.toLowerCase() ===
                username.toLowerCase()
            );

        }) || null;

    }


    function isLoggedIn() {

        return (
            localStorage.getItem(
                LOGGED_IN_KEY
            ) === "true" &&
            getCurrentAccount() !== null
        );

    }


    /* =====================================================
       LOGIN SESSION
       ===================================================== */

    function loginAccount(account) {

        localStorage.setItem(
            CURRENT_USER_KEY,
            account.username
        );

        localStorage.setItem(
            LOGGED_IN_KEY,
            "true"
        );

        updateAuthDisplay();

    }


    function logoutAccount() {

        localStorage.removeItem(
            CURRENT_USER_KEY
        );

        localStorage.removeItem(
            LOGGED_IN_KEY
        );

        updateAuthDisplay();

        showToast(
            "Kamu telah logout."
        );

    }


    /* =====================================================
       MODAL HELPER
       ===================================================== */

    function openModal(modal) {

        if (!modal) {
            return;
        }

        modal.classList.add("active");

        document.body.style.overflow =
            "hidden";

    }


    function closeModalWindow(modal) {

        if (!modal) {
            return;
        }

        modal.classList.remove("active");

        document.body.style.overflow =
            "";

    }


    /* =====================================================
       ACCOUNT CHOICE
       ===================================================== */

    function openAccountChoice() {

        openModal(accountModal);

    }


    function closeAccountChoice() {

        closeModalWindow(
            accountModal
        );

    }


    closeAccountModal.addEventListener(
        "click",
        closeAccountChoice
    );


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


    /* =====================================================
       LOGIN MODAL
       ===================================================== */

    let loginModal = null;

    let loginForm = null;

    let loginIdentifier = null;

    let loginPassword = null;


    function createLoginModal() {

        if (
            document.getElementById(
                "loginModal"
            )
        ) {

            loginModal =
                document.getElementById(
                    "loginModal"
                );

            loginForm =
                document.getElementById(
                    "loginForm"
                );

            loginIdentifier =
                document.getElementById(
                    "loginIdentifier"
                );

            loginPassword =
                document.getElementById(
                    "loginPassword"
                );

            return;

        }


        loginModal =
            document.createElement("div");

        loginModal.className =
            "modal-overlay";

        loginModal.id =
            "loginModal";

        loginModal.innerHTML = `
            <div class="modal-content">

                <div class="modal-header">

                    <div>
                        <span class="section-label">
                            WELCOME BACK
                        </span>

                        <h2>
                            Login to XCOVIBE
                        </h2>
                    </div>

                    <button
                        type="button"
                        class="modal-close"
                        id="closeLogin"
                        aria-label="Close"
                    >
                        &times;
                    </button>

                </div>

                <p style="
                    margin: 0 0 18px;
                    color: var(--text-soft);
                ">
                    Masuk kembali dan lanjutkan vibe kamu.
                </p>

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


        loginForm =
            document.getElementById(
                "loginForm"
            );

        loginIdentifier =
            document.getElementById(
                "loginIdentifier"
            );

        loginPassword =
            document.getElementById(
                "loginPassword"
            );


        document
            .getElementById("closeLogin")
            .addEventListener(
                "click",
                closeLoginModal
            );


        document
            .getElementById("cancelLogin")
            .addEventListener(
                "click",
                closeLoginModal
            );


        loginModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    loginModal
                ) {

                    closeLoginModal();

                }

            }
        );


        loginForm.addEventListener(
            "submit",
            handleLogin
        );

    }


    function openLoginModal(identifier) {

        createLoginModal();

        closeAccountChoice();

        openModal(loginModal);

        if (identifier) {

            loginIdentifier.value =
                identifier;

        }

        setTimeout(function () {

            loginIdentifier.focus();

        }, 100);

    }


    function closeLoginModal() {

        closeModalWindow(
            loginModal
        );

    }


    /* =====================================================
       LOGIN PROCESS
       ===================================================== */

    function handleLogin(event) {

        event.preventDefault();

        const identifier =
            loginIdentifier.value.trim();

        const password =
            loginPassword.value;


        if (
            !identifier ||
            !password
        ) {

            showToast(
                "Username/email dan password wajib diisi."
            );

            return;

        }


        const accounts =
            getAccounts();


        const account =
            accounts.find(function (item) {

                return (
                    item.username.toLowerCase() ===
                    identifier.toLowerCase() ||
                    item.email.toLowerCase() ===
                    identifier.toLowerCase()
                );

            });


        /*
           AKUN TIDAK DITEMUKAN
           -> REGISTER
        */

        if (!account) {

            closeLoginModal();

            showToast(
                "Akun belum terdaftar. Silakan Register."
            );

            setTimeout(function () {

                openRegisterModal(
                    identifier
                );

            }, 350);

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
                "Password salah. Silakan coba lagi."
            );

            loginPassword.value = "";

            loginPassword.focus();

            return;

        }


        /*
           LOGIN BERHASIL
        */

        loginAccount(account);

        closeLoginModal();

        loginForm.reset();

        showToast(
            "Selamat datang kembali, @" +
            account.username +
            "!"
        );

    }


    /* =====================================================
       TOP LOGIN BUTTON
       ===================================================== */

    loginButton.addEventListener(
        "click",
        function () {

            if (isLoggedIn()) {

                const account =
                    getCurrentAccount();

                showToast(
                    "Kamu sedang login sebagai @" +
                    account.username
                );

                return;

            }

            openLoginModal();

        }
    );


    /* =====================================================
       REGISTER MODAL
       ===================================================== */

    function openRegisterModal(prefill) {

        closeAccountChoice();

        openModal(registerModal);

        if (prefill) {

            const usernameInput =
                document.getElementById(
                    "registerUsername"
                );

            const emailInput =
                document.getElementById(
                    "registerEmail"
                );


            /*
               Kalau input terlihat seperti email,
               masukkan ke email.
            */

            if (
                prefill.includes("@")
            ) {

                emailInput.value =
                    prefill;

            } else {

                usernameInput.value =
                    prefill;

            }

        }

        setTimeout(function () {

            document
                .getElementById(
                    "registerUsername"
                )
                .focus();

        }, 100);

    }


    registerButton.addEventListener(
        "click",
        function () {

            /*
               Kalau sedang login,
               tombol ini menjadi LOGOUT.
            */

            if (isLoggedIn()) {

                logoutAccount();

                return;

            }

            openRegisterModal();

        }
    );


    closeRegister.addEventListener(
        "click",
        function () {

            closeModalWindow(
                registerModal
            );

        }
    );


    cancelRegister.addEventListener(
        "click",
        function () {

            closeModalWindow(
                registerModal
            );

        }
    );


    registerModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                registerModal
            ) {

                closeModalWindow(
                    registerModal
                );

            }

        }
    );


    /* =====================================================
       ACCOUNT CHOICE -> LOGIN
       ===================================================== */

    accountLoginBtn.addEventListener(
        "click",
        function () {

            openLoginModal();

        }
    );


    /* =====================================================
       ACCOUNT CHOICE -> REGISTER
       ===================================================== */

    accountRegisterBtn.addEventListener(
        "click",
        function () {

            openRegisterModal();

        }
    );


    /* =====================================================
       REGISTER PROCESS
       ===================================================== */

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


            /*
               USERNAME
            */

            if (
                username.length < 3
            ) {

                showToast(
                    "Username minimal 3 karakter."
                );

                return;

            }


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


            /*
               EMAIL
            */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    email
                )
            ) {

                showToast(
                    "Format email tidak valid."
                );

                return;

            }


            /*
               PASSWORD
            */

            if (
                password.length < 6
            ) {

                showToast(
                    "Password minimal 6 karakter."
                );

                return;

            }


            /*
               CONFIRM PASSWORD
            */

            if (
                password !==
                confirmPassword
            ) {

                showToast(
                    "Konfirmasi password tidak cocok."
                );

                return;

            }


            const accounts =
                getAccounts();


            /*
               CEK USERNAME
            */

            const usernameExists =
                accounts.find(function (account) {

                    return (
                        account.username.toLowerCase() ===
                        username.toLowerCase()
                    );

                });


            /*
               USERNAME SUDAH ADA
            */

            if (usernameExists) {

                /*
                   Username + password sama
                   -> langsung login
                */

                if (
                    usernameExists.password ===
                    password
                ) {

                    loginAccount(
                        usernameExists
                    );

                    registerForm.reset();

                    closeModalWindow(
                        registerModal
                    );

                    showToast(
                        "Akun ditemukan. Kamu langsung login sebagai @" +
                        usernameExists.username +
                        "."
                    );

                    return;

                }


                /*
                   Username sama,
                   password berbeda
                */

                showToast(
                    "Username sudah terdaftar. Silakan Login."
                );

                return;

            }


            /*
               CEK EMAIL
            */

            const emailExists =
                accounts.find(function (account) {

                    return (
                        account.email.toLowerCase() ===
                        email.toLowerCase()
                    );

                });


            if (emailExists) {

                showToast(
                    "Email sudah terdaftar. Silakan gunakan email lain."
                );

                return;

            }


            /*
               BUAT AKUN BARU
            */

            const newAccount = {

                username: username,

                email: email,

                password: password

            };


            accounts.push(
                newAccount
            );


            saveAccounts(
                accounts
            );


            /*
               REGISTER LANGSUNG LOGIN
            */

            loginAccount(
                newAccount
            );


            registerForm.reset();

            closeModalWindow(
                registerModal
            );


            showToast(
                "Akun berhasil dibuat. Selamat datang, @" +
                username +
                "!"
            );

        }
    );


    /* =====================================================
       CREATE DISCUSSION
       ===================================================== */

    createButton.addEventListener(
        "click",
        function () {

            if (!isLoggedIn()) {

                openAccountChoice();

                return;

            }

            openModal(
                createModal
            );

            setTimeout(function () {

                document
                    .getElementById(
                        "postTitle"
                    )
                    .focus();

            }, 100);

        }
    );


    closeModal.addEventListener(
        "click",
        function () {

            closeModalWindow(
                createModal
            );

        }
    );


    cancelModal.addEventListener(
        "click",
        function () {

            closeModalWindow(
                createModal
            );

        }
    );


    createModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                createModal
            ) {

                closeModalWindow(
                    createModal
                );

            }

        }
    );


    /* =====================================================
       CREATE POST
       ===================================================== */

    createForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (!isLoggedIn()) {

                closeModalWindow(
                    createModal
                );

                openAccountChoice();

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
                getCurrentAccount();


            if (!account) {

                return;

            }


            const categoryNames = {

                general: "General",

                gaming: "Gaming",

                technology: "Technology",

                creative: "Creative"

            };


            const categoryName =
                categoryNames[
                    category
                ];


            const avatar =
                account.username
                    .charAt(0)
                    .toUpperCase();


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
                                ${escapeHTML(account.username)}
                            </strong>

                            <span>
                                ${categoryName} · just now
                            </span>

                        </div>

                    </div>

                    <button
                        class="more-btn"
                        type="button"
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
                        class="like-btn"
                        type="button"
                    >
                        ♡
                        <span>0</span>
                    </button>

                    <button
                        class="comment-btn"
                        type="button"
                    >
                        💬
                        <span>0</span>
                    </button>

                    <button
                        type="button"
                        class="share-btn"
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


            feed.insertBefore(
                newPost,
                feedHeader.nextElementSibling
            );


            activateLikeButton(
                newPost.querySelector(
                    ".like-btn"
                )
            );


            activateCommentButton(
                newPost.querySelector(
                    ".comment-btn"
                )
            );


            createForm.reset();


            closeModalWindow(
                createModal
            );


            showToast(
                "Diskusi berhasil dibuat."
            );

        }
    );


    /* =====================================================
       LIKE SYSTEM
       ===================================================== */

    function activateLikeButton(button) {

        if (!button) {
            return;
        }

        if (
            button.dataset.ready ===
            "true"
        ) {
            return;
        }

        button.dataset.ready =
            "true";


        button.addEventListener(
            "click",
            function () {

                /*
                   WAJIB LOGIN
                */

                if (!isLoggedIn()) {

                    openAccountChoice();

                    return;

                }


                this.classList.toggle(
                    "liked"
                );


                const count =
                    this.querySelector(
                        "span"
                    );


                let number =
                    parseInt(
                        count.textContent
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

                    number--;

                    if (number < 0) {
                        number = 0;
                    }

                    this.firstChild.textContent =
                        "♡ ";

                }


                count.textContent =
                    number;

            }
        );

    }


    document
        .querySelectorAll(
            ".like-btn"
        )
        .forEach(
            activateLikeButton
        );


    /* =====================================================
       COMMENT SYSTEM
       ===================================================== */

    function activateCommentButton(button) {

        if (!button) {
            return;
        }

        if (
            button.dataset.ready ===
            "true"
        ) {
            return;
        }

        button.dataset.ready =
            "true";


        button.addEventListener(
            "click",
            function () {

                if (!isLoggedIn()) {

                    openAccountChoice();

                    return;

                }


                const post =
                    this.closest(
                        ".post"
                    );


                if (!post) {
                    return;
                }


                let commentBox =
                    post.querySelector(
                        ".xcovibe-comment-box"
                    );


                if (commentBox) {

                    commentBox.classList.toggle(
                        "active"
                    );

                    return;

                }


                commentBox =
                    document.createElement(
                        "div"
                    );


                commentBox.className =
                    "xcovibe-comment-box active";


                commentBox.innerHTML = `

                    <div style="
                        display:flex;
                        gap:8px;
                        margin-top:14px;
                    ">

                        <input
                            type="text"
                            class="xcovibe-comment-input"
                            placeholder="Tulis komentar..."
                            maxlength="300"
                            style="
                                flex:1;
                                padding:10px 12px;
                                border:1px solid var(--border);
                                border-radius:6px;
                                background:var(--surface);
                                color:var(--text);
                                outline:none;
                            "
                        >

                        <button
                            type="button"
                            class="publish-btn xcovibe-comment-submit"
                        >
                            Kirim
                        </button>

                    </div>

                    <div
                        class="xcovibe-comments"
                        style="
                            margin-top:10px;
                        "
                    ></div>

                `;


                post
                    .querySelector(
                        ".post-actions"
                    )
                    .insertAdjacentElement(
                        "afterend",
                        commentBox
                    );


                const input =
                    commentBox.querySelector(
                        ".xcovibe-comment-input"
                    );


                const submit =
                    commentBox.querySelector(
                        ".xcovibe-comment-submit"
                    );


                submit.addEventListener(
                    "click",
                    function () {

                        const text =
                            input.value.trim();


                        if (!text) {

                            showToast(
                                "Komentar tidak boleh kosong."
                            );

                            return;

                        }


                        const currentAccount =
                            getCurrentAccount();


                        const comment =
                            document.createElement(
                                "div"
                            );


                        comment.style.cssText = `
                            padding:8px 0;
                            border-bottom:1px solid var(--border);
                        `;


                        comment.innerHTML = `

                            <strong>
                                @${escapeHTML(
                                    currentAccount.username
                                )}
                            </strong>

                            <span style="
                                color:var(--text-soft);
                            ">
                                ${escapeHTML(text)}
                            </span>

                        `;


                        commentBox
                            .querySelector(
                                ".xcovibe-comments"
                            )
                            .appendChild(
                                comment
                            );


                        input.value = "";


                        showToast(
                            "Komentar ditambahkan."
                        );

                    }
                );


                input.focus();

            }
        );

    }


    document
        .querySelectorAll(
            ".post-actions button:nth-child(2)"
        )
        .forEach(
            activateCommentButton
        );


    /* =====================================================
       SEARCH
       ===================================================== */

    function updateSearch() {

        const keyword =
            searchInput.value
                .toLowerCase()
                .trim();


        let visiblePosts = 0;


        document
            .querySelectorAll(
                ".post"
            )
            .forEach(
                function (post) {

                    const content =
                        post.textContent
                            .toLowerCase();


                    if (
                        content.includes(
                            keyword
                        )
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


        updateEmptyResult(
            visiblePosts
        );

    }


    searchInput.addEventListener(
        "input",
        updateSearch
    );


    /* =====================================================
       COMMUNITY FILTER
       ===================================================== */

    const communityButtons =
        document.querySelectorAll(
            ".community-item"
        );


    communityButtons.forEach(
        function (button) {

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


                    this.classList.add(
                        "active"
                    );


                    const category =
                        this.dataset.category;


                    let visiblePosts = 0;


                    document
                        .querySelectorAll(
                            ".post"
                        )
                        .forEach(
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


                    updateEmptyResult(
                        visiblePosts
                    );

                }
            );

        }
    );


    function updateEmptyResult(
        visiblePosts
    ) {

        if (
            visiblePosts === 0
        ) {

            emptyResult.style.display =
                "block";

        } else {

            emptyResult.style.display =
                "none";

        }

    }


    /* =====================================================
       SORT
       ===================================================== */

    let popularMode = false;


    sortButton.addEventListener(
        "click",
        function () {

            popularMode =
                !popularMode;


            const feed =
                document.querySelector(
                    ".feed"
                );


            const posts =
                Array.from(
                    feed.querySelectorAll(
                        ".post"
                    )
                );


            if (popularMode) {

                posts.sort(
                    function (a, b) {

                        const aLike =
                            parseInt(
                                a.querySelector(
                                    ".like-btn span"
                                ).textContent
                            ) || 0;


                        const bLike =
                            parseInt(
                                b.querySelector(
                                    ".like-btn span"
                                ).textContent
                            ) || 0;


                        return bLike - aLike;

                    }
                );


                sortButton.textContent =
                    "Popular ↓";

            } else {

                sortButton.textContent =
                    "Latest ↓";


                /*
                   Post baru berada
                   di bagian atas.
                   Untuk post lama,
                   kita kembalikan berdasarkan
                   posisi data DOM.
                */

                posts.reverse();

            }


            posts.forEach(
                function (post) {

                    feed.appendChild(
                        post
                    );

                }
            );

        }
    );


    /* =====================================================
       MOBILE SEARCH
       ===================================================== */

    const mobileSearch =
        document.querySelector(
            ".mobile-nav a:nth-child(3)"
        );


    if (mobileSearch) {

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


    /* =====================================================
       ESCAPE HTML
       ===================================================== */

    function escapeHTML(text) {

        const div =
            document.createElement(
                "div"
            );

        div.textContent =
            text;

        return div.innerHTML;

    }


    /* =====================================================
       AUTH DISPLAY
       ===================================================== */

    function updateAuthDisplay() {

        const account =
            getCurrentAccount();


        if (
            isLoggedIn() &&
            account
        ) {

            loginButton.textContent =
                "@" + account.username;


            registerButton.textContent =
                "Logout";


            registerButton.classList.add(
                "logout-mode"
            );

        } else {

            loginButton.textContent =
                "Login";


            registerButton.textContent =
                "Register";


            registerButton.classList.remove(
                "logout-mode"
            );

        }

    }


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !==
                "Escape"
            ) {
                return;
            }


            closeAccountChoice();

            closeLoginModal();

            closeModalWindow(
                registerModal
            );

            closeModalWindow(
                createModal
            );

        }
    );


    /* =====================================================
       INITIALIZE
       ===================================================== */

    createLoginModal();

    updateAuthDisplay();


    console.log(
        "XCOVIBE Community System aktif."
    );

});