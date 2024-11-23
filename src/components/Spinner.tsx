import React, { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { PuffLoader } from "react-spinners";

/**
 * Props for the Spinner component.
 */
interface SpinnerProps {
  /** Whether the spinner is visible */
  isVisible: boolean;
  /** Optional loading text displayed below the spinner */
  loadingText?: string | null;
}

/**
 * Spinner component renders a loading spinner with optional loading text.
 *
 * @param {SpinnerProps} props - The props for the Spinner component.
 * @returns {JSX.Element} The rendered Spinner component.
 */
const Spinner: React.FC<SpinnerProps> = ({ isVisible, loadingText = null }) => {
  return (
    <Transition appear show={isVisible} as={Fragment}>
      <Dialog
        as="div"
        open={isVisible}
        onClose={() => {}}
        className="fixed z-50 inset-0 overflow-y-auto flex flex-col items-center justify-center backdrop-blur-sm"
      >
        <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-30"
          leave="ease-in duration-200"
          leaveFrom="opacity-30"
          leaveTo="opacity-0"
        >
          <DialogPanel className="fixed inset-0 bg-black-primary bg-opacity-30" />
        </TransitionChild>

        <div className="z-10 flex flex-col justify-center items-center">
          <PuffLoader color={"#fff"} loading={true} size={70} />
          {loadingText != null && (
            <div className="text-white text-md mt-4 font-semibold">
              {loadingText}
            </div>
          )}
        </div>
      </Dialog>
    </Transition>
  );
};

export default Spinner;
