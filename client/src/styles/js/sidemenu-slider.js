// document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
  const navSlide = () => {
      const arg_btn = document.querySelector('.arg-btn');
      const navSide = document.querySelector('.argSide');
      const navSideLinks = document.querySelectorAll('.argSide .arg-links');
    
      console.log(arg_btn, navSide, navSideLinks);
    
      arg_btn.addEventListener('click', () => {
        navSide.classList.toggle('argSide-active');
    
        // navSideLinks.forEach((link, index) => {
        //   if(link.style.animation) {
        //     link.style.animation = '';
        //   } else {
        //     link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        //   }
        // });
    
        arg_btn.classList.toggle('toggle');
      });
    }
    navSlide()
    }, 1000);
  
// });