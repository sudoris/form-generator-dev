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
        title: "Review of the system",
        description: "review of the system of the patient",
        type: "object",
          properties: {
            general: {
              description: "general review",
              type: "object",
              fieldName: "general",
              label: "General",
              properties: {
                state: {
                  description: "general state",
                  type: "radio",
                  fieldName: "state",
                  label: "State",
                  values: ["Normal", "Abnormal"]
                },
                abnormalities: {
                  description: "abnormalities of the patient",
                  type: "checklist",
                  fieldName: "abnormalities",
                  values: [
                    "dizziness",
                    "Fainting", 
                    "Insomnia",
                    "Mental status change",
                    "Weakness",
                    "Numbness",
                    "Convulsion",
                    "Memory defect",
                    "Tremor",
                    "Gait disturbance",
                    "Delusion",
                    "Drug abuse",
                    "Suicide attempt",
                    "Hallucination",
                    "Stress",
                    "Nervousness",
                    "Depression",
                    "Others",
                  ]
                },
                others: {
                  description: "abnormalities of the patient",
                  type: "text",
                  fieldName: "others",
                  attrs: {
                    dependencies: {
                      name: "abnormalities",
                      value: "Others"
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
