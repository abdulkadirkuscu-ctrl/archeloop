type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide";
};

export default function Container({
  children,
  className = "",
  size = "default",
}: ContainerProps) {
  const containerClass =
    size === "wide" ? "al-container-wide" : "al-container";

  return (
    <div className={`${containerClass} ${className}`}>
      {children}
    </div>
  );
}