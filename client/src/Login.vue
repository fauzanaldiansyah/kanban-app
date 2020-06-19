<template>
  <div>
    <div class="bg-warning mx-3">
      <div class="row text-center">
        <div class="col-sm d-flex flex-column ml-2">
          <div class="my-3">
            <h1 class="display-1 text-danger"><strong>KANBAN</h1>
            <h2 class="text-danger">(看板)</h2>
          </div>
          <div class="card" style="width: 18;">
            <div class="card-body">
              <h3
                class="card-title"
              >Kanban is a visual system for managing work as it moves through a process. Kanban visualizes both the process (the workflow) and the actual work passing through that process. The goal of Kanban is to identify potential bottlenecks in your process and fix them so work can flow through it cost-effectively at an optimal speed or throughput.</h3>
              <br />
              <p
                class="card-text"
              >Kanban, also spelt “kamban” in Japanese, translates to “Billboard” (“signboard” in Chinese) that indicates “available capacity (to work)”. Kanban is a concept related to lean and just-in-time (JIT) production, where it is used as a scheduling system that tells you what to produce, when to produce it, and how much to produce.</p>
              <br />
              <p>- digite.com -</p>
            </div>
          </div>
      </div>

      <div class="col-sm d-flex flex-column bg-light">
        <div class="my-3"></div>
        <center>
          <div id="login">
            <h1 class="display-4"><strong>LOGIN TO YOUR BOARD</h1>
            <form class="my-4" @submit.prevent="login" autocomplete="chrome-off">
              <div class="form-group col-6">
                <label for="email-login" class="h2">Email</label>
                <input
                  type="email"
                  class="form-control form-control-lg"
                  name="email-login"
                  id="email-login"
                  v-model="emailLogin"
                  required
                />
              </div>
              <div class="form-group col-6">
                <label for="password" class="h2">Password</label>
                <input
                  type="password"
                  class="form-control form-control-lg"
                  name="password-login"
                  id="password-login" 
                  v-model="passwordLogin"
                  required
                />
              </div>
              <button
                id="btn-login"
                type="submit"
                class="btn btn-warning btn-lg"
                v-on:click="login"
              ><strong>LOGIN</button>
            </form>
              <h4>No Account?</h4>
              <button id="btn-regist" class="btn btn-warning btn-lg" v-on:click="register">Register</button>
              <h4>or Login using:</h4>
              <button class="btn btn-warning btn-lg" @click="googleSign">Google</button>

          </div>
        </center>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      message: "KANBAN!",
      emailLogin: "",
      passwordLogin: "",
      pageName: "",
    };
  },
  methods: {
    login() {
      axios({
        method: "post",
        url: "http://ka-kanban.herokuapp.com/users/login" ,
        data : {
          email: this.emailLogin,
          password: this.passwordLogin
        }
      })
      .then(response => {
        console.log('masuklogin')
        localStorage.setItem('access_token', response.data.access_token)
        this.$emit('emit-is-logged-in', true)
      })
      .catch(err => {
        console.log(err)
      })
    },
    register(){
      let value = "Register"
      this.$emit('emit-show-registerPage', value)
    },
    googleSign(){
      this.$gAuth.signIn()
          .then(res => {
            let id_token = res.getAuthResponse().id_token
            console.log(id_token, 'id_tokennn dari google')
            this.googleLogin(id_token)
          })
          .catch(err =>{
            console.log
          })
    },
    googleLogin(id_token){
        axios({
          method: "post",
          url: "http://ka-kanban.herokuapp.com/users/googlesign" ,
          data : {
            id_token
        }
      })
      .then(response => {
        console.log(response,"responsedariserver")
        localStorage.setItem('access_token', response.data.data.access_token)
        this.$emit('emit-is-google-in', true)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
};
</script>

