let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys();
})

const toyCollection = document.querySelector("#toy-collection")
const toyApi = "http://localhost:3000/toys"
const form = document.querySelector(".add-toy-form")

// FETCH ALL TOYS FROM API
function fetchToys() {
  fetch(toyApi) 
  .then(response => response.json())
  .then(toys => {
    toys.forEach(showToy)
  })
}

// GRAB ALL TOYS AND RENDER THEM ON PAGE and like button
function showToy(toy) {

  let card = document.createElement("div")
  card.setAttribute("class", "card")
  card.setAttribute("toy-id", toy.id)

  let h2 = document.createElement("h2")
  h2.innerText = toy.name

  let image = document.createElement("img")
  image.setAttribute("class", "toy-avatar")
  image.src = toy.image

  let p = document.createElement("p")
  p.innerText = `${toy.likes} likes`

  let button = document.createElement("button")
  button.setAttribute("class", "like-btn")
  button.innerText = "like <3"

  // Like Button 
  button.addEventListener("click", e => {
    const toyId = toy.id
    let toyLikes = toy.likes
    ++toyLikes

    fetch(`${toyApi}/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ likes: toyLikes })
    })
    p.innerText = `${toyLikes} likes`
  })

  card.append(h2, image, p, button)
  toyCollection.append(card)
}

// LISTEN FOR SUBMIT BUTTON TO CREATE NEW TOY
form.addEventListener("submit", e => {
  e.preventDefault();
  createToy(e.target.name.value, e.target.image.value)
}) 

// ADD NEW TOY TO BACK-END
function createToy(name, image) {
  fetch(toyApi, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name: name, image: image, likes: 0})
  })
  .then(resp => resp.json())
  .then(showToy)
  .catch(console.log)
  }

