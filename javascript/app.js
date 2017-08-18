var Library = function(instanceKey) {
	this.myBookArray = new Array();
	this.instanceKey = instanceKey;
	this.storageArray = new Array();
};

Library.prototype.init = function(){
	this._checkLocalStorage();
	this._bindEvents();
	// this.$container = $("#myContainer"); if we need to target a parent container cache selectors
	// call function to populate book array if localStorage has our bookarray value
};

Library.prototype._bindEvents = function() {
	$("button#add-single-click-point").on("click", $.proxy(this._handleAddOneBook, this));
	$("button#add-many-click-point").on("click", $.proxy(this._handleAddManyBooks, this));
	$("button#random-book-btn").on("click", $.proxy(this._handleGetRandomBook, this));
	$("button#all-authors-btn").on("click", $.proxy(this._handleGetAuthors, this));
	$("button#all-authors-btn").on("click", $.proxy(this._handleGetAuthors, this));
	$("button#random-author-btn").on("click", $.proxy(this._handleGetRandomAuthor, this));
	$("button#save-state-btn").on("click", $.proxy(this._handleSetStorage, this));
	$("button#clear-state-button").on("click", $.proxy(this._handleGetStorage, this));
	$("button#remove-by-title-btn").on("click", $.proxy(this._handleRemoveBookByTitle, this));
	$("button#remove-by-author-btn").on("click", $.proxy(this._handleRemoveBooksByAuthor, this));
	$("button#get-by-title-btn").on("click", $.proxy(this._handleGetBooksByTitle, this));
	$("button#get-by-author-btn").on("click", $.proxy(this._handleGetBooksByAuthor, this));
};

Library.prototype._checkLocalStorage = function() {
	this.getStorage();
	// console.log(this.myBookArray);
};

Library.prototype._handleSetStorage = function() {
	this.setStorage(this.instanceKey);
	console.log(localStorage);
};

Library.prototype._handleGetStorage = function() {
	localStorage.clear();
	console.log(localStorage);
};

Library.prototype._handleGetRandomBook = function() {
	$(".remove-div").remove();
	var random = this.getRandomBook();
	console.log(random);
	for(var i in random){
		var div = $("<div>"+random[i]+"<div>").addClass("remove-div");
		$("#well-test").append(div);
	}
};

Library.prototype._handleGetRandomAuthor = function() {
	console.log(this.getRandomAuthorName());
};


Library.prototype._handleAddOneBook = function(oArgs) {
	var newBook = new Book(oArgs);
	newBook.title = $("#single-title-input").val();
	newBook.author = $("#single-author-input").val();
	newBook.numPages = $("#single-pages-input").val();
	newBook.pubDate = $("#single-date-input").val();
	console.log(newBook);
	this.addBook(newBook);
};

Library.prototype._handleAddManyBooks = function(oArgs) {
	var temp = [];
	var newBook = new Book(oArgs);
	for (var i in oArgs) {
		newBook.title = $("#single-title-input").val();
		newBook.author = $("#single-author-input").val();
		newBook.numPages = $("#single-pages-input").val();
		newBook.pubDate = $("#single-date-input").val();
		temp.push(newBook);
	}
	this.addBooks(temp);
};

Library.prototype._handleRemoveBookByTitle = function() {
	var book = $("#remove-by-title-input").val();
	this.removeBookByTitle(book);
};

Library.prototype._handleRemoveBooksByAuthor = function() {
	var author = $("#remove-by-author-input").val();
	this.removeBooksByAuthor(author);
};

Library.prototype._handleGetBooksByTitle = function() {
	var title = $("#get-by-title-input").val();
	console.log(this.getBooksByTitle(title));
};

Library.prototype._handleGetBooksByAuthor = function() {
	var author = $("#get-by-author-input").val();
	console.log(this.getBooksByAuthor(author));
};

Library.prototype._handleGetAuthors = function() {
	var authors = this.getAuthors();
	console.log(authors);
};

// foundation functions
Library.prototype.addBook = function(book){
	for (var i in book) {
		if (Array.isArray(book)) {
			return false;
		}
	}
	for (var i in this.myBookArray) {
		if (this.myBookArray[i].title === book.title) {
			return false;
		}
	}
	this.myBookArray.push(book);
	return true;
};

Library.prototype.removeBookByTitle = function(title) {
	for (var i in this.myBookArray) {
		if (this.myBookArray[i].title.toLowerCase().includes(title.toLowerCase())) {
			this.myBookArray.splice(i, 1);
			return true;
		}
	}
	return false;
};

Library.prototype.removeBooksByAuthor = function(authorName) {
	// filter it
	var newBookArray = this.myBookArray.filter(function(book) {
		return !book.author.toLowerCase().includes(authorName.toLowerCase());
	});
	// replace it
	if (this.myBookArray.length > newBookArray.length) {
		this.myBookArray = newBookArray;
		return true;
	}
	// return true if replaced, false otherwise
	return false;
};

Library.prototype.getRandomBook = function() {
	if (!this.myBookArray.length) {
		return null;
	}
	return this.myBookArray[Math.floor(Math.random() * this.myBookArray.length)];
};

Library.prototype.getBooksByTitle = function(title) {
	var results = [];
	for (var i in this.myBookArray) {
		if (this.myBookArray[i].title.toLowerCase().includes(title.toLowerCase())) {
			results.push(this.myBookArray[i]);
		}
	}
	return results;
};

// make arguments toString???
Library.prototype.getBooksByAuthor = function(authorName) {
	var results = [];;
	for (var i in this.myBookArray) {
		if (this.myBookArray[i].author.toLowerCase().includes(authorName.toLowerCase())) {
			results.push(this.myBookArray[i]);
		}
	}
	return results;
};

Library.prototype.addBooks = function(books) {
	var count = 0;
	if(!Array.isArray(books)) {
		return false;
	}
	for (var i in books) {
		if (this.addBook(books[i])) {
			count++;
		}
	}
	return count;
};

Library.prototype.getRandomAuthorName = function() {
	return this.getRandomBook().author;
};

Library.prototype.getAuthors = function() {
	return this.myBookArray.reduce(function(result, book) {
		return result.add(book.author);}, new Set());
};

Library.prototype.setStorage = function(instanceKey) {
	localStorage.setItem(instanceKey, JSON.stringify(this.myBookArray));
	return localStorage.Denver;
};

Library.prototype.getStorage = function(instanceKey) {
	// or new array
	this.myBookArray = JSON.parse(localStorage.getItem(this.instanceKey));
	if (this.myBookArray === null) {
		this.myBookArray = new Array();
		this.addAllBooks();
	}
};

Library.prototype.advancedSearch = function(...pairs) {
	var results = Array.from(this.myBookArray);
	for ([key, value] of pairs) {
		results = results.filter(function(book) {
			return book[key].match(new RegExp(value, "i"));
		});
	}
	return results;
};

var Book = function(oArgs) {
	this.title = oArgs.title;
	this.author = oArgs.author;
	this.numPages = oArgs.numPages;
	this.pubDate = new Date(oArgs.pubDate);
};

// Book.prototype.toString = function() {
// 	var lines = ["title: " + this.title, "author: " + this.author, "pages: " + this.numPages, "date: " + this.pubDate];
// 	return lines.join("\n");
// };

$(function(){
	window.gLibDenver = new Library("Denver");
	window.gLibDenver.init();
	// window.gLib = new Library("All");
	// window.gLib.init();
	// window.gLibBoulder = new Library("Boulder");
	// window.gLibBoulder.init();
});

// newBook = function(arg) {
// 	return arg instanceof Book ? arg : new Book(arg);
// };
