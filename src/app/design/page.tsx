import { Search } from "lucide-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text } from "@/components/Typography";

type ColorToken = {
  name: string;
  hex: string;
  usage: string;
};

type Section = {
  title: string;
  description: string;
  tokens: ColorToken[];
};

const sections: Section[] = [
  {
    title: "Primary",
    description:
      "The brand action color. Used anywhere the UI needs to signal interactivity or brand identity. primary-container is the pastel tint — use it for chips, selections, and focus fills rather than the full-strength primary.",
    tokens: [
      { name: "brand-primary", hex: "#426088", usage: "Buttons, active links, focus rings" },
      {
        name: "brand-primary-dim",
        hex: "#29486e",
        usage: "Hover states — deepens rather than changes hue",
      },
      {
        name: "brand-primary-container",
        hex: "#b3d1ff",
        usage: "Pastel tint — chip backgrounds, focus ring fills",
      },
    ],
  },
  {
    title: "Surface",
    description:
      "Background layers — the paper the UI is printed on. Never used for text or icons. lowest is the brightest white (foreground cards), low is slightly tinted (input fields), surface is the page background, variant is a more distinct fill for accents.",
    tokens: [
      {
        name: "brand-surface",
        hex: "#faf9fc",
        usage: "Page background — the base layer everything sits on",
      },
      {
        name: "brand-surface-low",
        hex: "#f4f3f7",
        usage: "Slightly elevated — input backgrounds, secondary cards",
      },
      {
        name: "brand-surface-lowest",
        hex: "#ffffff",
        usage: "Most prominent — white cards and modals",
      },
      {
        name: "brand-surface-variant",
        hex: "#e3e2e6",
        usage: "Tinted fill — chip backgrounds, hover states on surfaces",
      },
    ],
  },
  {
    title: "On-Surface",
    description:
      "'On' means placed on top of. on-surface is readable on bg-brand-surface; on-surface-variant is the same tone but softer for secondary information.",
    tokens: [
      {
        name: "brand-on-surface",
        hex: "#1a1c1e",
        usage: "Primary text — headings, body copy, strong labels",
      },
      {
        name: "brand-on-surface-variant",
        hex: "#43474e",
        usage: "Subdued text — secondary labels, captions, placeholders",
      },
    ],
  },
  {
    title: "Outline",
    description:
      "Border and divider colours. variant is the weaker of the two — used for most UI chrome (card edges, nav borders). The stronger outline is reserved for elements needing explicit definition like focused inputs.",
    tokens: [
      {
        name: "brand-outline",
        hex: "#73777f",
        usage: "Stronger borders — focused inputs, explicit separators",
      },
      {
        name: "brand-outline-variant",
        hex: "#c3c6cf",
        usage: "Subtle borders — card edges, nav underlines, dividers",
      },
    ],
  },
  {
    title: "Error",
    description:
      "Destructive and validation states. error is the action colour, error-container is the tinted background for inline error messages, on-error ensures legibility of text placed directly on error surfaces.",
    tokens: [
      { name: "brand-error", hex: "#ba1a1a", usage: "Destructive actions, validation errors" },
      {
        name: "brand-error-container",
        hex: "#ffdad6",
        usage: "Error state backgrounds — inline messages, banners",
      },
      { name: "brand-on-error", hex: "#ffffff", usage: "Text and icons placed on error surfaces" },
    ],
  },
];

function ColorSwatch({ name, hex, usage }: ColorToken) {
  return (
    <div className="ambient-shadow rounded-brand-lg border-brand-outline-variant/20 bg-brand-surface-lowest overflow-hidden border">
      <div className="h-20 w-full" style={{ backgroundColor: hex }} />
      <div className="space-y-1 p-3">
        <p className="text-brand-on-surface font-mono text-xs font-semibold">{name}</p>
        <p className="text-brand-on-surface-variant/70 font-mono text-[10px]">{hex}</p>
        <p className="text-brand-on-surface-variant/60 text-[10px] leading-snug">{usage}</p>
      </div>
    </div>
  );
}

const typographyVariants: {
  variant: Parameters<typeof Text>[0]["variant"];
  label: string;
  usage: string;
}[] = [
  { variant: "h1", label: "h1", usage: "Page titles" },
  { variant: "h2", label: "h2", usage: "Section headings" },
  { variant: "h3", label: "h3", usage: "Sub-section headings, card titles" },
  { variant: "body", label: "body", usage: "Prose, descriptions, general content" },
  { variant: "muted", label: "muted", usage: "Secondary info, captions, help text" },
  { variant: "label", label: "label", usage: "Form labels, metadata tags, timestamps" },
];

