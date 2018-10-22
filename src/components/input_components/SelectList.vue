
<template>
  <div>
    <fieldset>
      <div v-if="showInputField">
        <select v-model="value[schema.fieldName]">
          <template v-if="typeof schema.attrs.placeholder !== 'undefined'">
            <option value="" >{{ schema.attrs.placeholder }}</option>
          </template>
          <!-- dynamic placeholder and placeholder name?-->
          <option
            v-for="(item, index) in schema.values"
            :key="index"
            :value="item">
            {{ item }}
          </option>
        </select>
      </div>
    </fieldset>
  </div>
</template>

<script>

export default {
  name: "SelectList",
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
      placeholder: this.getPlaceholder(),
      currentFieldName: this.schema.fieldName            
    }
  },
  created: function() {
    if (!(this.currentFieldName in this.value)) {
      // this.value[this.currentFieldName] = {}
      this.$set(this.value, this.currentFieldName, "");
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
        case "SelectList":
          initValue = ""
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