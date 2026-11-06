import { describe, expect, it } from "vitest";
import { computeScore, normalizeRequirements, scoreLabel, type Requirement } from "./analysis";

const r = (type: Requirement["type"], matched: boolean, evidence: string | null = matched ? "x" : null, keyword = Math.random().toString()): Requirement => ({
  keyword, type, matched, evidence, reason: "",
});

describe("score", () => {
  it("weights required 3, preferred 1, unspecified 2", () => {
    // matched: required(3) ; total: 3 + 1 + 2 = 6 -> 50
    expect(computeScore([r("required", true), r("preferred", false), r("unspecified", false)])).toBe(50);
    expect(computeScore([r("preferred", true), r("unspecified", false)])).toBe(33);
  });
  it("is null when nothing to evaluate", () => {
    expect(computeScore([])).toBeNull();
  });
  it("matched without evidence counts as not proven", () => {
    const n = normalizeRequirements([r("required", true, null, "React")]);
    expect(n[0]?.matched).toBe(false);
    expect(computeScore(n)).toBe(0);
  });
  it("dedupes keywords", () => {
    expect(normalizeRequirements([r("required", true, "a", "SQL"), r("required", false, null, "sql")])).toHaveLength(1);
  });
  it("labels bands", () => {
    expect(scoreLabel(39)).toBe("low");
    expect(scoreLabel(40)).toBe("partial");
    expect(scoreLabel(70)).toBe("good");
  });
});
