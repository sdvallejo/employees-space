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
              <input href="index.html" class="btn btn-lg btn-success btn-block" type="submit" value="Login" />
            </fieldset>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      username: '',
      error: null,
    };
  },
  methods: {
    onSubmit() {
      if (this.username === '') {
        this.error = 'The user is required';
        return;
      }

      this.$store.dispatch('login', this.username).then(() => {
        this.$router.push('/');
      }).catch((error) => {
        this.error = error.message;
      });
    },
  },
};
</script>
