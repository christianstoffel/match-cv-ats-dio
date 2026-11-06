import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  AlertCircle, CheckCircle2, ClipboardCopy, FileDown, FileText, Lightbulb, Loader2,
  RotateCcw, ShieldCheck, Sparkles, Target, Eraser, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { analyzeResume, type AnalyzeResponse } from "@/lib/analyze.functions";
import { MAX_JOB_CHARS, MAX_RESUME_CHARS, scoreLabel, validateInputs, type Requirement } from "@/lib/analysis";
import { exportResumePdf } from "@/lib/pdf";

const TITLE = "MatchCV ATS | Otimize seu currículo para vagas";
const DESC = "Compare seu currículo com uma vaga, veja requisitos comprovados e lacunas, e gere uma versão otimizada para ATS — sem inventar experiências. Exporte em PDF.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Success = Extract<AnalyzeResponse, { ok: true }>;

function Index() {
  const analyze = useServerFn(analyzeResume);
  const [job, setJob] = useState("");
  const [resume, setResume] = useState("");
  const [errors, setErrors] = useState<{ job?: string; resume?: string }>({});
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [result, setResult] = useState<Success | null>(null);
  const [edited, setEdited] = useState("");
  const inFlight = useRef(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  async function onAnalyze() {
    if (inFlight.current) return;
    const v = validateInputs(job, resume);
    setErrors(v);
    if (v.job || v.resume) return;
    inFlight.current = true;
    setLoading(true);
    setFailure(null);
    try {
      const res = await analyze({ data: { job, resume } });
      if (!res.ok) { setFailure(res.message); return; }
      setResult(res);
      setEdited(res.optimizedResume);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    } catch {
      setFailure("Não foi possível concluir a análise. Verifique sua conexão e tente novamente. Seus textos foram mantidos.");
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  }

  function onClear() {
    setJob(""); setResume(""); setErrors({}); setFailure(null);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-card/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="#" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"><FileText className="size-4" /></span>
            MatchCV <span className="text-primary">ATS</span>
          </a>
          <nav className="flex items-center gap-2 sm:gap-4">
            <a href="#como-funciona" className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline">Como funciona</a>
            <Button asChild size="sm"><a href="#analise">Analisar currículo</a></Button>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-hero">
          <div className="mx-auto max-w-3xl px-4 pb-14 pt-16 text-center sm:pt-24">
            <Badge variant="secondary" className="mb-5 gap-1"><Sparkles className="size-3" /> Seu currículo mais alinhado à vaga certa.</Badge>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
              Seu currículo preparado para a <span className="text-primary">próxima oportunidade</span>.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">
              Compare seu currículo com uma vaga, descubra oportunidades de melhoria e gere uma versão mais compatível com sistemas ATS — sem inventar experiências.
            </p>
            <Button asChild size="lg" className="mt-8"><a href="#analise">Analisar meu currículo</a></Button>
            <p className="mt-4 text-sm text-muted-foreground">Sem cadastro • Análise com IA • Exportação em PDF</p>
          </div>
        </section>

        <section id="como-funciona" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10">
          <h2 className="mb-6 text-center text-2xl font-bold tracking-tight">Como funciona</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: FileText, t: "1. Cole a vaga e seu currículo", d: "Informe a oportunidade desejada e suas experiências profissionais." },
              { icon: Target, t: "2. Descubra seu nível de compatibilidade", d: "Identifique requisitos comprovados, lacunas e melhorias possíveis." },
              { icon: FileDown, t: "3. Ajuste e exporte", d: "Revise o currículo otimizado, faça suas alterações e exporte em PDF." },
            ].map((s) => (
              <Card key={s.t} className="shadow-card">
                <CardContent className="flex gap-4 p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary"><s.icon className="size-5" /></span>
                  <div><h3 className="font-semibold">{s.t}</h3><p className="mt-1 text-sm text-muted-foreground">{s.d}</p></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="analise" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl">Análise de compatibilidade</CardTitle>
              <CardDescription>Cole o texto da vaga e do seu currículo. A análise só começa quando você clicar no botão.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Field id="job" label="Descrição da vaga" value={job} onChange={setJob} max={MAX_JOB_CHARS} error={errors.job} disabled={loading}
                  placeholder={"Ex.: Analista de Dados Pleno\n\nResponsabilidades:\n- Construir dashboards em Power BI\n- Escrever consultas SQL...\n\nRequisitos:\n- Experiência com SQL e Python\n- Desejável: conhecimento em AWS"} />
                <Field id="resume" label="Meu currículo" value={resume} onChange={setResume} max={MAX_RESUME_CHARS} error={errors.resume} disabled={loading}
                  placeholder={"Cole aqui seu currículo completo: nome e contatos, resumo, experiências (empresa, cargo, período e atividades), formação, competências, cursos e idiomas."} />
              </div>
              {failure && (
                <Alert variant="destructive" role="alert">
                  <AlertCircle className="size-4" />
                  <AlertTitle>Não foi possível analisar</AlertTitle>
                  <AlertDescription>{failure}</AlertDescription>
                </Alert>
              )}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button variant="outline" onClick={onClear} disabled={loading}><Eraser /> Limpar campos</Button>
                <Button onClick={onAnalyze} disabled={loading} size="lg">
                  {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                  {failure && !loading ? "Tentar novamente" : "Analisar compatibilidade"}
                </Button>
              </div>
              {loading && (
                <div aria-live="polite" className="space-y-3 rounded-lg border border-dashed p-5">
                  <p className="flex items-center gap-2 text-sm font-medium text-primary"><Loader2 className="size-4 animate-spin" /> Analisando compatibilidade e preparando seu currículo...</p>
                  <Skeleton className="h-4 w-2/3" /><Skeleton className="h-4 w-1/2" /><Skeleton className="h-4 w-3/4" />
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {result && (
          <div ref={resultsRef} className="mx-auto max-w-6xl scroll-mt-20 space-y-6 px-4 pb-10">
            <ScoreCard result={result} />
            <Requirements reqs={result.requirements} />
            {result.recommendations.length > 0 && (
              <Card className="shadow-card">
                <CardHeader><CardTitle className="flex items-center gap-2"><Lightbulb className="size-5 text-warning" /> Como melhorar seu currículo</CardTitle></CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {result.recommendations.map((r, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-primary">{i + 1}</span>
                        <span className="pt-0.5">{r}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}
            <ResumeEditor original={result.optimizedResume} value={edited} onChange={setEdited} />
          </div>
        )}

        <section className="mx-auto max-w-6xl px-4 pb-14">
          <Card className="border-dashed bg-muted/40 shadow-none">
            <CardContent className="flex gap-4 p-5">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-success" />
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">O MatchCV ATS não inventa experiências. A ferramenta reorganiza e aprimora apenas as informações fornecidas pelo candidato.</p>
                <ul className="list-disc space-y-1 pl-4">
                  <li>A análise é uma estimativa, não uma avaliação oficial de sistemas ATS, e não garante aprovação ou contratação.</li>
                  <li>Ao solicitar a análise, os textos são enviados a um serviço de IA para processamento. A aplicação não armazena currículos permanentemente.</li>
                  <li>Compartilhe dados sensíveis com consciência. Você é responsável por revisar o documento final.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p><span className="font-semibold text-foreground">MatchCV ATS</span> — Seu currículo mais alinhado à vaga certa.</p>
          <p>Ferramenta de orientação; não garante aprovação em processos seletivos.</p>
        </div>
      </footer>
    </div>
  );
}

function Field(p: { id: string; label: string; value: string; onChange: (v: string) => void; max: number; error?: string; placeholder: string; disabled: boolean }) {
  const len = p.value.length;
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <Label htmlFor={p.id}>{p.label} <span className="text-destructive">*</span></Label>
        <span className={`text-xs tabular-nums ${len > p.max ? "text-destructive" : "text-muted-foreground"}`}>{len.toLocaleString("pt-BR")} / {p.max.toLocaleString("pt-BR")}</span>
      </div>
      <Textarea id={p.id} value={p.value} onChange={(e) => p.onChange(e.target.value)} placeholder={p.placeholder} disabled={p.disabled}
        required aria-invalid={!!p.error} aria-describedby={p.error ? `${p.id}-err` : undefined} className="min-h-72 resize-y" />
      {p.error && <p id={`${p.id}-err`} className="text-sm text-destructive">{p.error}</p>}
    </div>
  );
}

const LABELS = {
  low: { t: "Baixa compatibilidade", c: "text-destructive" },
  partial: { t: "Compatibilidade parcial", c: "text-warning-foreground" },
  good: { t: "Boa compatibilidade", c: "text-success-foreground" },
};

function ScoreCard({ result }: { result: Success }) {
  const total = result.requirements.length;
  const ok = result.requirements.filter((r) => r.matched).length;
  const s = result.score;
  const lbl = s === null ? null : LABELS[scoreLabel(s)];
  return (
    <Card className="border-primary/30 shadow-card">
      <CardHeader>
        <CardDescription>Resumo da compatibilidade</CardDescription>
        <CardTitle className="text-xl">{result.jobTitle ?? "Vaga analisada"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {s === null ? (
          <Alert><AlertCircle className="size-4" /><AlertTitle>Resultado inconclusivo</AlertTitle>
            <AlertDescription>Não foi possível identificar requisitos avaliáveis na vaga. Revise a descrição e tente novamente.</AlertDescription></Alert>
        ) : (
          <div className="space-y-3">
            <div className="flex items-end gap-3">
              <span className="text-5xl font-extrabold tabular-nums tracking-tight">{s}%</span>
              <span className={`pb-1.5 font-semibold ${lbl!.c}`}>{lbl!.t}</span>
            </div>
            <Progress value={s} aria-label="Pontuação de compatibilidade" />
          </div>
        )}
        <div className="grid grid-cols-3 gap-3 text-center">
          <Stat n={total} l="Requisitos identificados" />
          <Stat n={ok} l="Comprovados" c="text-success-foreground" />
          <Stat n={total - ok} l="Não comprovados" c="text-warning-foreground" />
        </div>
        <p className="text-xs text-muted-foreground">Pontuação estimada com base no conteúdo informado. Não representa resultado oficial de sistemas ATS nem garante aprovação em processos seletivos.</p>
      </CardContent>
    </Card>
  );
}

function Stat({ n, l, c = "" }: { n: number; l: string; c?: string }) {
  return <div className="rounded-lg bg-muted p-3"><div className={`text-2xl font-bold tabular-nums ${c}`}>{n}</div><div className="text-xs text-muted-foreground">{l}</div></div>;
}

const GROUPS: { type: Requirement["type"]; label: string }[] = [
  { type: "required", label: "Obrigatórios" },
  { type: "preferred", label: "Desejáveis" },
  { type: "unspecified", label: "Sem classificação" },
];

function Requirements({ reqs }: { reqs: Requirement[] }) {
  const matched = reqs.filter((r) => r.matched);
  const missing = reqs.filter((r) => !r.matched);
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ReqList title="Identificados no currículo" icon={<CheckCircle2 className="size-5 text-success" />} items={matched} tone="ok"
        empty="Nenhum requisito comprovado no currículo." hint="Clique em um item para ver a justificativa." />
      <ReqList title="Não identificados ou não comprovados" icon={<AlertCircle className="size-5 text-warning" />} items={missing} tone="miss"
        empty="Todos os requisitos identificados foram comprovados." hint="Estes itens exigem competências ou experiências adicionais — ou ainda não aparecem com clareza no currículo." />
    </div>
  );
}

function ReqList({ title, icon, items, tone, empty, hint }: { title: string; icon: React.ReactNode; items: Requirement[]; tone: "ok" | "miss"; empty: string; hint: string }) {
  const cls = tone === "ok"
    ? "border-success/30 bg-success-soft text-success-foreground hover:bg-success-soft/70"
    : "border-warning/40 bg-warning-soft text-warning-foreground hover:bg-warning-soft/70";
  return (
    <Card className="shadow-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-base">{icon}{title} <span className="text-muted-foreground">({items.length})</span></CardTitle>
        <CardDescription>{hint}</CardDescription></CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 && <p className="text-sm text-muted-foreground">{empty}</p>}
        {GROUPS.map((g) => {
          const list = items.filter((i) => i.type === g.type);
          if (!list.length) return null;
          return (
            <div key={g.type}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{g.label}</p>
              <div className="flex flex-wrap gap-2">
                {list.map((r) => (
                  <Popover key={r.keyword}>
                    <PopoverTrigger asChild>
                      <button type="button" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
                        <Badge variant="outline" className={`cursor-pointer ${cls}`}>{r.keyword}</Badge>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 space-y-2 text-sm">
                      <p className="font-semibold">{r.keyword}</p>
                      <p className="text-muted-foreground">{r.reason}</p>
                      {r.evidence && <p className="rounded-md bg-muted p-2 text-xs italic">“{r.evidence}”</p>}
                    </PopoverContent>
                  </Popover>
                ))}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function ResumeEditor({ original, value, onChange }: { original: string; value: string; onChange: (v: string) => void }) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const dirty = value !== original;

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true); toast.success("Currículo copiado para a área de transferência.");
      setTimeout(() => setCopied(false), 2000);
    } catch { toast.error("Não foi possível copiar. Selecione o texto e copie manualmente."); }
  }
  async function exportPdf() {
    if (!value.trim()) { toast.error("O currículo está vazio."); return; }
    setExporting(true);
    try { await exportResumePdf(value); toast.success("PDF gerado: curriculo-ats.pdf"); }
    catch { toast.error("Não foi possível gerar o PDF. Tente novamente."); }
    finally { setExporting(false); }
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><FileText className="size-5 text-primary" /> Seu currículo otimizado</CardTitle>
        <CardDescription>Edite livremente. O conteúdo exportado e copiado é sempre o texto atual do editor.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-warning/40 bg-warning-soft text-warning-foreground">
          <AlertCircle className="size-4" />
          <AlertDescription className="text-warning-foreground">Revise todas as informações antes de utilizar. A versão otimizada deve refletir exclusivamente suas experiências e qualificações reais.</AlertDescription>
        </Alert>
        <Label htmlFor="optimized" className="sr-only">Currículo otimizado</Label>
        <Textarea id="optimized" value={value} onChange={(e) => onChange(e.target.value)} className="min-h-[32rem] resize-y font-mono text-sm leading-relaxed" />
        <Separator />
        <div className="flex flex-wrap gap-3">
          <Button onClick={exportPdf} disabled={exporting}>{exporting ? <Loader2 className="animate-spin" /> : <FileDown />} Exportar PDF</Button>
          <Button variant="secondary" onClick={copy}>{copied ? <Check /> : <ClipboardCopy />} {copied ? "Copiado!" : "Copiar currículo"}</Button>
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="outline" disabled={!dirty}><RotateCcw /> Restaurar versão gerada</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Restaurar versão gerada?</AlertDialogTitle>
                <AlertDialogDescription>Suas edições manuais serão descartadas e o texto voltará à versão gerada pela análise.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => onChange(original)}>Restaurar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
