

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
  const imageInput = document.getElementById("blogImage");

  if (title && category && content && author) {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const blog = {
      id: Date.now(),
      title,
      category,
      content,
      author
    };

    if (imageInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function () {
        blog.image = reader.result;
        blogs.push(blog);
        localStorage.setItem("blogs", JSON.stringify(blogs));
        alert("Blog Published Successfully!");
        document.querySelector("#blogarea form").reset();
        document.getElementById("imagePreview").style.display = "none";
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      blogs.push(blog);
      localStorage.setItem("blogs", JSON.stringify(blogs));
      alert("Blog Published Successfully!");
      document.querySelector("#blogarea form").reset();
      document.getElementById("imagePreview").style.display = "none";
    }
  } else {
    alert("Please fill in all fields (image optional).");
  }
});

document.getElementById("blogImage").addEventListener("change", function () {
  const file = this.files[0];
  const preview = document.getElementById("imagePreview");

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    preview.src = "#";
    preview.style.display = "none";
  }
});

