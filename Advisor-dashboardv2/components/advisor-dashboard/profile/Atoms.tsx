"use client";

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1">
      {children}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value      : string;
  onChange   : (v: string) => void;
  placeholder?: string;
  type       ?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ background: "#ffffff", color: "#111827", colorScheme: "light", WebkitTextFillColor: "#111827" }}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-blue-500"
    />
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value      : string;
  onChange   : (v: string) => void;
  placeholder?: string;
  rows       ?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{ background: "#ffffff", color: "#111827", colorScheme: "light", WebkitTextFillColor: "#111827" }}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 resize-y"
    />
  );
}
