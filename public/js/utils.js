function pager(callFuncName, totalPage, curPage) {
  $(".pager").replaceWith("<ul class='pager'></ul>");
  pagePre = $("<a>«</a>");
  if (curPage === 1)
    pagePre.attr("class", "previous disabled");
  else
    pagePre.attr("onclick", callFuncName + "(" + (curPage - 1) + ")").attr("href", "javascript:void(0);");
  pagePreLi = $("<li></li>").append(pagePre);
  $(".pager").append(pagePreLi);
  for (var i = 1; i <= totalPage; i++) {
    pageNum = $("<a>" + i + "</a>")
      .attr("onclick", callFuncName + "(" + i + ")")
      .attr("href", "javascript:void(0);");
    pageNumLi = $("<li></li>").append(pageNum);
    $(".pager").append(pageNumLi);
    if (i === curPage)
      pageNumLi.attr("class", "active");

  }
  pageNext = $("<a>»</a>");
  if (curPage === totalPage)
    pageNext.attr("class", "next disabled");
  else
    pageNext.attr("onclick", callFuncName + "(" + (curPage + 1) + ")")
      .attr("href", "javascript:void(0);");
  pageNextLi = $("<li></li>").append(pageNext);
  $(".pager").append(pageNextLi);
}

function checkLoginStatus(callback) {
  $.ajax({
    url: "/api/userinfo",
    success: function (userinfo) {
      if (userinfo.code === "200" && userinfo.data.verified === 1)
        callback(userinfo.data.username);
      else callback(false);
   }
  });
}

function navLoginStatus(username) {
  if (username) {
    $("#nav_login").hide();
    $("#nav_register").hide();
    var newUserStatus = $("<a></a>").attr("href", "#").text(username).appendTo($("<li></li>"));
    $("#status").append(newUserStatus.parent());
  }
  else alert("未登录");
}

$.ajaxSetup({
  headers: {
    'X-XSRF-TOKEN': $.cookie('XSRF-TOKEN')
  },
  type: "POST",
  contentType: 'application/json',
  dataType: "json",
});

$(document).ready(function () {
  $('.contentwrap').css({ 'margin-top': (($('.navbar-fixed-top').height()) + 10) + 'px' });
  $(window).resize(function () {
    $('.contentwrap').css({ 'margin-top': (($('.navbar-fixed-top').height()) + 10) + 'px' });
  });
  checkLoginStatus(navLoginStatus);



  $.ajax({
    url: "/api/categorylist",
    success: function (list) {
      if (list.code === "200") {
        $.each(list.data, function (i, item) {
          var categoryName = item.category_list.name;
          var content = $("<li>" + "<a href=\"#\">" + categoryName + "</a>" + "</li>");
          $("#allCategory").append(content);
        })
      }
    }
  });
});