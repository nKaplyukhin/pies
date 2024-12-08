import "./styles/styles.scss";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";

const BURGER_BUTTTON_CLASS = "burger__button"
const ACTIVE_BURGER_BUTTTON_CLASS = "burger__button_active"

const BURGER_MENU_CLASS = "burger-menu"
const ACTIVE_BURGER_MENU_CLASS = "burger-menu_active"

const SWIPER_CLASS = "collection__swiper"

const addDotToClassName = (className) => `.${className}`
const classSelector = (className) => document.querySelector(addDotToClassName(className))

const initSwiper = () => {
  new Swiper(addDotToClassName(SWIPER_CLASS), {
    modules: [Autoplay],
    loop: true,

    slidesPerView: 3,
    spaceBetween: 5,

    breakpoints: {
      1024: {
        spaceBetween: 16,
        slidesPerView: 5,
      },
    },

    autoplay: {
      delay: 3000,
    },
  });

}

const initBurger = () => {
  const burgerButton = classSelector(BURGER_BUTTTON_CLASS)
  const burgerMenu = classSelector(BURGER_MENU_CLASS)

  burgerButton.addEventListener("click", (e) => {
    if (burgerButton.classList.contains(ACTIVE_BURGER_BUTTTON_CLASS)) {
      burgerButton.classList.remove(ACTIVE_BURGER_BUTTTON_CLASS)
      burgerMenu.classList.remove(ACTIVE_BURGER_MENU_CLASS)
      document.body.style.overflow = null;
      return
    }

    burgerButton.classList.add(ACTIVE_BURGER_BUTTTON_CLASS)
    burgerMenu.classList.add(ACTIVE_BURGER_MENU_CLASS)
    document.body.style.overflow = "hidden";
  })
}

document.addEventListener("DOMContentLoaded", () => {
  initSwiper()
  initBurger()
})