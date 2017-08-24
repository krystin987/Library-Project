Library.prototype._liveSearch = function() {
	// keyup for live search function, filters for title || author matches only
	$("#search-input").on("keyup", function(){
		$.each($(".book-card-class"), function(index, element){$(element).hide();});
		for (var i of [".search-title-span", ".search-author-span"]) {
	  var searchField = $(this).val().toLowerCase();
	  $.each($(i), function(index, element){
	    var titleBox = $(this).text().toLowerCase();
	    var checkInput = (0 <= titleBox.indexOf(searchField));
	      if (checkInput) {
	        $(element).parents(".book-card-class").show();
	      }
	  });
		}
	});
};

// displays whole book objects with all properties
Library.prototype.bookDisplayCard = function(bookCard) {
	var year = bookCard.pubDate.slice(0, 4);
	$("#display-area").append(`
		<div id="book-card" class="book-card-class card card-inverse">
  		<img class="card-img" src="./images/books.jpeg" alt="Card image">
  		<div class="card-img-overlay">
    		<h4 class="card-title">Title: <span class="search-title-span">${bookCard.title}</span> </h4>
    		<p class="card-text">Author: <span class="search-author-span">${bookCard.author}</span></p>
				<p class="card-text">Number of Pages: <span class="search-pages-span"> ${bookCard.numPages}</span></p>
				<p class="card-text">Published Year: <span class="search-date-span"><time datetime="${bookCard.pubDate}">${year}</span></time></p>
  		</div>
		</div>
  `);
};

// displays only authors
Library.prototype.authorsDisplayCard = function(authorCard) {
	$("#display-area").append(`
		<div id="author-card" class="author-card-class card card-inverse">
  		<img class="card-img" src="./images/books.jpeg" alt="Card image">
  		<div class="card-img-overlay">
    		<p class="card-text">Author: <span class="search-author-span">${authorCard}</span></p>
  		</div>
		</div>
  `);
};
