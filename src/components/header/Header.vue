<template>
  <div class="bg-[#1F2E35]">
    <div
      class="container mx-auto text-white flex justify-between items-center py-8"
    >
      <div class="cursor-pointer">
        <router-link to="/">Psixolig Test</router-link>
      </div>
      <ul
        class="hidden gap-5 items-center mmd:text-[15px] text-[13px] mmd:flex"
      >
        <li class="cursor-pointer relative navItem">
          <router-link to="/tests">Testlar</router-link>
        </li>
        <li>|</li>
        <li
          @click="() => router.push('/')"
          class="cursor-pointer relative navItem"
        >
          <a href="#winnered">Yutuqlar</a>
        </li>
        <li>|</li>
        <li
          @click="() => router.push('/')"
          class="cursor-pointer relative navItem"
        >
          <a href="#about">Biz haqimizda</a>
        </li>
        <li>|</li>
        <li
          @click="() => router.push('/')"
          class="cursor-pointer relative navItem"
        >
          <a href="#contact">Kontakt</a>
        </li>
        <li>|</li>
        <li
          v-if="false"
          @click="router.push('/profile')"
          class="relative navItem"
        >
          <i class="fa-solid fa-user cursor-pointer text-[21px]"></i>
        </li>
        <li
          @click="isLoginOpen = true"
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
      </div>
    </div>
    <div
      :class="
        isBurger
          ? 'top-0 fixed left-0 inline-block w-[100%] transition-all duration-500 bg-[#1F2E35]'
          : 'fixed top-0 left-0 z-50 w-[100%] h-full transition-all duration-500 transform -translate-x-full shadow-lg'
      "
    >
      <ul
        class="flex flex-col min-h-[100vh] relative gap-5 pt-20 items-center text-white sx:text-base mmd:text-[15px] text-[13px]"
      >
        <li @click="isOpenBurger" class="absolute right-7 top-7">
          <i :class="isBurger ? 'fa-solid fa-xmark text-2xl' : ''"></i>
        </li>
        <li class="cursor-pointer relative navItem">
          <router-link to="/tests"
            ><span @click="goRouter">Testlar</span></router-link
          >
        </li>
        <li @click="goRouter" class="cursor-pointer relative navItem">
          <a href="#winnered">Yutuqlar</a>
        </li>
        <li @click="goRouter" class="cursor-pointer relative navItem">
          <a href="#about">Biz haqimizda</a>
        </li>
        <li @click="goRouter" class="cursor-pointer relative navItem">
          <a href="#contact">Kontakt</a>
        </li>
        <li
          @click="isLoginOpen = true"
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
    <Login @openLoginModal="isLoginOpen = false" v-if="isLoginOpen" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();


// Register
import Register from "../modals/Register.vue";
const isRegister = ref(false);

// Login
import Login from "../modals/Login.vue";
const isLoginOpen = ref(false);

// Burger
const isBurger = ref(false);
function isOpenBurger() {
  isBurger.value = !isBurger.value;
}

function goRouter() {
  router.push("/");
  setTimeout(() => {
    isBurger.value = false;
  }, 10);
}
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
