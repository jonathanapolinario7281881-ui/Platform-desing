# 11. News & Catalysts window

**Purpose:** headlines and filings for the stocks that matter, graded A–D with the AI's one-line reason, plus a dilution and filing watch. Opens from Windows ▾ and from a headline click in Stock detail. Ticker click = pop-up trade card (the buy is the second click, on the card); double-click = Stock detail. Mockup NW1 (PAPER, AUTO OFF, 07:42, the ABCD 07:31 headline selected).

## 11.1 Which stocks it shows

- **Default view: news and filings ONLY for (1) the Ranked 50, (2) My list and (3) every stock with an open position (yours or the engine's, even when an engine-held stock has left the Top 50)** — button "Ranked 50 + My list + ALL OPEN POSITIONS". The Dilution and filing watch uses the same group.
- "Open positions" narrows to held stocks; "All market" and the ticker search widen to every stock the platform tracks (~8,000).
- **RELATED rows:** news about a stock outside these lists appears only when the engine has identified a clear relationship to a monitored stock, as one row marked "RELATED → CDEF, KLMN · same sector" so you see why it matters. Unrelated outside news never shows.
- Screen filters do not affect analysis: the engine monitors market-wide news for the eligible universe; the AI receives summarized context (section 2.13).

## 11.2 Layout

Thin top bar ("News & Catalysts") + alert line. Left: **HEADLINES AND FILINGS**. Right: **SELECTED** headline, and **DILUTION AND FILING WATCH**.

## 11.3 Headlines and filings

- Scope buttons (11.1) · ticker search · grade filters A · B · C · D · source filters News · SEC · FDA.
- Legend "A very good · B good · C not that good · D bad — bright under ~1 h, then dim" and the source freshness line "Benzinga live · SEC EDGAR checked 07:41 · openFDA 06:00"; a stale or down source is named, never hidden.
- Columns: **TIME** (published, to the second, with age "11m ago") · **STOCK** (with YOURS / ENGINE'S / RELATED chip) · **NEWS** (grade letter, bright / dim) · **SOURCE** (Newswire, SEC 424B5, SEC 8-K, FDA …) · **HEADLINE · AI's one-line reason** · **MOVE SINCE**.
- **MOVE SINCE** = price change measured from the first tradable price after the platform **received** the item (not the vendor's publish time), so there is no look-ahead. A fact, not a prediction. The same received time is what Review and the engine's research use.
- **One event, several reports:** when Benzinga reports an SEC filing also received from EDGAR (or several outlets carry the same story), they are grouped as ONE event with all sources and times — the original source (for a filing, the SEC / EDGAR item, normally also the first received) is marked PRIMARY, other reports are UPDATE sub-rows ("↳ same event · counted once"). The engine never counts them as independent catalysts. A later correction or addition shows as UPDATE.
- **SOURCE CONFLICT** only when sources truly disagree ("Newswire says two new states; the 8-K lists one") — both kept, never quietly one picked.
- Note under the list: filters change only what you see; TIME = published; MOVE SINCE starts at receipt; grouped events counted once.

## 11.4 Selected headline

- Grade + "very good news", the stock with its owner chip, the full headline; "published 07:31:04 · received 07:31:07.180 · Newswire (Benzinga)".
- **WHY THE AI GRADED IT A** (reasons, including the SEC dilution check with its time).
- **MARKET MOVEMENT SINCE HEADLINE — facts, not causation or prediction:** move from the first tradable price after receipt ("+22.2% from $1.76 (first tradable price after received 07:31:07) → $2.15"), volume since, rank move, engine state, Level 2 slot.
- **CONTRADICTIONS · OTHER NEWS ON THE STOCK.**
- The rule on screen: the grade is about the news only — it never blocks a trade by itself and is separate from the rank; bright for about 1 hour, then dim (display only).
- Buttons: **Open XXXX page** · **Read full text ↗** · **Ask AI about this headline ↗** (opens the AI Assistant with the headline attached).

## 11.5 Dilution and filing watch

- Offerings (S-1, 424B), shelves (S-3), reverse splits and delisting notices for the Ranked 50, My list and all open positions, newest first; look-back 90 days (TEST value, the same as Stock detail); "SEC checked 07:41"; if the SEC source is down: "SEC CHECK UNAVAILABLE since …".
- Each row: stock · filing + time · what it means in plain words · YOURS / ENGINE'S when held; held rows are tinted so none is missed.
- Halts stay in the alerts and on the stock (no separate halts list).

## 11.6 Acceptance checks — News & Catalysts

- **NW-01** The default view contains only the Ranked 50, My list, all open positions and RELATED rows; All market and search widen correctly.
- **NW-02** MOVE SINCE is computed from the first tradable price after the received time; both published and received times are shown for the selected item.
- **NW-03** Duplicate reports of one event are grouped (PRIMARY + UPDATE) and counted once by the engine.
- **NW-04** A stale or down source is named on the freshness line and in the filing watch, never shown as "none".
- **NW-05** Outside news appears only as RELATED rows with the named relationship.

![NW1 — News & Catalysts: default scope, grades, MOVE SINCE, a RELATED row, a grouped PRIMARY + UPDATE event, SOURCE CONFLICT, the selected headline and the dilution watch.](mockups/NW1_News_and_Catalysts.png)
