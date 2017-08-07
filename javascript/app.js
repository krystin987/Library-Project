var Library = function () {

};

Library.prototype.myBookArray = []; // = new Array();


// add books to the library array
Library.prototype.addBook = function(book){
  gLib.myBookArray.push(book);
};

Library.prototype.removeBook = function (book) {
  for(var i = 0; i < gLib.myBookArray.length; i++) {
    if (book == gLib.myBookArray[i]) {
      gLib.myBookArray.splice(i, 1);
    };
  };
};

Library.prototype.removeBookByAuthor = function(authorName) {
  for (var k in gLib.myBookArray) {
    if (authorName == gLib.myBookArray[k].author) {
      gLib.myBookArray.splice(k, 1);
    };
  };
};

var Book = function(oArgs) {
  this.title = oArgs.title;
  this.author = oArgs.author;
  this.numPages = oArgs.numPages;
  this.aDate = oArgs.date
};

var gBookOne = new Book(oArgs = {title: "It", author: "Stephen King", numpages: 390, pubDate: "03/12/1987"})
var gBookTwo = new Book(oArgs = {title: "Slaughterhouse Five", author: "Kurt Vonnegut", numpages: 400, pubDate: "03/01/1969"})

// same as var window = x;  g is for global
window.gLib = new Library();
