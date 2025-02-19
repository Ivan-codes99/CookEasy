const responseFormat = {
    "name": "recipe",
    "strict": true,
    "schema": {
      "type": "object",
      "required": [
        "name",
        "ingredients",
        "instructions"
      ],
      "properties": {
        "name": {
          "type": "string",
          "description": "The name of the recipe."
        },
        "ingredients": {
          "type": "array",
          "items": {
            "type": "object",
            "required": [
              "name",
              "unit",
              "quantity"
            ],
            "properties": {
              "name": {
                "type": "string",
                "description": "The name of the ingredient."
              },
              "unit": {
                "enum": [
                  "lb",
                  "lbs",
                  "oz",
                  "fl oz",
                  "count",
                  "gallon",
                  "cup",
                  "tbsp",
                  "tsp",
                  "pinch",
                  "dash",
                  "clove",
                  "cloves",
                  "sprig",
                  "sprigs",
                  "slice",
                  "slices",
                  "can",
                  "cans",
                  "bar",
                  "bars",
                  "pack",
                  "packs",
                  "stick",
                  "sticks",
                  "bunch"
                ],
                "type": "string",
                "description": "The measurement unit for the ingredient."
              },
              "quantity": {
                "type": "number",
                "description": "The amount of the ingredient."
              }
            },
            "additionalProperties": false
          },
          "description": "List of ingredients for the recipe."
        },
        "instructions": {
          "type": "array",
          "items": {
            "type": "string",
            "description": "A numbered step in the recipe's preparation process, formatted as 'Step X: [instruction]'."
          },
          "description": "Steps for preparing the recipe, formatted as 'Step X: [instruction]'."
        }
      },
      "additionalProperties": false
    }
  }
export default responseFormat;