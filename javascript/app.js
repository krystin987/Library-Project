var Library = function () {

};

Library.prototype.myBookArray = []; // = new Array();

// add books to the library array
Library.prototype.addBook = function(book){
  for (var i = 0; i < gLib.myBookArray.length; i++) {
    if (gLib.myBookArray[i].title === book.title) {
      return false;
    }
  }
    gLib.myBookArray.push(book);
    return true;
};

// fix this to remove by title instead of iterator
Library.prototype.removeBookByTitle = function (title) {
  for (var k in gLib.myBookArray) {
    if (!gLib.myBookArray[k].title == title) {
      return false;
    }
  }
  gLib.myBookArray.splice(k, 1);
  return true;
};

Library.prototype.removeBookByAuthor = function (name) {
  for (var k in gLib.myBookArray) {
    if (gLib.myBookArray[k].author !== name) {
      return false;
    }
  }

  gLib.myBookArray.splice(k, 1);
  return true;
};

var Book = function(oArgs) {
  this.title = oArgs.title;
  this.author = oArgs.author;
  this.numPages = oArgs.numPages;
  this.aDate = oArgs.date
};

var gBookOne = new Book(oArgs = {title: "It", author: "Stephen King", numpages: 390, pubDate: "03/12/1987"})
var gBookTwo = new Book(oArgs = {title: "Slaughterhouse Five", author: "Kurt Vonnegut", numpages: 400, pubDate: "03/01/1969"})

window.gLib = new Library();
