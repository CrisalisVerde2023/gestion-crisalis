import React, { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import {
  CheckCircleFill,
  PatchPlusFill,
  PencilFill,
  Trash3Fill,
  XOctagonFill,
} from "react-bootstrap-icons";

type ToastCallbackType = (
  iconIdentifier: string,
  headerText: string,
  bodyContent: string,
  autohide: boolean
) => void;

let toastCallback: ToastCallbackType | null = null;

const iconMap: { [key: string]: JSX.Element } = {
  edit: <PencilFill />,
  add: <PatchPlusFill />,
  delete: <Trash3Fill />,
  check: <CheckCircleFill />,
  error: <XOctagonFill />,
  // Add more mappings here
};

export function showNotification(
  iconIdentifier: string,
  headerText: string,
  bodyContent: string,
  autohide = true
) {
  toastCallback?.(iconIdentifier, headerText, bodyContent, autohide);
}

export default function ToastNotification() {
  const [showToast, setShowToast] = useState(false);
  const [icon, setIcon] = useState<JSX.Element | null>(null);
  const [headerText, setHeaderText] = useState("");
  const [bodyContent, setBodyContent] = useState<string>("");
  const [autoHide, setAutoHide] = useState(true);

  useEffect(() => {
    toastCallback = (iconIdentifier, headerText, bodyContent, autohide) => {
      const mappedIcon = iconMap[iconIdentifier];
      setIcon(mappedIcon);
      setHeaderText(headerText);
      setBodyContent(bodyContent);
      setShowToast(true);
      setAutoHide(autohide);
    };
    return () => {
      toastCallback = null;
    };
  }, []);

  return (
    <Toast
      onClose={() => setShowToast(false)}
      show={showToast}
      delay={3000}
      autohide={autoHide}
      style={{ position: "fixed", bottom: "40px", right: "20px" }}
    >
      <Toast.Header>
        {icon}
        <strong className="me-auto" style={{ marginLeft: "5px" }}>
          {headerText}
        </strong>
      </Toast.Header>
      <Toast.Body>{bodyContent}</Toast.Body>
    </Toast>
  );
}
