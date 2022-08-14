import type { GetServerSideProps, NextPage } from "next";
import Calendar, {
  CalendarProps,
  CalendarTileProperties,
  DateCallback,
} from "react-calendar";
import { beginningOfLastMonth, endOfMonth, formatForView } from "../../lib/date";
import prisma from "../../lib/prisma";
import styles from "../../styles/Home.module.css";
import Image from "next/image";

type ReportView = {
  [date: string]: string;
};

interface ReportsProps {
  reports: ReportView;
}


const ReportsView: NextPage<ReportsProps> = ({ reports }) => {
  const getTileContent = ({
    date,
  }: CalendarTileProperties): JSX.Element | null => {
    const userName = reports[formatForView(date)];
    const isStamp = !!userName;
    return (
      <div style={{  height: "50px", margin: '0 auto' /*position: 'relative', left: '-15%' */}}>
          {isStamp && (
            <Image
              src={"/images/stamp.png"}
              width={50}
              height={50}
              alt="stamp"
            ></Image>
          )}
      </div>
    );
  };
  const onClickDay: DateCallback = (value, event) => {
    const day = formatForView(value);
    const userName = reports[day];
    if (!userName) {
      return;
    }
    // TODO: style調整が面倒なためalertでuserNameを表示. tileContentで表示したい.
    alert(userName)
    return;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* https://github.com/wojtekmaj/react-calendar/issues/501 */}
        <Calendar
          locale="ja"
          calendarType="US"
          defaultView="month"
          view="month"
          minDate={beginningOfLastMonth}
          maxDate={endOfMonth}
          tileContent={getTileContent}
          showNeighboringMonth={false}
          prev2Label={null}
          next2Label={null}
          onClickDay={onClickDay}
        ></Calendar>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const reports = await prisma.reports.findMany({
    select: {
      id: false,
      date: true,
      user_name: true,
      kind: false,
    },
    where: {
      date: {
        gte: beginningOfLastMonth,
        lt: endOfMonth,
      },
      kind: 1, // TODO: 種別テーブルを用意すべき
    },
  });
  const reportView: ReportView = {};
  for (const report of reports) {
    reportView[formatForView(report.date)] = report.user_name;
  }

  const jsonReports = JSON.parse(JSON.stringify(reportView));
  return { props: { reports: jsonReports } };
};

export default ReportsView;
