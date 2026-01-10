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
//==== Sidebar Collapse Button ======================================================================================================
const sideToggleBtn = document.getElementById("Sidebar_Collapse_Button");
const sideToggleBtnIcon = document.getElementById("Sidebar_Collapse_Button_Icon");
const sidebar = document.getElementById("Sidebar");
const mainCont = document.getElementById("Main_Content");

sideToggleBtn.addEventListener("click", () => {
  const width = getComputedStyle(sidebar).width;
  if (width !== "0px"){
    CollapseSidebar();
  }
  else{
    sidebar.style.width = "300px";
    mainCont.style.marginRight = "300px";
    sideToggleBtn.style.right = "300px";
    sideToggleBtnIcon.classList = "fa-solid fa-circle-right";
  }
  });

  function CollapseSidebar() {
    sidebar.style.width = "0px";
    mainCont.style.marginRight = "0px";
    sideToggleBtn.style.right = "0px";
    sideToggleBtnIcon.classList = "fa-solid fa-circle-left";
  }

  function handleResponsiveSidebar() {
  if (window.innerWidth <= 750) {
    CollapseSidebar();
  } else {
    sidebar.style.width = "300px";
    mainCont.style.marginRight = "300px";
    sideToggleBtn.style.right = "300px";
    sideToggleBtnIcon.classList = "fa-solid fa-circle-right";
  }
}

window.addEventListener("resize", handleResponsiveSidebar);
window.addEventListener("load", handleResponsiveSidebar);

const footer = document.querySelector("footer");

function handleSidebarFooterCollision() {
    const sidebarHeight = sidebar.offsetHeight;
    const footerTop = footer.offsetTop;
    const scrollY = window.scrollY || window.pageYOffset;
    const topMenuHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--top-menu-height"));

    // Position where sidebar should stop (so it doesn't overlap footer)
    const stopScroll = footerTop - sidebarHeight - topMenuHeight;

    if (scrollY >= stopScroll) {
        // Stick sidebar above footer
        sidebar.style.position = "absolute";
        sidebar.style.top = stopScroll + topMenuHeight + "px";
    } else {
        // Fixed sidebar while scrolling
        sidebar.style.position = "fixed";
        sidebar.style.top = topMenuHeight + "px";
    }
}
window.addEventListener("scroll", handleSidebarFooterCollision);
window.addEventListener("resize", handleSidebarFooterCollision);
window.addEventListener("load", handleSidebarFooterCollision);

