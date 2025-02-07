import React, { useState } from "react";
import Label from "@/components/ui/Label";
import { FormState } from "@/lib/form-types";

const activityDescriptionOptions = [
  { label: "Adventure & Games", value: "adventure_games" },
  { label: "Creative Expression", value: "creative_expression" },
  { label: "Food & Drink", value: "food_drink" },
  { label: "Learning & Development", value: "learning_development" },
  { label: "Sports and Fitness", value: "sports_fitness" },
  { label: "Volunteering", value: "volunteering" },
  { label: "Other", value: "other" },
];

const activityTypeOptions = [
  { label: "Indoor", value: "indoor" },
  { label: "Outdoor", value: "outdoor" },
  { label: "Virtual", value: "virtual" },
];

const locationTypeOptions = [
  { label: "Provider Location", value: "provider" },
  { label: "User Location", value: "user" },
];

const ActivityForm = ({
  formData,
  setFormData,
  handleTabChange,
}: {
  formData: FormState;
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
  handleTabChange: (tab: string) => void;
}) => {
  const [otherActivityCategory, setOtherActivityCategory] =
    useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // List of required fields
    const requiredFields = [
      "activityName",
      "category",
      "about",
      "activityType",
      "locationType",
      "minMembers",
      "maxMembers",
    ];

    // Check if any of the required fields are empty
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof FormState]
    );

    if (
      missingFields.length > 0 &&
      formData.category !== "other" &&
      formData.category !== ""
    ) {
      alert(`Please fill all required fields: ${missingFields.join(", ")}`);
      return;
    }

    // Proceed with form submission logic
    handleTabChange("location");
    console.log("Form submitted successfully!", formData);
  };

  // const handleOtherActivityCategory = () => {
  //   console.log("Other category selected");
  //   console.log("otherActivityCategory", otherActivityCategory);
  //   setFormData({
  //     ...formData,
  //     category: otherActivityCategory,
  //   });
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "category" && value === "other") {
      console.log("Other category selected");
      setFormData({
        ...formData,
        category: otherActivityCategory,
      });
    } else {
      console.log(name, value);
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <section className="flex-1 w-full text-sm">
      <h2 className="mb-4 font-semibold text-xl">Activity Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label>Activity Name</Label>
          <input
            className="border-gray-300 px-4 py-2 border rounded-full w-full sm:w-4/5 outline-none"
            type="text"
            placeholder="Eg: Cooking Class in Palo Alto"
            value={formData.activityName}
            name="activityName"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Select the best category to describe your activity </Label>
          {activityDescriptionOptions.map((option) => (
            <div className="flex items-center gap-2" key={option.value}>
              <input
                type="radio"
                id={option.value}
                name="category"
                value={option.value}
                onChange={handleChange}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
          <input
            className="border-gray-300 px-4 py-2 border rounded-full w-full sm:w-4/5 outline-none"
            type="text"
            name="category"
            placeholder="Specify the category"
            value={otherActivityCategory}
            onChange={(e) => {
              setOtherActivityCategory(e.target.value);
              console.log("category", formData.category);
              handleChange(e);
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>About Activity</Label>
          <textarea
            className="border-gray-300 px-4 py-2 border rounded-md w-full sm:w-4/5 outline-none"
            rows={6}
            placeholder="Activity Desciption"
            value={formData.about}
            name="about"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Activity Type</Label>
          {activityTypeOptions.map((option) => (
            <div className="flex items-center gap-2" key={option.value}>
              <input
                type="radio"
                id={option.value}
                name="activityType"
                value={option.value}
                onChange={handleChange}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Label>Type of Location</Label>
          {locationTypeOptions.map((option) => (
            <div className="flex items-center gap-2" key={option.value}>
              <input
                type="radio"
                id={option.value}
                name="locationType"
                value={option.value}
                onChange={handleChange}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>

        <div>
          <h2 className="mb-2">
            How many members can take part in the activity?
          </h2>
          <div className="flex gap-4 w-full sm:w-4/5">
            <div className="flex flex-col flex-1 gap-2">
              <label className="hidden">How Many Members (Min):</label>
              <input
                className="border-gray-300 px-4 py-2 border rounded-full outline-none"
                type="text"
                placeholder="Minimum Members"
                value={formData.minMembers}
                name="minMembers"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label className="hidden">How Many Members (Max):</label>
              <input
                className="border-gray-300 px-4 py-2 border rounded-full outline-none"
                type="text"
                placeholder="Maximum Members"
                value={formData.maxMembers}
                name="maxMembers"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <button
          className="bg-blue-950 px-4 py-2 rounded-full text-white"
          type="button"
          onClick={handleSubmit}
        >
          Save and Continue
        </button>
      </form>
    </section>
  );
};

export default ActivityForm;
