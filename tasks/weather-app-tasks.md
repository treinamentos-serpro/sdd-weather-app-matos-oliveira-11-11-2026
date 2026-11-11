# Weather App — Tarefas

## Ordem de Execução

O backlog executável é a tabela abaixo, na ordem das posições 01 a 85: pré-requisitos externos → tipos → funções puras → services → hook → componentes → integração → testes → hardening. Os IDs T-NN e os 255 critérios de aceite permanecem estáveis; número de ID não indica prioridade ou ordem numérica de execução.

Cada dependência da tabela aponta para uma posição anterior. A coluna Etapa agrupa a sequência principal de implementação; tarefas independentes podem ocorrer em paralelo sem antecipar seus pré-requisitos. As verificações focadas de cada tarefa de código continuam obrigatórias: agrupar as tarefas de escrita de testes após integração não autoriza código sem validação local.

| Posição | ID | Prioridade | Tamanho | Etapa | Dependências |
|---|---|---|---|---|---|
| 01 | T-01 | P0 | M | Pré-requisitos externos | nenhuma |
| 02 | T-49 | P0 | G | Pré-requisitos externos | T-01 |
| 03 | T-50 | P0 | M | Pré-requisitos externos | T-01 |
| 04 | T-02 | P0 | M | Pré-requisitos externos | nenhuma |
| 05 | T-51 | P0 | G | Pré-requisitos externos | T-01, T-02 |
| 06 | T-03 | P0 | M | Tipos | T-49 |
| 07 | T-05 | P0 | P | Funções puras | T-03 |
| 08 | T-53 | P0 | M | Funções puras | T-03, T-05 |
| 09 | T-07 | P0 | M | Funções puras | T-49, T-03 |
| 10 | T-55 | P0 | P | Funções puras | T-03, T-07 |
| 11 | T-57 | P0 | P | Funções puras | T-03, T-49 |
| 12 | T-09 | P0 | M | Services | T-49, T-03 |
| 13 | T-59 | P0 | G | Services | T-03, T-07, T-55, T-57, T-49 |
| 14 | T-11 | P0 | M | Services | T-49, T-03, T-09, T-59 |
| 15 | T-13 | P1 | M | Services | T-03 |
| 16 | T-15 | P1 | M | Services | T-03 |
| 17 | T-17 | P0 | P | Services | T-03 |
| 18 | T-19 | P0 | M | Hook | T-09, T-17 |
| 19 | T-21 | P0 | M | Hook | T-11, T-19 |
| 20 | T-23 | P1 | P | Hook | T-05, T-53, T-13, T-21 |
| 21 | T-61 | P1 | M | Hook | T-13, T-21, T-23 |
| 22 | T-62 | P1 | P | Hook | T-13, T-61 |
| 23 | T-25 | P1 | M | Hook | T-15, T-61 |
| 24 | T-27 | P0 | M | Componentes | T-03 |
| 25 | T-65 | P0 | P | Componentes | T-27 |
| 26 | T-66 | P0 | P | Componentes | T-27 |
| 27 | T-67 | P0 | P | Componentes | T-27 |
| 28 | T-29 | P0 | M | Componentes | T-03, T-27 |
| 29 | T-31 | P0 | M | Componentes | T-05, T-53, T-07, T-55, T-57, T-27 |
| 30 | T-32 | P1 | M | Componentes | T-05, T-53, T-07, T-57, T-27 |
| 31 | T-33 | P1 | M | Componentes | T-07, T-32 |
| 32 | T-35 | P1 | P | Componentes | T-03, T-27 |
| 33 | T-70 | P1 | P | Componentes | T-03, T-27 |
| 34 | T-71 | P1 | P | Componentes | T-03, T-27 |
| 35 | T-37 | P0 | G | Integração | T-25, T-62, T-29, T-31, T-32, T-33, T-35, T-70, T-71 |
| 36 | T-81 | P1 | P | Integração | T-02, T-37 |
| 37 | T-82 | P0 | P | Integração | T-01, T-51, T-37 |
| 38 | T-04 | P0 | P | Testes — fixtures | T-03 |
| 39 | T-52 | P0 | M | Testes — fixtures | T-03, T-04, T-49 |
| 40 | T-06 | P0 | P | Testes — funções puras | T-04, T-05 |
| 41 | T-54 | P0 | P | Testes — funções puras | T-04, T-53 |
| 42 | T-08 | P0 | M | Testes — funções puras | T-04, T-07 |
| 43 | T-56 | P0 | P | Testes — funções puras | T-04, T-55 |
| 44 | T-58 | P0 | P | Testes — funções puras | T-04, T-57 |
| 45 | T-10 | P0 | M | Testes — services | T-04, T-09 |
| 46 | T-60 | P0 | G | Testes — services | T-52, T-08, T-56, T-58, T-59 |
| 47 | T-12 | P0 | M | Testes — services | T-52, T-60, T-11 |
| 48 | T-14 | P1 | M | Testes — services | T-04, T-13 |
| 49 | T-16 | P1 | M | Testes — services | T-04, T-15 |
| 50 | T-18 | P0 | P | Testes — services | T-04, T-17 |
| 51 | T-20 | P0 | M | Testes — hook | T-04, T-10, T-18, T-19 |
| 52 | T-22 | P0 | M | Testes — hook | T-04, T-12, T-20, T-21 |
| 53 | T-63 | P1 | P | Testes — hook | T-06, T-54, T-22, T-23 |
| 54 | T-24 | P1 | M | Testes — hook | T-14, T-22, T-61 |
| 55 | T-64 | P1 | P | Testes — hook | T-14, T-22, T-62 |
| 56 | T-26 | P1 | M | Testes — hook | T-16, T-24, T-63, T-64, T-25 |
| 57 | T-28 | P0 | P | Testes — componentes | T-04, T-65, T-66, T-67 |
| 58 | T-30 | P0 | M | Testes — componentes | T-04, T-10, T-29 |
| 59 | T-34 | P0 | M | Testes — componentes | T-52, T-54, T-56, T-58, T-31 |
| 60 | T-68 | P1 | P | Testes — componentes | T-52, T-54, T-08, T-32 |
| 61 | T-69 | P1 | M | Testes — componentes | T-52, T-54, T-08, T-33 |
| 62 | T-36 | P1 | P | Testes — componentes | T-04, T-35 |
| 63 | T-72 | P1 | P | Testes — componentes | T-04, T-70 |
| 64 | T-73 | P1 | P | Testes — componentes | T-04, T-71 |
| 65 | T-85 | P0 | P | Testes — integração | T-82, T-04, T-52 |
| 66 | T-74 | P0 | M | Testes — configuração E2E | T-04, T-52, T-37 |
| 67 | T-38 | P0 | G | Testes — E2E | T-26, T-28, T-30, T-34, T-36, T-68, T-69, T-72, T-73, T-37, T-74 |
| 68 | T-39 | P0 | M | Testes — E2E | T-38 |
| 69 | T-40 | P1 | M | Testes — E2E | T-38 |
| 70 | T-75 | P1 | M | Testes — E2E | T-38 |
| 71 | T-76 | P0 | M | Testes — E2E | T-39, T-75 |
| 72 | T-77 | P1 | M | Testes — E2E | T-38 |
| 73 | T-78 | P0 | M | Testes — E2E | T-39, T-40, T-77 |
| 74 | T-41 | P1 | M | Testes — responsividade | T-39, T-40, T-75, T-76, T-77, T-78 |
| 75 | T-79 | P2 | G | Testes — navegadores reais | T-41 |
| 76 | T-42 | P0 | M | Testes — acessibilidade automatizada | T-41 |
| 77 | T-80 | P2 | G | Testes — acessibilidade manual | T-42, T-79 |
| 78 | T-43 | P2 | G | Testes — usabilidade | T-80 |
| 79 | T-44 | P1 | M | Hardening — candidata HTTPS | T-02, T-51, T-79, T-80, T-81, T-85 |
| 80 | T-45 | P0 | G | Hardening — integração externa real | T-01, T-49, T-50, T-51, T-44 |
| 81 | T-83 | P2 | M | Hardening — instrumento de desempenho | T-45 |
| 82 | T-46 | P2 | G | Hardening — medição real | T-45, T-83 |
| 83 | T-84 | P2 | M | Hardening — seleção do monitor | T-02 |
| 84 | T-47 | P2 | M | Hardening — ativação do monitor | T-44, T-84 |
| 85 | T-48 | P0 | P | Hardening — gate de liberação | T-43, T-45, T-46, T-47 |

### Como executar esta ordem

- **Preparação:** posições 01–05 verificam elegibilidade, contrato externo, consumo e privacidade, sem implementar a aplicação. Informações ausentes continuam bloqueando os gates correspondentes.
- **Implementação:** posições 06–37 seguem tipos → funções puras → services → hook → componentes → composição de App, base de publicação e aviso. Nenhuma delas depende da criação de testes de uma etapa posterior; validar cada fatia com os recursos existentes continua obrigatório.
- **Testes:** posições 38–78 preparam fixtures e percorrem unitários, integração, E2E, suporte e avaliações. A configuração E2E vem antes de seus cenários, e services/hook não dependem de renderização para seus testes isolados.
- **Hardening:** posições 79–85 publicam uma candidata, verificam CORS e contrato na origem real, medem desempenho e ativam operação antes de liberar. T-45, T-83 e T-46 mantêm tipo Test porque produzem evidência, mas pertencem a esta etapa por dependerem da origem publicada. Publicar candidata não equivale a aprovar produção.

Os blocos detalhados abaixo são um **catálogo de tarefas**, agrupado por assunto para consulta dos critérios e arquivos; não constituem uma segunda ordem de implementação. A tabela é a visão executável. O campo Dependências de cada bloco deve corresponder à linha da mesma tarefa nesta tabela; alterações futuras devem atualizar ambas na mesma revisão.

## Priorização e Tamanho Relativo

As colunas Prioridade e Tamanho da tabela são a classificação única das 85 tarefas. Não repetir esses campos nos blocos de catálogo; mudanças futuras de estimativa devem ser feitas nessa tabela. A classificação é recomendação de planejamento, não prazo contratado, alteração da spec ou resultado de execução.

| Prioridade | Significado |
|---|---|
| P0 | Caminho de busca/clima atual, seus habilitadores, proteção contra erro de dados/privacidade e gates que impedem aceitar uma entrega inválida. Priorizar a redução desses riscos quando seus pré-requisitos estiverem disponíveis. |
| P1 | Completar as capacidades aprovadas do MVP: previsão detalhada, unidade, localização, preferências e sua cobertura. Podem vir depois da primeira demonstração, mas não depois do lançamento completo. |
| P2 | Campanhas ampliadas de avaliação, evidências de operação e preparação final que exigem versão integrada ou disponibilidade externa. Execução planejada mais tarde, não opcionalidade. |

Prioridade não supera dependência: T-37 é P0, mas atualmente aguarda tarefas P1; T-48 é P0 por ser o gate de liberação e só ocorre ao final, após tarefas P2 obrigatórias. Todos os requisitos e gates aprovados continuam exigidos para produção, inclusive WCAG, matriz de navegadores, usabilidade, p95 e monitoramento. Nenhuma etiqueta P2 autoriza reduzir a cobertura ou retirar um requisito sem decisão explícita.

| Tamanho | Escala relativa e interpretação |
|---|---|
| P | Uma transformação, interação ou verificação local com pouca incerteza; uma unidade de esforço relativo. |
| M | Vários ramos de uma única responsabilidade ou coordenação limitada; aproximadamente duas a três unidades de esforço relativo. |
| G | Maior matriz de casos, dependência externa/humana ou decisão ainda não comprovada; mais de três unidades ou incerteza relevante, mesmo alterando poucos arquivos. |

G não aumenta o limite de dois arquivos nem permite misturar UI, dados e escrita de testes. T-59/T-60 merecem reestimativa após VAL-API; se continuarem grandes, dividir normalização atual, diária e horária preservando um teste por contrato. T-37/T-38 estão G principalmente pela concentração de integração e dependências. Tarefas externas G podem ter pouco código e longa espera: registrar espera separada do esforço, sem converter pontos em dias.

## Proposta de Fatias Verticais

**Recomendação alternativa, ainda não aplicada ao grafo:** antecipar a experiência visível entregando uma jornada de ponta a ponta por vez, com seus testes locais. A ordem por camadas do backlog continua vigente até a adoção desta proposta; os itens abaixo não autorizam executar T-37/T-38 antes de suas dependências atuais nem concluir tarefas apenas parcialmente feitas.

| Fatia sugerida | Valor visível e fronteiras atravessadas | Tarefas de origem a usar na fatia | Demonstração e aceite incremental |
|---|---|---|---|
| Preparação — remover impedimentos | Viabilidade externa e contratos mínimos; ainda não é jornada de usuário. | T-01, T-49, T-03; T-02, T-50 e T-51 em paralelo conforme seus pré-requisitos. | Registro de viabilidade preliminar; ausência de acesso ou informação continua bloqueio, sem apresentar mock como API validada. |
| F1 — buscar e escolher uma cidade | Input → geocoding → estado → lista/seleção manual. Primeira experiência útil em mobile e desktop, antes de clima, horas e localização. | T-09, T-17, T-19, T-27, T-65 a T-67, T-29; T-04, T-10, T-18, T-20, T-28 e T-30; integração mínima derivada de T-37. | Confirmar “São Paulo”, ver resultados, selecionar homônimo e observar loading, vazio e erro com recuperação. Exibir seleção não implica forecast ainda disponível. |
| F2 — selecionar e ver clima atual | Seleção → forecast → normalização → hook → cinco métricas e referência temporal. | T-05, T-53, T-07, T-55, T-57, T-59, T-11, T-21, T-31; T-52, T-06, T-54, T-08, T-56, T-58, T-60, T-12, T-22 e T-34; integração atual e E2E reduzido derivados de T-37/T-74/T-38. | Ver valores e cidade corretos, null distinto de zero, referência/consulta e erro sem misturar cidades. Transporte pode incluir dias/horas para respeitar o contrato; apenas apresentação é incremental. |
| F3 — planejar cinco dias e mudar escala | Dados normalizados → resumos diários/horários → conversão derivada na UI. | T-13, T-23, T-32, T-33, T-35; T-14, T-63, T-68, T-69, T-36 e cenários correspondentes de T-75; nova composição incremental. | Consultar hoje mais quatro dias, abrir períodos elegíveis e alternar C/F em todas as temperaturas sem novo request. Persistência de unidade mantém o pré-requisito de T-13; não ignorá-lo para antecipar o controle. |
| F4 — retomar e limpar preferências | Escolhas manuais → storage → reabertura → nova consulta; ação de limpeza e recuperação. | T-61, T-62, T-71; T-24, T-64, T-73 e cenários de T-77; complemento de T-37. | Reabrir na cidade/unidade válidas, recuperar corrupção parcial, limpar e reabrir sem restaurar. Antes de concluir esta fatia, incorporar a correção de RF-09 registrada na matriz: gravar a cidade na seleção tem de ter responsável e dependência explícitos. |
| F5 — localizar com consentimento | Ação/explicação → posição → forecast/estado → “Localização atual”, sempre com busca manual. | T-15, T-25, T-70; T-16, T-26, T-72 e cenários de T-40; T-82/T-85 conforme evidências de privacidade; composição final de T-37. | Autorizar ou recusar, observar timeout e continuar manualmente; nenhuma posição do dispositivo persiste. AC-49 verifica transparência/consentimento, sem substituir a validação do provedor já iniciada na preparação. |
| F6 — candidata verificável e liberação | Fluxos completos, avaliações e origem publicada com evidências reais. | Concluir T-37/T-38/T-74 e todas as variações remanescentes; T-39, T-41, T-42, T-43, T-76, T-78 a T-85, T-44 a T-48 respeitando a tabela de dependências. | Responsividade e acessibilidade não são postergadas como defeitos conhecidos: aqui se completa a matriz/campanha. Candidata HTTPS, CORS real, p95, termos, privacidade e monitoramento aprovados antes de T-48. |

