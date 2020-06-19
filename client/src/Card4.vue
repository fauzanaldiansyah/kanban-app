<template>
  <div>

    <div class="card" style="width: 18;" v-if='dataTask.category==="Completed"'>
      <div class="card-body">
        <h3 class="card-title">{{dataTask.title}}</h3>
        <p> Created by: </p>
        <p> {{dataTask.User.email}}</p>
        <button class="btn btn-info" @click="updateTask(dataTask.id)">Move to Doing</button>
        <button class="btn btn-danger" @click="deleteTask(dataTask.id,dataTask.title,dataTask.category)">Delete</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
    props:["dataTask"],
    name: "Card4",
    methods:{
    deleteTask(id) {
        axios({
          method: "delete",
          url: `http://ka-kanban.herokuapp.com/tasks/${id}`,
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
          url: `http://ka-kanban.herokuapp.com/tasks/${id}`,
            headers: {
            access_token: localStorage.access_token
        },
          data : {
            title, 
            category: "Doing"
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
};
</script>
