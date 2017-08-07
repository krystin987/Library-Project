var Library = function () {};

var myBookArray = []; // = new Array();


Library.prototype.addBook = function(book){
  myBookArray.push(book);
};

Library.prototype.removeBook = function (book) {

};


//example: oArgs = {title: "It", author: "Stephen King", numpages = 390, pubDate: "03/12/1987"}
var Book = function(oArgs) {
  this.title = oArgs.title;
  this.author = oArgs.author;
  this.numPages = oArgs.numPages;
  this.aDate = oArgs.date
};

var gBookOnegitignore_global = new Book(oArgs = {title: "It", author: "Stephen King", numpages: 390, pubDate: "03/12/1987"})


// same as var window = x;  g is for global
window.gLib = new Library();
