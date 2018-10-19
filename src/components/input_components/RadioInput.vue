<template>
  <div>
    <fieldset>
      <legend>{{ schema.label }}</legend>
			<div v-if="showInputField">
				<span v-for="(item, index) in schema.values" :key="index">
					<input type="radio" :id="item" :value="item" v-model="value[schema.fieldName]">
					<label :for="item">{{ item }}</label>
				</span>
			</div>
    </fieldset>
  </div>
</template>

<script>


export default {
  //value = schemaData. v-model default prop is value
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