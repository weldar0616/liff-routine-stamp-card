import { useEffect } from "react";

const getProfile = async (liffId: string) => {
  // FIXME: liffIDをリクエストパラメータに含めるのは良くない
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
  if (process.env.NODE_ENV !== "production") {
    console.log("[debug]sendMessage", { response });
  }
  return;
};

const postReport = async (userName: string) => {
  const requestData = { userName };
  const response = await fetch("/api/report/post", {
    method: "POST",
    body: JSON.stringify(requestData),
  });
  if (process.env.NODE_ENV !== "production") {
    console.log("[debug]postReport", { response });
  }
  return;
};

export const useReport = (liffId: string) => {
  useEffect(() => {
    (async () => {
      try {
        const userName = await getProfile(liffId);
        await Promise.all([sendMessage(userName), postReport(userName)]);
      } catch (e) {
        if (e instanceof Error) {
          alert(e.message);
        } else {
          alert("[Error] promise");
        }
      } finally {
        // Close rich menu
        if (process.env.NODE_ENV === "production") {
          const liff = (await import("@line/liff")).default;
          liff.closeWindow();
        }
      }
    })();
  }, []);
};
