const tutorDisplays = document.querySelector(".tutorCards");

const allTutors = JSON.parse(localStorage.getItem("tutors"));
const allUsers = JSON.parse(localStorage.getItem("users"));

const currUser = JSON.parse(localStorage.getItem("currentUser"))
const currUserPFP = document.querySelector(".current-user-pfp")

function emptyPfp(image) {
  image.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
}

function accountOn() {
  signUpButton.classList.add("is-hidden");
  logInButton.classList.add("is-hidden");
  profileButton.classList.remove("is-hidden");
  logOutButton.classList.remove("is-hidden");
  let currTutor = null;
  allTutors.forEach(tutor => {
    if (tutor.email == currUser.email) {
      currTutor = tutor;
    }
  })
  currUserPFP.src = currTutor.pfp;
}
function accountOff() {
  profileButton.classList.add("is-hidden");
  logOutButton.classList.add("is-hidden");
  signUpButton.classList.remove("is-hidden");
  logInButton.classList.remove("is-hidden");
}

//Populate the div with all tutors
try {
  allTutors.forEach(tutor => {

    tutorDisplays.innerHTML +=
      `<div class="tutor-card box is-flex p-0">
        <div class="is-flex">
          <div class = "card-left-side p-4 has-background-grey-lighter">
            <div class="is-flex">
              <img src="${tutor.pfp}" onerror="emptyPfp(this)">
              <div class="px-3">
                <p class="title">${tutor.name}</p>
                <p class="subtitle">${tutor.subject} Tutor</p>
              </div>
            </div>
            <div class="is-flex">
              <a id="request-button" href="mailto:${tutor.email}?subject=Tutor Session&body=Hi ${tutor.name}, I'd like to schedule a time to meet..."
                class="button is-primary align-self-center">Request Tutor</a>
              <div class="pl-5 pr-2" width="100px">
                <p class="subtitle">Rating:</p>
                <p>${tutor.rating} requests</p>
              </div>
            </div>
          </div>
          <div class="is-flex is-justify-content-left p-4">
            <p>${tutor.desc}</p>
          </div>
        </div>
        <div class="map-image">
          <figure class ="image m-0 tutor-location">
            ${tutor.location}
          </figure>
        </div>
      </div>`;
  })
}
catch { }

//Set up request buttons
const requestButtons = document.querySelectorAll("#request-button");
for (let i = 0; i < requestButtons.length; i++) {
  requestButtons[i].addEventListener("click", e => {
    allTutors[i].rating++;
    localStorage.setItem("tutors", JSON.stringify(allTutors));
  })
}

const tutorCards = document.querySelectorAll(".tutor-card");


//Sign up button
const signUpButton = document.querySelector(".sign-up");
const signUpScreen = document.querySelector("#sign-up-modal");
const nullErrorMessage = document.querySelector(".not-enough-data")
signUpButton.addEventListener("click", e => {
  signUpScreen.classList.add("is-active");
})

const modalCloseSignUp = document.querySelector(".modal-close");
modalCloseSignUp.addEventListener("click", e => {
  signUpScreen.classList.remove("is-active");
  nullErrorMessage.classList.add("is-hidden");
})

//Signing up
const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const subjectInput = document.querySelector("#subject-input");
const passwordInput = document.querySelector("#pswd-input");
const locationInput = document.querySelector("#location-input");
const signUpSubmit = document.querySelector("#sign-up-submit");

const profileButton = document.querySelector("#profile");


//Add new user to list
signUpSubmit.addEventListener("click", e => {

  if (nameInput.value == "" || subjectInput.value == "" || emailInput.value == "" || passwordInput.value == "") {
    nullErrorMessage.classList.remove("is-hidden");
  }
  else {
    signUpScreen.classList.remove("is-active");
    let newTutor = { "name": nameInput.value, "subject": subjectInput.value, "email": emailInput.value, "rating": 0, "desc": "", "location": locationInput.value, "pfp": null };
    let currStorage = JSON.parse(localStorage.getItem("tutors"));
    if (currStorage == null) {
      currStorage = [];
    }
    currStorage.push(newTutor);
    localStorage.setItem("tutors", JSON.stringify(currStorage));

    let currUsers = JSON.parse(localStorage.getItem("users"));
    if (currUsers == null) {
      currUsers = [];
    }
    currUsers.push({ "email": emailInput.value, "password": passwordInput.value });
    localStorage.setItem("users", JSON.stringify(currUsers));
    localStorage.setItem("currentUser", JSON.stringify(currUsers.splice(-1, 1)[0]));
    location.reload();
  }
})


function sendMail() {
  console.log("ma fault");
  var body = "Body"
  var subjectLine = "Subject"
  window.location.href = "viannirichards@gmail.com" + subjectLine + "&body=" + body;
}


//Login Screen
const logInButton = document.querySelector(".log-in");
const logInScreen = document.querySelector("#log-in-modal");
const logOutButton = document.querySelector(".log-out")
logOutButton.addEventListener("click", e => {
  localStorage.setItem("currentUser", null);
  location.reload();
})

logInButton.addEventListener("click", e => {
  logInScreen.classList.add("is-active");
})

const errorMessage = document.querySelector(".incorrect-user")
const modalCloseLogIn = document.querySelector(".log-in-close");
modalCloseLogIn.addEventListener("click", e => {
  logInScreen.classList.remove("is-active");
  errorMessage.classList.add("is-hidden");

})

//Login functionality
const emailLoginInput = document.querySelector("#login-email-input");
const passwordLoginInput = document.querySelector("#login-pswd-input");
function findUser(email, pswd) {
  allUsers.forEach(user => {
    console.log(user);
    if (user.email == email && user.password == pswd) {
      errorMessage.classList.add("is-hidden");
      logInScreen.classList.remove("is-active");
      localStorage.setItem("currentUser", JSON.stringify(user));
      location.reload();
      return;
    }
  })
  console.log("not quite");
  errorMessage.classList.remove("is-hidden");
  profileButton.classList.remove("is-hidden");
}
const logInSubmit = document.querySelector("#log-in-submit");
logInSubmit.addEventListener("click", e => {
  let email = emailLoginInput.value;
  let password = passwordLoginInput.value;
  findUser(email, password);
})



//SearchBar code
function hideAllTutors() {
  tutorCards.forEach(tutorCard => {
    tutorCard.classList.add("is-hidden");
  })
}


const searchBar = document.querySelector("#searchbar");

searchBar.addEventListener("change", e => {
  let searchQuery = searchBar.value.toLowerCase();
  hideAllTutors();
  for (let i = 0; i < allTutors.length; i++) {
    console.log();
    if (allTutors[i].subject.toLowerCase().includes(searchQuery)) {
      tutorCards[i].classList.remove("is-hidden");
    }
  }
})

//Check if logged on
if (currUser == null) {
  accountOff();
}
else {
  accountOn();
}