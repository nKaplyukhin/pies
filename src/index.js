import Swiper from "swiper";
import "./styles/styles.scss";
import { Autoplay } from "swiper/modules";

new Swiper(".collection__swiper", {
  modules: [Autoplay],
  loop: true,
  spaceBetween: 16,
  slidesPerView: 5,

  autoplay: {
    delay: 3000,
  },
});
