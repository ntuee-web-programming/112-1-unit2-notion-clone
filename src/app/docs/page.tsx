function DocsPage() {
  return (
    <div>
      <h1>Docs</h1>
      {Array.from({ length: 100 }, (_, i) => (
        <div key={i} className="w-full border">
          Content {i}
        </div>
      ))}
    </div>
  );
}
export default DocsPage;
