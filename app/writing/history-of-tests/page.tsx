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
import JohnstonPlotsGame from "../../components/JohnstonPlotsGame";

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

const TOTAL = 7;

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
            <div style={{ display: "flex", gap: "2.5rem", alignItems: "center", width: "100%", position: "relative" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.25rem", textAlign: "left" }}>
                <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", maxWidth: "none" }}>
                  But the pointy hats can be{" "}
                  <span className="highlight" style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(1.65rem, 3vw, 2.1rem)", display: "block" }}>wrong.</span>
                  <span style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}>(they don&rsquo;t always take it very well)</span>
                </p>
                <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", maxWidth: "none" }}>
                  Soon enough, people find new ways of generating knowledge that{" "}
                  <span className="highlight">challenge traditional sources of authority</span>.
                </p>
                <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", maxWidth: "none" }}>
                  Like...
                </p>
              </div>
              <div style={{ flexShrink: 0, width: "50%" }}>
                <img src="/flat-earth.png" alt="A priest declaring the earth is flat while two people stand on a globe" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            </div>
          )}

          {current === 3 && (
            <div style={{ display: "flex", gap: "2.5rem", alignItems: "center", width: "100%", position: "relative" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.25rem", textAlign: "left" }}>
                <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", maxWidth: "none" }}>
                  
                  <span className="highlight" style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(1.65rem, 3vw, 2.1rem)" }}>statistics</span>
                  , which began as a tool of the state (which is where the term comes from). As governments grew larger and more complex, numbers offered a way to count its resources and other features of society.
                </p>
                <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", maxWidth: "none" }}>
                  Early statisticians deliberately presented their work as objective and opinion-free. Their ambition was initially modest: collect and organize facts, rather than explain causes or make prections.
                </p>
                <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", maxWidth: "none" }}>
                  But this commitment to &ldquo;letting the numbers speak&rdquo; had a more radical consequence. Empiricism through numbers could{" "}
                  <span className="highlight">challenge traditional forms of authority</span>. Expertise no longer had to rest solely on the judgment of an authority. Rather claims could increasingly be checked against systematically collected evidence.
                </p>
              </div>
              <div style={{ flexShrink: 0, width: "50%" }}>
                <img src="/king-stats.png" alt="A king declaring his kingdom stretches as far as the eye can see, while a statistician with a tape measure says it is about 600 square meters" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            </div>
          )}

          {current === 4 && (
            <div style={{ display: "flex", gap: "2.5rem", alignItems: "center", width: "100%", position: "relative" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.25rem", textAlign: "left" }}>
                <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", maxWidth: "none" }}>
                  Statistics could tell us <span className="highlight">what</span> was happening,
                  but it still struggled to tell us whether one thing <em>caused</em> another.
                  In 1849, the agricultural chemist James F. W. Johnston complained:
                </p>
                <blockquote className="slideBlockquote">
                  &ldquo;As yet we do not possess any&hellip; system of mean results, though few
                  things would at present do more to clear up our ideas as to the precise influence
                  of this or that substance on the growth of plants.&rdquo;
                </blockquote>
                <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", maxWidth: "none", fontWeight: 700 }}>
                  Or, more simply: does this sh*t actually work?
                </p>
                <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", maxWidth: "none" }}>
                  Crop yields varied naturally, even across plots treated in exactly the same way.
                  So a higher yield on a fertilized plot was not, by itself, evidence that the
                  fertilizer worked. If the apparent improvement was small relative to the natural
                  variation between plots, the difference could just as easily be noise rather than
                  treatment effect.
                </p>
              </div>
              <div style={{ flexShrink: 0, width: "40%" }}>
                <img
                  src="/johnston-fertilizer.png"
                  alt="A market stall with a sign reading 'Questionable Sh*t', selling bags of fertilizer"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
          )}

          {current === 5 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", alignItems: "center", width: "100%" }}>
              <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", textAlign: "center" }}>
                Johnston&rsquo;s intuition was that the same treatment effect could look convincing
                or meaningless depending on how much natural variation existed between plots.
                Dial both up and down and watch his perspective on the treatment change.
              </p>
              <div style={{ width: "100%" }}>
                <JohnstonPlotsGame />
              </div>
            </div>
          )}

          {current === 6 && (
            <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start", width: "100%" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", maxWidth: "none" }}>
                  Ronald Fisher, the chief statistician at the Rothamsted agricultural experiment
                  station, helped turn the messy variability of real-world experiments into a system
                  for deciding whether a treatment actually worked.
                </p>
                <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", maxWidth: "none" }}>
                  Instead of asking whether treated plots simply <em>looked</em> better, he compared
                  the <span className="highlight">signal from the treatment</span> with the{" "}
                  <span className="highlight">noise of natural variation</span>. He devised the
                  significance test, which asked: if the treatment did nothing, how surprising would
                  these results be?
                </p>
                <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", maxWidth: "none" }}>
                  To separate treatment effects from natural variation, he combined three ideas:
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                  <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", maxWidth: "none", margin: 0 }}>
                    <strong>Replication:</strong> run the treatment on many plots, rather than
                    relying on one treated plot. Repetition lets you estimate how much outcomes
                    naturally vary and makes the average more precise.
                  </p>
                  <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", maxWidth: "none", margin: 0 }}>
                    <strong>Blocking:</strong> compare like with like. If fertility changes as you
                    move down a hill, pair plots at the same elevation and compare treatment
                    vs. control within those pairs. This removes a known source of background
                    variation.
                  </p>
                  <p className="conceptSubtitle" style={{ fontFamily: "var(--font-handwriting)", maxWidth: "none", margin: 0 }}>
                    <strong>Randomization:</strong> randomly decide which plot in each pair gets
                    the treatment, for example, with a coin flip. This prevents the experimenter,
                    consciously or unconsciously, from assigning better plots to one condition and
                    gives the subsequent significance test a firmer probabilistic basis.
                  </p>
                </div>
              </div>
              <div style={{ flexShrink: 0, width: "38%" }}>
                <img
                  src="/fisher-design-experiments.png"
                  alt="The Design of Experiments by R. A. Fisher"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
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

