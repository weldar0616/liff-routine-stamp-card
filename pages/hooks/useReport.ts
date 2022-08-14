import { useEffect } from "react";

const sendMessage = async () => {
  // TODO: Messaging API
};
const postReport = async () => {
  // TODO: insert DB
};

export const useReport = () => {
  useEffect(() => {
    console.log("useReport");
    async () => {
      await Promise.all([sendMessage, postReport]);
      // TODO: close rich menu
    };
  }, []);
};
