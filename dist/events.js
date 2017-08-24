"use strict";

Library.prototype._liveSearch = function () {
	// keyup for live search function, filters for title || author matches only
	$("#search-input").on("keyup", function () {
		$.each($(".book-card-class"), function (index, element) {
			$(element).hide();
		});
		var _arr = [".search-title-span", ".search-author-span"];
		for (var _i = 0; _i < _arr.length; _i++) {
			var i = _arr[_i];
			var searchField = $(this).val().toLowerCase();
			$.each($(i), function (index, element) {
				var titleBox = $(this).text().toLowerCase();
				var checkInput = 0 <= titleBox.indexOf(searchField);
				if (checkInput) {
					$(element).parents(".book-card-class").show();
				}
			});
		}
	});
};

// displays whole book objects with all properties
Library.prototype.bookDisplayCard = function (bookCard) {
	var year = bookCard.pubDate.slice(0, 4);
	$("#display-area").append("\n\t\t<div id=\"book-card\" class=\"book-card-class card card-inverse\">\n  \t\t<img class=\"card-img\" src=\"./images/books.jpeg\" alt=\"Card image\">\n  \t\t<div class=\"card-img-overlay\">\n    \t\t<h4 class=\"card-title\">Title: <span class=\"search-title-span\">" + bookCard.title + "</span> </h4>\n    \t\t<p class=\"card-text\">Author: <span class=\"search-author-span\">" + bookCard.author + "</span></p>\n\t\t\t\t<p class=\"card-text\">Number of Pages: <span class=\"search-pages-span\"> " + bookCard.numPages + "</span></p>\n\t\t\t\t<p class=\"card-text\">Published Year: <span class=\"search-date-span\"><time datetime=\"" + bookCard.pubDate + "\">" + year + "</span></time></p>\n  \t\t</div>\n\t\t</div>\n  ");
};

// displays only authors
Library.prototype.authorsDisplayCard = function (authorCard) {
	$("#display-area").append("\n\t\t<div id=\"author-card\" class=\"author-card-class card card-inverse\">\n  \t\t<img class=\"card-img\" src=\"./images/books.jpeg\" alt=\"Card image\">\n  \t\t<div class=\"card-img-overlay\">\n    \t\t<p class=\"card-text\">Author: <span class=\"search-author-span\">" + authorCard + "</span></p>\n  \t\t</div>\n\t\t</div>\n  ");
};