import React, { useEffect, useState } from "react";
import { UsersLinks } from "./links/UsersLinks";
import { NormalLinks } from "./links/NormalLinks";
import { useSelector } from "react-redux";
import { LoadingGifSVG } from "../../../../assets/images/loadingGif";

export const SidebarDefaultHeader = ({ setSidebarView }) => {
  const signedIn = useSelector((state) => state.firebase.auth.isEmpty);
  const [links, setLinks] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLinks(
        !signedIn ? (
          <UsersLinks setSidebarView={setSidebarView} />
        ) : (
          <NormalLinks />
        )
      );
    }, 0);
  }, [signedIn]);

  if (!links) {
    return (
      <div className="text-black flex justify-center">
        <LoadingGifSVG className="w-16 h-16" />
      </div>
    );
  }

  return <>{links}</>;
};
