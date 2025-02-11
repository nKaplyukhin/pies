import "./styles/styles.scss";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";

const BURGER_BUTTTON_CLASS = "burger__button";
const ACTIVE_BURGER_BUTTTON_CLASS = "burger__button_active";

const BURGER_MENU_CLASS = "burger-menu";
const ACTIVE_BURGER_MENU_CLASS = "burger-menu_active";

const COLLECTION_ITEM_CLASS = "collection__item";
const COLLECTION_IMAGE_CLASS = "collection__image";

const REVIEWS_SWIPER_CLASS = "reviews__swiper";

const IMAGE_MODAL_CLASS = "image-modal";
const IMAGE_MODAL_ACTIVE_CLASS = `${IMAGE_MODAL_CLASS}_active`;

const IMAGE_MODAL_ITEM_CLASS = "image-modal__item";

const ABOUT_ME_SWIPER_CLASS = "about-me__swiper";

const addDotToClassName = (className) => `.${className}`;
const classSelector = (className, parent) =>
  parent
    ? parent.querySelector(addDotToClassName(className))
    : document.querySelector(addDotToClassName(className));
const classSelectorAll = (className, parent) =>
  parent
    ? parent.querySelector(addDotToClassName(className))
    : document.querySelectorAll(addDotToClassName(className));

const initSwipers = () => {
  new Swiper(addDotToClassName(REVIEWS_SWIPER_CLASS), {
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

  new Swiper(addDotToClassName(ABOUT_ME_SWIPER_CLASS), {
    modules: [Autoplay],
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
    },
  });
};

const initBurger = () => {
  const burgerButton = classSelector(BURGER_BUTTTON_CLASS);
  const burgerMenu = classSelector(BURGER_MENU_CLASS);

  burgerButton.addEventListener("click", (e) => {
    if (burgerButton.classList.contains(ACTIVE_BURGER_BUTTTON_CLASS)) {
      burgerButton.classList.remove(ACTIVE_BURGER_BUTTTON_CLASS);
      burgerMenu.classList.remove(ACTIVE_BURGER_MENU_CLASS);
      document.body.style.overflow = null;
      return;
    }

    burgerButton.classList.add(ACTIVE_BURGER_BUTTTON_CLASS);
    burgerMenu.classList.add(ACTIVE_BURGER_MENU_CLASS);
    document.body.style.overflow = "hidden";
  });
};

const openImageModal = (src) => {
  const modal = classSelector(IMAGE_MODAL_CLASS);
  const image = classSelector(IMAGE_MODAL_ITEM_CLASS, modal);

  modal.classList.add(IMAGE_MODAL_ACTIVE_CLASS);
  modal.addEventListener("click", (e) => {
    if (e.target.className.includes(IMAGE_MODAL_ITEM_CLASS)) {
      return;
    }
    modal.classList.remove(IMAGE_MODAL_ACTIVE_CLASS);
  });

  image.src = src;

  modal.append(image);
};

const collectionImages = classSelectorAll(COLLECTION_ITEM_CLASS);

collectionImages.forEach((item) => {
  item.addEventListener("click", () => {
    const image = classSelector(COLLECTION_IMAGE_CLASS, item);
    openImageModal(image.src);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  initSwipers();
  initBurger();
});
