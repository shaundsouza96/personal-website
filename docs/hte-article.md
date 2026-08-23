# Heterogeneous Treatment Effects Interactive Essay

## Objective

Teach how to detect, estimate, and interpret heterogeneous treatment effects in A/B tests, with enough intuition that a product data scientist can understand both the statistical workflow and the decision logic.

The article should move from simple averages to subgroup effects, then to formal tests of heterogeneity, then to segment-level estimates and multiple-comparison correction.

## Source-of-truth lesson outline

### 1. What are conditional average treatment effects?

When we run an A/B test, we usually estimate the average treatment effect (ATE) across the full experiment population.

- Compare the average outcome in treatment vs. control.
- This gives one overall estimate of the treatment's impact.
- Different subgroups may respond differently to the same treatment.

Example subgroup effects:

- Inactive users: +10 pp
- Casual users: +2 pp
- Power users: -5 pp

The overall effect may still be small because subgroup effects can partially cancel out.

Key takeaway: The ATE tells us what happened on average. Heterogeneous treatment effects tell us for whom the treatment worked differently.

### 2. Why does heterogeneity matter?

Average effects can hide meaningful differences. A treatment could strongly benefit one segment, have little effect on another, and harm another.

This can inform:

- targeting,
- personalization,
- rollout decisions,
- differentiated product experiences.

A non-significant overall ATE does not imply that nobody was affected.

Key question: Instead of only asking "Does this treatment work?", ask "For whom does this treatment work?"

### 3. Design the experiment for heterogeneity

Heterogeneity is harder to detect than an overall treatment effect because the population is divided into smaller groups.

Before launch:

- predefine important segments,
- ensure sufficient sample size within each segment,
- consider powering for interaction effects,
- avoid defining many subgroups after looking at results.

Key takeaway: If heterogeneous effects matter to the decision, plan for them before launching the experiment.

### 4. Why not just run separate tests for every segment?

Running separate t-tests by segment is not enough to establish that treatment effects differ.

Example:

- Inactive: p = .02
- Casual: p = .12

It is incorrect to conclude that the treatment works differently just because one subgroup is significant and another is not.

Core teaching point: A significant effect in one group and a non-significant effect in another does not imply that the two treatment effects are significantly different.

To test heterogeneity, compare the treatment effects directly.

### 5. Use a treatment × segment interaction model

Basic A/B test:

`Y = beta0 + beta1 * Treatment + error`

Heterogeneity model:

`Y = beta0 + beta1 * Treatment + beta2 * Segment + beta3 * (Treatment x Segment) + error`

The interaction asks whether the treatment effect depends on segment membership.

For multiple segments, use indicator variables and multiple interaction coefficients.

Key takeaway: The interaction terms contain the statistical evidence for heterogeneous treatment effects.

### 6. First run an omnibus test

For three segments — Inactive, Casual, Power — use Inactive as the reference group.

Then the interaction terms are:

- Treatment × Casual
- Treatment × Power

There is no Treatment × Inactive term because Inactive is the reference category. Its treatment effect is represented by the main Treatment coefficient.

The omnibus null is:

`H0: beta_TxCasual = 0 and beta_TxPower = 0`

Use a joint Wald test to test these coefficients simultaneously.

Interpretation:

- Not significant: weak evidence that treatment effects differ across segments.
- Significant: evidence that at least one treatment effect differs.

Key takeaway: The omnibus test answers "Is there heterogeneity anywhere?"

### 7. How does the Wald test work?

For one coefficient:

`t = beta_hat / SE(beta_hat)`

A one-coefficient Wald statistic is essentially:

`W = t^2`

With multiple coefficients, generalize from distance from one estimate to zero to distance from a vector of interaction coefficients to the zero vector.

The joint Wald test accounts for:

- uncertainty of each coefficient,
- covariance between coefficient estimates.

Visual intuition:

