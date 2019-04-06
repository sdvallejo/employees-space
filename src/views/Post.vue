<template>
  <div class="row">
    <sidebar></sidebar>

    <div class="col-md-8">
      <h1 class="my-4">
        <router-link to="/">My space</router-link>
      </h1>

      <div class="alert alert-danger" v-if="error">{{ error }}</div>

      <post :post="post" :show-comments="true" v-if="post"></post>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Sidebar from '@/components/home/Sidebar.vue';
import Post from '@/components/posts/Post.vue';

export default {
  name: 'home',
  data() {
    return {
      id: this.$route.params.id,
      post: null,
      error: null,
    };
  },
  components: {
    Post,
    Sidebar,
  },
  watch: {
    $route(to) {
      this.id = to.params.id;
      this.post = null;
      this.getPost();
    },
  },
  created() {
    if (this.user) {
      this.getPost();
    }
  },
  methods: {
    async getPost() {
      const url = `http://jsonplaceholder.typicode.com/posts/${this.id}`;
      try {
        const { data } = await axios.get(url);
        this.post = data;
      } catch (e) {
        this.error = e.message;
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>
