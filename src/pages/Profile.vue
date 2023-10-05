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
        <div v-if="isImage">
          <BlockPreloader
            width="180px"
            height="180px"
            border-radius="50%"
            :loading="isLoadImages"
          >
            <img
              :src="data?.image?.url"
              alt="user image"
              class="w-[180px] h-[180px] rounded-[50%] object-cover"
            />
          </BlockPreloader>
        </div>
        <div v-if="!isImage">
          <UploadImage
            ref="removeImg"
            @getBase64="imageValu"
            line
            :img="imageValues"
            inputId="1"
            class="w-full"
          />
        </div>
        <h1 class="font-[500] text-[19px] text-left mt-5">
          {{ data?.fullName }}
        </h1>
        <div class="text-left mt-5 relative">
          <p class="opacity-[0.5]">Telefon nomer:</p>

          <h1 class="mt-2">{{ data?.username }}</h1>
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
        Yechgan testlarim !
      </h1>
      <div class="grid grid-cols-1 mb-3 gap-3" v-if="isLoadTest">
        <BlockPreloader
          :loading="isLoadTest"
          v-for="item in 4"
          :key="item"
          width="100%"
          height="90px"
          border-radius="6px"
        />
      </div>
      <div v-else class="grid grid-cols-1 mb-3 gap-3 relative">
        <div
          v-for="item in data?.results"
          :key="item?.id"
          @click="startTest(item?.testId)"
          class="flex items-center justify-between py-5 px-8 h-full bg-[#2F4F4F] text-white box-w rounded-md cursor-pointer gap-3"
        >
          <h1 class="text-[18px]">{{ item?.testName }}</h1>
          <div class="flex items-center gap-2 flex-shrink-0">
            <i class="fa-solid fa-signal"></i>
            <p>
              {{ item?.score }} <span v-if="item?.testType === `OLD`">%</span
              ><span v-else>ball</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ButtonFill from "../components/buttons/SButton.vue";
import { useAuth } from "@/store/auth.js";
import { useToast } from "vue-toastification";
import axios from "@/plugins/axios.js";
import UploadImage from "@/components/form/UploadImage.vue";
import BlockPreloader from "@/components/blockPreloader/BlockPreloader.vue";
const toast = useToast();
const store = useAuth();
const router = useRouter();
const data = ref();
const imageValue = ref();
const imageValues = ref("");
const isImage = ref(false);
function imageValu(e: any) {
  const formData = new FormData();
  formData.append("file", e);
  axios
    .post("media/upload", formData)
    .then((res: any) => {
      setTimeout(() => {
        postImage(res.data.id);
        getProfile();
      }, 100);
    })
    .catch(() => {
      toast.error("Rasm tanlanmadi, qayta tanlang !");
    });
}

async function postImage(item: any) {
  try {
    const datas = {
      fullName: data.value.fullName,
      gender: data.value.gender,
      birthDate: data.value.birthDate,
      imageId: `${item}`,
    };
    const image = await axios.post(`/user/update`, datas);
    imageValue.value = image.data;
    await getProfile();
    isImage.value = true;
  } catch (error) {
    console.log(error);
  }
}
async function getProfile() {
  try {
    const getData = await axios.get(`/user/current`);
    data.value = getData.data;
    if (getData?.data?.image?.id) {
      isImage.value = true;
    } else {
      isImage.value = false;
    }
  } catch (error) {
    console.log(error);
  }
}
const isLoadTest = ref(false);

const testList = ref([]);
// function fetchTestList() {
//   isLoadTest.value = true;
//   axios
//     .get("history/get-all-my-histories")
//     .then((res) => {
//       console.log(res.data, "list test");
//       testList.value = res.data;
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       isLoadTest.value = false;
//     });
// }

const isLoadImages = ref(false);
onMounted(() => {
  getProfile();
  // fetchTestList();
  isLoadImages.value = true;
  setTimeout(() => {
    isLoadImages.value = false;
  }, 2000);
});

function startTest(id: number) {
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
  box-shadow: 0 0 15px #fff;
  transform: scale(0.98);
}

.box-w:hover {
  box-shadow: 0 0 20px #fff;
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
