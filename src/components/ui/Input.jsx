import React, { useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

const Input = React.forwardRef(
  (
    {
      label,
      error,
      className = "",
      containerClassName = "",
      type,
      icon: Icon,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
        {label && (
          <label className="text-sm font-medium text-foreground">{label}</label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground rtl:left-auto rtl:right-0 rtl:pr-3">
              <Icon size={18} />
            </div>
          )}
          <input
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            className={`flex h-11 w-full rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200
              ${
                error
                  ? "border-red-500 focus-visible:ring-red-500/20 text-red-900 placeholder:text-red-300 dark:text-red-100"
                  : "border-input focus-visible:ring-ring focus:border-primary"
              } ${className}
              ${Icon ? "pl-10 rtl:pr-10 rtl:pl-3" : ""}
              ${isPassword ? "pr-10 rtl:pl-10 rtl:pr-3" : ""}
              ${error && !isPassword ? "pr-10 rtl:pl-10 rtl:pr-3" : ""}`}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute inset-y-0 ${error ? "right-8 rtl:right-auto rtl:left-8" : "right-0 rtl:right-auto rtl:left-0"} pr-3 pl-3 flex items-center text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:text-primary rtl:pl-3 rtl:pr-0`}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}

          {error && (
            <div
              className={`absolute inset-y-0 ${isPassword ? "right-8 rtl:left-8 rtl:right-auto" : "right-3 rtl:left-3 rtl:right-auto"} flex items-center pointer-events-none`}
            >
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>
          )}
        </div>
        {error && (
          <div className="flex items-center gap-1.5 px-1 animate-in fade-in slide-in-from-top-1 duration-200">
            <span className="text-xs font-medium text-red-500">{error}</span>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
