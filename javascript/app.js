var Library = function (instanceKey) {
	this.myBookArray = new Array;
	this.instanceKey = instanceKey;
};

Library.prototype.addBook = function(book){
	for (var i in book) {
		if (Array.isArray(book)) {
			return false;
		}
	}
	for (var i in gLib.myBookArray) {
		if (gLib.myBookArray[i].title === book.title) {
			return false;
		}
	}
	gLib.myBookArray.push(book);
	return true;
};

Library.prototype.removeBookByTitle = function(title) {
	for (var i in gLib.myBookArray) {
		if (gLib.myBookArray[i].title.toLowerCase().includes(title)) {
			gLib.myBookArray.splice(i, 1);
			return true;
		}
	}
	return false;
};

Library.prototype.removeBookByAuthor = function(authorName) {
	for (var i in gLib.myBookArray) {
		if (gLib.myBookArray[i].author.toLowerCase().includes(authorName)) {
			var noDupes = gLib.myBookArray.filter( function( item, index, inputArray ) {
				inputArray.splice(i, 1);
			});
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
	for (var i in gLib.myBookArray) {
		authors.push(gLib.myBookArray[i].author);
	}
	var noDupes = authors.filter( function( item, index, inputArray ) {
		return inputArray.indexOf(item) == index;
	});
	return noDupes;
};

Library.prototype.setStorage = function (library, instanceKey) {
	localStorage.setItem(instanceKey, JSON.stringify(library.myBookArray));
};

Library.prototype.getStorage = function (instanceKey) {
	 var lib = localStorage.getItem(instanceKey);
	 lib = JSON.parse(lib);
	 console.log(lib);
};


var Book = function(oArgs) {
	this.title = oArgs.title;
	this.author = oArgs.author;
	this.numPages = oArgs.numPages;
	this.pubDate = new Date(oArgs.pubDate);
};

// (oArgs.pubDate[0], oArgs.pubDate[1]);
// (oArgs.pubDate);

window.gLib = new Library("All");
window.gLibDenver = new Library("Denver");
window.gLibBoulder = new Library("Boulder");
