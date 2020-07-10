$(document).ready(function () {

  $(document).keypress(
      function (event) {
          if (event.which == '13') {
              event.preventDefault();
          }
      }
  );
  const m = moment();
  console.log(moment());
  console.log(m.format('l'));

  var APIKey = "cc9fff0963820013f04ae242ba4d2951";
  var city = $("#search").val();


  if (localStorage.getItem("Cities") === null) {
      var cities = [];
      var oldCities = [];
      localStorage.setItem("Cities", JSON.stringify(cities, oldCities));

  } else {
      var oldCities = JSON.parse(localStorage.getItem("Cities"));
      oldCities.forEach(city => {
          var newBtn = $(`<button type="button" class="btn btn-primary cityButtons"></button>`);
          newBtn.text(city);
          newBtn.appendTo(cityBtns);
      })

  }

  $("#search").keyup(function(){
      if (event.key === "Enter"){
          console.log("enter")
          getUserInput();
      }
  })
  // give search buttons click function to:
  $("#searchBtn").on("click", function () {

      getUserInput();

  });

  function getUserInput(){
      city = $("#search").val().trim() ;
      console.log(city);
      $("#search").val(""); //clear input field
      if (city === ""){ //if empty don't run
          return;
      }
      var oldCities = JSON.parse(localStorage.getItem("Cities"));
      if(oldCities.indexOf(city) === -1){
          var newBtn = $(`<button type="button" class="btn btn-primary cityButtons" id=${city}></button>`);

          newBtn.text(city);
          newBtn.appendTo(cityBtns);
  
          console.log(city);
  
          var cities = [];
  
          console.log(cities);
  
          cities.push(city);
          localStorage.setItem("Cities", JSON.stringify([...oldCities, ...cities]));
      } 
          
      

      
      generateInfo();
  }


});