type LoadingButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function LoadingButton({
  children,
  loading = false,
  disabled = false,
  onClick,
  className = "",
  type = "button",
}: LoadingButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        w-full rounded-2xl px-4 py-3
        text-sm font-medium transition
        uppercase
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2 uppercase">
          <span
            className="
              h-4 w-4 animate-spin rounded-full
              border-2 border-current border-t-transparent
            "
          />
          Cargando...
        </span>
      ) : (
        children
      )}
    </button>
  );
}