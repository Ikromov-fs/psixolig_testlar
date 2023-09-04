<script lang="ts">
import { ref } from "vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
import { defineComponent } from "vue";
import profile from "@/assets/svg/profil.svg";
import axios from "@/plugins/axios.js";

async function getStudents() {
  try {
    const datas = await axios.get(`/active-students/get-all-active`);
    console.log(datas);
    data.value = datas.data;
  } catch (error) {
    console.log(error);
  }
}
getStudents();
const data = ref();
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
      gap: "25px",
      perPage: 1,
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
    return { options, props, data, profile };
  },
});
</script>
<template>
  <div class="sx:py-10 mmd:py-20 bg-[#fff5ee]">
    <div class="flex justify-center gap-1 text-lg sx:mb-5 mmd:mb-10">
      <span class="text-[#333]">03</span>
      <span class="text-[#333]">|</span>
      <span>Yutuqlar</span>
    </div>
    <h1 class="flex justify-center sx:mb-4 mmd:mb-10 font-[600] text-[20px]">
      Bizning aktiv o'quvchilarimiz !
    </h1>
    <div>
      <Splide :options="options" aria-label="My Favorite Images">
        <SplideSlide
          v-for="item in data"
          :key="item?.id"
          class="bg-[#fff] rounded-[15px] hover:bg-[#f9b234] cursor-pointer time overflow-hidden relative"
        >
          <div class="ag-courses-item_bg"></div>
          <div class="flex gap-5 p-5">
            <img
              :src="item?.image?.url"
              alt="image"
              class="w-[100px] h-[100px] rounded-[50%] object-cover"
            />
            <div class="flex flex-col justify-between">
              <h2 class="flex justify-center my-3 text-xl font-[600]">
                {{ item?.fullName }}
              </h2>
              <div>
                <span>ball: </span>
                {{ item?.score }}
              </div>
            </div>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>
<style scoped>
.ag-courses-item_bg {
  height: 128px;
  width: 128px;
  background-color: #f9b234;
  z-index: 1;
  position: absolute;
  top: -75px;
  right: -75px;
  overflow: hidden;
  border-radius: 50%;
  -webkit-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.time {
  -webkit-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
.time:hover .ag-courses-item_bg {
  z-index: 1;
  -webkit-transition: all 0.8s ease;
  transition-timing-function: ease-in-out;
  
  -o-transition: all 0.8s ease;
  transition: all 0.8s ease;
}
</style>
