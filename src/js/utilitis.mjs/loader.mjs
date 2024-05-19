// Loader div

// black loader
const loaderArea = document.createElement("div");
const loader = document.createElement("div");
const loaderSpan = document.createElement("span");

loaderArea.classList.add("loaderArea");
loader.classList.add("loader");
loaderSpan.classList.add("sr-only");

loader.appendChild(loaderSpan);
loaderArea.appendChild(loader);

export {loaderArea, loader};

// white loader
const loaderAreaW = document.createElement("div");
const loaderW = document.createElement("div");
const loaderSpanW = document.createElement("span");

loaderAreaW.classList.add("loaderArea");
loaderW.classList.add("loader", "border-color-white");
loaderSpanW.classList.add("sr-only");

loaderW.appendChild(loaderSpanW);
loaderAreaW.appendChild(loaderW);

export {loaderAreaW, loaderW};