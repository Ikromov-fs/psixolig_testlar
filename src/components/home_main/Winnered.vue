<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
import { defineComponent } from "vue";

const data = [
  {
    image:
      "https://media.licdn.com/dms/image/D4D03AQGOq3IJmSa5Wg/profile-displayphoto-shrink_800_800/0/1669657302377?e=1697068800&v=beta&t=gAu0KbjPQWFZAP8-89kVC9OoUAWudp2qsUIDUy8vKzM",
    name: "Shohruh Soatov",
    job: "Algaritm academy asoschisi",
    text: "Men bu sayt testlarini sotib oldim va bu men uchun ishimda, oilamada va hayotimda juda katta o'zgarishlarga (albatta ijobiy) sabab bo'ldi,hammaga tavsiya beraman",
    id: 1,
  },
  {
    image: "https://avatars.githubusercontent.com/u/115967219?v=4",
    name: "Nodir Ikromov",
    job: "Front end developer",
    text: "Men bu sayt testlarini sotib oldim va bu men uchun ishimda, oilamada va hayotimda juda katta o'zgarishlarga (albatta ijobiy) sabab bo'ldi,hammaga tavsiya beraman",
    id: 2,
  },
  {
    image: "https://avatars.githubusercontent.com/u/94363665?v=4",
    name: "Valisher Botirov",
    job: "Front end developer",
    text: "Men bu sayt testlarini sotib oldim va bu men uchun ishimda, oilamada va hayotimda juda katta o'zgarishlarga (albatta ijobiy) sabab bo'ldi,hammaga tavsiya beraman",
    id: 2,
  },
  {
    image: "https://avatars.githubusercontent.com/u/115967219?v=4",
    name: "Nodir Ikromov",
    job: "Front end developer",
    text: "Men bu sayt testlarini sotib oldim va bu men uchun ishimda, oilamada va hayotimda juda katta o'zgarishlarga (albatta ijobiy) sabab bo'ldi,hammaga tavsiya beraman",
    id: 2,
  },
  {
    image: "https://avatars.githubusercontent.com/u/94363665?v=4",
    name: "Valisher Botirov",
    job: "Front end developer",
    text: "Men bu sayt testlarini sotib oldim va bu men uchun ishimda, oilamada va hayotimda juda katta o'zgarishlarga (albatta ijobiy) sabab bo'ldi,hammaga tavsiya beraman",
    id: 2,
  },
];
export default defineComponent({
  components: {
    Splide,
    SplideSlide,
    data,
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
        550: {
          perPage: 2,
        },
        768: {
          perPage: 3,
        },
        1024: {
          perPage: 4,
        },
        1500: {
          perPage: 5,
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
  <div class="py-20">
    <div class="flex justify-center gap-1 text-lg mb-10">
      <span class="text-[#333]">03</span>
      <span class="text-[#333]">|</span>
      <span>Yutuqlar</span>
    </div>
    <h1 class="flex justify-center mb-10 font-[600] text-[20px]">
      Bizning aktiv o'quvchilarimiz !
    </h1>
    <div>
      <Splide :options="options" aria-label="My Favorite Images">
        <SplideSlide
          v-for="item in data"
          :key="item?.id"
          class="bg-[#fff] rounded-md p-3"
        >
          <div class="text-center">
            <img
              :src="item?.image"
              alt="image"
              class="w-[120px] rounded-[50%] mx-auto block"
            />
            <h2 class="flex justify-center my-3 text-xl  font-[600]">
              {{ item?.name }}
            </h2>
            <div class="flex flex-col text-[18px]">
              {{ item?.job }}
            </div>
            <p class="text-base">
              {{ item?.text }}
            </p>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>
<style scoped></style>
