// Layout nu pour le studio — exclut la nav et le footer du site
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
