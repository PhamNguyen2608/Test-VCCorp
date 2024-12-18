class Slider {
    constructor(slides, sliderTrackId, prevButtonId, nextButtonId) {
      this.slides = slides; 
      this.currentIndex = 0; 
      this.sliderTrack = document.getElementById(sliderTrackId);
      this.prevButton = document.getElementById(prevButtonId);
      this.nextButton = document.getElementById(nextButtonId);
      this.totalSlides = 0; 

      this.initSlider();
      this.addEventListeners();
    }
  
    initSlider() {
      this.renderSlides();
      this.totalSlides = document.querySelectorAll('.slider__slide').length;
      this.updateSliderPosition(); 
    }
  
    renderSlides() {
      this.sliderTrack.innerHTML = this.slides
        .map(
          (num) => `
          <div class="slider__slide">
            <p class="slider__caption">Slide ${num} Content</p>
          </div>
        `
        )
        .join('');
    }
  
    updateSliderPosition() {
      const offset = -(this.currentIndex * 100); 
      this.sliderTrack.style.transform = `translateX(${offset}%)`;
      this.updateButtons();
    }
  
    updateButtons() {
      const isFirstSlide = this.currentIndex === 0;
      const isLastSlide = this.currentIndex === this.totalSlides - 1;
  
      this.prevButton.disabled = isFirstSlide;
      this.nextButton.disabled = isLastSlide;
  
      this.prevButton.classList.toggle('disabled', isFirstSlide);
      this.nextButton.classList.toggle('disabled', isLastSlide);
    }
  
    addEventListeners() {
      this.prevButton.addEventListener('click', () => this.navigate(-1));
      this.nextButton.addEventListener('click', () => this.navigate(1));
      this.addSwipeSupport();
    }
  
    navigate(direction) {
      const newIndex = this.currentIndex + direction;
      if (newIndex >= 0 && newIndex < this.totalSlides) {
        this.currentIndex = newIndex;
        this.updateSliderPosition();
      }
    }
  
    addSwipeSupport() {
      let startX = 0;
  
      this.sliderTrack.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX; 
      });
  
      this.sliderTrack.addEventListener('touchend', (event) => {
        const endX = event.changedTouches[0].clientX;
        const touchDiff = startX - endX;
  
        if (touchDiff > 50) this.navigate(1); 
        else if (touchDiff < -50) this.navigate(-1); 
      });
    }
  }
  
  const slider = new Slider([1, 2, 3, 4, 5,6,7,8,9,10], 'sliderTrack', 'prevButton', 'nextButton');
  