
<template>
  <div> 
    <fieldset>
      <div v-if="showInputField">
        <label v-bind:for="schema.fieldName">{{ schema.label }}</label>
        <input id="text-input" type="text" v-bind:name="schema.fieldName" v-model="value[schema.fieldName]">
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
    } 
	},
	computed: {
		showInputField() {
			let schemaAttrs = this.schema.attrs;
			//dependencies name is Array?
			if (schemaAttrs) {
				if(schemaAttrs.dependencies && Array.isArray(this.value[schemaAttrs.dependencies.name])){
					if(this.value[schemaAttrs.dependencies.name].indexOf(schemaAttrs.dependencies.value) !== -1){
						return true
					}else {
						this.clearInput()
						return false
					}
				}
				if (!(schemaAttrs.dependencies) || (this.value[schemaAttrs.dependencies.name] === schemaAttrs.dependencies.value)) {
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


