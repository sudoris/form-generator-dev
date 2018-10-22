<template>
  <div id="app">    
    <PersonalHistory></PersonalHistory>
    <ReviewOfTheSystem></ReviewOfTheSystem>
    <PersonalInfo></PersonalInfo>  
    <br>
    
  </div>
</template>

<script>
import PersonalInfo from "./components/note_components/PersonalInfo"
import PersonalHistory from "./components/note_components/PersonalHistory"
import ReviewOfTheSystem from "./components/note_components/ReviewOfTheSystem"


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