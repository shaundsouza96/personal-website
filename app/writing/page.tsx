import Link from "next/link";

export default function WritingPage() {
  return (
    <main className="writingPage">
      <div className="writingContent">
        <Link href="/" className="writingBack">← Shaun D&rsquo;Souza</Link>

        <h1 className="writingTitle">Writing</h1>

        <section className="writingSection">
          <p className="eyebrow">Know Your Craft · Experimentation</p>
          <div className="writingCards">
            <Link href="/cates" className="writingCard">
              <p className="writingCardLabel">Interactive essay</p>
              <h2 className="writingCardTitle">Measuring conditional average treatment effects</h2>
              <p className="writingCardDesc">
                A visual lesson on moving from &ldquo;Did the treatment have an effect?&rdquo; to &ldquo;Whom did the treatment have an effect on?&rdquo; Covers CATEs, interaction models, and Holm-Bonferroni correction.
              </p>
              <span className="writingCardCta">Read →</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
