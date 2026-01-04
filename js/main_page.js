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
//==========================================================================================================
  document.getElementById('Login_Form').addEventListener('input', function () {
    validateForm();
});

function validateForm() {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = document.getElementById('e-mail').value;
    const submitBtn = document.getElementById('Submit_Button');
    const errorElement = document.getElementById('Email_Error');

    let isValid = true;

    if (!pattern.test(email)){
        errorElement.textContent = 'Invalid e-mail address!';
        errorElement.classList.remove('success');
        errorElement.classList.add('error');
        isValid = false;
    } else{
        errorElement.textContent = '';
        errorElement.classList.remove('error');
        errorElement.classList.add('success');
    }
    if (isValid) {
        submitBtn.classList.add('enabled');
        submitBtn.disabled = false;
    } else {
        submitBtn.classList.remove('enabled');
        submitBtn.disabled = true;
    }
}