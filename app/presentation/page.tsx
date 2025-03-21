"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

const sectionFiles = [
  {
    title: "1: Semantic HTML & ARIA Best Practices",
    path: "/content/Section1.md",
  },
  {
    title: "2: CSS for Accessibility & Performance",
    path: "/content/Section2.md",
  },
  {
    title: "3: Interactive Elements & State Management",
    path: "/content/Section3.md",
  },
  {
    title: "4: Optimizing Performance for Accessibility",
    path: "/content/Section4.md",
  },
  {
    title: "5: Building Keyboard-Accessible Components",
    path: "/content/Section5.md",
  },
  {
    title: "6: Enhancing Form Accessibility with ARIA & Validation",
    path: "/content/Section6.md",
  },
  {
    title: "7: Creating Accessible & Performant Data Tables",
    path: "/content/Section7.md",
  },
  {
    title: "8: Accessible & Performant Modals in React",
    path: "/content/Section8.md",
  },
  {
    title: "9: Creating Accessible & Performant Navigation Menus",
    path: "/content/Section9.md",
  },
  {
    title: "10: Building Accessible & Performant Forms in React",
    path: "/content/Section10.md",
  },
  {
    title: "11: Implementing Dark Mode with Accessibility in React",
    path: "/content/Section11.md",
  },
  {
    title:
      "12: Enhancing Performance with Lazy Loading and Code Splitting in React",
    path: "/content/Section12.md",
  },
  {
    title: "13: Optimizing Accessibility with Forms and Inputs",
    path: "/content/Section13.md",
  },
  {
    title: "14: Testing React Components for Accessibility and Performance",
    path: "/content/Section14.md",
  },
  {
    title:
      "15: Optimizing Rendering, Transitions, and Effects for Blazing-Fast Performance",
    path: "/content/Section15.md",
  },
];

const Presentation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Use the API route instead of direct fetch
        const response = await fetch(
          `/api/content?path=${encodeURIComponent(
            sectionFiles[currentIndex].path
          )}`
        );
        const data = await response.json();

        if (data.error) {
          console.error("Error loading markdown file:", data.error);
          setContent(
            "# Error Loading Content\n\nSorry, the content could not be loaded."
          );
        } else {
          setContent(data.content);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        setContent(
          "# Error Loading Content\n\nSorry, the content could not be loaded."
        );
      }
    };

    fetchContent();
  }, [currentIndex]);

  // Rest of your component remains the same
  const handleNext = () => {
    if (currentIndex < sectionFiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    window.scrollTo(0, 0);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    window.scrollTo(0, 0);
  };

  const handleFinish = () => {
    router.push("/thank-you");
  };

  // The rest of your component remains unchanged
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        {sectionFiles[currentIndex].title}
      </h1>
      <div className="prose max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              if (match) {
                const cleanCode = String(children).replace(/\n$/, "");
                return (
                  <SyntaxHighlighter
                    style={materialDark}
                    language={match[1]}
                    PreTag="div"
                    className="mb-6"
                  >
                    {cleanCode}
                  </SyntaxHighlighter>
                );
              }
              return (
                <code className="bg-gray-200 px-1 rounded text-sm">
                  {children}
                </code>
              );
            },
            ul: ({ node, ...props }) => (
              <ul {...props} className="mb-4 list-disc pl-6 break-words" />
            ),
            ol: ({ node, ...props }) => (
              <ol {...props} className="mb-4 list-decimal pl-6 break-words" />
            ),
            li: ({ node, ...props }) => <li {...props} className="mb-2 pl-4" />,
            p: ({ node, ...props }) => <p {...props} className="mb-4" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      <div className="flex justify-between mt-6">
        <button
          className={`px-4 py-2 bg-gray-200 rounded ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          } cursor-pointer`}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        {currentIndex === sectionFiles.length - 1 ? (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
            onClick={handleFinish}
          >
            Finish
          </button>
        ) : (
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded ${
              currentIndex === sectionFiles.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            } cursor-pointer`}
            onClick={handleNext}
            disabled={currentIndex === sectionFiles.length - 1}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Presentation;
