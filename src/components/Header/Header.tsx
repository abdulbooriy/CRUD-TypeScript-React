import { memo } from "react";
import country__logo from "../../assets/icons/countries.svg";

const Header = () => {
  return (
    <header className="h-[80px] bg-gray-700 py-2.5 border-b-2 border-gray-800 text-white">
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between">
          <div>
            <img
              className="w-[60px]"
              src={country__logo}
              alt="country logo image"
            />
          </div>
          <ul>
            <li className="text-3xl font-medium">Countries</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
