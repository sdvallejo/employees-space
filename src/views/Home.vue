<template>
  <div class="row">
    <sidebar></sidebar>

    <div class="col-md-8">
      <h1 class="my-4">
        <router-link to="/">My space</router-link>
        <small v-if="posts.length > 0">({{ posts.length }} posts published)</small>
      </h1>

      <div class="card mb-4">
        <div class="card-body">
          <h2 class="card-title">New post</h2>

          <div class="alert alert-danger w-100" v-if="error">{{ error }}</div>
          <div class="alert alert-success w-100" v-if="success">{{ success }}</div>

          <form @submit.stop.prevent="submitPost">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" class="form-control" id="title" v-model="newPost.title">
            </div>

            <div class="form-group">
              <label for="body">Body</label>
              <textarea class="form-control" id="body" rows="3" v-model="newPost.body"></textarea>
            </div>

            <button type="submit" class="btn btn-primary float-right">Submit</button>
          </form>
        </div>
      </div>

      <posts-list :posts="posts" v-show="!loading"></posts-list>
      <pulse-loader v-show="loading"></pulse-loader>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import Sidebar from '@/components/home/Sidebar.vue';
import PostsList from '@/components/home/PostsList.vue';

export default {
  name: 'home',
  data() {
    return {
      posts: [],
      error: null,
      success: null,
      loading: false,
      newPost: {
        title: '',
        body: '',
      },
    };
  },
  components: {
    Sidebar,
    PostsList,
    PulseLoader,
  },
  created() {
    if (this.user) {
      this.getPosts();
    }
  },
  methods: {
    async getPosts() {
      this.loading = true;
      const url = `http://jsonplaceholder.typicode.com/posts?userId=${this.user.id}`;
      try {
        const { data } = await axios.get(url);
        Vue.set(this, 'posts', data);
      } catch (e) {
        this.error = e.message;
      }
      this.loading = false;
    },
    async submitPost() {
      if (this.title === '' || this.body === '') {
        this.error = 'Title and body are required.';
        return;
      }

      this.error = null;

      const url = 'http://jsonplaceholder.typicode.com/posts';
      const post = {
        ...this.newPost,
        userId: this.user.id,
      };

      try {
        const { data } = await axios.post(url, post);
        this.success = 'Post created.';
        this.posts.unshift(data);
      } catch (e) {
        this.error = e.message;
      }

      Vue.set(this, 'newPost', {
        title: '',
        body: '',
      });
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>
