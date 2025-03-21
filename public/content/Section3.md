# **Section 3: Interactive Elements & State Management**  

## **Introduction**  
Interactive elements like forms, buttons, modals, and dropdowns must be both accessible and performant. This section covers:  

1. Making forms accessible  
2. Handling focus management  
3. Building an accessible modal  
4. Live coding example: Accessible modal component in React  

---

## **1. Making Forms Accessible**  
Forms are a critical part of web apps, but they often have accessibility issues.  

### **Best Practices for Accessible Forms**  
✅ Use `<label>` elements explicitly associated with inputs  
✅ Ensure keyboard accessibility (all elements should be focusable)  
✅ Provide helpful error messages and validation feedback  

### **Bad Example (No Label, Poor Accessibility)**  
```jsx
<input type="text" placeholder="Enter name" />
```
⚠️ Screen readers won’t associate the input with a description.  

### **Good Example (Proper Label Association)**  
```jsx
<label htmlFor="name">Name</label>
<input type="text" id="name" name="name" />
```
✅ Screen readers can now properly announce the input’s purpose.  

---

## **2. Handling Focus Management**  
Focus management ensures that users navigating via keyboard or screen readers can interact with UI elements in a logical order.  

### **Common Issues & Fixes**  
| **Issue** | **Fix** |
|-----------|--------|
| Focus is lost when modals or popups open | Use `useRef()` to trap focus inside the modal |
| Users don’t know when errors occur | Use `aria-live` to announce changes |
| Buttons and links don’t have clear focus states | Add `:focus-visible` styles |

---

## **3. Building an Accessible Modal**  
A common interactive UI component is a modal. However, modals must:  
- Trap focus inside when open  
- Return focus to the previous element when closed  
- Be closable via the `Escape` key  

---

## **4. Live Coding Example: Accessible Modal Component in React**  

### **Step 1: Create the Modal Component**  
```jsx
import { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      className="modal-overlay"
      tabIndex="-1"
      ref={modalRef}
    >
      <div className="modal-content">
        {children}
        <button onClick={onClose} aria-label="Close modal">Close</button>
      </div>
    </div>
  );
};

export default Modal;
```

### **Step 2: Add Modal Styles for Accessibility**  
```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}
```

### **Step 3: Use the Modal in a Component**  
```jsx
import { useState } from "react";
import Modal from "./Modal";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Accessible Modal</h2>
        <p>This modal traps focus and returns it upon closing.</p>
      </Modal>
    </div>
  );
};

export default App;
```

---

## **Summary of Key Takeaways**  
✅ Use proper `<label>` elements for accessible forms  
✅ Manage focus properly in modals and interactive elements  
✅ Ensure modals trap focus and can be dismissed with `Escape`  

---