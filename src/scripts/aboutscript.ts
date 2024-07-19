import ClipboardJS from "clipboard";
import tippy from "tippy.js";

// Calls init function on window load
document.addEventListener("astro:page-load", () => {
  loadMap();
  stateDropdown();
  emailTooltip();
});

function emailTooltip() {
  var clipboard = new ClipboardJS("#email");

  const copiedTippy = tippy("#email", {
    content: "Copied!",
    trigger: "",
  })[0];

  clipboard.on("success", function (e) {
    copiedTippy.show();
    setTimeout(copiedTippy.hide, 2000);
  });
}

function loadMap() {
  const map = document.getElementById("map");
  const toolTip = document.getElementById("toolTip");

  // Add event listeners to map element
  if (
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
  }
  map.addEventListener("mousemove", mouseEntered, false);
  map.addEventListener("mouseout", mouseGone, false);

  // Show tooltip on mousemove
  function mouseEntered(e) {
    var target = e.target;

    if (target.parentNode.className.baseVal == "state") {
      target.style.opacity = 0.6;
      var details = e.target.attributes;

      // Follow cursor
      toolTip.style.transform = `translate(${e.offsetX}px, ${e.offsetY}px)`;

      // Position tooltip in viewport

      if (window.innerWidth > e.offsetX + toolTip.offsetWidth + 50) {
        toolTip.style.left = `revert`;
      } else {
        toolTip.style.left = `${
          window.innerWidth - (e.offsetX + toolTip.offsetWidth + 50)
        }px`;
      }

      // Tooltip data
      toolTip.innerHTML = `
        <ul class="font-sans list-none p-4 m-0">
            <li class="mb-3"><b>Region: ${details.region.value}</b></li>
            <li class="mb-3">State: ${details.state.value}</li>
            <li class="mb-3">Projects: ${details.projects.value}+</li>
            <li class="mb-3">Partners: ${details.partners.value}+</li>
        </ul>`;
    }
  }

  // Clear tooltip on mouseout
  function mouseGone(e) {
    var target = e.target;
    if (target.parentNode.className.baseVal == "state") {
      target.style.opacity = 1;
      toolTip.innerHTML = "";
    }
  }
}

// Dropdown for mobile

function stateDropdown() {
  const stateDropdown = document.getElementById("states");
  const map = document.getElementById("map");
  const toolTip = document.getElementById("toolTip");

  let previousState = stateDropdown.value;

  // Add event listeners to dropdown menu
  stateDropdown.addEventListener("change", () => {
    const selectedStateID = stateDropdown.value;
    const selectedState = map.querySelector("." + selectedStateID);

    // Reset style of previous selection
    map.querySelector("." + previousState).style.opacity = 1;

    //Reset tooltip position
    toolTip.style.left = "8px";
    toolTip.style.top = "-64px";

    // Choose the element with the dropwdown selection's class and style it
    selectedState.style.opacity = 0.4;

    // Add data to toolTip
    const details = selectedState.attributes;

    toolTip.innerHTML = `
        <ul class="font-sans list-none p-4 m-0">
            <li class="mb-3"><b>Region: ${details.region.value}</b></li>
            <li class="mb-3">State: ${details.state.value}</li>
            <li class="mb-3">Projects: ${details.projects.value}+</li>
            <li class="mb-3">Partners: ${details.partners.value}+</li>
        </ul>`;

    // Move selected state's tooltip to the state's position in the viewport
    const selectedStateLocation = selectedState.getBoundingClientRect();

    if (window.innerWidth > toolTip.offsetWidth + selectedStateLocation.right) {
      toolTip.style.transform = `translate(${selectedStateLocation.right}px, ${selectedStateLocation.top}px)`;
    } else {
      toolTip.style.transform = `translate(${
        selectedStateLocation.left - toolTip.offsetWidth
      }px, ${selectedStateLocation.y}px)`;
    }

    previousState = stateDropdown.value;
  });
}
