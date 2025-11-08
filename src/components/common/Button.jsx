import React from "react";

export const Button = ({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 " +
      "dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white dark:focus:ring-blue-400",
    secondary:
      "bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500 " +
      "dark:bg-teal-500 dark:hover:bg-teal-600 dark:text-white dark:focus:ring-teal-400",
    outline:
      "border-2 border-teal-400 text-teal-600 hover:bg-teal-50 focus:ring-teal-500 " +
      "dark:border-teal-500 dark:text-teal-400 dark:hover:bg-gray-800 dark:focus:ring-teal-400",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-gray-200"></div>
      ) : (
        <>
          {Icon && iconPosition === "left" && <Icon className="w-4 h-4 mr-2" />}
          {children}
          {Icon && iconPosition === "right" && (
            <Icon className="w-4 h-4 ml-2" />
          )}
        </>
      )}
    </button>
  );
};
