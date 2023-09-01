<template>
  <div
    data-aos="zoom-in-up"
    class="container relative grid mmd:grid-cols-2 sx:py-[55px] mmd:py-20"
  >

    <div class="flex sx:justify-center mmd:justify-start">

      <div @click="exit" class="absolute right-4 top-5 btn">
        <ButtonFill class="bg-[red]">
          Chiqish
          <i
            class="fa-solid fa-arrow-right-from-bracket rotate-[180deg] mx-2"
          ></i>
        </ButtonFill>
      </div>
      <div
        class="flex flex-col sx:justify-center mmd:justify-start text-center"
      >
        <img :src="profileImage" alt="profile image" class="cursor-pointer" />
        <h1 class="font-[500] text-[19px] mt-5">
          {{ data?.fullName }}
        </h1>
        <div class="text-left mt-5 relative">
          <p class="opacity-[0.5]">Telefon nomer:</p>
            <div @click="refresh" class="absolute right-4 top-5 btn">
                <ButtonFill class="bg-[red]">
                    TEst uchun
                    <i
                            class="fa-solid fa-arrow-right-from-bracket rotate-[180deg] mx-2"
                    ></i>
                </ButtonFill>
            </div>
          <h1 class="mt-2">{{ data?.username }}</h1>
          <!-- <div>
            <i
              class="fa-solid fa-pen cursor-pointer text-[blue] absolute right-1 top-2/3"
            ></i>
          </div> -->
        </div>
        <div class="flex gap-20 text-left mt-5">
          <div>
            <p class="opacity-[0.5]">Jinsi:</p>
            <h1 class="mt-2">{{ data?.gender ? `Erkak` : `Ayol` }}</h1>
          </div>
          <div>
            <p class="opacity-[0.5]">Tug'ilgan sana:</p>
            <h1 class="mt-2">{{ data?.birthDate }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="sx:mt-20 mmd:mt-0">
      <h1 class="flex justify-center text-[22px] font-[500] mb-5">
        Sotib olgan testlarim !
      </h1>
      <div class="grid grid-cols-1 mb-3 gap-3 relative">
        <div
          v-for="item in testList"
          :key="item?.id"
          @click="startTest(item?.id)"
          class="flex items-center justify-between py-5 px-10 h-full bg-[#1F2E35] text-white box-w rounded-md cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <!-- <i class="fa-solid fa-circle-question text-2xl"></i> -->
            <h1 class="text-[18px]">{{ item?.name }}</h1>
          </div>
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-signal"></i>
            <p>{{ item?.status }} %</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import profileImage from "../assets/svg/profil.svg";
import ButtonFill from "../components/buttons/SButton.vue";
import { useAuth } from "@/store/auth.js";
import { useToast } from "vue-toastification";
import axios from "@/plugins/axios.js";
const toast = useToast();
const store = useAuth();
const router = useRouter();

const data = ref();
async function getProfile() {
  try {
    const getData = await axios.get(`/user/current`);
    data.value = getData.data;
  } catch (error) {
    console.log(error);
  }
}

function refresh(){
    store.refreshToken()
}

// const getProfile = () => {
//   axios
//     .get(`/user/current`)
//     .then((res: any) => {
//       data.value = res.data;
//       console.log(res);
//     })
//     .catch((error: any) => {
//       console.log(error);
//     });
// };
onMounted(() => {
  getProfile();
})

const testList = [
  {
    id: 1,
    name: "Birinchi test",
    status: 50,
  },
  {
    id: 2,
    name: "Ikkinchi test",
    status: 80,
  },
  {
    id: 3,
    name: "Uchunchi test",
    status: 20,
  },
  {
    id: 4,
    name: "To'rtinchi test",
    status: 50,
  },
  {
    id: 5,
    name: "Beshinchi test",
    status: 50,
  },
  {
    id: 6,
    name: "Oltinchi test",
    status: 30,
  },
];

function startTest(id: number) {
  console.log(id);
  router.push(`/tester?id=${id}&index=1`);
}
function exit() {
  store.logOut();
  store.getToken();
  toast.success("Tizimdan chiqsingiz !");
  router.push("/");
}
</script>

<style scoped>
.box-w {
  transition: all 0.2s linear;
  box-shadow: 0px 0px 15px #fff;
  transform: scale(0.98);
}

.box-w:hover {
  box-shadow: 0px 0px 20px #fff;
  transition: all 0.2s linear;
  transform: scale(0.99);
}
.btn i {
  transition: all 0.2s linear;
}
.btn:hover i {
  transform: translateX(-7px);
  transition: all 0.2s linear;
}
</style>
