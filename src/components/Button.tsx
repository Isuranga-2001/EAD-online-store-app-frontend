import React, { FC } from "react";
import classNames from "classnames";

/**
 * Props for the Button component.
 */
interface ButtonProps {
  /** The caption text for the button */
  caption: string;
  /** Callback function to handle button click */
  onClick: () => void;
  /** The width of the button */
  width?: string;
  /** The background color of the button */
  background?: string;
  /** Optional icon component to display inside the button */
  icon?: React.ComponentType<{ className?: string }> | null;
  /** The text color of the button */
  textColor?: string;
  /** The color of the icon */
  iconColor?: string;
  /** Custom class name for the button */
  buttonClassName?: string;
  /** Custom class name for the icon */
  iconClassName?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
}

/**
 * Button component renders a customizable button with optional icon.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @returns {JSX.Element} The rendered Button component.
 */
const Button: FC<ButtonProps> = ({
  caption = "Button",
  onClick = () => {},
  width = "w-auto",
  background = "bg-blue",
  icon: Icon = null,
  textColor = "text-white",
  iconColor = "text-white",
  buttonClassName = "",
  iconClassName = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "rounded-md",
        background,
        width,
        "px-10 py-2 text-sm font-semibold shadow-sm my-2 flex justify-center items-center hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-300 ease-in-out",
        textColor,
        buttonClassName,
        { "opacity-50 cursor-not-allowed": disabled }
      )}
      disabled={disabled}
    >
      {Icon && (
        <Icon
          className={classNames("text-md mr-3", iconColor, iconClassName)}
        />
      )}
      <span>{caption}</span>
    </button>
  );
};

export default Button;
