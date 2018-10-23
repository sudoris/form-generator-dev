
import { exists } from 'fs';
<template>
  <div> 
    <div class="display-inline" v-if="showInputField">
      <label 
        :for="schema.attrs.fieldName">
        {{ schema.attrs.label }}
      </label>
      <input 
        id="text-input" 
        type="text" 
        :name="schema.attrs.fieldName" 
        v-model="value[schema.attrs.fieldName]"
        :placeholder="placeholder">
    </div>
  </div>
</template>

<script>
export default {
  name: "TextInput",
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
      placeholder: this.getPlaceholder(),
      currentFieldName: this.schema.attrs.fieldName
    }
  },
  methods: {
    clearInput() {
    // this.value[this.schema.attrs.fieldName] = null
      let initValue = null;
      this.$set(this.value, this.currentFieldName, initValue);
    },
    getPlaceholder() {
      if(this.schema.attrs) {
        if(this.schema.attrs.placeholder) {
          return this.schema.attrs.placeholder
        }
      }	
      return ""
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
              if(schemaAttrs.dependsOn.values.indexOf(this.value[schemaAttrs.dependsOn.name]) !== -1){
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
    },
  }
}
</script>

<style>

</style>


