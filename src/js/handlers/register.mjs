import { register } from "../api/auth/register.mjs";

const registerForm = document.getElementById("registerForm");

/**
 * Function to collect form input values from form to be stored as a object and used to register profile
 */
export function setRegisterForm() {
  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      const action = form.action;
      const method = form.method;
      // Send data to api
      register(profile, action, method);
    });
  }
}
