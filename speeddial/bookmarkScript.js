// Get the bookmarks from local storage or initialize an empty array
const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

// Function to save bookmarks to local storage
function saveBookmarks() {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Function to handle bookmark submission
function handleBookmarkSubmit(event) {
  event.preventDefault();

  // Get the bookmark details from the form
  const bookmarkName = document.getElementById('bookmarkName').value;
  const bookmarkUrl = document.getElementById('bookmarkUrl').value;

  // Create a new bookmark object
  const bookmark = {
    name: bookmarkName,
    url: bookmarkUrl,
  };

  // Add the bookmark to the bookmarks array
  bookmarks.push(bookmark);

  // Save the bookmarks to local storage
  saveBookmarks();

  // Clear the form fields
  document.getElementById('bookmarkName').value = '';
  document.getElementById('bookmarkUrl').value = '';

  // Display the updated bookmarks
  displayBookmarks();
}

// Function to generate a random background color
function getRandomColor() {
  const colors = ['#FFC107', '#03A9F4', '#4CAF50', '#E91E63', '#9C27B0'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// Function to display bookmarks
function displayBookmarks() {
  const bookmarksContainer = document.getElementById('bookmarksContainer');

  // Clear the existing bookmarks
  bookmarksContainer.innerHTML = '';

  // Loop through the bookmarks array and create HTML elements for each bookmark
  bookmarks.forEach((bookmark) => {
    const bookmarkLink = document.createElement('a');
    bookmarkLink.href = bookmark.url;
    bookmarkLink.target = '_blank';

    const bookmarkItem = document.createElement('div');
    bookmarkItem.classList.add('bookmark-item');
    bookmarkItem.style.backgroundColor = getRandomColor();

    const bookmarkName = document.createElement('span');
    bookmarkName.classList.add('bookmark-name');
    bookmarkName.textContent = bookmark.name;

    bookmarkItem.appendChild(bookmarkName);
    bookmarkLink.appendChild(bookmarkItem);
    bookmarksContainer.appendChild(bookmarkLink);
  });
}

// Event listener for form submission
document.getElementById('bookmarkForm').addEventListener('submit', handleBookmarkSubmit);

// Call the init function when the script is loaded
displayBookmarks();