### Ajustes necessários antes de adotar as fatias

1. Dividir a composição T-37 em tarefas pequenas por jornada: busca, clima atual, previsão/unidade, preferências e localização. A primeira composição dependeria somente dos pré-requisitos de F1, não de T-25/T-62 ou dos controles ainda não entregues. Manter T-37 como fechamento integrado ou atualizar os IDs de forma rastreável, nunca declará-la concluída por uma tela parcial.
2. Separar o setup de T-74 de seu vínculo com a composição final e reduzir o primeiro E2E derivado de T-38 às dependências de F1/F2. Acrescentar cenários de jornadas conforme cada fatia for entregue; preservar todas as variações e o gate final, sem remover testes para obter uma demonstração antecipada.
3. Atualizar em conjunto dependências da tabela e do catálogo e manter apenas uma ordem executável. Na adoção vertical, os testes passam a acompanhar a fatia, em vez de aguardar todas as camadas. Esta proposta descreve a mudança, mas não a executa nesta revisão de classificação.
4. Uma prévia com fixtures pode mostrar estados enquanto a API está bloqueada, desde que identificada como simulação de desenvolvimento, sem contrato de produção/mock permanente e sem aceite de integração real. Mostrar algo cedo não dispensa validação externa nem autoriza publicar uma versão incompleta como produto final.

**Primeiro alvo recomendado:** a busca funcional de F1. É menor que integrar toda a página, atravessa apresentação, estado e dados e permite feedback sobre desambiguação e estados em mobile. A seguir, F2 torna a seleção útil para a consulta meteorológica; F3 a F5 completam o MVP sem esconder seus testes ou pré-requisitos.

## Referências e Regras

- **Entrada:** [plano técnico](../plans/weather-app-plan.md). A [especificação](../specs/weather-app-spec.md) prevalece em caso de conflito; sua matriz liga stories, RFs, ACs e RNFs.
- **Status inicial:** todas as tarefas estão pendentes. Código existente é ponto de partida, não evidência de aceite. Este backlog não executa chamadas externas, testes, publicação ou mudanças na aplicação.
- **Tipos:** UI = apresentação/composição; Data = domínio, services e orquestração; Test = testes e avaliações; Infra = viabilidade, hospedagem e liberação.
- **Dependências:** usar a posição no backlog executável de Ordem de Execução, não a posição no catálogo detalhado ou o número do ID. Cada pré-requisito aparece antes de seu consumidor na tabela; tarefas independentes da mesma etapa podem ocorrer em paralelo sem ampliar o MVP.
- **Arquivos prováveis:** propostas de criação/edição, não uma lista obrigatória de arquivos novos. Reutilizar suítes e helpers existentes; os nomes novos só se justificam pela tarefa. Evidências documentais devem ficar nas seções correspondentes da spec/plano ou em README, sem multiplicar relatórios desnecessariamente.
- **Conclusão de código:** cada tarefa que alterar src ou tests exige verificação focada de sua fatia e execução de pnpm lint, pnpm build e pnpm test. Acrescentar pnpm test:e2e nos fluxos alterados quando houver cobertura. Testes dedicados abaixo ampliam cobertura; não autorizam entregar uma tarefa de implementação sem verificação local.
- **Verificação isolada:** services simulados, dados sintéticos e relógio controlado permitem testar cada fatia. Contratos evoluem de forma aditiva enquanto houver consumidores legados; a migração de cada consumidor pertence à tarefa desse módulo. Não executar migração aberta de consumidores em T-03 nem deixar build quebrado entre entregas.
- **Limite de escopo:** cada tarefa altera no máximo dois arquivos relevantes e mantém um único tipo de responsabilidade. Rodar verificações existentes não mistura implementação e escrita de testes: criar/ampliar testes é tarefa Test explícita. Avaliações não incluem correções abertas em src; defeitos geram novas tarefas T-NN limitadas ao módulo afetado e dependências para sua revalidação.
- **Bloqueios externos:** ausência de acesso, limites, participantes ou aprovação de terceiros deve ser registrada como bloqueio, nunca como aceite. Uso não comercial, 100 usuários estimados e orçamento zero não comprovam consumo ou cotas.
- **Gate VAL-API:** T-01 e T-49 iniciam o gate documental/funcional; T-50 registra consumo e T-45 conclui a verificação na origem publicada. Adapter pode usar contrato preliminar validado, mas integração e lançamento não são aceitos antes de T-45. Capacidade essencial incompatível bloqueia a fatia afetada até decisão explícita.
- **Aceite rastreável:** cada checklist usa IDs T-NN.C1, C2 e C3. O campo Rastreabilidade da tarefa se aplica a todos eles; referências AC/RNF específicas destacam o vínculo quando necessário. Antes de concluir, registrar revisão, procedimento/comando ou inspeção executada, resultado observado e localização da evidência de cada item. Não marcar item como aprovado apenas porque foi escrito, automatizado ou delegado a uma tarefa posterior.
- **Interpretação das checklists:** critérios de implementação são verificáveis por inspeção e execução focada, sem exigir edição de suítes nessa tarefa. Tarefas Test devem demonstrar assertions dos resultados descritos, e não somente adicionar entradas a uma lista de cenários. Valores de referência são sintéticos; nomes/rótulos não fixados pela spec são verificados por significado e semântica acessível, sem criar novas exigências de texto literal.

## Catálogo — Viabilidade e Contratos

### T-01 — Verificar termos e cotas do Open-Meteo

- **Tipo:** Infra
- **Descrição:** executar somente a parte documental de VAL-API.
- **Rastreabilidade:** RF-01 a RF-04, RF-07; RNF-05, RNF-09, RNF-10; OQ-04 a OQ-06 e OQ-08.
- **Dependências:** nenhuma.
- **Arquivos prováveis:** plans/weather-app-plan.md.
- **Critérios de aceite:**
	1. **T-01.C1:** há registro de URLs oficiais, data de consulta e condições de uso não comercial, acesso sem chave, atribuição e limites vigentes (OQ-08).
	2. **T-01.C2:** o registro distingue condições comprovadas de informações indisponíveis e indica se o uso pretendido pode permanecer em R$ 0, sem presumir SLA.
	3. **T-01.C3:** nenhum endpoint foi consultado nesta tarefa; documento inacessível ou condição obrigatória não confirmada deixa o aceite bloqueado, não aprovado.

### T-49 — Verificar payloads reais e referência temporal

- **Tipo:** Infra
- **Descrição:** executar a parte funcional leve de VAL-API, sem implementar adapter.
- **Rastreabilidade:** RF-01 a RF-04, RF-07; OQ-05, OQ-06.
- **Dependências:** T-01.
- **Arquivos prováveis:** plans/weather-app-plan.md.
- **Critérios de aceite:**
	1. **T-49.C1:** registro de até quatro consultas sequenciais identifica parâmetros, data, status, duração e tamanho; cada consulta respeita 10 segundos e o conjunto 40 segundos de espera, sem retry.
	2. **T-49.C2:** a matriz demonstra os cinco campos atuais, campos diários/horários, unidades, cinco datas em Brasília e significado da referência para duas localidades em fusos distintos (OQ-05, OQ-06).
	3. **T-49.C3:** exemplos sintéticos estão separados das respostas reais sanitizadas; ausência de capacidade essencial ou acesso bloqueia o aceite. CORS da origem publicada permanece explicitamente não validado até T-45.

### T-50 — Estimar consumo e confrontar as cotas

- **Tipo:** Infra
- **Descrição:** fechar somente a estimativa operacional necessária para o orçamento zero.
- **Rastreabilidade:** RNF-04, RNF-08; OQ-08; 100 usuários estimados.
- **Dependências:** T-01.
- **Arquivos prováveis:** plans/weather-app-plan.md.
- **Critérios de aceite:**
	1. **T-50.C1:** o responsável confirma valores de sessões por usuário/dia, buscas e previsões por sessão, restaurações e pico estimado, com data e fonte da estimativa.
	2. **T-50.C2:** uma memória de cálculo separa consumo de geocoding e forecast, inclui restaurações, tentativas e chamadas de teste e compara cada janela aplicável às cotas de T-01 (OQ-08).
	3. **T-50.C3:** nenhuma frequência ou concorrência é deduzida apenas dos 100 usuários; valor desconhecido ou excesso de cota mantém viabilidade de consumo pendente ou bloqueada.

### T-02 — Verificar elegibilidade da hospedagem gratuita

- **Tipo:** Infra
- **Descrição:** escolher o host candidato segundo acesso, orçamento e HTTPS.
- **Rastreabilidade:** RNF-08, RNF-10; restrição de orçamento; OQ-04, OQ-08.
- **Dependências:** nenhuma.
- **Arquivos prováveis:** plans/weather-app-plan.md.
- **Critérios de aceite:**
	1. **T-02.C1:** há host candidato nomeado, evidência de elegibilidade do repositório, modalidade gratuita, HTTPS e cotas com fontes datadas.
	2. **T-02.C2:** o caminho-base de publicação é registrado e a configuração proposta não exige recurso pago ou cobrança automática (RNF-08, orçamento zero).
	3. **T-02.C3:** deploy não foi configurado por esta tarefa e a análise dos logs está atribuída a T-51, sem alegação de privacidade já comprovada.

### T-51 — Verificar privacidade da hospedagem e do provedor

- **Tipo:** Infra
- **Descrição:** documentar práticas externas, sem publicar ou escrever UI de aviso.
- **Rastreabilidade:** RNF-09, RNF-10; OQ-04.
- **Dependências:** T-01, T-02.
- **Arquivos prováveis:** plans/weather-app-plan.md.
- **Critérios de aceite:**
	1. **T-51.C1:** o registro enumera dados enviados ao Open-Meteo e práticas documentadas de retenção/acesso de logs da hospedagem, com URLs e datas (OQ-04).
	2. **T-51.C2:** existe conteúdo factual para T-82, distinguindo dados locais, envio necessário ao provedor e registros de terceiros; nenhuma frase promete ausência de logs externos sem evidência.
	3. **T-51.C3:** informação obrigatória não confirmada é identificada como bloqueio de publicação; nenhuma UI, implantação ou configuração de serviço é alterada.

### T-03 — Evoluir os contratos de domínio e fronteiras

- **Tipo:** Data
- **Descrição:** adaptar os tipos existentes ao modelo aprovado, sem implementar transporte nesta tarefa.
- **Rastreabilidade:** RF-01 a RF-11; RD-01 a RD-10.
- **Dependências:** T-49.
- **Arquivos prováveis:** src/types/weather.ts.
- **Critérios de aceite:**
	1. **T-03.C1:** o arquivo declara os contratos do Data Model do plano, incluindo Unit, origem manual/device, métricas anuláveis, sensação, dias/horas, cobertura, preferências e categorias de erro.
	2. **T-03.C2:** as declarações identificam Celsius canônico, milissegundos UTC e ausência via null; não há coerção que trate ausência como zero ou disfarce incompatibilidade (RD-01 a RD-10).
	3. **T-03.C3:** a evolução é aditiva, os exports ainda consumidos continuam compilando e o diff não modifica implementação de service/hook/UI; a verificação TypeScript/build termina com sucesso.

### T-04 — Preparar fixtures de geocoding e fronteiras comuns

- **Tipo:** Test
- **Descrição:** preparar somente candidatos e isolamento comum de mocks.
- **Rastreabilidade:** RF-01, RF-02; AC-01 a AC-04, AC-34, AC-43; RNF-09.
- **Dependências:** T-03.
- **Arquivos prováveis:** tests/unit/weatherService.test.ts, tests/setup.ts.
- **Critérios de aceite:**
	1. **T-04.C1:** fixtures nomeadas contêm dois homônimos distinguíveis, posição válida, posição fora dos limites, lista vazia e resultado sem identificação suficiente, separando payload de CityCandidate.
	2. **T-04.C2:** executar dois casos em sequência não compartilha alterações de mock, relógio ou storage; chamadas externas não simuladas falham sem acessar a API.
	3. **T-04.C3:** os dados são sintéticos ou autorizados e sanitizados, não contêm posição pessoal e não incluem forecast; a rastreabilidade específica é RF-01/RF-02 e AC-01 a AC-04, AC-34 e AC-43.

### T-52 — Preparar fixtures meteorológicas completas e parciais

- **Tipo:** Test
- **Descrição:** preparar somente dados de forecast para testes determinísticos.
- **Rastreabilidade:** RF-03, RF-04, RF-07, RF-11; AC-05 a AC-13, AC-35, AC-47, AC-48.
- **Dependências:** T-03, T-04, T-49.
- **Arquivos prováveis:** tests/unit/weatherService.test.ts e helper de fixtures compartilhado somente se necessário.
- **Critérios de aceite:**
	1. **T-52.C1:** fixture completa contém cinco datas consecutivas, campos atuais/diários/horários aprovados e cobertura horária da janela; sua versão de domínio tem valores esperados explícitos.
	2. **T-52.C2:** variantes nomeadas contêm zero válido, null, percentual 101, vento negativo, mínima maior que máxima, data inválida e cobertura ausente, além de timestamps de meia-noite de Brasília (AC-06, AC-12, AC-13, AC-35).
	3. **T-52.C3:** payload e domínio não são confundidos; JSON abreviado não é sucesso completo. A construção não chama rede nem inclui dados pessoais e consumidores reutilizam a mesma origem de fixtures.

## Catálogo — Funções Puras e Referência Temporal

### T-05 — Implementar conversão pura de temperatura

- **Tipo:** Data
- **Descrição:** converter valores canônicos sem formatar rótulos.
- **Rastreabilidade:** RF-05; RD-08; AC-15, AC-36.
- **Dependências:** T-03.
- **Arquivos prováveis:** src/lib/temperature.ts.
- **Critérios de aceite:**
	1. **T-05.C1:** entradas 0, 10, -10 e 12,5 °C resultam respectivamente em 32, 50, 14 e 54,5 °F; null permanece null e zero não é considerado ausência (AC-15, AC-36).
	2. **T-05.C2:** alternâncias usam o Celsius original e retornam aos valores originais sem acumular arredondamento; o helper não modifica sua entrada.
	3. **T-05.C3:** o módulo não importa React nem acessa rede, storage, DOM ou relógio; retorna número/null, sem gerar rótulos formatados.

