<template>
  <div id="app">    
    <PersonalHistory></PersonalHistory>
    <ReviewOfTheSystem></ReviewOfTheSystem>
  </div>
</template>

<script>
import PersonalInfo from "./note_components/PersonalInfo"
import PersonalHistory from "./note_components/PersonalHistory"
import ReviewOfTheSystem from "./note_components/ReviewOfTheSystem"


export default {
  components: {
    PersonalHistory,
    PersonalInfo,
    ReviewOfTheSystem
  },
  data() {
    return {

    }
  }
}
</script>

<style>

</style>