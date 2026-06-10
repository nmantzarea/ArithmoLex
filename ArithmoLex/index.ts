import { IInputs, IOutputs } from "./generated/ManifestTypes";

// ─── Greek engine ──────────────────────────────────────────────────────────────
const GR_ONES: string[] = ["","ένα","δύο","τρία","τέσσερα","πέντε","έξι","επτά","οκτώ","εννέα","δέκα","έντεκα","δώδεκα","δεκατρία","δεκατέσσερα","δεκαπέντε","δεκαέξι","δεκαεπτά","δεκαοκτώ","δεκαεννέα"];
const GR_ONES_F: string[] = ["","μία","δύο","τρεις","τέσσερις","πέντε","έξι","επτά","οκτώ","εννέα","δέκα","έντεκα","δώδεκα","δεκατρείς","δεκατέσσερις","δεκαπέντε","δεκαέξι","δεκαεπτά","δεκαοκτώ","δεκαεννέα"];
const GR_TENS: string[] = ["","","είκοσι","τριάντα","σαράντα","πενήντα","εξήντα","εβδομήντα","ογδόντα","ενενήντα"];
const GR_H_N: string[] = ["","εκατό","διακόσια","τριακόσια","τετρακόσια","πεντακόσια","εξακόσια","επτακόσια","οκτακόσια","εννιακόσια"];
const GR_H_F: string[] = ["","εκατό","διακόσιες","τριακόσιες","τετρακόσιες","πεντακόσιες","εξακόσιες","επτακόσιες","οκτακόσιες","εννιακόσιες"];
const GR_CURRENCY: Record<string, [string, string]> = {
  EUR: ["ευρώ", "λεπτά"], USD: ["δολάριο", "σεντς"],
  GBP: ["λίρα", "πένες"], CHF: ["φράγκο", "σεντίμ"]
};

function grThree(n: number, fem: boolean = false): string {
  if (n === 0) return "";
  const parts: string[] = [];
  const h = Math.floor(n / 100), rem = n % 100, t = Math.floor(rem / 10), o = rem % 10;
  if (h > 0) parts.push(h === 1 && rem === 0 ? "εκατό" : (fem ? GR_H_F[h] : GR_H_N[h]));
  if (rem > 0) {
    if (rem < 20) parts.push(fem ? GR_ONES_F[rem] : GR_ONES[rem]);
    else { const op = o > 0 ? (fem ? GR_ONES_F[o] : GR_ONES[o]) : ""; parts.push(op ? `${GR_TENS[t]} ${op}` : GR_TENS[t]); }
  }
  return parts.join(" ");
}

function greekWords(n: number): string {
  if (n === 0) return "μηδέν";
  const parts: string[] = [];
  const b = Math.floor(n / 1_000_000_000);
  if (b > 0) { parts.push(b === 1 ? "ένα δισεκατομμύριο" : `${grThree(b)} δισεκατομμύρια`); n %= 1_000_000_000; }
  const m = Math.floor(n / 1_000_000);
  if (m > 0) { parts.push(m === 1 ? "ένα εκατομμύριο" : `${grThree(m)} εκατομμύρια`); n %= 1_000_000; }
  const k = Math.floor(n / 1_000);
  if (k > 0) { parts.push(k === 1 ? "χίλια" : `${grThree(k, true)} χιλιάδες`); n %= 1_000; }
  if (n > 0) parts.push(grThree(n));
  return parts.join(" ");
}

function convertGreek(value: number, currencyCode: string, capitalize: boolean): string {
  const isNeg = value < 0;
  const abs = Math.abs(value);
  const whole = Math.floor(abs);
  const cents = Math.round((abs - whole) * 100);
  const [main, centsLabel] = GR_CURRENCY[currencyCode] ?? ["", ""];
  let result = greekWords(whole);
  if (main) result += ` ${main}`;
  if (cents > 0) { result += ` και ${greekWords(cents)}`; if (centsLabel) result += ` ${centsLabel}`; }
  if (isNeg) result = `μείον ${result}`;
  if (capitalize && result.length > 0) result = result.charAt(0).toUpperCase() + result.slice(1);
  return result;
}

