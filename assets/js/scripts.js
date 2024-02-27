let dataProjects = [];
let isNavbarMenuOpen = false;

function navbarOpen() {
  let navbar_dropdown = document.getElementById("dropdown");

  if (!isNavbarMenuOpen) {
    navbar_dropdown.className = "dropdown-navbar";
    isNavbarMenuOpen = true;
  } else {
    navbar_dropdown.className = "dropdown-navbar d-none";
    isNavbarMenuOpen = false;
  }
}

function sendMail() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;
  let emailDestination = "hi.dandi9@gmail.com";
  let url = `mailto:${emailDestination}?subject=${subject}&body=Halo bang nama saya, ${name}, saya ingin ${message}. bisakah anda menghubungi saya ${phone}`;

  if (name == "") {
    return alert("Please type your name");
  } else if (email == "") {
    return alert("Please type your email");
  } else if (phone == "") {
    return alert("Please type your phone");
  } else if (subject == "") {
    return alert("Please type your subject");
  } else if (message == "") {
    return alert("Please type your message");
  }

  window.location.href = url;

  const data = {
    name,
    email,
    phone,
    subject,
    message,
  };

  console.log(data);
}

function addProject(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let date1 = new Date(document.getElementById("date1").value);
  let date2 = new Date(document.getElementById("date2").value);
  let node = document.getElementById("node").checked;
  let react = document.getElementById("react").checked;
  let next = document.getElementById("next").checked;
  let type = document.getElementById("type").checked;
  let desc = document.getElementById("desc").value;

  let dataProject = {
    name,
    date1,
    date2,
    node,
    react,
    next,
    type,
    desc,
  };

  dataProjects.push(dataProject);

  renderProject();
}

function renderProject() {
  document.getElementById("project").innerHTML = "";

  console.table(dataProjects);

  dataProjects.forEach((project, idx) => {
    let nodesvg,
      reactsvg,
      nextsvg,
      typesvg = "";

    if (project.react == true) {
      reactsvg = "<img src='./assets/img/react.svg' class='icon-project' />";
    }

    if (project.node == true) {
      nodesvg = "<img src='./assets/img/node.svg' class='icon-project' />";
    }

    if (project.next == true) {
      nextsvg = "<img src='./assets/img/next.svg' class='icon-project' />";
    }

    if (project.type == true) {
      typesvg = "<img src='./assets/img/type.svg' class='icon-project' />";
    }

    document.getElementById("project").innerHTML += `
          <div class="col-4">
      <div class="project-card">
        <div class="card-body-project">
          <img src="./assets/img/stock-img.jpg" alt="" class="card-img-project" />
          <h3 class="card-title"><a href='./detail_projects.html' target='_blank' class="link-detail">${
            project.name
          }</a></h3>
          <p class="card-date">durasi : ${getDiffDate(
            project.date1,
            project.date2
          )}</p>
          <p>
            ${project.desc}
          </p>

          <div class="row icon-list"> 
            <!-- react -->
            ${reactsvg ?? ""}
            <!-- node -->
            ${nodesvg ?? ""}
            <!-- next -->
            ${nextsvg ?? ""}
            <!-- ts -->
            ${typesvg ?? ""}
          </div>

          <div class="row">
            <a href="" class="btn-black col-6">edit</a>
            <a href="" class="btn-black col-6">delete</a>
          </div>
        </div>
      </div>
    </div>
        `;
  });
}

function getDiffDate(start_date, end_date) {
  const diffInMs = Math.abs(end_date - start_date);
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (days === 1) {
    return "1 day";
  }

  if (days < 30) {
    return days + " days";
  }

  if (months === 1) {
    return "1 month";
  }

  if (months < 12) {
    return months + " months";
  }

  if (years === 1) {
    return "1 year";
  }

  return years + " years";
}

// Testimonial
let dataTestimonials = [
  {
    image: "./assets/img/rfs.jpg",
    quote: "Mantap Sekali jasanya",
    name: "Kelly",
    rating: 2,
  },
  {
    image: "./assets/img/rfs.jpg",
    quote: "Kerenlah pokoknya",
    name: "Nelson",
    rating: 3,
  },
  {
    image: "./assets/img/rfs.jpg",
    quote: "Wuhuu keren loh!",
    name: "Rfs",
    rating: 4,
  },
  {
    image: "./assets/img/rfs.jpg",
    quote: "Wuhuu keren loh!",
    name: "Rfs",
    rating: 1,
  },
  {
    image: "./assets/img/rfs.jpg",
    quote: "Wuhuu keren loh!",
    name: "Rfs",
    rating: 2,
  },
  {
    image: "./assets/img/rfs.jpg",
    quote: "Wuhuu keren loh!",
    name: "Rfs",
    rating: 5,
  },
];

const DataTestimonials = () => {
  let testimonials = document.getElementById("testimonials");
  testimonials.innerHTML = "";

  dataTestimonials.forEach((data) => {
    let testimonial = new Testimonials(
      data.image,
      data.quote,
      data.name,
      data.rating
    );

    testimonials.innerHTML += `
      <div class="col-4">
          <div class="project-card">
            <div class="card-body-project">
              <img src="${testimonial.image}" alt="" height="292" class="card-img-project" />
              <p class="card-title"><q><i>${testimonial.quote}</i></q></p>
              <h3 class="testimonials-name">- ${testimonial.name}</h3>
              <h3 class="testimonials-name"> ${testimonial.rating} ⭐</h3>
            </div>
          </div>
        </div>
    `;
  });
};

const FilterTestimonials = (rating) => {
  let testimonials = document.getElementById("testimonials");
  let filteredData = dataTestimonials.filter((data) => data.rating === rating);
  testimonials.innerHTML = "";

  filteredData.forEach((data) => {
    let testimonial = new Testimonials(
      data.image,
      data.quote,
      data.name,
      data.rating
    );

    testimonials.innerHTML += `
      <div class="col-4">
          <div class="project-card">
            <div class="card-body-project">
              <img src="${testimonial.image}" alt="" height="292" class="card-img-project" />
              <p class="card-title"><q><i>${testimonial.quote}</i></q></p>
              <h3 class="testimonials-name">- ${testimonial.name}</h3>
              <h3 class="testimonials-name"> ${testimonial.rating} ⭐</h3>
            </div>
          </div>
        </div>
    `;
  });
};

window.addEventListener("load", () => {
  if (new Testimonials() === undefined) {
    return;
  }

  DataTestimonials();
});
