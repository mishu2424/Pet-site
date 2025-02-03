let flag = 0;
let imgArr = [];
let sortedData = [];
// let countdownValue = 3;
const fetchButtons = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  displayButtons(data.categories);
};

const displayButtons = (data) => {
  const buttonsContainer = document.querySelector("#dynamicBtns");
  data.forEach((element) => {
    const a = document.createElement("a");
    a.classList.add(
      "btn",
      "w-fit",
      "h-fit",
      "lg:px-16",
      "lg:py-4",
      "flex",
      "items-center",
      "gap-3",
      "bg-transparent",
      "dynamicBtn"
    );
    a.setAttribute("onclick", `displaySingleData('${element?.category}')`);
    a.id = `category-btn-${element?.category}`;
    a.innerHTML = `
        <img src="${element.category_icon}" class="w-8">
        <span>${element.category}</span>
        `;
    buttonsContainer.appendChild(a);
  });
};

const fetchData = async () => {
  loadingSpinner(true);
  borderEdit(false);
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  displayDataOnUI(data.pets);
};

const displayDataOnUI = (data) => {
  const parentContainer = document.querySelector("#pet-container");
  parentContainer.innerHTML = "";
  setTimeout(() => {
    if (!data.length) {
      parentContainer.classList.remove("grid");
      parentContainer.classList.add(
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "p-6"
      );
      parentContainer.innerHTML = `
        <img src="./images/error.webp">
        <h2 class="text-xl font-bold">No Information Available</h2>
        `;
      loadingSpinner(false);
      return;
    }
    if (data.length) {
      if (!parentContainer.classList.contains("grid")) {
        parentContainer.classList.add("grid");
        if (
          parentContainer.classList.contains(
            "flex",
            "flex-col",
            "items-center",
            "justify-center",
            "p-6"
          )
        ) {
          parentContainer.classList.remove(
            "flex",
            "flex-col",
            "items-center",
            "justify-center",
            "p-6"
          );
        }
      }
    }
    data.forEach((det) => {
      const petCard = document.createElement("div");
      petCard.classList.add("p-2", "rounded-md", "border", "space-y-3");
      petCard.innerHTML = `
        
        <img class="rounded-md object-cover h-40 w-full" src="${
          det.image
        }" alt="">
        <div class="pet-infos space-y-2">
            <h3 class="text-base font-extrabold">${det?.pet_name}</h3>
            <p class="text-xs opacity-80 font-semibold flex items-center gap-1"><img src="./images/Frame.png" alt="">Breed: ${
              det?.breed ?? "Not available"
            }</p>
            <p class="text-xs opacity-80 font-semibold flex items-center gap-1"><img src="./images/birthFrame.png" alt="">Birth: ${
              det?.date_of_birth ?? "Not available"
            }</p>
            <p class="text-xs opacity-80 font-semibold flex items-center gap-1"><img src="./images/genderFrame.png" alt="">Gender: ${
              det?.gender ?? "Not available"
            }</p>
            <p class="text-xs opacity-80 font-semibold flex items-center gap-1"><img src="./images/priceFrame.png" alt="">Price: ${
              det?.price ?? "Not available"
            }</p>
        </div>
        <hr>
        <div id="pet-btns" class="flex items-center justify-between">
            <a onclick="displayPetPictures(${
              det?.petId
            },'animalPictures')" class="btn bg-transparent">
              <svg id="pet-btn-${
                det?.petId
              }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                  <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
              </svg>
              </a>
            <a id="adopt-btn-${det?.petId}" onclick="adoption('${det?.petId}')" class="btn bg-transparent text-[#0E7A81]">Adopt</a>
            <a onclick="displayPetPictures('${
              det?.petId
            }','details')" class="btn bg-transparent text-[#0E7A81]">Details</a>
        </div>`;
      parentContainer.appendChild(petCard);
      loadingSpinner(false);
      borderEdit(true);
    });
    //   for sorting
    sortData(data);
  }, 2000);
};

const displaySingleData = async (categoryName) => {
  const dynamicBtns = document.querySelectorAll(".dynamicBtn");
  dynamicBtns.forEach((btn) => {
    btn.classList.add("bg-transparent");
    btn.classList.remove(
      "border-[#0E7A81]",
      "rounded-full",
      "bg-[#0E7A81]",
      "bg-opacity-20"
    );
  });
  const activeBtn = document.querySelector(`#category-btn-${categoryName}`);
  activeBtn.classList.remove("bg-transparent");
  activeBtn.classList.add(
    "border-[#0E7A81]",
    "rounded-full",
    "bg-[#0E7A81]",
    "bg-opacity-20"
  );
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  );
  const data = await res.json();
  // console.log(data.data)
  loadingSpinner(true);
  borderEdit(false);
  displayDataOnUI(data.data);
};

