<template>
  <div class="container">
    <div class="mt-2" v-if="!statusTest">

      <div class="flex items-center gap-3 pt-2">
        <i class="fa-solid fa-circle-question text-2xl"></i>
        <h2 class="font-medium text-xl">Psixologik testlar</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-12 mt-5 mb-2 gap-6">
        <div class="border md:col-span-8 flex flex-col justify-between p-4">
          <div>
            <div class="flex gap-2">
                <BlockPreloader v-if="isLoading" :loading="isLoading" width="100%" height="120px"/>
              <div class="flex flex-col gap-2" v-else>
                <img
                  v-if="testQuestions?.questionDTO?.image"
                  :src="testQuestions?.questionDTO?.image.url"
                  alt="test images"
                  class="max-h-[130px] object-contain w-full"
                />
                <p v-if="testQuestions?.questionDTO?.title">
                  {{ testQuestions?.questionDTO?.title }}.
                </p>
              </div>
            </div>
            <!--  single choice section-->
              <div class="flex flex-col gap-4 mt-4" v-if="isLoading">
                  <BlockPreloader :loading="isLoading" v-for="i in 4" :key="i" width="100%" height="50px"/>
              </div>
            <div v-else>
                <div
                        class="mt-3 flex flex-col gap-3"
                        v-if="testQuestions?.questionDTO?.testType == 'CHECKBOX'"
                >

                    <div
                            class="w-full py-3 px-2 border cursor-pointer relative"
                            v-for="(item, index) in testQuestions?.questionDTO
                  ?.answerDTOList"
                    >
                        <label
                                :for="`test${index + 1}`"
                                class="absolute w-full h-full cursor-pointer"
                        ></label>
                        <div class="flex gap-3">
                            <TypeRadio
                                    :input-id="`test${index + 1}`"
                                    :value="item.id"
                                    v-model="testQuestions.answers[0]"
                                    @isChange="changeRadioInput = true"
                            />
                            <img
                                    v-if="item?.image"
                                    :src="item?.image?.url"
                                    alt="test images"
                                    class="w-[70px] h-[70px] object-cover"
                            />
                            <p v-if="item?.text">{{ item?.text }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!--  multiple choice section-->

            <div v-if="!isLoading">
                <div
                        class="mt-3 flex flex-col gap-3"
                        v-if="testQuestions?.questionDTO?.testType == 'MULTIPLE_CHOICE'"
                >
                    <div
                            class="w-full py-3 px-2 border cursor-pointer relative"
                            v-for="(item, index) in testQuestions?.questionDTO
                  ?.answerDTOList"
                    >
                        <label
                                :for="`test${index + 1}`"
                                class="absolute w-full h-full cursor-pointer"
                        ></label>
                        <div class="flex gap-3">
                            <TypeCheckbox
                                    :input-id="`test${index + 1}`"
                                    @changeVal="(e) => (item.correct = e)"
                                    @isChange="changeCheckboxInput = true"
                                    :value="item.correct"
                            />
                            <img
                                    v-if="item?.image?.url"
                                    :src="item?.image?.url"
                                    alt="test images"
                                    class="w-[70px] h-[70px] object-cover"
                            />
                            <p v-if="item?.text">{{ item?.text }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!--  write choice section-->
            <div v-if="!isLoading">
                <div
                        class="mt-3 flex flex-col gap-3"
                        v-if="testQuestions?.questionDTO?.testType == 'CLOSE_QUESTIONS'"
                >
                    <div class="w-full py-3 px-2 border cursor-pointer relative">
                        <FormInput
                                label="Javobingizni yozing"
                                placeholder="Javobingizni kiriting..."
                                v-model="testQuestions.closeAnswer"
                        />
                    </div>
                </div>
            </div>
          </div>
          <div class="flex gap-3 justify-end mt-5">
            <SButton
              variant="dark"
              @click="fetchPrevQuestion(+activeTest)"
              :disabled="prevDisabled"
            >
              Oldingi
            </SButton>
            <SButton
              variant="dark"
              @click="fetchNextQuestion(+activeTest)"
              :disabled="nextDisabled"
            >
              Keyingi
            </SButton>
          </div>
        </div>
        <div class="border md:col-span-4 p-4">
          <div class="flex flex-wrap gap-2">
            <TestIndex
              v-for="(item, index) in testIndex"
              :key="index"
              :item="item"
              :index="index + 1"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-end my-3 mb-6">
        <SButton variant="danger" @click="finishTest">Testni yakunlash</SButton>
      </div>
    </div>
    <div v-else class="w-full h-[70vh] flex justify-center items-center">
      <div class="text-center">
        <p class="font-medium text-2xl">Testni yakunladingiz!</p>
        <p class="my-4 font-semibold text-3xl mb-6">{{ testResult }} %</p>
        <p class="my-4 text-3xl mb-6 sx:text-[16px] mmd:text-[22px]">
          {{ testFeedback }}
        </p>
        <div class="mmd:w-[50%] mx-auto">
          <ButtonFillVue>
            <router-link class="py-3 font-medium" to="/tests"
              >Testlar bo'limiga qaytish</router-link
            >
          </ButtonFillVue>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import TestIndex from "@/components/card/TestIndex.vue";
import SButton from "@/components/buttons/SButton.vue";
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import TypeRadio from "@/components/input/TypeRadio.vue";
import TypeCheckbox from "@/components/input/TypeCheckbox.vue";
import FormInput from "@/components/form/FormInput.vue";
import axios from "axios";
import ButtonFillVue from "@/components/buttons/ButtonFillVue.vue";
import { useToast } from "vue-toastification";
import BlockPreloader from "@/components/blockPreloader/BlockPreloader.vue";

const route = useRoute();
const router = useRouter();
const activeTest = ref(route.query.index);
const totalTest = ref(10);
const prevDisabled = ref(false);
const nextDisabled = ref(false);
const toast = useToast();

const testIndex = ref([]);

const changeRadioInput = ref(false);
const changeCheckboxInput = ref(false);

async function fetchTestQuestionAll() {
  axios
    .get(`process/questionsResults/${route.query.id}`)
    .then((res) => {
      console.log(res);
      testIndex.value = res.data;
      totalTest.value = res.data.length;
    })
    .catch((err) => {
      console.log(err);
      toast.error("Xatolik yuz berdi!");
    });
}

function fetchPrevQuestion(id: number) {
  if (id > 1) {
    id--;
    router.replace(`/tester?id=${route.query.id}&index=${id}`);
    // setAnswerTest()
  } else {
    prevDisabled.value = true;
  }
}

function fetchNextQuestion(id: number) {
  if (id < totalTest.value) {
    id++;
    router.replace(`/tester?id=${route.query.id}&index=${id}`);
    // setAnswerTest()
  } else {
    nextDisabled.value = true;
  }
}

watch(
  () => route.query.index,
  (newVal) => {
    activeTest.value = newVal;
    const testIndex = Number(newVal);

    setAnswerTest();
    solveTest(testIndex);
    setTimeout(() => {
      fetchTestQuestionAll();
    }, 1000);

    prevDisabled.value = false;
    nextDisabled.value = false;
  }
);

const testQuestions = ref([]);

function fetchAxios(obj) {
  axios
    .post("process/set-answer", obj)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      obj.closeAnswer = null;
      obj.answer = [];
      changeCheckboxInput.value = false;
      changeRadioInput.value = false;
    });
}

