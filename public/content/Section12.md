# **Section 12: Enhancing Performance with Lazy Loading and Code Splitting in React**  

## **Introduction**  
As applications grow, performance can degrade due to large JavaScript bundles. This section covers:  

1. **Lazy loading components to reduce initial load time**  
2. **Code splitting with `React.lazy` and `Suspense`**  
3. **Optimizing images and assets with lazy loading**  
4. **Live coding example: Lazy loading a dashboard component**  

---

## **1. Lazy Loading Components to Reduce Initial Load Time**  
✅ **What is Lazy Loading?**  
Lazy loading delays loading parts of the application until they are needed. This improves:  
- **Initial page load speed**  
- **Reduced memory usage**  
- **Better user experience**  

### **Example: Lazy Loading a Component**  
Instead of importing components eagerly:  
```jsx
import HeavyComponent from "./HeavyComponent";
```
✅ Convert it into a lazy-loaded component:  
```jsx
import { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

const App = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <HeavyComponent />
  </Suspense>
);
```
✅ The component is only loaded when needed, improving performance.  

---

## **2. Code Splitting with `React.lazy` and `Suspense`**  
✅ **What is Code Splitting?**  
Code splitting allows you to break JavaScript bundles into smaller chunks that load on demand.  

✅ **Why is it useful?**  
- Reduces **bundle size**  
- Speeds up **initial loading**  
- Loads only the code necessary for the **current view**  

### **Example: Code Splitting a Dashboard Page**  
```jsx
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./Dashboard"));

const App = () => (
  <Suspense fallback={<p>Loading dashboard...</p>}>
    <Dashboard />
  </Suspense>
);
```
✅ This ensures the dashboard is only loaded when the user navigates to it.  

---

## **3. Optimizing Images and Assets with Lazy Loading**  
Large images can slow down websites. Use lazy loading to defer image loading until needed.  

### **Example: Lazy Loading Images with `loading="lazy"`**  
```jsx
<img src="large-image.jpg" alt="Large" loading="lazy" />
```
✅ The image is only loaded when it enters the viewport.  

---

## **4. Live Coding Example: Lazy Loading a Dashboard Component**  

### **Step 1: Create the `Dashboard.js` Component**  
```jsx
const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Heavy content here...</p>
    </div>
  );
};

export default Dashboard;
```

### **Step 2: Lazy Load `Dashboard.js` in `App.js`**  
```jsx
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./Dashboard"));

const App = () => {
  return (
    <div>
      <h1>My App</h1>
      <Suspense fallback={<p>Loading dashboard...</p>}>
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default App;
```
✅ Now, the dashboard only loads when needed, improving performance.  

---

## **Summary of Key Takeaways**  
✅ **Lazy load components** to reduce initial load time  
✅ **Use code splitting** to optimize JavaScript bundles  
✅ **Lazy load images** to improve performance  

---