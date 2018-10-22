<template>
  <div>    
    <div v-if="showInputField"> 
      <div v-for="(field, key) in schema.properties" :key="key">   
        <component 
          :is="getComponentName(field.type)" 
          v-bind:schema="field"
          v-model="value[currentFieldName]">         
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "../input_components/TextInput"
import RadioInput from "../input_components/RadioInput"
import CheckList from "../input_components/CheckList"
import SelectList from "../input_components/SelectList"


export default {
  name: 'ObjectComponent',
  components: {
    TextInput,
    RadioInput,
    CheckList,
    SelectList
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
          currentFieldName: this.schema.fieldName
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
        case "selectlist":
          return "SelectList"
        case "object": 
          return "ObjectComponent"
      }
    },
    clearInput() {
    // this.value[this.schema.fieldName] = null
      if ((this.currentFieldName in this.value)) {
        this.$set(this.value, this.currentFieldName, {});
      }
    }       
  },
	computed: {
		showInputField() {
			let schemaAttrs = this.schema.attrs;
			//dependencies name is Array?
			if(typeof this.schema.attrs !== 'undefined'){
				if(typeof this.schema.attrs.dependencies !== 'undefined'){
					if(typeof this.schema.attrs.dependencies.values !== 'undefined' && typeof this.schema.attrs.dependencies.name !== 'undefined'){
						if(Array.isArray(this.value[schemaAttrs.dependencies.name])){
							for(let i = 0; i < schemaAttrs.dependencies.values.length; i++) {
								if(this.value[schemaAttrs.dependencies.name].indexOf(schemaAttrs.dependencies.values[i]) !== -1){
									return true
								}else {
									this.clearInput()
									return false
								}
							}
						}else {
							if(this.schema.attrs.dependencies.values.indexOf(this.value[this.schema.attrs.dependencies.name]) !== -1){
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


