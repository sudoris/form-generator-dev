
<template>
	<div class="display-inline" v-if="showInputField">
		<label
			:for="schema.attrs.fieldName">
			{{ schema.title }}
		</label>
		<input
			id="number-input"
			type="number"
			:name="schema.attrs.fieldName" 
			v-model="value[schema.attrs.fieldName]">
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
					initValue = "";
					this.$set(this.value, this.currentFieldName, initValue);
					break;
				case "NumberInput":
					initValue = "";
					this.$set(this.value, this.currentFieldName, initValue);
					break;
				case "Checkbox":
					initValue = false;
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
				case "SelectDate":
					initValue = "";
					this.$set(this.value, this.currentFieldName, initValue);
					break;
				case "SelectList":
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
			if(typeof schemaAttrs !== 'undefined'){
				if(typeof schemaAttrs.dependsOn !== 'undefined'){
					if(typeof schemaAttrs.dependsOn.values !== 'undefined' && typeof schemaAttrs.dependsOn.name !== 'undefined'){
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
							if(schemaAttrs.dependsOn.values.indexOf(this.value[schemaAttrs.dependsOn.name]) !== -1){
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


