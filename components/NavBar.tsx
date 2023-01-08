import Image from "next/image";
import { LegacyRef, useRef, useState } from "react";

export default function NavBar() {
  const [isHidden, setIsHidden] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamButton = useRef<HTMLDivElement>(null);

  const toggleNavbar = () => {
    setIsHidden((prev) => !prev);
    if (menuRef.current && hamButton.current) {
      if (isHidden) {
        menuRef.current.classList.remove("w-0");
        menuRef.current.classList.add("w-[60%]");
        hamButton.current.classList.remove("bg-blue-400");
        hamButton.current.classList.add("bg-white");
      } else {
        menuRef.current.classList.remove("w-[60%]");
        menuRef.current.classList.add("w-0");
        hamButton.current.classList.remove("bg-white");
        hamButton.current.classList.add("bg-blue-400");
      }
    }
  };

  return (
    <nav className="text-white text-2xl flex items-center justify-between md:mx-20 mx-3 my-3 font-thin">
      <div className="flex items-center justify-between md:justify-center gap-3 md:flex-1">
        <div
          className="p-1 rounded-lg z-50 bg-rose-300 md:hidden fixed"
          onClick={toggleNavbar}
          ref={hamButton}
        >
          <Image src="/ham.svg" width={20} height={20} alt="side menu"></Image>
        </div>

        <div
          ref={menuRef}
          className="fixed top-0 left-0 bottom-0 w-0 overflow-hidden bg-[#14213d] text-white md:text-black transition-all ease-in-out md:w-full md:bg-transparent md:static z-40"
        >
          <div className="px-5 md:flex md:justify-around md:items-center md:gap-20 md:w-full flex-1">
            <div className="flex justify-left items-center gap-2 mb-20 mt-16 md:justify-between md:mt-0 md:gap-5 md:mb-0">
              <Image src="/logo.svg" width={100} height={100} alt="logo" />
            </div>
            <ul className="flex flex-col gap-6 font-thin whitespace-nowrap md:flex-row ">
              <li className="hover:underline cursor-pointer">
                <a href="#howitworks">How It Works</a>
              </li>
              <li className="hover:underline cursor-pointer">
                <a href="#locations">Locations</a>
              </li>
              <li className="hover:underline cursor-pointer">
                <a href="#support">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ul className="flex justify-center items-center gap-6 text-black cursor-pointer">
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </li>
      </ul>
    </nav>
  );
}
