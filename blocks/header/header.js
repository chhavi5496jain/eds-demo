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

  // Create dropdown elements
  const dropdownContainer = document.createElement("div");
  dropdownContainer.classList.add("dropdown-container");

  const dropdownButton = document.createElement("button");
  dropdownButton.textContent = "Dropdown";
  dropdownButton.classList.add("dropdown-button");

  const dropdownContent = document.createElement("div");
  dropdownContent.classList.add("dropdown-content");

  const option1 = document.createElement("a");
  option1.textContent = "Option 1";
  option1.href = "#";

  const option2 = document.createElement("a");
  option2.textContent = "Option 2";
  option2.href = "#";

  dropdownContent.appendChild(option1);
  dropdownContent.appendChild(option2);

  dropdownContainer.appendChild(dropdownButton);
  dropdownContainer.appendChild(dropdownContent);

  // Get the header element
  const header1 = document.getElementById("header-wrapper");

  // Append dropdown to the header
  header1.appendChild(dropdownContainer);

  // Toggle dropdown menu
  dropdownButton.addEventListener("click", function () {
    dropdownContent.classList.toggle("show");
  });

  // Close dropdown menu if user clicks outside of it
  window.addEventListener("click", function (event) {
    if (!event.target.matches(".dropdown-button")) {
      if (dropdownContent.classList.contains("show")) {
        dropdownContent.classList.remove("show");
      }
    }
  });
}
