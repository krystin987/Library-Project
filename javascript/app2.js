
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

Library.prototype.displayAllBooks = function (){
	for (var i in this.myBookArray) {
		this.bookDisplayCard(this.myBookArray[i]);
	}
};

Library.prototype._bindEventsToo = function(cardAttributes) {
	cardAttributes = cardAttributes || [".search-title-span", ".search-author-span", ".search-pages-span", "search-date-span"];
	$("#search-input").on("keyup", function(){
		// hide errythang
		$.each($(".book-card-class"), function(index, element){
				        $(element).hide();
				  });

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




// <div id="${"book-card"}" class="col-md-3 card-img-top">
//   <ul class="card-box row">
//   <li>Title: <span class="card-title pt-2 book-card-title">${bookCard.title}</span></li>
//   <li class="book-card-author">Author: ${bookCard.author} </li>
//   <li class="book-card-pages">Number of Pages: ${bookCard.numPages}</li>
//   <li class="book-card-date">Publish Date: ${bookCard.pubDate}</li>
// </ui>
// </div>
