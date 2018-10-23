<template>
  <div id="app">
      <router-link :to="{ name: 'personalInfo' }">PersonalInfo</router-link> |
      <router-link :to="{ name: 'personalHistory' }">PersonalHistory</router-link> |
      <router-link :to="{ name: 'reviewOfTheSystem' }">ReviewOfTheSystem</router-link> |
    <router-view/>
  </div>
</template>

<script>



export default {
  data() {
    return {

    }
  }
}
</script>

<style>

</style>