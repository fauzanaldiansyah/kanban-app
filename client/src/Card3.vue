<template>
  <div>

    <div class="card" style="width: 18;" v-if='dataTask.category==="Doing"'>
      <div class="card-body">
        <h3 class="card-title">{{dataTask.title}}</h3>        
        <p> Created by: </p>
        <p> {{dataTask.User.email}}</p>
       <button class="btn btn-info" @click="updateBack(dataTask.id,dataTask.title,dataTask.category)">Move to ToDo</button>
       <button class="btn btn-info" @click="updateUp(dataTask.id,dataTask.title,dataTask.category)">Move to Completed</button><br>
        <button class="btn btn-danger" @click="deleteTask(dataTask.id)">Delete</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
    props:["dataTask"],
    name: "Card3",
      methods: {
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
      updateBack(id,title,category) {
        axios({
          method: "put",
          url: `http://ka-kanban.herokuapp.com/tasks/${id}`,
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
      updateUp(id,title,category) {
        axios({
          method: "put",
          url: `http://ka-kanban.herokuapp.com/tasks/${id}`,
            headers: {
            access_token: localStorage.access_token
        },
          data : {
            title, 
            category: "Completed"
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
