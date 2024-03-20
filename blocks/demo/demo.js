export default function decorate(block) {
  if (block && block.children && block.children.length >= 3) {
    const customClass = block.children[2];
    customClass.classList.add("hero-video-banner");
  } else {
    console.error("Invalid block or insufficient children.");
  }
}
