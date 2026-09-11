"use strict";


/* =============================================================
   GRAMACART / NOVA — MAIN JAVASCRIPT
============================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =========================================================
       VIDEO
    ========================================================== */

    const heroVideo =
        document.querySelector(".video-hero__media");


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (heroVideo) {

        /*
         * Autoplay is muted intentionally.
         * Browsers generally block autoplay with sound.
         */

        const startVideo = () => {

            if (reducedMotion.matches) {
                heroVideo.pause();
                return;
            }

            const playPromise =
                heroVideo.play();

            if (playPromise !== undefined) {

                playPromise.catch(() => {
                    /*
                     * Autoplay may be blocked.
                     * Poster image remains as fallback.
                     */
                });

            }

        };


        if (heroVideo.readyState >= 2) {

            startVideo();

        } else {

            heroVideo.addEventListener(
                "loadeddata",
                startVideo,
                { once: true }
            );

        }


        /*
         * Save battery / CPU when the tab
         * is not visible.
         */

        document.addEventListener(
            "visibilitychange",
            () => {

                if (document.hidden) {

                    heroVideo.pause();

                } else {

                    startVideo();

                }

            }
        );

    }



    /* =========================================================
       INGREDIENT PANELS
    ========================================================== */

    const productImages =
        document.querySelectorAll(
            ".product-image"
        );


    const closeAllIngredientPanels =
        () => {

            productImages.forEach(
                (product) => {

                    product.classList.remove(
                        "ingredients-open"
                    );


                    const hitArea =
                        product.querySelector(
                            ".dish-hit-area"
                        );


                    const panel =
                        product.querySelector(
                            ".ingredient-panel"
                        );


                    if (hitArea) {

                        hitArea.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }


                    if (panel) {

                        panel.setAttribute(
                            "aria-hidden",
                            "true"
                        );

                    }

                }
            );

        };



    productImages.forEach(
        (product) => {


            const hitArea =
                product.querySelector(
                    ".dish-hit-area"
                );


            const closeButton =
                product.querySelector(
                    ".ingredient-close"
                );


            const panel =
                product.querySelector(
                    ".ingredient-panel"
                );


            if (!hitArea || !panel) {
                return;
            }



            /* OPEN */

            const openPanel = () => {

                /*
                 * Only one product panel should
                 * remain open at a time.
                 */

                closeAllIngredientPanels();


                product.classList.add(
                    "ingredients-open"
                );


                hitArea.setAttribute(
                    "aria-expanded",
                    "true"
                );


                panel.setAttribute(
                    "aria-hidden",
                    "false"
                );

            };



            /* CLOSE */

            const closePanel = () => {

                product.classList.remove(
                    "ingredients-open"
                );


                hitArea.setAttribute(
                    "aria-expanded",
                    "false"
                );


                panel.setAttribute(
                    "aria-hidden",
                    "true"
                );

            };



            hitArea.addEventListener(
                "click",
                openPanel
            );


            if (closeButton) {

                closeButton.addEventListener(
                    "click",
                    (event) => {

                        event.stopPropagation();

                        closePanel();

                    }
                );

            }



            /*
             * Keyboard support.
             */

            product.addEventListener(
                "keydown",
                (event) => {

                    if (
                        event.key === "Escape" &&
                        product.classList.contains(
                            "ingredients-open"
                        )
                    ) {

                        closePanel();

                    }

                }
            );

        }
    );



    /* =========================================================
       PRODUCT TEXT BUTTONS
    ========================================================== */

    const ingredientTriggers =
        document.querySelectorAll(
            "[data-open-ingredients]"
        );


    ingredientTriggers.forEach(
        (trigger, index) => {

            trigger.addEventListener(
                "click",
                () => {

                    const product =
                        productImages[index];

                    if (!product) {
                        return;
                    }


                    const hitArea =
                        product.querySelector(
                            ".dish-hit-area"
                        );


                    if (hitArea) {

                        hitArea.click();

                        product.scrollIntoView({
                            behavior:
                                reducedMotion.matches
                                    ? "auto"
                                    : "smooth",
                            block: "center"
                        });

                    }

                }
            );

        }
    );



    /* =========================================================
       HEADER — LIGHT/DARK AUTOMATIC STATE
    ========================================================== */

    const header =
        document.querySelector(
            ".site-header"
        );


    const videoSection =
        document.querySelector(
            ".video-hero"
        );


    /*
     * Header is initially white because
     * the opening hero is dark.
     *
     * When the user scrolls into the light
     * sections, add a subtle dark state.
     */

    if (header && videoSection) {

        const updateHeader =
            () => {

                const threshold =
                    videoSection.offsetHeight - 100;


                if (window.scrollY > threshold) {

                    header.classList.add(
                        "header-light"
                    );

                } else {

                    header.classList.remove(
                        "header-light"
                    );

                }

            };


        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive: true
            }
        );


        updateHeader();

    }



    /* =========================================================
       SMOOTH INTERNAL LINKS
    ========================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior:
                            reducedMotion.matches
                                ? "auto"
                                : "smooth",
                        block: "start"
                    });

                }
            );

        }
    );



    /* =========================================================
       IMAGE ERROR FALLBACK
    ========================================================== */

    document
        .querySelectorAll("img")
        .forEach((image) => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );

                },
                { once: true }
            );

        });


});


