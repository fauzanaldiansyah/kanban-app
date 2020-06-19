<template>
  <div>
    <div class="custom-navbar" style="color:rgb(255,192,7)">
      <div>
        <img
          src="https://img.favpng.com/25/25/10/post-it-note-computer-icons-sticky-notes-application-software-png-favpng-em2Hk0EpzsFVdufcfPw2KsVC2_t.jpg"
          width="80"
        />
      </div>
      <div>
        <h1 class="display-4" style="color:white">Your Kanban Board</h1>
      </div>
      <div>
        <button class="btn-danger btn-lg logout mr-2" @click="logout"><strong>Logout</button>
      </div>
    </div>
    <br>
    <div class="">
      <div>
      <div class="wrapper">
        <center>
          <br>
          <h1 style="color:white" ><u> Add New Task to Your Board</u> </h1>
          <form class="my-4" @submit.prevent="login" autocomplete="chrome-off">
            <div class="form-group col-6">
              <label for="new-title" class="h2" style="color:white">Title</label>
              <input
                type="addTask"
                class="form-control form-control-lg"
                name="title-add"
                id="title-add"
                v-model="titleAdd"
                required
              />
            </div>
            <div class="form-group col-6">
              <label for="category" class="h2" style="color:white">Category</label>
              <select class="form-control" id="status" v-model="categoryAdd">
                <option value="BackLog">Backlog</option>
                <option value="ToDo">To Do</option>
                <option value="Doing">Doing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button
              id = "addTask"
              class="btn btn-danger btn-lg"
              @click="addNewTask"
              style="color:white"
            >Add New Task</button>
          </form>
        </center>
      </div>
    </div>
    <br />

  <div>
    <div class="">
      <div class="row text-center">
        <div class="col-sm d-flex flex-column bg-primary">
          <div class="my-3">
            <h1>Back Log</h1>
          </div>
          <Card1 v-for="task in tasks" :key="task.id" :dataTask="task" @refreshTask="setRefresh"></Card1>
        </div>

        <div class="col-sm d-flex flex-column bg-danger">
          <div class="my-3">
            <h1>To Do</h1>
          </div>
          <Card2 v-for="task in tasks" :key="task.id" :dataTask="task" @refreshTask="setRefresh"></Card2>
        </div>

        <div class="col-sm d-flex flex-column bg-warning">
          <div class="my-3">
            <h1>Doing</h1>
          </div>
          <Card3 v-for="task in tasks" :key="task.id" :dataTask="task" @refreshTask="setRefresh"></Card3>
        </div>

        <div class="col-sm d-flex flex-column bg-success">
          <div class="my-3">
            <h1>Completed</h1>
          </div>
          <Card4 v-for="task in tasks" :key="task.id" :dataTask="task" @refreshTask="setRefresh"></Card4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card1 from "./Card1.vue";
import Card2 from "./Card2.vue";
import Card3 from "./Card3.vue";
import Card4 from "./Card4.vue";
export default {
  components: {
    Card1,
    Card2,
    Card3,
    Card4
  },
  data() {
    return {
      tasks: [],
      titleAdd: "",
      categoryAdd: "",
      errors: []
    };
  },
  created() {
    this.getTask();
  },
  methods: {
    logout() {
      console.log("masuklogout");
      localStorage.clear();
      this.$emit("emit-logout");
    },
    getTask() {
      console.log("masukget");
      axios({
        method: "get",
        url: "http://localhost:3000/tasks",
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          console.log(response, "<<<response");
          this.tasks = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addNewTask(){
      axios({
        method: "post",
        url: "http://localhost:3000/tasks" ,
        headers: {
            access_token: localStorage.access_token
        },
        data : {
          title: this.titleAdd,
          category: this.categoryAdd
        }
      })
      .then(response => {
        this.getTask()
        console.log('masuknewtask')
      })
      .catch(err => {
        console.log(err)
      })
    },
    setRefresh(){
      this.getTask()
    }
  }
};
</script>