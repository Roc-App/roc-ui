<template>
  <router-view @getTaskType="getTaskType" />
</template>

<script>
export default {
  name: 'PlaceholderView',
  props: {},
  data() {
    return {}
  },
  methods: {
    getTaskType(value) {
      switch (value) {
        case '01':
          this.$router.push({
            path: '/flowPath/taskOrder/task1',
            query: {
              a: '1'
            }
          })
          break
        case '02':
          this.$router.push({
            path: '/flowPath/taskOrder/task2',
            query: {}
          })
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
