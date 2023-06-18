// Layout.js

import React from "react";
import LoadingLine from "../LoadingLine/LoadingLine";

const Layout = ({ children }: { children: any }) => {
  return (
    <div>
      <LoadingLine />
      {children}
    </div>
  );
};

export default Layout;