async function setAnswerTest() {
  const obj = {
    questionID: testQuestions.value.questionDTO?.id,
    closeAnswer: null,
    answers: <boolean[]>[],
  };

  if (testQuestions.value?.questionDTO?.testType == "CHECKBOX") {
    obj.answers = [+testQuestions.value.answers];
    if (changeRadioInput.value) {
      fetchAxios(obj);
    }
  } else if (testQuestions.value?.questionDTO?.testType == "MULTIPLE_CHOICE") {
    let changeArr = <boolean[]>[];
    testQuestions.value?.questionDTO?.answerDTOList.forEach((el) => {
      if (el.correct) {
        changeArr.push(el.id);
      }
    });
    obj.answers = changeArr;
    if (changeCheckboxInput.value) {
      fetchAxios(obj);
    }
  } else if (testQuestions.value?.questionDTO?.testType == "CLOSE_QUESTIONS") {
    obj.closeAnswer = testQuestions.value?.closeAnswer;
    if (testQuestions.value.closeAnswer) {
      fetchAxios(obj);
    }
  }
}

// solve test

const index = ref(route.query.index);

const isLoading = ref(false)
const isLoadOption = ref(false)
async function solveTest(index: number) {
    isLoading.value = true
    isLoadOption.value = true
  axios
    .get(`question/get-quiz?test-id=${route.query.id}&index=${index}`)
    .then((res) => {
      testQuestions.value = res.data;
      // if(res.data.questionDTO.testType == "CHECKBOX"){
      //     if(testQuestions.value.answers.length == 0){
      //         testQuestions.value.answers = null
      //     }
      //     else{
      //         testQuestions.value.answers = testQuestions.value.answers[0]
      //     }
      // }
    })
    .catch((err) => {
      console.log(err);
    }).finally(()=>{
        isLoading.value = false
      setTimeout(()=>{
          isLoadOption.value = false
      },1000)
  })
}

const statusTest = ref(false);
const testResult = ref(null);
const testFeedback = ref("");
function finishTest() {
  axios
    .post(`process/finish-test?testId=${route.query.id}`)
    .then((res) => {
      console.log(res);
      testResult.value = res.data.score;
      testFeedback.value = res.data.feedback;
      statusTest.value = true;
    })
    .catch((err) => {
      console.log(err);
    });
}

onMounted(() => {
  solveTest(Number(index.value));
  fetchTestQuestionAll();
});
</script>
