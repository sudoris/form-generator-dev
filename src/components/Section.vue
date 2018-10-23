<template>
  <div>
    <h2>{{ jsonSchema.title }}</h2>        
    <div v-for="(field, key) in jsonSchema.properties" :key="key">   
      <legend class="field-title">{{ field.title }}</legend>          
      <component 
        :is="getComponentName(field.attrs.fieldType)"
        :schema="field" 
        v-model="jsonSchemaData" ></component>
    </div>
    <!-- {{ schemaData }}     -->
  </div>
</template>

<script>
import TextInput from "./input_components/TextInput"
import RadioInput from "./input_components/RadioInput"
import Checkbox from "./input_components/Checkbox"
import CheckList from "./input_components/CheckList"
import NumberInput from "./input_components/NumberInput"
import SelectDate from "./input_components/SelectDate"
import SelectList from "./input_components/SelectList"
import ObjectComponent from "./utility_components/ObjectComponent"

export default {
  name: 'Section',
  components: {
    TextInput,
    RadioInput,
    Checkbox,
    CheckList,
    NumberInput,
    SelectDate,
    SelectList,
    ObjectComponent
  },
  props: {
    schema: {
      type: Object,
      default() {
        return {}
      }
    },
    schemaData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      jsonSchemaData: this.schemaData,
      jsonSchema: this.schema      
    }    
  },
  created() {
  },
  methods: {        
    // TODO: should be able to default to JSON type (string, int, array etc.) if no custom fieldType given
    getComponentName(type) {
      switch (type) {
        case "text":
          return "TextInput"
        case "radio":
          return "RadioInput"
        case "checkbox":
          return "Checkbox"
        case "checklist":
          return "CheckList"
        case "selectList":
          return "SelectList"
        case "object": 
          return "ObjectComponent"
        case "number": 
          return "NumberInput"
        case "date": 
          return "SelectDate"
      }
    }
  }
}
</script>

<style>
.field-title {
  color: blueviolet;
}
.display-inline {
	display: inline-block;
}
body {
  margin-left: 2%;
}

</style>
