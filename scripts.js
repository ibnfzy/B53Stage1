function sendMail() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;
  let emailDestination = "alboneh99@gmail.com";
  let url =
    "mailto:" + emailDestination + "?subject=" + subject + "&body=" + message;

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
