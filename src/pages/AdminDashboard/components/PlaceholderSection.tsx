interface PlaceholderSectionProps {
  title: string;
}

export default function PlaceholderSection({ title }: PlaceholderSectionProps) {
  return (
    <div className="text-center py-20 text-muted-foreground">
      <p className="font-display text-lg">Manage {title}</p>
      <p className="text-sm mt-2">
        This section will be expanded with full CRUD functionality.
      </p>
    </div>
  );
}
