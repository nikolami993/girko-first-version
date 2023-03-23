
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  
  let slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) {//when it's end of questions
             slideIndex=slides.length;
  }    
  
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  
  slides[slideIndex-1].style.display = "block";  
  
}
