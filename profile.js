const displayName = document.querySelector("#profile-name");
const description = document.querySelector("#profile-desc");
const subject = document.querySelector("#profile-subject");
const submitButton = document.querySelector(".submit-changes");
const newProfileImg = document.querySelector("#avatar");
const loc = document.querySelector("#profile-location");

const profileImg = document.querySelector("#pfp")
const profileUrl = document.querySelector("#image-url");

function emptyPfp(image) {
  image.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
}

//When page loads
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const allTutors = JSON.parse(localStorage.getItem("tutors"));
let currTutor = null;

allTutors.forEach(tutor => {
  if (tutor.email == currentUser.email) {
    currTutor = tutor;
  }
})

displayName.value = currTutor.name;
description.value = currTutor.desc;
subject.value = currTutor.subject;
loc.value = currTutor.location;
profileImg.src = currTutor.pfp;

submitButton.addEventListener("click", e => {
  currTutor.name = displayName.value;
  currTutor.desc = description.value;
  currTutor.subject = subject.value;
  currTutor.location = loc.value;
  if (profileUrl.value != "" || newProfileImg.value != "") {
    currTutor.pfp = profileImg.src;
  }
  localStorage.setItem("tutors", JSON.stringify(allTutors));

  window.location.href = "index.html"
})

newProfileImg.addEventListener("change", e => {
  const file = newProfileImg.files[0];
  const reader = new FileReader();
  reader.onload = (function(aImg) {
    return function(e) {
      aImg.src = e.target.result;
    };
  })(profileImg);
  reader.readAsDataURL(file);
})

profileUrl.addEventListener("change", e => {
  profileImg.src = profileUrl.value;
})