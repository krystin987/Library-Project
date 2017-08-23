var Library = function(instanceKey) {
	this.myBookArray = new Array();
	this.instanceKey = instanceKey;
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
};

Library.prototype._bindEvents = function() {
	// show search
	$("button#show-search-button").on("click", $.proxy(this._handleShowSearch, this));

	// add book
	var bookObjInputs = "#single-title-input, #single-author-input, #single-pages-input, #single-date-input";
	$(bookObjInputs).keyup(function() {var title = $("#single-title-input").val(); var author = $("#single-author-input").val(); var pages = $("#single-pages-input").val(); var date = $("#single-date-input").val(); if (title && author && pages && date) { $("#add-single-click-point").prop("disabled", false); } });
	$("button#add-book-button").on("click", $.proxy(this._handleAddBookScreen, this));
	$("button#add-single-click-point").on("click", $.proxy(this._handleAddOneBook, this));

	// add books
	var bookObjInputs = "#many-title-input, #many-author-input, #many-pages-input, #many-date-input";
	$(bookObjInputs).keyup(function() {var title = $("#many-title-input").val(); var author = $("#many-author-input").val(); var pages = $("#many-pages-input").val(); var date = $("#many-date-input").val(); if (title && author && pages && date) { $("#add-many-click-point").prop("disabled", false); } });
	$("button#add-books-button").on("click", $.proxy(this._handleAddManyBooksScreen, this));
	$("button#add-many-click-point").on("click", $.proxy(this._handleAddManyBooks, this));

	// random & all authors
	$("button#random-book-btn").on("click", $.proxy(this._handleGetRandomBook, this));
	$("button#random-author-btn").on("click", $.proxy(this._handleGetRandomAuthor, this));
	$("button#all-authors-btn").on("click", $.proxy(this._handleGetAuthors, this));

	// remove by author/title
	$("#remove-by-title-option-btn").on("click", $.proxy(this._handleRemoveBookByTitleOption, this));
	$("button#remove-by-title-btn").on("click", $.proxy(this._handleRemoveBookByTitle, this));
	$("#remove-by-title-input").keyup(function() { if ($("#remove-by-title-input").val()) {$("#remove-by-title-btn").prop("disabled", false);} else {$("#remove-by-title-btn").prop("disabled", true);}});
	$("button#remove-by-author-option-btn").on("click", $.proxy(this._handleRemoveBooksByAuthorOption, this));
	$("button#remove-by-author-btn").on("click", $.proxy(this._handleRemoveBooksByAuthor, this));
	$("#remove-by-author-input").keyup(function() { if ($("#remove-by-author-input").val()) {$("#remove-by-author-btn").prop("disabled", false);} else {$("#remove-by-author-btn").prop("disabled", true);}});

	// get by author/title
	$("button#find-by-title-option-btn").on("click", $.proxy(this._handleGetBooksByTitleOption, this));
	$("button#get-by-title-btn").on("click", $.proxy(this._handleGetBooksByTitle, this));
	$("#get-by-title-input").keyup(function() { if ($("#get-by-title-input").val()) {$("#get-by-title-btn").prop("disabled", false);} else {$("#get-by-title-btn").prop("disabled", true);}});
	$("button#find-by-author-option-btn").on("click", $.proxy(this._handleGetBooksByAuthorOption, this));
	$(".get-by-author-btn").on("click", $.proxy(this._handleGetBooksByAuthor, this));
	$("#get-by-author-input").keyup(function() { if ($("#get-by-author-input").val()) {$("#get-by-author-btn").prop("disabled", false);} else {$("#get-by-author-btn").prop("disabled", true);}});
};

// check JSON for string object, pares or returns null
Library.prototype._checkLocalStorage = function() {
	this.getStorage();
};

// foundation functions
// addbook accepts only single book objects
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
	// this.bookDisplayCard(book[i]);
	this.myBookArray.push(book);
	return true;
};

// removes books objects that match string input by title
Library.prototype.removeBookByTitle = function(title) {
	for (var i in this.myBookArray) {
		if (this.myBookArray[i].title.toLowerCase().includes(title.toLowerCase())) {
			this.myBookArray.splice(i, 1);
			return true;
		}
	}
	return false;
};

// removes book objects that match string input by author
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

// returns a random book object
Library.prototype.getRandomBook = function() {
	if (!this.myBookArray.length) {
		return null;
	}
	return this.myBookArray[Math.floor(Math.random() * this.myBookArray.length)];
};

