"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  tel: z.string().min(10, "電話番号を正しく入力してください"),
  category: z.string().min(1, "お問い合わせ種別を選択してください"),
  message: z.string().min(1, "お問い合わせ内容を入力してください"),
});

type FormValues = z.infer<typeof schema>;

type SubmitState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("送信エラー");
      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  };

  if (submitState === "success") {
    return (
      <div className="text-center py-16 bg-cream border border-ink/10">
        <p className="font-heading text-green-deep text-2xl mb-4">✓</p>
        <p className="font-heading-jp text-ink text-lg mb-3">お問い合わせを受け付けました</p>
        <p className="text-ink-muted text-sm">
          内容を確認の上、担当者よりご連絡いたします。
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-cream border border-ink/20 px-4 py-3 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-green-deep transition-colors duration-200";
  const labelClass = "block text-xs tracking-[0.1em] text-ink-muted mb-2";
  const errorClass = "text-terracotta text-xs mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-cream p-8 border border-ink/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>お名前 *</label>
          <input {...register("name")} placeholder="山田 太郎" className={inputClass} />
          {errors.name ? <p className={errorClass}>{errors.name.message}</p> : null}
        </div>
        <div>
          <label className={labelClass}>電話番号 *</label>
          <input {...register("tel")} placeholder="090-0000-0000" className={inputClass} />
          {errors.tel ? <p className={errorClass}>{errors.tel.message}</p> : null}
        </div>
      </div>

      <div>
        <label className={labelClass}>メールアドレス *</label>
        <input
          {...register("email")}
          type="email"
          placeholder="your@email.com"
          className={inputClass}
        />
        {errors.email ? <p className={errorClass}>{errors.email.message}</p> : null}
      </div>

      <div>
        <label className={labelClass}>お問い合わせ種別 *</label>
        <select {...register("category")} className={inputClass}>
          <option value="">選択してください</option>
          <option value="reservation">予約について</option>
          <option value="menu">メニューについて</option>
          <option value="shop">ショップ商品について</option>
          <option value="event">イベントについて</option>
          <option value="recruit">採用について</option>
          <option value="other">その他</option>
        </select>
        {errors.category ? <p className={errorClass}>{errors.category.message}</p> : null}
      </div>

      <div>
        <label className={labelClass}>お問い合わせ内容 *</label>
        <textarea
          {...register("message")}
          rows={6}
          placeholder="お問い合わせ内容をご記入ください"
          className={`${inputClass} resize-none`}
        />
        {errors.message ? <p className={errorClass}>{errors.message.message}</p> : null}
      </div>

      {submitState === "error" ? (
        <p className="text-terracotta text-sm text-center">
          送信に失敗しました。時間をおいて再度お試しいただくか、直接お電話ください。
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitState === "loading"}
        className="w-full bg-green-deep text-cream py-4 text-sm tracking-[0.15em] font-heading hover:bg-green-mid transition-colors duration-300 disabled:opacity-60"
      >
        {submitState === "loading" ? "送信中..." : "お問い合わせを送る"}
      </button>

      <p className="text-ink-subtle text-xs text-center">
        ※ 内容確認後、担当者よりメールまたはお電話にてご連絡します
      </p>
    </form>
  );
}
