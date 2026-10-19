// FAQデータ（qa.md の日本語訳）
// answer はブロックの配列:
//   { type: "p", text: インライン }
//   { type: "ul", items: [インライン, ...] }
// インラインは 文字列 / { b: "太字" } / { code: "コード" } の配列
var FAQ_CATEGORIES = [
  { id: "general", label: "一般" },
  { id: "usage", label: "使い方" },
  { id: "advanced", label: "高度な機能" },
  { id: "troubleshooting", label: "トラブルシューティング" }
];

var FAQ_ITEMS = [
  // ---- 一般 ----
  {
    id: "what-is-bob",
    category: "general",
    question: "Bobとは何ですか？",
    answer: [
      {
        type: "p",
        text: [
          "Bobは、コードの作成、既存コードのリファクタリング、さまざまなタスクの完了を支援する、AI搭載のコーディングパートナーです。カスタムモードやカスタム指示によって、Bobの機能を拡張できます。"
        ]
      }
    ]
  },
  {
    id: "how-bob-works",
    category: "general",
    question: "Bobはどのように動作しますか？",
    answer: [
      {
        type: "p",
        text: [
          "Bobは大規模言語モデル（LLM）を使用して、あなたの依頼を理解し、具体的な操作に変換します。次のことができます。"
        ]
      },
      {
        type: "ul",
        items: [
          ["プロジェクト内のファイルの読み書き。"],
          ["ターミナルでのコマンド実行。"],
          ["インターネットの閲覧（有効にしている場合）。"],
          ["Model Context Protocol（MCP）を介した外部ツールの利用。"]
        ]
      },
      {
        type: "p",
        text: [
          "Bobとはチャット画面でやり取りします。指示を入力し、Bobが提案する操作を確認して承認します。"
        ]
      }
    ]
  },
  {
    id: "what-bob-can-do",
    category: "general",
    question: "Bobには何ができますか？",
    answer: [
      { type: "p", text: ["Bobは、次のようなさまざまなコーディング作業を支援できます。"] },
      {
        type: "ul",
        items: [
          ["自然言語の説明からのコード生成。"],
          ["既存コードのリファクタリング。"],
          ["バグの修正。"],
          ["ドキュメントの作成。"],
          ["コードの解説。"],
          ["コードベースに関する質問への回答。"],
          ["繰り返し作業の自動化。"],
          ["新しいファイルやプロジェクトの作成。"]
        ]
      }
    ]
  },
  {
    id: "data-restrictions",
    category: "general",
    question: "Bobで処理してはいけないデータの種類はありますか？",
    answer: [
      { type: "p", text: ["次の種類のデータは、Bobで処理しないでください。"] },
      {
        type: "ul",
        items: [
          ["SPI"],
          ["個人の健康情報（PHI）"],
          ["輸出規制対象データ（ITAR、APP など）"],
          ["規制対象の金融データ（銀行口座番号、PAN、非公開の財務データ）"]
        ]
      }
    ]
  },
  {
    id: "risks",
    category: "general",
    question: "Bobを使うことにリスクはありますか？",
    answer: [
      {
        type: "p",
        text: [
          "Bobは強力なツールであり、責任を持って使用することが重要です。次の点に注意してください。"
        ]
      },
      {
        type: "ul",
        items: [
          [{ b: "Bobは間違えることがあります。" }, "承認する前に、Bobが提案する変更を必ず注意深く確認してください。"],
          [{ b: "Bobはコマンドを実行できます。" }, "特に自動承認を使用している場合は、Bobへのコマンド実行の依頼に注意してください。"]
        ]
      }
    ]
  },

  // ---- 使い方 ----
  {
    id: "start-task",
    category: "usage",
    question: "新しいタスクはどのように開始しますか？",
    answer: [
      {
        type: "p",
        text: [
          "Bobパネルを開き、チャットボックスにタスクを入力します。Bobにしてほしいことを、明確かつ具体的に伝えてください。"
        ]
      }
    ]
  },
  {
    id: "switch-modes",
    category: "usage",
    question: "モードはどのように切り替えますか？",
    answer: [
      {
        type: "p",
        text: [
          "チャット入力エリアのドロップダウンメニューから別のモードを選択するか、",
          { code: "/" },
          " コマンドで特定のモードに切り替えます。"
        ]
      }
    ]
  },
  {
    id: "tools",
    category: "usage",
    question: "ツールとは何ですか？どのように使いますか？",
    answer: [
      {
        type: "p",
        text: [
          "ツールは、Bobがお使いのシステムとやり取りするための手段です。Bobはタスクを完了するために適切なツールを自動的に選択して使用するため、ツールを直接呼び出す必要はありません。ツールが使用されるたびに、承認または拒否を求められます。"
        ]
      }
    ]
  },
  {
    id: "context-mentions",
    category: "usage",
    question: "コンテキストメンションとは何ですか？",
    answer: [
      {
        type: "p",
        text: [
          "コンテキストメンションは、ファイル、フォルダー、問題など、プロジェクトに関する特定の情報をBobに伝える方法です。",
          { code: "@" },
          " に続けて対象を指定します（例: ",
          { code: "@/src/file.ts" },
          "、",
          { code: "@problems" },
          "）。"
        ]
      }
    ]
  },
  {
    id: "run-commands",
    category: "usage",
    question: "Bobはターミナルでコマンドを実行できますか？",
    answer: [
      {
        type: "p",
        text: [
          "はい、実行できます。コマンドの自動承認を有効にしていない限り、各コマンドの実行前に承認を求められます。コマンドを自動承認する場合は、細心の注意を払ってください。"
        ]
      }
    ]
  },
  {
    id: "feedback",
    category: "usage",
    question: "Bobにフィードバックを伝えるにはどうすればよいですか？",
    answer: [
      {
        type: "p",
        text: [
          "Bobが提案する操作を承認または拒否することでフィードバックを伝えられます。フィードバック欄を使えば、追加のフィードバックも入力できます。"
        ]
      }
    ]
  },
  {
    id: "customize",
    category: "usage",
    question: "Bobの動作をカスタマイズできますか？",
    answer: [
      { type: "p", text: ["はい、次のような方法でBobをカスタマイズできます。"] },
      {
        type: "ul",
        items: [
          [{ b: "カスタム指示:" }, "すべてのモードに適用される一般的な指示や、モード固有の指示を設定できます。"],
          [{ b: "カスタムモード:" }, "専用のプロンプトと一部のツール権限を持つ独自のモードを作成できます。"],
          [
            { b: "Bobルール:" },
            "プロジェクトのルートにある ",
            { code: ".bob/rules/" },
            " フォルダーにMarkdownのルールファイルを作成して、追加のガイドラインを提供できます。"
          ],
          [{ b: "設定:" }, "自動承認、差分編集など、さまざまな設定を調整できます。"]
        ]
      }
    ]
  },
  {
    id: "auto-approval",
    category: "usage",
    question: "Bobに自動承認の設定はありますか？",
    answer: [
      {
        type: "p",
        text: ["はい、有効にすると操作を自動的に承認する設定がいくつかあります。"]
      }
    ]
  },

  // ---- 高度な機能 ----
  {
    id: "what-is-mcp",
    category: "advanced",
    question: "MCP（Model Context Protocol）とは何ですか？",
    answer: [
      {
        type: "p",
        text: [
          "MCPは、Bobが外部サーバーと通信するためのプロトコルです。カスタムツールやリソースによって、Bobの機能を拡張できます。"
        ]
      }
    ]
  },
  {
    id: "create-mcp-server",
    category: "advanced",
    question: "独自のMCPサーバーを作成できますか？",
    answer: [
      {
        type: "p",
        text: ["はい、独自のMCPサーバーを作成して、Bobにカスタム機能を追加できます。"]
      }
    ]
  },

  // ---- トラブルシューティング ----
  {
    id: "not-responding",
    category: "troubleshooting",
    question: "Bobが応答しません。どうすればよいですか？",
    answer: [
      {
        type: "ul",
        items: [
          ["APIキーが正しく、有効期限が切れていないことを確認してください。"],
          ["インターネット接続を確認してください。"],
          ["VS Codeを再起動してみてください。"]
        ]
      }
    ]
  },
  {
    id: "undo-changes",
    category: "troubleshooting",
    question: "Bobが意図しない変更を加えました。元に戻すにはどうすればよいですか？",
    answer: [
      {
        type: "p",
        text: [
          "BobはVS Code組み込みのファイル編集機能を使用しています。標準の「元に戻す」コマンド（Ctrl/Cmd + Z）で変更を取り消せます。チェックポイントを使って、ファイルに加えられた変更を元に戻すこともできます。"
        ]
      }
    ]
  }
];
