"use client";
import { useState } from "react";
import DurationPicker from "@/components/DurationPicker";
import FlowRatePreview from "@/components/FlowRatePreview";
import { Button, Input } from "@/components/ui";
import { useTranslations } from "@/src/lib/i18n";

export default function NewStream() {
  const t = useTranslations("stream_new");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState(0);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-8">{t("title")}</h1>
        <div className="space-y-6">
          <Input
            id="recipient"
            label={t("recipient_label")}
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder={t("recipient_placeholder")}
          />
          <Input
            id="amount"
            label={t("amount_label")}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t("amount_placeholder")}
          />
          <div>
            <label className="text-gray-400 text-sm block mb-2">{t("duration_label")}</label>
            <DurationPicker onChange={setDuration} />
          </div>
          {amount && duration > 0 && (
            <FlowRatePreview amount={amount} durationSeconds={duration} />
          )}
          <Button fullWidth>{t("submit")}</Button>
        </div>
      </div>
    </main>
  );
}
