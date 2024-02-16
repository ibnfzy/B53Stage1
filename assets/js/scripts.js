let dataProjects = [];

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
  let date1 = document.getElementById("date1").value;
  let date2 = document.getElementById("date2").value;
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

  // console.log(dataProject);

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
          <p class="card-date">durasi : 3 bulan</p>
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
