<template>
  <div class="bg-[#363636] rounded-bl-[20px] rounded-br-[20px]">
    <div
      class="container mx-auto text-[#fff] font-medium flex justify-between items-center py-8"
    >
      <div class="cursor-pointer">
        <router-link to="/"
          ><img :src="logo" alt="logo" class="max-w-[45px] object-cover"
        /></router-link>
      </div>
      <ul
        class="hidden gap-5 items-center md:text-[15px] lg:text-[18px] text-[13px] mmd:flex"
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
        <li v-if="store.isToken" @click="getStore" class="relative cursor-pointer" >
          <img :src="avatar" alt="avatar" class="w-[26px]" />
        </li>
        <li
          v-if="!store.isToken"
          @click="isLoginOpen = true"
          class="cursor-pointer relative border-solid border-white hover:border-[#fdf001] rounded-md px-5 py-2 border-[1px]"
        >
          Login
        </li>
        <li>|</li>
        <li
          v-if="!store.isToken"
          @click="actionOpenRegister"
          class="cursor-pointer relative border-solid border-white hover:border-[#fdf001] rounded-md pr-4 pl-2 py-2 border-[1px] registr"
        >
          <i class="fa-solid fa-arrow-right-to-bracket mx-2 iconAn"></i>
          Register
        </li>
      </ul>
      <!-- Burger -->
      <div @click="isOpenBurger" class="mmd:hidden block cursor-pointer">
        <img
          :src="burger"
          alt="Burger"
          :class="isBurger ? '' : 'w-[30px] duration-200'"
        />
      </div>
    </div>
    <div
      :class="
        isBurger
          ? 'top-0 fixed left-0 inline-block w-[100%] transition-all duration-500 bg-[#363636]'
          : 'fixed top-0 left-0 z-50 w-[100%] h-full transition-all duration-500 transform -translate-x-full shadow-lg'
      "
    >
      <ul
        class="flex flex-col min-h-[100vh] relative gap-5 justify-center items-center text-white sx:text-base mmd:text-[15px] text-[13px]"
      >
        <li @click="isOpenBurger" class="absolute right-7 top-7 cursor-pointer">
          <img
            :src="xlg"
            alt="exit"
            :class="isBurger ? 'w-[26px] font-bold' : ''"
          />
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
        <li v-if="store.isToken" @click="getStore" class="relative navItem">
          <img :src="avatar" alt="avatar" class="w-[26px]" />
        </li>
        <li
          v-if="!store.isToken"
          @click="isLoginOpen = true"
          class="cursor-pointer relative border-solid border-white rounded-md px-5 py-2 border-[1px] mt-20"
        >
          Login
        </li>
        <li
          v-if="!store.isToken"
          @click="actionOpenRegister"
          class="cursor-pointer relative border-solid border-white rounded-md pr-4 pl-2 py-2 border-[1px] registr"
        >
          <i class="fa-solid fa-arrow-right-to-bracket mx-2 iconAn"></i>
          Register
        </li>
      </ul>
    </div>
    <Register @isOpenRegister="openRegisterModalStore.isOpen = false" v-if="openRegisterModalStore.isOpen" />
    <Login @openLoginModal="isLoginOpen = false" v-if="isLoginOpen" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/store/auth.js";
import logo from "@/assets/image/psix-logo.png";
import burger from "@/assets/svg/burger.svg";
import xlg from "@/assets/svg/x-lg.svg";
import avatar from "@/assets/svg/avatar.svg";
const store = useAuth();
const router = useRouter();

// Register
import Register from "../modals/Register.vue";
const isRegister = ref(false);

// Login
import Login from "../modals/Login.vue";
import {useOpenRegisterModal} from "@/store/openRegisterModal.js";
const isLoginOpen = ref(false);
const openRegisterModalStore = useOpenRegisterModal()
function actionOpenRegister(){
  isRegister.value = true
  openRegisterModalStore.isOpen = true
  openRegisterModalStore.openRegisterModal()
}

// Burger
const isBurger = ref(false);
function isOpenBurger() {
  isBurger.value = !isBurger.value;
}

function getStore() {
  isBurger.value = false;
  router.push("/profile");
}
function goRouter() {
  router.push("/");
  setTimeout(() => {
    isBurger.value = false;
  }, 10);
}
onMounted(() => {
  store.getToken();
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
  top: 25px;
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
