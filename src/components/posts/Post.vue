<template>
  <div>
    <div class="card mb-4">
      <div class="card-body">
        <h2 class="card-title">{{ post.title }}</h2>
        <p class="card-text">{{ post.body }}</p>

        <template v-if="!showComments && comments.length > 0">
          <span class="badge badge-info">{{ comments.length }} comments</span>
          <router-link :to="'/post/' + post.id" class="btn btn-primary float-right">Show comments &rarr;</router-link>
        </template>
      </div>
    </div>

    <div v-if="showComments">
      <h4>Comments</h4>

      <comments-list :comments="comments"></comments-list>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import CommentsList from '@/components/posts/CommentsList.vue';

export default {
  name: 'post',
  props: {
    post: { type: Object },
    showComments: { type: Boolean },
  },
  components: {
    CommentsList,
  },
  data() {
    return {
      comments: [],
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      const url = `http://jsonplaceholder.typicode.com/posts/${this.post.id}/comments`;
      axios.get(url).then(({ data }) => {
        this.comments = data;
      });
    },
  },
};
</script>
