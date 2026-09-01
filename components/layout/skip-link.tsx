"use client";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={() => document.getElementById("main-content")?.focus()}
    >
      Skip to content
    </a>
  );
}
