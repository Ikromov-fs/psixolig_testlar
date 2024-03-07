import {defineStore} from "pinia";

export const useOpenRegisterModal = defineStore("registerOpenModal",{
    state : () =>({
        isOpen : false
    }),
    actions:{
        openRegisterModal(){
            this.isOpen = true
        },
        closeRegisterModal(){
            this.isOpen = false
        }
    }
})