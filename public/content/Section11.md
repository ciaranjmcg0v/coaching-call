# **Section 11: Implementing Dark Mode with Accessibility in React**  

## **Introduction**  
Dark mode is a popular feature that enhances user experience, but it must be implemented properly to maintain accessibility. This section covers:  

1. Storing and toggling dark mode preferences  
2. Ensuring accessibility with high contrast and reduced motion  
3. Persisting theme settings using `localStorage`  
4. Live coding example: A fully accessible dark mode switch in React  

---

## **1. Storing and Toggling Dark Mode Preferences**  
To enable dark mode, you need:  
✅ **A toggle button** for users to switch themes  
✅ **CSS variables** to define color schemes  
✅ **A way to store user preferences**  

### **Example: Basic Dark Mode Toggle**  
```jsx
const [isDarkMode, setIsDarkMode] = useState(false);

const toggleDarkMode = () => {
  setIsDarkMode(!isDarkMode);
};
```
✅ Users can switch between light and dark themes.  

---

## **2. Ensuring Accessibility with High Contrast & Reduced Motion**  
Dark mode should:  
✅ **Maintain sufficient contrast for readability**  
✅ **Avoid overly saturated colors**  
✅ **Respect `prefers-reduced-motion` for smooth transitions**  

### **Example: Using CSS Variables for Contrast**  
```css
:root {
  --background-light: #ffffff;
  --background-dark: #121212;
  --text-light: #000000;
  --text-dark: #ffffff;
}

body.light-mode {
  background: var(--background-light);
  color: var(--text-light);
}

body.dark-mode {
  background: var(--background-dark);
  color: var(--text-dark);
}
```
✅ Ensures colors adjust dynamically without losing readability.  

---

## **3. Persisting Theme Settings Using `localStorage`**  
To remember a user’s theme:  
✅ **Store the preference in `localStorage`**  
✅ **Apply the theme on page load**  

### **Example: Persisting Dark Mode in React**  
```jsx
import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode];
};
```
✅ Users don’t have to re-enable dark mode every time they visit.  

---

## **4. Live Coding Example: Accessible Dark Mode Toggle in React**  

### **Step 1: Create the Dark Mode Toggle Component**  
```jsx
import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <button 
      onClick={() => setIsDarkMode(!isDarkMode)} 
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default DarkModeToggle;
```

### **Step 2: Use the Toggle in the Main App**  
```jsx
import DarkModeToggle from "./DarkModeToggle";

const App = () => {
  return (
    <div>
      <h1>Accessible Dark Mode</h1>
      <DarkModeToggle />
    </div>
  );
};

export default App;
```
✅ Now users can toggle dark mode, and their preference persists across sessions.  

---

## **Summary of Key Takeaways**  
✅ **Use CSS variables** for smooth theme switching  
✅ **Ensure high contrast** for readability  
✅ **Persist theme settings** with `localStorage`  

---