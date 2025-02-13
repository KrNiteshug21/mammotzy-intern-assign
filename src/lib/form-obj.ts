import { FormState } from "./form-types";


export const initFormData: FormState = {
  activityName: "",
  category: "",
  about: "",
  activityType: "",
  locationType: "",
  minMembers: 0,
  maxMembers: 0,
  addressLine1: "",
  addressLine2: "",
  zipCode: "",
  city: "",
  state:"",
  contactNumber: "",
  contactName: "",
};

export const activityDescriptionOptions = [
  { label: "Adventure & Games", value: "adventure_games" },
  { label: "Creative Expression", value: "creative_expression" },
  { label: "Food & Drink", value: "food_drink" },
  { label: "Learning & Development", value: "learning_development" },
  { label: "Sports and Fitness", value: "sports_fitness" },
  { label: "Volunteering", value: "volunteering" },
  { label: "Other", value: "other" },
];

export const activityTypeOptions = [
  { label: "Indoor", value: "indoor" },
  { label: "Outdoor", value: "outdoor" },
  { label: "Virtual", value: "virtual" },
];

export const locationTypeOptions = [
  { label: "Provider Location", value: "provider" },
  { label: "User Location", value: "user" },
];
