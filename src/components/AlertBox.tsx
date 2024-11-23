import React, { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import Button from "@/components/Button";

interface AlertBoxProps {
  isVisible: boolean;
  title: string;
  body: string;
  buttonStructure?: number; // 0 - OK, 1 - OK & Cancel, 2 - Yes & No
  button1OnClick?: () => void; // OK or Yes
  button2OnClick?: () => void; // Cancel or No
  buttonColorScheme?: number; // 0 - blue-primary for button 1 and red-primary for button2, 1 - red-primary for button 1 and blue-primary for button2
}

const AlertBox: React.FC<AlertBoxProps> = ({
  isVisible,
  title,
  body,
  buttonStructure = 0,
  button1OnClick = () => {},
  button2OnClick = () => {},
  buttonColorScheme = 0,
}) => {
  return (
    <Transition appear show={isVisible} as={Fragment}>
      <Dialog
        as="div"
        open={isVisible}
        onClose={() => {}}
        className=" fixed z-50 inset-0 overflow-y-auto flex flex-row items-center justify-center backdrop-blur-sm"
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-30"
          leave="ease-in duration-200"
          leaveFrom="opacity-30"
          leaveTo="opacity-0"
        >
          <DialogPanel className="fixed inset-0 bg-black opacity-30" />
        </TransitionChild>

        <div
          className={`w-[350px] sm:w-[550px] fixed inset-0 flex items-center justify-center mx-auto`}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-50"
            leaveTo="opacity-0"
          >
            <DialogPanel
              as="div"
              className="w-full relative z-50 bg-white bg-opacity-70 backdrop-blur-sm border border-blue-primary border-opacity-60 rounded-xl pt-5 px-7 pb-5 text-black"
            >
              <div className="items-center justify-between">
                <div className="items-center font-bold  text-blue space-x-3">
                  {title}
                </div>

                <div className="mt-2 text-sm">{body}</div>
                <div className="flex justify-end mt-2 space-x-4">
                  {buttonStructure == 0 && (
                    <Button
                      caption="OK"
                      onClick={() => button1OnClick()}
                      background={buttonColorScheme == 0 ? "bg-blue" : "bg-red"}
                    />
                  )}
                  {buttonStructure == 1 && (
                    <>
                      <Button
                        caption="OK"
                        onClick={() => button1OnClick()}
                        background={
                          buttonColorScheme == 0 ? "bg-blue" : "bg-red"
                        }
                      />
                      <Button
                        caption="Cancel"
                        onClick={() => button2OnClick()}
                        background={
                          buttonColorScheme == 0 ? "bg-red" : "bg-blue"
                        }
                      />
                    </>
                  )}
                  {buttonStructure == 2 && (
                    <>
                      <Button
                        caption="Yes"
                        onClick={() => button1OnClick()}
                        background={
                          buttonColorScheme == 0 ? "bg-blue" : "bg-red"
                        }
                      />
                      <Button
                        caption="No"
                        onClick={() => button2OnClick()}
                        background={
                          buttonColorScheme == 0 ? "bg-red" : "bg-blue"
                        }
                      />
                    </>
                  )}
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AlertBox;
