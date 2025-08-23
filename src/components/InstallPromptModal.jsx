import { useEffect, useState, useRef } from "react";
import "./InstallPromptModal.css"; // yahan pe apni css file import karo

function InstallPromptModal() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);

    // directly modal dikhane ki jagah timeout se show karo
      timeoutRef.current = setTimeout(() => {
        setShowModal(true);
      }, 25000); // 25 sec baad modal show hoga
      };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // popup har 30 sec baad show karne ke liye
 useEffect(() => {
    if (deferredPrompt && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setShowModal(true);
      }, 30000); // 30 sec
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [deferredPrompt]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      console.log("User choice:", choiceResult.outcome);
      setDeferredPrompt(null);
      setShowModal(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setDeferredPrompt(null);
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Install NSPBazaar</h2>
        <p className="modal-text">
          Would you like to install our app for a better experience?
        </p>
        <div className="modal-buttons">
          <button onClick={handleInstall} className="button install-btn">
            Install
          </button>
          <button onClick={handleClose} className="button cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstallPromptModal;
