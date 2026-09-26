"use strict";


/* =========================================================
   CECI & SIP
   MAIN JAVASCRIPT
========================================================= */


/*
   IMPORTANT

   Replace this number with the real
   Ceci & Sip WhatsApp number.

   Example:
   919876543210
*/

const WHATSAPP_NUMBER =
    "917019049479";



/* =========================================================
   WHATSAPP LINK
========================================================= */

function createWhatsAppLink(message) {

    return (
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message)
    );

}



/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           REDUCED MOTION
        ================================================= */

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );



        /* =================================================
           WHATSAPP
        ================================================= */

        const whatsappFloat =
            document.getElementById(
                "whatsappFloat"
            );


        if (whatsappFloat) {

            whatsappFloat.href =
                createWhatsAppLink(
                    "Hi! I'd like to place an order at Ceci & Sip."
                );

        }


        const whatsappCta =
            document.getElementById(
                "whatsappCta"
            );


        if (whatsappCta) {

            whatsappCta.href =
                createWhatsAppLink(
                    "Hi! I'd like to place an order at Ceci & Sip."
                );

        }



        /* =================================================
           HERO VIDEO
        ================================================= */

        const heroVideo =
            document.querySelector(
                ".hero-video"
            );


        if (heroVideo) {

            function playHeroVideo() {

                if (
                    reducedMotion.matches
                ) {

                    heroVideo.pause();

                    return;

                }


                const promise =
                    heroVideo.play();


                if (promise) {

                    promise.catch(
                        () => {}
                    );

                }

            }


            if (
                heroVideo.readyState >= 2
            ) {

                playHeroVideo();

            } else {

                heroVideo.addEventListener(
                    "loadeddata",
                    playHeroVideo,
                    {
                        once: true
                    }
                );

            }


            document.addEventListener(
                "visibilitychange",
                () => {

                    if (
                        document.hidden
                    ) {

                        heroVideo.pause();

                    } else {

                        playHeroVideo();

                    }

                }
            );

        }



        /* =================================================
           DRESSING DATA
        ================================================= */

        const dressings = {

            minty: {

                name: "MINTY",

                displayName: "Minty",

                number: "01",

                mood:
                    "FRESH / CREAMY / HERBY",

                copy:
                    "Mint, plain yogurt, lemon, black pepper, salt, oregano and olive oil.",

                image:
                    "images/dish.jpg",

                available: true

            },


            pane: {

                name: "PANE",

                displayName: "Pane",

                number: "02",

                mood:
                    "CREAMY / ZESTY / RICH",

                copy:
                    "Paneer, olive oil, lemon, black pepper, salt, oregano and a touch of red colour.",

                image:
                    "images/hero-dish.jpg",

                available: true

            },


            three: {

                name: "COMING SOON",

                displayName: "Coming soon",

                number: "03",

                mood:
                    "A NEW FLAVOUR",

                copy:
                    "A new flavour is on its way.",

                image:
                    "images/dish.jpg",

                available: false

            },


            four: {

                name: "COMING SOON",

                displayName: "Coming soon",

                number: "04",

                mood:
                    "SOMETHING FRESH",

                copy:
                    "Something fresh is brewing.",

                image:
                    "images/dish.jpg",

                available: false

            },


            five: {

                name: "COMING SOON",

                displayName: "Coming soon",

                number: "05",

                mood:
                    "NEXT FAVOURITE",

                copy:
                    "Your next favourite might be this one.",

                image:
                    "images/dish.jpg",

                available: false

            }

        };



        /* =================================================
           DRESSING ELEMENTS
        ================================================= */

        const dressingButtons =
            document.querySelectorAll(
                ".dressing-option"
            );


        const dressingImage =
            document.getElementById(
                "dressingImage"
            );


        const dressingStamp =
            document.getElementById(
                "dressingStamp"
            );


        const dressingNumber =
            document.getElementById(
                "dressingNumber"
            );


        const dressingLabel =
            document.getElementById(
                "dressingLabel"
            );


        const dressingMood =
            document.getElementById(
                "dressingMood"
            );


        const dressingCopy =
            document.getElementById(
                "dressingCopy"
            );


        const chooseDressing =
            document.getElementById(
                "chooseDressing"
            );


        const chooseDressingName =
            document.getElementById(
                "chooseDressingName"
            );


        let selectedDressing =
            "minty";



        /* =================================================
           UPDATE DRESSING
        ================================================= */

        function updateDressing(key) {

            const dressing =
                dressings[key];


            if (!dressing) {
                return;
            }


            selectedDressing =
                key;


            /* Buttons */

            dressingButtons.forEach(
                (button) => {

                    const isActive =
                        button.dataset.dressing ===
                        key;


                    button.classList.toggle(
                        "active",
                        isActive
                    );


                    button.setAttribute(
                        "aria-selected",
                        isActive
                            ? "true"
                            : "false"
                    );

                }
            );


            /* Image */

            if (dressingImage) {

                dressingImage.style.opacity =
                    "0";


                setTimeout(
                    () => {

                        dressingImage.src =
                            dressing.image;


                        dressingImage.alt =
                            `Ceci Bowl with ${dressing.displayName} dressing`;


                        dressingImage.style.opacity =
                            "1";

                    },
                    reducedMotion.matches
                        ? 0
                        : 130
                );

            }


            /* Number */

            if (dressingNumber) {

                dressingNumber.textContent =
                    dressing.number;

            }


            /* Name */

            if (dressingStamp) {

                dressingStamp.textContent =
                    dressing.name;

            }


            if (dressingLabel) {

                dressingLabel.textContent =
                    dressing.name;

            }


            /* Mood */

            if (dressingMood) {

                dressingMood.textContent =
                    dressing.mood;

            }


            /* Description */

            if (dressingCopy) {

                dressingCopy.textContent =
                    dressing.copy;

            }


            /* Choose button */

            if (chooseDressingName) {

                chooseDressingName.textContent =
                    dressing.displayName;

            }


            if (chooseDressing) {

                chooseDressing.disabled =
                    !dressing.available;

            }

        }



        /* =================================================
           DRESSING BUTTON EVENTS
        ================================================= */

        dressingButtons.forEach(
            (button) => {


                button.addEventListener(
                    "click",
                    () => {

                        updateDressing(
                            button.dataset.dressing
                        );

                    }
                );


                button.addEventListener(
                    "keydown",
                    (event) => {

                        if (
                            event.key !== "ArrowDown" &&
                            event.key !== "ArrowUp"
                        ) {
                            return;
                        }


                        event.preventDefault();


                        const buttons =
                            [...dressingButtons];


                        const current =
                            buttons.indexOf(
                                button
                            );


                        const direction =
                            event.key ===
                            "ArrowDown"
                                ? 1
                                : -1;


                        const next =
                            (
                                current +
                                direction +
                                buttons.length
                            ) %
                            buttons.length;


                        buttons[next].focus();


                        updateDressing(
                            buttons[next]
                                .dataset
                                .dressing
                        );

                    }
                );

            }
        );



        /* =================================================
           ORDER SELECTED DRESSING
        ================================================= */

        if (chooseDressing) {

            chooseDressing.addEventListener(
                "click",
                () => {

                    const dressing =
                        dressings[
                            selectedDressing
                        ];


                    if (
                        !dressing ||
                        !dressing.available
                    ) {
                        return;
                    }


                    const message =
                        `Hi! I'd like to order a Ceci Bowl with ${dressing.displayName} dressing.`;


                    window.open(
                        createWhatsAppLink(
                            message
                        ),
                        "_blank",
                        "noopener"
                    );

                }
            );

        }



        /* =================================================
           INGREDIENT MODAL
        ================================================= */

        const modal =
            document.getElementById(
                "ingredientModal"
            );


        const modalTitle =
            document.getElementById(
                "ingredientModalTitle"
            );


        const ingredientList =
            modal
                ? modal.querySelector(
                    ".ingredient-list"
                )
                : null;


        let lastFocused =
            null;



        /* =================================================
           OPEN MODAL
        ================================================= */

        function openIngredientModal(
            trigger
        ) {

            if (
                !modal ||
                !ingredientList
            ) {
                return;
            }


            lastFocused =
                document.activeElement;


            modalTitle.textContent =
                trigger.dataset.dish || "";


            ingredientList.innerHTML =
                "";


            const ingredients =
                (
                    trigger.dataset.ingredients ||
                    ""
                )
                    .split("|")
                    .map(
                        item =>
                            item.trim()
                    )
                    .filter(Boolean);


            ingredients.forEach(
                ingredient => {

                    const li =
                        document.createElement(
                            "li"
                        );


                    li.textContent =
                        ingredient;


                    ingredientList.appendChild(
                        li
                    );

                }
            );


            modal.classList.add(
                "open"
            );


            modal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";


            const closeButton =
                modal.querySelector(
                    ".modal-close"
                );


            if (closeButton) {

                closeButton.focus();

            }

        }



        /* =================================================
           CLOSE MODAL
        ================================================= */

        function closeIngredientModal() {

            if (!modal) {
                return;
            }


            modal.classList.remove(
                "open"
            );


            modal.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.style.overflow =
                "";


            if (lastFocused) {

                lastFocused.focus();

            }

        }



        /* =================================================
           INGREDIENT BUTTONS
        ================================================= */

        document
            .querySelectorAll(
                ".ingredient-button"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            openIngredientModal(
                                button
                            );

                        }
                    );

                }
            );



        /* =================================================
           CLOSE MODAL
        ================================================= */

        if (modal) {

            modal
                .querySelectorAll(
                    "[data-close-modal]"
                )
                .forEach(
                    element => {

                        element.addEventListener(
                            "click",
                            closeIngredientModal
                        );

                    }
                );

        }



        /* =================================================
           ESCAPE
        ================================================= */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape"
                ) {

                    closeIngredientModal();

                }

            }
        );



        /* =================================================
           SMOOTH LINKS
        ================================================= */

        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(
                link => {

                    link.addEventListener(
                        "click",
                        event => {

                            const id =
                                link.getAttribute(
                                    "href"
                                );


                            if (
                                !id ||
                                id === "#"
                            ) {
                                return;
                            }


                            const target =
                                document.querySelector(
                                    id
                                );


                            if (!target) {
                                return;
                            }


                            event.preventDefault();


                            target.scrollIntoView(
                                {
                                    behavior:
                                        reducedMotion.matches
                                            ? "auto"
                                            : "smooth",

                                    block:
                                        "start"
                                }
                            );

                        }
                    );

                }
            );



        /* =================================================
           INITIAL DRESSING
        ================================================= */

        updateDressing("minty");

    }
);