var curType = 0;
var curCategory = 0;
function setCurType(x) {
  if(curType !== x)
  {
    curType = x;
    if(x === 1)
    {
      $(".navbar-default").css("background-color","#EA644A");
      $(".navbar-default .navbar-brand").css("color","#F1F1F1");
      $(".navbar-default .navbar-nav > li > a").css("color","#F1F1F1");
    }
    else
    {
      $(".navbar-default").css("background-color","#BD7B46");
      $(".navbar-default .navbar-brand").css("color","#F1F1F1");
      $(".navbar-default .navbar-nav > li > a").css("color","#F1F1F1");
    }
  }
  else 
  {
    curType = 0;
    $(".navbar-default").css("background-color","#fff");
    $(".navbar-default .navbar-brand").css("color","#333");
    $(".navbar-default .navbar-nav > li > a").css("color","#333");
  }
  showShop(1);
}
function setCategory(id){
  if(curCategory !== id)curCategory = id;
  else curCategory = 0;
  showShop(1);
  
}
function showShop(curPage) {
  $.ajax({
    url: "/api/shoplist",
    data: { "curPage": curPage, "type": curType, "category":curCategory, "pageSize": 20 },
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
          var url = "/detail.html?id=" + response.data.shop_list[i].id +
            "&name=" + response.data.shop_list[i].name +
            "&good=" + response.data.shop_list[i].good +
            "&bad=" + response.data.shop_list[i].bad;
          newCard = $("<a></a>")
            .attr("class", "card")
            .attr("id", response.data.shop_list[i].id)
            .attr("href", url)
            .append(newP)
            .append(newCardAction);
          newCol = $("<div></div>").attr("class", "col-md-4 col-sm-6 col-lg-3");
          newShop = newCol.append(newCard);
          $(".cards").css({"min-height":"450px"}).append(newShop);
          pager("showShop", totalPage, curPage);
        }
      }
    }
  });
}

$(window).scroll(function() {

   if ($(this).scrollTop()>0)
     {
        $('.masthead').fadeOut();
        
        
     }
    // else
    //  {
    //   $('.masthead').fadeIn();
    //  }
 });

showShop(1);