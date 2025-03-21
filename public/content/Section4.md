# **Section 4: Optimizing Performance for Accessibility**  

## **Introduction**  
Performance and accessibility go hand in hand. A slow or unresponsive UI can be just as frustrating as an inaccessible one. This section covers:  

1. Lazy loading images and components  
2. Reducing render-blocking resources  
3. Optimizing animations for performance  
4. Live coding example: Lazy-loaded images in React  

---

## **1. Lazy Loading Images & Components**  
Lazy loading defers the loading of non-essential content until needed, improving performance and reducing page load times.  

### **Lazy Loading Images**  
Use the `loading="lazy"` attribute to delay image loading until they’re in the viewport.  

**Bad Example (No Lazy Loading, Causes Slow Load Times)**  
```jsx
<img src="large-image.jpg" alt="High-resolution image" />
```
⚠️ All images load immediately, even if they’re off-screen.  

**Good Example (Lazy Loading with Native `loading="lazy"`)**  
```jsx
<img src="large-image.jpg" alt="High-resolution image" loading="lazy" />
```
✅ The image loads only when needed, reducing initial page load time.  

---

### **Lazy Loading Components with React’s `React.lazy`**  
For large components (e.g., modals, dashboards), lazy loading ensures they’re only loaded when needed.  

```jsx
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./Dashboard"));

const App = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <Dashboard />
  </Suspense>
);
```
✅ This improves initial load speed by loading components only when necessary.  

---

## **2. Reducing Render-Blocking Resources**  
Render-blocking resources (CSS, JavaScript) delay page rendering. Optimizing them ensures a smoother experience.  

### **Tips for Reducing Render-Blocking Resources**  
✅ **Defer non-critical scripts** using `async` or `defer`  
✅ **Minify and compress assets** (CSS, JS)  
✅ **Use a CDN** for faster asset delivery  

**Example: Using `defer` for Non-Essential Scripts**  
```html
<script src="heavy-script.js" defer></script>
```
✅ The script loads after the HTML is parsed, improving perceived speed.  

---

## **3. Optimizing Animations for Performance**  
Heavy animations can cause jank and slow performance. Using hardware-accelerated properties (`transform`, `opacity`) improves efficiency.  

**Bad Example (Animating Non-GPU Properties, Causes Jank)**  
```css
.bad-animation {
  width: 100px;
  transition: width 0.3s ease;
}
```
⚠️ `width` triggers a layout recalculation, which is expensive.  

**Good Example (Using GPU-Friendly Properties)**  
```css
.good-animation {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}
```
✅ `transform` is GPU-accelerated, ensuring smooth animations.  

---

## **4. Live Coding Example: Lazy-Loaded Images in React**  

### **Step 1: Create an `ImageComponent` with Lazy Loading**  
```jsx
const LazyImage = ({ src, alt }) => {
  return <img src={src} alt={alt} loading="lazy" />;
};
```

### **Step 2: Use It in a Component**  
```jsx
const Gallery = () => {
  return (
    <div>
      <h2>Image Gallery</h2>
      <LazyImage src="image1.jpg" alt="Image 1" />
      <LazyImage src="image2.jpg" alt="Image 2" />
    </div>
  );
};

export default Gallery;
```
✅ Images now load only when needed, improving performance.  

---

## **Summary of Key Takeaways**  
✅ Use `loading="lazy"` for images to improve performance  
✅ Defer or async-load non-critical scripts to prevent render-blocking  
✅ Optimize animations using `transform` and `opacity` for better performance  

---