// returns book object matching input string
Library.prototype.getBooksByTitle = function(title) {
	var results = [];
	for (var i in this.myBookArray) {
		if (this.myBookArray[i].title.toLowerCase().includes(title.toLowerCase())) {
			results.push(this.myBookArray[i]);
		}
	}
	return results;
};

// returns book objects matching author input string
Library.prototype.getBooksByAuthor = function(authorName) {
	var results = [];;
	for (var i in this.myBookArray) {
		if (this.myBookArray[i].author.toLowerCase().includes(authorName.toLowerCase())) {
			results.push(this.myBookArray[i]);
		}
	}
	return results;
};

// accepts only arrays of book objects
Library.prototype.addBooks = function(books) {
	var count = 0;
	if(!Array.isArray(books)) {
		return false;
	}
	for (var i in books) {
		if (this.addBook(books[i])) {
			count++;
			// this.bookDisplayCard(books[i]);
		}
	}
	// this.bookDisplayCard(books);
	return count;
};

// returns a random author
Library.prototype.getRandomAuthorName = function() {
	return this.getRandomBook().author;
};

// returns all authors, only once each
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

// sets storage to current book array
Library.prototype.setStorage = function(instanceKey) {
	localStorage.setItem(instanceKey, JSON.stringify(this.myBookArray));
	return localStorage.Denver;
};

// attempts to get data from local storage,
// returns new array w/ test vars upon null value,
// otherwise returns parsed JSON object as myBookArray
Library.prototype.getStorage = function(instanceKey) {
	this.myBookArray = JSON.parse(localStorage.getItem(this.instanceKey));
	if (this.myBookArray === null) {
		this.myBookArray = new Array();
		this.addAllBooks();
	}
};

// not currently hooked up to this GUI
// Library.prototype.advancedSearch = function(...pairs) {
// 	var results = Array.from(this.myBookArray);
// 	for ([key, value] of pairs) {
// 		results = results.filter(function(book) {
// 			return book[key].match(new RegExp(value, "i"));
// 		});
// 	}
// 	return results;
// };

Library.prototype.displayAllAuthors = function (){
	for (var i of this.getAuthors()) {
		this.authorsDisplayCard(i);
	}
};

Library.prototype.displayAllBooks = function (){
	for (var i in this.myBookArray) {
		if (this.myBookArray.length) {
			 this.bookDisplayCard(this.myBookArray[i]);
		}
	}
};

Library.prototype._handleShowSearch = function() {
	$("#display-area").empty();
	$("#main-display").children().hide();
	$("#search-bar").show();
	this.displayAllBooks();
};

Library.prototype._handleSetStorage = function() {
	this.setStorage(this.instanceKey);
};

Library.prototype._handleGetRandomBook = function() {
	$("#display-area").empty();
	$("#main-display").children().hide();
	var random = this.getRandomBook();
	this.bookDisplayCard(random);
};

Library.prototype._handleGetRandomAuthor = function() {
	$("#display-area").empty();
	$("#main-display").children().hide();
	var randomAuthorName = this.getRandomAuthorName();
	this.authorsDisplayCard(randomAuthorName);
};

Library.prototype._handleAddBookScreen = function() {
	$("#display-area").empty();
	$("#main-display").children().hide();
	$("#add-many-click-point").hide();
	$("#add-book-panel").show();
};

Library.prototype._handleAddOneBook = function(oArgs) {
	var newBook = new Book(oArgs);
	$("#display-area").empty();
	newBook.title = $("#single-title-input").val();
	newBook.author = $("#single-author-input").val();
	newBook.numPages = $("#single-pages-input").val();
	newBook.pubDate = $("#single-date-input").val();
	this.addBook(newBook);
	this.setStorage(this.instanceKey);
	$("#single-title-input, #single-author-input, #single-pages-input, #single-date-input").val("");
	$("#add-single-click-point").prop("disabled", true);
	this.bookDisplayCard(newBook);
};

Library.prototype._handleAddManyBooksScreen = function() {
	$("#display-area").empty();
	$("#main-display").children().hide();
	$("#add-many-books-panel").show();
	$("#add-many-click-point").show();
};


