import { type ReactElement } from "react";

const Sidebaritems = ({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) => {
  function handleClick() {
    if (text === "Twitter") {
      window.open("https://twitter.com", "_blank");
    } else {
      window.open("https://youtube.com", "_blank");
    }
  }

  return (
    <div
      onClick={handleClick}
      className="flex gap-4 items-center pr-2 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-md rounded max-w-70 pl-4 transition-all duration-150"
    >
      {icon}
      {text}
    </div>
  );
};

export default Sidebaritems;
