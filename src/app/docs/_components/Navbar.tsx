function Navbar() {
  return (
    <div className="w-full">
      <nav className="sticky top-0 w-full border bg-slate-100 p-3">Navbar</nav>
      <section>
        {Array.from({ length: 100 }, (_, i) => (
          <div key={i} className="w-full border">
            Content {i}
          </div>
        ))}
      </section>
    </div>
  );
}

export default Navbar;
