var changeBg = function () {
  if ($(".bg").hasClass("night")) {
    $(".bg").removeClass("night");
    $(".bg-switch").removeClass("switched");
  } else {
    $(".bg").addClass("night");
    $(".bg-switch").addClass("switched");
  }
};
