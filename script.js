const whatsappPhone = "94720626224";
const defaultMessage = "Hi Surprisewala, I'd like to place an order";

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll("[data-reveal]");
const packageButtons = document.querySelectorAll(".package-order");
const packageSelect = document.querySelector("#package-select");
const orderForm = document.querySelector("#order-form");
const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navMenu.classList.toggle("is-open", !isOpen);
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
    });
  });
}

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

packageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedPackage = button.dataset.package ?? "";

    if (packageSelect) {
      packageSelect.value = selectedPackage;
    }

    const packageMessage = `Hi Surprisewala, I'd like to order the ${selectedPackage} package.`;
    const packageUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(packageMessage)}`;
    window.open(packageUrl, "_blank", "noopener");
  });
});

if (orderForm) {
  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(orderForm);
    const name = formData.get("name")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const occasion = formData.get("occasion")?.toString().trim() || "";
    const selectedPackage = formData.get("package")?.toString().trim() || "";
    const date = formData.get("date")?.toString().trim() || "";
    const time = formData.get("time")?.toString().trim() || "";
    const customMessage = formData.get("message")?.toString().trim() || "No additional notes";

    const messageLines = [
      defaultMessage,
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Occasion: ${occasion}`,
      `Date: ${date}`,
      `Time: ${time}`,
      `Package: ${selectedPackage}`,
      `Custom message: ${customMessage}`,
    ];

    const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(messageLines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
  });
}