// ─── English engine ────────────────────────────────────────────────────────────
const EN_ONES: string[] = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
const EN_TENS: string[] = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
const EN_HUNDREDS: string[] = ["","one hundred","two hundred","three hundred","four hundred","five hundred","six hundred","seven hundred","eight hundred","nine hundred"];
const EN_CURRENCY: Record<string, [string, string]> = {
  EUR: ["euro", "cents"], USD: ["dollar", "cents"],
  GBP: ["pound", "pence"], CHF: ["franc", "centimes"]
};

function enThree(n: number): string {
  if (n === 0) return "";
  const parts: string[] = [];
  const h = Math.floor(n / 100), rem = n % 100, t = Math.floor(rem / 10), o = rem % 10;
  if (h > 0) parts.push(EN_HUNDREDS[h]);
  if (rem > 0) {
    if (rem < 20) parts.push(EN_ONES[rem]);
    else parts.push(o > 0 ? `${EN_TENS[t]}-${EN_ONES[o]}` : EN_TENS[t]);
  }
  return parts.join(" ");
}

function englishWords(n: number): string {
  if (n === 0) return "zero";
  const parts: string[] = [];
  const b = Math.floor(n / 1_000_000_000);
  if (b > 0) { parts.push(`${enThree(b)} billion`); n %= 1_000_000_000; }
  const m = Math.floor(n / 1_000_000);
  if (m > 0) { parts.push(`${enThree(m)} million`); n %= 1_000_000; }
  const k = Math.floor(n / 1_000);
  if (k > 0) { parts.push(`${enThree(k)} thousand`); n %= 1_000; }
  if (n > 0) parts.push(enThree(n));
  return parts.join(" ");
}

function convertEnglish(value: number, currencyCode: string, capitalize: boolean): string {
  const isNeg = value < 0;
  const abs = Math.abs(value);
  const whole = Math.floor(abs);
  const cents = Math.round((abs - whole) * 100);
  const [main, centsLabel] = EN_CURRENCY[currencyCode] ?? ["", ""];
  let result = englishWords(whole);
  if (main) result += ` ${main}`;
  if (cents > 0) { result += ` and ${englishWords(cents)}`; if (centsLabel) result += ` ${centsLabel}`; }
  if (isNeg) result = `minus ${result}`;
  if (capitalize && result.length > 0) result = result.charAt(0).toUpperCase() + result.slice(1);
  return result;
}

// ─── Language detection ────────────────────────────────────────────────────────
const GREEK_LCIDS = new Set([1032]);
const ENGLISH_LCIDS = new Set([1033, 2057, 3081, 4105, 5129, 6153, 7177, 8201, 9225, 10249, 11273]);

function detectLanguage(lcid: number, defaultLanguage: string): "el-GR" | "en-US" {
  if (GREEK_LCIDS.has(lcid)) return "el-GR";
  if (ENGLISH_LCIDS.has(lcid)) return "en-US";
  return defaultLanguage === "el-GR" ? "el-GR" : "en-US";
}

