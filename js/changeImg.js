var i = 0; 			// Start Point
var images = [];	// Images Array
var time = 1200;	// Time Between Switch

// Image List
images[0] = "images/r1.jpg";
images[1] = "images/r2.jpg";
images[2] = "images/r3.jpg";
images[3] = "images/r4.jpg";
images[4] = "images/r5.jpg";
images[5] = "images/r6.jpg";
images[6] = "images/r7.jpg";

// Change Image
function changeImg(){
  document.slide.src = images[i];

  // Check If Index Is Under Max
  if(i < images.length - 1){
    // Add 1 to Index
    i++;
  } else {
    // Reset Back To O
    i = 0;
  }

  // Run function every x seconds
  setTimeout("changeImg()", time);
}

  // Run function when page loads
window.onload=changeImg;
