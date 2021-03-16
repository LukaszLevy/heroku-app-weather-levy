const prepareData = function (cityName) {
    cityName = cityName.trim().toUpperCase();
    let add = $(`#add-area`).children();
    let addCol = [];
    function prepare_city_name() {
      addCol = [];
      for (i = 0; i < add.length; i++) {
        let thisTxt = $(add[i]).find(".c-txt").text().trim().toUpperCase();
        addCol.push(thisTxt);
      }
      const found = addCol.find((element) => element === cityName);
      if (found != undefined) {
        return false;
      } else {
        return true;
      }
    }
    function checker(el) {
      if (el === false) {
        myAlert("Podana miejscowość znajduję się na liście");
      } else {
        getData("/w", cityName); // wywołanie funkcji get data
      }
    }
    if (cityName != "") {
      if (add.length <= 4) {
        checker(prepare_city_name(cityName));
      } else {
        myAlert("Przekroczono maksymalną liczbę miejscowości na liście");
      }
    } else {
      myAlert(`Wpisz nazwę miejscowości`);
    }
  };
  
  //funkcja wyslij zapytanie i odbierz dane ze strony dostawcy pogody
  function getData(url, cityName) {
    const request = $.ajax({
      url: url,
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: { city: encodeURIComponent(cityName) },
      type: "GET",
    })
    .done((dt)=>{
        fetchData(dt);
    }).fail(function (error) {
      myAlert(`Sprawdź podane dane ( ${error.statusText}: ${error.status} ) !`);
    });
  }
  
  // funkcja wykonanie czynnosci po odebraniu danych ze strony dostawcy pogody
  function fetchData(weather) {
    $("#add-area").append(createNewWeatherBlock(weather));
    new_weather_block_animate();
    scroll_to_added_element();
    temp_indicator($(".temp-indicator"), null, weather.main.temp);
    pres_indicator($(".pres-anime-box"), null, weather.main.pressure);
    wind_indicator($(".wind-anime-box"), null, weather.wind.speed);
  }
  
  // dzialnie apilkacji - akcje, eventy
  $(document).ready(function () {
    // eventy
    $(".metric-b").on({
      click: () => {
        prepareData($(cityNameIn).val());
        document.activeElement.blur();
        clearInput();
        remove_block_weather();
        refresh_weather_block();
        change_city();
        change_wall_size();
      },
    });
    $("#location-img").on("click", () => {
      find_me();
    });
    $(document).on("click", function (e) {
      if (
        $(e.target).attr("class") != "new-in-box" &&
        $(e.target).attr("class") != "okx-box" &&
        $(e.target).attr("class") != "city-name-replace" &&
        $(e.target).attr("class") != "okx-1" &&
        $(e.target).attr("class") != "okx-2" &&
        $(e.target).attr("class") != "change"
      ) {
        $(".new-in-box").slideUp(500);
        setTimeout(() => {
          $(".new-in-box").remove();
        }, 300);
      }
    });
    enter(cityNameIn, $(".metric-b"));
    // funkcje
    find_me();


    // sprawdzenie poprawnosci wpisywanego tekstu
  $("#city-name").keyup(function(e) {
    var regex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ -]+$/;
    if (regex.test(this.value) !== true)
    myAlert("W to pole możesz wpisywać tylko litery.");
    this.value = this.value.replace(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ -]+/, '');
  });
  
  $('#city-name').on("paste",function(e) {
    e.preventDefault();
  });

  

}); // document.ready function koniec
  
  