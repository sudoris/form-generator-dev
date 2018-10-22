<template>
  <div>
    <fieldset>
      <legend>{{ schema.label }}</legend>
			<div v-if="showInputField">
				<span v-for="(item, index) in schema.values" :key="index">
					<input 
						type="radio" 
						:id="item" 
						:value="item" 
						v-model="value[schema.fieldName]">
					<label :for="item">{{ item }}</label>
				</span>
			</div>
    </fieldset>
  </div>
</template>

<script>
export default {
	name: "RadioInput",
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
			//vue instance name
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