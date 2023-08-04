<template>
  <div class="bg-[#1F2E35]">
    <div
      class="container mx-auto text-white flex justify-between items-center py-8"
    >
      <div>Psixolig Test</div>
      <ul
        class="hidden gap-5 items-center mmd:text-[15px] text-[13px] mmd:flex"
      >
        <li class="cursor-pointer relative navItem">Home</li>
        <li>|</li>
        <li class="cursor-pointer relative navItem">Yangiliklar</li>
        <li>|</li>
        <li class="cursor-pointer relative navItem">Testlar</li>
        <li>|</li>
        <li class="cursor-pointer relative navItem">Biz haqimizda</li>
        <li>|</li>
        <li
          class="cursor-pointer relative border-solid border-white hover:border-[#fdf001] rounded-md px-5 py-2 border-[1px]"
        >
          Login
        </li>
        <li>|</li>
        <li
          @click="isRegister = true"
          class="cursor-pointer relative border-solid border-white hover:border-[#fdf001] rounded-md pr-4 pl-2 py-2 border-[1px] registr"
        >
          <i class="fa-solid fa-arrow-right-to-bracket mx-2 iconAn"></i>
          Register
        </li>
      </ul>
      <!-- Burger -->
      <div @click="isOpenBurger" class="mmd:hidden block">
        <i :class="isBurger ? '' : 'fa-solid fa-bars text-2xl'"></i>
        <i :class="isBurger ? 'fa-solid fa-xmark text-2xl' : ''"></i>
      </div>
    </div>
    <div
      :class="
        isBurger
          ? 'opacity-100 duration-200 scale-100'
          : 'hidden opacity-0 duration-200 scale-75'
      "
    >
      <ul
        class="flex flex-col h-[100vh] gap-5 pt-20 items-center text-white sx:text-base mmd:text-[15px] text-[13px]"
      >
        <li class="cursor-pointer relative navItem">Home</li>
        <li class="cursor-pointer relative navItem">Yangiliklar</li>
        <li class="cursor-pointer relative navItem">Testlar</li>
        <li class="cursor-pointer relative navItem">Biz haqimizda</li>
        <li
          class="cursor-pointer relative border-solid border-white rounded-md px-5 py-2 border-[1px] mt-20"
        >
          Login
        </li>
        <li
          @click="isRegister = true"
          class="cursor-pointer relative border-solid border-white rounded-md pr-4 pl-2 py-2 border-[1px] registr"
        >
          <i class="fa-solid fa-arrow-right-to-bracket mx-2 iconAn"></i>
          Register
        </li>
      </ul>
    </div>
    <Register @isOpenRegister="isRegister = false" v-if="isRegister" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

// Register
import Register from "../modals/Register.vue";

const isRegister = ref(false);

// Burger
const isBurger = ref(false);
function isOpenBurger() {
  isBurger.value = !isBurger.value;
}

function testFunction() {
  console.log("ishladi");
}

onMounted(() => {
  console.log("salom");
});
</script>
<style scoped>
.navItem::after {
  position: absolute;
  content: "";
  bottom: -5px;
  height: 3px;
  width: 100%;
  left: 0;
  top: 22px;
  background: #fdf001;
  border-radius: 2px;
  transition: 0.2s;
  transition-timing-function: ease-in-out;
  transform: scale(0);
}
.navItem:hover::after {
  transform: scale(110%);
}

.iconAn {
  transition: all 0.2s linear;
  transform: translateX(-4px);
}
.registr:hover .iconAn {
  transform: translateX(10px);
  transition: all 0.2s linear;
}
</style>
