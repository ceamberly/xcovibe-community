/* =========================
   XCOVIBE COMMUNITY
   ========================= */


/* =========================
   THEME
   ========================= */

const savedTheme = localStorage.getItem("xcovibe-theme");

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


/* =========================
   SEARCH
   ========================= */

const searchInput = document.getElementById("searchInput");
const posts = document.querySelectorAll(".post");
const emptyResult = document.getElementById("emptyResult");


searchInput.addEventListener("input", function () {

    const keyword = this.value
        .toLowerCase()
        .trim();

    let visiblePosts = 0;


    posts.forEach(function (post) {

        const content = post.textContent.toLowerCase();

        if (content.includes(keyword)) {

            post.style.display = "block";

            visiblePosts++;

        } else {

            post.style.display = "none";

        }

    });


    if (visiblePosts === 0) {

        emptyResult.style.display = "block";

    } else {

        emptyResult.style.display = "none";

    }

});


/* =========================
   COMMUNITY FILTER
   ========================= */

const communityButtons =
    document.querySelectorAll(".community-item");


communityButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        communityButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");


        const category =
            this.dataset.category;


        let visiblePosts = 0;


        posts.forEach(function (post) {

            const postCategory =
                post.dataset.category;


            if (
                category === "all" ||
                postCategory === category
            ) {

                post.style.display = "block";

                visiblePosts++;

            } else {

                post.style.display = "none";

            }

        });


        if (visiblePosts === 0) {

            emptyResult.style.display = "block";

        } else {

            emptyResult.style.display = "none";

        }

    });

});


/* =========================
   LIKE BUTTON
   ========================= */

const likeButtons =
    document.querySelectorAll(".like-btn");


likeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        this.classList.toggle("liked");


        const count =
            this.querySelector("span");


        let number =
            parseInt(count.textContent);


        if (this.classList.contains("liked")) {

            number++;

        } else {

            number--;

        }


        count.textContent = number;

    });

});


/* =========================
   SORT BUTTON
   ========================= */

const sortButton =
    document.getElementById("sortBtn");


sortButton.addEventListener("click", function () {

    if (this.textContent.includes("Latest")) {

        this.textContent = "Popular ↓";

    } else {

        this.textContent = "Latest ↓";

    }

});


/* =========================
   LOGIN / REGISTER
   ========================= */

const loginButton =
    document.querySelector(".login-btn");

const registerButton =
    document.querySelector(".register-btn");


loginButton.addEventListener("click", function () {

    alert("Fitur Login akan ditambahkan.");

});


registerButton.addEventListener("click", function () {

    alert("Fitur Register akan ditambahkan.");

});


/* =========================
   CREATE DISCUSSION
   ========================= */

const createButton =
    document.querySelector(".create-btn");


createButton.addEventListener("click", function () {

    alert("Form Create Discussion akan ditambahkan.");

});


/* =========================
   MOBILE SEARCH
   ========================= */

const mobileSearch =
    document.querySelector(".mobile-nav a:nth-child(3)");


mobileSearch.addEventListener("click", function (event) {

    event.preventDefault();

    searchInput.focus();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});