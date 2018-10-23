<template>
	<div v-if="showInputField"> 
		<div v-for="(field, key) in schema.properties" :key="key">   
			<component 
				:is="getComponentName(field.attrs.fieldType)" 
				:schema="field"
				v-model="value[currentFieldName]">         
			</component>
		</div>
	</div>
</template>

<script>
import TextInput from "../input_components/TextInput"
import RadioInput from "../input_components/RadioInput"
import Checkbox from "../input_components/Checkbox"
import CheckList from "../input_components/CheckList"
import NumberInput from "../input_components/NumberInput"
import SelectDate from "../input_components/SelectDate"
import SelectList from "../input_components/SelectList"


export default {
	name: 'ObjectComponent',
	components: {
		TextInput,
		RadioInput,
		Checkbox,
		CheckList,
		NumberInput,
		SelectList,
		SelectDate,
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


