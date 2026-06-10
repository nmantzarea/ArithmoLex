# ArithmoLex v1.1.0
### Greek & English Number To Words — PCF Control for Dynamics 365

**By [DYFIA](https://dyfia.gr) | Author: Natasa Mantzarea**

---
## How to Install

1. Download the latest release https://github.com/nmantzarea/ArithmoLex/releases/latest
2. Import the managed solution into your Power Platform / Dataverse environment.
3. Add ArithmoLex to a supported field in your model-driven app.
4. Configure properties.
5. Save and publish your customization.


## What it does

Displays any numeric or currency field as written-out words, automatically in the user's UI language.

- Greek user → Greek words
- English user → English words  
- Any other language → falls back to admin-configured default (Greek or English)

---

## Demo

| Value | Greek (el-GR) | English (en-US) |
|---|---|---|
| `12,450.75 EUR` | Δώδεκα χιλιάδες τετρακόσια πενήντα ευρώ και εβδομήντα πέντε λεπτά | Twelve thousand four hundred fifty euro and seventy-five cents |
| `21,000 EUR` | Είκοσι μία χιλιάδες ευρώ | Twenty-one thousand euro |
| `-300.50 EUR` | Μείον τριακόσια ευρώ και πενήντα λεπτά | Minus three hundred euro and fifty cents |


---

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `value` | Decimal/Currency/FP (bound) | — | Field to convert |
| `currencyCode` | Text | `EUR` | ISO code: EUR, USD, GBP, CHF |
| `defaultLanguage` | Text | `en-US` | Fallback for non-Greek/English users. Set `el-GR` or `en-US` |
| `capitalize` | Yes/No | Yes | Capitalize first letter |
| `wordsOutput` | Text (bound output) | — | Bind to a text field to save words to Dataverse |

---

## Language detection logic

```
User LCID = 1032 (Greek)     → Greek output
User LCID = 1033/2057/... (English) → English output  
Any other language           → Admin defaultLanguage setting
```

---


