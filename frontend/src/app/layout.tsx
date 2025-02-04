import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Layout } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "BrightPath",
    description:
        "BrightPath is a custom platform for online courses covering niche tech topics not currently addressed elsewhere.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    const protectedRoutes = ["/user/profile", "/dashboard"];

    if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        if (protectedRoutes.includes(currentPath) && !session?.user) {
            return redirect("/auth/signin");
        }
    }

    return (
        <html lang="en">
            <body>
                <Providers>
                    <Layout
                        className={`${geistSans.variable} ${geistMono.variable} antialiased p-4 flex flex-col justify-start items-start bg-slate-200 dark:bg-slate-900 lg:h-svh font-medium font-mono`}
                    >
                        <Header className="flex justify-between text-lg md:text-2xl items-center w-full p-6 md:p-12  rounded-md md:rounded-xl shadow-sm border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                            <Link href={"/"} className="font-semibold">
                                BrightPath
                            </Link>
                            <nav className="flex justify-center items-center gap-4   ">
                                <Link
                                    href={"/"}
                                    className="text-slate-700 dark:text-slate-100 hover:opacity-75 hover:underline delay-500"
                                >
                                    Home
                                </Link>
                                <Link
                                    href={"/courses"}
                                    className="text-slate-700 dark:text-slate-100 hover:opacity-75 hover:underline delay-500"
                                >
                                    Courses
                                </Link>
                                {session?.user ? (
                                    <Link href={"/auth/signout"}>Signout</Link>
                                ) : null}
                                <Link
                                    href={
                                        session?.user
                                            ? "/user/profile"
                                            : "/auth/signin"
                                    }
                                    className="text-slate-700 dark:text-slate-100 hover:opacity-75 delay-500"
                                >
                                    <UserOutlined className="p-2 text-center rounded-full border shadow-sm" />
                                </Link>
                            </nav>
                        </Header>
                        {/* main contents */}
                        <main className="lg:container lg:mx-auto">
                            {children}
                        </main>

                        <Footer className="flex  w-full p-6 md:px-12  rounded-md md:rounded-xl shadow-sm border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                            {/* footer*/}
                            <Link
                                href="/our-team"
                                className="text-slate-700 dark:text-slate-100 hover:opacity-75 hover:underline delay-500"
                            >
                                Our Team
                            </Link>
                        </Footer>
                    </Layout>
                </Providers>
            </body>
        </html>
    );
}
