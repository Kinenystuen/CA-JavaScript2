import { register } from "../api/auth/register.mjs";

const registerForm = document.getElementById("registerForm");

export function setRegisterForm() {
  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());
      console.log(profile);

      const action = form.action;
      const method = form.method;
      // Send data to api
      register(profile, action, method);
    });
  }
}
