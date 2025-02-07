import { Flag, MapPin } from "lucide-react";
import React from "react";

const Sidebar = ({
  activeTab,
  handleTabChange,
}: {
  activeTab: string;
  handleTabChange: (tab: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 pr-8 border-r font-semibold">
      <button
        className={`flex items-center gap-2 py-2 px-4 rounded-md ${
          activeTab === "activity" && "bg-gray-100"
        }`}
        onClick={() => handleTabChange("activity")}
      >
        <Flag strokeWidth={"2px"} className="w-5 h-5" />
        Activity Details
      </button>
      <button
        className={`flex items-center gap-2 py-2 px-4 rounded-md ${
          activeTab === "location" && "bg-gray-100"
        }`}
        onClick={() => handleTabChange("location")}
      >
        <MapPin strokeWidth={"2px"} className="w-5 h-5" />
        Location Details
      </button>
    </div>
  );
};

export default Sidebar;
