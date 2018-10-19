<template>
  <div>
    <Section :schema="schema" :schemaData="schemaData"></Section>
  </div>
</template>

<script>
import Section from "../Section" 


export default {
  components: {
    Section
  },
  data() {
    return {
      schemaData: {},
      schema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        $id: "http://example.com/product.schema.json",
        title: "Personal History",
        description: "Personal history of the patient",
        type: "object",
          properties: {
            habits: {
              description: "habits of the patient",
              type: "object",
              fieldName: "habits",
              label: "Habits",
              properties: {
                smoking: {
                  description: "smoking habit",
                  type: "radio",
                  fieldName: "smoking",
                  label: "Smoking",
                  values: ["No", "Yes"]
                },
                species: {
                  description: "cigarette species",
                  type: "checklist",
                  fieldName: "species",
                  label: "Species",
                  values: ["Cigarettes", "Electronic cigarettes"],
                  attrs: {
                    dependencies: {
                      name: "smoking",
                      value: "Yes"
                    }
                  }                  
                }
              }
            }
          },
        required: [ "productId" ]
      }
    }
  },

}
</script>

<style>

</style>