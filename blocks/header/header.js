import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */

export default async function decorate(block) {
  const headerMeta = getMetadata("nav");
  const countriesDropDown = document.getElementsByClassName("button-container");
  const countriesData = {
    Australia: "🇦🇺",
    Canada: "🇨🇦",
    UK: "🇬🇧",
    USA: "🇺🇸",
  };
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

  for (let key in countriesData) {
    let option = document.createElement("option");
    option.setAttribute("value", data[key]);

    let optionText = document.createTextNode(key);
    option.appendChild(optionText);

    countriesDropDown.appendChild(option);
  }
}
