import Swiper from "swiper";
import "./styles/styles.scss";
import { Autoplay } from "swiper/modules";

new Swiper(".collection__swiper", {
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
