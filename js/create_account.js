//==== Create Account Form=====================================================================================================================

//    ===== Functions =====
function getError(el) {
    let next = el.nextElementSibling;
    while (next && !next.classList.contains("error-msg")) {
        next = next.nextElementSibling;
    }
    return next;
}

function showError(el, message) {
    const error = getError(el);
    if (!error) return;

    error.textContent = message;
    error.classList.add("active");
    el.classList.add("error");
}

function clearError(el) {
    const error = getError(el);
    if (!error) return;

    error.textContent = "";
    error.classList.remove("active");
    el.classList.remove("error");
}

function validateEGN(egn) {
    if (!/^\d{10}$/.test(egn)) return false;

    const weights = [2,4,8,5,10,9,7,3,6];
    let sum = 0;

    for (let i = 0; i < 9; i++) {
        sum += Number(egn[i]) * weights[i];
    }

    let checksum = sum % 11;
    if (checksum === 10) checksum = 0;

    return checksum === Number(egn[9]);
}

function validateCheckbox(el, message) {
    el.checked ? clearError(el) : showError(el, message);
}

function updateSubmitState() {
    const hasErrors = document.querySelector(".error-msg.active") !== null;

    const requiredFilled =
        nameInput.value.trim() &&
        lastNameInput.value.trim() &&
        emailInput.value.trim() &&
        phoneInput.value.trim() &&
        egnInput.value.trim() &&
        passwordInput.value &&
        confirmPasswordInput.value &&
        ageCheckbox.checked &&
        termsCheckbox.checked;

    submitBtn.disabled = hasErrors || !requiredFilled;
}

//    ===== Listeners =====

const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("e-mail");
const phoneInput = document.getElementById("phone");
const egnInput = document.getElementById("national_id");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm_password");
const ageCheckbox = document.querySelector('input[name="age_confirm"]');
const termsCheckbox = document.querySelector('input[name="terms"]');
const submitBtn = document.getElementById("Submit_Button");

nameInput.addEventListener("input", () => {
    nameInput.value.trim()
        ? clearError(nameInput)
        : showError(nameInput, "Name is required.");
    updateSubmitState();
});

lastNameInput.addEventListener("input", () => {
    lastNameInput.value.trim()
        ? clearError(lastNameInput)
        : showError(lastNameInput, "Last name is required.");
    updateSubmitState();
});

emailInput.addEventListener("input", () => {
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)
        ? clearError(emailInput)
        : showError(emailInput, "Invalid email address.");
    updateSubmitState();
});

phoneInput.addEventListener("input", () => {
    /^\d{9}$/.test(phoneInput.value)
        ? clearError(phoneInput)
        : showError(phoneInput, "Phone must be 9 digits.");
    updateSubmitState();
});

egnInput.addEventListener("input", () => {
    validateEGN(egnInput.value)
        ? clearError(egnInput)
        : showError(egnInput, "Invalid Bulgarian EGN.");
    updateSubmitState();
});

passwordInput.addEventListener("input", () => {
    /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(passwordInput.value)
        ? clearError(passwordInput)
        : showError(passwordInput, "Min 8 chars, letters & numbers.");
    validateConfirmPassword();
    updateSubmitState();
});

confirmPasswordInput.addEventListener("input", validateConfirmPassword);

function validateConfirmPassword() {
    passwordInput.value === confirmPasswordInput.value && confirmPasswordInput.value
        ? clearError(confirmPasswordInput)
        : showError(confirmPasswordInput, "Passwords do not match.");
}

ageCheckbox.addEventListener("change", () => {
    validateCheckbox(ageCheckbox, "You must confirm you are over 18.");
    updateSubmitState();
});

termsCheckbox.addEventListener("change", () => {
    validateCheckbox(termsCheckbox, "You must accept the terms.");
    updateSubmitState();
});

//==== Top Menu Buttons ======================================================================================================
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
//==== Login E-mail validation ======================================================================================================
  document.getElementById('Login_Form').addEventListener('input', function () {
    validateForm();
});
function validateForm() {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = document.getElementById('email').value;
    const lSubmitBtn = document.getElementById('Login_Submit_Button');
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
        lSubmitBtn.classList.add('enabled');
        lSubmitBtn.disabled = false;
    } else {
        lSubmitBtn.classList.remove('enabled');
        lSubmitBtn.disabled = true;
    }
}

document.addEventListener("DOMContentLoaded", updateSubmitState);