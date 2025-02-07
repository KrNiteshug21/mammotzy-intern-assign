import React, { useState } from "react";
import { SuccessModal } from "./SuccessModal";
import { FormState } from "@/lib/form-types";
import { initFormData } from "@/lib/form-init-obj";

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
  const onCloseModal = () => {
    setOpenModal(false);
    window.location.reload();
    handleTabChange("activity");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
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

    if (missingFields.length > 0) {
      alert(`Please fill all required fields: ${missingFields.join(", ")}`);
      return;
    }
    console.log("Form submitted", formData);
    setFormData(initFormData);
    setOpenModal(true);
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
            <label>Address Line 1:</label>
            <input
              className="border-gray-300 px-4 py-2 border rounded-full outline-none"
              type="text"
              name="addressLine1"
              placeholder="House number and street name"
              value={formData.addressLine1}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Address Line 2:</label>
            <input
              className="border-gray-300 px-4 py-2 border rounded-full outline-none"
              type="text"
              name="addressLine2"
              placeholder="Other information, eg: building name, landmark, etc."
              value={formData.addressLine2}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>ZIP Code:</label>
            <input
              className="border-gray-300 px-4 py-2 border rounded-full outline-none"
              type="text"
              name="zipCode"
              placeholder="eg: 123 467"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col flex-1 gap-2">
              <label>City:</label>
              <input
                className="border-gray-300 px-4 py-2 border rounded-full outline-none"
                type="text"
                name="city"
                placeholder="Your City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label>State:</label>
              <input
                className="border-gray-300 px-4 py-2 border rounded-full outline-none"
                type="text"
                name="city"
                placeholder="Your State"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="border-gray-300 my-10 border-t" />

          <div>
            <div className="mb-4">
              <h3 className="font-semibold text-xl">Contact Details</h3>
              <p>Please provide contact information for this activity.</p>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 w-full">
                <label className="hidden">
                  Contact Number (with country code):
                </label>
                <input
                  className="border-gray-300 px-4 py-2 border rounded-full w-full outline-none"
                  type="text"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="flex-1 w-full">
                <label className="hidden">Contact Name:</label>
                <input
                  className="border-gray-300 px-4 py-2 border rounded-full w-full outline-none"
                  type="text"
                  name="contactName"
                  placeholder="Contact Name"
                  value={formData.contactName}
                  onChange={handleChange}
                />
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
