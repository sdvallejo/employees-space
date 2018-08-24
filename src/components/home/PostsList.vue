<template>
  <div>
    <post :post="post" :show-comments="false" v-for="post in posts" :key="post.id"></post>
  </div>
</template>

<script>
import Post from '@/components/posts/Post.vue';

export default {
  name: 'postlist',
  props: ['posts'],
  components: {
    Post,
  },
};
</script>
