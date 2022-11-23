import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import UserLinks from "./UserLinks";
import NormalLinks from "./NormalLinks";

import LoadingGif from "assets/icons/LoadingGif";

const Header = ({setSidebarView}) => {
  const signedIn = useSelector((state) => state.firebase.auth.isEmpty);
  const [links, setLinks] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLinks(
        !signedIn ? (
          <UserLinks setSidebarView={setSidebarView} />
        ) : (
          <NormalLinks />
        )
      );
    }, 0);
  }, [signedIn]);

  if (!links) {
    return (
      <div className="text-black flex justify-center">
        <LoadingGif className="w-16 h-16" />
      </div>
    );
  }

  return <>{links}</>;
};

export default Header;
