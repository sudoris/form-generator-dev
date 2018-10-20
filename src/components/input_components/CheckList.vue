
<template>
  <div>
    <fieldset>
      <div v-if="showInputField">
        <div v-for="(item, index) in schema.values" :key="index">
          <input type="checkbox" :id="item" :value="item" v-model="value[schema.fieldName]">
          <label :for="item">{{ item }}</label>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>

export default {
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
			//dependencies name is Array?
			if (schemaAttrs) {
				if(schemaAttrs.dependencies && Array.isArray(this.value[schemaAttrs.dependencies.name])){
					if(this.value[schemaAttrs.dependencies.name].indexOf(schemaAttrs.dependencies.value) !== -1){
						return true
					}else {
						this.clearInput()
						return false
					}
				}else {
					if (!(schemaAttrs.dependencies) || (this.value[schemaAttrs.dependencies.name] === schemaAttrs.dependencies.value)) {
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