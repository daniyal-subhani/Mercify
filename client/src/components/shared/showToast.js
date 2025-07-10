import { toast } from "sonner"; 

export const showToast = ({
  message = "Something happened!",
  description = "",
  type = "default", // "success" | "error" | "warning" | "info"
  actionLabel,
  onActionClick,
}) => {
  toast[type](message, {
    description,
    className: "text-base p-6 rounded-xl",
    action: actionLabel
      ? {
          label: actionLabel,
          onClick: onActionClick,
        }
      : undefined,
  });
};
