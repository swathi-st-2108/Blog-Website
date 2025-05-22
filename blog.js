

const loginForm = document.getElementById("loginForm");
const crudSection = document.getElementById("blogSection");

function checkLogin() {
  if (sessionStorage.getItem("loggedInUser")) {
    loginForm.classList.add("d-none");
    crudSection.classList.remove("d-none");
  } else {
    loginForm.classList.remove("d-none");
    crudSection.classList.add("d-none");
  }
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "Swathi" && password === "2108") {
    sessionStorage.setItem("loggedInUser", username);
    checkLogin();
  } else {
    alert("Invalid Username");
  }
});

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("loggedInUser");
    checkLogin();
  });
}

checkLogin();

document.querySelector("#blogarea form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("blogTitle").value;
  const category = document.getElementById("blogCategory").value;
  const content = document.getElementById("blogContent").value;
  const author = document.getElementById("authorInput").value;

  if (title && category && content) {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    const blog = {
      id: Date.now(),
      title,
      category,
      content,
      author
    };

    blogs.push(blog);
    localStorage.setItem("blogs", JSON.stringify(blogs));

    alert("Blog Published Successfully!");

    document.getElementById("blogTitle").value = "";
    document.getElementById("blogCategory").value = "Select a category";
    document.getElementById("blogContent").value = "";
    document.getElementById("authorInput").value = "";

    
  } else {
    alert("Please fill in all fields.");
  }
});

