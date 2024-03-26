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

  // decorate header DOM
  const header = document.createElement("div");
  while (fragment.firstElementChild) header.append(fragment.firstElementChild);

  block.append(header);
  var element = document.querySelector(
    ".language-dropdown > div:nth-child(2) > div:nth-child(2) > ul"
  );
  element.classList.add("navigator");
  var allLi = document.querySelectorAll(".navigator li");
  var matchingLi = null;
  for (var i = 0; i < allLi.length; i++) {
    let hrefUrl = allLi[i].querySelector("a").getAttribute("href");
    if (currentPageUrl.includes(hrefUrl)) {
      matchingLi = allLi[i];
      break;
    }
  }
  if (matchingLi) {
    var firstLi = document.querySelector(".navigator li:first-child");
    var parentElement = firstLi.parentNode;

    parentElement.insertBefore(matchingLi, firstLi); // Move the matching li to the top
  }

  var firstLi = document.querySelector(".navigator li:first-child");
  var otherLi = document.querySelectorAll(".navigator li:not(:first-child)");

  var anchorTag = firstLi.querySelector("a");
  anchorTag.removeAttribute("href");
  var matchingLi = null;
  for (var i = 0; i < otherLi.length; i++) {
    otherLi[i].style.display = "none";
  }

  for (var i = 0; i < otherLi.length; i++) {
    otherLi[i].style.display = "none";
  }

  firstLi.addEventListener("click", function () {
    for (var i = 0; i < otherLi.length; i++) {
      if (
        otherLi[i].style.display === "none" ||
        otherLi[i].style.display === ""
      ) {
        otherLi[i].style.display = "block";
      } else {
        otherLi[i].style.display = "none";
      }
    }
  });

  /*contact us*/
  function createContactUsModal() {
    // Create necessary elements
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const closeBtn = document.createElement("span");
    closeBtn.classList.add("close-btn");
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", () => {
      modalContainer.remove(); // Close modal when close button is clicked
    });

    const modalHeading = document.createElement("h2");
    modalHeading.textContent = "Contact Us";

    const modalText = document.createElement("p");
    modalText.textContent = "Please fill out the form below to contact us:";

    const form = document.createElement("form");
    form.setAttribute("method", "post"); // Example: set method to post
    form.setAttribute("action", "your_contact_us_endpoint"); // Example: set action to your contact us endpoint

    // Add form fields (example: name, email, message)
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Name:";
    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "name");

    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Email:";
    const emailInput = document.createElement("input");
    emailInput.setAttribute("type", "email");
    emailInput.setAttribute("name", "email");

    const messageLabel = document.createElement("label");
    messageLabel.textContent = "Message:";
    const messageTextarea = document.createElement("textarea");
    messageTextarea.setAttribute("name", "message");

    const submitBtn = document.createElement("input");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("value", "Submit");

    // Append elements
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalHeading);
    modalContent.appendChild(modalText);
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(messageLabel);
    form.appendChild(messageTextarea);
    form.appendChild(submitBtn);
    modalContent.appendChild(form);
    modalContainer.appendChild(modalContent);

    // Append modal to body
    document.body.appendChild(modalContainer);
  }

  var element = document.querySelector(
    ".container > div:nth-child(1) > div:nth-child(2) > ul > li"
  );
  element.classList.add("contact-us");
  // Example: Call the function when a dynamic list item is clicked
  const dynamicListItem = document.getElementsByClassName("contact-us"); // Assuming you have a dynamic list item
  dynamicListItem.addEventListener("click", () => {
    createContactUsModal();
  });
}
