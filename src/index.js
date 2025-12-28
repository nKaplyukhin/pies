import "./styles/styles.scss";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import {
  ACTIVE_BURGER_BUTTTON_CLASS,
  ACTIVE_BURGER_MENU_CLASS,
  BURGER_BUTTTON_CLASS,
  BURGER_MENU_CLASS,
  CATALOG_ACTIVE_TAB_CLASS,
  CATALOG_BUTTON_ACTIVE_CLASS,
  CATALOG_GALLERY_IMAGE_CLASS,
  CATALOG_GALLERY_LIST_CLASS,
  CATALOG_INNER_BUTTON_CLASS,
  CATALOG_INNER_LIST_CLASS,
  CATALOG_ITEM_CLASS,
  CATALOG_ITEM_HIDDEN_CLASS,
  CATALOG_LIST_CLASS,
  CATALOG_TAB_BUTTON_CLASS,
  CATALOG_TAB_CLASS,
  COLLECTION_IMAGE_CLASS,
  COLLECTION_LIST_CLASS,
  COLLECTION_SWIPER_CLASS,
  IMAGE_MODAL_ACTIVE_CLASS,
  IMAGE_MODAL_BUTTON_BACK_CLASS,
  IMAGE_MODAL_BUTTON_CLASS,
  IMAGE_MODAL_BUTTON_FORWARD_CLASS,
  IMAGE_MODAL_CLASS,
  IMAGE_MODAL_ITEM_CLASS,
  REVIEWS_SWIPER_CLASS
} from "./constants";

const filters = ["bento", "bomb", "tier", "girl", "boy", "woman", "man"]

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
  const burgerLinks = burgerMenu.querySelectorAll(".burger-menu__link")

  burgerLinks.forEach(item => {
    item.addEventListener("click", () => {
      burgerMenu.classList.remove(ACTIVE_BURGER_MENU_CLASS);
      burgerButton.classList.remove(ACTIVE_BURGER_BUTTTON_CLASS);
      document.body.style.overflow = null;
    })
  })

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

let modalClickHandler = null; // будем хранить ссылку на текущий обработчик

const openImageModal = async (index, path, items) => {

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
      image.removeAttribute("src")
      document.body.style.overflow = null;
      return;
    }


    // Навигация
    if (
      classList.contains(IMAGE_MODAL_BUTTON_FORWARD_CLASS) &&
      imageIndex < items.length - 1
    ) {
      imageIndex += 1;
    }
    if (classList.contains(IMAGE_MODAL_BUTTON_BACK_CLASS) && imageIndex > 0) { // ⚠️ было > 1, должно быть > 0
      imageIndex -= 1;
    }

    try {
      const newPath = items[imageIndex].getAttribute("data-src")
      image.src = newPath;
    } catch (err) {
      console.error("Image load failed:", err);
    }
  };

  // Добавляем новый обработчик
  modal.addEventListener("click", modalClickHandler);

  modal.classList.add(IMAGE_MODAL_ACTIVE_CLASS);
  document.body.style.overflow = "hidden";
  image.src = path;
};

if (collectionList) {
  const collectionImages = classSelectorAll(COLLECTION_IMAGE_CLASS);
  collectionImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      const path = img.getAttribute("data-src")
      openImageModal(index, path, collectionImages);
    })
  })
}

let imagesFilter = location.hash.slice(1) || "all"

const catalogInnerList = classSelector(CATALOG_INNER_LIST_CLASS)
const catalogGalleryList = classSelectorAll(CATALOG_GALLERY_LIST_CLASS)
const catalogItems = classSelectorAll(CATALOG_ITEM_CLASS)
const catalogInnerButtons = classSelectorAll(CATALOG_INNER_BUTTON_CLASS)

let imagesSize = 20

