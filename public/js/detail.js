// 获取URL
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};
var shop_id = getUrlParameter("id");
var first_load = 0;

// 商品信息显示
showShopDetail(shop_id);
function showShopDetail(shop_id) {
  $.ajax({
    url: "/api/shoplist",
    success: function (response) {
      if (response.code === "200") {
        this_shop = response.data.shop_list;
        for (var i = 0; i < this_shop.length; i++)
          if (this_shop[i].id === shop_id) {
            var name = this_shop[i].name;
            var good = this_shop[i].good;
            var bad = this_shop[i].bad;
            $("head > title").text(name);
            $("#name").text(name);
            $("#good").text(good);
            $("#bad").text(bad);
            $(".progress-bar-danger").css({ "width": parseInt(good) / (parseInt(good) + parseInt(bad)) * 100 + "%" });
            $(".progress-bar-warning").css({ "width": 100 - (parseInt(good) / (parseInt(good) + parseInt(bad)) * 100) + "%" });
            $(".breadcrumb li:eq(2)").text(name);
            break;
          }
      }
    }
  });
}

// 评论显示
function showComment(curPage) {
  $.ajax({
    url: "/api/commentlist",
    data: { "shop_id": shop_id, "curPage": curPage, pageSize: 10 },
    success: function (response) {
      if (response.code === "200") {
        $(".comments-list").replaceWith("<section class='comments-list' ></section>");
        var comment_list_len = response.data.comment_list.length;
        var totalPage = response.data.total_page;
        if (comment_list_len === 0)
          $(".comments-list").html("<div class='comment'><h3 class='text-center text-muted'>还没有人评论T_T</h3></div>");
        for (var i = 0; i < comment_list_len; i++) {
          newAvatar = $("<a class='avatar'></a>").append("<i class='icon-user icon-2x'></i>");
          newCommentTime = $("<div class='pull-right text-muted'></div>").text("2016");
          newCreatorText = $("<strong><strong>").text(response.data.comment_list[i].creator);
          newCreatorLink = $("<a></a>")
            .attr("href", "#")
            .append(newCreatorText);
          newCreator = $("<div></div>")
            .append(newCreatorLink);
          newCommentText = $("<div class='text'></div>").text(response.data.comment_list[i].content);
          newCommentReply = $("<div class='actions'></div>").text("回复");
          newContent = $("<div class='content'></div>")
            .append(newCommentTime)
            .append(newCreator)
            .append(newCommentText)
            .append(newCommentReply);
          newComment = $("<div class='comment'></div>").append(newAvatar).append(newContent);
          if (response.data.comment_list[i].type === "good")
            newComment.addClass("good");
          else newComment.addClass("bad");
          $(".comments-list").append(newComment);
          pager("showComment", totalPage, curPage);
        }
      }
    }
  });
  if (first_load++) {
    $("html, body").animate({
      scrollTop: $("#commentsRow").offset().top - 65
    }, "slow");
  }
}

//评论登录状态检查
function commentLoginStatus(username) {
  if (username) {
    $("div.form-group.comment-user > div > div.col-md-5 > div").addClass("invisible");
    $("textarea").attr("placeholder", "撰写评论...");
    $("button.disabled").removeClass("disabled");
  }
};
//评论
function comment() {
  var commentContent = $("textarea").val();
  var commentType;
  if ($("#commentType > button.active").val() == 1)
    commentType = 1;
  else if ($("#commentType > button.active").val() == 2)
    commentType = 2;
  else {
    new $.zui.Messager('您忘了点评价类型', {
      icon: 'hand-down',
      type: 'primary',
      close: true,
      placement: 'center'
    }).show();
    return false;
  }

  if (commentContent === "") {
    new $.zui.Messager('您忘了填写评论', {
      icon: 'hand-down',
      type: 'primary',
      close: true,
      placement: 'center'
    }).show();
    return false;
  }
  $.ajax({
    url: "/api/comment",
    data: { "shop_id": shop_id, "content": commentContent, "type": commentType },
    success: function (response) {
      $('#commentSuccess').modal();
      $('#commentSuccess').on('hidden.zui.modal', function () {
        showShopDetail(shop_id);
        showComment(1);
        $("textarea").val("");
        $("#commentType > button").removeClass("active");
        $("#commentType > button:nth-child(1)").addClass("btn-danger");
        $("#commentType > button:nth-child(2)").addClass("btn-warning");
        $("html, body").animate({
          scrollTop: $("#progressBar").offset().top - 65
        }, "slow");
      })
    }
  });
}
// 评论初始化
showComment(1);
// 检查登录状态
$(document).ready(function () {
  checkLoginStatus(commentLoginStatus);
  
})