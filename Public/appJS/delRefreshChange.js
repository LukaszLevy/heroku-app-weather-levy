// funkcja usun blok pogodowy po nacisnieciu "usun"
const remove_block_weather = () => {
  setTimeout(() => {
    let deleteCollection = $(".delete");
    $(deleteCollection).each(function () {
      $(this).on({
        click: (e) => {
          e.stopPropagation();
          e.stopImmediatePropagation();
          let currentWeatherBlock = $(this).parent().parent(); //aktualny weather block, skrot cwblet
          $(currentWeatherBlock).remove();
          change_wall_size();
        },
      });
    });
  }, 700);
};

// // refresh function
let tab = [];
const refresh_weather_block = function () {
  setTimeout(function () {
    let refreshCollection = $(".refresh");
      $(refreshCollection).on({
        click: function () {
          let actCity = $(this).parent().parent().find('.c-txt').text();
          get_refresh_data('/w', actCity);
          set_actual_data_and_format_style($(this).parent().parent());
        },
        mouseover: function(){
          $(this).addClass('refreshHover');
        },
        mouseleave: function(){
          $(this).removeClass('refreshHover');
        },
      });
    
  }, 700);
};

function get_refresh_data(url, cityName) {
  const request = $.ajax({
    url: url,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: { city: encodeURIComponent(cityName) },
    type: "GET",
  });
  request.done(function (response) {
    tab = [];
    let format_data = objectFromData(response);
    tab.push(format_data);
  });
  request.fail(function (error) {
    myAlert(`Sprawdź podane dane ( ${error.statusText}: ${error.status} ) !`);
  });
}

// // funkcja change city
const change_city = function () {
  setTimeout(() => {
    let changeCollection = $(".change");
    $(changeCollection).on({
      click: function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        create_change_box_search($(this));
        $(".city-name-replace").keyup(function(e) {
          var regex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ -]+$/;
          if (regex.test(this.value) !== true)
          myAlert("W to pole możesz wpisywać tylko litery.");
          this.value = this.value.replace(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ -]+/, '');
        });
        
        $('.city-name-replace').on("paste",function(e) {
          e.preventDefault();
        });
        delete_new_box_search($(this).siblings(".new-in-box").find(".okx-2"));
        serwer_change($(this).siblings(".new-in-box").find(".okx-1"));
        enter(".city-name-replace", $(".city-name-replace").siblings(".okx-1"));
      },
    });
  }, 700);
};

function create_change_box_search(ths) {
  let cur = $(ths).parent();
  let newInput = 
    `<div class='new-in-box' style="display: none">
      <div class='okx-box'>
        <input type="text" title="Podaj miejscowość" class="city-name-replace" value="" oncontextmenu="return false"/>
        <div class='okx-1'>ok</div>
        <div class='okx-2'>x</div>
      </div>
    </div>`;
  $(cur).append(newInput);
  setTimeout(() => {
    $(cur).children(".new-in-box").slideDown(500);
    $(".city-name-replace").focus();
  }, 300);
}

function delete_new_box_search(el, time = 500) {
  $(el).on("click", function () {
    let current = $(this).parent().parent();
    $(current).slideUp(time);
    setTimeout(() => {
      $(current).remove();
      
    }, time + 50);
  });
}

function serwer_change(el) {
  $(el).on("click", function () {
    let newCityName = $(this).siblings(".city-name-replace").val().trim();
    if(newCityName != ""){
      let cur = $(this);
      $.getJSON(
        '/w',
        { city: encodeURIComponent(newCityName) },
        function (data, textStatus, jqXHR) {
          tab = [];
          let a = objectFromData(data);
          tab.push(a);
        }
      ).done(function () {
        set_actual_data_and_format_style($(cur).parent().parent().parent().parent());
        $(cur).parent().parent().remove();
      }).fail(function (error) {
        myAlert(`Sprawdź podane dane ( ${error.statusText}: ${error.status} ) !`);
      });;
    }else{
      myAlert(`Wpisz nazwę miejscowości`);
    }
  });
}

// funkcja moja lokalizacja
const find_me = () => {
  if (navigator.geolocation) {
    let actPos = [];
    navigator.geolocation.getCurrentPosition(get_actual_position);
    function get_actual_position(data) {
      let lat = data.coords.latitude;
      let lon = data.coords.longitude;
      get_your_position('/lat', lat, lon);
      function get_your_position(url, lat, lon) {
        const request = $.ajax({
          url: url,
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          data: { lat: lat, lon: lon },
          type: "GET",
        });
        request.done(function (response) {
          actPos = [];
          let format_data = objectFromData(response);
          actPos.push(format_data);
          $($("#city-name")).val(actPos[0].cityName);
          $(".metric-b").click();
        });
        request.fail(function (error) {
          myAlert(
            `Sprawdź podane dane ( ${error.statusText}: ${error.status} ) !`
          );
        });
      }
    }
  } else {
    myAlert(
      "Twoja przglądarka nie wspiera geolokalizacji. Wpisz ręcznie nazwę miejscowości aby uzyskać dane pogodowe"
    );
  }
};


