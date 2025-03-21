# **Section 7: Creating Accessible & Performant Data Tables**  

## **Introduction**  
Tables are commonly used for displaying structured data, but they can become inaccessible or slow when handling large datasets. This section covers:  

1. Structuring tables for screen reader compatibility  
2. Enhancing navigation with keyboard and ARIA roles  
3. Optimizing performance for large datasets  
4. Live coding example: An accessible and performant data table in React  

---

## **1. Structuring Tables for Screen Reader Compatibility**  
Screen readers rely on proper table semantics to convey relationships between headers and data.  

### **Best Practices for Accessible Tables**  
✅ Use `<table>`, `<thead>`, `<tbody>`, and `<th>` elements appropriately  
✅ Add `scope="col"` for column headers and `scope="row"` for row headers  
✅ Use `caption` to describe table content  

**Bad Example (Missing Semantics, Hard to Navigate with a Screen Reader)**  
```jsx
<table>
  <tr>
    <td>Name</td>
    <td>Age</td>
  </tr>
  <tr>
    <td>John Doe</td>
    <td>30</td>
  </tr>
</table>
```
⚠️ Screen readers may not understand which cells are headers.  

**Good Example (Properly Structured Table with Headers)**  
```jsx
<table>
  <caption>Employee Information</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>30</td>
    </tr>
  </tbody>
</table>
```
✅ Screen readers can now associate headers with data cells.  

---

## **2. Enhancing Navigation with Keyboard & ARIA Roles**  
Large tables can be difficult to navigate, especially for users relying on keyboards or assistive technologies.  

### **ARIA Attributes for Accessible Tables**  
| Attribute | Purpose | Example Usage |
|-----------|---------|--------------|
| `aria-labelledby="table-title"` | Links table to a heading for better context | `<table aria-labelledby="table-title">` |
| `aria-sort="ascending"` | Indicates a column is sorted | `<th aria-sort="ascending">Age</th>` |
| `role="grid"` | Provides additional navigation context | `<table role="grid">` |

**Example: Enhancing Table Navigation**  
```jsx
<h2 id="table-title">Employee Data</h2>
<table aria-labelledby="table-title" role="grid">
  <thead>
    <tr>
      <th scope="col" aria-sort="ascending">Name</th>
      <th scope="col">Age</th>
    </tr>
  </thead>
  <tbody>
    <tr tabIndex="0">
      <td>John Doe</td>
      <td>30</td>
    </tr>
  </tbody>
</table>
```
✅ Users can now navigate the table using screen readers and keyboards more effectively.  

---

## **3. Optimizing Performance for Large Datasets**  
When handling large datasets, rendering performance can degrade. Techniques to optimize tables include:  

✅ **Virtualized rendering** (only rendering visible rows)  
✅ **Pagination** to reduce the number of rendered rows  
✅ **Memoization** to avoid unnecessary re-renders  

### **Example: Using React Virtualized for Large Tables**  
`react-window` efficiently renders only visible rows, improving performance for large datasets.  

```bash
npm install react-window
```

**React Virtualized Table Component**  
```jsx
import { FixedSizeList as List } from "react-window";

const Row = ({ index, style }) => (
  <div style={style}>
    Row {index + 1}
  </div>
);

const VirtualizedTable = () => (
  <List height={300} itemCount={1000} itemSize={35} width={300}>
    {Row}
  </List>
);

export default VirtualizedTable;
```
✅ This prevents unnecessary DOM elements from being rendered, improving performance.  

---

## **4. Live Coding Example: Accessible & Performant Table in React**  

### **Step 1: Create the Table Component**  
```jsx
import { useState } from "react";

const employees = [
  { id: 1, name: "Alice Johnson", age: 28 },
  { id: 2, name: "Bob Smith", age: 34 },
  { id: 3, name: "Charlie Brown", age: 45 },
];

const AccessibleTable = () => {
  const [sortOrder, setSortOrder] = useState("ascending");

  const toggleSort = () => {
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
  };

  return (
    <div>
      <h2 id="table-title">Employee Data</h2>
      <table aria-labelledby="table-title" role="grid">
        <caption>Employee details with sorting functionality</caption>
        <thead>
          <tr>
            <th scope="col">
              <button onClick={toggleSort} aria-sort={sortOrder}>
                Name {sortOrder === "ascending" ? "🔼" : "🔽"}
              </button>
            </th>
            <th scope="col">Age</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} tabIndex="0">
              <td>{employee.name}</td>
              <td>{employee.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccessibleTable;
```

### **Step 2: Add Table to the Main Component**  
```jsx
const App = () => {
  return (
    <div>
      <h1>Company Dashboard</h1>
      <AccessibleTable />
    </div>
  );
};

export default App;
```
✅ Users can sort the table and navigate rows using the keyboard.  

---

## **Summary of Key Takeaways**  
✅ Use semantic HTML (`<th>`, `<caption>`, `<scope>` attributes) for accessibility  
✅ Implement ARIA roles (`role="grid"`, `aria-sort`) for better screen reader navigation  
✅ Optimize large tables using virtualization (`react-window`)  

---