export const jbp = {
  status: 200,
  body: {
    groupName: "Joint Business Plan",
    groupID: "JBP",
    monitors: [
      {
        name: "Checando filas de processamento do JBP",
        id: "queues_validation",
        status: "normal",
        description:
          "As filas de processamento do JBP são parte fundamental do sistema, elas são responsáveis para gerar os valores apresentados em tela e também processar os arquivos. Por isso é de extrema importancia as elas estejam funcionando corretamente. Essa validação fica monitorando as filas e se caso as filas não estejam com a vazão correta, uma alerta será disparado.",
        content: {
          queue: [
            {
              description: "jbp:consolidation_spreadsheet_entries_queue",
              value: 10849,
            },
            {
              description: "jbp:consolidation_entries_queue",
              value: 300606,
            },
            {
              description: "jbp:spreadsheets_queue",
              value: 9,
            },
          ],
        },
      },
      {
        name: "Limite de erros excedidos",
        id: "jbp_database_errors",
        status: "normal",
        description:
          "O JBP possui forte dependência com o Access (Banco de Dados) e por isso foi implementado um sistema de retentativas para os métodos críticos. Essa validação, com base nos logs, monitoria se o número máximo de erros foi alcançado. Se esse alerta chegar, provavelmente uma ação manual precisará ser tomada.",
      },
      {
        name: "Pods do JBP executando",
        id: "jbp_pods_validation",
        status: "warning",
        description:
          "A validação verifica de tempos em tempos o status de cada POD presente no namespace do JBP e alerta caso algum não esteja com o status de running.",
        content: {
          generic: [{ description: "Pod com problema: Nome da POD" }],
        },
      },
    ],
  },
};
