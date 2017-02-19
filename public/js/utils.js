//翻页键
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
    if (i === curPage) {
      pageNumLi.attr("class", "active");
      pageNumLi.children().removeAttr("onclick");
    }
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

//登录状态
function checkLoginStatus(callback) {
  $.ajax({
    url: "/api/userinfo",
    success: function (userinfo){
      if (userinfo.code === "200") {
        if (userinfo.data.verified === 0) {
          verified_text = '您还没有验证邮箱 ' + '<a href=\'http://mail.bjtu.edu.cn/\' class=\'text-muted\'>去验证</a>';
          new $.zui.Messager(verified_text, {
            type: 'info',
            icon: 'warning-sign',
            placement: 'top',
            close: true
          }).show();
        }
        callback(userinfo.data.username);
      }
      else callback(false);
    }
  });
}
//状态栏登录状态
function navLoginStatus(username) {
  if (username) {
    $("#nav_login").hide();
    $("#nav_register").hide();
    var newUserStatus = $("<a class='dropdown-toggle' data-toggle='dropdown'></a>")
      .attr("href", "#")
      .text(username);
    var newUserLogoutUl = $("<li></li>").append("<ul class='dropdown-menu' role='menu'></ul>").children();
    var newUserLogoutA = $("<a href='logout'></a>")
      .attr("onclick", "event.preventDefault();$('#logout-form').submit()")
      .text("注销")
    var newUserLogout = $("<li></li>")
      .html("<form id=\"logout-form\" action=\"logout\" method=\"POST\" style=\"display: none;\">" +
      "<input type=\"hidden\" name=\"_token\"></form>")
      .append(newUserLogoutA);
    newUserLogoutUl.append(newUserLogout);
    var newUserLi = $("<li class='dropdown'></li>").append(newUserStatus).append(newUserLogoutUl);
    $("#status").append(newUserLi);
  }
}

//设置AJAX默认设置
$.ajaxSetup({
  // headers: {
  //   'X-XSRF-TOKEN': $.cookie('XSRF-TOKEN')
  // },
  type: "POST",
  dataType: "json",
});

//检查登录状态 & 初始化
$(document).ready(function () {
  checkLoginStatus(navLoginStatus);
});

$(document).on({
  ajaxStart: function () { $("body").addClass("loading"); },
  ajaxStop: function () { $("body").removeClass("loading"); }
});