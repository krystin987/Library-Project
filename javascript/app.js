var Library = function () {};

Library.prototype.myBookArray = [];

Library.prototype.addBook = function(book){
	for (var i = 0; i < gLib.myBookArray.length; i++) {
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
		if (books[i] === gLib.myBookArray[i]) {
			return 0;
		}
		count++;
		gLib.addBook(books[i]);
	}
	return count;
};

var Book = function(oArgs) {
	this.title = oArgs.title;
	this.author = oArgs.author;
	this.numPages = oArgs.numPages;
	this.aDate = oArgs.date;
};


// hardcoded variables exist for testing purposes
var gBookOne = new Book(oArgs = {title: "It", author: "Stephen King", numPages: 390, pubDate: "03/12/1987"});
var gBookTwo = new Book(oArgs = {title: "Slaughterhouse Five", author: "Kurt Vonnegut", numPages: 400, pubDate: "03/01/1969"});


// hardcoded objects exist for test purposes
var thompsonObj = [
	{
		title: "Fear and Loathing on the Campaign Trail '72'",
	 	author: "Hunter S. Thompson",
	 	numPages: 506,
	 	pubDate: "1/1/1973"
	},
	{
		title: "The Great Shark Hunt: Strange Tales from a Strange Time (Gonzo Papers, Volume 1)",
		author: "Hunter S. Thompson",
		numPages: 624,
		pubDate: "1/1/1979"
	}
];

var knuthObj = [
	{
		title: "The Art of Computer Programming",
		author: "Donald Knuth",
		numPages: 2000,
		pubDate: 1/1/1968
	},
];

window.gLib = new Library();
