# Heterogeneous Treatment Effects Interactive Essay

## Objective

Explain how to detect, estimate, and interpret heterogeneous treatment effects in A/B tests using interactive visuals.

## Teaching sequence

1. Average treatment effect: show control and treatment outcomes and the overall ATE.
2. Hidden heterogeneity: reveal segments that respond differently even when the overall ATE looks modest.
3. Estimation: introduce treatment-by-segment interaction terms.
4. Omnibus test: test whether the interaction terms are jointly zero using a Wald-style test.
5. Segment effects: show CATE estimates and confidence intervals with a forest-plot style visualization.
6. Decision: connect the statistical evidence to a product decision about personalization.

## Interaction ideas

- Slider to change the treatment effect and update the ATE.
- Toggle that reveals latent segments within the same population.
- Interactive regression equation where hovering or clicking a coefficient highlights its meaning.
- Simulation showing apparent subgroup differences that can arise from chance.
- Forest plot toggle between point estimates and confidence intervals.
- Final "Would you personalize?" decision exercise with several statistical scenarios.

## Statistical framing

For a categorical segment variable, the core model can be introduced as:

`Y = beta0 + beta1*T + beta2*Segment + beta3*(T x Segment) + error`

For multiple segment indicators, the omnibus null is that all treatment-by-segment interaction terms equal zero.

The article should distinguish:

- overall ATE significance,
- evidence of heterogeneity,
- individual segment-level estimates,
- uncertainty and multiple comparisons,
- statistical evidence versus a product decision.

## Style

Aim for an editorial interactive explainer: spacious typography, strong annotations, restrained controls, and visuals that evolve with the narrative rather than a collection of standalone charts.
