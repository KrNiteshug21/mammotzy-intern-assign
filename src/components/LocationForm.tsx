import React, { useState } from "react";
import { SuccessModal } from "./SuccessModal";
import { FormState } from "@/lib/form-types";
import { initFormData } from "@/lib/form-obj";
import { LocationSchema } from "@/lib/LocationSchema";
import { SafeParseReturnType } from "zod";
import Label from "./ui/Label";

const LocationForm = ({
  formData,
  setFormData,
  handleTabChange,
}: {
  formData: FormState;
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
  handleTabChange: (tab: string) => void;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [parseResult, setParseResult] =
    useState<SafeParseReturnType<any, any>>();
  const onCloseModal = () => {
    setOpenModal(false);
    window.location.reload();
    handleTabChange("activity");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = [
      "addressLine1",
      "addressLine2",
      "zipCode",
      "city",
      "contactNumber",
      "contactName",
    ];

    // Check if any of the required fields are empty
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof FormState]
    );

    const res = LocationSchema.safeParse(formData);
    setParseResult(res);
    if (res?.error) {
      return;
    }

    if (missingFields.length > 0) {
      alert(`Please fill all required fields: ${missingFields.join(", ")}`);
      return;
    }
    console.log("Form submitted", formData);
    setFormData(initFormData);
    setOpenModal(true);
  };

  const handleFormError = ({ name }: { name: string }) => {
    const errorExist = parseResult?.error?.errors.find(
      (error) => error.path[0] === name
    );
    if (!errorExist) return null;
    return <span className="text-red-500 text-sm">{errorExist.message}</span>;
  };

  return (
    <>
      <SuccessModal open={openModal} onClose={onCloseModal} />
      <section className="flex-1 w-full text-sm">
        <div className="mb-4">
          <h2 className="font-semibold text-xl">Location Details</h2>
          <p>Please specify the address for where the activity takes place.</p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="addressLine1" handleFormError={handleFormError}>
              Address Line 1
            </Label>
            <input
              className="px-4 py-2 border border-gray-300 rounded-full outline-none"
              type="text"
              name="addressLine1"
              placeholder="House number and street name"
              value={formData.addressLine1}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="addressLine2" handleFormError={handleFormError}>
              Address Line 2
            </Label>
            <input
              className="px-4 py-2 border border-gray-300 rounded-full outline-none"
              type="text"
              name="addressLine2"
              placeholder="Other information, eg: building name, landmark, etc."
              value={formData.addressLine2}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="zipCode" handleFormError={handleFormError}>
              ZIP Code
            </Label>
            <input
              className="px-4 py-2 border border-gray-300 rounded-full outline-none"
              type="text"
              name="zipCode"
              placeholder="eg: 123 467"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col flex-1 gap-2">
              <Label htmlFor="city" handleFormError={handleFormError}>
                City:
              </Label>
              <input
                className="px-4 py-2 border border-gray-300 rounded-full outline-none"
                type="text"
                name="city"
                placeholder="Your City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <Label htmlFor="state" handleFormError={handleFormError}>
                State:
              </Label>
              <input
                className="px-4 py-2 border border-gray-300 rounded-full outline-none"
                type="text"
                name="state"
                placeholder="Your State"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="my-10 border-gray-300 border-t" />

          <div>
            <div className="mb-4">
              <h3 className="font-semibold text-xl">Contact Details</h3>
              <p>Please provide contact information for this activity.</p>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 w-full">
                <label htmlFor="contactNumber" className="hidden">
                  Contact Number (with country code):
                </label>
                <input
                  className="px-4 py-2 border border-gray-300 rounded-full outline-none w-full"
                  type="text"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
                <p className="ml-2 text-sm">
                  {handleFormError({ name: "contactNumber" })}
                </p>
              </div>

              <div className="flex-1 w-full">
                <label htmlFor="contactName" className="hidden">
                  Contact Name:
                </label>
                <input
                  className="px-4 py-2 border border-gray-300 rounded-full outline-none w-full"
                  type="text"
                  name="contactName"
                  placeholder="Contact Name"
                  value={formData.contactName}
                  onChange={handleChange}
                />
                <p className="ml-2 text-sm">
                  {handleFormError({ name: "contactName" })}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => handleTabChange("activity")}
              className="px-4 py-2 border rounded-full"
              type="button"
            >
              Previous
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-950 px-4 py-2 rounded-full text-white"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default LocationForm;
