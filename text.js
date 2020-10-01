
var i = 0;
var txt = "Lovish Kumar Prajapati";
var speed = 100;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("name").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
  else if(i==txt.length)
  	document.getElementById("name2").style.visibility = "visible";
}
