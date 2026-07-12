type KickerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Kicker({
  children,
  className = "",
}: KickerProps) {
  return (
    <p className={`al-kicker ${className}`}>
      {children}
    </p>
  );
}