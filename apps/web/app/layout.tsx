import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import "@fontsource-variable/geist";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`font-[geist]  antialiased text-foreground bg-background`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
