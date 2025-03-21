# **Section 8: Accessible & Performant Modals in React**  

## **Introduction**  
Modals are commonly used for user interactions like confirmations, forms, and alerts. However, they can be problematic for accessibility if not implemented correctly. This section covers:  

1. Ensuring modals are keyboard accessible  
2. Managing focus within the modal  
3. Preventing background content from being read by screen readers  
4. Live coding example: A fully accessible modal in React  

---

## **1. Ensuring Modals Are Keyboard Accessible**  
By default, when a modal appears, users should be able to:  
✅ Open and close it using only the keyboard  
✅ Navigate inside it using the `Tab` key  
✅ Close it with the `Escape` key  

### **Example: Keyboard Events for Modals**  
```jsx
useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, []);
```
✅ Pressing `Escape` closes the modal.  

---

## **2. Managing Focus Within the Modal**  
When a modal opens:  
✅ **Focus should move to the modal**  
✅ **Tab navigation should stay inside the modal**  
✅ **Focus should return to the triggering element when closed**  

### **Example: Trap Focus Inside the Modal**  
```jsx
import { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  return isOpen ? (
    <div
      role="dialog"
      aria-modal="true"
      tabIndex="-1"
      ref={modalRef}
    >
      <p>Modal Content</p>
      <button onClick={onClose}>Close</button>
    </div>
  ) : null;
};
```
✅ The modal receives focus when opened.  

---

## **3. Preventing Background Content from Being Read by Screen Readers**  
When a modal is open, background content should be **inaccessible** to assistive technologies.  

### **Solution: Use `aria-hidden` on Background Elements**  
```jsx
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div aria-hidden={isModalOpen}>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
```
✅ Screen readers ignore background content when the modal is open.  

---

## **4. Live Coding Example: Fully Accessible Modal in React**  

### **Step 1: Create the Modal Component**  
```jsx
import { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      tabIndex="-1"
      ref={modalRef}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "20px",
        zIndex: 1000,
      }}
    >
      <p>Accessible Modal Content</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Modal;
```

### **Step 2: Implement the Modal in an App**  
```jsx
import { useState } from "react";
import Modal from "./Modal";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
```
✅ Users can open and close the modal using both the mouse and keyboard.  

---

## **Summary of Key Takeaways**  
✅ Ensure modals are **keyboard accessible** (`Tab` key, `Escape` key)  
✅ Manage **focus** by moving it inside the modal and returning it when closed  
✅ Prevent background content from being **read by screen readers** (`aria-hidden`)  

---