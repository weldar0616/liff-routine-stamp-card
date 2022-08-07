# [LIFF App] 日課の達成状況を共有
## 仕様
- LINEの同一公式アカウントに所属するともだちに対して、日課を実施したことが報告できる
  - タイトル(日課の内容)、LINEのユーザ名、日時
- 日課の達成状況をカレンダー形式で確認できる
  - 達成していたら花丸スタンプ + ユーザ名
  - 達成状況は1日1つまで記録可能
  - 同日に複数達成報告をした場合は上書きされていく
## 技術スタック
- Next.js / React
  - create-next-app
- TypeScript
- [react-calendar](https://github.com/wojtekmaj/react-calendar)
- Messaging API
- [DB] PostgreSQL
  - heroku postgres
- [ORM] [Prisma](https://www.prisma.io/)
- [deploy/hosting] Vervel
## 参考資料
- [Next.js､ Prisma､PostgreSQLでフルスタックアプリを作る](https://qiita.com/tomohiko_ohhashi/items/da804ed1f5870c9ce52d)
- Heroku Postgres下準備
  - [How to set up a free PostgreSQL database on Heroku](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1)
  - [Heroku CLI](https://devcenter.heroku.com/ja/articles/heroku-cli)
  - [PostgreSQLのインストール](https://k-sasaking.net/programing/heroku-postgres-install/)
- [TypeScript ORM「Prisma」のはじめかた](https://www.memory-lovers.blog/entry/2021/10/13/113000)

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
