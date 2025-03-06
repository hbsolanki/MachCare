import GeneralModal from "../Utils/GeneralModel";
import LOGO from "../../assets/LOGO.jpeg";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";

import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

import { Dialog, DialogPanel, Popover, PopoverGroup } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export default function UserHeader() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = useCallback(() => {
    try {
      localStorage.clear();
      toast.success("Successfully Signed Out!");
      navigate("/");
    } catch (error) {
      toast.error("Signout failed.");
    }
    setIsModalOpen(false);
  }, [navigate]);

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between mt-4 p-2 lg:px-8">
        {/* Logo */}
        <div className="flex  lg:flex-1">
          <a href="/" className="">
            <span className="sr-only ">MechCare</span>
            <img alt="Logo" src={LOGO} className="h-10  w-auto" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2.5 text-gray-700"
            aria-label="Open Menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a
            href="#ExploreOtherPlansSection"
            className="text-sm font-semibold text-gray-900 flex items-center gap-1"
          >
            <DocumentTextIcon className="h-5 w-5" /> Plans
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-gray-900 flex items-center gap-1"
          >
            <GlobeAltIcon className="h-5 w-5" /> Regions We Serve
          </a>
          <a
            href="/user/service/need"
            className="text-sm font-semibold text-red-600 flex items-center gap-1"
          >
            <QuestionMarkCircleIcon className="h-5 w-5" /> Need Help
          </a>
        </PopoverGroup>

        {/* Logout Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm flex items-center font-semibold text-gray-900"
          >
            Logout <LogOut className="ml-1 h-5 w-5" />
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
            <a href="#" className="p-1.5">
              <img alt="Logo" src={LOGO} className="h-8 w-auto" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-gray-700"
              aria-label="Close Menu"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-2 py-6">
            <a
              href="#ExploreOtherPlansSection"
              className="block rounded-lg px-3 py-2 text-base leading-7 font-semibold text-gray-900 flex items-center gap-1 hover:bg-gray-50"
            >
              <DocumentTextIcon className="h-5 w-5" /> Plans
            </a>
            <a
              href="#"
              className="block rounded-lg px-3 py-2 text-base leading-7 font-semibold text-gray-900 flex items-center gap-1 hover:bg-gray-50"
            >
              <GlobeAltIcon className="h-5 w-5" /> Regions We Serve
            </a>
            <a
              href="#"
              className="block rounded-lg px-3 py-2 text-base leading-7 font-semibold text-red-600 flex items-center gap-1 hover:bg-gray-50"
            >
              <QuestionMarkCircleIcon className="h-5 w-5" /> Need Help
            </a>
          </div>
          <div className="mt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="block w-full rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        </DialogPanel>
      </Dialog>

      {/* Logout Confirmation Modal */}
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