js
/* =========================================================
   INGREDIENT IMAGE TOGGLE
   Tap image → ingredients
   Tap again → image
========================================================= */

const productImages = document.querySelectorAll(".product-image");


function closeIngredients(productImage) {

    if (!productImage) return;

    productImage.classList.remove("ingredients-open");

    const hitArea =
        productImage.querySelector(".dish-hit-area");

    const panel =
        productImage.querySelector(".ingredient-panel");

    if (hitArea) {
        hitArea.setAttribute(
            "aria-expanded",
            "false"
        );
    }

    if (panel) {
        panel.setAttribute(
            "aria-hidden",
            "true"
        );
    }
}


function openIngredients(productImage) {

    if (!productImage) return;

    /* Close other open products */

    productImages.forEach(otherProduct => {

        if (otherProduct !== productImage) {
            closeIngredients(otherProduct);
        }

    });


    productImage.classList.add("ingredients-open");

    const hitArea =
        productImage.querySelector(".dish-hit-area");

    const panel =
        productImage.querySelector(".ingredient-panel");

    if (hitArea) {
        hitArea.setAttribute(
            "aria-expanded",
            "true"
        );
    }

    if (panel) {
        panel.setAttribute(
            "aria-hidden",
            "false"
        );
    }

}


/* =========================================================
   IMAGE CLICK / TAP
========================================================= */

productImages.forEach(productImage => {

    const hitArea =
        productImage.querySelector(".dish-hit-area");


    if (!hitArea) return;


    hitArea.addEventListener("click", () => {

        const isOpen =
            productImage.classList.contains(
                "ingredients-open"
            );


        if (isOpen) {

            /* Already showing ingredients
               → bring image back */

            closeIngredients(productImage);

        } else {

            /* Showing image
               → reveal ingredients */

            openIngredients(productImage);

        }

    });

});


/* =========================================================
   PRODUCT TEXT BUTTON
   "Explore the dish" / "Discover the drink"
========================================================= */

const ingredientTriggers =
    document.querySelectorAll(
        "[data-open-ingredients]"
    );


ingredientTriggers.forEach(trigger => {

    trigger.addEventListener("click", () => {

        const productStage =
            trigger.closest(".product-stage");

        if (!productStage) return;


        const productImage =
            productStage.querySelector(".product-image");

        if (!productImage) return;


        openIngredients(productImage);

    });

});


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;


    productImages.forEach(productImage => {

        closeIngredients(productImage);

    });

});


