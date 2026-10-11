document.addEventListener(“DOMContentLoaded”, function () {
const test = document.createElement(“div”);

test.id = "testBudgetProClim";
test.textContent = "TEST PRO CLIM : budget-pro.js est chargé";
test.style.cssText = [
    "position:fixed",
    "top:10px",
    "left:10px",
    "right:10px",
    "z-index:999999",
    "padding:16px",
    "background:#b91c1c",
    "color:white",
    "font-size:16px",
    "font-weight:bold",
    "text-align:center",
    "border-radius:10px"
].join(";");
document.body.appendChild(test);

});
