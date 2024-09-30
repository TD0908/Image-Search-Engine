const accessKey = "c69z-1waDs_BFpAhBHUG-ooAanbUTl2TE9z8SfNjdYs";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showmorebtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

// Get the header element
const header = document.querySelector('header');

// Function to search and display images
async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=16`;

    // Fetch images from Unsplash API
    const response = await fetch(url);
    const data = await response.json();
    
    // Clear previous results if it's the first page
    if(page === 1){
        searchResult.innerHTML = "";
    }
    
    const results = data.results;

    // Create and append image elements to the search result
    results.map((result) =>{
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.hred = result.links.html; // Note: There's a typo here, should be 'href'
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })

    // Show the "Show more" button
    showmorebtn.style.display = "block";
}

// Event listener for form submission
searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    page = 1;
    searchImages();
})

// Event listener for "Show more" button
showmorebtn.addEventListener("click", ()=>{
    page++;
    searchImages();
})

// Event listener for header click to reload the page
header.addEventListener('click', () => {
    location.reload();
});