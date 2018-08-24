<template>
  <div>
    <div class="media mb-4 border-bottom" v-for="comment in comments" :key="comment.id">

      <div class="media-body">
        <h5 class="mt-0">
          <a :href="'mailto:' + comment.email">{{ comment.name }}</a>
        </h5>
        {{ comment.body }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commentslist',
  props: ['comments'],

};
</script>
