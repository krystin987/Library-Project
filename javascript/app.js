var Library = function () { this.myBookArray = new Array;};

Library.prototype.addBook = function(book){
	for (var i in gLib.myBookArray) {
		if (gLib.myBookArray[i].title === book.title) {
			return false;
		}
	}
	gLib.myBookArray.push(book);
	return true;
};

Library.prototype.removeBookByTitle = function(title) {
	for (var k in gLib.myBookArray) {
		if (gLib.myBookArray[k].title.toLowerCase() === title.toLowerCase()) {
			gLib.myBookArray.splice(k, 1);
			return true;
		}
	}
	return false;
};

Library.prototype.removeBookByAuthor = function(authorName) {
	for (var k in gLib.myBookArray) {
		if (gLib.myBookArray[k].author.toLowerCase() === authorName.toLowerCase()) {
			gLib.myBookArray.splice(k, 1);
			return true;
		}
	}
	return false;
};

Library.prototype.getRandomBook = function() {
	for (var k in gLib.myBookArray) {
		if (gLib.myBookArray.indexOf) {
			return gLib.myBookArray[Math.floor(Math.random() * gLib.myBookArray.length)];
		}
	}
	return null;
};

Library.prototype.getBooksByTitle = function(title) {
	var results = [];;
	for (var i in gLib.myBookArray) {
		if (gLib.myBookArray[i].title.toLowerCase().includes(title)) {
			results.push(gLib.myBookArray[i]);
		}
	}
	return results;
};

Library.prototype.getBooksByAuthor = function(authorName) {
	var results = [];;
	for (var i in gLib.myBookArray) {
		if (gLib.myBookArray[i].author.toLowerCase().includes(authorName)) {
			results.push(gLib.myBookArray[i]);
		}
	}
	return results;
};

Library.prototype.addBooks = function(books) {
	count = 0;
	for (var i in books) {
		if(!Array.isArray(books)) {
			return false;
		}
		if (gLib.addBook(books[i])) {
			count++;
	 	}
	 }
	 return count;
};

Library.prototype.getRandomAuthorName = function() {
	for (var i in gLib.myBookArray) {
		if (gLib.myBookArray.indexOf) {
			return gLib.myBookArray[Math.floor(Math.random() * gLib.myBookArray.length)].author;
		}
	}
	return null;
};

Library.prototype.getAuthors = function() {
	var authors = [];
	for(var i in gLib.myBookArray){
	   authors.push(gLib.myBookArray[i].author);
	}
	return authors;
};

var Book = function(oArgs) {
	this.title = oArgs.title;
	this.author = oArgs.author;
	this.numPages = oArgs.numPages;
	this.pubDate = new Date(oArgs.pubDate);
};

window.gLib = new Library();
