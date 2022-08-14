import { Liff } from "@line/liff";
import { useEffect } from "react";

const fetchProfile = async (liff: Liff, liffId: string) => {
  await liff.init({ liffId }).catch((error) => {
    alert(`[liff#init error] ${error}`);
  });

  const profile = await liff.getProfile().catch((error) => {
    if (process.env.NODE_ENV !== "test") {
      alert(`[liff#getProfile error] ${error}: LIFF ID = ${liffId}`);
    }
  });
  return profile;
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
          const liff = (await import("@line/liff")).default;
          const profile = await fetchProfile(liff, liffId);  // FIXME
          if (!profile) {
            return;
          }

          userName = profile.displayName;
        } catch (e) {
          if (e instanceof Error) {
            alert("getProfile Error");
            throw e;
          }
        }
        try {
          await sendMessage(userName);
        } catch (e) {
          if (e instanceof Error) {
            alert("sendMessage Error");
            throw e;
          }
        }
        try {
          await postReport(userName);
        } catch (e) {
          if (e instanceof Error) {
            alert("postReport Error");
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
