# **Section 9: Creating Accessible & Performant Navigation Menus**  

## **Introduction**  
Navigation menus are a critical part of any web application, but they can be difficult for users who rely on keyboards or screen readers. This section covers:  

1. Building a keyboard-accessible navigation menu  
2. Using ARIA attributes for better screen reader support  
3. Optimizing performance for large menus  
4. Live coding example: A fully accessible navigation menu in React  

---

## **1. Building a Keyboard-Accessible Navigation Menu**  
When creating a navigation menu, ensure that:  
✅ Users can **navigate using the Tab key**  
✅ Users can **open dropdowns using Enter or Space**  
✅ The **Escape key closes dropdowns**  

### **Example: Basic Keyboard Navigation**  
```jsx
const handleKeyDown = (event) => {
  if (event.key === "Enter" || event.key === " ") {
    toggleMenu();
  } else if (event.key === "Escape") {
    closeMenu();
  }
};
```
✅ Pressing Enter or Space opens the menu, and Escape closes it.  

---

## **2. Using ARIA Attributes for Better Screen Reader Support**  
To improve accessibility, use ARIA attributes like:  

| Attribute | Purpose | Example Usage |
|-----------|---------|--------------|
| `aria-label="Main Navigation"` | Helps screen readers identify the nav | `<nav aria-label="Main Navigation">` |
| `aria-haspopup="true"` | Indicates a dropdown menu | `<button aria-haspopup="true">Menu</button>` |
| `aria-expanded="false"` | Shows if a menu is open or closed | `<button aria-expanded="false">Menu</button>` |

### **Example: Adding ARIA to a Menu**  
```jsx
<button aria-haspopup="true" aria-expanded={isOpen} onClick={toggleMenu}>
  Menu
</button>
<ul role="menu" aria-hidden={!isOpen}>
  <li role="menuitem"><a href="#">Home</a></li>
  <li role="menuitem"><a href="#">About</a></li>
</ul>
```
✅ Screen readers now understand the menu’s behavior.  

---

## **3. Optimizing Performance for Large Menus**  
For large navigation menus, optimize performance by:  
✅ **Lazy-loading submenus** (only load when needed)  
✅ **Using CSS animations instead of JavaScript-heavy animations**  
✅ **Avoiding unnecessary re-renders with `useMemo` or `React.memo`**  

### **Example: Lazy-Loading a Dropdown Menu**  
```jsx
const LazyMenu = React.lazy(() => import("./DropdownMenu"));

const App = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <button onClick={() => setShowMenu(true)}>Open Menu</button>
      {showMenu && (
        <React.Suspense fallback={<p>Loading...</p>}>
          <LazyMenu />
        </React.Suspense>
      )}
    </div>
  );
};
```
✅ This prevents the dropdown from loading until the user actually needs it.  

---

## **4. Live Coding Example: Accessible Navigation Menu in React**  

### **Step 1: Create the Navigation Component**  
```jsx
import { useState, useRef } from "react";

const AccessibleNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      toggleMenu();
    } else if (event.key === "Escape") {
      closeMenu();
    }
  };

  return (
    <nav aria-label="Main Navigation">
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
      >
        Menu
      </button>

      {isOpen && (
        <ul
          role="menu"
          ref={menuRef}
          aria-hidden={!isOpen}
          style={{
            listStyle: "none",
            padding: "10px",
            background: "white",
            position: "absolute",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <li role="menuitem">
            <a href="#">Home</a>
          </li>
          <li role="menuitem">
            <a href="#">About</a>
          </li>
          <li role="menuitem">
            <a href="#">Contact</a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default AccessibleNav;
```

### **Step 2: Use the Navigation Menu in an App**  
```jsx
const App = () => {
  return (
    <div>
      <h1>Website</h1>
      <AccessibleNav />
    </div>
  );
};

export default App;
```
✅ The menu is fully accessible, keyboard-friendly, and screen reader-compatible.  

---

## **Summary of Key Takeaways**  
✅ **Ensure keyboard accessibility** (Tab navigation, Enter to open, Escape to close)  
✅ **Use ARIA attributes** (`aria-haspopup`, `aria-expanded`, `aria-hidden`)  
✅ **Optimize performance** by lazy-loading large menus  

---