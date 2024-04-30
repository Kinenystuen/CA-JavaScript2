import { login } from "../api/auth/login.mjs";

const loginForm = document.getElementById("loginForm");

export function setLoginForm() {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());
    console.log(profile);

    const action = form.action;
    const method = form.method;

    // Send data to api
    login(profile, action, method);
  });
}
