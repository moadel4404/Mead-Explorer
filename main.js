var categories = document.querySelector("select");
var mealsContainer = document.querySelector(".meals-container");


// call the Categories
var categoriesFromJson = new XMLHttpRequest();
categoriesFromJson.open("GET", "https://www.themealdb.com/api/json/v1/1/categories.php");
categoriesFromJson.send();

categoriesFromJson.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    var mealsCat = JSON.parse(this.responseText);
    console.log(mealsCat);
    for (var i = 0; i < mealsCat["categories"].length; i++) {
      var category = `<option value="${mealsCat["categories"][i].strCategory}">${mealsCat["categories"][i].strCategory}</option>`;
      categories.insertAdjacentHTML("beforeend", category);
    }
    

    // initial preview of the frist category (default selected) After Load

    var mealsFromJson = new XMLHttpRequest();
    mealsFromJson.open("GET", `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories.value}`);
    mealsFromJson.send();
    mealsFromJson.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var meals = JSON.parse(this.responseText);
        console.log(meals.meals[0].strMeal);
        console.log(meals.meals[0].strMealThumb);
        for (var i = 0; i<meals.meals.length; i++) {
          var mealCard = `
<div class="meal-card">
  <img src="${meals.meals[i].strMealThumb}" alt="meal">
  <h3>${meals.meals[i].strMeal}</h3>
</div>`
          mealsContainer.insertAdjacentHTML("beforeend", mealCard);
        }
      }
    }


  }
};

// preview when the category has been changed

categories.addEventListener("change", function (e) {
  mealsContainer.innerHTML = "";
  console.log(this.value);
  var mealsFromJson = new XMLHttpRequest();
  mealsFromJson.open("GET", `https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.value}`);
  mealsFromJson.send();
  mealsFromJson.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var meals = JSON.parse(this.responseText);
      for (var i = 0; i<meals.meals.length; i++) {
        var mealCard = `
<div class="meal-card">
<img src="${meals.meals[i].strMealThumb}" alt="meal">
<h3>${meals.meals[i].strMeal}</h3>
</div>`
        mealsContainer.insertAdjacentHTML("beforeend", mealCard);
      }
    }
  }
});

