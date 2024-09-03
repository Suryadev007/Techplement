const quoteElement = document.getElementById("quote-cont");
const quoteAutor = document.getElementById("author");
const slider = document.getElementById("slider");

// function to fetch quote randomly using api
const randomQuote = async () => {
  try {
    const response = await fetch("https://api.quotable.io/quotes/random");
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    quoteElement.innerHTML = `<h1 class="mb-5">Quote of the day !!!! </h1>
    <blockquote class="text-center text-white blockquote">
        <i class="fa-solid fa-quote-left"></i>
        <span id="quote" class="mx-2">${data[0].content}</span
        ><i class="fa-solid fa-quote-right"></i>
    </blockquote>
    <h2>- <span id="author" class="ms-1">${data[0].author}</span></h2>`;
  } catch (error) {
    quoteElement.innerText = "Error";
    quoteAutor.innerText = "";
  }
};

// function to fetch quote by the author name using api
const serchQuote = async (e) => {
  e.preventDefault();
  const searchAuthor = document.getElementById("search");
  const authorName = searchAuthor.value.trim();
  if (authorName.length === 0) {
    alert("Enter Author Name");
    return;
  }

  const uri = `https://api.quotable.io/quotes?author=${encodeURIComponent(
    authorName
  )}`;
  try {
    const response = await fetch(uri);
    const data = await response.json();
    let temp = ` <div id="carouselExample" class="text-center px-5 carousel slide">
                      <div class="carousel-inner" id="slider">
                        <div class="carousel-item active w-100">
                      <blockquote class="text-center text-white blockquote w-100">
                    <i class="fa-solid fa-quote-left"></i>
                    <span id="quote" class="mx-2">${data.results[0].content}</span>
                    <i class="fa-solid fa-quote-right"></i>
                  </blockquote>
                  <h2>- <span id="author" class="ms-1">${data.results[0].author}</span></h2>
              </div>`;

    for (let i = 1; i < data.count; i++) {
      temp += `<div class="carousel-item w-100">
                  <blockquote class="text-center text-white blockquote w-100">
                    <i class="fa-solid fa-quote-left"></i>
                    <span id="quote" class="mx-2">${data.results[i].content}</span>
                    <i class="fa-solid fa-quote-right"></i>
                  </blockquote>
                  <h2>- <span id="author" class="ms-1">${data.results[i].author}</span></h2>
              </div>`;
    }
    temp += `</div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`;
    quoteElement.innerHTML = temp;
  } catch (error) {
    alert("Auhor not found");
  }
  searchAuthor.value = "";
};

document.addEventListener("DOMContentLoaded", randomQuote); // display quote randomly
document.getElementById("search-bar").addEventListener("submit", serchQuote); // display quotes by user search author name
