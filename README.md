# ArithmoLex v1.1.0
### Greek & English Number To Words — PCF Control for Dynamics 365

**By DYFIA | Author: Natasa Mantzarea**

---
## How to Install

1. Download the latest release https://github.com/nmantzarea/ArithmoLex/releases/latest
2. Import the managed solution into your Power Platform / Dataverse environment.
3. Add ArithmoLex to a decimal or currency field in your model-driven app.
4. Configure properties.
5. Save and publish your customization.


## What it does

Displays any numeric or currency field as written-out words, automatically in the user's UI language (personalization settings).

- Greek user → Greek words
- English user → English words  
- Any other language → falls back to admin-configured default (Greek or English)

A practical use case is any form where the amount in words is required — agreements, invoices, contracts — without any manual typing. The output can also be stored in a Dataverse text column, making it available in views, Word templates, email templates and Power Automate flows. It also provides a copy button in order to have the words to clipboard in one click.

<img width="853" height="614" alt="image" src="https://github.com/user-attachments/assets/13635a13-97ab-42bb-a9de-ab633a798d8b" />

The table below shows how ArithmoLex renders the same value in both supported languages.

| Value | Greek (el-GR) | English (en-US) |
|---|---|---|
| `12,450.75 EUR` | Δώδεκα χιλιάδες τετρακόσια πενήντα ευρώ και εβδομήντα πέντε λεπτά | Twelve thousand four hundred fifty euro and seventy-five cents |
| `21,000 EUR` | Είκοσι μία χιλιάδες ευρώ | Twenty-one thousand euro |
| `-300.50 EUR` | Μείον τριακόσια ευρώ και πενήντα λεπτά | Minus three hundred euro and fifty cents |

---

## Properties

ArithmoLex exposes a small set of properties that can be configured directly from the form editor. All properties are optional except `value`, which must be bound to a numeric or currency field.

<img width="1570" height="920" alt="image" src="https://github.com/user-attachments/assets/0b0ee839-27be-48ab-8ecb-bd056f81d359" />

The following table lists all available properties and how to configure them.

| Property | Type | Default | Description |
|---|---|---|---|
| `value` | Decimal/Currency/FP (bound) | — | Field to convert |
| `currencyCode` | Text | `EUR` | ISO code: EUR, USD, GBP, CHF |
| `defaultLanguage` | Text | `en-US` | Fallback for non-Greek/English users. Set `el-GR` or `en-US` |
| `capitalize` | Yes/No | Yes | Capitalize first letter |
| `wordsOutput` | Text (bound output) | — | Bind to a text field to save words to Dataverse |

---

## Supported Currencies

| Code | Greek | English |
|---|---|---|
| EUR | ευρώ / λεπτά | euro / cents |
| USD | δολάριο / σεντς | dollar / cents |
| GBP | λίρα / πένες | pound / pence |
| CHF | φράγκο / σεντίμ | franc / centimes |

## Language detection logic

```
User LCID = 1032 (Greek)     → Greek output
User LCID = 1033/2057/... (English) → English output  
Any other language           → Admin defaultLanguage setting
```

---


