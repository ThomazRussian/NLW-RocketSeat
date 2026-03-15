import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { ScoreRing } from "@/components/ui/score-ring";
import {
  TableCodeCell,
  TableLangCell,
  TableRankCell,
  TableRow,
  TableScoreCell,
} from "@/components/ui/table-row";
import { Toggle } from "@/components/ui/toggle";

const variants = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "danger",
] as const;
const sizes = ["sm", "default", "lg", "icon"] as const;
const badgeVariants = ["critical", "warning", "good", "verdict"] as const;

const sampleCode = `function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}`;

export default function ComponentsPage() {
  return (
    <main className="min-h-screen p-8 space-y-16 bg-bg-page">
      <section>
        <h1 className="text-2xl font-bold mb-8 text-text-primary">
          Componentes UI
        </h1>

        <div className="space-y-12">
          <div>
            <h2 className="text-lg font-semibold mb-4 text-text-primary">
              Button Variants x Sizes
            </h2>
            <div className="space-y-6">
              {variants.map((variant) => (
                <div key={variant} className="flex items-center gap-4">
                  <span className="w-20 text-sm text-text-secondary capitalize">
                    {variant}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <Button key={size} variant={variant} size={size}>
                        {size === "icon" ? "●" : size}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-text-primary">
              Button Disabled
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <Button disabled>Primary</Button>
              <Button variant="secondary" disabled>
                Secondary
              </Button>
              <Button variant="outline" disabled>
                Outline
              </Button>
              <Button variant="ghost" disabled>
                Ghost
              </Button>
              <Button variant="danger" disabled>
                Danger
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-text-primary">
              Badge Variants
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              {badgeVariants.map((variant) => (
                <Badge key={variant} variant={variant}>
                  {variant}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-text-primary">
              Badge Sizes
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <Badge size="sm">Small</Badge>
              <Badge size="default">Default</Badge>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-text-primary">
              Toggle
            </h2>
            <div className="flex flex-wrap items-center gap-8">
              <Toggle>Toggle Off</Toggle>
              <Toggle defaultChecked>Toggle On</Toggle>
              <Toggle size="sm">Small</Toggle>
              <Toggle size="lg">Large</Toggle>
              <Toggle disabled>Disabled</Toggle>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-text-primary">
              Card
            </h2>
            <Card className="w-[480px]">
              <CardHeader>
                <CardTitle>Analysis Result</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  The var keyword is function-scoped rather than block-scoped,
                  which can lead to unexpected behavior and bugs. Modern
                  javascript uses const for immutable bindings and let for
                  mutable ones.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-text-primary">
              CodeBlock (Server Component)
            </h2>
            <CodeBlock code={sampleCode} language="javascript" />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-text-primary">
              Score Ring
            </h2>
            <div className="flex flex-wrap items-center gap-8">
              <ScoreRing value={3.5} size="sm" />
              <ScoreRing value={7} />
              <ScoreRing value={2.1} size="lg" />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-text-primary">
              Table Row (Leaderboard)
            </h2>
            <div className="w-full max-w-[600px]">
              <TableRow>
                <TableRankCell rank={1} />
                <TableScoreCell score={8.5} />
                <TableCodeCell>
                  function calculateTotal(items) {"{"} var total = 0;
                </TableCodeCell>
                <TableLangCell language="javascript" />
              </TableRow>
              <TableRow>
                <TableRankCell rank={2} />
                <TableScoreCell score={5.2} />
                <TableCodeCell>
                  const fetchData = async () ={">"} {"{"}...
                </TableCodeCell>
                <TableLangCell language="typescript" />
              </TableRow>
              <TableRow>
                <TableRankCell rank={3} />
                <TableScoreCell score={3.1} />
                <TableCodeCell>def hello_world(): print("Hello")</TableCodeCell>
                <TableLangCell language="python" />
              </TableRow>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
