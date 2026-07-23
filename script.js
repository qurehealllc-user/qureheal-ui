const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  mobileNav.setAttribute("aria-hidden", String(!isOpen));
});

mobileNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
  });
});

const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

const form = document.querySelector("#demoForm");
const formStatus = document.querySelector(".form-status");

form?.addEventListener("submit", event => {
  event.preventDefault();
  formStatus.textContent = "Thank you — your request has been captured. Connect this form to your email or CRM before launch.";
  form.reset();
});
