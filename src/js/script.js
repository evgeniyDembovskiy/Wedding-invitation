document.addEventListener("DOMContentLoaded", () => {
    new FlipDown(1689417900, {
        theme: "dark",
        headings: ["Дней", "Часов", "Минут", "Секунд"],
      }).start();
    
    timerGroups = document.querySelectorAll(".rotor-group");
    timerGroups.forEach((item, i) => {
        let div = document.createElement("div");
        div.classList.add("timer__heading");
        if (i == 0) {
            div.innerHTML = "Дней";
        } else if (i == 1) {
            div.innerHTML = "Часов";
        } else if (i == 2) {
            div.innerHTML = "Минут";
        } else if (i == 3) {
            div.innerHTML = "Секунд";
        }
        item.appendChild(div);
    });
    
    const locationPhotosWrapper = document.querySelector(".location__photos");
    const locationHover = document.querySelector(".location__hover");
    const firstPhoto = document.querySelector(".location__img_1");
    const secondPhoto = document.querySelector(".location__img_2");
    const thirdPhoto = document.querySelector(".location__img_3");
    const photos = document.querySelectorAll(".gallery__img");


    function changePos(x1, y1, d1, x2, y2, d2, x3, y3, d3) {
        locationHover.addEventListener("mouseover", (e) => {
            firstPhoto.style.transform = `translate(${x1}px, ${y1}px) rotate(${d1}deg)`;
            secondPhoto.style.transform = `translate(${x2}px, ${y2}px) rotate(${d2}deg)`;
            thirdPhoto.style.transform = `translate(${x3}px, ${y3}px) rotate(${d3}deg)`;
        });
        
        locationHover.addEventListener("mouseout", (e) => {
            firstPhoto.style.transform = "translate(0, 0) rotate(5deg)";
            secondPhoto.style.transform = "translate(0, 0) rotate(0)";
            thirdPhoto.style.transform = "translate(0, 0) rotate(-5deg)";
        });
    }

    function galleryPhotosListeners() {
        photos.forEach(item => {
            item.addEventListener("click", () => {
                if(item.classList.contains("gallery__img_3") || item.classList.contains("gallery__img_6") || item.classList.contains("gallery__img_9")) {
                    if (!item.classList.contains("big-open")) {
                        photos.forEach(photo => {
                            photo.classList.remove("small-open");
                            photo.classList.remove("big-open");
                            photo.style.zIndex = 1;
                        });
                        item.classList.add("big-open");
                        item.style.zIndex = 2;
                    } else {
                        item.classList.remove("big-open");
                        setTimeout(() => {
                            item.style.zIndex = 1;
                        }, 500)
                    }
                } else {
                    if (!item.classList.contains("small-open")) {
                        photos.forEach(photo => {
                            photo.classList.remove("small-open");
                            photo.classList.remove("big-open");
                            photo.style.zIndex = 1;
                        });
                        item.classList.add("small-open");
                        item.style.zIndex = 2;
                    } else {
                        item.classList.remove("small-open");
                        setTimeout(() => {
                            item.style.zIndex = 1;
                        }, 500)
                    }
                }
            });
        });
    }

    galleryPhotosListeners();

    if (window.matchMedia('(min-width: 1201px) and (max-width: 1500px)').matches) {
        changePos(50, 10, -10,
                -420, -40, -10,
                -340, 300, 20);
    } else if (window.matchMedia('(min-width: 992px) and (max-width: 1200px)').matches) {
        changePos(10,10,10,-390,0,10,-340,300,-15);
    } else if (window.matchMedia('(min-width: 768px) and (max-width: 1200px)').matches) {
        locationHover.style.display = "none";
        document.querySelectorAll(".location__img").forEach(item => {
            item.addEventListener("click", () => {
                locationPhotosWrapper.classList.toggle("disclosed"); 
            });
        });
    } else if (window.matchMedia('(min-width: 576px) and (max-width: 767px)').matches) {
        locationHover.style.display = "none";
        document.querySelectorAll(".location__img").forEach(item => {
            item.addEventListener("click", () => {
                locationPhotosWrapper.classList.toggle("disclosed"); 
            });
        });
    
    } else if (window.matchMedia('(max-width: 575px)').matches) {
        locationHover.style.display = "none";
        document.querySelectorAll(".location__img").forEach(item => {
            item.addEventListener("click", () => {
                locationPhotosWrapper.classList.toggle("disclosed"); 
            });
        });
    
    } else {
        changePos(40, 10, -12,
            -800, 100, 10,
            -240, 400, 8);
    }
    
    /* Подтверждение присутствия */
    const form = document.querySelector(".form__form");
    let formAddButton = document.querySelector(".form__add-button");
    let formConfirmButton = document.querySelector(".form__button");
    let personeNum = 1;
    const formSpinner = document.querySelector(".form__spinner");



    formAddButton.addEventListener("click", function listener() {
        personeNum++;
        const inputName = document.createElement("input");
        const inputSurname = document.createElement("input");

        inputName.name = "name[]";
        inputName.placeholder = "Имя";
        inputName.type = "text";
        inputName.dataset.number = personeNum;
        inputName.required = true;
        inputName.style.cssText = `
            border-radius: 0; 
            opacity: 0;
        `;

        inputSurname.name = "surname[]";
        inputSurname.placeholder = "Фамилия";
        inputSurname.type = "text";
        inputSurname.dataset.number = personeNum;
        inputSurname.required = true;

        if (window.matchMedia('(max-width: 575px)').matches) {
            inputName.style.cssText = `
                border-radius: 0 5px 5px 0; 
                opacity: 0;
            `;
            inputSurname.style.cssText = `
                border-radius: 5px 0 0 5px; 
                opacity: 0;
            `;
        } else {
            inputName.style.cssText = `
                border-radius: 0; 
                opacity: 0;
            `;
            inputSurname.style.cssText = `
                border-radius: 0; 
                opacity: 0;
            `;
        }
        form.appendChild(inputSurname);
        form.appendChild(inputName);
        document.querySelectorAll(`[data-number="${personeNum}"]`).forEach(item => {
            setTimeout(() => {
                item.style.opacity = 1;
            }, 0)
        });
        if (personeNum == 2) {
            formConfirmButton.style.opacity = 0;
            setTimeout(() => {
                formConfirmButton.innerHTML = "Мы будем!"
                formConfirmButton.style.opacity = 1;
            }, 200)
        } else if (personeNum == 10){
            formAddButton.removeEventListener("click", listener)
        }

    });



    new WOW().init();


    /* mailer */

    $("form").submit(function(e) {
        e.preventDefault();
        formSpinner.style.display = "block";

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            personeNum = 1;
            form.innerHTML=`
                <input name="surname[]" placeholder="Фамилия" type="text" data-number="1" required>
                <input name="name[]" placeholder="Имя" type="text" data-number="1" required>
                <button type="submit" class="form__button">Я буду!</button>
            `;
            formSpinner.style.display = "none";
            openModal(modal);
            formConfirmButton = document.querySelector(".form__button");
            formAddButton = document.querySelector(".form__add-button");
        $(this).find("input").val("");
        $("form").trigger("reset");
        });
        return false;
    });

    /* menu */
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");
    const menuBlock = menu.querySelector(".menu__block");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("hamburger__close");
        menu.classList.toggle("menu__active");

    });

    menu.addEventListener("click", e => {
        if (!e.target.classList.contains("menu__block")){
            hamburger.classList.toggle("hamburger__close");
            menu.classList.toggle("menu__active");
        }
    });

    
    /* Modal */
    const modal = document.querySelector(".modal");
    const modalClose = document.querySelector(".modal__close");
    const nav = document.querySelector(".nav");

    function closeModal(modal) {
        modal.style.opacity = 0;
        setTimeout(() => {
            modal.style.visibility = 'hidden';
        }, 100);
        if (window.matchMedia('(min-width: 992px)').matches) {
            nav.style.display = "flex";
        } 

        document.body.style.position = '';
        document.body.style.top = '';
    }
    function openModal(modal) {
        modal.style.visibility = 'visible'
        modal.style.opacity = 1;
        if (window.matchMedia('(min-width: 992px)').matches) {
            nav.style.display = "none";
        } 
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;
    }

    modal.addEventListener("click", (e)=> {
        if (e.target.classList.contains("modal__content") || e.target.classList.contains("modal__close")) {
            closeModal(modal);
        }
    })
});

window.addEventListener("load", () => {
    $('.gallery__slider').slick({
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        touchThreshold: 30,
        adaptiveHeight: true,
        responsive: [

            {
                breakpoint: 767,
                settings: {
                    dots: true,
                    dotsClass: "gallery__slider-dots",
                    arrows: false,

                }
            }
        ]
    });
});










// $(document).ready(function(){

// });