### T-53 — Implementar formatação numérica pt-BR

- **Tipo:** Data
- **Descrição:** formatar métricas sem implementar conversão ou componentes.
- **Rastreabilidade:** RF-11; AC-06, AC-07, AC-36, AC-47.
- **Dependências:** T-03, T-05.
- **Arquivos prováveis:** src/lib/format.ts.
- **Critérios de aceite:**
	1. **T-53.C1:** 1,25 e -1,25 °C aparecem como “1,3 °C” e “-1,3 °C”; 2,25 km/h como “2,3 km/h” e 40,5% como “41%” (AC-47).
	2. **T-53.C2:** -0,01 °C aparece como “0,0 °C”; null como “Indisponível”; zero válido mantém número e unidade, sem falsy fallback (AC-06).
	3. **T-53.C3:** dados já convertidos não são convertidos novamente ou alterados; iguais entradas/unidade produzem iguais rótulos sem I/O ou dependência de estado React.

### T-54 — Testar formatação e arredondamento numérico

- **Tipo:** Test
- **Descrição:** verificar somente rótulos e limites de arredondamento.
- **Rastreabilidade:** RF-11; AC-06, AC-07, AC-36, AC-47.
- **Dependências:** T-04, T-53.
- **Arquivos prováveis:** tests/unit/format.test.ts.
- **Critérios de aceite:**
	1. **T-54.C1:** assertions comparam os rótulos de T-53.C1/C2 literalmente, incluindo casas decimais, sinal, vírgula e unidades de AC-47.
	2. **T-54.C2:** casos parametrizados distinguem null, zero válido, zero negativo e empates positivos/negativos; cada caso falha se o rótulo esperado mudar.
	3. **T-54.C3:** a suíte focada passa sem rede, React ou alteração do relógio; não testa novamente a fórmula matemática de T-06.

### T-06 — Testar conversão de temperatura

- **Tipo:** Test
- **Descrição:** ampliar os testes parametrizados dos helpers numéricos.
- **Rastreabilidade:** RF-05; RD-08; AC-15, AC-36.
- **Dependências:** T-04, T-05.
- **Arquivos prováveis:** tests/unit/temperature.test.ts.
- **Critérios de aceite:**
	1. **T-06.C1:** testes unitários parametrizados em Vitest confirmam 0/32, 10/50, -10/14 e 12,5/54,5 em Celsius/Fahrenheit, além de null separadamente (AC-15, AC-36).
	2. **T-06.C2:** a entrada canônica permanece inalterada após mudanças repetidas de unidade; reconstruir a apresentação a partir dela devolve os mesmos resultados, sem converter texto arredondado.
	3. **T-06.C3:** a suíte focada passa sem I/O e não importa componentes ou Intl para verificar rótulos; essa responsabilidade fica em T-54.

### T-07 — Implementar calendário e recorte de Brasília

- **Tipo:** Data
- **Descrição:** calcular cinco datas e os períodos elegíveis com entradas temporais explícitas.
- **Rastreabilidade:** RF-04, RF-07, RF-11; AC-08, AC-11, AC-12, AC-20, AC-47.
- **Dependências:** T-49, T-03.
- **Arquivos prováveis:** src/lib/format.ts, src/lib/weatherTime.ts se necessário.
- **Critérios de aceite:**
	1. **T-07.C1:** para 11/11/2026 às 10h30 em Brasília, gerar exatamente as datas 11 a 15/11/2026 e incluir hoje a partir de 11h; às 11h00 incluir também 11h (AC-08, AC-11).
	2. **T-07.C2:** datas/horas são dd/MM/yyyy e HH:mm no fuso contratado, independentemente do fuso do dispositivo; não alterar instantes UTC e manter outros dias mesmo sem horas restantes em hoje (AC-12, AC-47).
	3. **T-07.C3:** instante e série são parâmetros, entradas não são mutadas e não há Date.now implícito; classificação de idade não faz parte deste helper.

### T-55 — Implementar classificação pura de atualidade

- **Tipo:** Data
- **Descrição:** classificar idade da referência sem gerar calendário ou UI.
- **Rastreabilidade:** RF-07; RD-10; AC-21, AC-48; RNF-05.
- **Dependências:** T-03, T-07.
- **Arquivos prováveis:** src/lib/weatherTime.ts ou helper temporal existente adequado, não ambos.
- **Critérios de aceite:**
	1. **T-55.C1:** diferença de 3.600.000 ms retorna recent e de 3.601.000 ms retorna older-than-60-minutes (AC-48).
	2. **T-55.C2:** referência null ou posterior à consulta retorna unverifiable; receivedAt não substitui referência ausente e a classificação não examina datas futuras de previsão.
	3. **T-55.C3:** referência e consulta são entradas explícitas e imutáveis; não há acesso ao relógio global, geração de calendário ou mensagem de UI.

### T-56 — Testar os limiares da referência meteorológica

- **Tipo:** Test
- **Descrição:** verificar a função de atualidade em seus limites.
- **Rastreabilidade:** RF-07; AC-21, AC-48; RNF-05.
- **Dependências:** T-04, T-55.
- **Arquivos prováveis:** tests/unit/weatherTime.test.ts ou suíte temporal existente adequada, não ambas.
- **Critérios de aceite:**
	1. **T-56.C1:** cada entrada de T-55.C1/C2 tem assertion do Freshness exato, com relógio global diferente para demonstrar independência (AC-48).
	2. **T-56.C2:** duas consultas com mesma referência preservam a referência original e podem mudar só a idade derivada; o caso sem referência nunca vira recent por usar o horário da consulta.
	3. **T-56.C3:** a suíte focada passa sem componentes, timers de espera real ou Fetch, cobrindo cada variação como teste independente.

### T-08 — Testar calendário e recorte horário

- **Tipo:** Test
- **Descrição:** verificar as fronteiras temporais em funções puras.
- **Rastreabilidade:** RF-04, RF-07, RF-11; AC-08, AC-11, AC-12, AC-20, AC-47.
- **Dependências:** T-04, T-07.
- **Arquivos prováveis:** tests/unit/format.test.ts e tests/unit/weatherTime.test.ts se necessário.
- **Critérios de aceite:**
	1. **T-08.C1:** cenários de 10h30 e 11h00 têm primeiro período 11h00; fim de hoje sem períodos elegíveis não remove as quatro datas seguintes (AC-11).
	2. **T-08.C2:** instantes 01/01/2027 02h59 UTC e 03h00 UTC produzem janelas 31/12/2026–04/01/2027 e 01–05/01/2027, respectivamente (AC-12); o fuso do dispositivo não muda o resultado.
	3. **T-08.C3:** assertions de rótulos conferem “11/11/2026” e “09:05” para o instante de AC-47; a suíte passa sem rede ou esperas reais e não duplica T-56.

## Catálogo — Services e Dados Externos

### T-57 — Atualizar códigos e rótulos meteorológicos

- **Tipo:** Data
- **Descrição:** manter o mapeamento puro de condições conhecidas em um só módulo.
- **Rastreabilidade:** RF-03, RF-04, RF-11; RD-03; AC-05, AC-09, AC-10, AC-35.
- **Dependências:** T-03, T-49.
- **Arquivos prováveis:** src/lib/weatherCodes.ts.
- **Critérios de aceite:**
	1. **T-57.C1:** existe tabela explícita dos códigos aceitos conforme o contrato validado em T-49; cada um tem descrição pt-BR e identificação utilizável como alternativa textual.
	2. **T-57.C2:** código fora da tabela resulta em ausência de condição conhecida, sem fallback para “céu limpo” ou outro código válido (RD-03, AC-35).
	3. **T-57.C3:** o módulo é puro, não chama Fetch e não altera UI; valores numéricos de temperatura/vento não influenciam o mapeamento de condição.

### T-58 — Testar códigos conhecidos e desconhecidos

- **Tipo:** Test
- **Descrição:** verificar o mapeamento meteorológico isoladamente.
- **Rastreabilidade:** RF-03, RF-04, RF-11; AC-05, AC-35.
- **Dependências:** T-04, T-57.
- **Arquivos prováveis:** tests/unit/weatherCodes.test.ts.
- **Critérios de aceite:**
	1. **T-58.C1:** todos os códigos da tabela de T-57 têm assertions da descrição esperada e de alternativa textual não vazia.
	2. **T-58.C2:** pelo menos um código fora da tabela confirma ausência de condição conhecida, sem reutilizar a descrição de código válido (AC-35).
	3. **T-58.C3:** a suíte focada passa sem Fetch, DOM ou renderização de ícones; não altera contratos de transporte.

### T-09 — Implementar busca e normalização do geocoding

- **Tipo:** Data
- **Descrição:** consultar cidades e produzir candidatos de domínio selecionáveis ou bloqueados.
- **Rastreabilidade:** RF-01, RF-02; AC-01 a AC-04, AC-32, AC-34, AC-42, AC-43.
- **Dependências:** T-49, T-03.
- **Arquivos prováveis:** src/services/weatherService.ts, src/lib/weatherValidation.ts se necessário.
- **Critérios de aceite:**
	1. **T-09.C1:** busca explícita válida gera GET com name normalizado, count=10, language=pt, format=json e signal fornecido; entrada fora de 1–100 caracteres não chama Fetch (AC-42).
	2. **T-09.C2:** mapear country/admin1 para country/region e posições conforme RD-01; homônimos recebem identificadores complementares e itens ainda indistinguíveis/inválidos ficam não selecionáveis (AC-03, AC-34, AC-43).
	3. **T-09.C3:** lista vazia ou ausência válida de results retorna []; tipo de results ou corpo inválido falha com invalid-data. Preservar itens válidos e nunca iniciar forecast ou seleção por conta própria.

### T-10 — Testar o service de geocoding com Fetch controlado

- **Tipo:** Test
- **Descrição:** verificar transporte e fronteira externa da busca.
- **Rastreabilidade:** RF-01, RF-02, RF-06; AC-01 a AC-04, AC-17, AC-18, AC-32 a AC-34, AC-42, AC-43.
- **Dependências:** T-04, T-09.
- **Arquivos prováveis:** tests/unit/weatherService.test.ts.
- **Critérios de aceite:**
	1. **T-10.C1:** assertions de URLSearchParams e signal confirmam T-09.C1 para nomes acentuados/com apóstrofo e 0/1/100/101 caracteres, sem depender da ordem da query.
	2. **T-10.C2:** fixtures retornam candidatos com seletividade esperada, [] para ausência válida de resultados e invalid-data para corpo inválido; falha Fetch, 429 e 5xx têm categorias network, rate-limit e provider.
	3. **T-10.C3:** suíte Vitest substitui globalThis.fetch por mock controlado; JSON ilegível falha sem payload bruto e nenhuma previsão é chamada. Requisição externa não simulada falha sem acessar API real; restaurar mocks entre casos e obter sucesso na suíte focada.

### T-59 — Normalizar um payload meteorológico em domínio

- **Tipo:** Data
- **Descrição:** separar o mapeamento puro do forecast de seu transporte HTTP.
- **Rastreabilidade:** RF-03, RF-04, RF-07, RF-11; RD-01 a RD-04, RD-07; AC-05 a AC-13, AC-35.
- **Dependências:** T-03, T-07, T-55, T-57, T-49.
- **Arquivos prováveis:** src/services/weatherService.ts, para normalizador específico do provedor; src/lib/weatherValidation.ts somente se houver regra de domínio reutilizável a extrair.
- **Critérios de aceite:**
	1. **T-59.C1:** payload completo validado gera cinco datas ordenadas, campos e horas associados aos respectivos timestamps, Celsius/km/h/% e identidade igual à seleção recebida, não à posição da grade (AC-05 a AC-12).
	2. **T-59.C2:** null, métrica fora da faixa, condição desconhecida ou período inválido afetam só as partes correspondentes; mínima maior que máxima invalida ambas. Zero válido permanece zero e ausência de data não é substituída por um sexto dia (AC-06, AC-13, AC-35).
	3. **T-59.C3:** nenhuma métrica útil associável resulta em invalid-data; referência ausente permanece null. Instante/localidade são parâmetros e a transformação não chama Fetch, relógio ou storage.

### T-60 — Testar o normalizador meteorológico

- **Tipo:** Test
- **Descrição:** testar a transformação de payload para domínio, sem simular HTTP.
- **Rastreabilidade:** RF-03, RF-04, RF-07, RF-11; AC-05 a AC-13, AC-20, AC-21, AC-35, AC-48.
- **Dependências:** T-52, T-08, T-56, T-58, T-59.
- **Arquivos prováveis:** tests/unit/weatherService.test.ts, reutilizando fixtures existentes.
- **Critérios de aceite:**
	1. **T-60.C1:** fixture completa tem comparação de domínio esperado; variantes confirmam cinco slots, correta associação temporal e identidade preservada, mesmo com coordenadas de grade diferentes.
	2. **T-60.C2:** assertions independentes comprovam null versus zero, faixas, mínima/máxima inválidas, código desconhecido, unidade inesperada, arrays incompletos e timestamp inválido/duplicado sem deslocar valores; ausência total gera invalid-data.
	3. **T-60.C3:** referência e receivedAt têm valores distintos conferidos; a suíte focada passa sem Fetch nem leitura de relógio global (AC-20, AC-21, AC-35).

### T-11 — Implementar transporte do forecast

- **Tipo:** Data
- **Descrição:** obter o payload e delegar ao normalizador já concluído.
- **Rastreabilidade:** RF-03, RF-04, RF-07, RF-11; RD-01 a RD-04, RD-07, RD-09; AC-05 a AC-13, AC-20, AC-21, AC-35.
- **Dependências:** T-49, T-03, T-09, T-59.
- **Arquivos prováveis:** src/services/weatherService.ts.
- **Critérios de aceite:**
	1. **T-11.C1:** seleção válida gera exatamente um GET contendo current/daily/hourly do contrato, forecast_days=5, timezone=America/Sao_Paulo, Celsius, kmh, unixtime, cache: 'no-store' e signal recebido.
	2. **T-11.C2:** a leitura concluída é encaminhada ao normalizador de T-59 com a seleção original e instante de recebimento; status não exitoso e JSON ilegível produzem as categorias de Error Handling, sem payload no erro público.
	3. **T-11.C3:** cancelamento impede publicação de resultado pelo fluxo consumidor; service não implementa timer, retry ou duplicação de regras de normalização. Não enviar credenciais de sessão.

### T-12 — Testar transporte e falhas do forecast

