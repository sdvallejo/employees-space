<template>
  <div>
    <div class="card mb-4">
      <div class="card-body">
        <h2 class="card-title">{{ post.title }}</h2>
        <p class="card-text">{{ post.body }}</p>

        <template v-if="!showComments && comments.length > 0">
          <span class="badge badge-info">{{ comments.length }} comments</span>
          <router-link
            :to="'/post/' + post.id"
            class="btn btn-primary float-right"
          >Show comments &rarr;</router-link>
        </template>
      </div>
    </div>

    <div v-if="showComments">
      <h4>Comments</h4>

      <div class="alert alert-danger" v-if="error">{{ error }}</div>

      <comments-list :comments="comments" v-show="!loading"></comments-list>
      <pulse-loader v-show="loading"></pulse-loader>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import CommentsList from '@/components/posts/CommentsList.vue';

export default {
  name: 'post',
  props: {
    post: { type: Object },
    showComments: { type: Boolean },
  },
  components: {
    CommentsList,
    PulseLoader,
  },
  data() {
    return {
      comments: [],
      error: null,
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    async getComments() {
      this.loading = true;
      const url = `http://jsonplaceholder.typicode.com/comments?postId=${this.post.id}`;
      try {
        const { data } = await axios.get(url);
        this.comments = data;
      } catch (e) {
        this.error = e.message;
      }

      this.loading = false;
    },
  },
};
</script>
