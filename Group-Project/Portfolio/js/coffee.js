"use strict";

function renderCoffee(coffee) {
    var html = '<div class="coffee">';
    html += '<h3>' + coffee.name +'</h3> ';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';
    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        } else if (selectedRoast === "all") {
            filteredCoffees.push(coffee);
        }
    });
    coffeeList.innerHTML = renderCoffees(filteredCoffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var coffeeList = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var coffeeSearch = document.querySelector('#coffeeSearch');
var newCoffee = document.getElementById('new-coffee');


coffeeList.innerHTML = renderCoffees(coffees);
submitButton.addEventListener('click', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);
coffeeSearch.addEventListener('keyup', foundCoffee);
newCoffee.addEventListener('click', addCoffee);


//function receive an array and a substring and look in every array element for a coincidence

function foundCoffee(e) {
    var matches=[];
    var coincidence = coffeeSearch.value.toUpperCase();
    for(var i=0;i<coffees.length;i++) {
        if(coffees[i].name.toUpperCase().indexOf(coincidence)!==-1){
            matches.push(coffees[i]);
        }
    }
    coffeeList.innerHTML = renderCoffees(matches);
}

function addCoffee(e) {
    e.preventDefault();
    var coffeeName = document.querySelector("#newName").value;
    var addRoast = document.querySelector("#add-coffee").value;
    var newCoffeeObject = {
        id: coffees.length+1,
        name: coffeeName,
        roast: addRoast
    };
    coffees.push(newCoffeeObject);
    coffeeList.innerHTML = renderCoffees(coffees);
}
