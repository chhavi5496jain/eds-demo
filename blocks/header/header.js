import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
let lastScrollTop = 0;
let fadeTimer;

const header = document.getElementsByClassName("header-wrapper");

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
  function onScroll() {
    clearTimeout(fadeTimer); // Clear previous fade timer

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Scrolling down
      header.classList.add("hidden");
      // Set timeout to remove the hidden class after 3 seconds
      fadeTimer = setTimeout(() => {
        header.classList.remove("hidden");
      }, 1000);
    } else {
      // Scrolling up
      header.classList.remove("hidden");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
  }

  // Event listener for scroll
  window.addEventListener("scroll", onScroll);
}
