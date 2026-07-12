type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({
  children,
  className = "",
}: SectionTitleProps) {
  return (
    <h2 className={`al-heading-md ${className}`}>
      {children}
    </h2>
  );
}