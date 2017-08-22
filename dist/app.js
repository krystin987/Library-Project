"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// require("babel-polyfill");

var Library = function Library(instanceKey) {
	this.myBookArray = new Array();
	this.instanceKey = instanceKey;
	this.storageArray = new Array();
};

Library.prototype.init = function () {
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

Library.prototype._bindEvents = function () {
	// add books
	var bookObjInputs = "#single-title-input, #single-author-input, #single-pages-input, #single-date-input";
	$(bookObjInputs).keyup(function () {
		var title = $("#single-title-input").val();var author = $("#single-author-input").val();var pages = $("#single-pages-input").val();var date = $("#single-date-input").val();if (title && author && pages && date) {
			$("#add-single-click-point").prop("disabled", false);
		}
	});
	$(bookObjInputs).keyup(function () {
		var title = $("#single-title-input").val();var author = $("#single-author-input").val();var pages = $("#single-pages-input").val();var date = $("#single-date-input").val();if (title && author && pages && date) {
			$("#add-many-click-point").prop("disabled", false);
		}
	});
	$("button#add-book-button").on("click", $.proxy(this._handleAddBookScreen, this));
	$("button#add-books-button").on("click", $.proxy(this._handleAddManyBooksScreen, this));
	$("button#add-single-click-point").on("click", $.proxy(this._handleAddOneBook, this));
	$("button#add-many-click-point").on("click", $.proxy(this._handleAddManyBooks, this));
	// show search
	$("button#show-search-button").on("click", $.proxy(this._handleShowSearch, this));
	// random & all
	$("button#random-book-btn").on("click", $.proxy(this._handleGetRandomBook, this));
	$("button#random-author-btn").on("click", $.proxy(this._handleGetRandomAuthor, this));
	$("button#all-authors-btn").on("click", $.proxy(this._handleGetAuthors, this));
	// remove by
	$("#remove-by-title-option-btn").on("click", $.proxy(this._handleRemoveBookByTitleOption, this));
	$("button#remove-by-title-btn").on("click", $.proxy(this._handleRemoveBookByTitle, this));
	$("#remove-by-title-input").keyup(function () {
		if ($("#remove-by-title-input").val()) {
			$("#remove-by-title-btn").prop("disabled", false);
		} else {
			$("#remove-by-title-btn").prop("disabled", true);
		}
	});
	$("button#remove-by-author-option-btn").on("click", $.proxy(this._handleRemoveBooksByAuthorOption, this));
	$("button#remove-by-author-btn").on("click", $.proxy(this._handleRemoveBooksByAuthor, this));
	$("#remove-by-author-input").keyup(function () {
		if ($("#remove-by-author-input").val()) {
			$("#remove-by-author-btn").prop("disabled", false);
		} else {
			$("#remove-by-author-btn").prop("disabled", true);
		}
	});
	// get by
	$("button#find-by-title-option-btn").on("click", $.proxy(this._handleGetBooksByTitleOption, this));
	$("button#get-by-title-btn").on("click", $.proxy(this._handleGetBooksByTitle, this));
	$("#get-by-title-input").keyup(function () {
		if ($("#get-by-title-input").val()) {
			$("#get-by-title-btn").prop("disabled", false);
		} else {
			$("#get-by-title-btn").prop("disabled", true);
		}
	});
	$("button#find-by-author-option-btn").on("click", $.proxy(this._handleGetBooksByAuthorOption, this));
	$(".get-by-author-btn").on("click", $.proxy(this._handleGetBooksByAuthor, this));
	$("#get-by-author-input").keyup(function () {
		if ($("#get-by-author-input").val()) {
			$("#get-by-author-btn").prop("disabled", false);
		} else {
			$("#get-by-author-btn").prop("disabled", true);
		}
	});
	// test buttons for JSON
	$("button#save-state-btn").on("click", $.proxy(this._handleSetStorage, this));
	$("button#clear-state-button").on("click", $.proxy(this._handleGetStorage, this));
};

Library.prototype._checkLocalStorage = function () {
	this.getStorage();
};

// foundation functions
Library.prototype.addBook = function (book) {
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

Library.prototype.removeBookByTitle = function (title) {
	for (var i in this.myBookArray) {
		if (this.myBookArray[i].title.toLowerCase().includes(title.toLowerCase())) {
			this.myBookArray.splice(i, 1);
			return true;
		}
	}
	return false;
};

Library.prototype.removeBooksByAuthor = function (authorName) {
	// filter it
	var newBookArray = this.myBookArray.filter(function (book) {
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

Library.prototype.getRandomBook = function () {
	if (!this.myBookArray.length) {
		return null;
	}
	return this.myBookArray[Math.floor(Math.random() * this.myBookArray.length)];
};

Library.prototype.getBooksByTitle = function (title) {
	var results = [];
	for (var i in this.myBookArray) {
		if (this.myBookArray[i].title.toLowerCase().includes(title.toLowerCase())) {
			results.push(this.myBookArray[i]);
		}
	}
	return results;
};

Library.prototype.getBooksByAuthor = function (authorName) {
	var results = [];;
	for (var i in this.myBookArray) {
		if (this.myBookArray[i].author.toLowerCase().includes(authorName.toLowerCase())) {
			results.push(this.myBookArray[i]);
		}
	}
	return results;
};

Library.prototype.addBooks = function (books) {
	var count = 0;
	if (!Array.isArray(books)) {
		return false;
	}
	for (var i in books) {
		if (this.addBook(books[i])) {
			count++;
		}
	}
	return count;
};

Library.prototype.getRandomAuthorName = function () {
	return this.getRandomBook().author;
};

Library.prototype.getAuthors = function () {
	var authors = [];
	for (var i in this.myBookArray) {
		authors.push(this.myBookArray[i].author);
	}
	var noDupes = authors.filter(function (item, index, inputArray) {
		return inputArray.indexOf(item) == index;
	});
	return noDupes;
};
// return this.myBookArray.reduce(function(result, book) {
// 	return result.add(book.author);}, new Set());

Library.prototype.setStorage = function (instanceKey) {
	localStorage.setItem(instanceKey, JSON.stringify(this.myBookArray));
	return localStorage.Denver;
};

Library.prototype.getStorage = function (instanceKey) {
	this.myBookArray = JSON.parse(localStorage.getItem(this.instanceKey));
	if (this.myBookArray === null) {
		this.myBookArray = new Array();
		this.addAllBooks();
	}
};

Library.prototype.advancedSearch = function () {
	var results = Array.from(this.myBookArray);

	for (var _len = arguments.length, pairs = Array(_len), _key = 0; _key < _len; _key++) {
		pairs[_key] = arguments[_key];
	}

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = pairs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _ref = _step.value;

			var _ref2 = _slicedToArray(_ref, 2),
			    key = _ref2[0],
			    value = _ref2[1];

			results = results.filter(function (book) {
				return book[key].match(new RegExp(value, "i"));
			});
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return results;
};

Library.prototype.displayAllAuthors = function () {
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = this.getAuthors()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var i = _step2.value;

			this.authorsDisplayCard(i);
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}
};

Library.prototype.displayAllBooks = function () {
	for (var i in this.myBookArray) {
		this.bookDisplayCard(this.myBookArray[i]);
	}
};
// newBook = function(arg) {
// 	return arg instanceof Book ? arg : new Book(arg);
// };

Library.prototype._handleShowSearch = function () {
	$("#display-area").empty();
	$("#main-display").children().hide();
	$("#search-bar").show();
	this.displayAllBooks();
};

Library.prototype._handleSetStorage = function () {
	this.setStorage(this.instanceKey);
};

Library.prototype._handleGetStorage = function () {
	localStorage.clear();
};

Library.prototype._handleGetRandomBook = function () {
	$("#display-area").empty();
	$("#main-display").children().hide();
	var random = this.getRandomBook();
	this.bookDisplayCard(random);
};

Library.prototype._handleGetRandomAuthor = function () {
	$("#display-area").empty();
	$("#main-display").children().hide();
	var randomAuthorName = this.getRandomAuthorName();
	this.authorsDisplayCard(randomAuthorName);
};

Library.prototype._handleAddBookScreen = function () {
	$("#display-area").empty();
	$("#main-display").children().hide();
	$("#add-many-click-point").hide();
	$("#add-book-panel").show();
};

Library.prototype._handleAddManyBooksScreen = function () {
	$("#display-area").empty();
	$("#main-display").children().hide();
	$("#add-many-books-panel").show();
	$("#add-many-click-point").show();
};

Library.prototype._handleAddOneBook = function (oArgs) {
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

Library.prototype._handleAddManyBooks = function (oArgs) {
	var temp = [];
	var newBook = new Book(oArgs);
	for (var i in oArgs) {
		newBook.title = $("#single-title-input").val();
		newBook.author = $("#single-author-input").val();
		newBook.numPages = $("#single-pages-input").val();
		newBook.pubDate = $("#single-date-input").val();
		temp.push(newBook);
		// this.displayInJumbo(newBook);
	}
	this.addBooks(temp);
};

Library.prototype._handleRemoveBookByTitleOption = function () {
	$("#display-area").empty();
	$("#main-display").children().hide();
	$(".remove-by-title").show();
};

Library.prototype._handleRemoveBookByTitle = function () {
	this.removeBookByTitle($("#remove-by-title-input").val());
	this.setStorage(this.instanceKey);
	$("#remove-by-title-input").val("");
	$("#remove-by-title-btn").prop("disabled", true);
};
Library.prototype._handleRemoveBooksByAuthorOption = function () {
	$("#display-area").empty();
	$("#main-display").children().hide();
	$(".remove-by-author").show();
};

Library.prototype._handleRemoveBooksByAuthor = function () {
	this.removeBooksByAuthor($("#remove-by-author-input").val());
	this.setStorage(this.instanceKey);
	$("#remove-by-author-input").val("");
	$("#remove-by-author-btn").prop("disabled", true);
};

Library.prototype._handleGetBooksByTitleOption = function () {
	$("#display-area").empty();
	$("#main-display").children().hide();
	$(".get-by-title").show();
};

Library.prototype._handleGetBooksByTitle = function () {
	var temp = this.getBooksByTitle($("#get-by-title-input").val());
	for (var i in temp) {
		this.bookDisplayCard(temp[i]);
	}
};

Library.prototype._handleGetBooksByAuthorOption = function () {
	$("#display-area").empty();
	$("#main-display").children().hide();
	$(".get-by-author").show();
};

Library.prototype._handleGetBooksByAuthor = function () {
	var temp = this.getBooksByAuthor($("#get-by-author-input").val());
	for (var i in temp) {
		this.bookDisplayCard(temp[i]);
	}
};

Library.prototype._handleGetAuthors = function () {
	$("#display-area").empty();
	$("#main-display").children().hide();
	// console.log(this.getAuthors());
	this.displayAllAuthors(this.getAuthors());
};

var Book = function Book(oArgs) {
	this.title = oArgs.title;
	this.author = oArgs.author;
	this.numPages = oArgs.numPages;
	this.pubDate = new Date(oArgs.pubDate);
};

$(function (e) {
	window.gLibDenver = new Library("Denver");
	window.gLibDenver.init();
	$("#add-book-panel").hide();
	$(".remove-by-title").hide();
	$("#add-many-books-panel").hide();
	$(".remove-by-author").hide();
	$(".get-by-title").hide();
	$(".get-by-author").hide();
	// $(".get-by-author").hide();
	// $("#show-searc-button").hide();
	// window.gLib = new Library("All");
	// window.gLib.init();
	// window.gLibBoulder = new Library("Boulder");
	// window.gLibBoulder.init();
});