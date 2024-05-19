
/**
 * Function to store a key into local storage
 * @param {string} key The name of the item you want to store
 * @param {(number|string)} value The value of the item you want to store
 */
export const save = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};