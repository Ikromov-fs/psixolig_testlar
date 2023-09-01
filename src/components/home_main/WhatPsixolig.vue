<template>
  <div class="bg-[#fff5ee] mmd:rounded-bl-[60px] mmd:rounded-tr-[60px]">
    <div data-aos="zoom-in-up" class="container py-10">
      <div class="flex justify-center font-[500] gap-1 text-lg">
        <span class="text-[#d56603]">06</span>
        <span class="text-[#d56603]">|</span>
        <span class="text-black">{{ partData?.title }}</span>
      </div>
      <div class="text-black font-[500]">
        <div class="sx:text-[15px] mmd:text-[19px] mt-7">
          <p>
          {{ partData?.content }}
            <!-- Psixologiya — inson faoliyati va hayvonlar xatti-harakati jarayonida
            voqelikning psixik aks etishi, ruhiy jarayonlar, holatlar,
            hodisalar, hislatlar toʻgʻrisidagi fan. Psixologiyaning tadqiqot
            predmetiga sezgilar va idrok obrazlari, tafakkur va hissiyot,
            faoliyat va muomala kabi psixologik jarayonlar, kategoriyalar
            kiradi. Psixologiyaning asosiy vazifalari — psixika qonuniyatlarini,
            inson ruhiy holatlari shakllanishini filogenetik va ontogenetik
            taraqqiyot birligida ochishdan iboratdir. Mazkur vazifalar yechimini
            topishda psixologiya bir tomondan, biologiya fani sohalari bilan,
            jumladan, fiziologiya bilan, boshqa tomondan esa, sotsiologiya,
            pedagogika, madaniyat tarixi, mantiq hamda ijtimoiy fanlar bilan
            jips aloqaga kirishadi. Psixologiya eng avvalo, psixikaning insonga
            xos shakli boʻlmish ong va oʻzini oʻzi anglashni tadqiq etadi.
            Amerika Psixologiya Assotsiatsiyasi ma'lumotlariga ko'ra,
            psixologiya ong va xatti-harakatni ilmiy o'rganishdir. Psixologiya
            ko'p qirrali fan bo'lib, inson rivojlanishi, sport, salomatlik,
            klinik, ijtimoiy xulq-atvor va kognitiv jarayonlar kabi ko'plab
            tadqiqot sohalarini o'z ichiga oladi. Oʻzbekistonda psixologiya
            1928-yildan eʼtiboran hozirgi Milliy universitetda fan sifatida
            oʻqitila boshlandi. 1929-yil Xalq maorifi komissarligi qoshida
            psixologiya laboratoriyasi ochildi. Keyinchalik pedagogika
            institutlarida psixologiyaning bir necha sohalari boʻyicha
            talabalarga bilim berila boshlandi. XX asrning 2-yarmida M. Vohidov,
            M. Davletshin singari mahalliy kadrlar yetishib chiqdi. Hozirgi
            davrda psixologiya fanlari doktorlari V. Tokareva, E. Gʻoziyev, B.
            Qodirov, Gʻ. Shoumarov, R. Gaynutdinov, V. Karimova, Sh. Barotov, A.
            Jabborov, R. Sunnatovalar psixologiyaning umumiy psixologiya,
            pedagogik va yosh psixologiyasi, ijtimoiy psixologiya sohalari
            boʻyicha tadqiqot ishlarini amalga oshirmoqdalar. Psixolog
            mutaxassislar tayyorlash va tadqiqot ishlari Oʻzbekiston milliy
            universiteti, SamDU, Fargʻona universiteti, Qarshi universiteti,
            Termiz universiteti bazalarida yoʻlga qoʻyilgan. Oʻzbekistonda
            psixologik xizmat joriy qilingan va uning tarmogʻi tobora kengayib
            bormoqda. -->
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "@/plugins/axios.js";
import { onMounted, ref } from "vue";
const partData = ref();

async function getData() {
  try {
    const data = await axios.get(`/article/get`);
    partData.value = data.data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getData();
});
</script>
