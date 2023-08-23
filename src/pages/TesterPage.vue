<template>
  <div class="container">
    <div class="mt-2">
        <pre>{{testQuestions}}</pre>
      <div class="flex items-center gap-3 pt-2">
        <i class="fa-solid fa-circle-question text-2xl"></i>
        <h2 class="font-medium text-xl">Category name / Birinchi test</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-12 mt-5 mb-2 gap-6">
        <div class="border md:col-span-8 flex flex-col justify-between p-4">
          <div>
            <div class="flex gap-2">
              <div class="flex flex-col gap-2">
                <img
                  v-if="testQuestions?.questionDTO?.image"
                  :src="testQuestions?.questionDTO?.image.url"
                  alt="test images"
                  class="max-h-[130px] object-contain w-full"
                />
                <p v-if="testQuestions?.questionDTO?.title">{{ testQuestions?.questionDTO?.title }}.</p>
              </div>
            </div>
            <!--  single choice section-->
            <div
              class="mt-3 flex flex-col gap-3"
              v-if="testQuestions?.questionDTO?.testType == 'CHECKBOX'"
            >
              <div
                class="w-full py-3 px-2 border cursor-pointer relative"
                v-for="(item, index) in testQuestions?.questionDTO?.answerDTOList"
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
            <!--  multiple choice section-->
            <div
              class="mt-3 flex flex-col gap-3"
              v-if="testQuestions?.questionDTO?.testType == 'MULTIPLE_CHOICE'"
            >
              <div
                class="w-full py-3 px-2 border cursor-pointer relative"
                v-for="(item, index) in testQuestions?.questionDTO?.answerDTOList"
              >
                <label
                  :for="`test${index + 1}`"
                  class="absolute w-full h-full cursor-pointer"
                ></label>
                <div class="flex gap-3">
                  <TypeCheckbox
                    :input-id="`test${index + 1}`"
                    @changeVal="(e) => (item.val = e)"
                    :value="item.val"
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
            <!--  write choice section-->
            <div
              class="mt-3 flex flex-col gap-3"
              v-if="testQuestions.testType == 'WRITE_CHOICE'"
            >
              <div class="w-full py-3 px-2 border cursor-pointer relative">
                <FormInput
                  label="Javobingizni yozing"
                  placeholder="Javobingizni kiriting..."
                />
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

const route = useRoute();
const router = useRouter();
const activeTest = ref(route.query.index);
const totalTest = ref(10);
const prevDisabled = ref(false);
const nextDisabled = ref(false);

const testIndex = ref([])

function fetchTestQuestionAll(){
    axios.get(`progress/questionsResults/${route.query.id}`).then((res)=>{
        console.log(res)
        testIndex.value = res.data
        totalTest.value = res.data.length
    }).catch((err)=>{
        console.log(err)
    })
}

function fetchPrevQuestion(id: number) {
  if (id > 1) {
    id--;
    router.replace(`/tester?id=${route.query.id}&index=${id}`);
  } else {
    prevDisabled.value = true;
  }
}

function fetchNextQuestion(id: number) {
  if (id < totalTest.value) {
      setAnswerTest()
    id++;
    router.replace(`/tester?id=${route.query.id}&index=${id}`);
  } else {
    nextDisabled.value = true;
  }
}

watch(
  () => route.query.index,
  (newVal) => {
    activeTest.value = newVal;
    const testIndex = Number(newVal)
    solveTest(testIndex)
    prevDisabled.value = false;
    nextDisabled.value = false;
  }
);



// const testQuestions = reactive(
  // {
  //     id:1,
  //     testType:"SINGLE_CHOICE",
  //     title:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eos explicabo labore magnam nam qui reiciendis tempore tenetur totam! Corporis, est voluptatum. Beatae distinctio enim facere itaque, nobis officiis porro.",
  //     imageID:"https://picsum.photos/id/237/536/354",
  //     correctAnswers:[3],
  //     answerCreateDTOList:[
  //         {
  //             id:1,
  //             text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eos explicabo labore magna",
  //             imageID:"",
  //         },
  //         {
  //             id:2,
  //             text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eos explicabo labore magna",
  //             imageID:"https://picsum.photos/id/237/536/354",
  //         },
  //         {
  //             id:3,
  //             text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eos explicabo labore magna",
  //             imageID:"",
  //         },
  //         {
  //             id:4,
  //             text:"",
  //             imageID:"https://picsum.photos/id/237/536/354",
  //         }
  //     ]
  // }
  //   multiple_chhoice
  // {
  //   id: 1,
  //   testType: "MULTIPLE_CHOICE",
  //   title:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eos explicabo labore magnam nam qui reiciendis tempore tenetur totam! Corporis, est voluptatum. Beatae distinctio enim facere itaque, nobis officiis porro.",
  //   imageID: "https://picsum.photos/id/237/536/354",
  //   correctAnswers: [1, 3],
  //   answerCreateDTOList: [
  //     {
  //       id: 1,
  //       text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eos explicabo labore magna",
  //       imageID: "",
  //       val: true,
  //     },
  //     {
  //       id: 2,
  //       text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eos explicabo labore magna",
  //       imageID: "https://picsum.photos/id/237/536/354",
  //       val: false,
  //     },
  //     {
  //       id: 3,
  //       text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eos explicabo labore magna",
  //       imageID: "",
  //       val: false,
  //     },
  //     {
  //       id: 4,
  //       text: "",
  //       imageID: "https://picsum.photos/id/237/536/354",
  //       val: false,
  //     },
  //   ],
  // }
// );


const testQuestions = ref([])

function setAnswerTest(){
    const answer = {
        questionID:testQuestions.value.questionDTO?.id,
        answers : [+testQuestions.value.answers],
        blankAnswer:null
    }

    axios.post('progress/set-answer',answer).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })

    console.log(answer,"result")
}

function finishTest() {
  if (testQuestions.testType == "MULTIPLE_CHOICE") {
    let changeArr = [];
    testQuestions.answerCreateDTOList.forEach((el) => {
      if (el.val) {
        changeArr.push(el.id);
      }
    });
    testQuestions.changeAnsver = changeArr;
    console.log(testQuestions, "MULTIPLE CHOICE");
  }
  if (testQuestions.testType == "SINGLE_CHOICE") {
    console.log(testQuestions, "SINGLE CHOICE");
  }
  if (testQuestions.testType == "WRITE_CHOICE") {
    console.log(testQuestions, "WRITE    CHOICE");
  }
}

// solve test


const index = ref(1)
function solveTest(index:number){
    axios.get(`question/get-quiz?test-id=${route.query.id}&index=${index}`).then((res)=>{
        console.log(res)
        testQuestions.value = res.data
    }).catch((err)=>{
        console.log(err)
    })
}

function isCheckMultipleQuestion(){
    if (testQuestions.testType == "MULTIPLE_CHOICE") {
        testQuestions.correctAnswers.forEach((el) => {
            const obj = testQuestions.answerCreateDTOList.find(
                (item) => item.id === el
            );
            obj.val = true;
        });
    }
}



onMounted(() => {
    isCheckMultipleQuestion()
    solveTest(index.value)
    fetchTestQuestionAll()
});


</script>
