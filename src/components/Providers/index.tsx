"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";

import { ToastProvider } from "@/context/ToastContext";
import { store } from "@/store";
import ToastContainer from "../ToastContainer";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<NextUIProvider>
				<ToastProvider>
					{children}
					<ToastContainer />
				</ToastProvider>
			</NextUIProvider>
		</Provider>
	);
}
