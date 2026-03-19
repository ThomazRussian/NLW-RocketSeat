"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { CodeEditor } from "@/components/ui/code-editor";
import { submitCodeAction } from "@/app/actions";

export function CodeSubmit() {
  const [code, setCode] = useState("");
  const [roastMode, setRoastMode] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!code.trim()) return;

    setIsSubmitting(true);
    try {
      const result = await submitCodeAction(code, "javascript", roastMode);
      router.push(`/roast/${result.id}`);
    } catch (error) {
      console.error("Failed to submit code:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-[780px]">
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="flex items-center gap-3">
          <span className="text-accent-green font-mono text-4xl font-bold">
            $
          </span>
          <h1 className="text-text-primary font-mono text-4xl font-bold">
            paste your code. get roasted.
          </h1>
        </div>
        <p className="text-text-secondary font-mono text-sm">
          // drop your code below and we&apos;ll rate it — brutally honest or
          full roast mode
        </p>
      </div>

      <CodeEditor
        className="w-full"
        placeholder="// paste your code here..."
        maxLines={100}
        onCodeChange={setCode}
      />

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Toggle
              checked={roastMode}
              onCheckedChange={setRoastMode}
              size="sm"
            />
            <span
              className={`font-mono text-sm ${roastMode ? "text-accent-green" : "text-text-secondary"}`}
            >
              roast mode
            </span>
          </div>
          <span className="text-text-tertiary font-mono text-xs">
            // maximum sarcasm enabled
          </span>
        </div>
        <Button
          onClick={handleSubmit}
          className="font-mono"
          disabled={isSubmitting || !code.trim()}
        >
          {isSubmitting ? "$ roasting..." : "$ roast_my_code"}
        </Button>
      </div>
    </div>
  );
}
