

$(function () {
     
     var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
     
     var number = 0;
     var degree = 0;
     
     $("#knob").click(function () {
          degree = degree - 13.8461538462;
          $("#alphaWheel").css({
             'transform': function(index, value) {
                  return 'rotate('+degree+'deg)';
             }
          });
          $("#alphaWheel").css({
              "-ms-transform": function(index, value) {
                  return 'rotate('+degree+'deg)';
             }
          });
          $("#alphaWheel").css({
             '-webkit-transform': function(index, value) {
                  return 'rotate((value-12)deg)';
             }
          });
          $("#alphaWheel").css({
              "-o-transform": function(index, value) {
                  return 'rotate('+degree+'deg)';
             }
          });
          $("#alphaWheel").css({
             "-moz-transform": function(index, value) {
                  return 'rotate((value-12)deg)';
             }
          });
          if (number === 25) {
             number = 0;
          } else {
             number += 1;
          }
          
          $("#middle").val(letters[number]);
     });


});





















