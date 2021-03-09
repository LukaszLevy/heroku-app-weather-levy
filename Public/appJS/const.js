
const openWeatherUrl = "http://api.openweathermap.org/data/2.5/weather";
const cityNameIn = $("#city-name");
const mainContainer = $(".container");
let actualWeatherData;
const infoMessage = $(".info-mes");
const infoMessageTxt = $(infoMessage).children().text();

const enter = (enterEl, clickEl) => {
  $(enterEl).on({
    keypress: (e) => {
      if (e.key === "Enter") {
        clickEl.click();
      }
    },
  });
}

// funkcja zeruj value inputa "wyszukaj miasto"
const clearInput = () => {
  setTimeout(() => {
    cityNameIn.val("");
  }, 300);
};

// funkcja animuj nowy blok pgodowy
const new_weather_block_animate = () => {
  setTimeout(() => {
    let newWeatherBlock = $(`.new-weather-block`);
    let nwbLength = newWeatherBlock.length;
    $(newWeatherBlock[nwbLength - 1]).addClass("nwb-show-animate");
  }, 700);
};

// funkcja - stworz obiekt z interesujacych mnie danych pobranych z serwera dostawcy
const objectFromData = (weather) => {
  let descriptionData = weather.weather[0].description;
  let description_fl_big = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  let w = weather.wind.speed * 3.6;
  let date = new Date();
  let dateCorrectFormat = new Intl.DateTimeFormat("default", {
    dateStyle: "medium",
    timeStyle: "long",
  }).format(date);
  const returnedObject = {
    // obiekt reprezentujacy dane pobrane z serwera pogody, wyselekcjonawane te ktore sa mi potrzebne
    cityName: weather.name,
    countryShortcut: weather.sys.country,
    temperature: weather.main.temp,
    pressure: weather.main.pressure,
    description: description_fl_big(descriptionData),
    icon: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
    dat: dateCorrectFormat,
    wind: w.toFixed(2),
    humidity: weather.main.humidity,
  };
  return returnedObject;
};

// funkcja alert
const myAlert = (txt) => {
  // window.scrollTo({top: 0, behavior: 'smooth'});
  $(infoMessage).css("height", "100px");
  setTimeout(() => {
    $(infoMessage).children().text(txt)
  }, 200);
  setTimeout(() => {
    $(infoMessage).children().text("");
    $(infoMessage).css("height", 0);
  }, 2500);
};

// funkcja ustalajaca aktualne dane i zmieniajaca animacje 
function set_actual_data_and_format_style(ths) {
  setTimeout(() => {
    $(ths).find(".new-date-txt").text(tab[0].dat);
    $(ths).find(".c-txt").text(tab[0].cityName);
    $(ths).find(".con-txt").text(tab[0].countryShortcut);
    $(ths).find(".weather-slogan-txt").text(tab[0].description);
    $(ths).find(".icon").attr("src", tab[0].icon);
    $(ths).find(".temp-score span").text(tab[0].temperature);
    $(ths).find(".pres-score span").text(tab[0].pressure);
    $(ths).find(".wind-score span").text(tab[0].wind);
    temp_indicator(null, $(ths).find(".temp-indicator"), tab[0].temperature);
    pres_indicator(null, $(ths).find(".pres-anime-box"), tab[0].pressure);
    wind_indicator(null, $(ths).find(".wind-anime-box"), tab[0].wind);
  }, 700);
}

function scroll_to_added_element(time = 300){
  setTimeout(()=>{
    document.querySelector('#add-area').lastElementChild.scrollIntoView({
      behavior: 'smooth',
      block: "center" 
    });
  }, time)
  
}

function change_wall_size(time = 500){
  setTimeout(()=>{
    let wallBoxes = $('.wall-box');
    let docH = $('html').height();
    $(wallBoxes).css('height', `${docH}`)
    }, time)
}

$(window).on('resize', function(){
  change_wall_size();
})


function show_my_name(){
  $('#fname').css("display", "block");
}

$('.top').on("click", function(){
  
  document.querySelector('html').scrollTo({
    top: 0,
    behavior: "smooth"
  })
})






