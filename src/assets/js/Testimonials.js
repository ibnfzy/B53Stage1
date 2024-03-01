class Testimonials {
  constructor(image, comment, author, rate) {
    this._image = image;
    this._comment = comment;
    this._author = author;
    this._rate = rate;
  }

  get image() {
    return this._image;
  }

  get comment() {
    return this._comment;
  }

  get author() {
    return this._author;
  }

  get rate() {
    return this._rate;
  }

  set image(val) {
    if (val === "") {
      console.log("Image cannot be empty");
      return;
    }

    this._image = val;
  }

  set comment(val) {
    if (val === "") {
      console.log("Quote cannot be empty");
      return;
    }

    this._comment = val;
  }

  set author(val) {
    if (val === "") {
      console.log("Name cannot be empty");
      return;
    }

    this._author = val;
  }

  set rate(val) {
    if (val === "") {
      console.log("Rating cannot be empty");
      return;
    }

    this._rate;
  }
}
