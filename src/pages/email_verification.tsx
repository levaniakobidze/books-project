import Email_verified from "@/components/Modals/Email_verified";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

const Email_verification = () => {
  const [errorMessage, setErrorMessage] = useState("");

  let hash: any = "";
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    hash = urlParams.get("hash");
  }

  useEffect(() => {
    axios
      .post("https://books-project-back-production.up.railway.app/api/verify", {
        hash: hash,
      })
      .then()
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.message);
      });
  }, []);

  return (
    <Fragment>
      <Email_verified error={errorMessage} />
    </Fragment>
  );
};

export default Email_verification;
