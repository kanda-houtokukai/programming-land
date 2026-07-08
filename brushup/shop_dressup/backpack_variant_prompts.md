# 画像生成プロンプト: リュック版ベース人物（探検家×キーボード/魔法の本・計4体）

作成: 2026-07-07 ／ 対象: 着せ替え基盤・back スロットの「埋め込み型」ベース
前提: 探検家版ベース人物2体（`player_boy_adventure.png`／`player_girl_adventure.png`）が確定済み。
今回はこの2体を土台に、リュックを背負った状態を**正面から見た絵**として4体作る。

---

## 0. 最重要ルール（絶対に守る・前回の反省を活かす）

- **商品写真アングルにしない。** 「探検家版の人物が、すでにリュックを背負って
  正面を向いている状態」を描く。斜め上からの3/4視点は禁止。
- 体の骨格・服・ポーズ・頭身・顔・髪型は探検家版ベースと**完全に同一**。
  変えるのは「リュックを背負っている」ことだけ。
- リュックは体の**後ろ**にあるので、正面から見えるのは以下だけでよい:
  - 両肩にかかる肩ひもの上端（左右対称）
  - 体の脇からわずかにはみ出すリュック本体の縁
  - （高さによっては）頭の少し後ろにわずかに見える鞄の上端
  **鞄全体を描く必要はない。** 隠れて見えない部分まで無理に描かせると、
  かえって体との整合が崩れる。

---

## 1. プロンプト: 男の子×キーボードリュック

```
Take this exact boy character (same face, same explorer outfit, same pose,
same proportions, same front-facing camera angle — see reference image) and
show him ALREADY WEARING a small backpack on his back, viewed from directly
in front (NOT a 3/4 angle, not from the side).

Since the backpack is on his back, only these parts should be visible from
the front: two straps coming up and over both shoulders symmetrically, and a
small sliver of the keyboard-shaped backpack (navy blue with a few cute
oversized keyboard keys — star, heart, arrow, enter) peeking out just beyond
each side of his torso, at about waist-to-chest height. Do not draw the whole
backpack floating in front of him — it should read as worn behind his body,
mostly hidden by his torso and arms.

Everything else (face, hair, explorer vest/shirt, shorts, boots, pose, lighting,
proportions, camera framing) must stay exactly the same as the reference image.
Plain white or transparent background, no shadow, no text.
Full body, head-to-toe, vertical portrait orientation.
```

## 2. プロンプト: 男の子×まほうのほんリュック

```
Take this exact boy character (same face, same explorer outfit, same pose,
same proportions, same front-facing camera angle — see reference image) and
show him ALREADY WEARING a small backpack on his back, viewed from directly
in front (NOT a 3/4 angle, not from the side).

Since the backpack is on his back, only these parts should be visible from
the front: two straps coming up and over both shoulders symmetrically (warm
purple with gold trim buckles), and a small sliver of the purple magic-book-
shaped backpack (with a glowing star/sparkle emblem) peeking out just beyond
each side of his torso, at about waist-to-chest height. Do not draw the whole
backpack floating in front of him — it should read as worn behind his body,
mostly hidden by his torso and arms.

Everything else (face, hair, explorer vest/shirt, shorts, boots, pose, lighting,
proportions, camera framing) must stay exactly the same as the reference image.
Plain white or transparent background, no shadow, no text.
Full body, head-to-toe, vertical portrait orientation.
```

## 3. プロンプト: 女の子×キーボードリュック

```
Take this exact girl character (same face, same ponytail hair, same explorer
outfit, same pose, same proportions, same front-facing camera angle — see
reference image) and show her ALREADY WEARING a small backpack on her back,
viewed from directly in front (NOT a 3/4 angle, not from the side).

Since the backpack is on her back, only these parts should be visible from
the front: two straps coming up and over both shoulders symmetrically, and a
small sliver of the keyboard-shaped backpack (navy blue with a few cute
oversized keyboard keys — star, heart, arrow, enter) peeking out just beyond
each side of her torso, at about waist-to-chest height. Do not draw the whole
backpack floating in front of her — it should read as worn behind her body,
mostly hidden by her torso and arms.

Everything else (face, hair, explorer vest/shirt, skirt/shorts, boots, pose,
lighting, proportions, camera framing) must stay exactly the same as the
reference image. Plain white or transparent background, no shadow, no text.
Full body, head-to-toe, vertical portrait orientation.
```

## 4. プロンプト: 女の子×まほうのほんリュック

```
Take this exact girl character (same face, same ponytail hair, same explorer
outfit, same pose, same proportions, same front-facing camera angle — see
reference image) and show her ALREADY WEARING a small backpack on her back,
viewed from directly in front (NOT a 3/4 angle, not from the side).

Since the backpack is on her back, only these parts should be visible from
the front: two straps coming up and over both shoulders symmetrically (warm
purple with gold trim buckles), and a small sliver of the purple magic-book-
shaped backpack (with a glowing star/sparkle emblem) peeking out just beyond
each side of her torso, at about waist-to-chest height. Do not draw the whole
backpack floating in front of her — it should read as worn behind her body,
mostly hidden by her torso and arms.

Everything else (face, hair, explorer vest/shirt, skirt/shorts, boots, pose,
lighting, proportions, camera framing) must stay exactly the same as the
reference image. Plain white or transparent background, no shadow, no text.
Full body, head-to-toe, vertical portrait orientation.
```

---

## 5. 生成時の重要な補足（日本語・必ず添える）

**必ず対応するベース画像（探検男/探検女）をChatGPTに一緒にアップロードしてください。**
文章だけでは体型・服・ポーズが一致しにくいためです。添える一言:

「アップロードした画像の子と、顔・髪型・服・ポーズ・カメラアングルを完全に
同じにしてください。変えるのは背中にリュックを背負っていることだけです。
リュックは体に隠れて見えない前提なので、肩ひもの上端と、体の脇からわずかに
はみ出す部分だけを描いてください。斜めから見た商品写真のような構図には
しないでください」

3〜4案出してもらい、以下で選ぶ:
1. 顔・服・ポーズが探検家版ベースと同一に見える（別人にならない）
2. リュックが「背負って隠れている」正面図になっている（浮いた商品写真でない）
3. 肩ひもの位置が左右対称で、肩の位置と自然に合っている

もし体型や服が変わってしまう場合、「服や体型は一切変えず、背中にリュックが
追加されただけの状態にして」と重ねて指示すると近づきやすいです。

---

## 6. 納品後の流れ（Chat側作業）

4体を受け取り次第、Chatが実施:
1. 透過処理（今回確立した「外周フラッドフィル＋ピンポイントの隙間狙い」方式）。
2. 探検家版ベース（頭頂85px・足元1385px・中心49.9〜50.3%）に頭頂/足元を
   ピクセル単位で一致させる補正。
3. 肩ひも・鞄の見え方が探検家版の体と自然に噛み合っているか確認（大きくズレて
   いれば、この場でChatGPTに再生成を依頼するか、私が微調整します）。
4. 6体（探検版2体＋リュック版4体）が揃った時点で、着せ替え基盤設計書の
   §4データ構造に反映し、Codeへの実装指示書を作成。

生成できたら、1体ずつでもまとめてでもアップロードしてください。
