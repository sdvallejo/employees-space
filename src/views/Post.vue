<template>
    <div class="row">

        <sidebar></sidebar>

        <div class="col-md-8">

            <h1 class="my-4">
                <router-link to="/">My space</router-link>
            </h1>

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
    };
  },
  components: {
    Post,
    Sidebar,
  },
  created() {
    if (this.user) {
      this.getPost();
    }
  },
  methods: {
    getPost() {
      const url = `http://jsonplaceholder.typicode.com/posts/${this.id}`;
      axios.get(url).then(({ data }) => {
        this.post = data;
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
