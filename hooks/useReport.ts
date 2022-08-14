import { useEffect } from "react";

const getProfile = async (liffId: string) => {
  const response = await fetch(`/api/line/profile?liffId=${liffId}`);
  const data = await response.json();
  return data.userName;
};

const sendMessage = async (userName: string) => {
  const requestData = { userName };
  const response = await fetch("/api/line/messaging", {
    method: "POST",
    body: JSON.stringify(requestData),
  });
  const data = await response.json();
  console.log("sendMessage", { data });
  return;
};

const postReport = async (userName: string) => {
  const requestData = { userName };
  await fetch("/api/report/post", {
    method: "POST",
    body: JSON.stringify(requestData),
  });
  return;
};

export const useReport = (liffId: string) => {
  useEffect(() => {
    (async () => {
      const userName = await getProfile(liffId);
      await sendMessage(userName);

      // await Promise.all([sendMessage(userName), postReport(userName)]);

      // Close rich menu
      if (process.env.NODE_ENV === "production") {
        const liff = (await import("@line/liff")).default;
        liff.closeWindow();
      }
    })();
  }, []);
};
