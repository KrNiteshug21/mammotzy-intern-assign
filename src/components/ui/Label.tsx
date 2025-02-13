const Label = ({
  htmlFor,
  className = "",
  children,
  requiredField = true,
  handleFormError,
}: {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
  requiredField?: boolean;
  handleFormError?: any;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${className} flex items-center justify-between`}
    >
      <p>
        <span>{children}</span>
        {requiredField && <span className="ml-1 text-red-600">*</span>}
      </p>
      <p className="ml-auto text-sm">{handleFormError({ name: htmlFor })}</p>
    </label>
  );
};

export default Label;
