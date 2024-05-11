import { useNotificationContext } from "@/context/NotificationContext";

const Notification = (props) => {
  const { title, message, status } = props;
  const { hideNotification } = useNotificationContext();
  return (
    <div
      className={`${
        status === "error" ? "bg-red-500" : "bg-green-500"
      } text-white py-auto sticky bottom-0 flex justify-around items-center h-20`}
      onClick={hideNotification}
    >
      <h2 className="font-bold text-2xl">{title}</h2>
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
};

export default Notification;
