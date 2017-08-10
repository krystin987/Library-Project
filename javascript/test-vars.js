// hardcoded variables exist for testing purposes
var gBookOne = new Book(oArgs = {title: "It", author: "Stephen King", numPages: 390, pubDate: "03/12/1987"});
var gBookTwo = new Book(oArgs = {title: "Slaughterhouse Five", author: "Kurt Vonnegut", numPages: 400, pubDate: "03/01/1969"});

var tester = new Book(oArgs = {
	title: "Fear and Loathing on the Campaign Trail '72'",
	author: "Hunter S. Thompson",
	numPages: 506,
	pubDate: "1/1/1973"
});

var testerToo = new Book(oArgs = {
	title: "The Great Shark Hunt: Strange Tales from a Strange Time (Gonzo Papers, Volume 1)",
	author: "Hunter S. Thompson",
	numPages: 624,
	pubDate: "1/1/1979"
});

// hardcoded objects exist for test purposes
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
