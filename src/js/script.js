"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScorllTO = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const navLinks = document.querySelector(".nav__links");
const nav = document.querySelector("nav");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
const imgTargets = document.querySelectorAll("img[data-src]");
console.log(imgTargets);

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

btnScorllTO.addEventListener("click", function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
});

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    // const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const siblings = document.querySelectorAll(".nav__link");
    const logo = document.querySelector(".nav__logo");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this.opacity;
    });
    logo.style.opacity = this.opacity;
  }
};

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
// how to set property or preperties to  this keyword== obj
nav.addEventListener("mouseover", handleHover.bind({ opacity: 0.5 }));
nav.addEventListener("mouseout", handleHover.bind({ opacity: 1 }));

navLinks.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  //guard clause
  if (!clicked) return;

  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  //active tab
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});
//reveal section
const sectionReveal = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};
const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//lazy load imgs
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTargets.forEach((img) => imgObserver.observe(img));
