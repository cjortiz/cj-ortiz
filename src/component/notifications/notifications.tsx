import { notification } from "antd";
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleFilled,
  InfoCircleFilled,
  WarningFilled,
} from "@ant-design/icons";
import "./notifications.css";

export enum NotificationType {
  error = "error",
  warning = "warning",
  info = "info",
  success = "success",
}

export const openModernNotification = (
  api: any,
  message: string,
  description: string,
  type: NotificationType
) => {
  const iconHandler = () => {
    switch (type) {
      case NotificationType.error:
        return (
          <CloseCircleFilled style={{ color: "#c51414ff", fontSize: 22 }} />
        );

      case NotificationType.success:
        return (
          <CheckCircleFilled
            style={{
              color: "#1d8321aa",
              fontSize: 22,
            }}
          />
        );

      case NotificationType.info:
        return (
          <InfoCircleFilled style={{ color: "#fbff09d2", fontSize: 22 }} />
        );

      case NotificationType.warning:
        return <WarningFilled style={{ color: "#fbff09ff", fontSize: 22 }} />;

      default:
        return (
          <CheckCircleFilled
            style={{
              color: "#1d8321aa",
              fontSize: 22,
            }}
          />
        );
    }
  };

  api.open({
    message: (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {iconHandler()}
        <span
          style={{
            fontWeight: 700,
            fontSize: 16,
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          {message}
        </span>
      </div>
    ),
    description: (
      <div
        style={{
          fontFamily: "'Manrope', sans-serif",
          color: "#555",
          fontSize: 14,
          marginTop: 4,
          lineHeight: 1.4,
        }}
      >
        {description}
      </div>
    ),
    placement: "bottomRight",
    className: "custom-notification",

    duration: 4,
  });
};
