# CLAUDE.md

> Claude Code はセッション開始時にこのファイルを自動で読む。

## この案件について

- 案件名: プログラミングランド v2（小学1〜2年生向けプログラミング学習ゲーム）
- 種別: 個人開発
- 台帳: progland-handoff.md

## セッション開始時に必ずやること

1. 上記の台帳（handoff）を読み、現在地・決定事項・教訓を把握する
2. 作業規範は dev-workflow スキル（~/.claude/skills/dev-workflow/）に従う
3. 把握が終わるまで、実装・編集・デプロイをしない（鉄則1）

## このリポジトリ固有の注意

- デプロイ方法: `npm run deploy`（verify→build→docs/コピー→commit→push。mainの docs/ から GitHub Pages 配信、アカウント kanda-houtokukai）。push後1〜2分で反映、確認はシークレットウィンドウ＋アプリ内バージョン表示で行う。サーバ・DB・外部アカウント・課金は作らない。
- ⚠️ ドキュメントのみのコミットは `npm run deploy` を経由しない → 手動で `git push origin main` が必要（push 後、Chat が raw で裏取り）。
- 公開URL: https://kanda-houtokukai.github.io/programming-land/
- ⚠️ GitHub Actions のワークフローファイルは push できない（保存済みトークンに workflow 権限がない）。CI化したくなったらまずトークンの権限を確認すること。
- 触ってはいけない場所: `progland-実装指示書.md` は正本の指示書（第2版）。承認なしに編集しない。`programming-land.jsx`（v1・動作確認済み）は移植元の参照専用。編集しない。
- dev サーバ稼働中に `npm run build` を実行しない（ビルド破損の既知事故と同型。dev停止→build）。
- ステージ・クイズ・タイピング課題はデータファイルに分離。本体コードに問題をハードコードしない。
- パズルステージは手作業で作らない。ジェネレータで量産し、ソルバー検証（`npm run verify`）を通ったものだけ採用する。
- 効果音の AudioContext はユーザー操作後に初期化する（自動再生制限対策・v1踏襲）。
- 保存データはバージョン番号つき・`{...newSave(), ...parsed}` 方式のデフォルト値マージで読み込む（v1踏襲）。
- 各フェーズ完了時は必ずビルド→ブラウザ実機（Safari含む）確認。プレビュー成功≠完成。
- 中間報告ポイント: P0完了時・P1のジェネレータ＋ソルバー完成時（量産前）・各フェーズ完了時に一度停止して報告する。