const displayPetPictures = async (id, status) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await res.json();
  if (status === "animalPictures") {
    sendPicturesOnUI(data.petData);
  } else if (status === "details") {
    displayDetails(data.petData);
  }
};

const sendPicturesOnUI = (data) => {
  const parentContainer = document.querySelector("#pet-pictures");
  parentContainer.innerHTML = "";
  const activeLike = document.querySelector(`#pet-btn-${data?.petId}`);
  //   console.log(imgArr)
  //   console.log(!imgArr.includes(data?.image))
  if (!imgArr.includes(data?.image)) {
    imgArr.push(data?.image);
    // console.log(imgArr)
    activeLike.classList.add("text-[#0E7A81]");
  } else if (imgArr.includes(data?.image)) {
    let index = imgArr.indexOf(data?.image);

    // If the element exists in the array (index >= 0)
    if (index !== -1) {
      // Use splice to remove the element at that index
      imgArr.splice(index, 1);
    }
    console.log(imgArr);
    activeLike.classList.remove("text-[#0E7A81]");
  }
  //   console.log(imgArr.length)
  imgArr.forEach((img) => {
    const childPet = document.createElement("div");
    childPet.innerHTML = `
    <img class="rounded-md object-cover object-center lg:h-20 w-full" src="${img}">
    `;
    parentContainer.appendChild(childPet);
  });
};

const displayDetails = (data) => {
  document.querySelector("#customModal").showModal();
  const modalContainer = document.querySelector("#modal-container");
  modalContainer.classList.add("space-y-1");
  modalContainer.innerHTML = `
    <img class="w-full object-cover rounded-lg" src="${data?.image}">
    <h3 class="text-xl font-extrabold">${data?.pet_name}</h3>
    <div class="pet-infos flex gap-5">
        <div class="btn-group-1 space-y-2">
            <p class="text-xs opacity-80 font-semibold flex items-center gap-1"><img src="./images/Frame.png" alt="">Breed: ${data?.breed}</p>
            <p class="text-xs opacity-80 font-semibold flex items-center gap-1"><img src="./images/genderFrame.png" alt="">Gender: ${data?.gender}</p>
            <p class="text-xs opacity-80 font-semibold flex items-center gap-1"><img src="./images/genderFrame.png" alt="">Gender: ${data?.vaccinated_status}</p>
        </div>
        <div class="btn-group-2 space-y-2">
            <p class="text-xs opacity-80 font-semibold flex items-center gap-1"><img src="./images/birthFrame.png" alt="">Birth: ${data?.date_of_birth}</p>
            <p class="text-xs opacity-80 font-semibold flex items-center gap-1"><img src="./images/priceFrame.png" alt="">Price: ${data?.price}</p>
        </div>
    </div>
    <hr>
    <h3 class="text-base font-extrabold">Details</h3>
    <p class="text-xs">${data?.pet_details}</p>
    `;
};

const sortData = (data) => {
  sortedData = data;
  // console.log(sortedData);
  sortedData.sort((a, b) => {
    return b.price - a.price;
  });
  // console.log(sortedData);
};

const adoption = (id) => {
    const modalContainer = document.querySelector("#modal-container2");
    const modalElement = document.querySelector("#customModal2");
    const adoptedBtn=document.querySelector(`#adopt-btn-${id}`);
    // console.log(adoptedBtn);
    let countdownValue = 3;
  
    // Initially show the modal
    // modalElement.showModal();
  
    const interval = setInterval(() => {
        modalElement.showModal();
      modalContainer.style.setProperty("--value", countdownValue);
      countdownValue--;
  
      if (countdownValue < 0) {
        clearInterval(interval);
        // Reset the countdown value
        modalContainer.style.setProperty("--value", 3);
  
        // Optionally hide the modal after the click action
        modalElement.close();  // This closes the modal, instead of using the hidden class
        adoptedBtn.setAttribute("Disabled",true);
        adoptedBtn.innerText="Adopted";
      }
    }, 1000);
  };
  
// loadingSpinner
const loadingSpinner = (isLoading) => {
  const spinner = document.querySelector("#loading-spinner");
  if (spinner) {
    if (isLoading) {
      spinner.classList.remove("hidden");
    } else if (isLoading === false) {
      spinner.classList.add("hidden");
    }
  }
};

const borderEdit = (isBorder) => {
  if (isBorder) {
    document.querySelector("#pet-pictures").classList.add("border");
  } else {
    document.querySelector("#pet-pictures").classList.remove("border");
  }
};

document.querySelector("#sortBtn").addEventListener("click", () => {
  loadingSpinner(true);
  displayDataOnUI(sortedData);
});
fetchButtons();
fetchData();
