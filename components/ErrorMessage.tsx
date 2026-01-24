interface ErrorMessageProps {
  title?: string;
  message: string;
  icon?: string;
  onRetry?: () => void;
  isDark?: boolean;
}

export default function ErrorMessage({ 
  title = "Something went wrong", 
  message, 
  icon = "⚠️",
  onRetry,
  isDark = false
}: ErrorMessageProps) {
  return (
    <div className={`rounded-xl p-6 text-center ${isDark ? "bg-red-900/20 border-2 border-red-500/50" : "bg-red-50 border-2 border-red-200"}`}>
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-red-300" : "text-red-800"}`}>
        {title}
      </h3>
      <p className={`text-sm mb-4 ${isDark ? "text-red-200" : "text-red-600"}`}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className={`text-sm underline font-medium ${isDark ? "text-red-300 hover:text-red-200" : "text-red-700 hover:text-red-800"}`}
        >
          Try again
        </button>
      )}
    </div>
  );
}
