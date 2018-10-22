<template>
  
    <div v-if="showInputField"> 
      <div v-for="(field, key) in schema.properties" :key="key">   
        <component 
          :is="getComponentName(field.attrs.fieldType)" 
          v-bind:schema="field"
          v-model="value[currentFieldName]">         
        </component>
      </div>
      <br>
    </div>
    
  
</template>

<script>
import TextInput from "../input_components/TextInput"
import RadioInput from "../input_components/RadioInput"
import CheckList from "../input_components/CheckList"
import NumberInput from "../input_components/NumberInput"

export default {
  name: 'ObjectComponent',
  components: {
    TextInput,
    RadioInput,
    CheckList,
    NumberInput
  },
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
  created() {
      if (!(this.currentFieldName in this.value)) {
        // this.value[this.currentFieldName] = {}
        // this.$emit('input', this.value)
        this.$set(this.value, this.currentFieldName, {});
        //this.value["keyOnCreate"] = {};
      }
  },
  methods: {        
    getComponentName(type) {
      switch (type) {
        case "text":
          return "TextInput"
          
        case "radio":
          return "RadioInput"

        case "checklist":
          return "CheckList"

        case "object": 
          return "ObjectComponent"

        case "number": 
          return "NumberComponent"
          
      }
    },
    clearInput() {
    // this.value[this.schema.attrs.fieldName] = null
      if ((this.currentFieldName in this.value)) {
        this.$set(this.value, this.currentFieldName, {});
      }
    }       
  },
  computed: {
    showInputField() {
      let schemaAttrs = this.schema.attrs
      if (schemaAttrs) {
        if (!(schemaAttrs.dependsOn) || (this.value[schemaAttrs.dependsOn.name] === schemaAttrs.dependsOn.value)) {
          return true
          }else {
            this.clearInput()
            return false
          }
      }else {
        return true
      }
    }
  }
}
</script>

<style>

</style>


