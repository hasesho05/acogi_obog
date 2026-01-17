#!/bin/bash

# PreCompact Hook: Auto compact前に作業報告をdocsに保存する

# stdin からフック入力を読み取り
input=$(cat)

# jqがあれば使う、なければgrep/sedで代用
if command -v jq &> /dev/null; then
  session_id=$(echo "$input" | jq -r '.session_id')
  trigger=$(echo "$input" | jq -r '.trigger')
  transcript_path=$(echo "$input" | jq -r '.transcript_path')
else
  # jqなしのフォールバック
  session_id=$(echo "$input" | grep -o '"session_id"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*:.*"\([^"]*\)"/\1/')
  trigger=$(echo "$input" | grep -o '"trigger"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*:.*"\([^"]*\)"/\1/')
  transcript_path=$(echo "$input" | grep -o '"transcript_path"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*:.*"\([^"]*\)"/\1/')
fi

# デフォルト値設定
session_id="${session_id:-unknown}"
trigger="${trigger:-auto}"
transcript_path="${transcript_path:-}"

# docsディレクトリの確認・作成
docs_dir="${CLAUDE_PROJECT_DIR:-$(pwd)}/docs"
mkdir -p "$docs_dir"

# タイムスタンプ生成
timestamp=$(date '+%Y-%m-%d %H:%M:%S')
date_str=$(date '+%Y%m%d-%H%M%S')
trigger_type=$([ "$trigger" = "manual" ] && echo "Manual Compact" || echo "Auto-Compact")

# レポートファイル名
report_file="$docs_dir/work-report-${date_str}.md"

# レポートヘッダー作成
cat > "$report_file" << EOF
# 作業報告 - $timestamp

**トリガー**: $trigger_type
**セッションID**: $session_id

---

## セッション概要

このレポートはClaude Codeのコンテキストがコンパクト化される前に自動生成されました。

EOF

# トランスクリプトファイルが存在する場合、情報を抽出
if [ -n "$transcript_path" ] && [ -f "$transcript_path" ]; then
  echo "## トランスクリプト情報" >> "$report_file"
  echo "" >> "$report_file"
  echo "トランスクリプトファイルが見つかりました。" >> "$report_file"
  echo "" >> "$report_file"

  # ファイルサイズと行数を表示
  file_size=$(ls -lh "$transcript_path" 2>/dev/null | awk '{print $5}')
  line_count=$(wc -l < "$transcript_path" 2>/dev/null | tr -d ' ')
  echo "- **ファイルサイズ**: $file_size" >> "$report_file"
  echo "- **行数**: $line_count" >> "$report_file"
  echo "" >> "$report_file"

  # jqがある場合のみ詳細な抽出を試みる
  if command -v jq &> /dev/null; then
    echo "## 使用したツール" >> "$report_file"
    echo "" >> "$report_file"
    echo '```' >> "$report_file"
    jq -r 'select(.type=="assistant") | .message.content[]? | select(.type=="tool_use") | .name' \
      "$transcript_path" 2>/dev/null | sort | uniq -c | sort -rn | head -10 >> "$report_file"
    echo '```' >> "$report_file"
    echo "" >> "$report_file"
  fi
else
  echo "## 備考" >> "$report_file"
  echo "" >> "$report_file"
  echo "トランスクリプトファイルへのアクセスができませんでした。" >> "$report_file"
  echo "" >> "$report_file"
fi

# フッター追加
cat >> "$report_file" << EOF

---

## 参照情報

- **トランスクリプト**: \`$transcript_path\`
- **生成日時**: $timestamp
- **セッションID**: $session_id

EOF

# 成功メッセージを stderr に出力（verbose mode で表示される）
echo "✓ 作業報告を保存しました: $report_file" >&2

# exit 0 でコンパクト処理を続行
exit 0