Library.prototype._handleAddManyBooks = function(oArgs) {
	var temp = [];
	for (var i in oArgs) {
		var newBook = new Book(oArgs);
		newBook.title = $("#many-title-input").val();
		newBook.author = $("#many-author-input").val();
		newBook.numPages = $("#many-pages-input").val();
		newBook.pubDate = $("#many-date-input").val();
		temp.push(newBook);
	}
	for (var j in oArgs) {
		var newBook = new Book(oArgs);
		newBook.title = $("#many-title-input1").val();
		newBook.author = $("#many-author-input1").val();
		newBook.numPages = $("#many-pages-input1").val();
		newBook.pubDate = $("#many-date-input1").val();
		temp.push(newBook);
	}
	for (var k in oArgs) {
		var newBook = new Book(oArgs);
		newBook.title = $("#many-title-input2").val();
		newBook.author = $("#many-author-input2").val();
		newBook.numPages = $("#many-pages-input2").val();
		newBook.pubDate = $("#many-date-input2").val();
		temp.push(newBook);
	}
	for (var l in oArgs) {
		var newBook = new Book(oArgs);
		newBook.title = $("#many-title-input3").val();
		newBook.author = $("#many-author-input3").val();
		newBook.numPages = $("#many-pages-input3").val();
		newBook.pubDate = $("#many-date-input3").val();
		temp.push(newBook);
	}
	for (var m in oArgs) {
		var newBook = new Book(oArgs);
		newBook.title = $("#many-title-input4").val();
		newBook.author = $("#many-author-input4").val();
		newBook.numPages = $("#many-pages-input4").val();
		newBook.pubDate = $("#many-date-input4").val();
		temp.push(newBook);
	}
	this.addBooks(temp);
	// for (var i in temp) {
	// 	this.bookDisplayCard(temp);
	// }
	$("#add-many-books-panel").hide();
	this.setStorage(this.instanceKey);
};

// Library.prototype.displayManyBooks = function (bookCard) {
// 	this.bookDisplayCard(bookCard);
// };

Library.prototype._handleRemoveBookByTitleOption = function() {
	$("#display-area").empty();
	$("#main-display").children().hide();
	$(".remove-by-title").show();
};

Library.prototype._handleRemoveBookByTitle = function() {
	this.removeBookByTitle($("#remove-by-title-input").val());
	this.setStorage(this.instanceKey);
	$("#remove-by-title-input").val("");
	$("#remove-by-title-btn").prop("disabled", true);
};
Library.prototype._handleRemoveBooksByAuthorOption = function() {
	$("#display-area").empty();
	$("#main-display").children().hide();
	$(".remove-by-author").show();
};

Library.prototype._handleRemoveBooksByAuthor = function() {
	this.removeBooksByAuthor($("#remove-by-author-input").val());
	this.setStorage(this.instanceKey);
	$("#remove-by-author-input").val("");
	$("#remove-by-author-btn").prop("disabled", true);
};

Library.prototype._handleGetBooksByTitleOption = function() {
	$("#display-area").empty();
	$("#main-display").children().hide();
	$(".get-by-title").show();
};

Library.prototype._handleGetBooksByTitle = function() {
	var temp = this.getBooksByTitle($("#get-by-title-input").val());
	for (var i in temp) {
		this.bookDisplayCard(temp[i]);
	}
};

Library.prototype._handleGetBooksByAuthorOption = function() {
	$("#display-area").empty();
	$("#main-display").children().hide();
	$(".get-by-author").show();
};

Library.prototype._handleGetBooksByAuthor = function() {
	var temp = this.getBooksByAuthor($("#get-by-author-input").val());
	for (var i in temp) {
		this.bookDisplayCard(temp[i]);
	}
};

Library.prototype._handleGetAuthors = function() {
	$("#display-area").empty();
	$("#main-display").children().hide();
	// console.log(this.getAuthors());
	this.displayAllAuthors(this.getAuthors());
};

var Book = function(oArgs) {
	this.title = oArgs.title;
	this.author = oArgs.author;
	this.numPages = oArgs.numPages;
	this.pubDate = new Date(oArgs.pubDate);
};

$(function(e){
	// move to init or call in another function
	$("#add-book-panel").hide();
	$(".remove-by-title").hide();
	$("#add-many-books-panel").hide();
	$(".remove-by-author").hide();
	$(".get-by-title").hide();
	$(".get-by-author").hide();
	window.gLibDenver = new Library("Denver");
	window.gLibDenver.init();
	// $("#show-searc-button").hide();
	// window.gLib = new Library("All");
	// window.gLib.init();
	// window.gLibBoulder = new Library("Boulder");
	// window.gLibBoulder.init();
});
