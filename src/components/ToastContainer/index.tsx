import { useContext } from "react";

import { ToastContext } from "@/context/ToastContext";
import Toast from "./Toast";

const ToastContainer = () => {
	const { toasts } = useContext(ToastContext);

	console.log(toasts);

	return (
		<div className="w-80 p-4 fixed z-[9999] top-0 right-0 h-full flex flex-col gap-5">
			{toasts.map((toast) => (
				<Toast key={toast.id} {...toast} />
			))}
		</div>
	);
};

export default ToastContainer;
