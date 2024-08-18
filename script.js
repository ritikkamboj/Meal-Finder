const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");


console.log(mealEl);
const singleMeal = document.getElementById("single-meal");

function searchMeal(e) {
  e.preventDefault();
  singleMeal.innerHTML = "";

  const term = search.value;

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.meals);
        resultHeading.innerHTML = `<h2>Results for the '${term}':</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<p>Results are not availaible for the term enter. Try Again !</p>`;
        } else {
          mealEl.innerHTML = data.meals.map(
            (meal) => `<div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMealThumb}"/>
            <div class ="meal-info">
            
            <p>${meal.strMeal}</p>
            </div>
            
            </div>`
          ).join('');
        }
      });
    search.value = "";
  } else {
    alert("please Enter an serach term");
  }
}

submit.addEventListener("submit", searchMeal);

// `<div class='meal'>
// <img src="${meal.strMealThumb}" alt="${meal.strMealThumb}"/>
// <div class="meal-info" data-mealId="${meal.idMeal}">
// <h3>${meal.strMeal}</h3>
// </div>
// </div>`
