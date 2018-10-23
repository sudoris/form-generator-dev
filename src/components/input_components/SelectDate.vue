
<template>
  <div>
    <div class="display-inline" v-if="showInputField">
      <label :for="schema.attrs.fieldName">{{ schema.attrs.label }}</label>
      <input
        id="number-input" 
        type="date" 
        :name="schema.attrs.fieldName" 
        v-model="value[schema.attrs.fieldName]">
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectDate",
  props: {
    schema: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      currentFieldName: this.schema.attrs.fieldName
    }
  },
  methods: {
    clearInput() {
    // this.value[this.schema.attrs.fieldName] = null
      let initValue = "";
      this.$set(this.value, this.currentFieldName, initValue);
    } 
  },
  computed: {
showInputField() {
      let schemaAttrs = this.schema.attrs;
      //dependsOn name is Array?
      if(schemaAttrs){
        if(schemaAttrs.dependsOn){
          if(schemaAttrs.dependsOn.values && schemaAttrs.dependsOn.name){
            if(Array.isArray(this.value[schemaAttrs.dependsOn.name])){
              for(let i = 0; i < schemaAttrs.dependsOn.values.length; i++) {
                if(this.value[schemaAttrs.dependsOn.name].indexOf(schemaAttrs.dependsOn.values[i]) !== -1){
                  return true
                }else {
                  this.clearInput()
                  return false
                }
              }
            }else {
              if(this.schema.attrs.dependsOn.values.indexOf(this.value[this.schema.attrs.dependsOn.name]) !== -1){
                return true
              }else {
                this.clearInput()
                return false
              }
            }
          }
          return true
        }
        return true
      }
      return true
    }
  }
}
</script>

<style>

</style>


