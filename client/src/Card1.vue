<template>
  <div>

    <div class="card" style="width: 18;" v-if='dataTask.category==="BackLog"'>
      <div class="card-body">
        <h3 class="card-title">{{dataTask.title}}</h3>
        <p> Created by: </p>
        <p> {{dataTask.User.email}}</p>
        <!-- <h4 class="card-title">{{dataTask.category}}</h4> -->
        <button class="btn btn-danger" @click="deleteTask(dataTask.id)">Delete</button>
        <button class="btn btn-info" @click="updateTask(dataTask.id,dataTask.title,dataTask.category)">Move to ToDo</button>
      </div>
    </div>

  </div>
</template>

<script>

export default {
    props:["dataTask"],
    name: "Card1",
    methods: {
      deleteTask(id) {
        axios({
          method: "delete",
          url: `http://localhost:3000/tasks/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
          .then(response => {
            this.$emit("refreshTask")
          })
          .catch(err => {
            alert("Unauthorized")
          })
      },
      updateTask(id,title,category) {
        axios({
          method: "put",
          url: `http://localhost:3000/tasks/${id}`,
            headers: {
            access_token: localStorage.access_token
        },
          data : {
            title, 
            category: "ToDo"
        }
        })
          .then(response => {
            this.$emit("refreshTask")
          })
          .catch(err => {
            alert("Unauthorized")
          })
      },
      alert(message){
        this.$swal(message)
      }
  }
}
</script>
