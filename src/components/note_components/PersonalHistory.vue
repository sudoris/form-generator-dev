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
                    values: ["Yes"]
                  }
                }                  
              },
              smokingFrequency: {
                description: "frequency of smoking",
                type: "object",
                fieldName: "frequency",
                properties: {
                  state: {
                    description: "state",
                    type: "radio",
                    fieldName: "state",
                    values: ["Stop smoking for", "Occasionally", "Pack/day"]
                  },
                  years: {
                    description: "years",
                    type: "selectlist",
                    fieldName: "years",
                    values: ["1", "2", "3"],
                    attrs: {
                      dependencies: {
                        name: "state",
                        values: ["Stop smoking for","Pack/day"]
                      }
                    }
                  },
                  times: {
                    description: "times",
                    type: "selectlist",
                    fieldName: "times",
                    values: ["3", "2", "1"],
                    attrs: {
                      dependencies: {
                        name: "state",
                        values: ["Pack/day"]
                      }
                    }
                  }
                },
                attrs: {
                  dependencies: {
                    name: "smoking",
                    values: ["Yes"]
                  }
                }
              }
            }
          }
        }
      },
      required: [ "productId" ]
    }
  }
}
</script>

<style>

</style>