// hardcoded variables exist for testing purposes
var gBookOne = new Book(oArgs = {title: "It", author: "Stephen King", numPages: 390, pubDate: "03/12/1987"});
var gBookTwo = new Book(oArgs = {title: "Slaughterhouse Five", author: "Kurt Vonnegut", numPages: 400, pubDate: "03/01/1969"});
var gBookThree = new Book(oArgs = {title: "To Kill a Mockingbird", author: "Harper Lee", numPages: 281, pubDate: "07/11/1960"});
var gBookFour = new Book(oArgs = {title: "Starship Troopers", author: "Robert A. Heinlein", numPages: 263, pubDate: "12/01/1959"});
var gBookFive = new Book(oArgs = {title: "Candide", author: "Voltaire", numPages: 176, pubDate: "01/01/1759"});

// hardcoded objects exist for test purposes
var williamsonObj = [
// Jack Williamson coined such phrases as: genetic engineering, android, anti-matter, psionics, terraforming;
	new Book(oArgs =
	{
		title: "The Legion of Space",
	 	author: "Jack Williamson",
	 	numPages: 259,
	 	pubDate: "1947"
	}),

	new Book(oArgs =
	{
		title: "The Cometeers",
	 	author: "Jack Williamson",
	 	numPages: 506,
	 	pubDate: "1/1/1950"
	}),
	new Book(oArgs =
	{
		title: "Darker Than You Think",
	 	author: "Jack Williamson",
	 	numPages: 310,
	 	pubDate: "1/1/1948"
	}),
	new Book(oArgs =
	{
		title: "Star Bridge",
	 	author: "Jack Williamson",
	 	numPages: 221,
	 	pubDate: "1/1/1955"
	})
];

var thompsonObj = [
	new Book(oArgs =
	{
		title: "Fear and Loathing on the Campaign Trail '72'",
	 	author: "Hunter S. Thompson",
	 	numPages: 506,
	 	pubDate: "1/1/1973"
	}),
	new Book(oArgs =
	{
		title: "The Great Shark Hunt: Strange Tales from a Strange Time (Gonzo Papers, Volume 1)",
		author: "Hunter S. Thompson",
		numPages: 624,
		pubDate: "1/1/1979"
	}),

	new Book(oArgs =
	{
		title: "Fear and Loathing in Las Vegas: A Savage Journey to the Heart of the American Dream",
		author: "Hunter S. Thompson",
		numPages: 204,
		pubDate: "11/11/1971"
	}),

	new Book(oArgs =
	{
		title: "The Rum Diary",
		author: "Hunter S. Thompson",
		numPages: 204,
		pubDate: "1/1/1998"
	}),

	new Book(oArgs =
	{
		title: "Hell's Angels: The Strange and Terrible Saga of the Outlaw Motorcycle Gangs",
		author: "Hunter S. Thompson",
		numPages: 278,
		pubDate: "1/1/1967"
	})
];

var knuthObj = [
	new Book(oArgs =
	{
		title: "The Art of Computer Programming",
		author: "Donald Knuth",
		numPages: 2000,
		pubDate: "1/1/1968"
	}),
	new Book(oArgs =
	{
		title: "Concrete Mathematics: A Foundation for Computer Science",
		author: "Donald Knuth",
		numPages: 657,
		pubDate: "1/1/1994"
	})
];

Library.prototype.addAllBooksTest = function() {
	gLibDenver.addBook(gBookOne);
	gLibDenver.addBook(gBookTwo);
	gLibDenver.addBook(gBookThree);
	gLibDenver.addBook(gBookFour);
	gLibDenver.addBook(gBookFive);
	gLibDenver.addBooks(knuthObj);
	gLibDenver.addBooks(thompsonObj);
	gLibDenver.addBooks(williamsonObj);
	console.log(gLibDenver.myBookArray);
};

// newBook = function(arg) {
// 	return arg instanceof Book ? arg : new Book(arg);
// };
