# **Section 2: CSS for Accessibility & Performance**  

## **Introduction**  
CSS plays a crucial role in both accessibility and performance. Well-structured styles improve readability, usability, and overall user experience. This section will cover:  

1. Writing accessible typography and color contrast  
2. Using `prefers-reduced-motion` for animation accessibility  
3. Avoiding layout shifts and improving performance  
4. Live coding example: Creating an accessible, performant button component in React  

---

## **1. Writing Accessible Typography & Color Contrast**  

### **Typography Best Practices**  
- **Use relative units** (`rem`, `em`, `vh`, `vw`) instead of absolute units (`px`) to support user font scaling.  
- **Ensure sufficient line height** (1.5x is a good rule of thumb) to improve readability.  
- **Limit font weights**—too many can make text difficult to read.  

**Bad Example (Fixed Font Size)**  
```css
body {
  font-size: 16px;
}
```

**Good Example (Scalable Font Size)**  
```css
body {
  font-size: 1rem; /* Adjusts based on user preferences */
  line-height: 1.6;
}
```

---

### **Color Contrast & Readability**  
The Web Content Accessibility Guidelines (WCAG) recommend a **minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text**.  

**Testing Contrast:**  
- Use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)  
- In DevTools, use the "Contrast Ratio" indicator in the Elements panel  

**Bad Example (Low Contrast Text)**  
```css
button {
  background-color: lightgray;
  color: white;
}
```
❌ The text may be hard to read, especially for visually impaired users.  

**Good Example (High Contrast Text)**  
```css
button {
  background-color: #0055cc;
  color: #ffffff;
}
```
✅ The contrast is much better for readability.  

---

## **2. Using `prefers-reduced-motion` for Animation Accessibility**  
Some users experience motion sensitivity, so we should respect system preferences using `prefers-reduced-motion`.  

**Bad Example (No Motion Consideration)**  
```css
@keyframes bounce {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

.animated-button {
  animation: bounce 1s infinite;
}
```

**Good Example (Respecting Reduced Motion Preferences)**  
```css
@media (prefers-reduced-motion: reduce) {
  .animated-button {
    animation: none;
  }
}
```
✅ This prevents unnecessary motion for users with sensitivity.  

---

## **3. Avoiding Layout Shifts & Improving Performance**  
Layout shifts occur when elements move unexpectedly, causing a frustrating user experience.  

**Tips to prevent layout shifts:**  
- Always define image dimensions (`width` & `height`)  
- Avoid dynamically injecting content above the fold  
- Use `font-display: swap;` to prevent invisible text during font loading  

**Bad Example (No Image Dimensions, Causes Shift)**  
```jsx
const ImageComponent = () => {
  return <img src="image.jpg" alt="Example image" />;
};
```

**Good Example (Preventing Layout Shifts)**  
```jsx
const ImageComponent = () => {
  return <img src="image.jpg" alt="Example image" width="600" height="400" />;
};
```
✅ This reserves space for the image, preventing a shift.  

---

## **4. Live Coding Example: Accessible, Performant Button in React**  

### **Step 1: Create the Button Component**  
```jsx
const AccessibleButton = ({ children, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="accessible-button"
      aria-label={children}
    >
      {children}
    </button>
  );
};
```

### **Step 2: Add CSS for Accessibility & Performance**  
```css
.accessible-button {
  font-size: 1rem;
  padding: 10px 20px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

/* Improve contrast on hover */
.accessible-button:hover {
  background-color: #0056b3;
}

/* Disable animation for users with reduced motion */
@media (prefers-reduced-motion: reduce) {
  .accessible-button {
    transition: none;
  }
}
```

---

## **Summary of Key Takeaways**  
✅ Use relative units for scalable typography  
✅ Ensure sufficient color contrast for readability  
✅ Respect `prefers-reduced-motion` for animation sensitivity  
✅ Define dimensions for images to avoid layout shifts  

---