---
publishDate: 2026-03-01T00:00:00Z
title: 'Evaluating LLM Outputs at Scale with Python'
excerpt: A practical walkthrough of the evaluation harness I built to benchmark LLM response quality, latency, and cost across multiple models — using DeepEval, custom rubric scorers, and OpenLit for observability.
image: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1200&q=80
category: AI & Agents
tags:
  - llm
  - evaluation
  - python
  - openlit
  - deepeval
  - observability
metadata:
  canonical: https://yourdomain.com/python-llm-evaluation-scripts
---

## Why Evaluation Matters

Vibe-checking model outputs doesn't scale. When you're running multi-agent pipelines that execute thousands of LLM calls per day, you need reproducible, automated evaluation — not just spot checks.

## The Harness

```python
from deepeval import evaluate
from deepeval.metrics import AnswerRelevancyMetric, FaithfulnessMetric
from deepeval.test_case import LLMTestCase

metric = AnswerRelevancyMetric(threshold=0.7, model="gpt-4o")

test_case = LLMTestCase(
    input="What is PgBouncer used for?",
    actual_output=agent_response,
    retrieval_context=retrieved_chunks,
)

evaluate([test_case], [metric])
```

## Metrics I Track

| Metric           | Tool          | What It Catches                  |
| ---------------- | ------------- | -------------------------------- |
| Answer Relevancy | DeepEval      | Off-topic hallucinations         |
| Faithfulness     | DeepEval      | Claims not grounded in context   |
| Latency P95      | OpenLit       | Slow model/node bottlenecks      |
| Token cost       | OpenLit       | Budget drift across runs         |
| Groundedness     | Custom rubric | Domain-specific factual accuracy |

## OpenLit Integration

```python
import openlit

openlit.init(otlp_endpoint="http://localhost:4318")
# All downstream LLM calls are now auto-instrumented
```

Every call in the agent graph gets a span with model name, prompt tokens, completion tokens, latency, and cost — queryable from Grafana.

## Key Insight

Faithfulness degrades significantly when retrieved chunk size exceeds ~800 tokens with GPT-4o-mini. Chunking strategy has more impact on RAG quality than model choice in most real-world workloads.
