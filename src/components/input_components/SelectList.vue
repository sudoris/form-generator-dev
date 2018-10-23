
<template>
  <div>
    <fieldset>
      <div v-if="showInputField">
        <select v-model="value[schema.fieldName]">
          <template v-if="typeof schema.attrs.placeholder !== 'undefined'">
            <option value="" >{{ schema.attrs.placeholder }}</option>
          </template>
          <!-- dynamic placeholder and placeholder name?-->
          <option
            v-for="(item, index) in schema.values"
            :key="index"
            :value="item">
            {{ item }}
          </option>
        </select>
      </div>
    </fieldset>
  </div>
</template>

<script>

export default {
  name: "SelectList",
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
        return  {}
      }
    }
  },
  data () {
    return {
      placeholder: this.getPlaceholder(),
      currentFieldName: this.schema.fieldName            
    }
  },
  created: function() {
    if (!(this.currentFieldName in this.value)) {
      // this.value[this.currentFieldName] = {}
      this.$set(this.value, this.currentFieldName, "");
      //this.value["keyOnCreate"] = {};
    }
  },
  methods: {
    clearInput() {
    // this.value[this.schema.attrs.fieldName] = null
      let initValue = "";
      this.$set(this.value, this.currentFieldName, initValue);
    },
    getPlaceholder() {
      if(typeof this.schema.attrs !== 'undefined') {
        if(typeof this.schema.attrs.placeholder !== 'undefined') {
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
    },
  }
}
</script>

<style>

</style>