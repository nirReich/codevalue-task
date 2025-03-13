import React, { FC } from "react";

const AppButton:FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({children,...props}) => {
  return <button {...props}>
    {children}
  </button>;
};

export default AppButton;
