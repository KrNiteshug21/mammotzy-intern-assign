const Label = ({
  className,
  children,
  requiredField = true,
}: {
  className?: string;
  children: React.ReactNode;
  requiredField?: boolean;
}) => {
  return (
    <label className={className}>
      <span>{children}</span>
      {requiredField && <span className="ml-1 text-red-600">*</span>}
    </label>
  );
};

export default Label;
