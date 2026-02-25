import PlaceholderSection from "../components/PlaceholderSection";

interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return <PlaceholderSection title={title} />;
}
