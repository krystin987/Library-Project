var Library = function(instanceKey) {
	this.myBookArray = new Array;
	this.instanceKey = instanceKey;
};

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
		if (this.myBookArray[i].title.toLowerCase().includes(title)) {
			this.myBookArray.splice(i, 1);
			return true;
		}
	}
	return false;
};

Library.prototype.removeBookByAuthor = function(authorName) {
	for (var i in this.myBookArray) {
		if (this.myBookArray[i].author.toLowerCase().includes(authorName)) {
			this.myBookArray.filter( function( item, index, inputArray ) {
				inputArray.splice(i, 1);
			});
			return true;
		}
	}
	return false;
};

Library.prototype.getRandomBook = function() {
	for (var k in this.myBookArray) {
		if (this.myBookArray.indexOf) {
			return this.myBookArray[Math.floor(Math.random() * this.myBookArray.length)];
		}
	}
	return null;
};

Library.prototype.getBooksByTitle = function(title) {
	var results = [];;
	for (var i in this.myBookArray) {
		if (this.myBookArray[i].title.toLowerCase().includes(title)) {
			results.push(this.myBookArray[i]);
		}
	}
	return results;
};

// make arguments toString???
Library.prototype.getBooksByAuthor = function(authorName) {
	var results = [];;
	for (var i in this.myBookArray) {
		if (this.myBookArray[i].author.toLowerCase().includes(authorName)) {
			results.push(this.myBookArray[i]);
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
		if (this.addBook(books[i])) {
			count++;
	 	}
	 }
	 return count;
};

Library.prototype.getRandomAuthorName = function() {
	for (var i in this.myBookArray) {
		if (this.myBookArray.indexOf) {
			return this.myBookArray[Math.floor(Math.random() * this.myBookArray.length)].author;
		}
	}
	return null;
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

Library.prototype.setStorage = function(instanceKey) {
	localStorage.setItem(instanceKey, JSON.stringify(this.myBookArray));
};

Library.prototype.getStorage = function(instanceKey) {
	 return JSON.parse(localStorage.getItem(this.instanceKey));
};

Library.prototype.advancedSearch = function(property) {
	var results = [];
	for (var i in this.myBookArray) {
		if(this.myBookArray[i].property === this.property) {
			results.push(this.myBookArray[i]);
		};
	}
	return results;
};

var Book = function(oArgs) {
	this.title = oArgs.title;
	this.author = oArgs.author;
	this.numPages = oArgs.numPages;
	this.pubDate = new Date(oArgs.pubDate);
};

window.gLib = new Library("All");
window.gLibDenver = new Library("Denver");
window.gLibBoulder = new Library("Boulder");
