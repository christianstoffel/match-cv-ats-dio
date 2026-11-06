// Client-only: builds an A4 PDF with selectable text from plain resume text.
function sanitize(s: string) {
  return s
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[\u2022\u25CF\u25AA]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\t/g, "  ")
    .replace(/[^\n\x20-\x7E\u00A0-\u00FF]/g, "");
}

export async function exportResumePdf(text: string, filename = "curriculo-ats.pdf") {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 18;
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const width = pageW - margin * 2;
  let y = margin;
  const lines = sanitize(text).split("\n");
  let first = true;

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { y += 2.5; continue; }
    const isHeading = /^[A-ZÀ-Ý0-9 /&,.-]{3,}$/.test(line.trim()) && /[A-ZÀ-Ý]/.test(line);
    const isName = first;
    first = false;
    const size = isName ? 15 : isHeading ? 11.5 : 10.5;
    doc.setFont("helvetica", isName || isHeading ? "bold" : "normal");
    doc.setFontSize(size);
    const lh = size * 0.42;
    const wrapped: string[] = doc.splitTextToSize(line, width);
    if (isHeading && y + lh * 3 > pageH - margin) { doc.addPage(); y = margin; }
    if (isHeading && y > margin) y += 2;
    for (const w of wrapped) {
      if (y + lh > pageH - margin) { doc.addPage(); y = margin; }
      doc.text(w, margin, y + lh * 0.8);
      y += lh;
    }
    if (isHeading) y += 1;
  }
  doc.save(filename);
}
