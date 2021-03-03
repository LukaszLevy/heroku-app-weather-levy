const axios = require('axios');

const getWeather = async (url) => {
    try{
      const reponseW = await axios.get(url);
      const data = reponseW.data;
      return data;
    }
    catch(err){
      if(err){
        return
      }
    }
  }

  exports.getWeather = getWeather;