- **Tipo:** Test
- **Descrição:** verificar a fronteira Fetch e a entrega do domínio normalizado.
- **Rastreabilidade:** RF-03, RF-04, RF-06, RF-07, RF-11; AC-05 a AC-13, AC-18, AC-20, AC-21, AC-35, AC-48.
- **Dependências:** T-52, T-60, T-11.
- **Arquivos prováveis:** tests/unit/weatherService.test.ts.
- **Critérios de aceite:**
	1. **T-12.C1:** suíte Vitest com mock de globalThis.fetch confirma uma chamada, parâmetros de T-11.C1, cache e identidade de signal. O mock controla status e leitura do corpo, incluindo rejeição; a ordem textual da query não afeta o teste.
	2. **T-12.C2:** fixtures completas/parciais geram success/partial de domínio esperado; erro Fetch, 429, 5xx e JSON ilegível geram network, rate-limit, provider e invalid-data, respectivamente.
	3. **T-12.C3:** assertions conferem referência preservada e receivedAt separado e falha ao cancelar leitura; a suíte passa sem rede real e sem repetir a matriz inteira de T-60.

### T-13 — Implementar a fronteira de preferências locais

- **Tipo:** Data
- **Descrição:** ler, gravar e limpar unidade e última cidade manual independentemente.
- **Rastreabilidade:** RF-09, RF-10; AC-25 a AC-29, AC-39, AC-46; RNF-10.
- **Dependências:** T-03.
- **Arquivos prováveis:** src/services/preferencesService.ts.
- **Critérios de aceite:**
	1. **T-13.C1:** gravação contém somente unidade e última cidade manual com id/nome/país/região disponível/coordenadas, em chaves próprias; nenhuma previsão, histórico ou posição do dispositivo é persistida (AC-39).
	2. **T-13.C2:** read recupera cidade e unidade independentemente; unidade inválida cai em Celsius e cidade inválida em null. Exceções de storage não escapam como falha não tratada.
	3. **T-13.C3:** clear tenta ambas as remoções, preserva chaves de terceiros e só retorna sucesso sem nenhuma preferência remanescente; falha parcial retorna falha (AC-28, AC-29).

### T-14 — Testar persistência, corrupção e limpeza

- **Tipo:** Test
- **Descrição:** verificar a fronteira localStorage sem depender do navegador real.
- **Rastreabilidade:** RF-09, RF-10; AC-26 a AC-29, AC-39, AC-46.
- **Dependências:** T-04, T-13.
- **Arquivos prováveis:** tests/unit/preferencesService.test.ts se não houver suíte adequada.
- **Critérios de aceite:**
	1. **T-14.C1:** chaves ausentes retornam Celsius/null; cidade válida com unidade inválida e o inverso preservam somente a parte válida; JSON corrompido não lança exceção para o consumidor (AC-26, AC-46).
	2. **T-14.C2:** assertions de storage conferem a lista exata de T-13.C1, falha de leitura/gravação não tratada como sucesso e chave alheia inalterada.
	3. **T-14.C3:** limpeza total retorna sucesso com ambas ausentes; falha de uma remoção ainda tenta a outra e retorna falha. A suíte passa com storage novo por cenário.

### T-15 — Implementar o adaptador de posição cancelável

- **Tipo:** Data
- **Descrição:** encapsular Geolocation API sem possuir deadline ou disparo automático.
- **Rastreabilidade:** RF-08; AC-22 a AC-24, AC-27, AC-38, AC-44.
- **Dependências:** T-03.
- **Arquivos prováveis:** src/services/geolocationService.ts.
- **Critérios de aceite:**
	1. **T-15.C1:** importar/inicializar o adaptador não chama Geolocation API; requestPosition explícito solicita posição e retorna somente coordenadas finitas dentro dos limites de RD-01.
	2. **T-15.C2:** recusa, falha de posição e recurso inexistente são permission-denied, position-unavailable e unsupported; callback após signal cancelado não entrega coordenada utilizável ao consumidor.
	3. **T-15.C3:** o adaptador não chama Fetch/storage, não persiste dados e não possui timer ou retentativa próprios; o deadline permanece no hook.

### T-16 — Testar permissões e callbacks do adaptador

- **Tipo:** Test
- **Descrição:** verificar a tradução de resultados da API do dispositivo.
- **Rastreabilidade:** RF-08; AC-23, AC-24, AC-27, AC-38, AC-44.
- **Dependências:** T-04, T-15.
- **Arquivos prováveis:** tests/unit/geolocationService.test.ts se necessário.
- **Critérios de aceite:**
	1. **T-16.C1:** spies confirmam zero solicitação na montagem e uma na chamada explícita; posição válida é retornada e posição inválida é rejeitada sem coordenada utilizável.
	2. **T-16.C2:** erros simulados têm as três categorias de T-15.C2 e callback após cancelamento não resolve como sucesso.
	3. **T-16.C3:** contagem de Fetch e storage permanece zero em todos os casos e mocks são restaurados; a suíte focada passa sem timers reais.

### T-17 — Implementar diagnóstico técnico sanitizado

- **Tipo:** Data
- **Descrição:** disponibilizar o diagnóstico de falhas definido em Error Handling do plano.
- **Rastreabilidade:** RF-06; AC-33, AC-41; RNF-09, RNF-10.
- **Dependências:** T-03.
- **Arquivos prováveis:** src/services/diagnosticService.ts somente se justificar reúso; caso contrário, helper interno de service apropriado.
- **Critérios de aceite:**
	1. **T-17.C1:** a fronteira de diagnóstico só publica category, operation, httpStatus opcional, durationMs e at; nenhum erro bruto, URL, cidade, posição, identificador ou stack é serializado (AC-41).
	2. **T-17.C2:** uma falha terminal vigente gera um evento; falhas de várias chaves da mesma operação são agregadas sem valores. Chamadores não geram eventos para input inválido, vazio, sucesso, cancelamento ou geração obsoleta; integração será comprovada nos testes do hook.
	3. **T-17.C3:** exceção do console é absorvida e o diagnóstico nunca usa Fetch/storage nem altera estado de consulta.

### T-18 — Testar conteúdo e exclusões do diagnóstico

- **Tipo:** Test
- **Descrição:** verificar a política de logs com falhas sintéticas contendo dados sensíveis.
- **Rastreabilidade:** RF-06; AC-41; RNF-09, RNF-10.
- **Dependências:** T-04, T-17.
- **Arquivos prováveis:** tests/unit/weatherService.test.ts e suíte de diagnóstico somente se houver módulo próprio.
- **Critérios de aceite:**
	1. **T-18.C1:** inspeção do argumento ao console confirma somente os cinco campos permitidos; strings sentinelas de cidade/coordenada/id/stack/payload não aparecem no evento (AC-41).
	2. **T-18.C2:** evento agregado não expõe valores das preferências; spies de rede e storage registram zero operações e uma exceção do console não escapa ao consumidor.
	3. **T-18.C3:** suíte focada passa com mocks isolados; unicidade e supressão por geração são assertions explícitas nos testes do hook, sem alegar que o logger decide vigência sozinho.

## Catálogo — Orquestração e Estado

### T-19 — Implementar estado e operação de busca no hook

- **Tipo:** Data
- **Descrição:** evoluir useWeather com estado independente de busca e coordenação de suas gerações.
- **Rastreabilidade:** RF-01, RF-02, RF-06; AC-01 a AC-04, AC-16 a AC-19, AC-30, AC-31, AC-37, AC-42.
- **Dependências:** T-09, T-17.
- **Arquivos prováveis:** src/hooks/useWeather.ts, src/types/weather.ts.
- **Critérios de aceite:**
	1. **T-19.C1:** abertura sem busca usa idle; submit válido usa loading, lista não vazia success, [] empty e falha error; input rejeitado não chama service e busca não altera seleção meteorológica.
	2. **T-19.C2:** operação pendente continua loading em 9.999 ms e vira timeout em 10.000 ms; nova busca invalida conclusão anterior e só a geração vigente muda estado (AC-19, AC-30, AC-31).
	3. **T-19.C3:** não há retry automático; tentativa explícita cria nova geração e falha terminal vigente emite somente o diagnóstico permitido, não conclusão descartada.

### T-20 — Testar busca, estados e concorrência do hook

- **Tipo:** Test
- **Descrição:** validar transições com services simulados e relógio controlado.
- **Rastreabilidade:** RF-01, RF-02, RF-06; AC-02, AC-16 a AC-19, AC-30, AC-31, AC-37, AC-42; RNF-09.
- **Dependências:** T-04, T-10, T-18, T-19.
- **Arquivos prováveis:** tests/unit/useWeather.test.ts se necessário, reutilizando helpers existentes.
- **Critérios de aceite:**
	1. **T-20.C1:** assertions de status e lista confirmam idle/loading/success/empty/error e recuperação após nova tentativa; [] não inicia forecast e input inválido não chama service.
	2. **T-20.C2:** concluir A antes/depois de B e emitir erro tardio de A nunca altera lista/erro/loading de B; timeout tem assertions em 9.999/10.000 ms sem espera real.
	3. **T-20.C3:** desmontagem limpa recursos sem publicar estado tardio, zero retries automáticos ocorrem e somente falha terminal vigente produz um evento sanitizado; suíte focada passa.

### T-21 — Implementar seleção e consulta meteorológica vigente

- **Tipo:** Data
- **Descrição:** coordenar seleção, forecast, cobertura parcial e preservação de resultados na identidade correta.
- **Rastreabilidade:** RF-02 a RF-04, RF-06, RF-07; AC-03 a AC-13, AC-18 a AC-21, AC-30, AC-31, AC-35, AC-45.
- **Dependências:** T-11, T-19.
- **Arquivos prováveis:** src/hooks/useWeather.ts.
- **Critérios de aceite:**
	1. **T-21.C1:** candidato não selecionável não inicia forecast; candidato válido inicia loading e publica success ou partial conforme o conjunto normalizado, ou error sem dados úteis.
	2. **T-21.C2:** selecionar B oculta dados de A imediatamente; falha ao atualizar A só mantém previous de A com aviso e referência/receivedAt originais (AC-45).
	3. **T-21.C3:** forecast tem deadline de 10 segundos independente da busca; resposta/erro substituído não altera estado, retry é manual e falha não atualiza horários (AC-19 a AC-21, AC-30, AC-31).

### T-22 — Testar forecast, deadlines e identidade

- **Tipo:** Test
- **Descrição:** verificar o ciclo de forecast sem componentes ou rede reais.
- **Rastreabilidade:** RF-02 a RF-04, RF-06, RF-07; AC-13, AC-18 a AC-21, AC-30, AC-31, AC-35, AC-37, AC-45.
- **Dependências:** T-04, T-12, T-20, T-21.
- **Arquivos prováveis:** tests/unit/useWeather.test.ts.
- **Critérios de aceite:**
	1. **T-22.C1:** assertions confirmam success/partial/error e previous de mesma identidade; nova seleção nunca reutiliza forecast anterior como resultado da nova cidade.
	2. **T-22.C2:** timeout durante leitura, sucesso atrasado e erro atrasado não atualizam dados ou horários depois de invalidar a geração; teste compara referência e receivedAt antes/depois da falha.
	3. **T-22.C3:** setup/cleanup/setup em StrictMode não publica conclusão descartada; recursos de operação anterior são limpos e a suíte passa com relógio/promessas controlados.

### T-23 — Integrar unidade vigente e sua persistência

- **Tipo:** Data
- **Descrição:** conectar somente escolha de unidade ao estado e à preferência.
- **Rastreabilidade:** RF-05, RF-09; AC-14, AC-15, AC-36, AC-40.
- **Dependências:** T-05, T-53, T-13, T-21.
- **Arquivos prováveis:** src/hooks/useWeather.ts.
- **Critérios de aceite:**
	1. **T-23.C1:** sem unidade válida, unit é celsius; ação de alternância muda unit e solicita somente a gravação dessa preferência (AC-14, AC-15).
	2. **T-23.C2:** contagem de requests não aumenta, WeatherData permanece canônico e resposta iniciada em Celsius é apresentada em Fahrenheit se essa for a escolha vigente (AC-40).
	3. **T-23.C3:** falha de writeUnit mantém a unidade escolhida na sessão e um aviso não bloqueante, sem iniciar restauração ou limpeza por consequência.

### T-61 — Integrar inicialização e restauração de preferências

- **Tipo:** Data
- **Descrição:** adicionar somente o fluxo de abertura ao hook existente.
- **Rastreabilidade:** RF-09; AC-25, AC-26, AC-46.
- **Dependências:** T-13, T-21, T-23.
- **Arquivos prováveis:** src/hooks/useWeather.ts.
- **Critérios de aceite:**
	1. **T-61.C1:** cidade válida/Fahrenheit dispara consulta automática nessa unidade; cidade válida/unidade inválida consulta em Celsius; cidade inválida/Fahrenheit não consulta e preserva Fahrenheit (AC-25, AC-46).
	2. **T-61.C2:** abertura faz zero pedidos de localização; storage bloqueado ou consulta falha mantém busca manual e não inventa referência meteorológica.
	3. **T-61.C3:** efeito de inicialização repetido não reaplica preferência sobre escolha posterior nem publica resposta de setup descartado.

### T-62 — Integrar limpeza de preferências ao hook

- **Tipo:** Data
- **Descrição:** adicionar somente a intenção de remover preferências persistidas.
- **Rastreabilidade:** RF-10; AC-28, AC-29.
- **Dependências:** T-13, T-61.
- **Arquivos prováveis:** src/hooks/useWeather.ts.
- **Critérios de aceite:**
	1. **T-62.C1:** ação explícita chama clear; retorno verdadeiro comunica remoção e retorno falso comunica falha, sem falso sucesso (AC-28, AC-29).
	2. **T-62.C2:** a ação faz zero requests meteorológicos e nenhum callback já pendente recria preferências removidas; forecast da sessão não é apagado como efeito obrigatório.
	3. **T-62.C3:** falha mantém consulta manual utilizável e gera evento agregado sem valores de chaves; na reabertura sem nova escolha após sucesso, cidade não é restaurada e a unidade é Celsius.

### T-63 — Testar unidade em voo e ausência de request adicional

- **Tipo:** Test
- **Descrição:** verificar somente a mudança de escala coordenada pelo hook.
- **Rastreabilidade:** RF-05; AC-14, AC-15, AC-36, AC-40.
- **Dependências:** T-06, T-54, T-22, T-23.
- **Arquivos prováveis:** tests/unit/useWeather.test.ts.
- **Critérios de aceite:**
	1. **T-63.C1:** spies demonstram zero requests adicionais em alternância simples ou durante forecast pendente; comparar WeatherData antes/depois confirma ausência de mutação.
	2. **T-63.C2:** resposta iniciada em Celsius mantém a escolha posterior Fahrenheit e os valores derivados correspondem a AC-15/AC-36, sem alterar vento ou probabilidades.
	3. **T-63.C3:** writeUnit simulado com falha preserva escolha em memória e sinaliza aviso; suíte focada passa sem incluir restauração ou limpeza.

### T-64 — Testar limpeza e ausência de recriação por callbacks

