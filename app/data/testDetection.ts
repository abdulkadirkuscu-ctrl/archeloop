import { detectLoop } from "./intelligenceEngine";

const result = detectLoop({
  bodyActivation: ["chest tightness"],

  emotions: [
    "ashamed",
    "invisible"
  ],

  thoughts: [
    "I am not enough"
  ],

  responseStyle: "collapse",

  trigger: "criticism",

  person: "manager",

  environment: "work",
});

console.log(result);