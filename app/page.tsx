const sections = [
  ["01", "What are conditional average treatment effects?", "Start with the overall ATE, then reveal how Inactive, Casual, and Power users can respond very differently."],
  ["02", "Why does heterogeneity matter?", "Show how averages can hide a segment that benefits, one that barely moves, and one that is harmed."],
  ["03", "Design the experiment for heterogeneity", "Explain why subgroup analysis needs planning, predefined segments, and enough sample size within each group."],
  ["04", "Why not just run separate tests?", "Demonstrate the trap: significant in one group and non-significant in another does not prove the effects differ."],
  ["05", "Use a Treatment × Segment interaction model", "Build the regression term-by-term and connect each coefficient to a concrete comparison in the experiment."],
  ["06", "First run an omnibus test", "Ask whether the interaction terms are jointly zero before chasing individual subgroup comparisons."],
  ["07", "How does the Wald test work?", "Move from a one-dimensional t-test to a multidimensional distance from the zero vector and a confidence ellipse."],
  ["08", "Estimate the treatment effect within each segment", "Show CATE point estimates and confidence intervals for each predefined segment."],
  ["09", "If the omnibus test is significant, compare segments", "Test differences between CATEs directly: Inactive vs Casual, Inactive vs Power, and Casual vs Power."],
  ["10", "Correct for multiple comparisons", "Walk through Holm-Bonferroni so random noise has a harder time looking like a discovery."],
];

export default function Home() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Know Your Craft · Experimentation</p>
        <h1>Measuring heterogeneous treatment effects in A/B tests</h1>
        <p className="lede">
          A visual lesson on moving from one average treatment effect to a rigorous
          answer to a more useful question: <em>for whom did the treatment work differently?</em>
        </p>
        <div className="principle">
          <span>Core idea</span>
          <strong>
            Don&apos;t ask whether treatment is significant in one segment and not in another.
            Test whether the treatment effects themselves are different.
          </strong>
        </div>
      </section>

      <section className="lessonMap" aria-labelledby="lesson-map-title">
        <div className="sectionIntro">
          <p className="eyebrow">Lesson map</p>
          <h2 id="lesson-map-title">From averages to evidence of heterogeneity</h2>
          <p>
            The final experience will be interactive. This page now mirrors the complete
            teaching sequence so each visualization can be built in place, one concept at a time.
          </p>
        </div>

        <div className="sectionList">
          {sections.map(([number, title, description]) => (
            <article className="lessonSection" key={number}>
              <div className="sectionNumber">{number}</div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <div className="buildTag">Interactive planned</div>
            </article>
          ))}
        </div>
      </section>

      <section className="workflow" aria-labelledby="workflow-title">
        <p className="eyebrow">Overall workflow</p>
        <h2 id="workflow-title">The analysis sequence we want readers to remember</h2>
        <ol>
          <li><strong>Estimate the overall ATE.</strong><span>What happened on average?</span></li>
          <li><strong>Estimate CATEs by predefined segment.</strong><span>What are the magnitudes and uncertainties?</span></li>
          <li><strong>Fit Treatment × Segment interactions.</strong><span>Encode differences in treatment response directly.</span></li>
          <li><strong>Run an omnibus test.</strong><span>Is there evidence of heterogeneity anywhere?</span></li>
          <li><strong>Run pairwise contrasts if warranted.</strong><span>Which treatment effects differ?</span></li>
          <li><strong>Correct for multiple comparisons.</strong><span>Keep false discoveries under control.</span></li>
          <li><strong>Make the product decision.</strong><span>Use statistical evidence to inform targeting or personalization.</span></li>
        </ol>
      </section>
    </main>
  );
}
