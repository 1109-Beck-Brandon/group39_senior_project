<template>
  <v-container>
    <h1>Gradebook</h1>
    <v-progress-linear v-if="loading" indeterminate color="blue"></v-progress-linear>
    <v-alert v-if="error" type="error">
      {{ error }}
    </v-alert>
    <v-simple-table v-if="!loading && gradebook.length">
      <thead>
        <tr>
          <th>Course</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in gradebook" :key="index">
          <td>{{ entry.courseName }}</td>
          <td>{{ entry.grade }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    <p v-if="!loading && !gradebook.length">
      No grade data available.
    </p>
  </v-container>
</template>

<script>
import { getGradebook } from '@/services/api';

export default {
  name: 'NewGradebook',
  data() {
    return {
      gradebook: [],
      loading: false,
      error: '',
    };
  },
  created() {
    // Authentication Check: if no user is found, redirect to login.
    const user = localStorage.getItem('user');
    if (!user) {
      this.$router.push('/login');
      return;
    }
    this.fetchGradebook();
  },
  methods: {
    async fetchGradebook() {
      this.loading = true;
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await getGradebook(user.user_id);
        // Assuming the API returns a structure like { grades: [{ courseName, grade }, ...] }
        this.gradebook = response.data.grades;
      } catch (err) {
        this.error = err.response?.data?.error || 'Error fetching gradebook data.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: blue;
  margin-bottom: 20px;
}
</style>
