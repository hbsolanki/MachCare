import GeneralModal from "../Utils/GeneralModel";
import LOGO from "../../assets/LOGO.jpeg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

const products = [
  {
    name: "Analytics",
    description: "Get insights into traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Interact with customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Secure customer data",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Third-party tools integration",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Strategic funnel conversions",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

export default function UserHeader() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    try {
      localStorage.clear();
      navigate("/");
    } catch (error) {
      alert("Error logging out:", error.message || error);
    }
    setIsModalOpen(false);
  };

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="Logo" src={LOGO} className="h-10 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <Bars3Icon className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a href="#" className="text-sm font-semibold text-gray-900">
            Features
          </a>
          <a href="#" className="text-sm font-semibold text-gray-900">
            Marketplace
          </a>
          <a href="#" className="text-sm font-semibold text-gray-900">
            Company
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm font-semibold text-gray-900"
          >
            Logout &rarr;
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full bg-white px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <img
                alt="Logo"
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 p-2.5 text-gray-700"
            >
              <XMarkIcon className="size-6" />
            </button>
          </div>
          <div className="space-y-2 py-6">
            <a
              href="#"
              className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
            >
              Features
            </a>
            <a
              href="#"
              className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
            >
              Marketplace
            </a>
            <a
              href="#"
              className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
            >
              Company
            </a>
          </div>
          <div className="mt-6">
            <div className="py-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="block w-full rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      {/* General Modal for Logout Confirmation */}
      <GeneralModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title="Logout"
        message="Are you sure you want to logout?"
        onConfirm={handleLogout}
        confirmText="Logout"
        cancelText="Cancel"
      />
    </header>
  );
}
