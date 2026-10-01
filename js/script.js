const body = document.body;

const navLinks = document.querySelectorAll(
    ".nav-menu a"
);


/* =========================
   THEME
========================= */

function setTheme(theme) {

    body.setAttribute(
        "data-theme",
        theme
    );

    localStorage.setItem(
        "xcovibe-theme",
        theme
    );
}


/* =========================
   LOAD THEME
========================= */

const savedTheme =
    localStorage.getItem(
        "xcovibe-theme"
    );

if (savedTheme) {

    setTheme(savedTheme);

} else {

    setTheme("system");
}


/* =========================
   SYSTEM THEME
========================= */

const systemTheme =
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    );

systemTheme.addEventListener(
    "change",
    function () {

        const currentTheme =
            localStorage.getItem(
                "xcovibe-theme"
            );

        if (currentTheme === "system") {

            body.setAttribute(
                "data-theme",
                "system"
            );
        }
    }
);


/* =========================
   NAVIGATION
========================= */

navLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function () {

            navLinks.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );
                }
            );

            this.classList.add(
                "active"
            );
        }
    );

});


/* =========================
   ACTIVE NAV ON SCROLL
========================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

window.addEventListener(
    "scroll",
    function () {

        let currentSection = "";

        sections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop - 150;

                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    currentSection =
                        section.getAttribute(
                            "id"
                        );
                }
            }
        );


        navLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );

                const href =
                    link.getAttribute(
                        "href"
                    );

                if (
                    href ===
                    "#" + currentSection
                ) {

                    link.classList.add(
                        "active"
                    );
                }
            }
        );

    }
);


/* =========================
   READY
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "XCOVIBE COMMUNITY berhasil dimuat."
        );

    }
);