// funkcja animacja temp
const temp_indicator = (tempIndicator, elrefresh, weather) => {
  let current;
  if(elrefresh == null){
    let indx = tempIndicator.length - 1;
    current = $(tempIndicator[indx]);
  }else{
    current = elrefresh;
  }
    let point = $(current).find('.temp-point')
    let head = $(current).find('.temp-score');
    let newLeft = weather / 40
    let final = `${parseFloat(50 + (newLeft * 50))}`;
    let colors = {
      c1: `rgba(35,215,255,.9)`,
      c2: `rgba(170,240,255,.9)`,
      c3: `rgba(255,205,195,.9)`,
      c4: `rgba(255,70,30,.8)`,
      t1: `white`,
      t2: `black`
    }

    if(final > 100){
      $(current).css("left", `100%`);
      temp_color_text_style(colors.c4, colors.t2, head, point)
    }
    if(final < 0){
      $(current).css("left", `0`);
      temp_color_text_style(colors.c1, colors.t2, head, point)
    }
    else{
      $(current).css("left", `${final}%`);
      if(final >= 0 && final <= 25){
        temp_color_text_style(colors.c1, colors.t2, head, point)
      }
      if(final > 25 && final <= 45){
        temp_color_text_style(colors.c2, colors.t2, head, point)
      }
      if(final > 45 && final <= 55){
        temp_color_text_style(`white`, colors.t2, head, point)
      }
      if(final > 55 && final <= 75){
        temp_color_text_style(colors.c3, colors.t2, head, point)
      }
      if(final > 75){
        temp_color_text_style(colors.c4, colors.t2, head, point)
      }
    }
    function temp_color_text_style(color, txtColor, ...el) {
      $(current).css({
        'background-color': `${color}`,
        'color': `${txtColor}`,
      })
      $(el).each(function() {
        $(this).css({
          'background-color': `${color}`,
          'color': `${txtColor}`,
        })
      })
    }
  }

// funkcja animacja cisnienia
const pres_indicator = (presIndicator,elrefresh, weather) => {
  let current;
  if(elrefresh == null){
    let indx = presIndicator.length - 1;
    current = $(presIndicator[indx]);
  }else{
    current = elrefresh
  }
  let slup = $(current).children().children();
  let slup2 = $(current).children();
  let curPrev = $(current).prev();
  let act = weather;
  let colors = {
    c1: `rgba(90,255,140,.9)`,
    c2: `rgba(90,230,255,.9)`,
    c3: `rgba(255,80,80,.8)`,
  }

  if(act > 1020){
    $(current).css("height", `35px`);
    temp_color_text_style2(colors.c3, slup, slup2, curPrev)
  }
  if(act <= 1020 && act >= 1005){
    $(current).css("height", `25px`);
    temp_color_text_style2(colors.c1, slup, slup2, curPrev);
  }
  if(act < 1005){
    $(current).css("height", `15px`);
    temp_color_text_style2(colors.c2, slup, slup2, curPrev);
  }

  function temp_color_text_style2(color, el2, ...el) {
    $(el).each(function() {
      $(this).css({
        'background-color': `${color}`,
      })
    })
    $(el2).each(function() {
      $(this).css({
        'border-bottom-color': `${color}`,
      })
    })
  }
}

// funkcja animacja wiatru
const wind_indicator = (windIndicator, elrefresh, weather) => {
  let current, act;
  if(elrefresh == null){
    let indx = windIndicator.length - 1;
    current = $(windIndicator[indx]);
    act = weather * 3.6;
  }else{
    current = elrefresh;
    act = weather;
  }
  
  let slup = $(current).children().children();
  let slup2 = $(current).children();
  let curPrev = $(current).prev();
  
  let colors = {
    c1: `rgba(255,255,255,.9)`,
    c2: `rgba(90,255,140,.9)`,
    c3: `rgba(90,230,255,.9)`,
    c4: `rgba(255,80,80,.8)`,
  }
 
  if(act <= 10){
    $(current).css({"width": `25%`,});
    temp_color_text_style3(colors.c2, slup, slup2, curPrev)
  }
  if(act > 10 && act <= 30){
    $(current).css({"width": `50%`,});
    temp_color_text_style3(colors.c1, slup, slup2, curPrev);
  }
  if(act > 30 && act <= 70){
    $(current).css({"width": `75%`,});
    temp_color_text_style3(colors.c3, slup, slup2, curPrev);
  }
  if(act > 70){
    $(current).css({"width": `100%`,});
    temp_color_text_style3(colors.c4, slup, slup2, curPrev);
  }

  function temp_color_text_style3(color, el2, ...el) {
    $(el).each(function() {
      $(this).css({
        'background-color': `${color}`,
      })
    })
    $(el2).each(function() {
      $(this).css({
        'border-bottom-color': `${color}`,
      })
    })
  }
}