- **Tipo:** Test
- **Descrição:** verificar a intenção de limpeza integrada ao estado.
- **Rastreabilidade:** RF-10; AC-28, AC-29; RNF-09.
- **Dependências:** T-14, T-22, T-62.
- **Arquivos prováveis:** tests/unit/useWeather.test.ts.
- **Critérios de aceite:**
	1. **T-64.C1:** clear bem-sucedido e clear com falha parcial têm mensagens distintas; só sucesso permite afirmar remoção completa e reabertura sem cidade/unidade salvas (AC-28, AC-29).
	2. **T-64.C2:** requests não aumentam ao limpar; concluir forecast antigo após a limpeza não grava novamente cidade ou unidade.
	3. **T-64.C3:** caso de falha produz diagnóstico sem valores de preferências e não bloqueia busca posterior; suíte focada passa com storage isolado.

### T-24 — Testar restauração das preferências no hook

- **Tipo:** Test
- **Descrição:** verificar somente inicialização e recuperação independente dos campos.
- **Rastreabilidade:** RF-05, RF-09; AC-14, AC-25, AC-26, AC-46.
- **Dependências:** T-14, T-22, T-61.
- **Arquivos prováveis:** tests/unit/useWeather.test.ts.
- **Critérios de aceite:**
	1. **T-24.C1:** assertions confirmam as três combinações de T-61.C1, com número esperado de chamadas e nenhuma posição obtida automaticamente.
	2. **T-24.C2:** JSON corrompido, storage bloqueado e falha do forecast não bloqueiam nova busca; nenhuma referência meteorológica é criada só por restaurar preferências.
	3. **T-24.C3:** em StrictMode, escolha posterior prevalece sobre inicialização descartada; suíte passa sem espera real. Conversão em voo e limpeza não são redefinidas aqui.

### T-25 — Integrar localização e prazo global ao hook

- **Tipo:** Data
- **Descrição:** coordenar posição explícita e forecast separado da cidade manual salva.
- **Rastreabilidade:** RF-08, RF-09; AC-22 a AC-24, AC-27, AC-38, AC-44, AC-49.
- **Dependências:** T-15, T-61.
- **Arquivos prováveis:** src/hooks/useWeather.ts.
- **Critérios de aceite:**
	1. **T-25.C1:** zero solicitações na abertura; ação explícita inicia prazo global de 10 segundos, inclusive espera de permissão. Recusa encerra antes do prazo e mantém alternativa manual.
	2. **T-25.C2:** posição válida vigente define origem device/“Localização atual” e inicia forecast com seu próprio prazo; não grava a posição nem substitui a última cidade manual persistida (AC-23, AC-27).
	3. **T-25.C3:** seleção manual, cancelamento ou fim do prazo descarta callback tardio sem iniciar forecast, alterar seleção ou emitir erro obsoleto (AC-44).

### T-26 — Testar localização, cancelamento e alternativa manual

- **Tipo:** Test
- **Descrição:** verificar o fluxo coordenado de posição e previsão.
- **Rastreabilidade:** RF-08, RF-09; AC-22 a AC-24, AC-27, AC-38, AC-44, AC-49.
- **Dependências:** T-16, T-24, T-63, T-64, T-25.
- **Arquivos prováveis:** tests/unit/useWeather.test.ts.
- **Critérios de aceite:**
	1. **T-26.C1:** cada estado de permissão e ausência de suporte tem assertion de status/mensagem/contagem de chamadas; a abertura pede zero posições e a recusa mantém busca manual (AC-22 a AC-24, AC-38).
	2. **T-26.C2:** em 10.000 ms sem posição há timeout; posição válida antes do limite inicia novo prazo de forecast, não reutiliza o tempo restante da localização.
	3. **T-26.C3:** seleção manual/desmontagem seguida de callback tardio não consulta ou altera estado; inspeção do storage confirma ausência da posição do dispositivo e preservação da cidade manual. Suíte focada passa.

## Catálogo — UI e Composição

### T-27 — Ajustar a base visual responsiva

- **Tipo:** UI
- **Descrição:** ajustar somente estilos globais e tokens do tema existente.
- **Rastreabilidade:** RF-06; AC-16 a AC-19, AC-33; RNF-01 a RNF-03, RNF-07.
- **Dependências:** T-03.
- **Arquivos prováveis:** src/styles/index.css.
- **Critérios de aceite:**
	1. **T-27.C1:** tokens do tema existente permanecem dark glassmorphism e há estilos de foco visível, quebra de texto e contenção de largura para o layout (RNF-01, RNF-03).
	2. **T-27.C2:** na página de referência, scrollWidth não excede clientWidth nas larguras 320, 768 e 1440 px; textos longos não cobrem controles e o foco pode ser visto.
	3. **T-27.C3:** o diff altera somente o CSS previsto, sem compor App ou mudar lógica; a inspeção não é apresentada como avaliação completa de WCAG ou todos os fluxos de T-41.

### T-65 — Evoluir LoadingState acessível

- **Tipo:** UI
- **Descrição:** apresentar somente o estado de espera por props.
- **Rastreabilidade:** RF-06; AC-16; RNF-03.
- **Dependências:** T-27.
- **Arquivos prováveis:** src/components/states/LoadingState.tsx.
- **Critérios de aceite:**
	1. **T-65.C1:** props de carregamento produzem indicador localizável por role/nome acessível e informação de operação pendente, não “Nenhuma cidade encontrada” ou erro (AC-16).
	2. **T-65.C2:** montar/atualizar o indicador não modifica o elemento focado e o anúncio de espera não depende somente de animação visual.
	3. **T-65.C3:** o componente não chama Fetch, storage, geolocalização ou hook de feature; sair do estado loading remove o indicador pelo consumidor.

### T-66 — Evoluir EmptyState inicial e sem resultados

- **Tipo:** UI
- **Descrição:** distinguir visualmente ausência inicial de busca sem correspondência.
- **Rastreabilidade:** RF-06; AC-16, AC-17; RNF-03.
- **Dependências:** T-27.
- **Arquivos prováveis:** src/components/states/EmptyState.tsx.
- **Critérios de aceite:**
	1. **T-66.C1:** props iniciais mostram orientação sem falha; props de busca concluída vazia mostram “Nenhuma cidade encontrada” (AC-16, AC-17).
	2. **T-66.C2:** nenhum dos estados afirma timeout ou erro de rede; conteúdo tem semântica acessível e pode ser lido sem ícone ou cor.
	3. **T-66.C3:** componente não executa busca, seleção ou forecast e não interpreta texto dinâmico como HTML.

### T-67 — Evoluir ErrorState e ação de recuperação

- **Tipo:** UI
- **Descrição:** apresentar mensagem sanitizada e retry por callback.
- **Rastreabilidade:** RF-06; AC-18, AC-19, AC-33; RNF-03.
- **Dependências:** T-27.
- **Arquivos prováveis:** src/components/states/ErrorState.tsx.
- **Critérios de aceite:**
	1. **T-67.C1:** categoria recuperável mostra mensagem sanitizada e ação de nova tentativa identificável e acionável por teclado (AC-18, AC-19).
	2. **T-67.C2:** uma ativação emite um callback e mera renderização emite zero; não há chamada direta a service ou retry automático.
	3. **T-67.C3:** entrada com marcação é texto não executável, payload/URL brutos não aparecem e rerender não rouba foco (AC-33).

### T-28 — Testar os componentes de estado

- **Tipo:** Test
- **Descrição:** validar apresentação e interação isoladas com Testing Library.
- **Rastreabilidade:** RF-06; AC-16 a AC-19, AC-33; RNF-03.
- **Dependências:** T-04, T-65, T-66, T-67.
- **Arquivos prováveis:** tests/unit/App.test.tsx ou suíte de estados somente se necessária.
- **Critérios de aceite:**
	1. **T-28.C1:** casos independentes em Vitest + Testing Library renderizam loading, erro e vazio por props, com assertions por role/nome/texto: espera não aparece como erro/vazio, erro oferece recuperação e vazio informa ausência de cidades. Conferir também o estado inicial, sem depender de classes CSS (AC-16 a AC-19).
	2. **T-28.C2:** acionamento por teclado chama retry uma vez, montagem/rerender não chama retry e document.activeElement não muda apenas por exibir o estado.
	3. **T-28.C3:** conteúdo malicioso não executa e payload bruto não aparece; suíte focada passa com props/callbacks simulados, sem backend ou rede real.

### T-29 — Evoluir a UI de busca e desambiguação

- **Tipo:** UI
- **Descrição:** conectar entrada explícita e lista de candidatos por props e callbacks.
- **Rastreabilidade:** RF-01, RF-02; AC-01 a AC-04, AC-17, AC-32 a AC-34, AC-37, AC-42, AC-43; RNF-03.
- **Dependências:** T-03, T-27.
- **Arquivos prováveis:** src/components/SearchBar.tsx.
- **Critérios de aceite:**
	1. **T-29.C1:** digitar nome emite zero buscas; confirmar termo de 1–100 caracteres normalizados emite uma intenção e entrada inválida mostra erro associado ao input, sem busca (AC-02, AC-42).
	2. **T-29.C2:** homônimos mostram identificadores e coordenadas complementares; teclado ou ponteiro seleciona somente candidato válido e lista recebida nunca emite seleção sozinha (AC-03, AC-04, AC-43).
	3. **T-29.C3:** “São Paulo”, nome com hífen e com apóstrofo não são rejeitados por esses caracteres; nomes com marcação são texto e não HTML executável (AC-32, AC-33).

### T-30 — Testar busca e lista acessível

- **Tipo:** Test
- **Descrição:** ampliar a suíte existente da SearchBar para casos e estados aprovados.
- **Rastreabilidade:** RF-01, RF-02, RF-06; AC-01 a AC-04, AC-17, AC-32 a AC-34, AC-42, AC-43.
- **Dependências:** T-04, T-10, T-29.
- **Arquivos prováveis:** tests/unit/SearchBar.test.tsx.
- **Critérios de aceite:**
	1. **T-30.C1:** user-event confirma zero buscas ao digitar e entrada inválida, uma ao submeter termo válido, com casos vazio/espaços/1/100/101 caracteres e nomes legítimos.
	2. **T-30.C2:** estados de loading/erro/vazio/sucesso têm assertions distintas; escolher o segundo homônimo entrega seu identificador e candidato bloqueado não emite seleção por teclado ou ponteiro.
	3. **T-30.C3:** montagem/rerender da lista não seleciona automaticamente e conteúdo malicioso não executa; suíte focada passa com callbacks simulados.

### T-31 — Evoluir clima atual e referência dos dados

- **Tipo:** UI
- **Descrição:** apresentar as cinco métricas atuais, identidade e avisos temporais.
- **Rastreabilidade:** RF-03, RF-07, RF-11; AC-05 a AC-07, AC-20, AC-21, AC-47, AC-48; RNF-05.
- **Dependências:** T-05, T-53, T-07, T-55, T-57, T-27.
- **Arquivos prováveis:** src/components/CurrentWeather.tsx.
- **Critérios de aceite:**
	1. **T-31.C1:** fixture de AC-05 mostra temperatura, sensação, condição textual, umidade e vento nos valores/unidades esperados; null indica “Indisponível” e zero mantém número/unidade.
	2. **T-31.C2:** origem device mostra “Localização atual”; origem manual mostra a cidade. Referência e consulta possuem rótulos distintos e horários de Brasília, sem substituição de referência ausente (AC-20, AC-21).
	3. **T-31.C3:** idade >60 minutos mostra aviso sem ocultar métricas; referência ausente/futura mostra atualidade não verificável. Props de unidade controlam rótulos sem requisição (AC-47, AC-48).

### T-32 — Evoluir a previsão diária de cinco datas

- **Tipo:** UI
- **Descrição:** apresentar resumos diários e o estado de cobertura de cada data.
- **Rastreabilidade:** RF-04, RF-11; AC-06 a AC-09, AC-12, AC-13; RNF-01, RNF-03.
- **Dependências:** T-05, T-53, T-07, T-57, T-27.
- **Arquivos prováveis:** src/components/ForecastList.tsx, src/components/ForecastCard.tsx.
- **Critérios de aceite:**
	1. **T-32.C1:** para a janela de AC-08 há exatamente cinco resumos de 11 a 15/11/2026 em ordem, com condição, mínima, máxima e probabilidade máxima correspondentes à data.
	2. **T-32.C2:** data sem cobertura permanece na lista com indicação de ausência; dado de um sexto dia não a substitui. Null e zero têm apresentações distintas (AC-06, AC-13).
	3. **T-32.C3:** unidade recebida em props determina todas as temperaturas e cada controle de detalhe tem nome, estado expandido e dimensão que não muda com hover/label; não há Fetch no componente.

### T-33 — Adicionar detalhe horário por dia

- **Tipo:** UI
- **Descrição:** disponibilizar horas do dia expandido sem nova chamada à API.
- **Rastreabilidade:** RF-04, RF-07, RF-11; AC-10 a AC-13, AC-47; RNF-01, RNF-03.
- **Dependências:** T-07, T-32.
- **Arquivos prováveis:** src/components/HourlyForecast.tsx, src/components/ForecastCard.tsx.
- **Critérios de aceite:**
	1. **T-33.C1:** às 10h30 e às 11h00 da consulta em Brasília, hoje mostra 11h00 em diante; os demais quatro dias mantêm todas as horas fornecidas, sem duplicação (AC-10, AC-11).
	2. **T-33.C2:** cada período mostra data/hora, temperatura, condição e probabilidade corretas; ausência de campo/período é explícita, inclusive quando não há horas restantes em hoje.
	3. **T-33.C3:** expandir/recolher por teclado muda somente a apresentação e estado acessível do controle; não altera datas, unidade ou contagem de chamadas HTTP.

### T-68 — Testar resumos diários e cobertura ausente

- **Tipo:** Test
- **Descrição:** verificar somente ForecastList e seus cards.
- **Rastreabilidade:** RF-04, RF-11; AC-06 a AC-09, AC-12, AC-13.
- **Dependências:** T-52, T-54, T-08, T-32.
- **Arquivos prováveis:** tests/unit/ForecastList.test.tsx ou suíte existente adequada, não ambas.
- **Critérios de aceite:**
	1. **T-68.C1:** assertions confirmam exatamente cinco datas e campos de cada resumo da fixture, inclusive mínima/máxima e máxima diária de probabilidade, sem associação a outro dia.
	2. **T-68.C2:** remover a cobertura de uma data mantém seu resumo indisponível e não inclui sexto dia; zero válido não gera “Indisponível” (AC-06, AC-13).
	3. **T-68.C3:** rerender em Fahrenheit atualiza só temperaturas e zero requests são emitidos; suíte focada passa sem verificar os detalhes internos das horas.

### T-69 — Testar detalhe horário e ação de expansão

