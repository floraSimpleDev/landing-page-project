let searchButton = document.querySelector("#search-button"),
    searchBar = document.querySelector(".search-bar-container"),
    formButton = document.querySelector("#login-button"),
    loginForm = document.querySelector(".login-form-container"),
    formClose = document.querySelector("#form-close"),
    menu = document.querySelector("#menu-bar"),
    navbar = document.querySelector(".navbar"),
    videoButton = document.querySelectorAll(".video-button");

window.onscroll = () => {
    searchButton.classList.remove("fa-times");
    searchBar.classList.remove("active");
    menu.classList.remove("fa-times");
    navbar.classList.remove("active");
    loginForm.classList.remove("active");
}

menu.addEventListener("click", () => {
    menu.classList.toggle("fa-times");
    navbar.classList.toggle("active");
});

searchButton.addEventListener("click", () => {
    searchButton.classList.toggle("fa-times");
    searchBar.classList.toggle("active");
});

formButton.addEventListener("click", () => {
    loginForm.classList.add("active");
});

formClose.addEventListener("click", () => {
    loginForm.classList.remove("active");
});

videoButton.forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".controls .active").classList.remove("active");
        button.classList.add("active");
        let src = button.getAttribute("data-src");
        document.querySelector(".video-slider").src = src;
    });
});

//review-slider dragging and loop effects
const wrapper = document.querySelector(".wrapper"),
    slider = document.querySelector(".slider"),
    arrowButtons = document.querySelectorAll(".review-slider i"),
    firstCardWidth = slider.offsetWidth,
    wrapperChildrens = [...wrapper.children];

let isDragging = false, startX, startScrollLeft;

//get the number of cards that can fit in the review slider.
let cardPerView = Math.round(wrapper.offsetWidth / firstCardWidth);

//insert the copies of the sliders into both begining and end.
wrapperChildrens.slice(-cardPerView).reverse().forEach(card => {
    wrapper.insertAdjacentHTML("afterbegin", card.outerHTML);
});

wrapperChildrens.slice(0, cardPerView).forEach(card => {
    wrapper.insertAdjacentHTML("beforeend", card.outerHTML);
});

const dragStart = (event) => {
    isDragging = true;
    wrapper.classList.add("dragging");
    //record the initial cursor and scroll position
    startX = event.pageX;
    startScrollLeft = wrapper.scrollLeft;
}

const dragging = (event) => {
    if (!isDragging) return;
    //update the scroll position
    wrapper.scrollLeft = startScrollLeft - (event.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    wrapper.classList.remove("dragging");
}

arrowButtons.forEach((button) => {
    button.addEventListener("click", () => {
        wrapper.scrollLeft += button.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const infiniteScroll = () => {
    if (wrapper.scrollLeft === 0) {
        wrapper.classList.add("no-transition");
        wrapper.scrollLeft = wrapper.scrollWidth - (2 * wrapper.offsetWidth);
        wrapper.classList.remove("no-transition");
    }
    else if (Math.ceil(wrapper.scrollLeft) === wrapper.scrollWidth - wrapper.offsetWidth) {
        wrapper.classList.add("no-transition");
        wrapper.scrollLeft = wrapper.offsetWidth;
        wrapper.classList.remove("no-transition");
    }
}


wrapper.addEventListener("mousedown", dragStart);
wrapper.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
wrapper.addEventListener("scroll", infiniteScroll);