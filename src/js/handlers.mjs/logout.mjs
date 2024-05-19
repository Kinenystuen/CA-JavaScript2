import { logOut } from "../api/auth/logout.mjs";

const logOutBtns = document.querySelectorAll(".logOutBtn");

export function setLogOut() {
    logOutBtns.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            try {
                btn.classList.add("loading");
                logOut();
                window.location.href = "/index.html";
            } catch (error) {
                console.error("Error logging out:", error);
                alert("There was a problem logging out");
            } finally {
                // Hide loader/spinner after logout attempt (whether successful or not)
                btn.classList.remove("loading");
            }
        });
    });
}
