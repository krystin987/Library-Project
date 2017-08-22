// Library.prototype._handleShowSearch = function() {
// 	$("#display-area").empty();
// 	$("#main-display").children().hide();
// 	$("#search-bar").show();
// 	this.displayAllBooks();
// };
//
// Library.prototype._handleSetStorage = function() {
// 	this.setStorage(this.instanceKey);
// };
//
// Library.prototype._handleGetStorage = function() {
// 	localStorage.clear();
// };
//
// Library.prototype._handleGetRandomBook = function() {
// 	$("#display-area").empty();
// 	$("#main-display").children().hide();
// 	var random = this.getRandomBook();
// 	this.bookDisplayCard(random);
// };
//
//
// Library.prototype._handleGetRandomAuthor = function() {
// 	$("#display-area").empty();
// 	$("#main-display").children().hide();
// 	var randomAuthorName = this.getRandomAuthorName();
// 	this.authorsDisplayCard(randomAuthorName);
// };
//
// Library.prototype._handleAddBookScreen = function() {
// 	$("#display-area").empty();
// 	$("#main-display").children().hide();
// 	$("#add-many-click-point").hide();
// 	$("#add-book-panel").show();
// };
//
// Library.prototype._handleAddManyBooksScreen = function() {
// 	$("#display-area").empty();
// 	$("#main-display").children().hide();
// 	$("#add-many-books-panel").show();
// 	$("#add-many-click-point").show();
// };
//
// Library.prototype._handleAddOneBook = function(oArgs) {
// 	var newBook = new Book(oArgs);
// 	$("#display-area").empty();
// 	newBook.title = $("#single-title-input").val();
// 	newBook.author = $("#single-author-input").val();
// 	newBook.numPages = $("#single-pages-input").val();
// 	newBook.pubDate = $("#single-date-input").val();
// 	this.addBook(newBook);
// 	this.setStorage(this.instanceKey);
// 	$("#single-title-input, #single-author-input, #single-pages-input, #single-date-input").val("");
// 	$("#add-single-click-point").prop("disabled", true);
// 	this.bookDisplayCard(newBook);
// };
//
// Library.prototype._handleAddManyBooks = function(oArgs) {
// 	var temp = [];
// 	var newBook = new Book(oArgs);
// 	for (var i in oArgs) {
// 		newBook.title = $("#single-title-input").val();
// 		newBook.author = $("#single-author-input").val();
// 		newBook.numPages = $("#single-pages-input").val();
// 		newBook.pubDate = $("#single-date-input").val();
// 		temp.push(newBook);
// 		this.displayInJumbo(newBook);
// 	}
// 	this.addBooks(temp);
// };
//
// Library.prototype._handleRemoveBookByTitleOption = function() {
// 	$("#display-area").empty();
// 	$("#main-display").children().hide();
// 	$(".remove-by-title").show();
// };
//
// Library.prototype._handleRemoveBookByTitle = function() {
// 	this.removeBookByTitle($("#remove-by-title-input").val());
// 	this.setStorage(this.instanceKey);
// 	$("#remove-by-title-input").val("");
// 	$("#remove-by-title-btn").prop("disabled", true);
// };
// Library.prototype._handleRemoveBooksByAuthorOption = function() {
// 	$("#display-area").empty();
// 	$("#main-display").children().hide();
// 	$(".remove-by-author").show();
// };
//
// Library.prototype._handleRemoveBooksByAuthor = function() {
// 	this.removeBooksByAuthor($("#remove-by-author-input").val());
// 	this.setStorage(this.instanceKey);
// 	$("#remove-by-author-input").val("");
// 	$("#remove-by-author-btn").prop("disabled", true);
// };
//
// Library.prototype._handleGetBooksByTitleOption = function() {
//   alert("ah")
//   $("#display-area").empty();
//   $("#main-display").children().hide();
//   $(".get-by-title").show();
// };
//
// Library.prototype._handleGetBooksByTitle = function() {
// 	var temp = this.getBooksByTitle($("#get-by-title-input").val());
// 	for (var i in temp) {
// 		gLibDenver.displayInJumbo(temp[i]);
// 	}
// };
//
// // Library.prototype._handleGetBooksByAuthor = function() {
// // 	$("#display-area").empty();
// // 	$("#main-display").children().hide();
// // 	// console.log(this.getBooksByAuthor($("#get-by-author-input").val()));
// // 	$("#get-by-author-input").val("");
// // 	$("#get-by-author-btn").prop("disabled", true);
// // 	this.displayAllBooks();
// // };
//
// Library.prototype._handleGetAuthors = function() {
// 	$("#display-area").empty();
// 	$("#main-display").children().hide();
// 	// console.log(this.getAuthors());
// 	this.displayAllAuthors(this.getAuthors());
// };
