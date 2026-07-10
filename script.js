document.addEventListener("DOMContentLoaded", () => {

  // All "Sinab ko'rish" buttons scroll to the nearest form
  document.querySelectorAll(".scroll-to-form").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = findNearestForm(btn);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        const firstInput = target.querySelector("input");
        if (firstInput) setTimeout(() => firstInput.focus(), 400);
      }
    });
  });

  function findNearestForm(element) {
    const section = element.closest("section");
    const formInSection = section?.querySelector(".lead-form");
    if (formInSection) return formInSection;

    const forms = [...document.querySelectorAll(".lead-form")];
    if (!forms.length) return null;

    const btnY = element.getBoundingClientRect().top;
    return forms.reduce((nearest, form) => {
      const dist = Math.abs(btnY - form.getBoundingClientRect().top);
      const nearestDist = Math.abs(btnY - nearest.getBoundingClientRect().top);
      return dist < nearestDist ? form : nearest;
    });
  }

  // Handle both lead forms
  document.querySelectorAll(".lead-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]').value.trim();
      const phone = form.querySelector('[name="phone"]').value.trim();

      if (!name || !phone) return;

      // TODO: connect to your backend / CRM / Google Sheets
      console.log("Lead captured:", { name, phone, form: form.dataset.form });

      form.querySelectorAll("input, button").forEach((el) => {
        el.disabled = true;
      });

      const success = form.parentElement.querySelector(".form-success");
      if (success) success.hidden = false;
    });
  });

  // Basic Uzbek phone formatting on blur
  document.querySelectorAll('[name="phone"]').forEach((input) => {
    input.addEventListener("blur", () => {
      let val = input.value.replace(/\D/g, "");
      if (val.startsWith("998")) val = val.slice(3);
      if (val.length === 9) {
        input.value = `+998 ${val.slice(0, 2)} ${val.slice(2, 5)} ${val.slice(5, 7)} ${val.slice(7)}`;
      }
    });
  });
});
