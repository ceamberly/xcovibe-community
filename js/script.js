/* ==================================================
   XCOVIBE COMMUNITY
   JAVASCRIPT
   ================================================== */


/* ==================================================
   1. ELEMENT
   ================================================== */

const body = document.body;

const navLinks =
    document.querySelectorAll(
        ".nav-menu a"
    );


/* ==================================================
   2. THEME SYSTEM
   ================================================== */

/*
    Pilihan tema:

    light  = Mode terang
    dark   = Mode gelap
    system = Mengikuti tema perangkat
*/

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


/* ==================================================
   3. LOAD SAVED THEME
   ================================================== */

const savedTheme =
    localStorage.getItem(
        "xcovibe-theme"
    );


if (savedTheme) {

    setTheme(savedTheme);

} else {

    /*
        Pengguna belum memilih tema.

        Website menggunakan System Mode.
    */

    setTheme("system");

}


/* ==================================================
   4. SYSTEM THEME DETECTION
   ================================================== */

const systemTheme =
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    );


systemTheme.addEventListener(
    "change",
    () => {

        const currentTheme =
            localStorage.getItem(
                "xcovibe-theme"
            );


        /*
            Hanya mengikuti perubahan
            perangkat jika mode = system.
        */

        if (
            currentTheme === "system"
        ) {

            body.setAttribute(
                "data-theme",
                "system"
            );

        }

    }
);


/* ==================================================
   5. NAVIGATION ACTIVE STATE
   ================================================== */

navLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                navLinks.forEach(
                    (item) => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                link.classList.add(
                    "active"
                );

            }
        );

    }
);


/* ==================================================
   6. SCROLL ACTIVE NAVIGATION
   ================================================== */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


window.addEventListener(
    "scroll",
    () => {

        let currentSection = "";


        sections.forEach(
            (section) => {

                const sectionTop =
                    section.offsetTop - 150;


                const sectionHeight =
                    section.offsetHeight;


                if (
                    window.scrollY >=
                        sectionTop
                    &&
                    window.scrollY <
                        sectionTop +
                        sectionHeight
                ) {

                    currentSection =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navLinks.forEach(
            (link) => {

                link.classList.remove(
                    "active"
                );


                const target =
                    link.getAttribute(
                        "href"
                    );


                if (
                    target ===
                    `#${currentSection}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* ==================================================
   7. PAGE LOADED
   ================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "XCOVIBE COMMUNITY berhasil dimuat."
        );

    }
);