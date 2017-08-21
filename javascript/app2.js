
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

Library.prototype.authorsDisplayCard = function(authorCard) {
	$("#display-area").append(`
		<div id="author-card" class="author-card-class card card-inverse">
  		<img class="card-img" src="./images/books.jpeg" alt="Card image">
  		<div class="card-img-overlay">
    		<p class="card-text">Author: <span class="search-author-span">${authorCard}</span></p>
				<a class="get-by-author-btn" href="#">Click for more from this author</a>
  		</div>
		</div>
  `);
};

Library.prototype.displayAllAuthors = function (){
	for (var i of this.getAuthors()) {
		this.authorsDisplayCard(i);
	}
};

Library.prototype.displayAllBooks = function (){
	for (var i in this.myBookArray) {
		this.bookDisplayCard(this.myBookArray[i]);
	}
};

Library.prototype._bindEventsToo = function() {
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


Library.prototype._handleMoreBooks = function() {
	alert("kj");
	$("#main-display").append(`
		<div id="add-book-panel"class="form-row single-book-add">
			<div class="col">
				<input id="single-title-input" type="text" class="form-control-1" placeholder="Title">
			</div>
			<div class="col">
				<input id="single-author-input" type="text" class="form-control-2" placeholder="Author">
			</div>
			<div class="col">
				<input id="single-pages-input" type="text" class="form-control-3" placeholder="Number of Pages">
			</div>
			<div class="col">
				<input id="single-date-input" type="text" class="form-control-4" placeholder="Published Date">
			</div>
			<div class="add-book-btn-div">
			<button id="add-single-click-point" type="button" class="add-single-book-btn btn btn-primary">Add a Book</button>
		</div>
		<div class="add-books-btn-div">
		<button id="add-many-click-point" type="button" class="add-single-book-btn btn btn-primary">Add Many Books</button>
		</div>
		</div>
		`);
};
