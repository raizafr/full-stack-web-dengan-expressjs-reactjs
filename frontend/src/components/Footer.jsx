import { ReactSVG } from "react-svg";
import Logo from "../../public/assets/svg/logo.svg";

const Footer = () => {
  return (
    <footer className="mt-10 p-4 shadow md:px-6 md:py-8 dark:bg-gray-800">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <ReactSVG src={Logo} />
        </div>
        <ul className="flex flex-wrap items-center mb-6 sm:mb-0">
          <li>
            <a
              href="#"
              className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#"
              className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
            >
              Licensing
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-sm text-gray-500 hover:underline dark:text-gray-400"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        &copy; 2023 DigitalzoneID. All Right Reserved.
      </span>
    </footer>
  );
};

export default Footer;
