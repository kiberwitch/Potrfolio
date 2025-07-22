document.addEventListener("DOMContentLoaded", function () {
  // Инициализация вертикального Swiper
  const verticalSwiper = new Swiper(".vertical-swiper", {
    direction: "vertical",
    slidesPerView: 1,
    mousewheel: true,
    touchEventsTarget: "container",
    allowTouchMove: true,
    freeMode: false,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.3,
    longSwipesMs: 300,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    speed: 800,
    effect: "slide",
    on: {
      init: function () {
        animateSlideElements(this.slides[this.activeIndex]);
      },
      slideChange: function () {
        animateSlideElements(this.slides[this.activeIndex]);
        playSoundWithCooldown(slideSound);
      },
    },
  });

  // Инициализация горизонтального Swiper для проектов
  const horizontalSwiper = new Swiper(".horizontal-swiper", {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    keyboard: {
      enabled: true,
    },
    effect: "slide",
    speed: 600,
    on: {
      init: function () {
        animateArrows();
      },
      slideChange: function () {
        animateArrows();
        playSoundWithCooldown(iconSound);
      },
    },
  });

  function animateArrows() {
    const prevArrow = document.querySelector(".swiper-button-prev");
    const nextArrow = document.querySelector(".swiper-button-next");

    if (prevArrow && nextArrow) {
      prevArrow.style.transform = "scale(0.9)";
      nextArrow.style.transform = "scale(0.9)";

      setTimeout(() => {
        prevArrow.style.transform = "scale(1)";
        nextArrow.style.transform = "scale(1)";
      }, 200);
    }
  }

  const prevArrow = document.querySelector(".swiper-button-prev");
  const nextArrow = document.querySelector(".swiper-button-next");

  if (prevArrow) {
    prevArrow.addEventListener("mouseenter", function () {
      this.style.opacity = "1";
      this.style.transform = "scale(1.1)";
      playSoundWithCooldown(iconSound);
    });

    prevArrow.addEventListener("mouseleave", function () {
      this.style.opacity = "0.7";
      this.style.transform = "scale(1)";
    });
  }

  if (nextArrow) {
    nextArrow.addEventListener("mouseenter", function () {
      this.style.opacity = "1";
      this.style.transform = "scale(1.1)";
      playSoundWithCooldown(iconSound);
    });

    nextArrow.addEventListener("mouseleave", function () {
      this.style.opacity = "0.7";
      this.style.transform = "scale(1)";
    });
  }

  const iconSound = document.getElementById("icon-sound");
  const slideSound = document.getElementById("slide-sound");
  const skillSound = document.getElementById("skill-sound");
  const swipeSound = document.getElementById("swipe-sound");
  const errorSound = document.getElementById("error-sound");
  let lastSoundTime = 0;
  const soundCooldown = 500;

  function playSoundWithCooldown(soundElement) {
    const now = Date.now();
    if (now - lastSoundTime > soundCooldown) {
      try {
        soundElement.currentTime = 0;
        soundElement
          .play()
          .catch((e) => console.log("Автовоспроизведение заблокировано:", e));
        lastSoundTime = now;
      } catch (e) {
        console.error("Ошибка воспроизведения звука:", e);
      }
    }
  }

  function animateSlideElements(slide) {
    const elements = slide.querySelectorAll(
      ".planet-group, .neon-text, .skills-container, .icon, .projects-container, .contacts-container"
    );

    elements.forEach((el) => {
      el.style.animation = "none";
      void el.offsetWidth;

      if (el.classList.contains("planet-group")) {
        el.style.animation = `riseUp 1.5s ease-out forwards, groupFloat 3s ease-in-out infinite`;
        el.style.animationDelay = "0.5s";
      } else if (el.classList.contains("neon-text")) {
        if (el.classList.contains("intro-text")) {
          el.style.animation = "slideIn 1.5s ease-out 0.5s forwards";
        } else if (el.classList.contains("name-text")) {
          el.style.animation = "slideIn 1.5s ease-out 3s forwards";
        }
      } else if (
        el.classList.contains("skills-container") ||
        el.classList.contains("projects-container") ||
        el.classList.contains("contacts-container")
      ) {
        el.style.animation = "fadeInUp 1s ease-out 0.5s forwards";
      } else if (el.classList.contains("icon")) {
        if (el.classList.contains("left-icon")) {
          el.style.animation = "fadeInSlide 1.5s ease-out 2s forwards";
        } else if (el.classList.contains("right-icon")) {
          el.style.animation = "fadeInSlide 1.5s ease-out 2.5s forwards";
        }
      }
    });
  }

  function animateButton(button) {
    button.style.top = "50%";
    button.style.transform = "translate(-50%, -50%)";

    const buttonText = document.getElementById("button-text");
    if (buttonText) {
      buttonText.innerHTML =
        "Добро пожаловать в мое портфолио!<br>Я веб-разработчик с опытом создания современных интерактивных интерфейсов.";
    }

    button.style.transform = "translate(-50%, -50%) scale(0.95)";
    setTimeout(() => {
      button.style.transform = "translate(-50%, -50%) scale(1)";
    }, 100);
  }

  // Модифицированный обработчик клавиш
  document.addEventListener("keydown", function (e) {
    // Проверяем, находится ли фокус в текстовом поле
    const activeElement = document.activeElement;
    const isTextInput =
      activeElement.tagName === "TEXTAREA" ||
      (activeElement.tagName === "INPUT" &&
        ["text", "email"].includes(activeElement.type));

    // Если фокус в текстовом поле - пропускаем обработку Space
    if (isTextInput && e.code === "Space") {
      return;
    }

    if (e.key === "Enter" && verticalSwiper.activeIndex === 0) {
      e.preventDefault();
      const mainButton = document.getElementById("main-button");
      if (mainButton) {
        animateButton(mainButton);
        playSoundWithCooldown(iconSound);
      }
    }

    if (e.code === "Space") {
      e.preventDefault();
      verticalSwiper.slideNext();
    }
  });

  const mainButton = document.getElementById("main-button");
  if (mainButton) {
    mainButton.addEventListener("click", function () {
      animateButton(this);
      playSoundWithCooldown(iconSound);
    });
  }

  const contactsButton = document.getElementById("contacts-button");
  if (contactsButton) {
    let isContactsHovered = false;

    contactsButton.addEventListener("mouseenter", function () {
      if (!isContactsHovered) {
        playSoundWithCooldown(iconSound);
        isContactsHovered = true;
      }
    });

    contactsButton.addEventListener("mouseleave", function () {
      isContactsHovered = false;
    });

    contactsButton.addEventListener("click", function () {
      playSoundWithCooldown(iconSound);
      verticalSwiper.slideTo(3, 1000);
    });
  }

  const skillCards = document.querySelectorAll(".skill-card");
  skillCards.forEach((card) => {
    let isHovered = false;

    card.addEventListener("mouseenter", function () {
      if (!isHovered) {
        playSoundWithCooldown(skillSound);
        isHovered = true;
      }
    });

    card.addEventListener("mouseleave", function () {
      isHovered = false;
    });
  });

  const projectButtons = document.querySelectorAll(".project-details-btn");
  projectButtons.forEach((button) => {
    let isHovered = false;

    button.addEventListener("mouseenter", function () {
      if (!isHovered) {
        playSoundWithCooldown(iconSound);
        isHovered = true;
      }
    });

    button.addEventListener("mouseleave", function () {
      isHovered = false;
    });

    button.addEventListener("click", function () {
      playSoundWithCooldown(iconSound);

      const projectNumber =
        this.parentElement.querySelector(".project-number").textContent;
      const projectName =
        this.parentElement.querySelector(".project-name").textContent;

      const modal = document.createElement("div");
      modal.className = "project-modal";

      let description = "";
      let technologies = "HTML, CSS, JavaScript";

      if (projectNumber === "Проект-1") {
        description = `
                    🌐 Platton - Адаптивный лендинг для логистической платформы <br>
HTML5 CSS3 JavaScript Responsive Design Pixel Perfect <br> <br>

Профессиональный адаптивный лендинг для логистической платформы Platton с фокусом на пользовательском опыте и конверсии. Полностью адаптивный дизайн с продуманной семантической структурой.
<br> <br>
👉 Живая демонстрация
<br> <br>
💡 Ключевые характеристики <br> <br> 
Полностью адаптивный дизайн (Mobile First) <br> <br>
Семантическая вёрстка с акцентом на доступность <br> <br>
Оптимизированная производительность <br> <br>
Кастомные SVG-графики для карт и инфографики <br>  <br> 
Современные CSS-эффекты (плавные переходы, анимации) <br> <br> 
 <a href="https://kiberwitch.github.io/Angular/">Ссылка на проект</a>
                `;
        technologies = "HTML5, CSS3,";
      } else if (projectNumber === "Проект-2") {
        description = `
                  Описание
Статическая верстка многостраничного сайта для школы английского языка. Проект выполнен с использованием HTML и CSS без адаптивной верстки (desktop-only).
 <br><br>
Сайт включает несколько связанных страниц с общей стилизацией и навигацией между ними.
 <br><br>
Структура сайта <br><br>
Главная страница - информация о школе, преимущества <br><br>
О нас - миссия, преподаватели <br><br>
Курсы - список программ обучения <br><br>
Цены - таблица тарифов <br><br>
Контакты - форма обратной связи, карта <br><br>
Блог - статьи об изучении языка <br><br>

 <a href="https://kiberwitch.github.io/English-courses-website/">Ссылка на проект</a>

                `;
        technologies = "HTML5, CSS3";
      } else if (projectNumber === "Проект-3") {
        description = `
                  Статический  сайт цветочной мастерской Petalia,  
                   выполненный с использованием HTML и CSS. Проект представляет собой элегантную верстку 
                    для цветочного бутика с акцентом на эстетику и атмосферность. <br> <br> 
               
                     <a href="https://kiberwitch.github.io/Petalia-flower-shop/">Ссылка на проект</a>
                `;
        technologies = "HTML5, CSS3, JS";
      } else if (projectNumber === "Проект-4") {
        description = `
                    Верстка учебного проекта для доработки продажи билетов. Основные функции:
                    <br><br>
                    • Поиск и выбор рейсов<br>
                    • Система бронирования мест<br> <br>
                     <a href="https://kiberwitch.github.io/Train-booking-seats/">Ссылка на проект</a>
                `;
        technologies = "HTML5, CSS3";
      } else if (projectNumber === "Проект-5") {
        description = `
                    Верстка интерфейса на Vue.js с использованием Tailwind CSS. Особенности:
                    <br><br>
                    • Компонентный подход<br>
                    • Адаптивный дизайн<br>
                    • Интерактивные элементы<br>
                    • Поп-ап формы <br>
                    • Слайдер циклический <br>
                    • Оптимизация производительности  <br> <br>
                              <a href="https://kiberwitch.github.io/Vue-Tailwind/">Ссылка на проект</a>
                `;
        technologies = "HTML5, CSS3, JavaScript, Vue.js, Tailwind CSS";
      } else if (projectNumber === "Проект-6") {
        description = `
                    Создание интернет-меню для немецкой кофейни с нуля. Функционал:
                    <br><br>
                    • Категории блюд<br>
                    • Фильтрация по параметрам<br>
                    • Корзина заказов<br>
                    • Отправка данных о заказах<br>
                    • Оставление чаевых <br>
                    • Выбор допинногов <br>
                    • Адаптация под мобильные устройства <br> <br>
 <a href="   https://metimee.tilda.ws">Ссылка на проект</a>
                 
                `;
        technologies = "HTML5, CSS3, JavaScript";
      } else if (projectNumber === "Проект-7") {
        description = `
                    Внесение изменений в HTML-письмо для email-рассылки. Работа включала:
                    <br><br>
                    • Адаптацию под почтовые клиенты<br>
                    • Оптимизацию табличной верстки<br>
                    • Тестирование на различных устройствах<br>
                    • Исправление проблем с отображением <br> <br>
 <a href="https://kiberwitch.github.io/HTML_SMS/">Ссылка на проект</a>
                
                `;
        technologies = "HTML, CSS (inline styles), Email templates";
      } else if (projectNumber === "Проект-8") {
        description = `
                    Создание кастомного слайдера для платформы Tilda. Особенности:
                    <br><br>
                    • Адаптация под нужды клиента<br>
                    • Плавные анимации<br>
                    • Настройка управления<br> 
                    • Интеграция с существующим кодом
                `;
        technologies = "HTML5, CSS3, JavaScript, Tilda API";
      } else if (projectNumber === "Проект-9") {
        description = `
                    Создание продуктового лендинга с формой и слайдером. Функционал:
                    <br><br>
                    • Интерактивный слайдер товаров<br>
                    • Форма обратной связи<br>
                    • Анимации при скролле<br>
                    • Адаптация под мобильные устройства <br>  <br> 

                    <a href="https://kiberwitch.github.io/SAMOKAT/">Ссылка на проект</a>
                `;
        technologies = "HTML5, CSS3, JavaScript, Swiper.js, PHP";
      } else if (projectNumber === "Проект-10") {
        description = `
                    Доработка существующего лендинга. Выполненные задачи:
                    <br><br>
                    • Оптимизация скорости загрузки<br>
                    • Добавление новых секций<br>
                    • Исправление ошибок верстки<br>
                    • Улучшение адаптивности
 <br> <br>
                       <a href="https://kiberwitch.github.io/Vitaliti_Website/ ">Ссылка на проект</a>

                `;
        technologies = "HTML5, CSS3, JavaScript";
      } else if (projectNumber === "Проект-11") {
        description = `
                    Верстка интернет-магазина книг. Особенности проекта:
                    <br><br>
                    • Каталог с фильтрацией<br>
                    • Страница товара<br>
                    • Корзина покупок<br> <br> 
                     <a href="https://kiberwitch.github.io/Book_store/">Ссылка на проект</a>
                `;
        technologies = "HTML5, CSS3, JavaScript";
      } else if (projectNumber === "Проект-12") {
        description = `
                    Верстка сайта-визитки для юриста. Основные элементы:
                    <br><br>
                    • Информация о специалисте<br>
                    • Услуги и цены<br>
                    • Форма записи на консультацию<br>
                    • Адаптивный дизайн <br>  <br> 
                     <a href="https://kiberwitch.github.io/Site_business_ard_lawyer_Michelson/">Ссылка на проект</a>
                `;
        technologies = "HTML5, CSS3, JavaScript, Swiper.js";
      } else if (projectNumber === "Проект-13") {
        description = `
                    Лендинг для персонального астролога. Особенности:
                    <br><br>
                    • Анимированные элементы<br>
                    • Форма заказа гороскопа<br>
                    • Галерея отзывов<br>
                    • Адаптация под мобильные устройства
                `;
        technologies = "HTML5, CSS3, JavaScript";
      } else if (projectNumber === "Проект-14") {
        description = `
        Создание HTML-письма для инвестиционной компании. Особенности:
        <br><br>
        • Полная адаптация под почтовые клиенты<br>
        • Интерактивные элементы с fallback-решениями<br>
        • Оптимизированная табличная верстка<br>
        • Тестирование на 20+ почтовых клиентах<br>

    `;
        technologies = "HTML, CSS (inline styles), Email templates";
      } else if (projectNumber === "Проект-15") {
        description = `
        Создание сайта для магазина бижутерии на платформе Tilda. Функционал:
        <br><br>
        • Каталог с фильтрами<br>
        • Корзина и оформление заказа<br>
        • Адаптивный дизайн<br><br>
    `;
        technologies = "Tilda, HTML, CSS, JavaScript";
      } else if (projectNumber === "Проект-16") {
        description = `
        Разработка сайта для цветочного магазина на Tilda. Особенности:
        <br><br>
        • Онлайн-заказ букетов<br>
        • Календарь доставки<br>
        • Галлерея работ<br>
    `;
        technologies = "Tilda, HTML, CSS, JavaScript, Telegram API";
      } else if (projectNumber === "Проект-17") {
        description = `
        Вёрстка HTML-письма для винного магазина. Работа включала:
        <br><br>
        • Создание адаптивного дизайна<br>
        • Реализацию интерактивных элементов<br>
        • Тестирование на всех популярных клиентах<br>
        • Оптимизацию под мобильные устройства<br>
    `;
        technologies = "HTML, CSS (inline styles), Email templates";
      } else if (projectNumber === "Проект-18") {
        description = `
        Многостраничный сайт отеля в Новосибирске на Tilda. Функционал:
        <br><br>
        • Система бронирования номеров<br>
        • Календарь доступности<br>
        • Галерея номеров и услуг<br>
        • Интерактивная карта<br>
        • Попап-формы для заявок<br><br>
    `;
        technologies = "Tilda, HTML, CSS, JavaScript, Booking API";
      } else if (projectNumber === "Проект-19") {
        description = `
        Коррекция лендинга режиссера после работы другого программиста. Выполнено:
        <br><br>
        • Исправление ошибок верстки<br>
        • Оптимизация скорости загрузки<br>
        • Добавление недостающего функционала<br>
        • Исправление адаптивности<br>
        • Реализация правильных анимаций<br>
        • Интеграция с соцсетями<br><br>
        
    `;
        technologies = "HTML, CSS, JavaScript, GSAP";
      }

      modal.innerHTML = `
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <h2 class="modal-title">${projectName}</h2>
                    <p class="modal-tech"><strong>Использованные технологии:</strong> ${technologies}</p>
                    <p class="modal-description">${description}</p>
                </div>
            `;

      document.body.appendChild(modal);

      setTimeout(() => {
        modal.style.display = "flex";
        setTimeout(() => {
          modal.style.opacity = "1";
        }, 10);
      }, 10);

      const closeBtn = modal.querySelector(".modal-close");
      closeBtn.addEventListener("click", function () {
        modal.style.opacity = "0";
        setTimeout(() => {
          modal.style.display = "none";
          modal.remove();
        }, 300);
      });

      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          modal.style.opacity = "0";
          setTimeout(() => {
            modal.style.display = "none";
            modal.remove();
          }, 300);
        }
      });
    });
  });

  const feedbackForm = document.getElementById("feedback-form");

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const inputs = this.querySelectorAll("input, textarea");
      let hasErrors = false;

      // Валидация на клиенте
      inputs.forEach((input) => {
        const underline = input.nextElementSibling;
        input.classList.remove("error");

        if (!input.value.trim()) {
          input.classList.add("error");
          hasErrors = true;
        }

        if (input.type === "email" && !isValidEmail(input.value)) {
          input.classList.add("error");
          hasErrors = true;
        }
      });

      if (hasErrors) {
        playSoundWithCooldown(errorSound);
        this.style.animation = "shake 0.5s";
        setTimeout(() => {
          this.style.animation = "";
        }, 500);
        return;
      }

      playSoundWithCooldown(iconSound);

      // Отправка данных на сервер
      fetch("sendmail.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Успешная отправка
            const successMessage = document.createElement("div");
            successMessage.className = "form-success";
            successMessage.textContent = data.message;
            feedbackForm.appendChild(successMessage);

            feedbackForm.reset();

            successMessage.style.display = "block";

            setTimeout(() => {
              successMessage.style.opacity = "0";
              setTimeout(() => {
                successMessage.remove();
              }, 300);
            }, 5000);
          } else {
            // Ошибки сервера
            if (data.errors) {
              Object.keys(data.errors).forEach((key) => {
                const input = feedbackForm.querySelector(`[name="${key}"]`);
                if (input) {
                  input.classList.add("error");
                }
              });
            }

            const errorMessage = document.createElement("div");
            errorMessage.className = "form-error";
            errorMessage.textContent =
              data.message || "Произошла ошибка при отправке формы";
            feedbackForm.appendChild(errorMessage);

            setTimeout(() => {
              errorMessage.style.opacity = "0";
              setTimeout(() => {
                errorMessage.remove();
              }, 300);
            }, 5000);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Обработка ошибки сети и т.д.
        });
    });

    // Обработчики фокуса для подчеркиваний
    const inputs = feedbackForm.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      const underline = input.nextElementSibling;

      input.addEventListener("focus", () => {
        if (underline) underline.style.width = "100%";
        playSoundWithCooldown(iconSound);
        input.classList.remove("error");
      });

      input.addEventListener("blur", () => {
        if (underline) underline.style.width = "0";
      });
    });
  }

  document.body.addEventListener(
    "click",
    function unlockAudio() {
      iconSound
        .play()
        .then(() => {
          document.body.removeEventListener("click", unlockAudio);
        })
        .catch((e) => {
          console.log("Не удалось разблокировать аудио:", e);
        });
    },
    { once: true }
  );
});

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
