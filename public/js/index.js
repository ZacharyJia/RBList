var curType = 0;
var urlParam = getUrlParameter("category");
var curCategory = urlParam === undefined ? 0 : urlParam;
//清空筛选条件 & 样式
function cleanFilter() {
  curType = 0;
  curCategory = 0;
  setNavColor("#333", "#fff");
  $("#red").removeClass("active");
  $("#black").removeClass("active");
  $("#allCategory > li").removeClass("active");
}
//设置筛选条件 AND 刷新商店
function setCurType(x) {
  if (x === 1) {
    cleanFilter();
    $("#red").addClass("active");
    setNavColor("#F1F1F1", "#EA644A");
  }
  else if (x === 2) {
    cleanFilter();
    $("#black").addClass("active");
    setNavColor("#F1F1F1", "#BD7B46");
  }
  else {
    cleanFilter();
  }
  curType = x;
  showShop(1);
}

function setNavColor(fontColor, bgColor) {
  $(".navbar-default").css("background-color", bgColor);
  $(".navbar-default .navbar-brand").css("color", fontColor);
  $(".navbar-default .navbar-nav > li > a").css("color", fontColor);
  if (bgColor != "#fff")
    $("ul:nth-child(1) > .active > a").css("color", bgColor);

}
//显示/刷新商店
function showShop(curPage) {
  $.ajax({
    url: "/api/shoplist",
    data: { "curPage": curPage, "type": curType, "category": curCategory, "pageSize": 20 },
    success: function (response) {
      if (response.code === "200") {
        var shop_list_len = response.data.shop_list.length;
        var totalPage = response.data.total_page;
        $(".cards").replaceWith("<div class='cards'></div>");
        for (var i = 0; i < shop_list_len; i++) {
          newP = $("<strong></strong>")
            .attr("class", "card-heading text-center")
            .html(response.data.shop_list[i].name);
          newLike = $("<div></div>")
            .attr("class", "pull-left text-danger")
            .append("<i class='icon icon-smile with-padding'></i>")
            .append(response.data.shop_list[i].good);
          newDislike = $("<div></div>")
            .attr("class", "pull-left text-important")
            .append("<i class='icon icon-frown with-padding'></i>")
            .append(response.data.shop_list[i].bad);
          newCommentCount = $("<div></div>")
            .attr("class", "pull-right text-special")
            .append("<i class='icon icon-comments with-padding'></i>")
            .append(response.data.shop_list[i].bad + response.data.shop_list[i].good);
          if (curType === 1)
            newCardAction = $("<div class='card-actions'></div>")
              .append(newLike)
              .append(newCommentCount);
          else if (curType === 2)
            newCardAction = $("<div class='card-actions'></div>")
              .append(newDislike)
              .append(newCommentCount);
          else
            newCardAction = $("<div class='card-actions'></div>")
              .append(newLike)
              .append(newDislike)
              .append(newCommentCount);
          var url = "/detail.html?id=" + response.data.shop_list[i].id;
          newCard = $("<a></a>")
            .attr("class", "card")
            .attr("id", response.data.shop_list[i].id)
            .attr("href", url)
            .append(newP)
            .append(newCardAction);
          newCol = $("<div></div>").attr("class", "col-md-4 col-sm-6 col-lg-3");
          newShop = newCol.append(newCard);
          $(".cards").css({ "min-height": "450px" }).append(newShop);
          pager("showShop", totalPage, curPage);
        }
      }
    }
  });

  if (curType !== 0 || curCategory !== 0) {
    var messagerText, messagerColor;
    if (curType === 1) { messagerText = "红店优先"; messagerColor = "danger" }
    else if (curType === 2) { messagerText = "黑店优先"; messagerColor = "important" }
    else {
      categoryId = "#" + curCategory;
      messagerText = $(categoryId).text();
      messagerColor = "primary";
    }
    msg = new $.zui.Messager('当前筛选条件: ' + messagerText, {
      type: messagerColor,
      placement: 'bottom-left',
      time: 2000,
      close: true,
      actions: [{
        name: 'undo',
        icon: 'undo',
        text: '清除',
        action: function () {
          cleanFilter();
          showShop(1);
        }
      }]
    }).show();
  }
}

//添加新店铺
function addShop() {
  var newShopName = $("#newShopName").val();
  var newShopDescription = $("#newShopDescription").val();
  var newShopCategory = $("#newShopSelection").val();
  if (newShopName === "" || newShopCategory === "") {
    $("#newShopName").parent().addClass("has-error");
    return false;
  }
  if (newShopDescription === "") {
    $("#newShopDescription").parent().addClass("has-error");
    return false;
  }

  $.ajax({
    url: "/api/shop/create",
    data: { " name": newShopName, "desc": newShopDescription, "category": newShopCategory },
    success: function (response) {
      if (response.code === "200") {
        $('#addShop').modal('hide');
        // $("#newShopSelection > option:nth-child(1)").attr("selected","selected");
        var status = $("#addShopStatus");
        status.find(".modal-title").text("创建成功");
        status.find(".modal-body >p").text("感谢您的贡献!");
        showShop(1);
        $("#newShopName").val("");
        $("#newShopDescription").val("");
        $("#newShopSelection").val("");
      }
      else {
        var status = $("#addShopStatus");
        status.find(".modal-title").text("添加失败");
        status.find(".modal-body >p").text(response.msg);
      }
      status.modal();
      $("#newShopName").parent().addClass("has-error");
      $("#newShopDescription").parent().addClass("has-error");
    }
  });
}
//滚动监听
// var first_load = 0;
// $(window).scroll(function () {
//   if ($(this).scrollTop() > 0) {
//     $('.masthead').slideUp('slow', function () {
//       if (!first_load++)
//         $("html, body").animate({ scrollTop: 0 }, "fast");
//     });
//   }
// });

//类别填充
$(document).ready(function () {
  $.ajax({
    url: "/api/categorylist",
    success: function (list) {
      if (list.code === "200") {
        $.each(list.data, function (i, item) {
          var categoryName = item.category_list.name;
          var categoryId = item.category_list.id;
          var content = $("<li></li>").append("<a></a>").find("a")
            .attr("href", "javascript:void(0)")
            .attr("id", categoryId)
            .text(categoryName)
            .end();
          $("#allCategory").append(content);
          var categorySel = $("<option></option>")
            .attr("value", categoryId)
            .text(categoryName);
          $("#newShopSelection").append(categorySel);
        });
        showShop(1);  //初始化店铺
      }
    }
  });
});
// 筛选条件：类别
$(document).on("click", "#allCategory > li > a", function () {
  this_id = $(this).attr("id");
  if (curCategory !== this_id) {
    cleanFilter();
    $(this).parent().toggleClass('active');
    curCategory = this_id;
  }
  else {
    cleanFilter();
  }
  showShop(1);
});
// 筛选条件：红/黑 优先
$("#red").click(function () {
  if (curType == 1)
    setCurType(0);
  else setCurType(1);
});
$("#black").click(function () {
  if (curType == 2)
    setCurType(0);
  else setCurType(2);
});
// 初始化
// showShop(1);