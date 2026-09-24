import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const faqs: FaqItem[] = [
    {
      question: 'How does Zyg0s work?',
      answer:
        'Zyg0s fuses deterministic TigerGraph GSQL graph algorithms and strict Bank Fraud Policy rules (R1–R10) with an LLM cognitive layer to perform autonomous 8-step fraud investigations with immutable, defensible audit trails.',
    },
    {
      question: 'What data does it use?',
      answer:
        'Zyg0s operates over transaction streams, customer identities, credit accounts, device fingerprints, and 4-month closed case history stored in TigerGraph Savanna Cloud to detect complex fraud rings and synthetic identities.',
    },
    {
      question: 'How do I get started?',
      answer:
        'Connect your TigerGraph Savanna Cloud workspace credentials via .env, launch the investigation agent using our interactive CLI (`python tg_cli.py`), or start the automated benchmark runner (`python run_benchmark_eval.py`).',
    },
    {
      question: 'Can I integrate it with my systems?',
      answer:
        'Yes. Zyg0s natively integrates via Model Context Protocol (MCP), standard REST++/FastAPI webhooks, and headless CLI runners that hook directly into existing core banking risk platforms.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'All graph topologies and customer records remain strictly within your enterprise VPC and encrypted database instances. Neuro-symbolic policy enforcement runs with zero external PII leakage.',
    },
    {
      question: 'Does the agent remember past investigations?',
      answer:
        'Yes. Zyg0s features an episodic, semantic, and procedural graph memory system (GraphRAG) that indexes closed fraud patterns and retrieves similar historical cases with vector and structural scoring.',
    },
    {
      question: 'What happens when I stop the agent?',
      answer:
        'All case checkpoints, intermediate evidence scores (Direct, Circumstantial, Correlative), and FinCEN SAR drafts are durably persisted to TigerGraph and JSON storage, allowing seamless human review and resumption.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      className="relative min-h-screen w-full bg-[#FFFFFF] text-[#000000] flex flex-col justify-between pt-24 sm:pt-28 pb-16 sm:pb-20 px-6 sm:px-12 lg:px-16 select-none"
    >
      {/* Top Header Row */}
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-8 border-b border-black/10 z-10">
        
        {/* Left: FAQs */}
        <div className="lg:col-span-8 space-y-3">
          <h2 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-black leading-none">
            FAQs
          </h2>
        </div>

        {/* Right: View All Docs Link */}
        <div className="lg:col-span-4 flex justify-start lg:justify-end">
          <a
            href="#docs"
            className="group font-mono text-xs tracking-[0.2em] uppercase text-black hover:text-zinc-600 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>VIEW ALL DOCS</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* Accordion FAQ List */}
      <div className="w-full max-w-[1600px] mx-auto flex-1 divide-y divide-black/10 my-4 z-10">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="py-5 sm:py-6 transition-colors">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between gap-6 text-left group cursor-pointer"
              >
                <span className="font-heading font-medium text-xl sm:text-2xl text-black group-hover:text-zinc-600 transition-colors">
                  {faq.question}
                </span>
                <span className="font-mono text-xl text-zinc-500 group-hover:text-black transition-colors w-6 text-center select-none">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="mt-3.5 pr-8 font-body text-zinc-600 text-sm sm:text-base leading-relaxed max-w-4xl transition-all duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
