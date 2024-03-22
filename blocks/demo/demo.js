// export default function decorate(section) {
//   const customClass = section.children[0];
//   customClass.classList.add("hero-video-banner");
// }
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    var header = document.getElementsByClassName("header-wrapper");
    var firstElement = document.querySelector(".section-video"); // Assuming the first element has class 'content'

    if (window.scrollY > firstElement.offsetTop) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});