export default function DesignPage() {
  return (
    <main className="py-16">
      <div className="mb-12">
        <h1 className="text-brand-on-surface mb-2 text-3xl font-semibold tracking-tight">
          Design System
        </h1>
        <p className="text-brand-on-surface-variant max-w-2xl text-sm">
          Brand colour tokens following Material Design 3 naming conventions. Use semantic role
          names rather than literal colour names — pick a token based on <em>what it&apos;s for</em>
          , not what it looks like. Use the{" "}
          <code className="bg-brand-surface-variant rounded px-1.5 py-0.5 text-xs">brand-</code>{" "}
          prefix in Tailwind, e.g.{" "}
          <code className="bg-brand-surface-variant rounded px-1.5 py-0.5 text-xs">
            bg-brand-primary
          </code>{" "}
          or{" "}
          <code className="bg-brand-surface-variant rounded px-1.5 py-0.5 text-xs">
            text-brand-on-surface
          </code>
          .
        </p>
      </div>

      <div className="space-y-14">
        <section>
          <div className="mb-6">
            <h2 className="text-brand-on-surface mb-1 text-xl font-semibold tracking-tight">
              Button
            </h2>
            <p className="text-brand-on-surface-variant max-w-2xl text-sm leading-relaxed">
              Primary action trigger. Use for the single most important action on a page or within a
              form. Supports all native button attributes including{" "}
              <code className="bg-brand-surface-variant rounded px-1.5 py-0.5 text-xs">
                disabled
              </code>
              .
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Save changes</Button>
            <Button>
              <Search className="size-4" />
              Search
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-brand-on-surface mb-1 text-xl font-semibold tracking-tight">
              Input
            </h2>
            <p className="text-brand-on-surface-variant max-w-2xl text-sm leading-relaxed">
              Text input field. Supports all native input attributes including{" "}
              <code className="bg-brand-surface-variant rounded px-1.5 py-0.5 text-xs">
                disabled
              </code>{" "}
              and{" "}
              <code className="bg-brand-surface-variant rounded px-1.5 py-0.5 text-xs">
                placeholder
              </code>
              .
            </p>
          </div>
          <div className="flex max-w-sm flex-col gap-3">
            <Input placeholder="Default" />
            <Input placeholder="Disabled" disabled />
          </div>
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-brand-on-surface mb-1 text-xl font-semibold tracking-tight">
              Typography
            </h2>
            <p className="text-brand-on-surface-variant max-w-2xl text-sm leading-relaxed">
              Use the{" "}
              <code className="bg-brand-surface-variant rounded px-1.5 py-0.5 text-xs">
                {"<Text>"}
              </code>{" "}
              component with a{" "}
              <code className="bg-brand-surface-variant rounded px-1.5 py-0.5 text-xs">
                variant
              </code>{" "}
              prop. Pass{" "}
              <code className="bg-brand-surface-variant rounded px-1.5 py-0.5 text-xs">as</code> to
              override the default HTML element.
            </p>
          </div>
          <div className="border-brand-outline-variant/30 rounded-brand-lg divide-brand-outline-variant/20 bg-brand-surface-lowest ambient-shadow divide-y border">
            {typographyVariants.map(({ variant, label, usage }) => (
              <div key={variant} className="flex items-baseline gap-6 px-5 py-4">
                <span className="text-brand-on-surface-variant/50 w-12 shrink-0 font-mono text-[10px]">
                  {label}
                </span>
                <Text variant={variant} className="flex-1">
                  The quick brown fox
                </Text>
                <span className="text-brand-on-surface-variant/50 shrink-0 text-[10px]">
                  {usage}
                </span>
              </div>
            ))}
          </div>
        </section>

        {sections.map((section) => (
          <section key={section.title}>
            <div className="mb-6">
              <h2 className="text-brand-on-surface mb-1 text-xl font-semibold tracking-tight">
                {section.title}
              </h2>
              <p className="text-brand-on-surface-variant max-w-2xl text-sm leading-relaxed">
                {section.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {section.tokens.map((token) => (
                <ColorSwatch key={token.name} {...token} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
