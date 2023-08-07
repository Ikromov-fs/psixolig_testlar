<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
import { defineComponent } from "vue";
const data = [
  {
    image:"https://i.ytimg.com/vi/YaCiB6JZG9w/maxresdefault.jpg",
    id:1
  },
  {
    image:"https://cyberleninka.ru/article/n/psixologiya-va-inson/og",
    id:2
  },
  {
    image:"https://0701.static.prezi.com/preview/v2/eejgyo57k5qosc5xejjbesswp36jc3sachvcdoaizecfr3dnitcq_3_0.png",
    id:3
  },
]
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
    return { options, props, data };
  },
});
</script>
<template>
  <div class="py-5">
    <div class="container mx-auto">
      <Splide :options="options" aria-label="My Favorite Images">
        <SplideSlide
          v-for="item in data"
          :key="item?.id"
          class="rounded-md overflow-hidden cursor-pointer"
        >
          <div>
            <img
              :src="item?.image"
              alt="image"
              class="w-[100%] sx:h-[250px] ss:h-[300px] mmd:h-[500px]"
            />
          </div>
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>
<style scoped></style>
