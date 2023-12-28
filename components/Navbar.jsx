import { useGlobalHook } from "@/states/Context";
import React from "react";

const Navbar = () => {
  const { showMenu, setShowMenu } = useGlobalHook();
  return (
    <nav className="w-full nav sticky top-0 -z-20 text-right bg-white">
      <button
        className={`block md:hidden absolute top-3.5 ${
          showMenu ? "left-64" : "left-2.5"
        }  z-50`}
      >
        {!showMenu && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/menu.svg"
            onClick={() => setShowMenu(true)}
            alt=""
            className="w-8 h-8 "
          />
        )}
      </button>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/Profile.svg" alt="" className="ml-auto mr-8 py-3" />
    </nav>
  );
};

export default Navbar;
