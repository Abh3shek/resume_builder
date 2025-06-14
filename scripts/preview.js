// preview.js (or inside app.js if you want)
import { getFromDB } from "./db.js";

document.getElementById("finish-btn").addEventListener("click", async () => {
  const data = await getFromDB("resume-data");
  if (!data) return;

  // Basic details
  document.getElementById("preview-name").textContent = data["fullName"] || "";
  document.getElementById("preview-email").textContent = data["email"] || "";
  document.getElementById("preview-phone").textContent = data["phone"] || "";
  document.getElementById("preview-address").textContent =
    data["address"] || "";

  // Career objective
  document.getElementById("preview-objective").textContent =
    data["objective"] || "";

  // Skills
  document.getElementById("preview-skills").innerHTML = data["skills"]
    ? data["skills"]
        .split(/,|\n/) // Split by comma or newline
        .map((skill) => `<li>${skill.trim()}</li>`)
        .join("")
    : "";

  // Experience
  document.getElementById("preview-experience").innerHTML = data["experience"]
    ? data["experience"]
        .split(/,|\n/)
        .map((exp) => `<li>${exp.trim()}</li>`)
        .join("")
    : "";

  // Education (degree + university + passing year)
  const educationHTML = [];
  if (data["degree"])
    educationHTML.push(`<strong>Degree:</strong> ${data["degree"]}`);
  if (data["university"])
    educationHTML.push(`<strong>University:</strong> ${data["university"]}`);
  if (data["passingYear"])
    educationHTML.push(`<strong>Passing Year:</strong> ${data["passingYear"]}`);
  document.getElementById("preview-education").innerHTML =
    educationHTML.join("<br>");

  // Achievements
  document.getElementById("preview-achievements").innerHTML = data[
    "achievements"
  ]
    ? data["achievements"]
        .split(/,|\n/)
        .map((item) => `<li>${item.trim()}</li>`)
        .join("")
    : "";

  // Projects
  document.getElementById("preview-projects").innerHTML = data["projects"]
    ? data["projects"]
        .split(/,|\n/)
        .map((item) => `<li>${item.trim()}</li>`)
        .join("")
    : "";

  // Show preview section
  document.getElementById("onboarding").classList.remove("active");
  document.querySelector(".progress").classList.remove("active");
  document.getElementById("preview").style.display = "block";
});

// Back button
document.getElementById("back-to-edit").addEventListener("click", () => {
  document.getElementById("preview").style.display = "none";
  document.getElementById("onboarding").classList.add("active");
  document.querySelector(".progress").classList.add("active");
});

document.getElementById("download-pdf").addEventListener("click", () => {
  const previewElement = document.getElementById("preview");

  if (!previewElement) {
    alert("Preview section not found!");
    return;
  }

  const opt = {
    margin: 0,
    filename: "my-resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, scrollY: 0 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(opt).from(previewElement).save();
});
