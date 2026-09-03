"use client";
import { useEffect, useState } from "react";
import CATEChart from "../components/CATEChart";
import SubgroupPowerChart from "../components/SubgroupPowerChart";
import WaldTestChart from "../components/WaldTestChart";
import CATEEstimatesChart from "../components/CATEEstimatesChart";
import HolmBonferroniChart from "../components/HolmBonferroniChart";
import SimpleRegressionChart from "../components/SimpleRegressionChart";
import InteractionModelChart from "../components/InteractionModelChart";
import InteractionCalculationTable from "../components/InteractionCalculationTable";

const TOTAL = 10;

function ConceptSlide() {
  return (
    <div className="conceptSlide">
      <p className="eyebrow">Know Your Craft · Experimentation</p>
      <h2>
        What are <span className="highlight">CATEs</span>?
      </h2>
      <p className="conceptSubtitle">
        ATE tells us what happened on average. CATE tells us for whom the treatment worked differently.
      </p>
      <div className="conceptViz">
        <CATEChart />
      </div>
    </div>
  );
}

function EstimateSlide() {
  return (
    <div className="conceptSlide">
      <p className="eyebrow">Know Your Craft · Experimentation</p>
      <h2>
        Investigate <span className="highlight">where</span> it comes from
      </h2>
      <p className="conceptSubtitle">
        Once you find evidence of heterogeneity overall, investigate where it comes from. You are directly testing CATE<sub>A</sub> − CATE<sub>B</sub> = 0 rather than testing each CATE separately against zero.
      </p>
      <div className="conceptViz">
        <CATEEstimatesChart />
      </div>
    </div>
  );
}

function WaldSlide() {
  return (
    <div className="conceptSlide">
      <p className="eyebrow">Know Your Craft · Experimentation</p>
      <h2>
        Do the effects <span className="highlight">differ</span> by segment?
      </h2>
      <p className="conceptSubtitle">
        First ask whether there is evidence that treatment effects differ anywhere across the segments. Null hypothesis: β₃ = 0.
      </p>
      <div className="conceptViz">
        <WaldTestChart />
      </div>
      <p className="conceptNote">
        For multiple segments: β₃ = β₄ = ··· = βₙ = 0
      </p>
    </div>
  );
}

function SimpleRegressionSlide() {
  return (
    <div className="conceptSlide">
      <p className="eyebrow">Know Your Craft · Experimentation</p>
      <h2>
        Analyze your test results using <span className="highlight">linear regression</span>
      </h2>
      <p className="conceptSubtitle">
        t-tests are a special case of a linear regression — the t-test of H₀: β₁ = 0 is the same hypothesis as the two-sample t-test.
      </p>
      <div className="conceptViz">
        <SimpleRegressionChart />
      </div>
    </div>
  );
}

function InteractionCalculationSlide() {
  return (
    <div className="conceptSlide">
      <p className="eyebrow">Know Your Craft · Experimentation</p>
      <h2>
        Turn four group outcomes into <span className="highlight">two treatment effects</span>
      </h2>
      <p className="conceptSubtitle">
        Within each segment, CATE is simply Test − Control. The interaction tells us how much those treatment effects differ.
      </p>
      <div className="conceptViz">
        <InteractionCalculationTable />
      </div>
    </div>
  );
}

function InteractionModelSlide() {
  return (
    <div className="conceptSlide">
      <p className="eyebrow">Know Your Craft · Experimentation</p>
      <h2>
        Let the treatment effect <span className="highlight">vary</span> by segment
      </h2>
      <p className="conceptSubtitle">
        Adding a treatment × segment interaction estimates a separate treatment effect for each segment—its conditional average treatment effect (CATE).
      </p>
      <div className="conceptViz">
        <InteractionModelChart />
      </div>
    </div>
  );
}

function DesignSlide() {
  return (
    <div className="conceptSlide">
      <p className="eyebrow">Know Your Craft · Experimentation</p>
      <h2>
        Design your test to measure <span className="highlight">CATEs</span>
      </h2>
      <p className="conceptSubtitle">
        Heterogeneity is harder to detect because the population gets divided into smaller groups — more groups introduce more noise, and tests need to run longer.
      </p>
      <div className="conceptViz">
        <SubgroupPowerChart />
      </div>
      <p className="conceptNote">
        If heterogeneous effects matter to the decision, plan before launching. Avoid defining dozens of subgroups after seeing the results.
      </p>
    </div>
  );
}

function MultipleComparisonsSlide() {
  return (
    <div className="conceptSlide">
      <p className="eyebrow">Know Your Craft · Experimentation</p>
      <h2>
        Correct for <span className="highlight">multiple comparisons</span>
      </h2>
      <p className="conceptSubtitle">
        More comparisons inflate the chance of a false positive. Holm-Bonferroni adjusts the significance threshold at each step.
      </p>
      <div className="conceptViz">
        <HolmBonferroniChart />
      </div>
      <p className="conceptNote">
        The more comparisons you make, the harder random noise has to work to look like a discovery.
      </p>
    </div>
  );
}

export default function CATEsPage() {
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
        <div className="slideInner">
          {current === 0 && (
            <section className="hero">
              <p className="eyebrow">Know Your Craft · Experimentation</p>
              <h1>Measuring conditional average treatment effects</h1>
              <p className="lede">
                A visual lesson on moving from <em>&ldquo;Did the treatment have an effect?&rdquo;</em> to <em>&ldquo;Whom did the treatment have an effect on?&rdquo;</em>
              </p>
            </section>
          )}

          {current === 1 && <ConceptSlide />}

          {current === 2 && <DesignSlide />}

          {current === 3 && <SimpleRegressionSlide />}

          {current === 4 && <InteractionModelSlide />}

          {current === 5 && <InteractionCalculationSlide />}

          {current === 6 && <WaldSlide />}

          {current === 7 && <EstimateSlide />}

          {current === 8 && <MultipleComparisonsSlide />}

          {current === 9 && (
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
          )}
        </div>
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
            ←
          </button>
          <button
            className="navArrow"
            onClick={() => setCurrent((c) => Math.min(c + 1, TOTAL - 1))}
            disabled={current === TOTAL - 1}
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </nav>
    </div>
  );
}
