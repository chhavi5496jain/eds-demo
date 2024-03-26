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
}
// Function to create the contact us form modal
// Function to create the contact us form modal
function createContactUsForm() {
  // Create modal container
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");

  // Create modal content
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Close button
  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", () => {
    modalContainer.remove(); // Close modal when close button is clicked
  });

  // Form heading
  const modalHeading = document.createElement("h2");
  modalHeading.textContent = "Contact Us";

  // Form
  const form = document.createElement("form");
  form.classList.add("contact-form");

  // Name input
  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Name:";
  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("name", "name");
  nameLabel.appendChild(nameInput);

  // Email input
  const emailLabel = document.createElement("label");
  emailLabel.textContent = "Email:";
  const emailInput = document.createElement("input");
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("name", "email");
  emailLabel.appendChild(emailInput);

  // Message input
  const messageLabel = document.createElement("label");
  messageLabel.textContent = "Message:";
  const messageTextarea = document.createElement("textarea");
  messageTextarea.setAttribute("name", "message");
  messageLabel.appendChild(messageTextarea);

  // Submit button
  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit");
  submitBtn.textContent = "Submit";

  // Append elements
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(modalHeading);
  form.appendChild(nameLabel);
  form.appendChild(emailLabel);
  form.appendChild(messageLabel);
  form.appendChild(submitBtn);
  modalContent.appendChild(form);
  modalContainer.appendChild(modalContent);

  // Append modal to body
  document.body.appendChild(modalContainer);
}

// Create button dynamically
const showContactFormButton = document.createElement("button");
showContactFormButton.textContent = "Contact Us";
showContactFormButton.addEventListener("click", createContactUsForm);
document.body.appendChild(showContactFormButton);
