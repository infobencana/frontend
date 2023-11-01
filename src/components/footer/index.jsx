import Logo from "@/assets/images/circle-logo-outlined.webp";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="flex items-center w-full min-h-[160px] h-auto lg:min-h-[100px] lg:h-[100px] border-t border-t-snow px-4 lg:px-5 py-8 lg:py-0 font-inter">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-[1320px] 2xl:max-w-[1400px]] mx-auto">
        <div className="flex-1 order-3 lg:order-1">
          <p className="text-sm text-[#6D6E7A]">
            © 2023 Infobencana | Satu Tujuan Bantu Sesama
          </p>
        </div>
        <div className="w-fit h-fit order-1 lg:order-2 mb-6 lg:mb-0">
          <img src={Logo} alt="infobencana logo" className="w-12 h-12" />
        </div>
        <div className="flex-1 order-2 lg:order-3">
          <ul className="flex justify-end items-center space-x-4 mb-4 lg:mb-0 text-[#6D6E7A] text-sm">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">Tentang Kami</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
