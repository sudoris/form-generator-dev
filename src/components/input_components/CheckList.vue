<template>
             
  <div v-if="showInputField">
     
      <div class="display-inline" v-for="(item, index) in schema.attrs.values" :key="index">
        <input type="checkbox" :id="item" :value="item" v-model="value[schema.attrs.fieldName]">
        <label :for="item">{{ item }}</label>
      </div>
   
  </div>              
  
</template>

<script>

export default {
  name: "CheckList",
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
  created: function() {
    if (!(this.currentFieldName in this.value)) {
      // this.value[this.currentFieldName] = {}
      // this.$emit('input', this.value)
      this.$set(this.value, this.currentFieldName, []);
      //this.value["keyOnCreate"] = {};
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
			//dependsOn name is Array?
			if (schemaAttrs) {
				if(schemaAttrs.dependsOn && Array.isArray(this.value[schemaAttrs.dependsOn.name])){
					if(this.value[schemaAttrs.dependsOn.name].indexOf(schemaAttrs.dependsOn.value) !== -1){
						return true
					}else {
						this.clearInput()
						return false
					}
				}else {
					if (!(schemaAttrs.dependsOn) || (this.value[schemaAttrs.dependsOn.name] === schemaAttrs.dependsOn.value)) {
						return true
					}else {
						this.clearInput()
						return false
					}	
				}
			}
			return true
		}
	}
}
</script>

<style>

</style>