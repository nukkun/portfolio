// Listen for form submission
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e) {
	// Get form values
	var siteName = document.getElementById('siteName').value,
		siteUrl= document.getElementById('siteUrl').value;

	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	if (!validateForm(siteName, siteUrl)) {
		return false;
	}

	/*
		// Local Storage Test
		localStorage.setItem('test', 'Hello World');
		console.log(localStorage.getItem('test'));
		localStorage.removeItem('test');
		console.log(localStorage.getItem('test'));
	*/

	// Test if bookmarks is null
	if (localStorage.getItem('bookmarks') === null) {
		// init array
		var bookmarks = [];

		// Add to array
		bookmarks.push(bookmark);

		// Set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// Get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		// Add bookmark to array
		bookmarks.push(bookmark);

		// Set it back to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	}

	// Clear form
	document.getElementById('myForm').reset();

	// Re-fetch bookmarks
	fetchBookmarks();

	// Prevent form from submitting
	e.preventDefault();
}

function fetchBookmarks() {
	// get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// Get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	// Built output
	bookmarksResults.innerHTML = '';

	for (var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name,
			url  = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="card bookmarkDesign">'
								    + '<div class="card-block">'
									+ '<h3 class="card-title">'+name
									+ ' <a class="btn btn-btn btn-outline-secondary" href="'+url+'" target="_blank">Visit</a> '
									+ ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-btn btn-outline-danger" href="#bookmarksResults">Delete</a> '
									+ '</h3>'
									+ '</div>'
									+ '</div>';	
	}
	e.preventDefault();

}

// Delete bookmarks
function deleteBookmark(url) {
	// Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Loop  throughout bookmarks
	for (var i = 0; i < bookmarks.length; i++) {
		if (bookmarks[i].url == url) {
			// Remove from array
			bookmarks.splice(i, 1);
		}
	}

	// Set it back to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// Re-fetch bookmarks
	fetchBookmarks();	
	e.preventDefault();
}

// Validate Form
function validateForm(siteName, siteUrl) {
	if (!siteName) {
		alert('Specify a Site Name');
		return false;
	}

	if (!siteUrl) {
		alert('Specify a Site URL');
		return false;
	}

	// match a valid http/https link
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (!siteUrl.match(regex)) {
		alert('Please a valid URL');
		return false;
	}

	return true;
}