- one coefficient: distance from beta_hat to 0,
- two coefficients: distance from (beta1_hat, beta2_hat) to (0, 0),
- confidence interval becomes a confidence ellipse.

Key takeaway: The joint Wald test is a multidimensional version of a t-test.

### 8. Estimate the treatment effect within each segment

Example:

| Segment | Treatment effect | 95% CI |
| --- | ---: | --- |
| Inactive | +8 pp | +3 to +13 |
| Casual | +3 pp | -1 to +7 |
| Power Users | -4 pp | -8 to 0 |

These are the conditional average treatment effects (CATEs) for the predefined segments.

For each segment, report:

- treatment-effect estimate,
- confidence interval,
- optionally p-value.

This answers: "What is the estimated treatment effect within this segment?"

It does not answer whether that treatment effect differs statistically from another segment's treatment effect.

### 9. If the omnibus test is significant, compare individual segments

For three segments, pairwise contrasts include:

- Inactive vs Casual,
- Inactive vs Power,
- Casual vs Power.

Test:

`CATE_A - CATE_B = 0`

Example:

| Comparison | Difference in treatment effect | p-value |
| --- | ---: | ---: |
| Inactive vs Casual | +5 pp | .08 |
| Inactive vs Power | +12 pp | .003 |
| Casual vs Power | +7 pp | .04 |

Key takeaway: The omnibus test asks "Does anything differ?" Pairwise contrasts ask "What differs?"

### 10. Correct for multiple comparisons

Multiple pairwise tests increase the chance of false positives.

Use a correction such as Holm-Bonferroni.

Holm procedure:

1. Sort p-values from smallest to largest.
2. Compare the smallest to alpha / m.
3. Compare the next to alpha / (m - 1).
4. Continue until one fails.

Key takeaway: The more comparisons we make, the harder we should make it for random noise to look like a discovery.

## Overall workflow

1. Run the experiment and estimate the overall ATE.
2. Estimate treatment effects by predefined segment to understand magnitude and uncertainty.
3. Fit a Treatment × Segment interaction model.
4. Run an omnibus test of the interaction terms: are there heterogeneous effects at all?
5. If significant, run pairwise contrasts: which segment effects differ?
6. Correct for multiple comparisons, for example with Holm-Bonferroni.
7. Use the results to inform targeting or personalization.

## Main takeaway

Do not ask whether treatment is significant in one segment and not significant in another. Test whether the treatment effects themselves are different.

## Recommended interactive treatments

1. **ATE → CATE reveal:** start with one overall treatment-control comparison, then split the same population into three user segments and show how subgroup effects cancel into a modest ATE.
2. **Power/splitting visual:** let the reader increase the number of segments and watch sample size and uncertainty worsen.
3. **Significant vs non-significant trap:** show two subgroup confidence intervals and ask the reader whether the groups differ; reveal that separate significance tests do not answer the comparison question.
4. **Regression builder:** build the interaction model term-by-term. Selecting a coefficient highlights the observations or comparison it represents.
5. **Reference-group explainer:** visually show why there is no Treatment × Inactive coefficient when Inactive is the baseline.
6. **Omnibus test:** represent the interaction coefficient vector and test whether it is jointly at zero.
7. **Wald geometry:** transition from a one-dimensional estimate + CI to a two-dimensional point + confidence ellipse around the zero vector.
8. **CATE forest plot:** show estimates and uncertainty for all predefined segments.
9. **Pairwise contrast matrix:** select two segments to see the difference in their CATEs and its uncertainty.
10. **Holm walkthrough:** animate sorted p-values and progressively stricter thresholds.
11. **Final workflow:** a compact visual pipeline from ATE to decision, ending with a personalization decision exercise.

## Product / editorial style

Aim for an interactive editorial explainer rather than a dashboard. Use spacious typography, evolving visuals, direct annotations, and restrained controls. The reader should feel like one statistical idea is transforming into the next.
