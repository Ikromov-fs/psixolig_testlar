<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
import {defineComponent, onMounted} from "vue";
import axios from "@/plugins/axios"

import {ref} from "vue"

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
      perPage: 1,
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

    let slides = ref([])
       function getNews() {
           axios.get("news/get-all").then((res)=>{
               console.log(res.data)
               slides.value = res.data
           })
               .catch((err)=>{
                   console.log(err)
               })
      }
    onMounted(()=>{
        getNews()
      const btn = document.querySelector('.splide__arrow--next')
        console.log(btn)
        // btn.addEventListener("click",function (){
        //     alert("click")
        // })
        setTimeout(()=>{

        btn.click()
        },200)
    })
    return { options, props , slides };
  },
});
</script>
<template>
  <div class="py-5">
    <div class="container mx-auto">
      <Splide :options="options" aria-label="My Favorite Images">
<!--          <pre>{{slides}}</pre>-->
        <SplideSlide
          v-for="item in slides"
          :key="item.id"
          class="rounded-md overflow-hidden cursor-pointer"
        >
          <a :href="item?.link" target="_blank">
            <img
              :src="item?.image?.url"
              alt="image"
              class="w-[100%] sx:h-[250px] ss:h-[300px] mmd:h-[500px]"
            />
          </a>
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>
<style scoped></style>
