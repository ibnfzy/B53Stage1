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
  let checkbox = document.querySelector('input[type="checkbox"]');
  let desc = document.getElementById("desc").value;

  let dataProject = {
    name,
    date1,
    date2,
    checkbox,
    desc,
  };

  dataProjects.push(dataProject);

  renderProject();
}

function renderProject() {
  document.getElementById("project").innerHTML = "";

  console.table(dataProjects);

  dataProjects.forEach((project, idx) => {
    document.getElementById("project").innerHTML += `
      <div class="col-4">
            <div class="project-card">
              <div class="card-body-project">
                <img src="./assets/img/stock-img.jpg" alt="" class="card-img-project" />
                <h3 class="card-title">${project.name}</h3>
                <p class="card-date">durasi : 3 bulan</p>
                <p>
                  ${project.desc}
                </p>

                <div class="row icon-list">
                  <svg class="icon-project" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                      d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                  </svg>
                  <svg class="icon-project-mid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                      d="M420.6 301.9a24 24 0 1 1 24-24 24 24 0 0 1 -24 24m-265.1 0a24 24 0 1 1 24-24 24 24 0 0 1 -24 24m273.7-144.5 47.9-83a10 10 0 1 0 -17.3-10h0l-48.5 84.1a301.3 301.3 0 0 0 -246.6 0L116.2 64.5a10 10 0 1 0 -17.3 10h0l47.9 83C64.5 202.2 8.2 285.6 0 384H576c-8.2-98.5-64.5-181.8-146.9-226.6" />
                  </svg>
                  <svg class="icon-project" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                      d="M277.7 312.9c9.8-6.7 23.4-12.5 23.4-12.5s-38.7 7-77.2 10.2c-47.1 3.9-97.7 4.7-123.1 1.3-60.1-8 33-30.1 33-30.1s-36.1-2.4-80.6 19c-52.5 25.4 130 37 224.5 12.1zm-85.4-32.1c-19-42.7-83.1-80.2 0-145.8C296 53.2 242.8 0 242.8 0c21.5 84.5-75.6 110.1-110.7 162.6-23.9 35.9 11.7 74.4 60.2 118.2zm114.6-176.2c.1 0-175.2 43.8-91.5 140.2 24.7 28.4-6.5 54-6.5 54s62.7-32.4 33.9-72.9c-26.9-37.8-47.5-56.6 64.1-121.3zm-6.1 270.5a12.2 12.2 0 0 1 -2 2.6c128.3-33.7 81.1-118.9 19.8-97.3a17.3 17.3 0 0 0 -8.2 6.3 70.5 70.5 0 0 1 11-3c31-6.5 75.5 41.5-20.6 91.4zM348 437.4s14.5 11.9-15.9 21.2c-57.9 17.5-240.8 22.8-291.6 .7-18.3-7.9 16-19 26.8-21.3 11.2-2.4 17.7-2 17.7-2-20.3-14.3-131.3 28.1-56.4 40.2C232.8 509.4 401 461.3 348 437.4zM124.4 396c-78.7 22 47.9 67.4 148.1 24.5a185.9 185.9 0 0 1 -28.2-13.8c-44.7 8.5-65.4 9.1-106 4.5-33.5-3.8-13.9-15.2-13.9-15.2zm179.8 97.2c-78.7 14.8-175.8 13.1-233.3 3.6 0-.1 11.8 9.7 72.4 13.6 92.2 5.9 233.8-3.3 237.1-46.9 0 0-6.4 16.5-76.2 29.7zM260.6 353c-59.2 11.4-93.5 11.1-136.8 6.6-33.5-3.5-11.6-19.7-11.6-19.7-86.8 28.8 48.2 61.4 169.5 25.9a60.4 60.4 0 0 1 -21.1-12.8z" />
                  </svg>
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
