let t=null;const n={btnClickStart:document.querySelector("[data-start]"),btnClickStop:document.querySelector("[data-stop]")};function e(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}n.btnClickStart.addEventListener("click",(function(a){t=setInterval(e,1e3),n.btnClickStart.disabled=!0})),n.btnClickStop.addEventListener("click",(function(e){n.btnClickStart.disabled=!1,clearInterval(t)}));
//# sourceMappingURL=01-color-switcher.cdd4f1f1.js.map
