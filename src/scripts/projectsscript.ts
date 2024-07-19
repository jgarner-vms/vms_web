document.addEventListener("astro:page-load", () => {
    Numbers();
  });
  import { CountUp } from "countup.js";

  function Numbers() {
    const options = {
      suffix: "+",
      enableScrollSpy: true,
      scrollSpyOnce: true,
      scrollSpyDelay: 750,
      duration: 3,
    };
    const bigoptions = {
      suffix: "+",
      enableScrollSpy: true,
      scrollSpyOnce: true,
      scrollSpyDelay: 750,
      useEasing: true,
      smartEasingThreshold: 11000,
      duration: 6,
    };
    const technum =
      (new Date().getFullYear()/100 +
        new Date().getMonth() * 10 +
		new Date().getDate());

    const projnum =
      (new Date().getFullYear() * 7+
        new Date().getMonth() * 10 +
        new Date().getDate());
    const partnum =
      (new Date().getFullYear() +
        new Date().getMonth() * 10 +
        new Date().getDate()) /
        10 -
      150;
    let techs = new CountUp("technicianstat", technum, options);
    let projects = new CountUp("projectstat", projnum, bigoptions);
    let partners = new CountUp("partnerstat", partnum, options);
  }
