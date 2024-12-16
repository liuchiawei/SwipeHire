// Fetch data from the JSON file and load cards
function loadCardData() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      loadCards(data);
    })
    .catch((error) => {
      console.error("Error fetching the data:", error);
    });
}

function loadCards(cardData) {
  const cardContainer = document.getElementById("card-container");

  // Clear existing cards
  cardContainer.innerHTML = "";

  // Loop through the card data and create HTML elements
  cardData.forEach((profile, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.backgroundImage = `url(${profile.image})`;

    // Card content (name, location, crime, description)
    card.innerHTML = `
            <div class="card-content">
                <h2>${profile.name} <span>￥${profile.salary_min}万 ー ${profile.salary_max}万</span></h2>
                <p>${profile.location}</p>
                <p>${profile.crime}</p>
            </div>
        `;

    // Attach a dataset with profile index to the card for reference
    card.dataset.index = index;

    // Append the card to the container
    cardContainer.appendChild(card);
  });

  // Once the cards are loaded, add swipe functionality
  addSwipeFunctionality(cardData);
}

function addSwipeFunctionality(cardData) {
  const cards = document.querySelectorAll(".card");
  const dialog = document.getElementById("dialog");
  const leftBtn = document.getElementById("left-button");
  const rightBtn = document.getElementById("right-button");

  let currentCard;
  let profileIndex;

  // Initialize swiping functionality for each card
  cards.forEach((card) => {
    card.addEventListener("mousedown", handleDragStart);
    card.addEventListener("touchstart", handleDragStart);

    card.addEventListener("mousemove", handleDragMove);
    card.addEventListener("touchmove", handleDragMove);

    card.addEventListener("mouseup", handleDragEnd);
    card.addEventListener("touchend", handleDragEnd);
  });

  function handleDragStart(e) {
    currentCard = e.target.closest(".card"); // Get the card element
    startX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    currentCard.style.transition = "none";

    // Get the index of the profile from the card's dataset
    profileIndex = currentCard.dataset.index;
  }

  function handleDragMove(e) {
    if (!currentCard) return;

    const currentX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const deltaX = currentX - startX;

    currentCard.style.transform = `translateX(${deltaX}px) rotate(${
      deltaX * 0.1
    }deg)`;
  }

  function handleDragEnd(e) {
    if (!currentCard) return;

    const currentX =
      e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
    const deltaX = currentX - startX;

    const moveOutWidth = document.body.clientWidth;

    if (deltaX > 100) {
      // Swiped to the right
      currentCard.style.transition = "transform 0.3s ease-out";
      currentCard.style.transform = `translateX(${moveOutWidth}px) rotate(40deg)`;

      setTimeout(() => {
        currentCard.remove();
        showDialog(cardData[profileIndex]); // Pass the current card's data to the dialog
      }, 300);
    } else if (deltaX < -100) {
      // Swiped to the left
      currentCard.style.transition = "transform 0.3s ease";
      currentCard.style.transform = `translateX(-${moveOutWidth}px) rotate(-40deg)`;

      setTimeout(() => {
        currentCard.remove(); // Simply remove the card on left swipe
      }, 500);
    } else {
      currentCard.style.transition = "transform 0.2s ease";
      currentCard.style.transform = `translateX(0px) rotate(0deg)`;
    }
  }

  function showDialog(profile) {
    // Set dialog content to match the swiped card's data
    document.getElementById(
      "dialog-name"
    ).textContent = `${profile.name} ,${profile.age}`;
    document.getElementById("dialog-location").textContent = profile.location;
    document.getElementById("dialog-crime").textContent = profile.crime;
    document.getElementById(
      "dialog-ageheight"
    ).textContent = `${profile.height}`;
    document.getElementById("dialog-description").textContent =
      profile.description;
    document.getElementById(
      "dialog-img"
    ).style.backgroundImage = `url(${profile.image})`;

    // Show the dialog
    dialog.style.display = "block";
  }

  // Close the dialog when the close button is clicked
  document.getElementById("close-btn").addEventListener("click", function () {
    dialog.style.display = "none";
  });

  // Function to create button listeners (left and right swipes)
  function createButtonListener(isRightSwipe) {
    return function (event) {
      const cards = document.querySelectorAll(".card"); // Get all the cards
      const currentCard = cards[cards.length - 1]; // Select the topmost card

      if (!currentCard) return; // If no card exists, exit

      profileIndex = currentCard.dataset.index; // Get the profile index from the card's dataset

      const moveOutWidth = document.body.clientWidth * 1; // Move the card far off-screen

      // Perform swipe based on the button clicked (left or right)
      if (isRightSwipe) {
        currentCard.style.transform = `translateX(${moveOutWidth}px) rotate(40deg)`;
        setTimeout(() => {
          currentCard.remove(); // Remove the card after swipe
          showDialog(cardData[profileIndex]); // Show the dialog on right swipe
        }, 500);
      } else {
        currentCard.style.transform = `translateX(-${moveOutWidth}px) rotate(-40deg)`;
        setTimeout(() => {
          currentCard.remove(); // Remove the card after left swipe
        }, 500);
      }

      event.preventDefault(); // Prevent default button behavior
    };
  }

  // Attach the button listeners
  leftBtn.addEventListener("click", createButtonListener(false)); // Swipe left on left button click
  rightBtn.addEventListener("click", createButtonListener(true)); // Swipe right on right button click
}

// Event listener for the refresh button
document
  .getElementById("refresh-button")
  .addEventListener("click", function () {
    loadCardData(); // Reload the card data
  });

// Load the initial cards when the page loads
window.onload = loadCardData;

// End
