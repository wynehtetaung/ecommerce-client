/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";

import men from "../assets/banner_mens.png";
import women from "../assets/banner_women.png";
import kid from "../assets/banner_kids.png";

const banner = {
  men: men,
  women: women,
  kid: kid,
};

const UiStateContext = createContext();

export function UseUiState() {
  return useContext(UiStateContext);
}

export default function UiStateProvider({ children }) {
  return (
    <UiStateContext.Provider
      value={{
        banner,
      }}
    >
      {children}
    </UiStateContext.Provider>
  );
}
