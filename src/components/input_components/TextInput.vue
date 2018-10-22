
import { exists } from 'fs';
<template>
  <div> 
    <fieldset>
      <div v-if="showInputField">
        <label :for="schema.fieldName">{{ schema.label }}</label>
        <input 
					id="text-input" 
					type="text" 
					:name="schema.fieldName"
					:placeholder="placeholder"
					v-model="value[schema.fieldName]"
					>
      </div>  
    </fieldset>
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
			// need to sort out methods
			placeholder: this.getPlaceholder(),
			currentFieldName: this.schema.fieldName
    }
	},
	methods: {
		clearInput() {
		// this.value[this.schema.fieldName] = null
			let initValue = null;
			switch (this.$options.name) {
				case "TextInput":
					initValue = "";
          this.$set(this.value, this.currentFieldName, initValue);
          break;
				case "CheckList":
					initValue = [];
          this.$set(this.value, this.currentFieldName, initValue);
          break;
				case "RadioInput":
					initValue = "";
          this.$set(this.value, this.currentFieldName, initValue);
          break;
			}
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


