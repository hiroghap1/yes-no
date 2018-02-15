$(function () {
  var lenSec, nowSec, w, secLink, speed, nextScn, nowUl;
  nowSec = 0;
  speed = 300;
  w = $(window).width();
  lenSec = $('section').length;
  $('#wrapper').css({
    width: w * lenSec
  });
  $('section').css({
    width: w
  });

  $(window).on('orientationchange', function () {
    w = $(window).width();
    $('#wrapper').css({
      width: w * lenSec
    });
    $('section').css({
      width: w
    });
    $('#wrapper').animate({
      left: -w * nowSec
    }, speed);
  });


  $('a[href^="#"]').on('click', function (e) { //選択肢クリック処理
    e.preventDefault();
    nextScn = $(this).attr('href');
    $(nextScn).fadeIn(300);
    $('#wrapper').animate({
      left: -w * (nowSec + 1)
    }, speed);
    nowSec += 1;
    for (var i = 1; i < $(nextScn + ' li').length; i++) {
      $(nextScn + ' li').eq(i).delay(speed * i * 0.75).fadeIn(300);
    }
    if (nowSec == 1 && $('#prev-btn').is(':hidden')) $('#prev-btn').fadeIn(300);
    $('body, html').animate({
      scrollTop: 0
    }, 300, 'swing');
  });

  $('#prev-btn').on('click', function () { //戻るボタン
    nowUl = $('section').eq(nowSec).children('ul');
    nowUl.fadeOut(300);
    nowUl.children('li:not(:first-child)').hide();
    $('#wrapper').animate({
      left: -w * (nowSec - 1)
    }, speed);
    nowSec -= 1;
    if (nowSec == 0 && $('#prev-btn').is(':visible')) $('#prev-btn').fadeOut(100);
    $('body, html').animate({
      scrollTop: 0
    }, 300, 'swing');
  });
});