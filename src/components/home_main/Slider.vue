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
          perPage: 1,
        },
        1024: {
          perPage: 1,
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
  <div class="py-10">
    <div class="container mx-auto">
      <Splide :options="options" aria-label="My Favorite Images">
        <SplideSlide v-for="item in 3" :key="item?.id" class="rounded-md overflow-hidden">
          <div>
            <img
              src="https://i.ytimg.com/vi/YaCiB6JZG9w/maxresdefault.jpg"
              alt="image"
              class="w-[100%] sx:h-[250px] ss:h-[500px] mmd:h-[600px]"
            />
          </div>
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>
<style scoped></style>
