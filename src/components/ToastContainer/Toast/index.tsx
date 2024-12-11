import { Toast as IToast, ToastContext } from "@/context/ToastContext";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { FaCheck, FaSkullCrossbones } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdInfo } from "react-icons/md";

const Toast: FC<IToast> = ({ id, type, message }) => {
	const { deleteToast } = useContext(ToastContext);
	const [visible, setVisible] = useState(true);
	const timerId = useRef<ReturnType<typeof setTimeout>>(null);

	useEffect(() => {
		timerId.current = setTimeout(() => {
			setVisible(false);
			deleteToast(id);
		}, 5000);

		return () => {
			if (timerId.current) clearTimeout(timerId.current);
		};
	}, [deleteToast, id]);

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					key="modal"
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0 }}
					className={clsx(
						"flex items-center justify-between p-4 rounded-2xl font-medium text-black bg-white shadow-xl",
						{
							"bg-red-500 text-white": type === "error",
							"bg-blue-500 text-white": type === "info",
							"bg-teal-500 text-white": type === "success",
							"bg-white text-black": !type,
						}
					)}
				>
					<div className="flex items-center gap-3 text-sm">
						{type === "error" && <FaSkullCrossbones size={20} />}
						{type === "success" && <FaCheck size={20} />}
						{type === "info" && <MdInfo size={20} />}
						{message}
					</div>

					<motion.button
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						whileTap={{ scale: 0.8 }}
						onClick={() => setVisible(false)}
						className={clsx("p-2 rounded-2xl transition", {
							"bg-red-600 hover:bg-red-700 text-white":
								type === "error" || !type,
							"bg-white text-black hover:bg-gray-200":
								type && type !== "error",
						})}
					>
						<IoMdClose />
					</motion.button>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Toast;
