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
    } else if (
      signupForm.classList.contains("showform") &&
      !loginForm.classList.contains("showform")
    ) {
      signupForm.classList.remove("showform");
      loginForm.classList.add("showform");
    } else {
      loginForm.classList.add("showform");
    }
  });
});

signUpBtns.forEach((button) => {
  button.addEventListener("click", () => {
    if (signupForm.classList.contains("showform")) {
      signupForm.classList.remove("showform");
    } else if (
      loginForm.classList.contains("showform") &&
      !signupForm.classList.contains("showform")
    ) {
      loginForm.classList.remove("showform");
      signupForm.classList.add("showform");
    } else {
      signupForm.classList.add("showform");
    }
  });
});

const deleteAccountButtons = document.querySelectorAll("#delete-account");

const confirmationPopup = document.querySelector("#confirmationPopup");
const confirmButton = document.querySelector("#confirm-button");
const cancelButton = document.querySelector("#cancel-button");

deleteAccountButtons.forEach((deleteAccountButton) => {
  deleteAccountButton.addEventListener("click", () => {
    confirmationPopup.style.display = "block";
  });
});

confirmButton.addEventListener("click", () => {
  confirmationPopup.style.display = "none";
});

cancelButton.addEventListener("click", () => {
  confirmationPopup.style.display = "none";
});

const mobileSidePanel = document.querySelector(".mobile-side-panel");

const previewBtn = document.querySelector("#preview-btn");
const sidePanelClose = document.querySelector("#side-panel-close");

previewBtn.addEventListener("click", () => {
  previewBtn.classList.add("hide-preview-btn");

  mobileSidePanel.classList.add("show-mobile-side-panel");
  mobileSidePanel.classList.remove("remove-mobile-side-panel");
});

sidePanelClose.addEventListener("click", () => {
  mobileSidePanel.classList.remove("show-mobile-side-panel");
  mobileSidePanel.classList.add("remove-mobile-side-panel");
  previewBtn.classList.remove("hide-preview-btn");
});
