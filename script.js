const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");

const singleMeal = document.getElementById("single-meal");

function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      console.log(meal)

      addMealToDOM(meal);
    });
}


function addMealToDOM(meal)
{
  const ingredients =[];

 

  for(let i =1 ; i<=20; i++)
  {
    if(meal[`strIngredient${i}`])
    {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
      console.log(ingredients);
    }
    else{
      break; 
    }
  } 
  singleMeal.innerHTML= `<div class ="single-meal">
  <h1>${meal.strMeal}</h1>
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
  <div class = 'single-meal-info'>
  ${meal.strcategory ? `<p>${meal.strCategory}</p>` : ``}
  ${meal.strCategory ? `<p>${meal.strArea }</p>` : ``}
  </div>
  <div class = 'main'>
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>
    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
    </ul>
  </div>
  </div>`
}

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
          mealEl.innerHTML = data.meals
            .map(
              (meal) => `<div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMealThumb}"/>
            <div class ="meal-info" data-mealID = "${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
            </div>
            </div>`
            )
            .join("");
        }
      });
    search.value = "";
  } else {
    alert("please Enter an serach term");
  }
}

submit.addEventListener("submit", searchMeal);

mealEl.addEventListener("click", (e) => {
  const mealInfo = e.composedPath().find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealID");
    console.log(mealId);
    getMealById(mealId);
  }
});

// `<div class='meal'>
// <img src="${meal.strMealThumb}" alt="${meal.strMealThumb}"/>
// <div class="meal-info" data-mealId="${meal.idMeal}">
// <h3>${meal.strMeal}</h3>
// </div>
// </div>`
