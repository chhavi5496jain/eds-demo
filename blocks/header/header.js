import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */

export default async function decorate(block) {
  var ul = document.querySelector("ul");

  // Get the first <li> element within the <ul>
  var firstLi = ul.querySelector("li");

  // Hide/show the first <li> on click
  var visible = true; // Initially set to true assuming it's visible by default
  ul.parentElement.addEventListener("click", function () {
    if (visible) {
      firstLi.style.display = "none";
    } else {
      firstLi.style.display = "block"; // or 'list-item' for default behavior
    }
    visible = !visible;
  });
  /*
  // Create a dropdown container
  var dropdownContainer = document.createElement("div");
  dropdownContainer.classList.add("dropdown");
  document.body.appendChild(dropdownContainer);

  // Language options with corresponding links
  var languages = [
    { name: "English", link: "https://example.com/english" },
    {
      name: "Spanish",
      link: "https://main--eds-demo--chhavi5496jain.hlx.page/en/nav",
    },
    { name: "French", link: "https://example.com/french" },
    { name: "German", link: "https://example.com/german" },
    { name: "Chinese", link: "https://example.com/chinese" },
  ];

  // Create dropdown elements and append to dropdown container
  var dropdownList = document.createElement("select");
  dropdownContainer.appendChild(dropdownList);

  languages.forEach(function (language) {
    var option = document.createElement("option");
    option.textContent = language.name;
    option.value = language.link;
    dropdownList.appendChild(option);
  });

  // Redirect to the selected language link
  dropdownList.addEventListener("change", function () {
    var selectedLink = dropdownList.value;
    window.location.href = selectedLink;
  });
*/
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
