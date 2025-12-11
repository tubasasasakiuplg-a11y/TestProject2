import type { NextAuthConfig } from 'next-auth';
import Credentials from "next-auth/providers/credentials";

console.log('NEXTAUTH_URL =', process.env.NEXTAUTH_URL);
console.log('NEXTAUTH_SECRET set =', !!process.env.NEXTAUTH_SECRET);

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        return isLoggedIn; // ダッシュボードはログイン必須
      }

      // それ以外は常に許可
      return true;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // ここで認証処理を書く
        if (!credentials?.email || !credentials?.password) return null;

        // 例: DBからユーザーを取得してパスワード照合
        const email = credentials.email as string;
        const user = { id: "1", name: "Test User", email };
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
