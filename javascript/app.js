var Library = function () {};

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

Library.prototype.removeBookByTitle = function (title) {
	for (var i in gLib.myBookArray) {
		if (gLib.myBookArray[i].title === title) {
			gLib.myBookArray.splice(i, 1);
			return true;
		}
	}
	return false;
};

// fix this to remove by title instead of iterator
// Library.prototype.removeBookByTitle = function (title) {
//
// 	var bool = false;
// 	for (var i = 0; i < gLib.myBookArray.length; i++) {
// 		if (gLib.myBookArray[i].title == title) {
// 			bool = true;
// 			gLib.myBookArray.splice(i, 1);
// 		}
// 	}
// 	return bool;
// };
//
// Library.prototype.removeBookByAuthor = function (authorName) {
// 	for (var i = 0; i < gLib.myBookArray.length; i++) {
// 		if (gLib.myBookArray[i].author !== authorName) {
// 			return false;
// 		}
// 	}
// 	gLib.myBookArray.splice(i, 1);
// 	return true;
// };

// Library.prototype.getRandomBook = function () {
// 	for (var k in gLib.myBookArray) {
// 		if (gLib.myBookArray.indexOf) {
// 			return gLib.myBookArray[Math.floor(Math.random() * gLib.myBookArray.length)];
// 		}
// 	}
// 	return null;
// };

// Library.prototype.getBookByTitle = function (title) {
// 	var temp = [];
// 	for (var k in gLib.myBookArray)	{
// 		//need regex for partial matches
// 		if (gLib.myBookArray[k].title === title) {
// 			temp.push(k);
// 		}
// 		return temp;
// 	}
// 	return [];
// };
//
// Library.prototype.getBookByAuthor = function (authorName) {
// 	var temp = [];
// 	for (var k in gLib.myBookArray)	{
// 		//need regex for partial matches
// 		if (gLib.myBookArray[k].author === authorName) {
// 			temp.push(k);
// 		}
// 		return temp;
// 	}
// 	return [];
// };

var Book = function(oArgs) {
	this.title = oArgs.title;
	this.author = oArgs.author;
	this.numPages = oArgs.numPages;
	this.aDate = oArgs.date;
};

var gBookOne = new Book(oArgs = {title: "It", author: "Stephen King", numpages: 390, pubDate: "03/12/1987"});
var gBookTwo = new Book(oArgs = {title: "Slaughterhouse Five", author: "Kurt Vonnegut", numpages: 400, pubDate: "03/01/1969"});

window.gLib = new Library();

// function accept an array, iterate through that array.length, then call the other method
