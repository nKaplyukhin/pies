import "./styles/styles.scss";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";

const BURGER_BUTTTON_CLASS = "burger__button";
const ACTIVE_BURGER_BUTTTON_CLASS = "burger__button_active";

const BURGER_MENU_CLASS = "burger-menu";
const ACTIVE_BURGER_MENU_CLASS = "burger-menu_active";

const COLLECTION_LIST_CLASS = "collection__list"
const COLLECTION_SWIPER_CLASS = "collection__swiper";
const COLLECTION_ITEM_CLASS = "collection__item";
const COLLECTION_IMAGE_CLASS = "collection__image";
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
const CATALOG_GALLERY_LIST_CLASS = "catalog__gallery-list"
const CATALOG_GALLERY_IMAGE_CLASS = "catalog__gallery-image"

const IMAGE_MODAL_CLASS = "image-modal";
const IMAGE_MODAL_BUTTON_CLASS = "image-modal__button";
const IMAGE_MODAL_BUTTON_BACK_CLASS = `${IMAGE_MODAL_BUTTON_CLASS}_back`;
const IMAGE_MODAL_BUTTON_FORWARD_CLASS = `${IMAGE_MODAL_BUTTON_CLASS}_forward`;
const IMAGE_MODAL_ACTIVE_CLASS = `${IMAGE_MODAL_CLASS}_active`;
const IMAGE_MODAL_ITEM_CLASS = "image-modal__item";

const getIndexFromAlt = (alt) => {
  const [name, index] = alt.split("-")

  return {
    name, index: Number(index)
  }
}

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


const collectionList = classSelector(COLLECTION_LIST_CLASS);
const collectionImages = classSelectorAll(COLLECTION_IMAGE_CLASS);


let modalClickHandler = null; // будем хранить ссылку на текущий обработчик

const openImageModal = async (index, src, items) => {
  const currentImage = await import(`./assets/images/${src}-${index}.webp`);
  if (!currentImage) return;

  const modal = classSelector(IMAGE_MODAL_CLASS);
  const image = classSelector(IMAGE_MODAL_ITEM_CLASS, modal);

  // Удаляем предыдущий обработчик, если он есть
  if (modalClickHandler) {
    modal.removeEventListener("click", modalClickHandler);
  }

  let imageIndex = index;

  // Создаём новый обработчик
  modalClickHandler = async (e) => {
    const classList = e.target.classList;

    // Закрытие по клику вне изображения или на крестик и т.п.
    const isDisable =
      classList.contains(IMAGE_MODAL_ITEM_CLASS) ||
      classList.contains(IMAGE_MODAL_BUTTON_CLASS);

    if (!isDisable) {
      modal.classList.remove(IMAGE_MODAL_ACTIVE_CLASS);
      modal.removeEventListener("click", modalClickHandler);
      modalClickHandler = null;
      return;
    }


    // Навигация
    if (
      classList.contains(IMAGE_MODAL_BUTTON_FORWARD_CLASS) &&
      imageIndex < items.length
    ) {
      imageIndex += 1;
    }
    if (classList.contains(IMAGE_MODAL_BUTTON_BACK_CLASS) && imageIndex > 1) { // ⚠️ было > 1, должно быть > 0
      imageIndex -= 1;
    }

    try {
      const newImage = await import(`./assets/images/${src}-${imageIndex}.webp`);
      if (newImage?.default) {
        image.src = newImage.default;
        // Обновляем замыкание: новое значение index для следующего клика
        // Но это не сработает — замыкание фиксирует `index`!
      }
    } catch (err) {
      console.error("Image load failed:", err);
    }
  };

  // Добавляем новый обработчик
  modal.addEventListener("click", modalClickHandler);

  modal.classList.add(IMAGE_MODAL_ACTIVE_CLASS);
  image.src = currentImage.default;
};

if (collectionList) {
  collectionList.addEventListener("click", (e) => {
    const { target } = e
    const path = e.currentTarget.getAttribute("data-path")
    if (target.classList.contains(COLLECTION_IMAGE_CLASS)) {
      const { alt } = target
      const { index } = getIndexFromAlt(alt)

      console.log(path);

      openImageModal(index, path, collectionImages);
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  initSwipers();
  initBurger();
});

const catalogInnerList = classSelector(CATALOG_INNER_LIST_CLASS)
const catalogGalleryList = classSelectorAll(CATALOG_GALLERY_LIST_CLASS)
const catalogItems = classSelectorAll(CATALOG_ITEM_CLASS)
const catalogInnerButtons = classSelectorAll(CATALOG_INNER_BUTTON_CLASS)

if (catalogGalleryList) {
  catalogGalleryList.forEach(item => {
    item.addEventListener("click", (e) => {
      const { target } = e
      const path = e.currentTarget.getAttribute("data-path")
      if (target.classList.contains(CATALOG_GALLERY_IMAGE_CLASS)) {
        const { alt } = target
        const { name, index } = getIndexFromAlt(alt)

        openImageModal(index, `${path}/${name}`, catalogItems);
      }
    })
  })
}


if (catalogInnerList) {
  catalogInnerList.addEventListener("click", (e) => {
    const { target } = e
    if (target.classList.contains(CATALOG_INNER_BUTTON_CLASS)) {
      catalogInnerButtons.forEach(item => {
        item.classList.remove(CATALOG_BUTTON_ACTIVE_CLASS)
      })
      target.classList.add(CATALOG_BUTTON_ACTIVE_CLASS)

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
}

