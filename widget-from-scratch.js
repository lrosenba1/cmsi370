

$(function () {
     
     var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
     
     var number = 0;
     var degree = 0;

     // JD: The use of an ID selector here means that there can only be one
     //     middle-initial knob in any given web page.
     $("#knob").click(function () {
          // JD: Shouldn't the degree value wrap around also?  Otherwise it will
          //     get smaller and smaller and smaller.  Won't be immediately obvious
          //     visually, but internally that does not work right.
          degree = degree - 13.8461538462;

          // JD: This block of css function calls can actually be consolidated into
          //     one: the form you are using allows multiple properties/values
          //     in a single object.  See the jQuery css function reference for
          //     details.
          //
          //     Plus, you have functions that are redundantly written out.  These
          //     can be consolidated also.
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

          // JD: This performs the correct computation, but is not the most
          //     compact way to express it.  Using a conditional expression
          //     is more succinct.
          if (number === 25) {
             number = 0;
          } else {
             number += 1;
          }
          
          $("#middle").val(letters[number]);
     });


});





















