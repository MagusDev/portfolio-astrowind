---
publishDate: 2026-03-10T00:00:00Z
title: 'EmoGalaxy 2: Teaching NPCs to Feel with Unity ML-Agents'
excerpt: A deep-dive into my thesis project — training autonomous game agents to exhibit emergent emotional behaviour using Unity ML-Agents and reinforcement learning.
image: https://images.unsplash.com/photo-1614294149010-950b698f72c0?auto=format&fit=crop&w=1200&q=80
category: Game Dev
tags:
  - unity
  - ml-agents
  - reinforcement-learning
  - ai
  - thesis
metadata:
  canonical: https://yourdomain.com/emogalaxy-2-unity-ml-agents-thesis
---

## Overview

EmoGalaxy 2 is my university thesis project exploring how reinforcement learning can produce emergent, emotionally-rich NPC behaviour inside a real-time game environment.

## The Problem

Traditional game AI uses finite state machines or behaviour trees that are hand-authored — emotions are scripted, not felt. The goal was to see whether an agent trained purely on reward signals could develop behavioural patterns that _look_ emotional to human observers.

## Architecture

- **Unity ML-Agents Toolkit** — training environment and policy inference
- **PPO (Proximal Policy Optimization)** — the core RL algorithm
- **Observation space** — positional data, proximity to other agents, recent health delta, sound cues
- **Reward shaping** — sparse rewards for survival and cooperation; penalty for isolation

## Key Findings

Training for ~50M steps produced agents that exhibited clustering under threat (fear-analogue), competitive aggression near resources (anger-analogue), and exploratory behaviour during calm periods (curiosity-analogue). None of these were explicitly programmed.

## What I'd Do Differently

Curriculum learning from the start would have cut training time by roughly 40%. The initial reward landscape was too sparse, causing the agents to plateau early.

---

_Full thesis write-up and training logs available on request._
