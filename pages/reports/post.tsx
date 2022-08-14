import { NextPage } from "next";
import { useReport } from "../../hooks/useReport";

const ReportsPost: NextPage = () => {
  useReport(`${process.env.LIFF_ID_POST_APP}`); // FIXME: env types

  return <>送信中...</>;
};

export default ReportsPost;
