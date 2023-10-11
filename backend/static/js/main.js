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

const signupForm = document.querySelector("#signup-form");

const loginForm = document.querySelector("#login-form");

const signUpBtns = document.querySelectorAll("#signup");

const loginBtns = document.querySelectorAll("#login");

loginBtns.forEach((button) => {
  button.addEventListener("click", () => {
    if (loginForm.classList.contains("showform")) {
      loginForm.classList.remove("showform");
    }
    else if (signupForm.classList.contains("showform") && !loginForm.classList.contains("showform")) {
      signupForm.classList.remove("showform");
      loginForm.classList.add("showform");
    }
    else {
      loginForm.classList.add("showform");
    }
  });
});

signUpBtns.forEach((button) => {
  button.addEventListener("click", () => {
    if (signupForm.classList.contains("showform")) {
      signupForm.classList.remove("showform");
    }
    else if (loginForm.classList.contains("showform") && !signupForm.classList.contains("showform")) {
      loginForm.classList.remove("showform");
      signupForm.classList.add("showform");
    } else {
      signupForm.classList.add("showform");
    }
  });
});
