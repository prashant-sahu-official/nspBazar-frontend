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

      // ⏳ Pehle delay (25 sec) ke baad ek baar modal dikhana
      timeoutRef.current = setTimeout(() => {
        setShowModal(true);

        // 🔄 Uske baad har 30 sec repeat karna
        intervalRef.current = setInterval(() => {
          setShowModal(true);
        }, 30000);

      }, 30000); // 30 sec ka delay
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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
