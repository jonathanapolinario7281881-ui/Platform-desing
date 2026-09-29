# 1. How to read this document

## 1.1 What this document is

This is the single authoritative specification for the trading platform's screens and behavior, the Phase 0 research stage, and the security and resilience requirements. It is written so the coder can build and test from it directly: every screen is described with its purpose, layout, every element, its data source, every state with its exact wording, every button's behavior, and the checks that prove it is done.

The trading engine itself (features, models, ranking, strategies, training) is specified in the companion document **Engine_v4_Current_Requirements**, which reconciles Files 1–8 and the Addition to File 6 into the current engine design, with the v4 decisions applied. This document does not repeat that material; it defines what the engine must expose, how the person sees and controls it, how it is validated before money is at risk (chapter 15), and how the platform is protected (chapter 16).

## 1.2 Status words used here

| Word | Meaning for the coder |
|---|---|
| **SETTLED** | Decided by Jonathan. Build exactly as written. Changing it needs Jonathan's explicit approval. |
| **TEST value** | The behavior is settled, but the number is a starting value. Put it in configuration (never hard-code it), show it as a test value in Settings, and tune it in paper testing or Phase 0. |
| **OPEN** | Not decided yet. Build so it can be decided later without a redesign (configuration, adapter or feature flag). Chapter 17 lists every OPEN item. |
| **🔒 LOCKED** | A safety rule. It cannot be changed from Settings, by the engine or by the AI. |
| **Phase 1 / Phase 3** | LIVE rollout phases (section 2.7). Phase 1 = 1× leverage, long-only. Shorts arrive only in Phase 3 after testing. |

## 1.3 Which source wins

Five sources, in this order:

1. **This document (File 9 v4 Master Specification)** — platform behavior and screens, brokers and connections, leverage and margin, risk controls, Phase 0 and security. Where it differs from a mockup, **the text wins**.
2. **Engine_v4_Current_Requirements** — the current engine and strategy architecture (data, features, models, ranking, strategies, training, research requirements), reconciled from Files 1–8 and the Addition to File 6. Every requirement carries its source tag, and anything a v4 decision replaced is marked as replaced.
3. **The mockups** (chapter 19, folder `mockups/`) — the visual implementation: layout, spacing, colors and exact wording. They are drawn at 1536 × 864 (the real laptop screen) and are part of the specification.
4. **The decision log** (`File9_v4_Decision_Log.md`) — the history: who proposed what, every review round and the date of each approval. Use it to understand *why*; build from this document and the engine document.
5. **Files 1–8 and the Addition to File 6** — historical reference only. They are kept outside the coding package, in the separate archive `Engine_Source_Archive_REFERENCE_ONLY.zip` marked "DO NOT BUILD DIRECTLY FROM THESE FILES". Never build from them: parts of them were replaced by later decisions (for example IBKR as the order broker, and margin leverage above 1×).

- If this document and the engine document ever conflict, that is an error to bring to Jonathan — the coder does not settle it.

## 1.4 Reading the mockups

- All tickers (ABCD, WXYZ …) and numbers are placeholders. Within one drawing, and across the drawings of the same example day (PAPER account, about $5,233 equity, 07:42 ET pre-market), the numbers are consistent so the logic can be followed.
- Several main-window drawings show a short setup, a SHORT button with a share count and a short position (purple, COVER). They document the full design. **In Phase 1 every SHORT button reads "SHORT · off · long-only"** (mockup C2, "Short button wording").
- Exact wording in quotes (for example "NOT SAFE TO TRADE") is the on-screen text, including capitals.
- The mockups are pictures, not code. Colors are given as hex values in chapter 3.

## 1.5 Screen and platform basics

- Built for one 15-inch laptop (Dell Inspiron 15), no second monitor: every window is designed and fit-tested at **1536 × 864 CSS pixels** (a 15.6-inch 1080p screen at 125% scaling). Nothing may scroll horizontally. The final scaling is confirmed on Jonathan's laptop (OPEN).
- The engine runs on a cloud server. The laptop and the phone are only control panels: closing the laptop or losing the phone stops nothing.
- One main window stays open all day; everything that needs reading lives in a separate window, one click away. The main window never closes.
- The screen never slows the engine: it only shows what the engine already decided; the engine never waits for the screen. Blinks, sounds and list sorting are drawn from events the engine already produced.
- Probability, not certainty: no label ever says "100%" or "guaranteed". A green blink means "strong upward condition right now", not "will go up".
- Manual mode is not a recommendation mode: in AUTO OFF the platform runs exactly the same; the person pulls the trigger.
