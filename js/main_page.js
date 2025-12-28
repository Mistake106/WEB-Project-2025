  const openLoginBtn = document.getElementById("Open_Login_Popup");
  const overlay = document.getElementById("overlay");

  openLoginBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
  });
  // Close when clicking outside popup
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
    }
  });