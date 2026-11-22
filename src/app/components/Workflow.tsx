const steps = [
  { number: '01', title: 'Frame', detail: 'Understand the person and the problem.' },
  { number: '02', title: 'Map', detail: 'Turn the unknowns into a clear system.' },
  { number: '03', title: 'Build', detail: 'Make the smallest useful version.' },
  { number: '04', title: 'Refine', detail: 'Learn from feedback and improve.' },
];

export function Workflow() {
  return (
    <section className="workflow border-y border-border/70 px-6 py-20 md:px-12 md:py-24" aria-labelledby="workflow-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-accent">A simple loop</p>
            <h2 id="workflow-heading" className="text-3xl tracking-tight text-foreground md:text-5xl">How I move an idea forward</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">Good work comes from making the next step clear, then staying open to what you learn.</p>
        </div>

        <ol className="workflow-track grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
          {steps.map((step) => (
            <li className="workflow-step flex gap-4 md:block" key={step.number}>
              <span className="workflow-step__node mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-background font-mono text-[9px] text-accent md:mb-7 md:mt-0">{step.number}</span>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">{step.title}</h3>
                <p className="max-w-[15rem] text-sm leading-6 text-muted-foreground">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
