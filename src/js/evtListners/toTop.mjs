// Function to go back to the top
let btnTop = document.getElementById("btnBackToTop");

export function toTop() {
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      btnTop.style.display = "block";
    } else {
      btnTop.style.display = "none";
    }
  }

  btnTop.addEventListener("click", backToTop);

  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}

const currentUrl = window.location.href;
if (currentUrl.includes("/pages/feed")) {
    toTop();
}   