import delay from "lodash/delay";

const domSpin = ($dom, ms = 2000) => {
  $dom.classList.add("spin");
  delay(() => {
    $dom.classList.remove("spin");
  }, ms);
};
const domShowOrHide = ($dom, isShow) => {
  if (!($dom instanceof HTMLElement)) {
    $dom.forEach((v) => {
      domShowOrHide(v, isShow);
    });
  } else {
    if (isShow) {
      $dom.classList.remove("hide");
    } else {
      $dom.classList.add("hide");
    }
  }

  return true;
};

const showHelpMobileOrDesktop = (condition, $domMobile, $domDesktop) => {
  if (condition) {
    domShowOrHide($domMobile, false);
    domShowOrHide($domDesktop, true);
  } else {
    domShowOrHide($domMobile, true);
    domShowOrHide($domDesktop, false);
  }
};

export default { showHelpMobileOrDesktop, domShowOrHide, domSpin };
