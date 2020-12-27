window.addEventListener("DOMContentLoaded", function () {
    "use strict";
    let slideIndex = 1; // Нумерация слайдов с 1.
    let slides = document.querySelectorAll(".slider-item"),
        prev = document.querySelector(".prev"),
        next = document.querySelector(".next"),
        dotsWrap = document.querySelector(".slider-dots"),
        dots = document.querySelectorAll(".dot");
    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length) { // если номер текущего слайда должен стать больше количества слайдов, возвращайся на первый слайд   
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length; // если номер текущего слайда должен стать меньше количества слайдов, возвращайся на последний слайд
        }
        slides.forEach((item) => { // у всех слайдов сделай display:none, покажи слайд с индексом [slideIndex - 1]
            item.style.display = "none";
        });
        slides[slideIndex - 1].style.display = "block"; //(уменьшаем на 1 т.к.у нас нумерация слайдов начинается с 1, а в массиве с 0)

        dots.forEach((item) => {
            item.classList.remove("dot-active"); // у всех точек убери класс dot-active
        });
        dots[slideIndex - 1].classList.add("dot-active"); // у точки с индексом равным индексу текущего слайда добавь класс dot-active
    }

    function plusSlides(n) {
        showSlides(slideIndex += n); // увеличивай номер текущего слайда на n
    }

    function currentSlide(n) { // вызови функцию showSlides со slideIndex = n
        showSlides(slideIndex = n);
    }

    prev.addEventListener("click", function () { // по клику на левую стрелку вызови функцию plusSlides с -1, т.е. вызови showSlides с номером предыдущего слайда
        plusSlides(-1);
    });
    next.addEventListener("click", function () { // по клику на правую стрелку вызови функцию plusSlides с -1, т.е. вызови showSlides с номером следующего слайда
        plusSlides(1);
    });
    dotsWrap.addEventListener("click", function (event) { // используем делегирование событий. клик навешиваем на контейнер-обёртку, но срабатывать
        for (let i = 0; i < dots.length + 1; i++) { // он будет только если у дочернего элемента есть класс dot и его индекс в массиве dots равен [i - 1]
            if (event.target.classList.contains("dot") && event.target == dots[i - 1]) { // т.к. нумерация слайдов у нас начинается с 1, а не с 0, 
                currentSlide(i); // то количество итераций увеличивается на 1, а индекс точки уменьшается на 1. например, слайд 3. У него currentIndex=3, 
            } // а индекс точки=2.
        }
    });
});