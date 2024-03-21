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
  const header1 = document.getElementsByClassName("header-wrapper");

  // Get the first section
  const firstSection = document.getElementsByClassName("custom");
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

  function onScroll() {
    // Get the scroll position
    const scrollPosition = window.scrollY || window.pageYOffset;

    // Check if the scroll position is below the first section
    if (scrollPosition >= firstSection.clientHeight) {
      // Add a class to change the header background color
      header1.classList.add("header-white");
    } else {
      // Remove the class to revert the header background color
      header1.classList.remove("header-white");
    }
  }

  // Add scroll event listener
  window.addEventListener("scroll", onScroll);
}
