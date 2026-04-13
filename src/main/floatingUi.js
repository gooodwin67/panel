const FLOATING_UI_SELECTOR = ".floating-ui";

export function hideAllFloatingUis() {
  document.querySelectorAll(FLOATING_UI_SELECTOR).forEach((ui) => {
    ui.style.display = "none";
  });
}

export function showFloatingUi(selector) {
  hideAllFloatingUis();

  const ui = document.querySelector(selector);
  if (ui) ui.style.display = "flex";
  return ui;
}

export function hideFloatingUi(selector) {
  const ui = document.querySelector(selector);
  if (ui) ui.style.display = "none";
}
