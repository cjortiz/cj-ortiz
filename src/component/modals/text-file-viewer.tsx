import { CommonModal } from "./common-modal";

interface FileViewerInterface {
  filePath: string;
  open: boolean;
  onClose: () => void;
}

export const FileViewer = ({
  filePath,
  open,
  onClose,
}: FileViewerInterface) => {
  const pdfViewer = (
    <div
      style={{
        width: "100%",
        height: "600px",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <iframe
        src={filePath}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="PDF Viewer"
      />
    </div>
  );

  return (
    <CommonModal
      open={open}
      onClose={onClose}
      title="My resume"
      children={pdfViewer}
    />
  );
};
