<template>
	     
	<div v-if="showInputField">
		
			<label>{{ schema.attrs.label }}</label>
				<div class="display-inline" v-for="(item, index) in schema.attrs.values" :key="index">
					<input type="radio" :id="item" :value="item" v-model="value[schema.attrs.fieldName]">
					<label :for="item">{{ item }}</label>
				</div>
		
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
			currentFieldName: this.schema.attrs.fieldName
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
			//dependsOn name is Array?
			if (schemaAttrs) {
				if(schemaAttrs.dependsOn && Array.isArray(this.value[schemaAttrs.dependsOn.name])){
					if(this.value[schemaAttrs.dependsOn.name].indexOf(schemaAttrs.dependsOn.value) !== -1){
						return true
					} else {
						this.clearInput()
						return false
					}
				}
				if (!(schemaAttrs.dependsOn) || (this.value[schemaAttrs.dependsOn.name] === schemaAttrs.dependsOn.value)) {
					return true
				} else {
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
/* .display-inline {
	display: inline;
}  */
</style>
