import React, { useState } from "react";
import Label from "@/components/ui/Label";
import { FormState } from "@/lib/form-types";
import { SafeParseReturnType } from "zod";
import { ActivitySchema } from "@/lib/ActivitySchema";
import {
  activityDescriptionOptions,
  activityTypeOptions,
  locationTypeOptions,
} from "@/lib/form-obj";

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
  const [parseResult, setParseResult] =
    useState<SafeParseReturnType<any, any>>();

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

    const res = ActivitySchema.safeParse(formData);
    setParseResult(res);
    if (res?.error) {
      return;
    }

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "category" && value === "other") {
      setFormData({
        ...formData,
        category: otherActivityCategory,
      });
    } else {
      setFormData({
        ...formData,
        [name]:
          name === "minMembers" || name === "maxMembers"
            ? parseInt(value)
            : value,
      });
    }
  };

  const handleFormError = ({ name }: { name: string }) => {
    const errorExist = parseResult?.error?.errors.find(
      (error) => error.path[0] === name
    );
    if (!errorExist) return null;
    return <span className="text-red-500 text-sm">{errorExist.message}</span>;
  };

  return (
    <section className="flex-1 w-full text-base">
      <h2 className="mb-4 font-semibold text-xl">Activity Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label
            className="w-full sm:w-11/12"
            htmlFor="activityName"
            handleFormError={handleFormError}
          >
            Activity Name
          </Label>
          <input
            className="px-4 py-2 border border-gray-300 rounded-full outline-none w-full sm:w-11/12"
            type="text"
            placeholder="Eg: Cooking Class in Palo Alto"
            value={formData.activityName}
            name="activityName"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            className="w-full sm:w-11/12"
            htmlFor="category"
            handleFormError={handleFormError}
          >
            Select the best category to describe your activity{" "}
          </Label>
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
            className="px-4 py-2 border border-gray-300 rounded-full outline-none w-full sm:w-11/12"
            type="text"
            name="category"
            placeholder="Specify the category"
            value={otherActivityCategory}
            onChange={(e) => {
              setOtherActivityCategory(e.target.value);
              handleChange(e);
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            className="w-full sm:w-11/12"
            htmlFor="about"
            handleFormError={handleFormError}
          >
            About Activity
          </Label>
          <textarea
            className="px-4 py-2 border border-gray-300 rounded-md outline-none w-full sm:w-11/12"
            rows={6}
            placeholder="Activity Desciption"
            value={formData.about}
            name="about"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            className="w-full sm:w-11/12"
            htmlFor="activityType"
            handleFormError={handleFormError}
          >
            Activity Type
          </Label>
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
          <Label
            className="w-full sm:w-11/12"
            htmlFor="locationType"
            handleFormError={handleFormError}
          >
            Type of Location
          </Label>
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
          <div className="flex gap-4 w-full sm:w-11/12">
            <div className="flex flex-col flex-1 gap-2">
              <label className="hidden">How Many Members (Min):</label>
              <input
                className="px-4 py-2 border border-gray-300 rounded-full outline-none"
                type="number"
                placeholder="Minimum Members"
                value={formData.minMembers}
                name="minMembers"
                onChange={handleChange}
              />
              <p className="ml-2 text-sm">
                {handleFormError({ name: "minMembers" })}
              </p>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label className="hidden">How Many Members (Max):</label>
              <input
                className="px-4 py-2 border border-gray-300 rounded-full outline-none"
                type="number"
                placeholder="Maximum Members"
                value={formData.maxMembers}
                name="maxMembers"
                onChange={handleChange}
              />
              <p className="ml-2 text-sm">
                {handleFormError({ name: "maxMembers" })}
              </p>
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
