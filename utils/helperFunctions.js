export default function capitalizeFirstLetter(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return ""; // Handle empty or non-string inputs
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}