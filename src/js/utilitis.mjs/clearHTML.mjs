// function to clear HTML element 

/**
 * Function to clear the innerHTML of an element
 * Place the element you want to clear inside the clearHTML() function
 * @param {string} parentElement The element to clear the HTML
 */
export function clearHTML(parentElement) {
    if (parentElement) {
        parentElement.innerHTML = "";
    } else {
        console.log(`Parent element is null or undefined.`)
    }
    
}