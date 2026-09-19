"use client";
import { useEffect, useState } from "react";
import VariationChart from "../../components/VariationChart";
import SamplingDistributionChart from "../../components/SamplingDistributionChart";
import PredecessorsDiagram from "../../components/PredecessorsDiagram";
import AnovaDecompositionChart from "../../components/AnovaDecompositionChart";
import ReplicationDiagram from "../../components/ReplicationDiagram";
import BlockingDiagram from "../../components/BlockingDiagram";
import RandomizationDiagram from "../../components/RandomizationDiagram";
import TwoQuestionsViz from "../../components/TwoQuestionsViz";
import FisherFrameworkDiagram from "../../components/FisherFrameworkDiagram";
import AuthorityFiguresViz from "../../components/AuthorityFiguresViz";
import LightbulbCharacter from "../../components/LightbulbCharacter";
import SwanSamplingGame from "../../components/SwanSamplingGame";
import LightbulbTree from "../../components/LightbulbTree";

function LightbulbO() {
  return (
    <svg
      viewBox="0 0 40 52"
      style={{
        display: "inline",
        verticalAlign: "-0.12em",
        width: "0.72em",
        height: "0.9em",
      }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x={13} y={2} width={14} height={10} rx={2} fill="#555" stroke="#191919" strokeWidth={2} />
      <line x1={13} y1={5} x2={27} y2={5} stroke="#191919" strokeWidth={1.5} />
      <line x1={13} y1={8} x2={27} y2={8} stroke="#191919" strokeWidth={1.5} />
      <circle cx={20} cy={28} r={16} fill="#FFE44D" stroke="#191919" strokeWidth={3} />
      <path d="M11 40 Q20 50 29 40" fill="#FFE44D" stroke="#191919" strokeWidth={3} strokeLinecap="round" />
      <path d="M16 22 Q18 27 16 33" stroke="#191919" strokeWidth={2} strokeLinecap="round" fill="none" />
      <path d="M24 22 Q22 27 24 33" stroke="#191919" strokeWidth={2} strokeLinecap="round" fill="none" />
    </svg>
  );
}

const TOTAL = 14;

export default function HistoryOfTestsPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setCurrent((c) => Math.min(c + 1, TOTAL - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setCurrent((c) => Math.max(c - 1, 0));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="slideshow">
      <div className="slide">
        {current === 0 ? (
          <div className="essayHero">
            <div className="essayHeroLeft">
              <h1 className="essayHeroQuestion">
                Where does <span style={{ whiteSpace: 'nowrap' }}>kn<LightbulbO />wledge</span>
                <br />
                come from?
              </h1>
            </div>
            <div className="essayHeroRight">
              <LightbulbTree />
            </div>
          </div>
        ) : (
        <>
        {current === 1 && (
          <div style={{ position: "absolute", left: "2.5rem", top: "2.5rem", pointerEvents: "none", zIndex: 0 }}>
            <svg viewBox="0 0 40 52" width={48} height={62} fill="none" aria-hidden="true">
              <rect x={13} y={1} width={14} height={10} rx={2} fill="#555" stroke="#191919" strokeWidth={2} />
              <line x1={13} y1={4} x2={27} y2={4} stroke="#191919" strokeWidth={1.5} />
              <line x1={13} y1={7} x2={27} y2={7} stroke="#191919" strokeWidth={1.5} />
              <circle cx={20} cy={28} r={16} fill="#FFE44D" stroke="#191919" strokeWidth={3} />
              <path d="M11 40 Q20 50 29 40" fill="#FFE44D" stroke="#191919" strokeWidth={3} strokeLinecap="round" />
              <path d="M16 22 Q18 27 16 33" stroke="#191919" strokeWidth={2} strokeLinecap="round" fill="none" />
              <path d="M24 22 Q22 27 24 33" stroke="#191919" strokeWidth={2} strokeLinecap="round" fill="none" />
            </svg>
          </div>
        )}
        <div className="slideInner">

          {current === 1 && (
            <div style={{ display: "flex", gap: "2.5rem", alignItems: "center", width: "100%", position: "relative" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.25rem", textAlign: "left" }}>
                <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", maxWidth: "none" }}>
                  For much of human history, knowledge belonged to a small group of people:{" "}
                  kings, priests, scholars. Basically,{" "}
                  <span className="highlight" style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(1.65rem, 3vw, 2.1rem)", display: "block" }}>people with Pointy Hats</span>
                </p>
                <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", maxWidth: "none" }}>
                  That hierarchy made sense in a world where literacy was limited, and access to
                  learning was tightly controlled. Most people could not verify claims for themselves,
                  so who said something was often part of why it
                  was believed. Status, credentials, tradition, and institutional authority served as warrants for truth.
                </p>
                <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", maxWidth: "none" }}>
                  This did not mean that people never argued or demanded evidence. But the basic
                  architecture of knowledge was hierarchical: truth tended to flow{" "}
                  downward from recognized authorities rather than upward from observations that anyone could
                  independently inspect.
                </p>
              </div>
              <img
                src="/arrow-blue.png"
                alt=""
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "47%",
                  top: "18%",
                  width: "180px",
                  pointerEvents: "none",
                }}
              />
              <div style={{ flexShrink: 0, width: "50%" }}>
                <AuthorityFiguresViz />
              </div>
            </div>
          )}

          {current === 2 && (
            <div className="conceptSlide">
              <p className="eyebrow">Know Your Craft &middot; Experimentation</p>
              <h2>We turn to <span className="highlight">observation</span> and induction</h2>
              <p className="conceptSubtitle">
                Modern science began building general claims from repeated observations:{" "}
                <em>I&rsquo;ve seen this happen many times, so perhaps it is generally true.</em>{" "}
                Sample the swans below and see what conclusion you reach.
              </p>
              <div className="conceptViz">
                <SwanSamplingGame />
              </div>
              <p className="conceptNote">
                <strong>Observations are only a sample.</strong> The world can contain things you
                haven&rsquo;t seen yet.
              </p>
            </div>
          )}

          {current === 3 && (
            <div className="conceptSlide">
              <p className="eyebrow">Know Your Craft &middot; Experimentation</p>
              <h2>Tests: a <span className="highlight">forgotten</span> struggle</h2>
              <p className="conceptSubtitle">
                Tests are so common today&mdash;pregnancy tests, COVID tests, A/B tests&mdash;that
                we forget they are the product of decades of academic and practical struggle. Since
                the 19th century, humans have searched for a rigorous method to evaluate what an
                experiment actually tells us.
              </p>
              <blockquote className="slideBlockquote">
                &ldquo;As yet, we do not possess any&hellip; system of mean results, though few
                things would at present do more to clear up our ideas as to the precise influence
                of this or that substance on the growth of plants.&rdquo;
              </blockquote>
              <p className="conceptNote">
                James Johnston, 1849. From <em>Empire of Chance</em> (Gigerenzer et al.) &mdash;
                statistical tests were first created to answer practical agricultural questions.{" "}
                <strong>Outcomes vary even when you do nothing.</strong> A treated plot might
                outperform another because of soil, weather, measurement, or plain chance.
              </p>
            </div>
          )}

          {current === 4 && (
            <div className="conceptSlide">
              <p className="eyebrow">Know Your Craft &middot; Experimentation</p>
              <h2>How much difference <span className="highlight">is enough</span>?</h2>
              <p className="conceptSubtitle">
                In 1849, James Johnston asked: how much of a difference in average yields between
                treated and untreated plots must we see before we can conclude there is a real
                effect? The chart below shows two groups of plots&mdash;but is the difference in
                means real, or just natural variation?
              </p>
              <div className="conceptViz">
                <VariationChart />
              </div>
              <p className="conceptNote">
                &ldquo;As yet, we do not possess any&hellip; system of mean results.&rdquo; &mdash; James Johnston, 1849
              </p>
            </div>
          )}

          {current === 5 && (
            <div className="conceptSlide">
              <p className="eyebrow">Know Your Craft &middot; Experimentation</p>
              <h2>You must account for <span className="highlight">natural variation</span></h2>
              <p className="conceptSubtitle">
                Unlike physics, agricultural experiments could not control every factor. Temperature
                and soil richness vary plot to plot. Johnston realized that to assess any
                intervention, you must first understand how much the outcome varies on its own.
                Without that baseline, a difference in averages means nothing.
              </p>
              <div className="conceptViz">
                <VariationChart />
              </div>
              <p className="conceptNote">
                The spread of dots within each group is natural variation. The question is whether
                the gap between the means exceeds what chance alone would produce.
              </p>
            </div>
          )}

          {current === 6 && (
            <div className="conceptSlide">
              <p className="eyebrow">Know Your Craft &middot; Experimentation</p>
              <h2>Fisher built on <span className="highlight">Gosset</span></h2>
              <p className="conceptSubtitle">
                Ronald Fisher&rsquo;s theory of experimental design extended the work of William Sealy
                Gosset&mdash;who wrote under the pseudonym &ldquo;Student.&rdquo; Gosset developed the
                t-test for making inferences from small samples, a problem he faced as a brewer at
                Guinness. Fisher took these ideas and built a systematic theory of experimental
                design and statistical inference.
              </p>
              <div className="conceptViz">
                <PredecessorsDiagram />
              </div>
              <p className="conceptNote">
                The t-test gave Fisher a foundation. What Fisher added was a principled way to
                design experiments so that statistical inference would be valid.
              </p>
            </div>
          )}

          {current === 7 && (
            <div className="conceptSlide">
              <p className="eyebrow">Know Your Craft &middot; Experimentation</p>
              <h2>Separating <span className="highlight">signal</span> from noise</h2>
              <p className="conceptSubtitle">
                Fisher&rsquo;s key innovation was ANOVA&mdash;Analysis of Variance. It decomposes
                the total observed variation into two components: variation attributable to the
                treatment, and variation due to random error. This makes it possible to ask whether
                treatment differences are larger than what chance alone would produce.
              </p>
              <div className="conceptViz">
                <AnovaDecompositionChart />
              </div>
              <p className="conceptNote">
                If treatment variation dwarfs random error, the effect is unlikely to be a fluke.
                ANOVA gives that comparison a precise probabilistic form.
              </p>
            </div>
          )}

          {current === 8 && (
            <div className="conceptSlide">
              <p className="eyebrow">Know Your Craft &middot; Experimentation</p>
              <h2><span className="highlight">Replication</span>: measuring what you can&rsquo;t control</h2>
              <p className="conceptSubtitle">
                Apply each treatment to multiple independent experimental units. With only one
                observation per group, you cannot distinguish a real effect from a fluke. With
                many, you get an estimate of natural variability&mdash;and can compare treatment
                effects against it. More replication means more precision.
              </p>
              <div className="conceptViz">
                <ReplicationDiagram />
              </div>
              <p className="conceptNote">
                The estimate of natural variability from replication is exactly what ANOVA uses
                as its baseline when judging whether a treatment effect is real.
              </p>
            </div>
          )}

          {current === 9 && (
            <div className="conceptSlide">
              <p className="eyebrow">Know Your Craft &middot; Experimentation</p>
              <h2><span className="highlight">Blocking</span>: removing known noise</h2>
              <p className="conceptSubtitle">
                Group experimental units that are similar on an important variable&mdash;say, soil
                type or field location. Then compare treatments within those groups, not across them.
                This removes the nuisance variation from the error term, making treatment comparisons
                sharper.
              </p>
              <div className="conceptViz">
                <BlockingDiagram />
              </div>
              <p className="conceptNote">
                By comparing within blocks, you neutralize the confound. Only the treatment differs
                within each block, so any difference is more clearly attributable to the treatment.
              </p>
            </div>
          )}

          {current === 10 && (
            <div className="conceptSlide">
              <p className="eyebrow">Know Your Craft &middot; Experimentation</p>
              <h2><span className="highlight">Randomization</span>: Fisher&rsquo;s most distinctive contribution</h2>
              <p className="conceptSubtitle">
                Assign treatments to units by chance. This prevents uncontrolled factors from being
                systematically associated with one treatment&mdash;protecting against bias. Crucially,
                it also provides the probabilistic foundation for Fisher&rsquo;s significance tests.
                Without randomization, those tests have no legs to stand on.
              </p>
              <div className="conceptViz">
                <RandomizationDiagram />
              </div>
              <p className="conceptNote">
                Without randomization, any observed difference might be explained by a lurking
                variable. Chance makes that argument unavailable to the skeptic.
              </p>
            </div>
          )}

          {current === 11 && (
            <div className="conceptSlide">
              <p className="eyebrow">Know Your Craft &middot; Experimentation</p>
              <h2>Every test answers <span className="highlight">two</span> questions</h2>
              <p className="conceptSubtitle">
                Statistical inference addresses two distinct questions: whether there is evidence
                that the treatment makes a difference (significance testing), and how large that
                difference is (estimation). Both matter&mdash;a tiny effect can be statistically
                significant with a large enough sample.
              </p>
              <div className="conceptViz">
                <TwoQuestionsViz />
              </div>
              <p className="conceptNote">
                Significance tells you whether to take an effect seriously. Estimation tells you
                whether to care about its size.
              </p>
            </div>
          )}

          {current === 12 && (
            <div className="conceptSlide">
              <p className="eyebrow">Know Your Craft &middot; Experimentation</p>
              <h2>Fisher&rsquo;s <span className="highlight">answer</span></h2>
              <p className="conceptSubtitle">
                In the 1930s, Ronald Fisher formalized the answer. If there is truly no difference
                between groups, repeated sampling produces a bell-shaped distribution of mean
                differences centered at zero. Drag the slider to see how an observed difference
                maps onto that distribution and what p-value it produces.
              </p>
              <div className="conceptViz">
                <SamplingDistributionChart />
              </div>
              <p className="conceptNote">
                The farther the observed difference from zero, the less likely it is explained by
                chance. When p &lt; 0.05, we say the result is statistically significant.{" "}
                <strong>But a significance test doesn&rsquo;t tell us whether a decision is correct.</strong>{" "}
                A result can look significant by chance, and a real effect can fail to look significant.
              </p>
            </div>
          )}

          {current === 13 && (
            <div className="conceptSlide">
              <p className="eyebrow">Know Your Craft &middot; Experimentation</p>
              <h2>A <span className="highlight">unified</span> framework</h2>
              <p className="conceptSubtitle">
                Fisher&rsquo;s lasting contribution was connecting experimental design,
                randomization, and statistical inference into a single coherent system: design
                the experiment so variation can be measured and controlled, then use probability
                to judge whether remaining differences are plausibly due to chance.
              </p>
              <div className="conceptViz">
                <FisherFrameworkDiagram />
              </div>
              <p className="conceptNote">
                Before Fisher, these were separate concerns. After Fisher, they were a single method&mdash;
                and the template for how we run experiments today.
              </p>
            </div>
          )}

        </div>
        </>
        )}
      </div>

      <nav className="navBar">
        <span className="slideCounter">
          {String(current + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </span>
        <div className="navDots">
          {Array.from({ length: TOTAL }, (_, i) => (
            <button
              key={i}
              className={`navDot${current === i ? " navDot--active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="navArrows">
          <button
            className="navArrow"
            onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
            disabled={current === 0}
            aria-label="Previous slide"
          >
            &larr;
          </button>
          <button
            className="navArrow"
            onClick={() => setCurrent((c) => Math.min(c + 1, TOTAL - 1))}
            disabled={current === TOTAL - 1}
            aria-label="Next slide"
          >
            &rarr;
          </button>
        </div>
      </nav>
    </div>
  );
}
