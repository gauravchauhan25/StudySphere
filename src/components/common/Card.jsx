export const Card = ({
  title,
  description,
  icon: Icon,
  image,
  children,
  className = "",
  onClick,
  hover = true,
}) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 ${
        hover ? "hover:shadow-md hover:-translate-y-1" : ""
      } transition-all duration-200 ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
    >
      {image && (
        <div className="mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
      )}

      {Icon && (
        <div className="mb-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      )}

      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {description}
        </p>
      )}

      {children}
    </div>
  );
};
