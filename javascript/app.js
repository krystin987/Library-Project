var Library = function(instanceKey) {
	this.myBookArray = new Array();
	this.instanceKey = instanceKey;
	this.storageArray = new Array();
};

Library.prototype.init = function(){
	this._checkLocalStorage();
	this._bindEvents();
	this._bindEventsToo();
	this.setStorage(this.instanceKey);
	$("button").prop("disabled", true);
	$(".btn-enabled").prop("disabled", false);
	$("input").val("");
	this.displayAllBooks();
	// this.$container = $("#myContainer"); if we need to target a parent container cache selectors
	// call function to populate book array if localStorage has our bookarray value
};

Library.prototype._bindEvents = function() {
	var bookObjInputs = "#single-title-input, #single-author-input, #single-pages-input, #single-date-input";
	$("button#add-single-click-point").on("click", $.proxy(this._handleAddOneBook, this));
	$(bookObjInputs).keyup(function() {var title = $("#single-title-input").val(); var author = $("#single-author-input").val(); var pages = $("#single-pages-input").val(); var date = $("#single-date-input").val(); if (title && author && pages && date) { $("#add-single-click-point").prop("disabled", false); } });
	$("button#add-many-click-point").on("click", $.proxy(this._handleAddManyBooks, this));
	$("button#random-book-btn").on("click", $.proxy(this._handleGetRandomBook, this));
	$("button#all-authors-btn").on("click", $.proxy(this._handleGetAuthors, this));
	$("button#random-author-btn").on("click", $.proxy(this._handleGetRandomAuthor, this));
	$("button#get-by-title-btn").on("click", $.proxy(this._handleGetBooksByTitle, this));
	$("#get-by-title-input").keyup(function() { if ($("#get-by-title-input").val()) {$("#get-by-title-btn").prop("disabled", false);} else {$("#get-by-title-btn").prop("disabled", true);}});
	$("button#get-by-author-btn").on("click", $.proxy(this._handleGetBooksByAuthor, this));
	$("#get-by-author-input").keyup(function() { if ($("#get-by-author-input").val()) {$("#get-by-author-btn").prop("disabled", false);} else {$("#get-by-author-btn").prop("disabled", true);}});
	$("button#remove-by-title-btn").on("click", $.proxy(this._handleRemoveBookByTitle, this));
	$("#remove-by-title-input").keyup(function() { if ($("#remove-by-title-input").val()) {$("#remove-by-title-btn").prop("disabled", false);} else {$("#remove-by-title-btn").prop("disabled", true);}});
	$("button#remove-by-author-btn").on("click", $.proxy(this._handleRemoveBooksByAuthor, this));
	$("#remove-by-author-input").keyup(function() { if ($("#remove-by-author-input").val()) {$("#remove-by-author-btn").prop("disabled", false);} else {$("#remove-by-author-btn").prop("disabled", true);}});
	$("button#save-state-btn").on("click", $.proxy(this._handleSetStorage, this));
	$("button#clear-state-button").on("click", $.proxy(this._handleGetStorage, this));
};

Library.prototype._checkLocalStorage = function() {
	this.getStorage();
};

Library.prototype._handleSetStorage = function() {
	this.setStorage(this.instanceKey);
};

Library.prototype._handleGetStorage = function() {
	localStorage.clear();
};

Library.prototype._handleGetRandomBook = function() {
	$("#display-area").empty();
	var random = this.getRandomBook();
	this.bookDisplayCard(random);
};


Library.prototype._handleGetRandomAuthor = function() {
	var randomAuthorName = this.getRandomAuthorName();
};

Library.prototype._handleAddOneBook = function(oArgs) {
	var newBook = new Book(oArgs);
	newBook.title = $("#single-title-input").val();
	newBook.author = $("#single-author-input").val();
	newBook.numPages = $("#single-pages-input").val();
	newBook.pubDate = $("#single-date-input").val();
	this.displayInJumbo(newBook);
	this.addBook(newBook);
	this.setStorage(this.instanceKey);
	$("#single-title-input, #single-author-input, #single-pages-input, #single-date-input").val("");
	$("#add-single-click-point").prop("disabled", true);
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
		this.displayInJumbo(newBook);
	}
	this.addBooks(temp);
};

Library.prototype._handleRemoveBookByTitle = function() {
	this.removeBookByTitle($("#remove-by-title-input").val());
	this.setStorage(this.instanceKey);
	$("#remove-by-title-input").val("");
	$("#remove-by-title-btn").prop("disabled", true);
};

Library.prototype._handleRemoveBooksByAuthor = function() {
	this.removeBooksByAuthor($("#remove-by-author-input").val());
	this.setStorage(this.instanceKey);
	$("#remove-by-author-input").val("");
	$("#remove-by-author-btn").prop("disabled", true);
};

Library.prototype._handleGetBooksByTitle = function() {

	var temp = this.getBooksByTitle($("#get-by-title-input").val());
	for (var i in temp) {
		gLibDenver.displayInJumbo(temp[i]);
	}
};

Library.prototype._handleGetBooksByAuthor = function() {
	console.log(this.getBooksByAuthor($("#get-by-author-input").val()));
	$("#get-by-author-input").val("");
	$("#get-by-author-btn").prop("disabled", true);
};

Library.prototype._handleGetAuthors = function() {
	console.log(this.getAuthors());
	this.displayInJumbo(this.getAuthors());
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
	var authors = [];
	for (var i in this.myBookArray) {
		authors.push(this.myBookArray[i].author);
	}
	var noDupes = authors.filter( function( item, index, inputArray ) {
		return inputArray.indexOf(item) == index;
	});
	return noDupes;
};
// return this.myBookArray.reduce(function(result, book) {
// 	return result.add(book.author);}, new Set());

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
	// this.pubDate = this.pubDate.getFullYear();
	// this.id = Date.now();
};

$(function(e){
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
