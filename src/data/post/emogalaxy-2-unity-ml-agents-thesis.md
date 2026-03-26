---
publishDate: 2024-06-01T00:00:00Z
title: 'Empowering Autistic Children Through AI: Redesigning EmoGalaxy'
excerpt: A deep dive into how on-device deep learning, Unity Barracuda, and custom generative AI were used to revamp EmoGalaxy—a serious game designed to help autistic children recognize and express emotions.
image: https://images.unsplash.com/photo-1614294149010-950b698f72c0?auto=format&fit=crop&w=1200&q=80
category: Game Dev
tags:
  - unity
  - deep-learning
  - onnx
  - serious-games
  - ai
metadata:
  canonical: https://yourdomain.com/emogalaxy-redesign-unity-ai
---

## Overview

Game development isn't just about entertainment; it can be a powerful therapeutic tool. **EmoGalaxy** is an interactive mobile game developed in collaboration with the University of Tehran. Its core mission is to help children with autism improve their social and communication skills, specifically in recognizing, expressing, and regulating emotions.

While the initial version of the game was a success in clinical studies, it faced severe technical bottlenecks as it aged. In this post, I'll explore how I rebuilt EmoGalaxy from the ground up using modern, on-device AI and modular game design to create a robust, offline-first experience.

## The Challenges of the Original Architecture

The first iteration of EmoGalaxy relied heavily on rigid, cloud-dependent systems that made scaling and updating a nightmare. We faced three major hurdles:

1. **Commercialized Third-Party AI:** The game initially used the AFFDEX SDK for facial expression recognition. When this toolkit became commercialized, it broke existing versions of the game and halted development.
2. **Server Dependency:** Player data was saved exclusively on a remote server. If the server went down or changed, active installations became unusable, and player progress was permanently lost.
3. **Hard-coded Monoliths:** The UI and scenarios were entirely hard-coded. Text elements were baked into images, meaning any minor tweak to a story or addition of a new language required a developer to manually rebuild scenes in Unity.

## The Solution: On-Device Deep Learning and Modular Design

To future-proof the game, we needed to sever its reliance on external servers and commercial APIs. Here is how we rebuilt the core systems:

### 1. Local Emotion Recognition via Unity Barracuda

Instead of sending sensitive camera data to a server, we moved the AI entirely on-device. We implemented an open-source neural network using the **ONNX** (Open Neural Network Exchange) format.

To run this inside the game, we utilized **Unity Barracuda**, a lightweight and cross-platform neural network inference library for Unity. The pipeline works in two steps:

- A face-detection model first locates the user's face in the camera feed and crops it.
- The cropped image is fed into a classification model trained on the **FER-2013 dataset**. This model detects 7 core states: Neutral, Happy, Sad, Fear, Anger, Surprise, and Disgust.

_Note on Bias:_ Because the FER-2013 dataset is heavily skewed towards "Happy" faces, we applied custom weight multipliers to the output tensors to ensure the game accurately detects harder-to-read expressions like "Fear" and "Surprise".

### 2. The Interactive Avatar

The most exciting application of this new AI is the game's Avatar system. We built a robotic character that acts as a digital mirror. By taking the maximum confidence value from our Barracuda emotion classifier, the robot instantly mimics the expression the child is making into the camera.

### 3. Offline-First Data Persistence

To solve the server outages, we designed a three-layer local storage architecture:

- **File Data Handler:** Reads and writes JSON files directly to the device.
- **Data Persistence Manager:** Coordinates when the game needs to load or save states.
- **IDataPersistence Interface:** Allows any script or minigame (like the Bubble or Card games) to easily save metrics like scores, earned stars, and reaction times.

### 4. Dynamic Content and Generative AI

To solve the hard-coding issue, we decoupled the content from the code:

- **CSV Localization:** We built a custom CSV-loader that allows psychologists and translators to write scenarios and UI text in an external spreadsheet. The game fetches this at runtime, and we utilized `RTL Mpro` to properly render right-to-left Persian text seamlessly.
- **Local GAN Image Generation:** For the game's "Emotion Regulation" stories, we generated custom, stylized illustrations. Instead of relying on expensive art pipelines, we used a local Generative Adversarial Network (GAN) via **Fooocus** and the _JuggernautXL_ model to create consistent 2D cartoon assets based on the new scenarios.

## Conclusion

By shifting to local inference with Unity Barracuda and adopting a data-driven UI approach, EmoGalaxy is now completely self-sufficient. It protects children's privacy by keeping facial data on the device, works completely offline, and allows researchers and psychologists to add new therapeutic scenarios without writing a single line of code.

Serious games represent a brilliant intersection of psychology and technology, and with modern on-device AI, we can make these tools more accessible and reliable than ever before.
