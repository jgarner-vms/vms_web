document.addEventListener("astro:page-load", () => {
	Placeholders();
  });
  import Typed from "typed.js";
  function Placeholders() {
	var typed = new Typed("#typed", {
	  stringsElement: "#typed-strings",
	  typeSpeed: 25,
	  loop: true,
	  showCursor: false,
	});
  }