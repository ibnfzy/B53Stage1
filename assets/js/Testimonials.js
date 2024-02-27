class Testimonials {
  constructor(image, quote, name, rating) {
    this._image = image;
    this._quote = quote;
    this._name = name;
    this._rating = rating;
  }

  get image() {
    return this._image;
  }

  get quote() {
    return this._quote;
  }

  get name() {
    return this._name;
  }

  get rating() {
    return this._rating;
  }

  set image(val) {
    if (val === "") {
      console.log("Image cannot be empty");
      return;
    }

    this._image = val;
  }

  set quote(val) {
    if (val === "") {
      console.log("Quote cannot be empty");
      return;
    }

    this._quote = val;
  }

  set name(val) {
    if (val === "") {
      console.log("Name cannot be empty");
      return;
    }

    this._name = val;
  }

  set rating(val) {
    if (val === "") {
      console.log("Rating cannot be empty");
      return;
    }

    this._rating;
  }
}
