import { Modal } from "antd";

import "./modals.css";

export interface CommonModalInterface {
  open: boolean;
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export const CommonModal = (props: CommonModalInterface) => {
  const { open, title, children, onClose } = props;

  return (
    <Modal
      closable={false}
      open={open}
      onCancel={onClose}
      title={title}
      centered
      footer={null}
      styles={{
        body: {
          background: "linear-gradient(135deg, #1f1f1f 0%, #2c2c2c 100%)",
          borderRadius: 20,
          padding: 24,
          color: "#eee",
          fontFamily: "'Manrope'",
        },
        header: {
          borderBottom: "none",
          fontFamily: "Manrope, sans-serif",
        },
        content: {},
      }}
    >
      {children}
    </Modal>
  );
};
