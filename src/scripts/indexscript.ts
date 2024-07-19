document.addEventListener("astro:page-load", () => {
  Scramble();
  Slowmo();
});
// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————
function Scramble() {
  class TextScramble {
    el: any;
    chars: string;
    queue: any[];
    frameRequest: number;
    frame: number;
	resolve: any;
    constructor(el) {
      this.el = el;
      this.chars = "!<>-_\\/[]{}—=+*^?#________";
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = "";
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  // ——————————————————————————————————————————————————
  // Phrases
  // ——————————————————————————————————————————————————

  const phrases = [
    "Low Voltage",
    "AV Rooms",
    "Electrical",
    "Server Racks",
    "Security",
    "Access Points",
    "Access Control",
    "Fiber Optics",
    "Data Centers",
    "Digital Signage",
    "DAS Systems",
    "CAT 6/6A Solutions",
    "High Pair Copper",
    "Predictive Surveys",
  ];

  const el = document.querySelector("#scramble");
  const fx = new TextScramble(el);

  let counter = 0;
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 1250);
    });
    counter = (counter + 1) % phrases.length;
  };

  next();
}

// Slow the background video on the hero page
function Slowmo() {
  const video = document.querySelector("#BGvideo");
  if (video) {
    video.playbackRate = 0.15;
  }
}
