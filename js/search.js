window.XCOVIBE = window.XCOVIBE || {};

XCOVIBE.search = (() => {

    let currentCategory = "all";
    let currentSort = "latest";


    function getPosts() {

        return [
            ...document.querySelectorAll(".post")
        ];

    }


    function applyFilters() {

        const query =
            document
                .getElementById("searchInput")
                .value
                .toLowerCase()
                .trim();


        const posts = getPosts();

        let visible = 0;


        posts.forEach(post => {

            const category =
                post.dataset.category || "";

            const text =
                post.textContent.toLowerCase();


            const categoryMatch =
                currentCategory === "all" ||
                category === currentCategory;


            const searchMatch =
                !query ||
                text.includes(query);


            const show =
                categoryMatch &&
                searchMatch;


            post.style.display =
                show ? "" : "none";


            if (show) visible++;

        });


        const empty =
            document.getElementById("emptyResult");


        if (empty) {

            empty.classList.toggle(
                "show",
                visible === 0
            );

        }

    }


    function setupCategories() {

        document
            .querySelectorAll(".community-item")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelectorAll(
                                ".community-item"
                            )
                            .forEach(item => {
                                item.classList.remove(
                                    "active"
                                );
                            });


                        button.classList.add(
                            "active"
                        );


                        currentCategory =
                            button.dataset.category ||
                            "all";


                        applyFilters();

                    }
                );

            });

    }


    function setupSearch() {

        document
            .getElementById("searchInput")
            ?.addEventListener(
                "input",
                applyFilters
            );

    }


    function setupSort() {

        const sortButton =
            document.getElementById("sortBtn");


        if (!sortButton) return;


        sortButton.addEventListener(
            "click",
            () => {

                currentSort =
                    currentSort === "latest"
                        ? "popular"
                        : "latest";


                sortButton.textContent =
                    currentSort === "latest"
                        ? "Latest ↓"
                        : "Popular ↓";


                if (currentSort === "popular") {

                    const feed =
                        document.querySelector(".feed");

                    const posts =
                        getPosts();


                    posts
                        .sort((a, b) => {

                            const aLikes =
                                parseInt(
                                    a.querySelector(
                                        ".like-btn span"
                                    )?.textContent || "0",
                                    10
                                );


                            const bLikes =
                                parseInt(
                                    b.querySelector(
                                        ".like-btn span"
                                    )?.textContent || "0",
                                    10
                                );


                            return bLikes - aLikes;

                        })
                        .forEach(post => {

                            const empty =
                                document.getElementById(
                                    "emptyResult"
                                );

                            feed.insertBefore(
                                post,
                                empty
                            );

                        });

                }

            }
        );

    }


    function init() {

        setupCategories();
        setupSearch();
        setupSort();

    }


    return {
        init,
        applyFilters
    };

})();