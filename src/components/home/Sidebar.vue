<template>
  <div class="col-md-4">

    <div class="card my-4" v-if="user">
      <h5 class="card-header">My Profile</h5>
      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <strong>Name:</strong> {{ user.name }}
          </li>
          <li class="list-group-item">
            <strong>Email:</strong> {{ user.email }}
          </li>
          <li class="list-group-item">
            <strong>Address:</strong> {{ user.address.street }} {{ user.address.suite }}, {{ user.address.city }}
          </li>
          <li class="list-group-item">
            <strong>Phone:</strong> {{ user.phone }}
          </li>
          <li class="list-group-item">
            <strong>Website:</strong> {{ user.website }}
          </li>
        </ul>

        <button class="btn btn-primary mt-4 w-100" @click="logout">Log out</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'sidebar',
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
};
</script>
