/**
 * Functionn to transform date data to be readable for user
 * This formatData 
 * @param {string} dateString Sends dateString example to be transformed into date display
 * @returns {string} formatted date
 * @example 
 * ``` js 
 * // post.created = "2024-05-13T07:27:24.702Z"
 * const formattedDate = formatDateMMDDYYHT(post.created);
 * // Formatted date value returns as "5/13/2024, 09:27"
 */
export function formatDateMMDDYYHT(dateString) {
  const formattedDate = new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  return formattedDate;
}


// Function to format date
export function formatDateMonthDDYY(dateString) {
    const formattedDate = new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
}

export function formatDateMonthDDYYHT(dateString) {
  const formattedDate = new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  return formattedDate;
}