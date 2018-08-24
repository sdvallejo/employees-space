<template>
  <div class="row">
    <div class="col-4 offset-4">
      <div class="card mt-5">
        <div class="card-header">
          Sign In
        </div>
        <div class="card-body">
          <form role="form" @submit.stop.prevent="onSubmit">

            <div class="alert alert-danger" v-show="error">
              {{ error }}
            </div>

            <fieldset>
              <div class="form-group">
                <input class="form-control" placeholder="User" type="text" autofocus v-model="username">
              </div>
              <input class="btn btn-lg btn-success btn-block" type="submit" value="Login" v-if="!loading" />
              <pulse-loader v-else></pulse-loader>
            </fieldset>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  name: 'login',
  components: {
    PulseLoader,
  },
  data() {
    return {
      username: '',
      error: null,
      loading: false,
    };
  },
  methods: {
    onSubmit() {
      if (this.loading) {
        return;
      }

      if (this.username === '') {
        this.error = 'The user is required';
        return;
      }
      this.loading = true;
      this.$store.dispatch('login', this.username).then(() => {
        this.$router.push('/');
        this.loading = false;
      }).catch((error) => {
        this.error = error.message;
        this.loading = false;
      });
    },
  },
};
</script>
