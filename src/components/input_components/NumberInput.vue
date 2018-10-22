
<template>
    
		<div class="display-inline" v-if="showInputField">
			<label v-bind:for="schema.attrs.fieldName">{{ schema.attrs.label }}</label>
			<input id="number-input" type="number" v-bind:name="schema.attrs.fieldName" v-model="value[schema.attrs.fieldName]">
		</div>      
  
</template>

<script>
export default {
	name: "NumberInput",
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
			let initValue = null;
			switch (this.$options.name) {
				case "TextInput":
					initValue = null;
          this.$set(this.value, this.currentFieldName, initValue);
          break;
        case "NumberInput":
					initValue = null;
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
    } 
	},
	computed: {
		showInputField() {
			let schemaAttrs = this.schema.attrs;
			//dependsOn name is Array?
			if (schemaAttrs) {
				if(schemaAttrs.dependsOn && Array.isArray(this.value[schemaAttrs.dependsOn.name])){
					if(this.value[schemaAttrs.dependsOn.name].indexOf(schemaAttrs.dependsOn.value) !== -1){
						return true
					}else {
						this.clearInput()
						return false
					}
				}
				if (!(schemaAttrs.dependsOn) || (this.value[schemaAttrs.dependsOn.name] === schemaAttrs.dependsOn.value)) {
					return true
				}else {
					this.clearInput()
					return false
				}	
			}
			return true
		}
	}
}
</script>

<style>

</style>