if (catalogGalleryList) {
  const catalogItems = classSelectorAll(CATALOG_ITEM_CLASS)

  catalogItems.forEach((img) => {
    img.addEventListener("click", () => {
      const path = img.getAttribute("data-src")
      let imagesFilter = location.hash.slice(1) || "all"

      const items = [...catalogItems].filter(item => {
        if (imagesFilter === "all" || imagesFilter === "cake")
          return filters.includes(item.getAttribute("data-link"))
        return item.getAttribute("data-link") === imagesFilter
      })
      const index = [...items].indexOf(img);

      openImageModal(index, path, items);
    })
  })
}

if (catalogInnerList) {
  const catalogList = classSelector(CATALOG_LIST_CLASS)
  const catalogTabs = classSelectorAll(CATALOG_TAB_CLASS)
  const catalogTabsButtons = classSelectorAll(CATALOG_TAB_BUTTON_CLASS)
  const catalog = document.getElementById("catalog")

  catalogInnerList.addEventListener("click", (e) => {
    const { target } = e
    if (target.classList.contains(CATALOG_INNER_BUTTON_CLASS)) {
      catalogInnerButtons.forEach(item => {
        item.classList.remove(CATALOG_BUTTON_ACTIVE_CLASS)
      })
      target.classList.add(CATALOG_BUTTON_ACTIVE_CLASS)

      const attribute = target.getAttribute("data-filter");

      window.location.href = `./catalog.html#${attribute}`

      imagesFilter = attribute

      catalog.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })

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

      window.location.href = `./catalog.html#${attribute}`

      catalog.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })

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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 77; // высота sticky header’а в пикселях
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth' // опционально: плавная прокрутка
      });
    }
  });
});

const footerLinks = () => {
  const tabLinks = document.querySelectorAll(".footer-link-tab-item")

  tabLinks.forEach(tabLink => {
    tabLink.addEventListener("click", (e) => {
      const tab = tabLink.getAttribute("data-link")
      window.location.href = `./catalog.html#${tab}`

    })
  })
}

footerLinks()

document.addEventListener("DOMContentLoaded", (e) => {
  if (window.location.href.includes("catalog")) {
    const currentHash = location.hash.slice(1);
    const tabTarget = document.querySelector(`[data-tab="${currentHash}"]`);
    const galleryFilterTarget = document.querySelector(`[data-filter="${currentHash}"]`);

    if (tabTarget) {
      const catalogTabsButtons = classSelectorAll(CATALOG_TAB_BUTTON_CLASS)
      const catalogTabs = classSelectorAll(CATALOG_TAB_CLASS)

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
      tabTarget.classList.add(CATALOG_BUTTON_ACTIVE_CLASS)

      catalogTabs.forEach(catalogTab => {

        const catalogItemAttribute = catalogTab.getAttribute("data-tab")
        if (catalogItemAttribute == currentHash) {
          catalogTab.classList.add(CATALOG_ACTIVE_TAB_CLASS)
        } else {
          catalogTab.classList.remove(CATALOG_ACTIVE_TAB_CLASS)
        }
      })
    } else if (galleryFilterTarget) {
      const catalogInnerButtons = classSelectorAll(CATALOG_INNER_BUTTON_CLASS)

      catalogInnerButtons.forEach(item => {
        item.classList.remove(CATALOG_BUTTON_ACTIVE_CLASS)
      })
      galleryFilterTarget.classList.add(CATALOG_BUTTON_ACTIVE_CLASS)

      imagesFilter = currentHash

      catalogItems.forEach(catalogItem => {
        const catalogItemAttribute = catalogItem.getAttribute("data-link")
        if (currentHash === 'all') {
          catalogItem.classList.remove(CATALOG_ITEM_HIDDEN_CLASS)
        }
        else if (catalogItemAttribute !== currentHash) {
          catalogItem.classList.add(CATALOG_ITEM_HIDDEN_CLASS)
        } else {
          catalogItem.classList.remove(CATALOG_ITEM_HIDDEN_CLASS)
        }
      })
    }

  }

  initSwipers();
  initBurger();
});
