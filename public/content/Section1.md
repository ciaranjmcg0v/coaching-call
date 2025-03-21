
---

# **Practical UI/UX: Building Accessible & Performant Interfaces**  


### **Section 1: Semantic HTML & ARIA Best Practices**  

## **Introduction**  

Semantic HTML is the foundation of accessible and maintainable web interfaces. It improves SEO, enhances screen reader support, and makes code easier to understand. This section will cover:  

1. Why semantic HTML matters  
2. Key semantic elements and their use cases  
3. How ARIA (Accessible Rich Internet Applications) enhances accessibility  
4. Live coding example: Building an accessible navigation menu  

---

## **1. Why Semantic HTML Matters**  
- Helps assistive technologies (e.g., screen readers) interpret content correctly  
- Improves SEO and page ranking  
- Makes web applications more maintainable and scalable  

**Bad Example:** Using `<div>` and `<span>` for everything:  
```html
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
    <div class="nav-item">About</div>
    <div class="nav-item">Contact</div>
  </div>
</div>
```  
⚠️ This structure lacks meaning for screen readers and SEO.  

**Good Example:** Using proper semantic elements:  
```html
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</header>
```  
✅ This version provides better accessibility and clarity.  

---

## **2. Key Semantic Elements & Use Cases**  
Here are some essential HTML elements for accessibility:  

| **Element**  | **Use Case**  |
|-------------|-------------|
| `<header>`   | Defines introductory content, usually contains `<nav>` |
| `<nav>`      | Indicates navigation links |
| `<main>`     | Wraps the primary content of the page |
| `<section>`  | Groups related content |
| `<article>`  | Represents a self-contained piece of content (e.g., blog post) |
| `<aside>`    | Sidebar content, complementary to the main content |
| `<footer>`   | Defines footer information |

---

## **3. How ARIA Enhances Accessibility**  
ARIA (Accessible Rich Internet Applications) is used when native HTML elements are insufficient for accessibility.  

### **Common ARIA Attributes**
| **ARIA Attribute**  | **Purpose**  |
|---------------------|-------------|
| `aria-label="..."`  | Adds an accessible label to an element |
| `aria-labelledby="id"` | Links an element to a label defined elsewhere |
| `aria-hidden="true"` | Hides elements from screen readers |
| `role="..."` | Defines an element’s purpose (e.g., `role="dialog"`, `role="alert"`) |

**Example: Accessible Button with ARIA**  
```html
<button aria-label="Close menu">X</button>
```

**Example: Using `aria-labelledby` for better screen reader support**  
```html
<h2 id="section-title">Latest News</h2>
<section aria-labelledby="section-title">
  <p>Breaking news content...</p>
</section>
```

---

## **4. Live Coding Example: Accessible Navigation Menu**  

### **Step 1: Create the Base HTML**  
```html
<nav aria-label="Main Navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

### **Step 2: Add Keyboard Navigation Support with JavaScript**  
```js
document.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    document.body.classList.add("user-is-tabbing");
  }
});
```

### **Step 3: Improve Styling for Accessibility**  
```css
.user-is-tabbing a:focus {
  outline: 2px solid blue;
}
```

---

## **Summary of Key Takeaways**  
✅ Use semantic HTML elements instead of `<div>` and `<span>`  
✅ Add ARIA attributes only when necessary  
✅ Ensure keyboard navigability and screen reader support  

---