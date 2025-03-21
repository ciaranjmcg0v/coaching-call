# **Section 5: Building Keyboard-Accessible Components**  

## **Introduction**  
Keyboard accessibility is crucial for users who rely on keyboards, screen readers, or assistive technologies. This section covers:  

1. Ensuring all interactive elements are keyboard navigable  
2. Managing focus state correctly  
3. Implementing keyboard shortcuts for better UX  
4. Live coding example: A fully keyboard-accessible dropdown in React  

---

## **1. Ensuring All Interactive Elements Are Keyboard Navigable**  
By default, interactive HTML elements (like `<button>` and `<a>`) are keyboard-accessible. However, custom UI components (like dropdowns, modals, and sliders) require additional work.  

### **Best Practices for Keyboard Accessibility**  
✅ Use **native HTML elements** whenever possible (e.g., `<button>` instead of `<div>` for click events)  
✅ Avoid removing `outline` styles—use `:focus-visible` instead  
✅ Use `tabindex="0"` to make non-interactive elements focusable  

**Bad Example (Unfocusable Div as a Button)**  
```jsx
<div onClick={handleClick}>Click Me</div>
```
⚠️ This cannot be focused or activated with the keyboard.  

**Good Example (Proper Button Element)**  
```jsx
<button onClick={handleClick}>Click Me</button>
```
✅ This is fully keyboard-accessible.  

---

## **2. Managing Focus State Correctly**  
When opening interactive components like modals, focus should:  
- Move inside the component when it opens  
- Stay trapped inside while open  
- Return to the previous focused element when closed  

**Example: Managing Focus in a Modal**  
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
    <div role="dialog" aria-modal="true" tabIndex="-1" ref={modalRef}>
      <p>Modal Content</p>
      <button onClick={onClose}>Close</button>
    </div>
  ) : null;
};
```
✅ Focus moves into the modal when it opens.  

---

## **3. Implementing Keyboard Shortcuts for Better UX**  
Keyboard shortcuts improve usability by allowing power users to navigate faster.  

**Example: Press `Esc` to Close a Modal**  
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
✅ Users can now close the modal with the `Escape` key.  

---

## **4. Live Coding Example: Keyboard-Accessible Dropdown in React**  

### **Step 1: Create the Dropdown Component**  
```jsx
import { useState, useRef, useEffect } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const options = ["Option 1", "Option 2", "Option 3"];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setFocusedIndex((prev) => Math.min(prev + 1, options.length - 1));
    } else if (event.key === "ArrowUp") {
      setFocusedIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "Enter" && focusedIndex >= 0) {
      alert(`Selected: ${options[focusedIndex]}`);
      setIsOpen(false);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      dropdownRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div>
      <button onClick={toggleDropdown} aria-haspopup="true" aria-expanded={isOpen}>
        Open Dropdown
      </button>
      {isOpen && (
        <ul ref={dropdownRef} tabIndex="-1" onKeyDown={handleKeyDown} role="menu">
          {options.map((option, index) => (
            <li key={index} role="menuitem" tabIndex="0" 
                className={focusedIndex === index ? "focused" : ""}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
```

### **Step 2: Add Styles for Focused State**  
```css
.focused {
  background-color: #007bff;
  color: white;
}
```
✅ Users can navigate the dropdown with the arrow keys and select an option with `Enter`.  

---

## **Summary of Key Takeaways**  
✅ Use semantic elements (`<button>`, `<a>`) for accessibility  
✅ Manage focus properly when opening and closing UI components  
✅ Implement keyboard shortcuts for faster navigation  

---