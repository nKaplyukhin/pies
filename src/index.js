import "./styles/styles.scss";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";

const BURGER_BUTTTON_CLASS = "burger__button";
const ACTIVE_BURGER_BUTTTON_CLASS = "burger__button_active";

const BURGER_MENU_CLASS = "burger-menu";
const ACTIVE_BURGER_MENU_CLASS = "burger-menu_active";

const COLLECTION_SWIPER_CLASS = "collection__swiper";
const COLLECTION_ITEM_CLASS = "collection__item";
const COLLECTION_IMAGE_CLASS = "collection__image";

const CATALOG_ITEM_CLASS = "catalog__gallery-item";
const CATALOG_IMAGE_CLASS = "catalog__gallery-image";

const REVIEWS_SWIPER_CLASS = "reviews__swiper";

const IMAGE_MODAL_CLASS = "image-modal";
const IMAGE_MODAL_BUTTON_CLASS = "image-modal__button";
const IMAGE_MODAL_BUTTON_BACK_CLASS = `${IMAGE_MODAL_BUTTON_CLASS}_back`;
const IMAGE_MODAL_BUTTON_FORWARD_CLASS = `${IMAGE_MODAL_BUTTON_CLASS}_forward`;
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
    ? parent.querySelectorAll(addDotToClassName(className))
    : document.querySelectorAll(addDotToClassName(className));

const initSwipers = () => {
  new Swiper(addDotToClassName(COLLECTION_SWIPER_CLASS), {
    modules: [Autoplay],
    loop: true,
    slidesPerView: 1.5,
    spaceBetween: 3,
    breakpoints: {
      1024: {
        spaceBetween: 16,
        slidesPerView: 5,
      },
    },
    grabCursor: true,
    speed: 5000,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
  });
  new Swiper(addDotToClassName(REVIEWS_SWIPER_CLASS), {
    modules: [Autoplay],
    loop: true,
    slidesPerView: 1.5,
    spaceBetween: 3,
    breakpoints: {
      1024: {
        spaceBetween: 16,
        slidesPerView: 5,
      },
    },
    grabCursor: true,
    speed: 5000,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
  });

  new Swiper(addDotToClassName(ABOUT_ME_SWIPER_CLASS), {
    modules: [Autoplay],
    loop: true,
    speed: 2000,
    slidesPerView: 1,
    autoplay: {
      delay: 1000,
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

// const urlParams = new URLSearchParams(window.location.search);

// console.log(urlParams.get("suka"));


const collectionImages = classSelectorAll(COLLECTION_ITEM_CLASS);
const catalogImages = classSelectorAll(CATALOG_ITEM_CLASS);

const openImageModal = (index, imageClass, items) => {
  let currenImage = classSelector(
    imageClass,
    items[index]
  );

  if (!currenImage) {
    return;
  }

  const modal = classSelector(IMAGE_MODAL_CLASS);
  const image = classSelector(IMAGE_MODAL_ITEM_CLASS, modal);

  let imageIndex = index;
  modal.classList.add(IMAGE_MODAL_ACTIVE_CLASS);
  modal.addEventListener("click", (e) => {
    const classList = e.target.classList;
    let newImage = currenImage;

    if (
      classList.contains(IMAGE_MODAL_BUTTON_FORWARD_CLASS) &&
      imageIndex < items.length - 1
    ) {
      imageIndex += 1;
    }
    if (classList.contains(IMAGE_MODAL_BUTTON_BACK_CLASS) && imageIndex > 0) {
      imageIndex -= 1;
    }
    newImage = classSelector(
      imageClass,
      items[imageIndex]
    );

    if (newImage) {
      image.src = newImage.src;
    }

    const isDisable =
      classList.contains(IMAGE_MODAL_ITEM_CLASS) ||
      classList.contains(IMAGE_MODAL_BUTTON_CLASS);

    if (isDisable) {
      return;
    }
    modal.classList.remove(IMAGE_MODAL_ACTIVE_CLASS);
  });

  image.src = currenImage.src;
};

collectionImages.forEach((item, index) => {
  item.addEventListener("click", () => {
    openImageModal(index, COLLECTION_IMAGE_CLASS, collectionImages);
  });
});

catalogImages.forEach((item, index) => {
  item.addEventListener("click", () => {
    openImageModal(index, CATALOG_IMAGE_CLASS, catalogImages);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  initSwipers();
  initBurger();
});