// ─── PCF Component ─────────────────────────────────────────────────────────────
export class ArithmoLex implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _container: HTMLDivElement;
  private _textEl: HTMLDivElement;
  private _rawEl: HTMLDivElement;
  private _langBadgeEl: HTMLSpanElement;
  private _copyBtn: HTMLButtonElement;
  private _currentText: string = "";
  private _copyTimeout: ReturnType<typeof setTimeout> | null = null;
  private _notifyOutputChanged: () => void;

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this._container = container;
    this._notifyOutputChanged = notifyOutputChanged;

    const style = document.createElement("style");
    style.textContent = [
      ".alx{font-family:'Segoe UI',sans-serif;padding:4px 0;width:100%}",
      ".alx-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}",
      ".alx-hdr-left{display:flex;align-items:center;gap:6px}",
      ".alx-badge{font-size:10px;font-weight:600;letter-spacing:.8px;color:#8a8886;background:#f3f2f1;border:1px solid #e1dfdd;border-radius:3px;padding:2px 7px}",
      ".alx-lang{font-size:10px;color:#0078d4;background:#e8f4fd;border:1px solid #c7e2f7;border-radius:3px;padding:2px 7px;font-weight:500}",
      ".alx-copy{display:flex;align-items:center;gap:5px;background:transparent;border:1px solid #e1dfdd;border-radius:4px;padding:4px 9px;cursor:pointer;color:#605e5c;font-size:12px;font-family:'Segoe UI',sans-serif;transition:background .15s}",
      ".alx-copy:hover{background:#f3f2f1;color:#323130}",
      ".alx-copy.ok{color:#107c10;border-color:#107c10}",
      ".alx-text{font-size:13px;font-style:italic;color:#323130;line-height:1.6;padding:6px 12px;background:#f8f8f8;border-left:3px solid #0078d4;border-radius:0 4px 4px 0;min-height:32px;display:flex;align-items:center;word-break:break-word}",
      ".alx-text.empty{color:#a19f9d;font-style:normal;background:transparent;border-left-color:#e1dfdd}",
      ".alx-text.neg{border-left-color:#d83b01}",
      ".alx-raw{font-size:11px;color:#a19f9d;margin-top:4px;text-align:right}"
    ].join("");
    this._container.appendChild(style);

    const wrapper = document.createElement("div"); wrapper.className = "alx";
    const hdr = document.createElement("div"); hdr.className = "alx-hdr";
    const hdrLeft = document.createElement("div"); hdrLeft.className = "alx-hdr-left";
    const badge = document.createElement("span"); badge.className = "alx-badge"; badge.textContent = "ΣΕ ΛΕΞΕΙΣ / IN WORDS";
    this._langBadgeEl = document.createElement("span"); this._langBadgeEl.className = "alx-lang"; this._langBadgeEl.textContent = "—";
    this._copyBtn = document.createElement("button"); this._copyBtn.className = "alx-copy";
    this._copyBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`;
    this._copyBtn.addEventListener("click", () => this._copy());
    hdrLeft.appendChild(badge); hdrLeft.appendChild(this._langBadgeEl);
    hdr.appendChild(hdrLeft); hdr.appendChild(this._copyBtn);
    this._textEl = document.createElement("div"); this._textEl.className = "alx-text empty"; this._textEl.textContent = "—";
    this._rawEl = document.createElement("div"); this._rawEl.className = "alx-raw";
    wrapper.appendChild(hdr); wrapper.appendChild(this._textEl); wrapper.appendChild(this._rawEl);
    this._container.appendChild(wrapper);
  }

  private _copy(): void {
    if (!this._currentText) return;
    navigator.clipboard.writeText(this._currentText).then(() => {
      this._copyBtn.classList.add("ok");
      this._copyBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
      if (this._copyTimeout) clearTimeout(this._copyTimeout);
      this._copyTimeout = setTimeout(() => {
        this._copyBtn.classList.remove("ok");
        this._copyBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`;
      }, 2000);
    });
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    const raw = context.parameters.value.raw;
    const currencyCode = (context.parameters.currencyCode.raw ?? "").toUpperCase().trim();
    const defaultLanguage = context.parameters.defaultLanguage.raw ?? "en-US";
    const capitalize = context.parameters.capitalize.raw ?? true;
    const lcid = (context.userSettings as any).languageId ?? 1033;
    const lang = detectLanguage(lcid, defaultLanguage);
    this._langBadgeEl.textContent = lang === "el-GR" ? "🇬🇷 el-GR" : "🇬🇧 en-US";

    if (raw === null || raw === undefined) {
      this._currentText = "";
      this._textEl.textContent = "—";
      this._textEl.className = "alx-text empty";
      this._rawEl.textContent = "";
      return;
    }

    const num = Number(raw);
    const text = lang === "el-GR"
      ? convertGreek(num, currencyCode, capitalize)
      : convertEnglish(num, currencyCode, capitalize);

    this._currentText = text;
    this._textEl.textContent = text;
    this._textEl.className = `alx-text${num < 0 ? " neg" : ""}`;

    try {
      this._rawEl.textContent = currencyCode
        ? new Intl.NumberFormat(lang, { style: "currency", currency: currencyCode, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)
        : new Intl.NumberFormat(lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
    } catch { this._rawEl.textContent = String(num); }

    this._notifyOutputChanged();
  }

  public getOutputs(): IOutputs { return { wordsOutput: this._currentText }; }
  public destroy(): void { if (this._copyTimeout) clearTimeout(this._copyTimeout); }
}