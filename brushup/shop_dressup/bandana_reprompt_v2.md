# 再生成プロンプト: たんけんバンダナ（前面のみ・輪っかなし）

作成: 2026-07-07 ／ 理由: 前回生成は「首を通す輪っか＋結び目＋三角」の
完全な形だった。体のレイヤーとして前面に重ねる用途では、輪っか部分は
実際には首に隠れて見えないため、**最初から前面（結び目＋垂れ布）だけを
描いた絵**として作り直す。機械的に切り取ると縁が不自然な直線になるため、
生成し直すのが確実（前回の反省）。

---

## プロンプト

```
A cute 3D-rendered explorer's neckerchief/bandana for a children's game item
icon, Pixar-style, soft lighting, high saturation. Show ONLY the front-facing
part as it would appear already tied around a character's neck — a knot with
two small folded fabric ends beside it, and a triangular piece of cloth
hanging down below the knot.

Do NOT draw the neck loop/collar band that would go around the back of the
neck — that part is hidden behind the neck and should not be included at all.
The top of the image should end naturally at the top of the knot (where the
fabric would disappear behind the neck/collar), not as a hard straight cut —
the knot's own rounded shape should form the natural top edge of the image.

Warm olive-green/khaki color with a subtle pattern (small compass motifs or
dots), matching an adventurer/explorer aesthetic. Toy-like, chunky, friendly
proportions matching the rest of the explorer gear set.

Plain white background, no shadow, no text, no neck/body visible — just the
tied bandana shape itself (knot + folds + triangle) floating on white,
front-facing, symmetrical. Square or portrait composition, centered.
```

## 生成時の補足（日本語）

「このバンダナは、体の前に重ねるレイヤー画像として使います。首の後ろに
回る部分（輪っか）は体に隠れて見えないので、**そもそも描かないでください**。
結び目から下、実際に正面から見える部分だけを描いてください。画像の一番上は、
結び目の丸み自体が自然な輪郭になるようにしてください（四角く切ったような
まっすぐな線にはしないでください）」

3〜4案出してもらい、以下で選ぶ:
1. 輪っか（首の後ろに回る部分）が描かれていない
2. 上端が結び目の自然な丸みで終わっている（直線カットに見えない）
3. 色・質感が既存の探検家アイテムと揃っている

## 納品後の流れ

届いたら、Chatが透過処理し、探検家版ベース人物の襟元に仮合成して
自然に収まるか確認します（前回と同じ検証手順）。
