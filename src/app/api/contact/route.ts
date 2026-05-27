import { NextResponse } from "next/server";

const CATEGORY_LABEL: Record<string, string> = {
  reservation: "予約について",
  menu: "メニューについて",
  shop: "ショップ商品について",
  event: "イベントについて",
  recruit: "採用について",
  other: "その他",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, tel, category, message } = body;

    if (!name || !email || !tel || !category || !message) {
      return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: "QQ お問い合わせ <noreply@resend.dev>",
        to: ["k-kakihara@bgs-jpn.net"],
        subject: `【QQ お問い合わせ】${name}様`,
        text: `
お問い合わせが届きました。

━━ お客様情報 ━━
お名前: ${name}
メール: ${email}
電話番号: ${tel}

━━ お問い合わせ内容 ━━
種別: ${CATEGORY_LABEL[category] ?? category}

${message}

━━━━━━━━━━
QQ / Quinto.Quinte お問い合わせシステム
        `.trim(),
      });
    } else {
      console.log("RESEND_API_KEY未設定 — メール送信をスキップ:", { name, email, category });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("お問い合わせAPI エラー:", error);
    return NextResponse.json({ error: "内部エラー" }, { status: 500 });
  }
}
