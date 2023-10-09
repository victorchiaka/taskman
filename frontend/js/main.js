const showCase = document.querySelectorAll(".item-child");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      entry.target.classList.remove("hidden");
    } else {
      entry.target.classList.remove("show");
      entry.target.classList.add("hidden");
    }
  });
});

showCase.forEach((element) => observer.observe(element));

const navToggler = document.querySelector("#nav-button");

const mobileNav = document.querySelector(".mobile-nav");

navToggler.addEventListener("click", () => {
  navToggler.classList.toggle("open-nav");
  mobileNav.classList.toggle("show");
});
