"use client";
import SectionWrapper from "@/components/SectionWrapper";
import Sidebar from "@/components/Sidebar";
import ActivityForm from "@/components/ActivityForm";
import LocationForm from "@/components/LocationForm";
import { useState } from "react";
import { FormState } from "@/lib/form-types";
import { initFormData } from "@/lib/form-obj";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("activity");
  const [formData, setFormData] = useState<FormState>(initFormData);
  const handleTabChange = (tab: string) => setActiveTab(tab);

  return (
    <SectionWrapper className="my-8">
      <h1 className="font-semibold text-lg tracking-wide">
        Create New activity
      </h1>

      <main className="flex gap-8 mt-4">
        <Sidebar activeTab={activeTab} handleTabChange={handleTabChange} />
        {activeTab === "activity" ? (
          <ActivityForm
            formData={formData}
            setFormData={setFormData}
            handleTabChange={handleTabChange}
          />
        ) : (
          <LocationForm
            formData={formData}
            setFormData={setFormData}
            handleTabChange={handleTabChange}
          />
        )}
      </main>
    </SectionWrapper>
  );
}
