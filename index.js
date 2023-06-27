const menuItem = document.querySelector('#menu-items')
//this is being globally scoped so we can use later on
//this is selecting the menu items id in html
const dishDescription = document.querySelector('#dish-description')
const dishImage = document.querySelector('#dish-image')
const dishName = document.querySelector('#dish-name')
const dishPrice = document.querySelector('#dish-price')
const addToCart = document.querySelector('#cart-form')
const numberInCart = document.querySelector('#number-in-cart')



document.addEventListener("DOMContentLoaded", () => fetchData())
//i created a function called fetch data for my get request to make things look cleaner

addToCart.addEventListener("submit", (e)=> {
    e.preventDefault();
    // console.log(e.target["cart-amount"].value);
    addItemToCart(e.target["cart-amount"].value);
})

function fetchData(){
fetch(' http://localhost:3000/menu')
//this is fetching the data from the db.json file
.then(res => res.json())
//this is taking the response we fetched and is turning it into something we can read
.then(data => {
    //this is taking the data that has been turned into json (that we can now read)
    data.forEach((nameOfItem) => {
        //i am taking the data and for each piece of data, i am passing the name of the item through it.
        displayMenuItem(nameOfItem)
        //now i am passing the displayMenuItem function the name of the item
    })
    showDetails(data[0])
})
  
}

function displayMenuItem(nameOfItem){
    //the displayMenuItem is taking the name of the item
    // console.log(nameOfItem)
    let name = document.createElement('span')
    //i am creating a variable "name" that will create a new span element
    name.textContent = nameOfItem.name
    //with the name variable that's creating a new span element, i am updating the text content with the name of the item from the db.json

    name.addEventListener('click', ()=> {
        showDetails(nameOfItem)
    })

    // console.log(numberInCart.textContent = `Number in Cart ${nameOfItem.number_in_bag}`)

    menuItem.appendChild(name)
    //now i need to append it so it shows on the page - i am using the global variable menuItem, which is the id I selected and where I am want the name of menu items to go. I am appending to that node the name that I have just updated above.
}

function showDetails(nameOfItem){
    dishDescription.textContent = nameOfItem.description
    dishImage.src = nameOfItem.image
    dishName.textContent = nameOfItem.name
    dishPrice.textContent = nameOfItem.price
}

// add menu items to the cart
//when i click the button, the number should update
function addItemToCart(numberToAdd){
    numberInCart.innerHTML = parseInt(numberInCart.innerHTML) + parseInt(numberToAdd);
}