- **Tipo:** Test
- **Descrição:** verificar apenas períodos horários e sua navegação local.
- **Rastreabilidade:** RF-04, RF-07, RF-11; AC-10 a AC-13, AC-47.
- **Dependências:** T-52, T-54, T-08, T-33.
- **Arquivos prováveis:** tests/unit/HourlyForecast.test.tsx ou suíte existente adequada, não ambas.
- **Critérios de aceite:**
	1. **T-69.C1:** fixtures de AC-10/AC-11 têm comparação de períodos e campos esperados, sem hora anterior ao recorte ou duplicação; demais dias não perdem períodos válidos.
	2. **T-69.C2:** casos de null, lacuna e nenhuma hora restante apresentam a ausência correspondente sem inventar métricas ou remover datas diárias.
	3. **T-69.C3:** teclado expande/recolhe o detalhe com aria-expanded coerente e chamadas HTTP permanecem zero; rótulos seguem AC-47 e a suíte passa isoladamente.

### T-34 — Testar o componente de clima atual

- **Tipo:** Test
- **Descrição:** verificar somente métricas atuais, identidade e referência temporal.
- **Rastreabilidade:** RF-03, RF-07, RF-11; AC-05 a AC-07, AC-20, AC-21, AC-35, AC-47, AC-48.
- **Dependências:** T-52, T-54, T-56, T-58, T-31.
- **Arquivos prováveis:** tests/unit/CurrentWeather.test.tsx, ou suíte existente adequada, não ambas.
- **Critérios de aceite:**
	1. **T-34.C1:** assertions literais das cinco métricas de AC-05 e de null/zero confirmam valores, unidades e condição textual sem depender de ícone ou cor.
	2. **T-34.C2:** referências de 60 minutos, 60 minutos e um segundo, null e futura geram os avisos de AC-48; identidade e horários seguem AC-20/AC-21/AC-47.
	3. **T-34.C3:** props manual/device e Celsius/Fahrenheit produzem rótulos esperados sem rede; a suíte focada passa e não inclui ForecastList ou expansão de horas.

### T-35 — Evoluir o controle de unidade

- **Tipo:** UI
- **Descrição:** apresentar somente a escolha Celsius/Fahrenheit por props e callback.
- **Rastreabilidade:** RF-05; AC-14, AC-15; RNF-03.
- **Dependências:** T-03, T-27.
- **Arquivos prováveis:** src/components/UnitToggle.tsx.
- **Critérios de aceite:**
	1. **T-35.C1:** há controle binário com nome acessível, opções Celsius/Fahrenheit e estado selecionado determinado exclusivamente pela Unit recebida.
	2. **T-35.C2:** uma ativação por teclado ou ponteiro emite uma intenção com a unidade correspondente; montagem/rerender não emite callback.
	3. **T-35.C3:** componente não usa Fetch, storage ou estado meteorológico próprio; localização e limpeza não fazem parte deste controle.

### T-70 — Disponibilizar ação de localização e explicação

- **Tipo:** UI
- **Descrição:** apresentar somente a opção explícita de usar localização.
- **Rastreabilidade:** RF-08; AC-22 a AC-24, AC-38, AC-44, AC-49; RNF-10.
- **Dependências:** T-03, T-27.
- **Arquivos prováveis:** src/components/LocationButton.tsx.
- **Critérios de aceite:**
	1. **T-70.C1:** explicação acessível informa envio da posição ao provedor e alternativa manual antes da solicitação de localização (AC-49).
	2. **T-70.C2:** ação explícita emite um callback; props loading/erro geram indicação de espera ou falha sem declarar posição obtida nem ocultar a alternativa manual.
	3. **T-70.C3:** montar/rerender o componente faz zero chamadas à Geolocation API, Fetch ou storage; acesso à explicação sozinho não solicita posição.

### T-71 — Disponibilizar ação de limpar preferências

- **Tipo:** UI
- **Descrição:** apresentar somente limpeza e seu resultado por props.
- **Rastreabilidade:** RF-10; AC-28, AC-29; RNF-03.
- **Dependências:** T-03, T-27.
- **Arquivos prováveis:** src/components/PreferencesControls.tsx.
- **Critérios de aceite:**
	1. **T-71.C1:** a ação de limpeza tem nome acessível e pode ser acionada por teclado/ponteiro, emitindo somente a intenção de remover preferências.
	2. **T-71.C2:** props de sucesso mostram remoção concluída; props de falha informam impossibilidade de concluir e nunca exibem sucesso (AC-28, AC-29).
	3. **T-71.C3:** antes do resultado não há afirmação de remoção; componente não acessa storage/Fetch nem desabilita a busca manual como efeito da limpeza.

### T-36 — Testar o controle de unidade

- **Tipo:** Test
- **Descrição:** verificar interação e estado selecionado do UnitToggle isoladamente.
- **Rastreabilidade:** RF-05; AC-14, AC-15; RNF-03.
- **Dependências:** T-04, T-35.
- **Arquivos prováveis:** tests/unit/UnitToggle.test.tsx.
- **Critérios de aceite:**
	1. **T-36.C1:** assertions por role/nome/estado selecionado confirmam Celsius e Fahrenheit para cada valor de props; rerender não emite intenção.
	2. **T-36.C2:** user-event por teclado e ponteiro chama o callback uma vez por ação com a unidade correta, sem efeito próprio de Fetch/storage.
	3. **T-36.C3:** suíte focada passa sem hook, geolocalização ou limpeza; não usa classes CSS como evidência do estado selecionado.

### T-72 — Testar a UI de localização e privacidade

- **Tipo:** Test
- **Descrição:** verificar o componente de localização sem API do dispositivo.
- **Rastreabilidade:** RF-08; AC-22, AC-24, AC-38, AC-44, AC-49.
- **Dependências:** T-04, T-70.
- **Arquivos prováveis:** tests/unit/LocationButton.test.tsx ou suíte existente adequada, não ambas.
- **Critérios de aceite:**
	1. **T-72.C1:** montagem e leitura da explicação emitem zero callbacks; ativação explícita por teclado emite um e o texto contém envio ao provedor e alternativa manual.
	2. **T-72.C2:** props de espera, recusa e timeout têm assertions de mensagem/estado distintos, sem exibir “Localização atual” como sucesso antes da posição.
	3. **T-72.C3:** spies de geolocalização, rede e storage registram zero chamadas diretas do componente; suíte focada passa com props/callbacks controlados.

### T-73 — Testar a UI de limpeza

- **Tipo:** Test
- **Descrição:** verificar somente o controle de preferências.
- **Rastreabilidade:** RF-10; AC-28, AC-29.
- **Dependências:** T-04, T-71.
- **Arquivos prováveis:** tests/unit/PreferencesControls.test.tsx ou suíte existente adequada, não ambas.
- **Critérios de aceite:**
	1. **T-73.C1:** ação por teclado/ponteiro emite uma intenção e montagem emite zero, com controle localizável por nome acessível.
	2. **T-73.C2:** assertions diferenciam antes do resultado, remoção confirmada e falha; caso de falha não contém mensagem de sucesso (AC-28, AC-29).
	3. **T-73.C3:** não ocorre acesso direto a storage ou hook; suíte focada passa sem redefinir a remoção física de registros já coberta em T-14.

### T-37 — Conectar a página ao hook de feature

- **Tipo:** UI
- **Descrição:** compor os componentes e callbacks com a fonte única de estado.
- **Rastreabilidade:** RF-01 a RF-11; US-01 a US-09; AC-01 a AC-49.
- **Dependências:** T-25, T-62, T-29, T-31, T-32, T-33, T-35, T-70, T-71.
- **Arquivos prováveis:** src/App.tsx.
- **Critérios de aceite:**
	1. **T-37.C1:** App obtém o estado de uma instância efetiva de useWeather e liga os callbacks dos controles correspondentes; não há segunda cópia de forecast/unidade em componentes filhos.
	2. **T-37.C2:** inspeção focada do fluxo confirma busca sem trocar seleção, nova seleção ocultando previsão anterior e unidade vigente nos três grupos de métricas (AC-30, AC-40, AC-45).
	3. **T-37.C3:** App exibe avisos de restauração/limpeza e seus resultados sem chamar diretamente Fetch/storage/posição; build passa e o diff não acrescenta recurso fora do MVP ou alteração de bootstrap.

## Catálogo — Testes de Fluxo e Qualidade

### T-74 — Configurar perfis e isolamento E2E

- **Tipo:** Test
- **Descrição:** ajustar somente a configuração e a fronteira comum dos testes de navegador.
- **Rastreabilidade:** RF-01 a RF-11; RNF-01, RNF-07, RNF-09.
- **Dependências:** T-04, T-52, T-37.
- **Arquivos prováveis:** playwright.config.ts, tests/e2e/weather.spec.ts para setup compartilhado.
- **Critérios de aceite:**
	1. **T-74.C1:** configuração nomeia Chromium, Firefox e WebKit e perfis com larguras 320/768/1440, alturas, orientação e suporte de toque registrados; cada caso usa contexto/storage isolado.
	2. **T-74.C2:** uma chamada meteorológica deliberadamente não interceptada falha no teste sem chegar ao provedor; endpoints previstos podem receber resposta controlada.
	3. **T-74.C3:** inicialização e listagem de testes passam sem modificar src ou adicionar jornadas de produto; comportamento de isolamento é demonstrado em dois casos consecutivos.

### T-38 — Cobrir busca, seleção e clima atual em Playwright

- **Tipo:** Test
- **Descrição:** validar a jornada de busca até os dados atuais, com endpoints interceptados.
- **Rastreabilidade:** RF-01 a RF-03, RF-07, RF-11; AC-01 a AC-07, AC-20, AC-21, AC-32, AC-42, AC-43, AC-47, AC-48.
- **Dependências:** T-26, T-28, T-30, T-34, T-36, T-68, T-69, T-72, T-73, T-37, T-74.
- **Arquivos prováveis:** tests/e2e/weather.spec.ts.
- **Critérios de aceite:**
	1. **T-38.C1:** percurso real de UI busca dois homônimos, escolhe o segundo e confirma identidade e cinco métricas de AC-05, referência/consulta distintas e Brasília.
	2. **T-38.C2:** casos vazio/espaços/1/100/101 caracteres conferem mensagens e número esperado de chamadas; acentos/hífen/apóstrofo continuam aceitos (AC-32, AC-42).
	3. **T-38.C3:** o mesmo fluxo principal de busca → seleção → clima atual passa em Playwright no perfil mobile de 320 px e no desktop de 1440 px, com alturas/configurações de T-74. Sem mock de hook/componente, sleeps fixos ou API real; previsão detalhada e conversão permanecem em T-75.

### T-39 — Cobrir erro de rede, API e timeout em E2E

- **Tipo:** Test
- **Descrição:** verificar apenas falhas totais e sua recuperação manual.
- **Rastreabilidade:** RF-06; AC-16, AC-18, AC-19, AC-33.
- **Dependências:** T-38.
- **Arquivos prováveis:** tests/e2e/weather.spec.ts.
- **Critérios de aceite:**
	1. **T-39.C1:** desconexão, HTTP 429, 5xx e JSON ilegível encerram loading com erro sanitizado e nova tentativa; assertions não permitem payload bruto visível (AC-18, AC-33).
	2. **T-39.C2:** relógio controlado confirma loading em 9.999 ms e timeout em 10.000 ms; antes da ação manual nenhuma nova chamada é emitida, e retry bem-sucedido remove erro (AC-19).
	3. **T-39.C3:** casos passam com endpoints interceptados e sem espera real; matriz de partial/concorrência permanece em T-76, sem substituir erro total por empty.

### T-40 — Cobrir localização com consentimento em E2E

- **Tipo:** Test
- **Descrição:** verificar somente o fluxo autorizado, recusado ou expirado de localização.
- **Rastreabilidade:** RF-08, RF-09; AC-22 a AC-24, AC-27, AC-38, AC-44, AC-49; RNF-10.
- **Dependências:** T-38.
- **Arquivos prováveis:** tests/e2e/weather.spec.ts.
- **Critérios de aceite:**
	1. **T-40.C1:** abertura e leitura do aviso fazem zero pedidos de posição; ação explícita com permissão/posição válida mostra “Localização atual” e previsão da posição autorizada (AC-22, AC-23, AC-49).
	2. **T-40.C2:** recusa ou 10 segundos sem posição informa falha e permite completar busca manual; callback tardio não inicia previsão ou substitui seleção (AC-24, AC-44).
	3. **T-40.C3:** inspeção de localStorage confirma que coordenadas do dispositivo não foram gravadas e cidade manual salva foi preservada; cenários passam isolados, sem posição pessoal real.

### T-75 — Cobrir previsão e conversão de toda a página em E2E

- **Tipo:** Test
- **Descrição:** verificar a jornada de leitura diária/horária e mudança de escala.
- **Rastreabilidade:** RF-04, RF-05, RF-07, RF-11; AC-07 a AC-15, AC-36, AC-40, AC-47, AC-48.
- **Dependências:** T-38.
- **Arquivos prováveis:** tests/e2e/weather.spec.ts.
- **Critérios de aceite:**
	1. **T-75.C1:** com relógio de AC-08, página mostra 11 a 15/11/2026; teclado abre detalhe com 11h00 como primeira hora elegível nos casos de AC-11 e preserva todos os períodos dos outros dias.
	2. **T-75.C2:** alternar C/F atualiza temperaturas atuais, sensação, mínimas/máximas e horas conforme AC-36/AC-47, sem mudar cidade, vento, probabilidades ou contagem de requests.
	3. **T-75.C3:** leitura diária/horária e conversão do fluxo principal passam em Playwright nos perfis mobile de 320 px e desktop de 1440 px de T-74. Abrir/recolher detalhe emite zero requests; instantes de AC-12 produzem as duas janelas esperadas, sem depender do fuso real do runner.

### T-76 — Cobrir dados parciais e respostas fora de ordem em E2E

- **Tipo:** Test
- **Descrição:** verificar integridade dos resultados quando o transporte conclui em ordem diferente.
- **Rastreabilidade:** RF-03, RF-04, RF-06, RF-07; AC-06, AC-13, AC-30, AC-31, AC-35, AC-37, AC-40, AC-45.
- **Dependências:** T-39, T-75.
- **Arquivos prováveis:** tests/e2e/weather.spec.ts.
- **Critérios de aceite:**
	1. **T-76.C1:** completar sucesso/erro de A depois de B não altera lista, identidade, loading/erro, referência ou unidade de B; repetir para busca e forecast (AC-30, AC-40).
	2. **T-76.C2:** partial mantém zero e métricas válidas, indica campos/dia ausentes e não insere sexto dia; falha na mesma cidade preserva horários com aviso e seleção de outra oculta dados antigos (AC-06, AC-13, AC-45).
	3. **T-76.C3:** resposta após timeout não modifica a tentativa seguinte; assertions com respostas controladas passam sem repetir a classificação HTTP de T-39.

### T-77 — Cobrir restauração e limpeza em E2E

