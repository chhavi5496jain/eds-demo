import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */

export default async function decorate(block) {
  // Create a list container
  var listContainer = document.createElement("div");
  document.body.appendChild(listContainer);

  // List items
  var items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  // Create list elements and append to list container
  items.forEach(function (itemText, index) {
    var listItem = document.createElement("div");
    listItem.textContent = itemText;
    listItem.style.cursor = "pointer"; // make it look clickable

    listContainer.appendChild(listItem);
  });

  // Hide all items initially
  document.querySelectorAll("div").forEach(function (item) {
    item.classList.add("hidden");
  });

  // Create a button
  var toggleButton = document.createElement("button");
  toggleButton.textContent = "Toggle List";
  document.body.appendChild(toggleButton);

  // Toggle visibility of list items when button is clicked
  toggleButton.addEventListener("click", function () {
    document.querySelectorAll("div").forEach(function (item) {
      if (item.classList.contains("hidden")) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });

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
