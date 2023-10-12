import PropTypes from "prop-types";
import React from "react";

interface Props {
  title: string;
  thirdTitle: string;
  headerType: "search" | "main" | "sub-header";
  className: any;
  style: any;
  firstNameClassName: any;
  hasButtons: boolean;
}

export const Header = ({
  title = "Home",
  thirdTitle = "Home",
  headerType,
  style,
  className,
  firstNameClassName,
}: Props): JSX.Element => {
  return (
    <div
      style={style}
      className={`flex items-center relative ${
        ["main", "search"].includes(headerType)
          ? "[border-bottom-style:solid]"
          : ""
      } ${
        ["main", "search"].includes(headerType)
          ? "border-newothercard-border"
          : ""
      } ${headerType === "sub-header" ? "w-[880px]" : "w-[1240px]"} ${
        headerType === "search" ? "opacity-0" : ""
      } ${
        headerType === "search"
          ? "gap-[10px]"
          : headerType === "sub-header"
          ? "gap-[50px]"
          : ""
      } ${
        headerType === "search"
          ? "px-[20px] py-[18px]"
          : headerType === "sub-header"
          ? "px-0 py-px"
          : "px-[20px] py-[14px]"
      } ${
        headerType === "main"
          ? "h-[60px]"
          : headerType === "sub-header"
          ? "h-[26px]"
          : ""
      } ${["main", "search"].includes(headerType) ? "border-b" : ""} ${
        headerType === "main" ? "justify-between" : ""
      } ${className}`}
    >
      {["main", "sub-header"].includes(headerType) && (
        <div
          className={`flex items-center grow flex-1 relative ${
            headerType === "main" ? "gap-[10px]" : "gap-[8px]"
          }`}
        >
          <div
            className={`relative ${headerType === "main" ? "flex" : ""} ${
              headerType === "sub-header" ? "mt-[-1.00px]" : ""
            } ${
              headerType === "sub-header"
                ? "[font-style:var(--new-18-medium-font-style)]"
                : ""
            } ${headerType === "main" ? "items-center" : ""} ${
              headerType === "sub-header" ? "text-newfontdark" : ""
            } ${headerType === "main" ? "flex-1" : ""} ${
              headerType === "main" ? "px-[8px] py-[4px]" : ""
            } ${
              headerType === "sub-header"
                ? "leading-[var(--new-18-medium-line-height)]"
                : ""
            } ${headerType === "sub-header" ? "font-new-18-medium" : ""} ${
              headerType === "sub-header" ? "w-fit" : ""
            } ${headerType === "main" ? "grow" : ""} ${
              headerType === "sub-header"
                ? "font-[number:var(--new-18-medium-font-weight)]"
                : ""
            } ${headerType === "sub-header" ? "whitespace-nowrap" : ""} ${
              headerType === "main" ? "rounded-[4px]" : ""
            } ${
              headerType === "sub-header"
                ? "text-[length:var(--new-18-medium-font-size)]"
                : ""
            } ${headerType === "main" ? "gap-[10px]" : ""} ${
              headerType === "sub-header"
                ? "tracking-[var(--new-18-medium-letter-spacing)]"
                : ""
            } ${headerType === "main" ? firstNameClassName : undefined}`}
          >
            {headerType === "sub-header" && <>{title}</>}

            {headerType === "main" && (
              <div className="relative flex-1 mt-[-1.00px] font-new-13-medium font-[number:var(--new-13-medium-font-weight)] text-newfontdark text-[length:var(--new-13-medium-font-size)] tracking-[var(--new-13-medium-letter-spacing)] leading-[var(--new-13-medium-line-height)] [font-style:var(--new-13-medium-font-style)]">
                {title}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  thirdTitle: PropTypes.string,
  time: PropTypes.string,
  headerTitle: PropTypes.string,
  headerType: PropTypes.oneOf(["search", "main", "sub-header"]),
  hasButtons: PropTypes.bool,
};