- **Tipo:** Test
- **Descrição:** verificar continuidade somente no mesmo navegador e controle dos registros locais.
- **Rastreabilidade:** RF-05, RF-09, RF-10; AC-14, AC-25 a AC-29, AC-39, AC-46.
- **Dependências:** T-38.
- **Arquivos prováveis:** tests/e2e/weather.spec.ts.
- **Critérios de aceite:**
	1. **T-77.C1:** recarregar com cidade/Fahrenheit válidos consulta novamente nessa unidade; as duas corrupções parciais de AC-46 preservam somente o campo válido, sem solicitar posição.
	2. **T-77.C2:** storage contém só unidade e última cidade permitida, sem histórico/forecast; limpar e recarregar inicia sem cidade e em Celsius (AC-28, AC-39).
	3. **T-77.C3:** falha de remoção não mostra sucesso e storage bloqueado não impede busca; cada caso passa em contexto independente com interceptação de rede.

### T-78 — Inspecionar diagnóstico e destinos de rede em E2E

- **Tipo:** Test
- **Descrição:** verificar somente o contrato de privacidade nas falhas integradas.
- **Rastreabilidade:** RF-06; AC-41, AC-49; RNF-09, RNF-10.
- **Dependências:** T-39, T-40, T-77.
- **Arquivos prováveis:** tests/e2e/weather.spec.ts.
- **Critérios de aceite:**
	1. **T-78.C1:** uma falha terminal vigente produz um evento só com category/operation/httpStatus opcional/durationMs/at; sentinelas sensíveis de AC-41 não aparecem no console.
	2. **T-78.C2:** sucesso, vazio, cancelamento e falha de geração descartada produzem zero eventos de diagnóstico; rede/storage não contêm logs ou analytics, distinguindo as consultas necessárias.
	3. **T-78.C3:** cenários passam com inspeção de console, destinos de rede e armazenamento; defeito mantém o aceite reprovado e gera tarefa própria, sem correção de src embutida.

### T-41 — Verificar responsividade nos viewports aprovados

- **Tipo:** Test
- **Descrição:** adicionar somente assertions e evidências da apresentação responsiva.
- **Rastreabilidade:** RF-01 a RF-11; RNF-01, RNF-07.
- **Dependências:** T-39, T-40, T-75, T-76, T-77, T-78.
- **Arquivos prováveis:** tests/e2e/weather.spec.ts.
- **Critérios de aceite:**
	1. **T-41.C1:** fluxos definidos no plano rodam nos perfis 320/768/1440 e paisagem móvel, com altura/toque registrados; scrollWidth não excede clientWidth da página (RNF-01).
	2. **T-41.C2:** screenshots e assertions demonstram textos sem corte/sobreposição e controles de busca, unidade, localização, detalhe e limpeza alcançáveis após a rolagem necessária.
	3. **T-41.C3:** cada defeito tem cenário e tarefa UI localizada; aprovação só após sua reexecução sem falha. Esta tarefa não altera CSS/componentes nem substitui T-79.

### T-79 — Verificar navegadores reais da matriz de suporte

- **Tipo:** Test
- **Descrição:** executar a verificação complementar fora das engines automatizadas.
- **Rastreabilidade:** RF-01 a RF-11; RNF-07.
- **Dependências:** T-41.
- **Arquivos prováveis:** plans/weather-app-plan.md, somente para matriz e resultados.
- **Critérios de aceite:**
	1. **T-79.C1:** matriz nomeia as duas versões estáveis exigidas de Chrome/Edge/Firefox desktop, Safari macOS/iOS e Chrome Android, com versão, SO/dispositivo e revisão testada (RNF-07).
	2. **T-79.C2:** cada combinação registra resultado do fluxo principal, localização/alternativa manual e preferências; engine Playwright não é usada como prova de versão real não executada.
	3. **T-79.C3:** combinação inacessível ou defeituosa permanece pendente/reprovada com evidência, sem marcar a matriz completa. Correção ocorre fora desta avaliação.

### T-42 — Automatizar verificações acessíveis do fluxo

- **Tipo:** Test
- **Descrição:** adicionar somente verificações automatizáveis de teclado e semântica.
- **Rastreabilidade:** RF-01 a RF-11; RNF-03; mensagens e ações de AC-02, AC-16 a AC-19, AC-22 a AC-24, AC-28, AC-29.
- **Dependências:** T-41.
- **Arquivos prováveis:** tests/e2e/weather.spec.ts.
- **Critérios de aceite:**
	1. **T-42.C1:** assertions por teclado completam busca/seleção, unidade, detalhe, localização e limpeza sem bloqueio; foco mantém ordem utilizável e controles têm nomes/estados acessíveis.
	2. **T-42.C2:** erros são associados aos campos e mudanças de estado têm semântica de anúncio; cada condição meteorológica possui alternativa textual sem depender da cor/ícone.
	3. **T-42.C3:** testes focados passam com ferramentas atuais, sem editar UI nesta tarefa ou declarar conformidade WCAG completa; resultados manuais continuam exigidos em T-80.

### T-80 — Executar avaliação manual e assistiva de acessibilidade

- **Tipo:** Test
- **Descrição:** completar a avaliação WCAG que não pode ser comprovada só por automação.
- **Rastreabilidade:** RF-01 a RF-11; RNF-03.
- **Dependências:** T-42, T-79.
- **Arquivos prováveis:** plans/weather-app-plan.md, somente para evidências.
- **Critérios de aceite:**
	1. **T-80.C1:** relatório identifica revisão, navegador/SO, leitor de tela e versão e associa resultados manuais aos critérios WCAG 2.2 A/AA aplicáveis, justificando os não aplicáveis.
	2. **T-80.C2:** os fluxos aprovados têm registro de teclado, foco visível, anúncios, contraste medido, zoom e alternativas textuais; anexar resultado e evidência de cada barreira, não só uma declaração geral de conformidade.
	3. **T-80.C3:** nenhuma barreira aplicável fica marcada como aprovada sem correção e repetição; ambiente faltante mantém gate pendente. Não editar styles/components durante a avaliação.

### T-43 — Executar avaliação formativa de usabilidade

- **Tipo:** Test
- **Descrição:** aplicar o protocolo de RNF-02 com pessoas dos três contextos de uso.
- **Rastreabilidade:** RF-01 a RF-11; US-01 a US-09; RNF-02.
- **Dependências:** T-80.
- **Arquivos prováveis:** plans/weather-app-plan.md, somente para registro da avaliação.
- **Critérios de aceite:**
	1. **T-43.C1:** ao menos três participantes, um por contexto das personas, executam roteiros/resultados esperados definidos antes da rodada; registros usam identificadores anônimos (RNF-02).
	2. **T-43.C2:** cada tarefa registra conclusão autônoma, ajuda, tempo, erro e gravidade; ajuda não é contada como conclusão sem assistência e metas candidatas de tempo não viram limite aprovado.
	3. **T-43.C3:** bloqueio de fluxo ou interpretação errada de localidade/unidade/fuso tem tarefa corretiva e resultado de reavaliação; falta de participante ou bloqueio não resolvido mantém avaliação pendente, sem editar UI aqui.

## Catálogo — Origem Publicada e Operação

### T-81 — Configurar o caminho-base do build estático

- **Tipo:** Infra
- **Descrição:** ajustar somente a configuração de assets para o host escolhido.
- **Rastreabilidade:** RNF-07, RNF-08; arquitetura SPA.
- **Dependências:** T-02, T-37.
- **Arquivos prováveis:** vite.config.ts.
- **Critérios de aceite:**
	1. **T-81.C1:** build termina com sucesso e URLs de assets incluem o base escolhido em T-02, sem assumir raiz quando o host publica em subdiretório.
	2. **T-81.C2:** abrir diretamente a URL-base no preview carrega HTML, JS e CSS sem 404 e sem configurar fallback de rotas adicional.
	3. **T-81.C3:** diff altera somente vite.config.ts; não cria workflow, aviso ou alteração de UI/README e o resultado do preview é registrado para T-44.

### T-82 — Apresentar aviso factual de privacidade e atribuição

- **Tipo:** UI
- **Descrição:** incorporar o conteúdo externo verificado à página.
- **Rastreabilidade:** RF-08; AC-49; RNF-10; OQ-04, OQ-08.
- **Dependências:** T-01, T-51, T-37.
- **Arquivos prováveis:** src/App.tsx e componente existente adequado somente se necessário.
- **Critérios de aceite:**
	1. **T-82.C1:** página apresenta envio necessário de localidade/posição ao provedor, preferências locais e práticas externas/atribuição com conteúdo e links fundamentados em T-01/T-51 (RNF-10).
	2. **T-82.C2:** acessar o aviso não solicita ou envia posição; nenhuma afirmação de ausência de logs externos contraria a evidência de T-51 e a alternativa manual permanece disponível (AC-49).
	3. **T-82.C3:** conteúdo é acessível por teclado/texto e não interpretado como HTML externo; diff limita-se à UI prevista, sem analytics, mudança de consentimento ou novas suítes dentro desta tarefa.

### T-85 — Testar o aviso de privacidade e atribuição

- **Tipo:** Test
- **Descrição:** verificar somente o conteúdo publicado por T-82 e seu acesso sem localização.
- **Rastreabilidade:** RF-08; AC-49; RNF-10.
- **Dependências:** T-82, T-04, T-52.
- **Arquivos prováveis:** tests/unit/App.test.tsx.
- **Critérios de aceite:**
	1. **T-85.C1:** assertions por nome/link conferem conteúdo/atribuição de T-82 e destinos correspondentes às evidências de T-01/T-51, sem exigir APIs reais.
	2. **T-85.C2:** ler/abrir o aviso com fronteiras controladas produz zero solicitações de posição e zero previsões adicionais; não gera diagnóstico ou envio de dados por si só (AC-49).
	3. **T-85.C3:** suíte focada passa sem mudar UI e rejeita apresentação de conteúdo como HTML externo ou alegação de privacidade contraditória com a fonte registrada.

### T-44 — Publicar uma versão candidata gratuita por HTTPS

- **Tipo:** Infra
- **Descrição:** configurar build e distribuição estática no host verificado, sem declarar liberação final.
- **Rastreabilidade:** RF-01 a RF-11; RNF-07, RNF-08, RNF-10; orçamento zero.
- **Dependências:** T-02, T-51, T-79, T-80, T-81, T-85.
- **Arquivos prováveis:** workflow de publicação existente; .github/workflows/deploy.yml somente se não houver equivalente.
- **Critérios de aceite:**
	1. **T-44.C1:** workflow para a revisão candidata instala/builda com pnpm e publica o artefato no host aprovado sem plano pago ou cobrança automática; actions de artifacts, quando usadas, são v4 ou superiores.
	2. **T-44.C2:** run identifica a revisão e a URL HTTPS; HTML/JS/CSS carregam sem 404 no base de T-81 e o aviso de T-82 aparece na candidata.
	3. **T-44.C3:** diff não modifica Vite/UI/README e o registro classifica a versão como candidata, sem declarar T-45/T-46 ou gates de lançamento concluídos.

### T-45 — Concluir VAL-API na origem publicada

- **Tipo:** Test
- **Descrição:** confirmar integração real e fechar os impedimentos externos antes de aceitar o adapter.
- **Rastreabilidade:** RF-01 a RF-04, RF-07, RF-08; RNF-05, RNF-09, RNF-10; OQ-04 a OQ-06 e OQ-08.
- **Dependências:** T-01, T-49, T-50, T-51, T-44.
- **Arquivos prováveis:** plans/weather-app-plan.md, specs/weather-app-spec.md, somente para evidências.
- **Critérios de aceite:**
	1. **T-45.C1:** navegador na URL de T-44 executa geocoding e forecast reais, sem bloqueio de origem, com unidades, cinco datas/horas de Brasília, referência e atribuição conferidos com a evidência de T-49.
	2. **T-45.C2:** inspeção confirma no-store, envio apenas de dados necessários e uso de posição de teste autorizada; registro consolida aceite de termos, consumo e privacidade de T-01/T-50/T-51 (OQ-04 a OQ-06, OQ-08).
	3. **T-45.C3:** nenhuma falha essencial fica sem bloqueio ou tarefa corretiva; diff contém só evidência documental e não declara p95/SLA comprovados por essas consultas funcionais.

### T-83 — Preparar instrumento reproduzível de desempenho

- **Tipo:** Test
- **Descrição:** configurar a coleta, sem executar a amostra externa completa.
- **Rastreabilidade:** RNF-04.
- **Dependências:** T-45.
- **Arquivos prováveis:** teste/script de desempenho existente ou tests/e2e/weatherPerformance.spec.ts se indispensável, não ambos.
- **Critérios de aceite:**
	1. **T-83.C1:** o instrumento registra por fluxo início/fim, duração, sucesso/parcial/falha e configuração do ambiente, usando relógio monotônico; erro rápido não entra como sucesso (RNF-04).
	2. **T-83.C2:** dados sintéticos ordenados de 1 a 100 ms resultam em p95=95 ms por nearest-rank; zero sucessos resulta em p95 indisponível, nunca zero ou aprovação.
	3. **T-83.C3:** rodada sintética passa sem rede e execução real exige acionamento explícito, com intervalo e parada por 429 do protocolo; não executar as 200 tentativas nesta tarefa ou automaticamente no CI.

### T-46 — Medir desempenho no perfil aprovado

- **Tipo:** Test
- **Descrição:** executar o protocolo real de latência após validar as cotas e a integração.
- **Rastreabilidade:** RF-01 a RF-04; RNF-04.
- **Dependências:** T-45, T-83.
- **Arquivos prováveis:** plans/weather-app-plan.md, somente para resultados da medição.
- **Critérios de aceite:**
	1. **T-46.C1:** relatório registra build/revisão, Chromium/Linux, máquina, viewport 390 × 844, rede 10/2 Mbit/s, latência adicional 100 ms e CPU slowdown 4×; parâmetro não aplicado torna a rodada não comparável.
	2. **T-46.C2:** há 100 tentativas reais de busca e 100 de forecast em distribuições separadas, uma chamada por vez e intervalo mínimo de 10 segundos ou maior pela cota; 429 interrompe a rodada e impede aceite de amostra incompleta.
	3. **T-46.C3:** p95 nearest-rank dos sucessos é ≤3.000 ms em cada fluxo e o relatório inclui falhas, parciais e seus tempos separadamente; zero sucessos, mocks ou amostra incompleta não aprovam RNF-04. Diff só registra resultados, não corrige código.

### T-84 — Escolher o serviço gratuito de monitoramento

- **Tipo:** Infra
- **Descrição:** verificar somente elegibilidade, intervalo, privacidade e custos do monitor.
- **Rastreabilidade:** RNF-08, RNF-10; orçamento zero.
- **Dependências:** T-02.
- **Arquivos prováveis:** plans/weather-app-plan.md.
- **Critérios de aceite:**
	1. **T-84.C1:** registro nomeia fornecedor e fontes datadas comprovando modalidade gratuita, intervalo de cinco minutos, cotas e ausência de cobrança automática (RNF-08).
	2. **T-84.C2:** práticas de acesso/retenção dos dados da sonda são registradas e a medição pode avaliar entrega/abertura sem chamar forecast em cada ciclo (RNF-10).
	3. **T-84.C3:** opção incompatível não é considerada escolhida; registrar bloqueio sem criar backend, contratação ou ativação, que pertence a T-47.

