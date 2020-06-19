<template>
  <div>
    <Login v-if="!isLoggedIn && pageName!='Register'" @emit-is-logged-in="setToken" @emit-is-google-in="setToken" @emit-show-registerPage="setRegister" @></Login>
 
    <div v-else-if="!isLoggedIn && pageName==='Register'">
      <Register> </Register>
    </div>

    <div v-else-if="isLoggedIn" >
      <Home @emit-logout="setToken"></Home>
    </div>



  </div>
</template>

<script>
import Login from "./Login.vue";
import Register from "./Register.vue";
import Home from "./Home.vue";

export default {
  components: {
    name: "App",
    Login,
    Home,
    Register
  },

  data() {
    return {
      message: "KANBAN!",
      emailLogin: "",
      passwordLogin: "",
      pageName: "kosong",
      isLoggedIn: localStorage.access_token
    };
  },
  methods: {
    setLogin(value) {
      this.isLoggedIn = value;
    },
    setLogut() {
      this.isLoggedIn = false;
    },
    setToken(){
      this.isLoggedIn = localStorage.access_token
    },
    setRegister(value){
      this.pageName = value
    }
  }
};
</script>

<style scoped>
</style>