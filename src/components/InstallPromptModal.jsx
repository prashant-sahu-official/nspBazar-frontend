import { useEffect, useState } from "react";
import "./InstallPromptModal.css"; // yahan pe apni css file import karo

function InstallPromptModal() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowModal(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // popup har 20 sec baad show karne ke liye
  useEffect(() => {
    const interval = setInterval(() => {
      if (deferredPrompt) {
        setShowModal(true);
      }
    }, 20000); // 20 seconds

    return () => clearInterval(interval);
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
