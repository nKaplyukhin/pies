import "./styles/styles.scss";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";

const BURGER_BUTTTON_CLASS = "burger__button";
const ACTIVE_BURGER_BUTTTON_CLASS = "burger__button_active";

const BURGER_MENU_CLASS = "burger-menu";
const ACTIVE_BURGER_MENU_CLASS = "burger-menu_active";

const COLLECTION_SWIPER_CLASS = "collection__swiper";
const COLLECTION_ITEM_CLASS = "collection__item";
const REVIEWS_SWIPER_CLASS = "reviews__swiper";

const CATALOG_INNER_LIST_CLASS = "catalog__inner-list"
const CATALOG_INNER_BUTTON_CLASS = "catalog__inner-button"
const CATALOG_LIST_CLASS = "catalog__list"
const CATALOG_TAB_BUTTON_CLASS = "catalog__tab-button"
const CATALOG_BUTTON_ACTIVE_CLASS = "catalog__button_active"
const CATALOG_TAB_CLASS = "catalog__tab"
const CATALOG_ACTIVE_TAB_CLASS = "catalog__tab_active"
const CATALOG_ITEM_CLASS = "catalog__gallery-item";
const CATALOG_ITEM_HIDDEN_CLASS = "catalog__gallery-item_hidden";

const IMAGE_MODAL_CLASS = "image-modal";
const IMAGE_MODAL_BUTTON_CLASS = "image-modal__button";
const IMAGE_MODAL_BUTTON_BACK_CLASS = `${IMAGE_MODAL_BUTTON_CLASS}_back`;
const IMAGE_MODAL_BUTTON_FORWARD_CLASS = `${IMAGE_MODAL_BUTTON_CLASS}_forward`;
const IMAGE_MODAL_ACTIVE_CLASS = `${IMAGE_MODAL_CLASS}_active`;
const IMAGE_MODAL_ITEM_CLASS = "image-modal__item";

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


const collectionImages = classSelectorAll(COLLECTION_ITEM_CLASS);
const catalogImages = classSelectorAll(CATALOG_ITEM_CLASS);

const openImageModal = async (index, imagePath, items) => {

  const currentImage = await import(`./assets/images/${imagePath}-${index}.webp`);

  if (!currentImage) {
    return;
  }

  const modal = classSelector(IMAGE_MODAL_CLASS);
  const image = classSelector(IMAGE_MODAL_ITEM_CLASS, modal);

  let imageIndex = index;
  modal.classList.add(IMAGE_MODAL_ACTIVE_CLASS);
  modal.addEventListener("click", async (e) => {
    const classList = e.target.classList;
    let newImage = currentImage;

    if (
      classList.contains(IMAGE_MODAL_BUTTON_FORWARD_CLASS) &&
      imageIndex < items.length - 1
    ) {
      imageIndex += 1;
    }
    if (classList.contains(IMAGE_MODAL_BUTTON_BACK_CLASS) && imageIndex > 1) {
      imageIndex -= 1;
    }
    // console.log(index, imageIndex);

    newImage = await import(`./assets/images/${imagePath}-${imageIndex + 1}.webp`);

    if (newImage) {
      image.src = newImage.default;
    }

    const isDisable =
      classList.contains(IMAGE_MODAL_ITEM_CLASS) ||
      classList.contains(IMAGE_MODAL_BUTTON_CLASS);

    if (isDisable) {
      return;
    }
    modal.classList.remove(IMAGE_MODAL_ACTIVE_CLASS);
  });

  image.src = currentImage.default;
};

collectionImages.forEach((item, index) => {
  item.addEventListener("click", () => {
    openImageModal(index + 1, "collection/toppings", collectionImages);
  });
});

catalogImages.forEach((item, index) => {
  item.addEventListener("click", () => {
    openImageModal(index + 1, "catalog/bento/bento", catalogImages);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  initSwipers();
  initBurger();
});


const catalogInnerList = classSelector(CATALOG_INNER_LIST_CLASS)
const catalogItems = classSelectorAll(CATALOG_ITEM_CLASS)
const catalogInnerButtons = classSelectorAll(CATALOG_INNER_BUTTON_CLASS)

catalogInnerList.addEventListener("click", (e) => {
  const { target } = e
  if (target.classList.contains(CATALOG_INNER_BUTTON_CLASS)) {
    catalogInnerButtons.forEach(item => {
      item.classList.remove(CATALOG_BUTTON_ACTIVE_CLASS)
    })
    e.target.classList.add(CATALOG_BUTTON_ACTIVE_CLASS)

    const attribute = target.getAttribute("data-link");

    catalogItems.forEach(catalogItem => {
      const catalogItemAttribute = catalogItem.getAttribute("data-link")
      if (attribute === 'all') {
        catalogItem.classList.remove(CATALOG_ITEM_HIDDEN_CLASS)
      }
      else if (catalogItemAttribute !== attribute) {
        catalogItem.classList.add(CATALOG_ITEM_HIDDEN_CLASS)
      } else {
        catalogItem.classList.remove(CATALOG_ITEM_HIDDEN_CLASS)
      }
    })
  }
})

const catalogList = classSelector(CATALOG_LIST_CLASS)
const catalogTabs = classSelectorAll(CATALOG_TAB_CLASS)
const catalogTabsButtons = classSelectorAll(CATALOG_TAB_BUTTON_CLASS)

catalogList.addEventListener("click", (e) => {
  const { target } = e
  if (target.classList.contains(CATALOG_TAB_BUTTON_CLASS)) {
    catalogItems.forEach(item => {
      item.classList.remove(CATALOG_ITEM_HIDDEN_CLASS)
    })
    catalogInnerButtons.forEach(item => {
      item.classList.remove(CATALOG_BUTTON_ACTIVE_CLASS)
    })
    catalogInnerButtons[0].classList.add(CATALOG_BUTTON_ACTIVE_CLASS)

    catalogTabsButtons.forEach(item => {
      item.classList.remove(CATALOG_BUTTON_ACTIVE_CLASS)
    })
    e.target.classList.add(CATALOG_BUTTON_ACTIVE_CLASS)

    const attribute = target.getAttribute("data-tab");

    catalogTabs.forEach(catalogTab => {

      const catalogItemAttribute = catalogTab.getAttribute("data-tab")
      if (catalogItemAttribute == attribute) {
        catalogTab.classList.add(CATALOG_ACTIVE_TAB_CLASS)
      } else {
        catalogTab.classList.remove(CATALOG_ACTIVE_TAB_CLASS)
      }
    })
  }

})