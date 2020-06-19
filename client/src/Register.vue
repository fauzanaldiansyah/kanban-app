<template>
  <div>
    <section class="register-form-page bg-warning">
      <br>
      <br>
      <h1 class="display-4"><strong>REGISTER YOUR ACCOUNT</h1>
      <br>
      <p class="h3">You want to try Kanban, aren't you?</p>
      <br />
      <br />
      <div class="add-user">
        <form autocomplete="chrome-off">
          <div class="form-group col-6">
            <label for="email-register" class="h2">Email</label>
            <input
              type="text"
              class="form-control"
              name="email-register"
              id="email-register"
              v-model="emailRegister"
              required
            />
          </div>
          <div class="form-group col-6">
            <label for="password-register" class="h2">Password</label>
            <input
              type="password"
              class="form-control"
              name="password-register"
              id="password-register"
              v-model="passwordRegister"
              required
            />
          </div>
          <div class="form-group col-6">
            <label for="organization-register" class="h2">Organization</label>
            <input
              type="text"
              class="form-control"
              name="organization-register"
              id="organization-register"
              v-model="organizationRegister"
            />
          </div>
          <button id="btn-register" type="submit" class="btn btn-danger btn-lg" v-on:click="registerNewUser">Register Account</button>
        </form>
        <br>
        <br>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data(){
    return {
      emailRegister: "",
      passwordRegister: "",
      organizationRegister: ""
    }
  },
  methods: {
    registerNewUser() {
      axios({
        method: "post",
        url: "http://ka-kanban.herokuapp.com/users/register" ,
        data : {
          email: this.emailRegister,
          password: this.passwordRegister,
          organization: this.organizationRegister
        }
      })
      .then(response => {
        console.log('masukregister')
      })
      .catch(err => {
        console.log(err)
      })
    },
  }
};
</script>