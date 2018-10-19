<template>
  <div>
    <div v-for="(field, key) in vueSchema.properties" :key="key"> 
      <legend> {{ vueSchema.title }} </legend>
            <!-- <div class="field-title"></div> -->
        <legend class="field-title">{{ field.label}}</legend>          
        <component :is="getComponentName(field.type)" v-bind:schema="field" v-model="vueSchemaData" ></component>
    </div>
    {{ schemaData }}
  </div>
</template>

<script>
import TextInput from "./input_components/TextInput"
import RadioInput from "./input_components/RadioInput"
import CheckList from "./input_components/CheckList"
import ObjectComponent from "./utility_components/ObjectComponent"

export default {
  name: 'Section',
  components: {
    TextInput,
    RadioInput,
    ObjectComponent,    
    CheckList,
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
      vueSchemaData: this.schemaData,
      vueSchema: this.schema      
    }    
  },
  created() {
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
      }
    }
  }
}
</script>

<style>
.field-title {
  color: blueviolet;
}

</style>
