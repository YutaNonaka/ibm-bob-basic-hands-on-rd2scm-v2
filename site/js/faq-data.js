/*
 * FAQデータ(qa.md の日本語訳)
 *
 * 回答ブロック:
 *   { type: "p",  content: [インライン...] }
 *   { type: "ul", items: [[インライン...], ...] }
 * インライン:
 *   "文字列" / { b: "太字" } / { code: "コード" }
 */
var FAQ_CATEGORIES = [
  { id: "general", label: "一般" },
  { id: "usage", label: "使い方" },
  { id: "advanced", label: "高度な機能" },
  { id: "troubleshooting", label: "トラブルシューティング" }
];

var FAQ_ITEMS = [
  // ---------- 一般 ----------
  {
    id: "general-what-is-bob",
    category: "general",
    question: "Bobとは何ですか?",
    answer: [
      {
        type: "p",
        content: [
          "Bobは、コードの作成、既存コードのリファクタリング、さまざまなタスクの実行を支援する、AI搭載のコーディングパートナーです。カスタムモードやカスタム指示によって、Bobの機能を拡張できます。"
        ]
      }
    ]
  },
  {
    id: "general-how-does-bob-work",
    category: "general",
    question: "Bobはどのように動作しますか?",
    answer: [
      {
        type: "p",
        content: [
          "Bobは大規模言語モデル(LLM)を使ってリクエストを理解し、それをアクションに変換します。Bobは次のことができます。"
        ]
      },
      {
        type: "ul",
        items: [
          ["プロジェクト内のファイルを読み書きする。"],
          ["ターミナルでコマンドを実行する。"],
          ["インターネットを閲覧する(有効にしている場合)。"],
          ["Model Context Protocol(MCP)を介して外部ツールを利用する。"]
        ]
      },
      {
        type: "p",
        content: [
          "チャットインターフェースで指示を出し、Bobが提案するアクションを確認・承認しながら進めます。"
        ]
      }
    ]
  },
  {
    id: "general-what-can-bob-do",
    category: "general",
    question: "Bobには何ができますか?",
    answer: [
      {
        type: "p",
        content: ["Bobは、次のようなさまざまなコーディングタスクを支援できます。"]
      },
      {
        type: "ul",
        items: [
          ["自然言語による説明からのコード生成。"],
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
    id: "general-data-restrictions",
    category: "general",
    question: "Bobで処理してはいけないデータの種類はありますか?",
    answer: [
      {
        type: "p",
        content: ["次の種類のデータは、Bobで処理しないでください。"]
      },
      {
        type: "ul",
        items: [
          ["SPI"],
          ["個人健康情報(PHI:Personal Health Information)"],
          ["輸出規制対象データ(Export Regulated:ITAR、APP など)"],
          ["規制対象の金融データ(銀行口座番号、PAN、非公開の財務データ)"]
        ]
      }
    ]
  },
  {
    id: "general-risks",
    category: "general",
    question: "Bobを使用するリスクは何ですか?",
    answer: [
      {
        type: "p",
        content: [
          "Bobは強力なツールであるため、責任を持って使用することが重要です。次の点に留意してください。"
        ]
      },
      {
        type: "ul",
        items: [
          [
            { b: "Bobは間違えることがあります。" },
            "承認する前に、Bobが提案する変更を必ず注意深く確認してください。"
          ],
          [
            { b: "Bobはコマンドを実行できます。" },
            "特に自動承認を使用している場合は、Bobにコマンドの実行を依頼する際に注意してください。"
          ]
        ]
      }
    ]
  },

  // ---------- 使い方 ----------
  {
    id: "usage-start-task",
    category: "usage",
    question: "新しいタスクを開始するにはどうすればよいですか?",
    answer: [
      {
        type: "p",
        content: [
          "Bobパネルを開き、チャットボックスにタスクを入力します。Bobにやってほしいことを、明確かつ具体的に伝えてください。"
        ]
      }
    ]
  },
  {
    id: "usage-switch-modes",
    category: "usage",
    question: "モードを切り替えるにはどうすればよいですか?",
    answer: [
      {
        type: "p",
        content: [
          "チャット入力エリアのドロップダウンメニューから別のモードを選択するか、",
          { code: "/" },
          " コマンドを使って特定のモードに切り替えます。"
        ]
      }
    ]
  },
  {
    id: "usage-tools",
    category: "usage",
    question: "ツールとは何ですか?どのように使いますか?",
    answer: [
      {
        type: "p",
        content: [
          "ツールは、Bobがお使いのシステムとやり取りするための手段です。Bobはタスクを完了するために、適切なツールを自動的に選択して使用します。ツールを直接呼び出す必要はありません。ツールを使用するたびに、承認または拒否を求められます。"
        ]
      }
    ]
  },
  {
    id: "usage-context-mentions",
    category: "usage",
    question: "コンテキストメンションとは何ですか?",
    answer: [
      {
        type: "p",
        content: [
          "コンテキストメンションは、ファイル、フォルダー、問題(problems)など、プロジェクトに関する特定の情報をBobに伝える方法です。",
          { code: "@" },
          " 記号に続けて、指定したい項目を入力します(例: ",
          { code: "@/src/file.ts" },
          "、",
          { code: "@problems" },
          ")。"
        ]
      }
    ]
  },
  {
    id: "usage-run-commands",
    category: "usage",
    question: "Bobは私のターミナルでコマンドを実行できますか?",
    answer: [
      {
        type: "p",
        content: [
          "はい、Bobはコマンドを実行できます。コマンドの自動承認を有効にしていない限り、実行のたびに承認を求められます。コマンドを自動承認する際は、細心の注意を払ってください。"
        ]
      }
    ]
  },
  {
    id: "usage-feedback",
    category: "usage",
    question: "Bobにフィードバックを提供するにはどうすればよいですか?",
    answer: [
      {
        type: "p",
        content: [
          "Bobが提案したアクションを承認または拒否することで、フィードバックを提供できます。フィードバック欄を使えば、追加のフィードバックも伝えられます。"
        ]
      }
    ]
  },
  {
    id: "usage-customize",
    category: "usage",
    question: "Bobの動作をカスタマイズできますか?",
    answer: [
      {
        type: "p",
        content: ["はい、次のような方法でBobをカスタマイズできます。"]
      },
      {
        type: "ul",
        items: [
          [
            { b: "カスタム指示:" },
            "すべてのモードに適用される一般的な指示や、モード固有の指示を設定できます。"
          ],
          [
            { b: "カスタムモード:" },
            "独自のプロンプトと一部のツール権限を備えた、オリジナルのモードを作成できます。"
          ],
          [
            { b: "Bobルール:" },
            "プロジェクトのルートにある ",
            { code: ".bob/rules/" },
            " フォルダーにMarkdownのルールファイルを作成し、追加のガイドラインを提供できます。"
          ],
          [
            { b: "設定:" },
            "自動承認、差分編集など、さまざまな設定を調整できます。"
          ]
        ]
      }
    ]
  },
  {
    id: "usage-auto-approval",
    category: "usage",
    question: "Bobに自動承認の設定はありますか?",
    answer: [
      {
        type: "p",
        content: [
          "はい、Bobには、有効にするとアクションを自動的に承認する設定がいくつかあります。"
        ]
      }
    ]
  },

  // ---------- 高度な機能 ----------
  {
    id: "advanced-what-is-mcp",
    category: "advanced",
    question: "MCP(Model Context Protocol)とは何ですか?",
    answer: [
      {
        type: "p",
        content: [
          "MCPは、Bobが外部サーバーと通信するためのプロトコルです。カスタムのツールやリソースによってBobの機能を拡張できます。"
        ]
      }
    ]
  },
  {
    id: "advanced-create-mcp-server",
    category: "advanced",
    question: "独自のMCPサーバーを作成できますか?",
    answer: [
      {
        type: "p",
        content: [
          "はい、独自のMCPサーバーを作成して、Bobにカスタム機能を追加できます。"
        ]
      }
    ]
  },

  // ---------- トラブルシューティング ----------
  {
    id: "troubleshooting-not-responding",
    category: "troubleshooting",
    question: "Bobが応答しません。どうすればよいですか?",
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
    id: "troubleshooting-undo-changes",
    category: "troubleshooting",
    question: "Bobが意図しない変更を行いました。元に戻すにはどうすればよいですか?",
    answer: [
      {
        type: "p",
        content: [
          "BobはVS Codeの組み込みのファイル編集機能を使用しています。標準の「元に戻す(Undo)」コマンド(",
          { code: "Ctrl/Cmd + Z" },
          ")で変更を取り消せます。チェックポイントを使って、ファイルに加えられた変更を元に戻すこともできます。"
        ]
      }
    ]
  }
];
