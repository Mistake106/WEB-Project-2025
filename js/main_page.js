  const openLoginBtn = document.getElementById("Open_Login_Button");
  const closeLoginBtn = document.getElementById("Close_Login_Button");
  const overlay = document.getElementById("Login_Popup");

  openBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  // Close when clicking outside popup
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
    }
  });