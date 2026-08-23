export default function Home() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Know Your Craft · Experimentation</p>
        <h1>Measuring heterogeneous treatment effects in A/B tests</h1>
        <p className="lede">
          An interactive explainer about what happens when the average treatment
          effect hides very different responses across users.
        </p>
        <div className="statusCard" aria-label="Project status">
          <span className="statusDot" aria-hidden="true" />
          <div>
            <strong>Project scaffold is live.</strong>
            <p>
              Next: build the first interactive showing the overall average
              treatment effect before revealing subgroup effects.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
