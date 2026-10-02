window.XCOVIBE = window.XCOVIBE || {};

XCOVIBE.account = (() => {

    const ACCOUNT_KEY = "xcovibe-account";
    const LOGIN_KEY = "xcovibe-logged-in";


    function getAccount() {

        try {
            return JSON.parse(
                localStorage.getItem(ACCOUNT_KEY)
            ) || null;

        } catch {
            return null;
        }

    }


    function isLoggedIn() {

        return (
            localStorage.getItem(LOGIN_KEY) === "true" &&
            !!getAccount()
        );

    }


    function getUsername() {

        const account = getAccount();

        return account ? account.username : "";

    }


    function openLogin() {

        XCOVIBE.ui.closeAllModals();
        XCOVIBE.ui.openModal("loginModal");

        setTimeout(() => {

            const input =
                document.getElementById("loginIdentifier");

            if (input) input.focus();

        }, 100);

    }


    function openRegister() {

        XCOVIBE.ui.closeAllModals();
        XCOVIBE.ui.openModal("registerModal");

    }


    function closeLogin() {

        XCOVIBE.ui.closeModal("loginModal");

    }


    function closeRegister() {

        XCOVIBE.ui.closeModal("registerModal");

    }


    function register(event) {

        event.preventDefault();

        const username =
            document
                .getElementById("registerUsername")
                .value
                .trim();

        const email =
            document
                .getElementById("registerEmail")
                .value
                .trim()
                .toLowerCase();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document
                .getElementById("registerConfirmPassword")
                .value;


        if (username.length < 3) {

            XCOVIBE.ui.toast(
                "Username minimal 3 karakter."
            );

            return;
        }


        if (!/^[a-zA-Z0-9_]+$/.test(username)) {

            XCOVIBE.ui.toast(
                "Username hanya boleh huruf, angka, dan underscore."
            );

            return;
        }


        if (!email.includes("@")) {

            XCOVIBE.ui.toast(
                "Masukkan email yang valid."
            );

            return;
        }


        if (password.length < 6) {

            XCOVIBE.ui.toast(
                "Password minimal 6 karakter."
            );

            return;
        }


        if (password !== confirmPassword) {

            XCOVIBE.ui.toast(
                "Konfirmasi password tidak sama."
            );

            return;
        }


        if (getAccount()) {

            XCOVIBE.ui.toast(
                "Akun sudah tersedia. Silakan Login."
            );

            return;
        }


        const account = {
            username,
            email,
            password,
            bio: "",
            avatar: username.charAt(0).toUpperCase(),
            createdAt: new Date().toISOString()
        };


        localStorage.setItem(
            ACCOUNT_KEY,
            JSON.stringify(account)
        );

        localStorage.setItem(
            LOGIN_KEY,
            "true"
        );


        document
            .getElementById("registerForm")
            .reset();


        closeRegister();

        updateAuthDisplay();


        XCOVIBE.ui.toast(
            `Selamat datang, @${username}!`
        );

    }


    function login(event) {

        event.preventDefault();

        const identifier =
            document
                .getElementById("loginIdentifier")
                .value
                .trim()
                .toLowerCase();

        const password =
            document.getElementById("loginPassword").value;


        const account = getAccount();


        if (!account) {

            closeLogin();
            openRegister();

            XCOVIBE.ui.toast(
                "Belum ada akun. Silakan Register."
            );

            return;
        }


        const validIdentifier =
            account.username.toLowerCase() === identifier ||
            account.email.toLowerCase() === identifier;


        if (!validIdentifier || account.password !== password) {

            XCOVIBE.ui.toast(
                "Username/email atau password salah."
            );

            return;
        }


        localStorage.setItem(
            LOGIN_KEY,
            "true"
        );


        document
            .getElementById("loginForm")
            .reset();


        closeLogin();

        updateAuthDisplay();


        XCOVIBE.ui.toast(
            `Login berhasil. @${account.username}`
        );

    }


    function logout() {

        localStorage.removeItem(LOGIN_KEY);

        updateAuthDisplay();

        XCOVIBE.ui.toast(
            "Kamu berhasil logout."
        );

    }


    function updateAuthDisplay() {

        const loginButton =
            document.querySelector(".login-btn");

        const registerButton =
            document.querySelector(".register-btn");


        if (!loginButton || !registerButton) return;


        if (isLoggedIn()) {

            const username = getUsername();


            loginButton.textContent =
                `@${username}`;

            loginButton.classList.add(
                "logged-user"
            );


            registerButton.textContent =
                "Logout";

            registerButton.classList.add(
                "logout-mode"
            );


            loginButton.onclick = () => {

                XCOVIBE.ui.toast(
                    `Login sebagai @${username}`
                );

            };


            registerButton.onclick = logout;


        } else {

            loginButton.textContent = "Login";
            registerButton.textContent = "Register";

            loginButton.classList.remove(
                "logged-user"
            );

            registerButton.classList.remove(
                "logout-mode"
            );


            loginButton.onclick =
                openLogin;

            registerButton.onclick =
                openRegister;

        }

    }


    function init() {

        document
            .getElementById("loginForm")
            ?.addEventListener(
                "submit",
                login
            );


        document
            .getElementById("registerForm")
            ?.addEventListener(
                "submit",
                register
            );


        document
            .getElementById("closeLogin")
            ?.addEventListener(
                "click",
                closeLogin
            );


        document
            .getElementById("cancelLogin")
            ?.addEventListener(
                "click",
                closeLogin
            );


        document
            .getElementById("closeRegister")
            ?.addEventListener(
                "click",
                closeRegister
            );


        document
            .getElementById("cancelRegister")
            ?.addEventListener(
                "click",
                closeRegister
            );


        document
            .getElementById("accountLoginBtn")
            ?.addEventListener(
                "click",
                openLogin
            );


        document
            .getElementById("accountRegisterBtn")
            ?.addEventListener(
                "click",
                openRegister
            );


        updateAuthDisplay();

    }


    return {
        init,
        getAccount,
        getUsername,
        isLoggedIn,
        openLogin,
        openRegister,
        logout,
        updateAuthDisplay
    };

})();