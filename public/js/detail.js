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
$(".breadcrumb li:eq(2)").text(name);
function showComment(curPage) {
    $.ajax({
        type: "POST",
        url: "/api/commentlist",
        contentType: 'application/json',
        data: JSON.stringify({ "shop_id": shop_id, "curPage": curPage }),
        dataType: "json",
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
showComment(1);
function comment() {
    var comment = $('textarea').val();
    $.ajax({
        type: "POST",
        url: "/api/comment",
        contentType: 'application/json',
        data: JSON.stringify({ "shop_id": 1, "content": comment, "type": 1 }),
        datatype: "json",
        success: function (response) {
            if (response.code === 200)
                alert('ok');
        }
    });
};