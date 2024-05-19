import { setRegisterForm } from "./handlers.mjs/register.mjs";
import { setLoginForm } from "./handlers.mjs/login.mjs";
import { isLoggedIn } from "./api/auth/status.mjs";
import { setLogOut } from "./handlers.mjs/logout.mjs";

const path = location.pathname;
console.log(path);

if (path === `/index.html`) {
    setLoginForm();
}
if (path.includes(`/auth/register`) || path === `/html/auth/register.html`) {
    setRegisterForm();
}
if (isLoggedIn) {
    setLogOut();
}
