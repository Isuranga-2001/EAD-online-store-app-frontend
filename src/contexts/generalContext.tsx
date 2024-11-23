import React, { createContext, useState, ReactNode, useContext } from "react";
import AlertBox from "@/components/AlertBox";

interface AlertBoxProps {
  isVisible: boolean;
  title: string;
  body: string;
  buttonStructure?: number; // 0 - OK, 1 - OK & Cancel, 2 - Yes & No
  button1OnClick?: () => void; // OK or Yes
  button2OnClick?: () => void; // Cancel or No
  buttonColorScheme?: number; // 0 - blue-primary for button 1 and red-primary for button2, 1 - red-primary for button 1 and blue-primary for button2
}

interface GeneralContextType {
  showAlertBox: (props: AlertBoxProps) => void;
  hideAlertBox: () => void;
}

export const GeneralContext = createContext<GeneralContextType>({
  showAlertBox: () => {},
  hideAlertBox: () => {},
});

interface GeneralContextProviderProps {
  children: ReactNode;
}

export const GeneralContextProvider: React.FC<GeneralContextProviderProps> = ({
  children,
}) => {
  // Properties of AlertBox
  const [alertBoxProps, setAlertBoxProps] = useState<AlertBoxProps>({
    isVisible: false,
    title: "",
    body: "",
    buttonStructure: 0,
    button1OnClick: () => {},
    button2OnClick: () => {},
    buttonColorScheme: 0,
  });

  const showAlertBox = (props: AlertBoxProps) => {
    setAlertBoxProps({
      ...props,
      isVisible: true,
    });
  };

  const hideAlertBox = () => {
    setAlertBoxProps((prevState) => ({
      ...prevState,
      isVisible: false,
    }));
  };

  return (
    <GeneralContext.Provider value={{ showAlertBox, hideAlertBox }}>
      {children}
      <AlertBox {...alertBoxProps} />
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = (): GeneralContextType => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error(
      "useGeneralContext must be used within a GeneralContextProvider"
    );
  }
  return context;
};
