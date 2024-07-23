const scriptURL =
  "https://script.google.com/macros/s/AKfycbwBR1FYHl-f-l2jdbHGUlSC-5VE9-BZika7TlBPW80vZPA7yvn0kCxHBjwZM7BwC3d5/exec";
const form = document.forms["contact-form"];
const modal = document.getElementById("successModal");
const closeModal = document.getElementsByClassName("close")[0];

// Ensure modal is hidden on page load
window.onload = function () {
  modal.style.display = "none";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm()) {
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        showModal();
      })
      .catch((error) => console.error("Error!", error.message));
  }
});

function showModal() {
  modal.style.display = "flex"; // Show the modal

  // Hide the modal after 5 seconds
  setTimeout(() => {
    modal.style.display = "none";
    window.location.reload(); // Optionally reload the page or redirect
  }, 5000);
}

closeModal.onclick = function () {
  modal.style.display = "none"; // Hide the modal when 'x' is clicked
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none"; // Hide the modal when clicking outside of it
  }
};

// Initialize the first tab
var currentTab = 0;
showTab(currentTab);

function showTab(n) {
  const x = document.getElementsByClassName("tab");
  if (x.length === 0) return; // Prevent errors if no elements are found
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("submit").style.display = "inline";
    document.getElementById("prevBtn").style.display = "none"; // Hide the previous button on the last tab
  } else {
    document.getElementById("nextBtn").style.display = "inline";
    document.getElementById("submit").style.display = "none";
  }
  fixStepIndicator(n);
}

function nextPrev(n) {
  const x = document.getElementsByClassName("tab");
  if (x.length === 0) return; // Prevent errors if no elements are found
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    form.submit();
    return false;
  }
  showTab(currentTab);
}

// Form validation function
function validateForm() {
  let valid = true;
  const x = document.getElementsByClassName("tab");
  if (x.length === 0) return false; // Prevent errors if no elements are found
  const y = x[currentTab].getElementsByTagName("input");
  for (let i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    }
  }
  if (valid) {
    const stepElems = document.getElementsByClassName("step");
    if (stepElems.length > currentTab) {
      stepElems[currentTab].className += " finish";
    }
  }
  return valid;
}

// Function to fix the step indicator
function fixStepIndicator(n) {
  const x = document.getElementsByClassName("step");
  if (x.length === 0) return; // Prevent errors if no elements are found
  for (let i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  if (x.length > n) {
    x[n].className += " active";
  }
}
