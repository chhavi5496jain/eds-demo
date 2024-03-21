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
document.addEventListener("DOMContentLoaded", function () {
  // Get the header element
  const header = document.getElementsByClassName("header-wrapper");
  console.log("header");
  // Get the first section
  const firstSection = document.getElementsByClassName("custom");
  console.log("custom");
  // Function to handle scroll event
  function onScroll() {
    // Get the scroll position
    const scrollPosition = window.scrollY || window.pageYOffset;
    console.log("scroll");
    // Check if the scroll position is below the first section
    if (scrollPosition >= firstSection.clientHeight) {
      // Add a class to change the header background color
      header.classList.add("header-white");
    } else {
      // Remove the class to revert the header background color
      header.classList.remove("header-white");
    }
  }

  // Add scroll event listener
  window.addEventListener("scroll", onScroll);
});
