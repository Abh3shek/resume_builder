import { saveToDB, getFromDB } from "./db.js";

// ✅ Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("✅ Service Worker registered:", reg.scope))
      .catch((err) =>
        console.error("❌ Service Worker registration failed:", err)
      );
  });
}

// DOM Elements
const landing = document.getElementById("landing");
const onboarding = document.getElementById("onboarding");
const progressBar = document.querySelector(".progress");
const steps = document.querySelectorAll(".step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
let currentStep = 0;

// ✅ Progress bar update
function updateProgress() {
  const bar = document.querySelector(".progress-bar");
  bar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
}

// ✅ Onboarding navigation
document.getElementById("start-btn").addEventListener("click", () => {
  landing.style.display = "none";
  onboarding.classList.add("active");
  progressBar.classList.add("active");
  currentStep = 0;
  steps.forEach((s) => s.classList.remove("active"));
  steps[0].classList.add("active");
  updateProgress();
});

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
      steps[currentStep].classList.remove("active");
      currentStep++;
      steps[currentStep].classList.add("active");
      updateProgress();
    }
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentStep > 0) {
      steps[currentStep].classList.remove("active");
      currentStep--;
      steps[currentStep].classList.add("active");
      updateProgress();
    }
  });
});

document.getElementById("finish-btn").addEventListener("click", () => {
  alert("Resume Completed! You can export now.");
  onboarding.classList.remove("active");
  progressBar.classList.remove("active");
  landing.style.display = "block";
});

// ✅ Debounce utility
function debounce(func, delay = 1000) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// ✅ Auto-Restore on load
window.addEventListener("DOMContentLoaded", async () => {
  const savedData = await getFromDB("resume-data");
  if (savedData) {
    for (const [id, value] of Object.entries(savedData)) {
      const field = document.getElementById(id);
      if (field) field.value = value;
    }
  }
});

// ✅ Auto-Save on input change with debounce
const inputs = document.querySelectorAll("input, textarea");

const debouncedSave = debounce(() => {
  const data = {};
  inputs.forEach((el) => {
    if (el.id) data[el.id] = el.value;
  });
  saveToDB("resume-data", data);
});

inputs.forEach((input) => {
  input.addEventListener("input", debouncedSave);
});
