"use strict";

let carInventory = require('./carLot'),
  eventStuff = require('./events'),

  /////////////////////////////////////////////////////////////////////////////
  //                PULL IN HANDLEBARS LIBRARY
  /////////////////////////////////////////////////////////////////////////////
  Handlebars = require('hbsfy/runtime'),

  /////////////////////////////////////////////////////////////////////////////
  //  CREATE A FOLDER CALLED TEMPLATES in the root of your project and car-grid.hbs file, add code below to link it
  /////////////////////////////////////////////////////////////////////////////
  carTemplate = require('../templates/car-grid.hbs');


function populatePage(inventory) {
  // Grab the div we want to apppend the cards to
  let cards = document.getElementById("inventory-cards");
  let cardDiv = document.createElement("div");

  /////////////////////////////////////////////////////////////////////////////
  //  push the .hbs file to the innerHTML
  /////////////////////////////////////////////////////////////////////////////
  cardDiv.innerHTML = (carTemplate(inventory));

  cards.appendChild(cardDiv);


// Now that the DOM is loaded, establish all the event listeners needed
eventStuff();
}


// The Promises Way puts the callback responsibility on the caller
carInventory.loadInventory()
  .then(
    function(inventoryFromLoadInventoryResolve) {
      populatePage(inventoryFromLoadInventoryResolve);
      console.log("carPromise", inventoryFromLoadInventoryResolve);
      console.log({ inventoryFromLoadInventoryResolve });


    },
    function(reason) {
      console.error('Something went wrong', reason);
    });
