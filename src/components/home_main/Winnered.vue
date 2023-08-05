<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    Splide,
    SplideSlide,
  },
  props: {
    slider: {
      type: Array,
      default: () => [],
    },
    sliderTitle: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    props.slider;
    const options = {
      updateOnMove: true,
      type: "loop",
      autoplay: true,
      gap: "23px",
      perPage: 4,
      mediaQuery: "min",
      breakpoints: {
        320: {
          perPage: 1,
        },
        428: {
          perPage: 1,
        },
        768: {
          perPage: 3,
        },
        1024: {
          perPage: 4,
        },
      },
      perMove: 1,
      focus: "center",
    };
    return { options, props };
  },
});
</script>
<template>
  <div class="py-20">
    <div class="flex justify-center gap-1 text-lg mb-10">
      <span class="text-[#333]">03</span>
      <span class="text-[#333]">|</span>
      <span>Yutuqlar</span>
    </div>
    <div class="container mx-auto">
      <Splide :options="options" aria-label="My Favorite Images">
        <SplideSlide
          v-for="item in 4"
          :key="item?.id"
          class="bg-[#fff] rounded-md p-3"
        >
          <img
            src="https://www.illuminatingfaith.com/wp-content/uploads/2021/07/Coming-Persecution-of-Christians-In-America.jpg"
            alt="image"
            class="w-[60px] rounded-[50%] mx-auto block"
          />
          <h2 class="flex justify-center my-3 font-sans font-[600]">
            Nodir Ikromov
          </h2>
          <p>
            The Republic of Azerbaijan’s Religion Law and Administrative Code
            amendments of 2021 and 2022; how will this further suppress
          </p>
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>
<style scoped></style>
