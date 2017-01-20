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
var name = getUrlParameter("name");
var good = getUrlParameter("good");
var bad = getUrlParameter("bad");
$("#name").text(name);
$("#good").text(good);
$("#bad").text(bad);
$(".progress-bar").css({"width": parseInt(good)/(parseInt(good)+parseInt(bad))*100 + "%"});
$(".breadcrumb li:eq(2)").text(name);
function showComment(curPage) {
  $.ajax({
    url: "/api/commentlist",
    data: JSON.stringify({ "shop_id": shop_id, "curPage": curPage }),
    success: function (response) {
      if (response.code === "200") {
        $(".comments_list").replaceWith("<section class='comments_list' ></section>");
        var comment_list_len = response.data.comment_list.length;
        var totalPage = response.data.total_page;
        for (var i = 0; i < comment_list_len; i++) {
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
          newComment = $("<div class='comment'></div>").append(newContent);
          $(".comments-list").append(newComment);
          pager("showComment", totalPage, curPage);
        }
      }
    }
  });
}

function commentLoginStatus(username) {
  if (username) {
    $("div.form-group.comment-user > div > div.col-md-5 > div").addClass("invisible");
    $("textarea").attr("placeholder", "撰写评论...");
    $("button.disabled").removeClass("disabled");
  }
};
function comment() {
  var commentContent = $("textarea").val();

  $.ajax({
    url: "/api/comment",
    data: JSON.stringify({ "shop_id": shop_id, "content": commentContent, "type": commentType }),
    success: function (response) {
      alert("done");
    }
  })
}

showComment(1);

$(document).ready(function () {
  checkLoginStatus(commentLoginStatus);

})