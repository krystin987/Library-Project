var Library = function(instanceKey) {
	this.myBookArray = new Array();
	this.instanceKey = instanceKey;
};


Library.prototype.init = function(){
	// this.$container = $("#myContainer"); if we need to target a parent container cache selectors
	this._bindEvents();
	this._checkLocalStorage();
	// call function to populate book array if localStorage has our bookarray value
};

Library.prototype._bindEvents = function() {
	$("button#get-random-book-btn").on("click", $.proxy(this._handleGetRandomBook, this));
	// $("button.get-my-name").on("click", $.proxy(this._handleGetMyName, this));
	// this is where all event binding happens - but NOT event handlers, just function calls
	// within the parent of this, what does this refer to - in other words, it keeps "this" in the scope of context...
	// otherwise, jQuery hijacks our context, this becomes the selector instead
	// $("button#check-ls-btn").on("click", $.proxy(this._checkLocalStorage));
};

Library.prototype._checkLocalStorage = function() {
	this.getStorage();
};

// Library.prototype._handleGetMyName = function() {
// 	var inputVal = $("input.my-name").val();
// 	alert(inputVal);
// };

Library.prototype.addBook = function(book){
	// newBook = function(arg) {
	// 	return arg instanceof Book ? arg : new Book(arg);
	// };
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
	 return this.myBookArray = JSON.parse(localStorage.getItem(this.instanceKey));
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

$(function(){
	console.log("ready");
	window.gLib = new Library("All");
	window.gLib.init();
	window.gLibDenver = new Library("Denver");
	window.gLibDenver.init();
	window.gLibBoulder = new Library("Boulder");
	window.gLibBoulder.init();
});
