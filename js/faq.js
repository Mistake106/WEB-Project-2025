//==== Login Button ======================================================================================================
  const overlay = document.getElementById("overlay");  
  
  const openLoginBtn = document.getElementById("Open_Login_Popup");
  const loginPopup = document.getElementById("Login_Popup");
  
  const addFundsBtn = document.getElementById("Add_Funds_Button");
  const addFundsPopup = document.getElementById("Add_Funds_Popup");

  const fundsDisplay = document.getElementById("Funds_Display");
  const addFundsForm = document.getElementById("Add_Funds_Form");
  const amountInput = document.getElementById("amount");
  const withdrawFundsButton = document.getElementById("Funds_Withdraw_Button");

  const savedFunds = localStorage.getItem("fundsBalance");
  if (savedFunds !== null) {
      fundsDisplay.textContent = parseFloat(savedFunds).toFixed(2);
  } else {
      fundsDisplay.textContent = "0.00";
  }

addFundsForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const currentFunds = parseFloat(fundsDisplay.textContent) || 0;

    if (!isNaN(amount) && amount > 0) {
        const newBalance = currentFunds + amount;

        fundsDisplay.textContent = newBalance.toFixed(2);
        localStorage.setItem("fundsBalance", newBalance);
    }

    amountInput.value = "";
    closeAllPopups();
});

withdrawFundsButton.addEventListener("click", (e) => {
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const currentFunds = parseFloat(fundsDisplay.textContent) || 0;

    if (isNaN(amount) || amount <= 0) return;

    const newBalance = currentFunds - amount;

    if (newBalance > 0) {
        fundsDisplay.textContent = newBalance.toFixed(2);
        localStorage.setItem("fundsBalance", newBalance);
    } else {
        fundsDisplay.textContent = "0.00";
        localStorage.removeItem("fundsBalance");
    }

    amountInput.value = "";
    closeAllPopups();
});

  
function closeAllPopups() {
  overlay.style.display = "none";
  loginPopup.style.display = "none";
  addFundsPopup.style.display = "none";
}

openLoginBtn.addEventListener("click", () => {
  closeAllPopups();
  overlay.style.display = "flex";
  loginPopup.style.display = "block";
});

addFundsBtn.addEventListener("click", () => {
  closeAllPopups();
  overlay.style.display = "flex";
  addFundsPopup.style.display = "block";
});



overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeAllPopups();
  }
  });
//==== E-mail validation ======================================================================================================
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
//==== FAQ table ==========================================================================================================================


    document.querySelectorAll(".faq-question").forEach(question => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            answer.style.display =
                answer.style.display === "table-row" ? "none" : "table-row";
            answer.style.width = 
                answer.style.width === "auto" ? "0" : "auto";
        });
    });
