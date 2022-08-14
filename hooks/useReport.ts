import { useEffect } from "react";

const getProfile = async (liffId: string) => {
  // FIXME: liffIDをリクエストパラメータに含めるのは良くない
  const url = `/api/line/profile?liffId=${liffId}`;
  const encodeURI = encodeURIComponent(url);
  const response = await fetch(encodeURI);
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
        // const userName = await getProfile(liffId);
        // await Promise.all([sendMessage(userName), postReport(userName)]);

        // TEST
        let userName = "";
        try {
          userName = await getProfile(liffId);
        } catch (e) {
          if (e instanceof Error) {
            alert("getProfile Error")
            throw e;
          }
        }
        try {
          await sendMessage(userName);
        } catch (e) {
          if (e instanceof Error) {
            alert("sendMessage Error")
            throw e;
          }
        }
        try {
          await postReport(userName);
        } catch (e) {
          if (e instanceof Error) {
            alert("postReport Error")
            throw e;
          }
        }
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
