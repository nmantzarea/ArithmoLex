# ArithmoLex v1.1.0
### Greek & English Number To Words — PCF Control for Dynamics 365

**By [DYFIA](https://dyfia.gr) | Author: Natasa Mantzarea**

---

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

## Why ArithmoLex is different

| Feature | ArithmoLex | Other PCF controls |
|---|---|---|
| Auto language detection | ✅ | ❌ |
| Greek custom engine (gender-aware) | ✅ | ❌ |
| Admin-configurable default language | ✅ | ❌ |
| Writes back to Dataverse field | ✅ Available in views & flows | ❌ Display only |
| Currency type support | ✅ Decimal + Currency + FP | ❌ Money only |
| Copy button | ✅ | ❌ |
| Zero dependencies | ✅ | ❌ |

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

## Build & Package

```bash
cd ArithmoLex
npm install
npm run build

cd ../Solution
msbuild ArithmoLex_Solution.cdsproj /t:build /restore /p:configuration=Release
```

After build, create the Controls subfolder manually:
```bash
mkdir ArithmoLex\out\controls\Dyfia.ArithmoLex
copy ArithmoLex\out\controls\bundle.js ArithmoLex\out\controls\Dyfia.ArithmoLex\bundle.js
copy ArithmoLex\out\controls\ControlManifest.xml ArithmoLex\out\controls\Dyfia.ArithmoLex\ControlManifest.xml
```

Then rebuild solution:
```bash
cd Solution
msbuild ArithmoLex_Solution.cdsproj /t:build /p:configuration=Release
```

Managed zip → `Solution\bin\Release\ArithmoLex_Solution.zip`

---

## License
MIT
