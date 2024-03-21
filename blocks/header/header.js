import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const headerMeta = getMetadata("nav");
  block.textContent = "";

  // load footer fragment
  var currentPageUrl = window.location.href;

  let headerPath;

  if (currentPageUrl.includes("fr")) {
    headerPath = headerMeta.footer || "/fr/nav";
  } else if (currentPageUrl.includes("en")) {
    console.log("The URL contains 'EN'.");
    headerPath = headerMeta.footer || "/en/nav";
  }

  const fragment = await loadFragment(headerPath);

  // decorate footer DOM
  const header = document.createElement("div");
  while (fragment.firstElementChild) header.append(fragment.firstElementChild);

  block.append(header);
}
var selectElement = document.createElement("select");

// Define options
var options = ["Option 1", "Option 2", "Option 3"];
console.log("hi");
// Loop through the options array and create option elements
options.forEach(function (optionText) {
  console.log("hello");

  var option = document.createElement("option");
  option.textContent = optionText;
  selectElement.appendChild(option);
});
console.log("hello");

// Add event listener for change event
selectElement.addEventListener("change", function (event) {
  console.log("Selected option:", event.target.value);
});

// Append the select element to the body or any desired parent element
document.body.appendChild(selectElement);
