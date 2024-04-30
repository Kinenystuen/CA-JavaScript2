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

      const email = formData.get("email");
      const name = formData.get("name");
      const password = formData.get("password");
      const avatar = formData.get("avatar");
      const banner = formData.get("banner");

      // Send data to api
      register(profile, email, name, password, avatar, banner, action, method);
    });
  }
}
