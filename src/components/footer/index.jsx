import Logo from "@/assets/images/circle-logo-outlined.webp";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="flex items-center w-full min-h-[160px] h-auto lg:min-h-[100px] lg:h-[100px] border-t border-t-snow px-4 sm:px-5 font-inter">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-[1320px] 2xl:max-w-[1400px]] mx-auto">
        <div className="order-3 lg:order-1">
          <p className="text-sm text-[#6D6E7A]">©2023 InfoBencana</p>
        </div>
        <div className="w-fit h-fit order-1 lg:order-2 mb-4">
          <img src={Logo} alt="infobencana logo" className="w-12 h-12" />
        </div>
        <div className="order-2 lg:order-3">
          <ul className="flex items-center space-x-3 lg:space-x-5 mb-2 text-[#6D6E7A] text-sm">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about-us">Tentang Kami</Link>
            </li>
            <li>
              <Link to="/contact">Kontak</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