### T-47 — Ativar monitoramento gratuito de disponibilidade

- **Tipo:** Infra
- **Descrição:** configurar a observação contínua da entrega e abertura da aplicação.
- **Rastreabilidade:** RNF-08, RNF-10; orçamento zero.
- **Dependências:** T-44, T-84.
- **Arquivos prováveis:** README.md, além da configuração externa do serviço escolhido.
- **Critérios de aceite:**
	1. **T-47.C1:** monitor de T-84 aponta à URL HTTPS, agenda sondagem a cada cinco minutos e registra pelo menos duas sondagens consecutivas sem request de forecast gerado pela sonda.
	2. **T-47.C2:** uma simulação não destrutiva da ferramenta demonstra registro de falha/recuperação; relatório distingue incidentes da aplicação, meteorológicos e lacunas de medição, sem interromper produção para testar.
	3. **T-47.C3:** README contém URL/revisão, configuração e início do acompanhamento mensal de 99,5%, sem afirmar cumprimento antecipado ou SLA contratado; nenhuma UI ou escolha de fornecedor é alterada.

### T-48 — Conferir rastreabilidade e liberar a versão

- **Tipo:** Infra
- **Descrição:** reunir evidências dos gates sem executar novamente tarefas já comprovadas apenas por conveniência.
- **Rastreabilidade:** RF-01 a RF-11; AC-01 a AC-49; RNF-01 a RNF-10.
- **Dependências:** T-43, T-45, T-46, T-47.
- **Arquivos prováveis:** README.md, tasks/weather-app-tasks.md.
- **Critérios de aceite:**
	1. **T-48.C1:** matriz de liberação associa AC-01 a AC-49 às execuções/variações e evidencia RNF-01 a RNF-10, termos/cotas, privacidade, suporte, avaliação manual, usabilidade e desempenho para a mesma revisão candidata.
	2. **T-48.C2:** pnpm lint, pnpm build, pnpm test e E2E acordados estão aprovados nessa revisão, sem gate obrigatório falho/pendente ou exclusão do MVP implementada sem decisão. Uma única evidência obrigatória ausente impede liberação.
	3. **T-48.C3:** README registra versão/URL/data e monitoramento ativo; status do backlog só muda com evidência por checklist. Histórico mensal segue como obrigação operacional, sem exigir mês anterior ao primeiro lançamento ou declarar 99,5% já comprovado.

## Revisão de Granularidade

**Resultado:** 85 tarefas pendentes, preservando T-01 a T-48 e acrescentando T-49 a T-85. A ordem de implementação e os pré-requisitos estão na tabela de Ordem de Execução; os blocos de catálogo conservam critérios e arquivos por assunto. Nenhuma tarefa foi executada por esta revisão.

| Escopo original grande ou misto | Problema | Distribuição revisada |
|---|---|---|
| T-01 | Termos, experimento externo e estimativa de uso no mesmo aceite. | T-01: termos; T-49: payload real; T-50: consumo. |
| T-02 | Elegibilidade e revisão de privacidade externa juntas. | T-02: hospedagem; T-51: privacidade. |
| T-03 | Lista aberta de consumidores e risco de migração do repositório inteiro. | T-03 só altera tipos aditivamente; T-09/T-11, T-19 a T-25 e tarefas UI migram seus próprios consumidores dentro do limite de arquivos. |
| T-04 | Fixtures de busca, forecast e ambiente no mesmo pacote. | T-04: geocoding e isolamento; T-52: dados meteorológicos. |
| T-05/T-06 | Conversão matemática e apresentação/verificação de rótulos. | T-05/T-06: conversão e testes; T-53/T-54: formatação e testes. |
| T-07/T-08 | Calendário/recorte e classificação de idade no mesmo aceite. | T-07/T-08: datas e horas; T-55/T-56: atualidade e testes. |
| T-11/T-12 | Transporte, códigos, validação, séries e testes de camadas distintas. | T-57/T-58: condições e testes; T-59/T-60: normalização e testes; T-11/T-12: transporte e testes. |
| T-23/T-24 | Unidade, inicialização e limpeza agregadas. | T-23/T-63: unidade e teste; T-61/T-24: restauração e teste; T-62/T-64: limpeza e teste. |
| T-27 | App, CSS e três componentes de estado. | T-27: CSS; T-65/T-66/T-67: um componente por tarefa; T-37: composição. |
| T-31/T-34 | Clima atual com edição de lib e testes dos três grupos de UI. | T-57: lib; T-31/T-34: clima atual; T-68: teste diário; T-69: teste horário. |
| T-35/T-36 | Três controles e cenários de teste distintos. | T-35/T-36: unidade; T-70/T-72: localização; T-71/T-73: limpeza. |
| T-37 | Composição e possível alteração de bootstrap sem necessidade demonstrada. | T-37 altera somente App; bootstrap fica intocado salvo nova tarefa justificada. |
| T-38/T-39/T-40 | Configuração, várias jornadas, falhas e privacidade concentradas. | T-74: configuração; T-38: busca/atual; T-75: previsão/C-F; T-39: falhas; T-76: parcial/concorrência; T-40: localização; T-77: preferências; T-78: diagnóstico. |
| T-41/T-42/T-43 | Avaliação/testes misturados com correções abertas de UI/dados. | T-41: responsividade; T-79: navegadores reais; T-42: acessibilidade automatizada; T-80: manual; T-43: usabilidade. Defeitos viram novas tarefas localizadas antes de revalidar. |
| T-44 | Vite, workflow, documentação e aviso de privacidade. | T-81: base; T-82/T-85: aviso e teste; T-44: workflow e publicação candidata. |
| T-45 | Evidência externa misturada com correção de service/configuração. | T-45 só verifica e documenta; incompatibilidades geram tarefas específicas, sem aceitar gate bloqueado. |
| T-46 | Instrumentação e campanha de medição juntas. | T-83: instrumento; T-46: execução/análise. |
| T-47 | Escolha de fornecedor e ativação no mesmo aceite. | T-84: elegibilidade do monitor; T-47: ativação. |
| T-48 | Quatro documentos e risco de reimplementar etapas no gate final. | T-48 só consolida liberação em README e status do backlog; evidências permanecem nas tarefas de origem. |

Cada subtarefa preserva sua rastreabilidade própria; a distribuição não aprova mudanças na spec, exige novos módulos desnecessários ou remove variações de teste. Não confundir executar um teste existente para validar uma implementação com escrever uma suíte nova nessa tarefa de implementação.

## Conferência de Cobertura

### Requisitos funcionais e tarefas de implementação

Fonte: Functional Requirements da [spec](../specs/weather-app-spec.md). A tabela relaciona somente tarefas Data/UI que constroem comportamento, não tarefas Test ou validações Infra. T-03 fornece os tipos comuns e T-37 conecta os fluxos à página; isoladamente, nenhuma das duas comprova cobertura funcional. “Prevista” significa correspondência no backlog, não implementação concluída ou aceite executado.

| Requisito da spec | Dados, funções puras e orquestração | Apresentação | Situação da cobertura planejada |
|---|---|---|---|
| RF-01 — Buscar cidades | T-09: termo, parâmetros e geocoding; T-19: submissão explícita e estado da busca. | T-29: input, validação e resultados; T-37: callbacks da página. | Prevista. |
| RF-02 — Desambiguar resultados | T-09: candidatos/identificadores e seletividade; T-21: aceitar somente seleção válida. | T-29: homônimos, coordenadas complementares e item bloqueado; T-37: seleção conectada. | Prevista. |
| RF-03 — Exibir clima atual | T-57: condições; T-59: normalização das cinco métricas; T-11: forecast; T-21: resultado vigente. | T-31: métricas atuais e condição textual; T-37: dados na página. | Prevista. |
| RF-04 — Exibir previsão de cinco dias | T-07: calendário/recorte de Brasília; T-57: condições; T-59: séries diárias/horárias; T-11: transporte; T-21: consulta vigente. | T-32: cinco resumos; T-33: detalhe horário; T-37: composição. | Prevista. |
| RF-05 — Alternar temperatura | T-05: conversão canônica; T-23: unidade vigente e gravação; T-61: padrão/restauração independente. | T-35: controle C/F; T-31/T-32/T-33: temperaturas derivadas de props; T-37: unidade compartilhada. | Prevista, sem request adicional. |
| RF-06 — Tratar estados e recuperação | T-09/T-11: falhas da fronteira; T-17: diagnóstico sanitizado; T-19/T-21: gerações, timeout, retry manual e identidade; T-25: falhas de localização. | T-65/T-66/T-67: loading, vazio e erro; T-29: estado da busca; T-31/T-32/T-33: dados utilizáveis/parciais; T-37: estados e ações conectados. | Prevista. |
| RF-07 — Identificar localidade e referência temporal | T-07: datas/horas em Brasília; T-55: idade; T-59/T-11: referência distinta de receivedAt; T-21: preservação da identidade e dos horários. | T-31: cidade/referência/consulta; T-32/T-33: datas e horas; T-37: localidade vigente. | Prevista; semântica externa depende de VAL-API. |
| RF-08 — Obter localização com consentimento | T-15: posição cancelável; T-25: ação explícita, prazo global e origem device sem persistência. | T-70: ação e explicação; T-82: aviso factual; T-29: alternativa manual; T-37: ligação ao hook. | Prevista; rótulo “Localização atual” dispensa identificação reversa. |
| RF-09 — Restaurar preferências locais | T-13: leitura/escrita restrita; T-23: salvar unidade; T-61: restaurar campos válidos e consultar cidade; T-25: não salvar posição do dispositivo. | T-37: restauração, estado e avisos na página. | Parcial: falta atribuir explicitamente a gravação da cidade manual no momento da seleção. |
| RF-10 — Limpar preferências | T-13: remoção verificável das duas chaves; T-62: intenção, resultado e proteção contra recriação por callback. | T-71: ação e feedback; T-37: ligação à página. | Prevista. |
| RF-11 — Apresentar unidades e dados ausentes | T-53: rótulos/arredondamento; T-07: datas/horas; T-57/T-59: condição desconhecida e métricas ausentes/inválidas; T-05: conversão usada na apresentação. | T-31/T-32/T-33: unidades, null/zero e dados parciais; T-37: unidade vigente. | Prevista. |

**Requisitos sem nenhuma tarefa correspondente:** nenhum entre RF-01 e RF-11. Isso não elimina lacunas em um comportamento específico ou evidências ainda pendentes.

**Pendência de RF-09:** T-13 implementa writeCity e T-61 lê a cidade, enquanto T-23 salva somente a unidade. Os critérios atuais de T-21 e T-37 não exigem explicitamente que selecionar uma cidade manual chame writeCity. AC-39 exige esse efeito e T-77 verifica as preferências em E2E, mas testes não implementam essa ligação.

**Correção sugerida:** atribuir essa chamada a T-21, adicionar T-13 às suas dependências no catálogo e no backlog executável e exigir como aceite: selecionar manualmente B substitui a cidade A salva; falha de gravação não impede consultar B e gera aviso/diagnóstico sanitizado; nenhuma posição do dispositivo é salva. A verificação deve contemplar AC-39 em T-77 e no teste focado de seleção de T-22. Até incorporar esse aceite e sua dependência, não marcar a cobertura de RF-09 como completa. A sugestão não cria tarefa ou conclusão implícita nesta matriz.

### Coberturas de teste dedicadas

| Cobertura obrigatória | Tarefas dedicadas | Ferramenta e comprovação |
|---|---|---|
| Conversão de unidade | T-06; T-54 para os rótulos derivados | Vitest: pares numéricos conhecidos, null, conversão sem acúmulo e arredondamento/formatação em suíte separada. |
| Services com mock de Fetch | T-10 (geocoding), T-12 (forecast) | Vitest: requests e payloads controlados, sucesso, erros de rede/HTTP/JSON, signal e no-store; sem chamadas reais. |
| Componentes em loading/erro/vazio | T-28; T-30 para a integração da apresentação de busca | Vitest + Testing Library + user-event: casos separados por estado, semântica acessível, callback de retry e ausência de seleção automática em vazio. |
| Fluxo principal E2E, incluindo mobile | T-38 (busca/seleção/atual), T-75 (previsão/C-F); T-74 configura os perfis e T-41 verifica layout | Playwright: percurso real da UI com rede interceptada, execução explícita a 320 e 1440 px e zero requests adicionais por C/F ou expansão de horas. |

Essas tarefas têm critérios próprios e são exigidas no gate T-48. Esta tabela referencia o catálogo, não cria tarefas adicionais nem substitui testes por aprovação documental. A verificação de layout móvel de T-41 complementa, mas não substitui, o fluxo funcional executado em mobile por T-38/T-75.

### Rastreabilidade geral

Os grupos abaixo indicam as tarefas de evidência predominantes; implementação e testes locais permanecem nas respectivas tarefas. Repetir um AC indica cobertura compartilhada, não redefinição do cenário.

| Critérios / qualidade | Tarefas de evidência |
|---|---|
| AC-01 a AC-04 | T-10, T-20, T-30, T-38 |
| AC-05 a AC-13 | T-08, T-54, T-58, T-60, T-12, T-34, T-68, T-69, T-38, T-75, T-76 |
| AC-14, AC-15 | T-06, T-63, T-24, T-36, T-75, T-77 |
| AC-16 a AC-19 | T-20, T-22, T-28, T-39 |
| AC-20, AC-21 | T-08, T-56, T-60, T-22, T-34, T-38 |
| AC-22 a AC-24 | T-16, T-26, T-72, T-40 |
| AC-25 a AC-29 | T-14, T-24, T-64, T-73, T-77 |
| AC-30, AC-31 | T-20, T-22, T-76 |
| AC-32 a AC-35 | T-10, T-58, T-60, T-30, T-34, T-38, T-39, T-76 |
| AC-36, AC-37 | T-06, T-54, T-20, T-63, T-75, T-76 |
| AC-38 a AC-41 | T-18, T-63, T-26, T-72, T-75, T-76, T-77, T-78 |
| AC-42 a AC-45 | T-20, T-22, T-26, T-30, T-72, T-38, T-39, T-40, T-76 |
| AC-46 a AC-49 | T-54, T-56, T-14, T-24, T-26, T-34, T-72, T-75, T-77, T-78, T-85 |
| RNF-01, RNF-07 | T-41, T-79, T-44 |
| RNF-02, RNF-03 | T-28, T-30, T-34, T-36, T-68, T-69, T-72, T-73, T-42, T-80, T-43 |
| RNF-04, RNF-08 | T-50, T-83, T-46, T-84, T-47 |
| RNF-05, RNF-06 | T-49, T-56, T-60, T-12, T-20, T-22, T-26, T-39, T-76, T-45 |
| RNF-09, RNF-10 | T-01, T-51, T-18, T-26, T-40, T-78, T-85, T-45, T-48 |

T-48 é o gate de liberação, não uma aprovação antecipada das tarefas. Este documento encerra a fase Tasks; não implica implementação, testes executados ou validação externa concluída.
