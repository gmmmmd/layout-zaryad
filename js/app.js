window.addEventListener('DOMContentLoaded', function () {
  const choiseLangButton = document.querySelectorAll('.js-btn_lang_choise');
  
  choiseLangButton.forEach((i) => {
    i.addEventListener('click', () => {
      choiseLangButton.forEach(el => el.classList.remove('button__lang--active'));
      i.classList.add('button__lang--active');
    });
  });

  (function sendContactFormMessage() {
    const contactForm = document.forms.contactForm;
    const formInput = contactForm.querySelector('.js-input');
    const formFieldError = contactForm.querySelector('.contact-form__field');
    let isValidate = false;

    contactForm.addEventListener('submit', (e) => {
      sendMessage(e);
    });

    function sendMessage(e) {
      e.preventDefault();

      validateInput(formInput);

      validateOnFocus(formInput);

      if (isValidate) {
        submit()
      }      
    };

    function submit() {
      const data = getValueForm(contactForm);
      console.log(data);
      contactForm.reset();
      formFieldError.classList.add('access-input');
      formInput.nextElementSibling.textContent = 'Вы успешно подписались!';
      setTimeout(() => {
        formFieldError.classList.remove('access-input');
        formInput.nextElementSibling.textContent = '';
      }, 5000);
    };

    function validateInput(elem) {
      if (elem.name === 'email') {
        if(!validateEmail(elem.value) && elem.value !== '') {
          formFieldError.classList.add('error-input');
          formInput.nextElementSibling.textContent = 'Введите корректный e-mail';
          isValidate = false;
        } else if (!formInput.value) {          
          formFieldError.classList.add("error-input");
          formInput.nextElementSibling.textContent = `Введите ваш ${formInput.name}`;
          isValidate = false;          
        } else {
          formFieldError.classList.remove('error-input');
          formInput.nextElementSibling.textContent = '';
          isValidate = true;
        }
      }
    };

    function validateOnFocus(elem) {
      elem.addEventListener('focus', () => {
        formFieldError.classList.remove('error-input');
        formInput.nextElementSibling.textContent = '';
      })

      elem.addEventListener('blur', () => {
        validateInput(input);
      })
    }

  })();
  
  const heroSlider = new Swiper('.js-hero-slider', {
    direction: 'horizontal',
    loop: true,
    draggable: true,
    grabCursor: true,

    breakpoints: {
      375: {
        spaceBetween: 20,
      },
    },

    navigation: {
      nextEl: ".swiper-hero-button-next",
      prevEl: ".swiper-hero-button-prev",
    },
  });

  const productsSlider = new Swiper('.js-products-slider', {
    direction: 'horizontal',
    grabCursor: true,
    slidesPerView: 4,
    spaceBetween: 30,

    navigation: {
      nextEl: ".swiper-products-button-next",
      prevEl: ".swiper-products-button-prev",
    },
  });
});

function getValueForm(form) {
  const formData = new FormData(form);
  let formValues = {};

  formData.forEach((value, name) => {
      formValues[name] = value;
  });
  return formValues;
};

function validateEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(String(email).toLowerCase());
};
