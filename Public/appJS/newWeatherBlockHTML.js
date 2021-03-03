// funkcja tworz nowy blok pogodowy
const createNewWeatherBlock = (weather) => {
    let dataNow = objectFromData(weather);
    let newWeatherBlock = 
      `<div class="container py-0 my-cont new-weather-block">
        <div class="row align-items-center new-city">
          <div class="row align-items-center justify-content-center city-date-box">
            <div class="new-date">
              <div class="new-date-txt">${dataNow.dat}</div>
              <div class="new-city-name"><span class='c-txt'>${dataNow.cityName}</span>, <span class='con-txt'>${dataNow.countryShortcut}</span></div>
            </div>
            <div class="weather-slogan">
              <div class="weather-slogan-txt">${dataNow.description}</div>
              <img class="icon" src="${dataNow.icon}" alt="Pogoda - ikona" title="Ikona pogody">
            </div> 
          </div>
        </div>
        <div class="row mt-4 anime-module">
          <div class="col icon-box">
            <figure>
              <div class="temp-indicator-box">
                <div class="temp-indicator">
                  <div class="temp-point"></div>
                  <div class="temp-score"><span>${dataNow.temperature}</span> <sup>o</sup>C</div>
                </div>
              </div>
              <div class="bag-val"></div>
              <figcaption class="bag-1-box"><span class="bag-1">Temperatura</span></figcaption>
            </figure>
          </div>
          <div class="col icon-box">
            <figure>
              <div class="bag-val">
                <div class="pres-ground"></div>
                <div class="pres-score"><span>${dataNow.pressure}</span> hPa</div>
                <div class="pres-anime-box">
                  <div class="animate-1">
                    <div class="arrows"></div>
                  </div>
                  <div class="animate-2">
                    <div class="arrows"></div>
                  </div>
                  <div class="animate-3">
                    <div class="arrows"></div>
                  </div>
                </div>
              </div>
              <figcaption class="bag-1-box"><span class="bag-1">Ciśnienie</span></figcaption>
            </figure>
          </div>
          <div class="col icon-box">
            <figure>
              <div class="bag-val">
                <div class="wind-ground"></div>
                <div class="wind-score"><span>${dataNow.wind}</span> km/h</div>
                <div class="wind-anime-box">
                  <div class="animate-1-wind">
                    <div class="arrows-wind"></div>
                  </div>
                  <div class="animate-2-wind">
                    <div class="arrows-wind"></div>
                  </div>
                  <div class="animate-3-wind">
                    <div class="arrows-wind"></div>
                  </div>
                </div>
              </div>
              <figcaption class="bag-1-box"><span class="bag-1">Wiatr</span></figcaption>
            </figure>
          </div>
        </div>
        <div class="row mt-4 justify-content-center but-box">
          <div class="refresh">Odśwież</div>
          <div class="change">Zmień</div>
          <div class="delete">Usuń</div>
        </div>
      </div>`
      return newWeatherBlock;
}
