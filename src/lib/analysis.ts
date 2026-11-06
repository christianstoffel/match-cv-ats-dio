import { z } from "zod";

export const MIN_CHARS = 200;
export const MAX_JOB_CHARS = 12000;
export const MAX_RESUME_CHARS = 20000;

export const requirementSchema = z.object({
  keyword: z.string().min(1),
  type: z.enum(["required", "preferred", "unspecified"]),
  matched: z.boolean(),
  evidence: z.string().nullable(),
  reason: z.string(),
});

export const aiResultSchema = z.object({
  jobTitle: z.string().nullable(),
  requirements: z.array(requirementSchema),
  recommendations: z.array(z.string()),
  optimizedResume: z.string().min(1),
});

export type Requirement = z.infer<typeof requirementSchema>;
export type AiResult = z.infer<typeof aiResultSchema>;

export const WEIGHTS: Record<Requirement["type"], number> = {
  required: 3,
  preferred: 1,
  unspecified: 2,
};

/** Enforce rules: matched needs evidence; dedupe keywords case-insensitively. */
export function normalizeRequirements(reqs: Requirement[]): Requirement[] {
  const seen = new Set<string>();
  const out: Requirement[] = [];
  for (const r of reqs) {
    const key = r.keyword.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    const evidence = r.evidence && r.evidence.trim() ? r.evidence.trim() : null;
    const matched = r.matched && evidence !== null;
    out.push({ ...r, keyword: r.keyword.trim(), matched, evidence: matched ? evidence : null });
  }
  return out;
}

/** Weighted match score 0–100, or null when there is nothing to evaluate. */
export function computeScore(reqs: Requirement[]): number | null {
  let total = 0;
  let got = 0;
  for (const r of reqs) {
    const w = WEIGHTS[r.type];
    total += w;
    if (r.matched) got += w;
  }
  if (total === 0) return null;
  return Math.round((100 * got) / total);
}

export function scoreLabel(score: number): "low" | "partial" | "good" {
  if (score < 40) return "low";
  if (score < 70) return "partial";
  return "good";
}

export function validateInputs(job: string, resume: string) {
  const errors: { job?: string; resume?: string } = {};
  const j = job.trim();
  const r = resume.trim();
  if (!j) errors.job = "Cole a descrição da vaga.";
  else if (j.length < MIN_CHARS) errors.job = `A descrição da vaga precisa ter pelo menos ${MIN_CHARS} caracteres.`;
  else if (j.length > MAX_JOB_CHARS) errors.job = `A descrição da vaga pode ter no máximo ${MAX_JOB_CHARS} caracteres.`;
  if (!r) errors.resume = "Cole o seu currículo.";
  else if (r.length < MIN_CHARS) errors.resume = `O currículo precisa ter pelo menos ${MIN_CHARS} caracteres.`;
  else if (r.length > MAX_RESUME_CHARS) errors.resume = `O currículo pode ter no máximo ${MAX_RESUME_CHARS} caracteres.`;
  return errors;
}
