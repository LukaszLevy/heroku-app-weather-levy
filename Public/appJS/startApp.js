
$(".metric-b").on("click", () => {
  let city = $('#city-name').val().trim().toUpperCase();
  $.ajax({
    url: "/w",
    context: document.body,
    data: {city: city}
  })
  .done(function (data) {
    console.log(data.clouds);
    
  })
  .fail((err)=>{
    console.log("msg: ", err.status)
  })
});


