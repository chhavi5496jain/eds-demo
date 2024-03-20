export default function decorate(block) {
  const customClass = block.children[2];
  customClass.classList.add("hero-video-banner");
}
