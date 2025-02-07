import React from "react";

const SectionWrapper = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={className}>
      <div className="mx-auto p-2 max-w-screen-lg">{children}</div>
    </div>
  );
};

export default SectionWrapper;
