export const bees = {
  status: 200,
  body: {
    groupName: "Abelinhas",
    groupID: "bees",
    monitors: [
      {
        name: "Checando filas de processamento do Abelinhas",
        id: "queues_validation",
        status: "normal",
        description:
          "As filas de processamento do Abelinhas são parte fundamental do sistema, elas são responsáveis para gerar os valores apresentados em tela e também processar os arquivos. Por isso é de extrema importancia as elas estejam funcionando corretamente. Essa validação fica monitorando as filas e se caso as filas não estejam com a vazão correta, uma alerta será disparado.",
        content: {
          queue: [
            {
              description: "bees:consolidation_spreadsheet_entries_queue",
              value: 92029,
            },
            {
              description: "bees:consolidation_entries_queue",
              value: 2892,
            },
            {
              description: "bees:spreadsheets_queue",
              value: 110,
            },
          ],
          action: [
            {
              description: "Ver detalhes das filas",
              linkTo: "https://google.com.br/",
            },
          ],
        },
      },
      {
        name: "Limite de erros excedidos",
        id: "bees_database_errors",
        status: "problem",
        description:
          "O Abelinhas possui forte dependência com o POSTGRESQL (Banco de Dados) e por isso foi implementado um sistema de retentativas para os métodos críticos. Essa validação, com base nos logs, monitoria se o número máximo de erros foi alcançado. Se esse alerta chegar, provavelmente uma ação manual precisará ser tomada.",
      },
      {
        name: "Pods do Abelinhas executando",
        id: "bees_pods_validation",
        status: "problem",
        description:
          "A validação verifica de tempos em tempos o status de cada POD presente no namespace do Abelinhas e alerta caso algum não esteja com o status de running.",
        content: {
          generic: [{ description: "Pod com problema: Nome da POD" }],
        },
      },
    ],
  },
};
