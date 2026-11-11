# Weather App — Especificação de Produto

## Overview

- **Fonte:** [Discovery](discovery.md).
- **Status:** decisões de produto e qualidade aprovadas pelo solicitante em 11/11/2026, conforme as recomendações apresentadas. A liberação para produção continua condicionada às evidências externas e de execução indicadas em Open Questions; aprovação de requisito não comprova seu atendimento.
- **Objetivo:** permitir consultar o clima atual e planejar atividades com uma previsão diária e horária para hoje e os próximos quatro dias.
- **Experiência:** web app responsivo, em pt-BR, acessível em celulares e computadores, sem cadastro ou autenticação.
- **Dados:** Open-Meteo, sem API key. Cobertura, condições de uso, atribuição e correspondência dos campos dependem de validação.
- **Referência temporal:** todas as datas, horários e limites dos dias usam o horário de Brasília (America/Sao_Paulo), mesmo para cidades de outros fusos. A interface deve identificar esse fuso.
- **Temperatura:** Celsius por padrão, com alternância para Fahrenheit e restauração da preferência local válida.
- **Privacidade:** localização opcional, sem persistência de preferências ou logs da aplicação no servidor; preferências limitadas ao navegador.

### Público e valor esperado

As personas são hipóteses, não resultados de pesquisa. O público prioritário e as métricas finais dependem de validação.

| Persona | Necessidade | Contexto | Meta candidata de sucesso |
|---|---|---|---|
| Marina, usuária em deslocamento | Entender o clima antes de sair | Principalmente celular | Encontrar a cidade e interpretar as condições em até 30 segundos, sem ambiguidade de unidade. |
| Rafael, planejador de viagem | Preparar-se para o destino | Desktop no planejamento e celular na viagem | Encontrar a previsão e identificar os dias relevantes em até 1 minuto. |
| Beatriz, organizadora de atividades ao ar livre | Escolher um dia para uma atividade | Celular e desktop | Identificar um dia adequado entre os cinco previstos sem informações complementares para interpretar a previsão. |

## Functional Requirements

| ID | Requisito | Comportamento esperado |
|---|---|---|
| RF-01 | Buscar cidades | Iniciar busca por ação explícita, removendo espaços nas extremidades e aceitando de 1 a 100 caracteres após essa remoção. Preservar acentos, hífens e apóstrofos. Não consultar entradas rejeitadas nem truncá-las silenciosamente. Tratar entrada e resultados como texto, sem executar conteúdo ou interpretar marcação. |
| RF-02 | Desambiguar resultados | Exibir nome da cidade, país e região disponíveis e usar coordenadas como identificação complementar quando necessário. Resultados sem identificação suficiente para distinguir a localidade ou com posição inválida não permitem seleção. Não selecionar automaticamente correspondência ambígua. |
| RF-03 | Exibir clima atual | Para a localidade selecionada, apresentar temperatura, sensação térmica, condição meteorológica, umidade e velocidade do vento. |
| RF-04 | Exibir previsão de cinco dias | Apresentar hoje mais quatro datas consecutivas em Brasília, com resumo diário e detalhamento por hora. Hoje inclui períodos com horário igual ou posterior ao instante da consulta; os outros quatro dias incluem todas as horas disponíveis. Recalcular esse recorte em cada nova consulta. |
| RF-05 | Alternar temperatura | Alternar entre Celsius e Fahrenheit em todas as temperaturas exibidas, sem mudar a cidade ou o período. Usar Celsius na ausência de preferência válida. |
| RF-06 | Tratar estados e recuperação | Diferenciar carregamento, vazio, sucesso, sucesso parcial e erro. Cada consulta de dados tem timeout de 10 segundos e nova tentativa manual, sem retentativa automática. Ocultar a previsão anterior ao trocar de localidade; em falha ao atualizar a mesma localidade, manter dados somente com aviso e horários originais. Somente a operação vigente atualiza estado e dados; não expor respostas brutas ou detalhes técnicos. |
| RF-07 | Identificar localidade e referência temporal | Exibir a localidade e distinguir a referência meteorológica da última consulta. Identificar o fuso de Brasília e não confundir resposta recém-obtida com dado recém-atualizado. |
| RF-08 | Obter localização com consentimento | Solicitar localização apenas após ação explícita e permissão do usuário, com prazo de até 10 segundos para obtenção da posição e término antecipado em caso de recusa. Usar “Localização atual” como identificação, sem depender de identificação reversa. Manter busca manual em recusa, timeout, falha ou ausência de suporte. Não salvar coordenadas do dispositivo. |
| RF-09 | Restaurar preferências locais | Salvar somente unidade e última cidade manual, com identificador, nome, país, região disponível e coordenadas dessa cidade. Restaurar cidade e unidade independentemente, descartando a parte inválida. Consultar automaticamente a cidade válida no mesmo navegador, sem pedir localização, usando a unidade válida ou Celsius. Sem histórico, previsão salva ou sincronização no servidor. Falha de restauração ou consulta não bloqueia busca manual. |
| RF-10 | Limpar preferências | Oferecer uma ação para remover a unidade e a cidade salvas no navegador. |
| RF-11 | Apresentar unidades e dados ausentes | Identificar temperaturas em °C ou °F e vento em km/h com uma casa decimal, e umidade e probabilidade em % inteiros; usar vírgula decimal. Datas em dd/MM/yyyy, horas em HH:mm e indicação “Horário de Brasília”. Arredondar ao mais próximo, com empates afastados de zero e zero negativo apresentado como zero na precisão do campo. Valores ausentes aparecem como “Indisponível”, nunca zero. |

### Conteúdo meteorológico

| Visão | Campos obrigatórios quando disponíveis |
|---|---|
| Atual | Temperatura, sensação térmica, condição meteorológica, umidade e velocidade do vento. |
| Diária | Data, condição meteorológica, temperaturas mínima e máxima e probabilidade máxima de precipitação. |
| Horária | Data e hora, temperatura, condição meteorológica e probabilidade de precipitação. |

O horizonte de RF-04 corresponde a datas de calendário de Brasília, não a uma janela móvel de 120 horas. Valores indisponíveis não autorizam substituir a métrica por outra sem indicação. A correspondência desses campos com os dados do Open-Meteo é uma validação pendente, não uma garantia de cobertura.

### Regras de dados e operação

| ID | Regra verificável |
|---|---|
| RD-01 | Uma posição só pode ser consultada com latitude numérica finita entre -90 e 90 e longitude numérica finita entre -180 e 180, inclusive. Coordenadas inválidas não geram consulta meteorológica. |
| RD-02 | Cada período exige data ou instante válido e associação inequívoca à localidade consultada. Não associar valores por aproximação de posição em uma lista quando suas datas estiverem ausentes ou inválidas. Períodos inválidos ficam indisponíveis; sem qualquer período ou dado atual utilizável e associável, apresentar erro de dados inválidos com recuperação. |
| RD-03 | Métricas numéricas devem ser finitas. Umidade e probabilidades pertencem a [0, 100]; vento não pode ser negativo; temperaturas negativas são válidas. Valores inválidos ou ausentes afetam somente os respectivos campos e aparecem como “Indisponível”, sem correção silenciosa. Condição desconhecida também é indisponível. |
| RD-04 | Um par diário em que mínima seja maior que máxima é inválido: não inverter os valores; indicar ambas indisponíveis e preservar os outros campos válidos. |
| RD-05 | A identidade da consulta é a cidade selecionada ou a posição autorizada, não o texto ainda em edição. Busca sem resultados não inicia previsão nem muda a identidade de dados anteriores. Uma nova seleção invalida respostas e erros meteorológicos anteriores; uma nova busca invalida respostas e erros da busca anterior. |
| RD-06 | Após timeout ou substituição, respostas tardias não podem atualizar dados, erros, carregamento, referência temporal ou preferências. Uma resposta de previsão não deve restaurar a unidade capturada no início da consulta se o usuário já a alterou. |
| RD-07 | Referência meteorológica é o instante de validade informado para o dado atual, não uma garantia de observação medida ou de atualização do modelo. Última consulta é o instante de recebimento da resposta vigente utilizável. Falhas e restauração de preferências não atualizam esses horários. A semântica fornecida pelo provedor depende de OQ-05. |
| RD-08 | Valores de conversão devem corresponder à relação Fahrenheit = Celsius × 9/5 + 32, sem acumular arredondamentos entre alternâncias. Converter antes de arredondar; RF-11 determina a apresentação. |
| RD-09 | A primeira versão não tem cache meteorológico nem funcionamento offline. Cada nova consulta busca dados no provedor; dados já visíveis podem permanecer em memória para leitura e recuperação de falha na mesma localidade, sem serem tratados como resposta nova. |
| RD-10 | A idade do dado atual é o intervalo entre a referência meteorológica válida e o instante da consulta. Acima de 60 minutos, exibir aviso de dado antigo sem ocultá-lo automaticamente. Com idade de exatamente 60 minutos não aplicar esse aviso; referência ausente ou futura indica atualidade não verificável, sem inventar referência substituta. Não aplicar o limite às datas futuras da previsão. A correspondência temporal da API permanece sujeita a validação. |

O recorte das horas usa o instante da consulta em Brasília; ausência de horas futuras em hoje não torna os outros quatro dias indisponíveis. Atualização de cidade restaurada, timeout e recuperação seguem RF-06 e RF-09, sem nova decisão de produto necessária.

## User Stories

| ID | Story | Requisitos |
|---|---|---|
| US-01 | Como Rafael, planejador de viagem, quero buscar e selecionar a cidade correta do destino para preparar minha viagem com informações da localidade desejada. | RF-01, RF-02 |
| US-02 | Como Marina, usuária em deslocamento, quero consultar o clima atual com unidades identificadas e indicação de dados ausentes para decidir como me preparar antes de sair sem confundir valores indisponíveis com zero. | RF-03, RF-11 |
| US-03 | Como Beatriz, organizadora de atividades ao ar livre, quero consultar a previsão de hoje e dos próximos quatro dias com detalhamento por hora para escolher um dia e um período adequados à atividade. | RF-04, RF-07, RF-11 |
| US-04 | Como Rafael, planejador de viagem, quero alternar as temperaturas entre Celsius e Fahrenheit para interpretar a previsão do destino na escala que conheço. | RF-05 |
| US-05 | Como Marina, usuária em deslocamento, quero identificar quando a consulta está carregando, não encontra resultados ou falha e tentar novamente quando possível para continuar a consulta antes de sair. | RF-06 |
| US-06 | Como Rafael, planejador de viagem, quero identificar a localidade, o fuso de Brasília, a referência meteorológica e o horário da última consulta para interpretar corretamente as datas e a atualidade dos dados do destino. | RF-07 |
| US-07 | Como Marina, usuária em deslocamento, quero escolher entre autorizar a localização do dispositivo e buscar uma cidade manualmente para consultar o clima mantendo controle sobre o compartilhamento da minha localização. | RF-08 |
| US-08 | Como Beatriz, organizadora de atividades ao ar livre, quero recuperar a última cidade e unidade escolhidas ao retornar no mesmo navegador para retomar o planejamento sem repetir minhas preferências. | RF-09 |
| US-09 | Como Rafael, planejador de viagem, quero apagar a cidade e a unidade salvas no navegador para controlar quais preferências da minha consulta permanecem no dispositivo. | RF-10 |

### Matriz de rastreabilidade

Os vínculos abaixo não criam requisitos adicionais. Critérios compartilhados devem gerar testes reutilizáveis, executados nas variações aplicáveis de cada fluxo, sem duplicar sua definição.

- **Qualidade comum a todas as stories:** RNF-01 (responsividade), RNF-02 (usabilidade), RNF-03 (acessibilidade) e RNF-07 (compatibilidade). Somar esses requisitos aos específicos de cada linha.
- **Diagnóstico transversal:** RNF-09 aplica-se a qualquer fluxo que produza logs; AC-41 verifica a política de erro e deve ser reutilizado nos fluxos com diagnóstico. Isso inclui falhas de armazenamento em US-08 e US-09.
- **Operação global:** RNF-08 aplica-se à entrega e abertura da aplicação inteira, não a um critério funcional isolado. Sua medição segue o protocolo de liberação e continua após o lançamento.

| User Story / Fluxo | Requisitos funcionais da story | Critérios específicos | Critérios compartilhados ou de integração | RNFs específicos, além dos comuns |
|---|---|---|---|---|
| US-01 — Buscar e selecionar cidade | RF-01, RF-02 | AC-01 a AC-04 | AC-17, AC-30, AC-32 a AC-34, AC-37, AC-42, AC-43 | RNF-04 (tempo de busca e consulta após seleção), RNF-06 (falhas e concorrência), RNF-10 (envio da localidade ao provedor). |
| US-02 — Consultar clima atual | RF-03, RF-11 | AC-05 a AC-07 | AC-14, AC-15, AC-35, AC-36, AC-40, AC-47, AC-48 | RNF-04 (tempo da previsão), RNF-05 (aviso de idade dos dados atuais), RNF-06 (dados parciais). |
| US-03 — Consultar previsão diária e horária | RF-04, RF-07, RF-11 | AC-08 a AC-13 | AC-06, AC-07, AC-15, AC-20, AC-21, AC-30, AC-35, AC-36, AC-40, AC-47 | RNF-04 (tempo da previsão), RNF-05 (não aplicar idade máxima às datas futuras), RNF-06 (cobertura parcial e concorrência). |
| US-04 — Alternar unidade | RF-05 | AC-14, AC-15 | AC-07, AC-36, AC-39, AC-40, AC-46, AC-47 | RNF-06 (alteração durante consulta ou com preferência inválida). |
| US-05 — Entender estados e recuperar falhas | RF-06 | AC-16 a AC-19 | AC-02, AC-24, AC-26, AC-29 a AC-31, AC-33 a AC-35, AC-37, AC-41, AC-44, AC-45 | RNF-04 (reportar falhas separadamente da latência de sucesso), RNF-06 (timeout e recuperação), RNF-09 (diagnóstico seguro). |
| US-06 — Identificar localidade e referência temporal | RF-07 | AC-20, AC-21 | AC-11, AC-12, AC-19, AC-23, AC-30, AC-31, AC-37, AC-45, AC-47, AC-48 | RNF-05 (idade e referência temporal), RNF-06 (preservação de identidade e horários em falhas). |
| US-07 — Usar localização com consentimento | RF-08 | AC-22 a AC-24 | AC-27, AC-34, AC-38, AC-44, AC-49 | RNF-04 (consulta meteorológica após obter posição; não confundir com o prazo de localização), RNF-06 (recusa, timeout e alternativa manual), RNF-09 (coordenadas fora dos logs), RNF-10 (consentimento e transparência). |
| US-08 — Restaurar preferências | RF-09 | AC-25 a AC-27 | AC-14, AC-39, AC-40, AC-46 | RNF-04 (nova previsão após restauração), RNF-06 (recuperação independente de cidade e unidade), RNF-10 (restrição de armazenamento e ausência de sincronização). |
| US-09 — Limpar preferências | RF-10 | AC-28, AC-29 | AC-14, AC-26 | RNF-06 (falha ao remover preferências), RNF-10 (controle dos dados locais). |

**Uso em tarefas e testes:** identificar a story, os RFs, os ACs e os RNFs de cada tarefa. As nove linhas cobrem AC-01 a AC-49; repetição de um ID indica cobertura compartilhada, não cenários diferentes. Dependências entre stories, como US-04/US-08 para unidade persistida, devem ser verificadas também em integração. Aprovar um AC funcional não comprova desempenho, acessibilidade, privacidade externa ou disponibilidade: esses RNFs exigem a evidência própria definida no protocolo de verificação.

## Acceptance Criteria

Cada linha é um cenário Given/When/Then, com precondições, ação e resultado verificável. Cenários enumerados na mesma linha devem ser executados separadamente para cada variação. Os dados meteorológicos, as respostas externas, o relógio, as permissões e o armazenamento devem ser controlados durante a verificação, sem depender de condições reais de rede ou clima.

Os IDs existentes são preservados. Os números nas precondições representam valores de referência; verificar seus rótulos conforme RF-11. Cada variação deve ser um caso independente. Timeout de dados e obtenção de posição são limites distintos de 10 segundos; permissão e posição permanecem sujeitas ao comportamento do navegador. Critérios que dependem do significado dos dados do provedor exigem validação externa, não nova aprovação das regras de produto.

### US-01 — Busca e seleção

| ID / Requisitos | Given | When | Then |
|---|---|---|---|
| AC-01 / RF-01 | A fonte retorna uma lista conhecida de cidades com posição e identificação válidas para o nome informado. | O usuário informa esse nome, inicia a busca e a resposta é recebida. | A lista retornada é apresentada e cada resultado válido permite seleção. |
| AC-02 / RF-01, RF-06 | O campo de busca está vazio ou contém somente espaços. | O usuário tenta iniciar a busca. | Nenhuma consulta à fonte é iniciada e aparece uma indicação de que é necessário informar uma cidade. |
| AC-03 / RF-02 | Dois resultados homônimos possuem identificadores distintos de país e região. | A lista é apresentada e o usuário seleciona o segundo resultado. | Cada resultado mostra os identificadores disponíveis e a consulta meteorológica iniciada corresponde ao segundo resultado, não ao primeiro. |
| AC-04 / RF-02 | Não há cidade selecionada e uma busca retorna múltiplas correspondências. | A lista é apresentada sem interação do usuário. | Nenhuma correspondência é confirmada e nenhuma consulta meteorológica é iniciada para esses resultados. |

### US-02 — Clima atual

| ID / Requisitos | Given | When | Then |
|---|---|---|---|
| AC-05 / RF-03 | Uma cidade está selecionada, a unidade é Celsius e a resposta contém temperatura de 20 °C, sensação de 18 °C, condição conhecida, umidade de 70% e vento de 12 km/h. | A consulta termina com sucesso. | Os cinco campos são exibidos para a cidade selecionada com esses valores e a condição correspondente. |
| AC-06 / RF-11 | Uma resposta contém um campo ausente ou nulo, outro campo numérico igual a zero e os demais válidos; repetir para campos atuais, diários e horários. | Os dados são apresentados. | O campo ausente indica “Indisponível”, o zero válido é exibido com sua unidade e os demais campos permanecem visíveis com seus valores. |
| AC-07 / RF-11 | Os dados contêm vento de 12 km/h, umidade de 70% e probabilidades diária e horária de 40%. | Os dados são apresentados e o usuário alterna Celsius/Fahrenheit. | Vento permanece em 12 km/h, umidade em 70% e ambas as probabilidades em 40%, com unidades identificadas. |

### US-03 — Previsão diária e horária

| ID / Requisitos | Given | When | Then |
|---|---|---|---|
| AC-08 / RF-04 | O relógio marca 11/11/2026 às 10h30 em Brasília e há cobertura completa. | A previsão é apresentada. | Os resumos abrangem exatamente 11, 12, 13, 14 e 15/11/2026, nessa ordem, sem sexto dia. |
| AC-09 / RF-04 | Há um conjunto conhecido de data, condição, mínima, máxima e probabilidade máxima de precipitação para cada um dos cinco dias. | Os resumos diários são apresentados. | Cada resumo exibe os cinco campos correspondentes à sua data, sem usar valores de outro dia ou uma probabilidade horária como substituta da máxima diária. |
| AC-10 / RF-04 | Há períodos horários com data, hora, temperatura, condição e probabilidade conhecidas dentro do horizonte elegível. | O usuário consulta o detalhamento por hora de cada dia. | Cada período disponível exibe esses cinco campos, pertence à data correspondente e aparece uma única vez. |
| AC-11 / RF-04, RF-07 | A referência é Brasília e existem dados horários completos; executar com o relógio às 10h30 e às 11h00, conforme AS-04. | O detalhamento é apresentado para hoje e os quatro dias seguintes. | Em ambos os cenários, hoje começa às 11h00 e não mostra períodos anteriores; nos outros quatro dias, todos os horários fornecidos são apresentados. |
| AC-12 / RF-04, RF-07 | A cidade e o dispositivo usam fusos diferentes de Brasília, há dados completos e o relógio marca 01/01/2027 às 02h59 UTC, equivalente a 31/12/2026 às 23h59 em Brasília. | Uma consulta é concluída nesse instante e outra às 03h00 UTC, equivalente à meia-noite de Brasília. | A primeira previsão abrange 31/12/2026 a 04/01/2027 e a segunda 01/01 a 05/01/2027; datas e horas identificam Brasília, independentemente do fuso do dispositivo. |
| AC-13 / RF-04, RF-11 | O horizonte contém cinco datas e a resposta não tem dados para uma delas, mas contém dados para um sexto dia. | A previsão é apresentada. | A data sem cobertura permanece identificada com indicação de indisponibilidade, as datas válidas mantêm seus dados e o sexto dia não substitui a data ausente. |

### US-04 — Unidade de temperatura

| ID / Requisitos | Given | When | Then |
|---|---|---|---|
| AC-14 / RF-05 | O navegador não tem unidade salva, tem uma unidade inválida ou tem Fahrenheit válido; executar cada cenário separadamente. | O app abre e uma consulta termina com sucesso. | Sem unidade válida, todas as temperaturas aparecem em °C; com Fahrenheit válido, aparecem em °F. |
| AC-15 / RF-05, RF-11 | Temperatura atual, sensação térmica, mínimas, máximas e temperaturas horárias valem 0 °C, com cidade, datas, vento e percentuais conhecidos. | O usuário alterna para Fahrenheit e depois retorna a Celsius. | Todas essas temperaturas passam a 32 °F e retornam a 0 °C com unidade identificada; cidade, datas, vento e percentuais permanecem inalterados. |

### US-05 — Estados e recuperação

| ID / Requisitos | Given | When | Then |
|---|---|---|---|
| AC-16 / RF-06 | O app está sem consulta prévia ou preferências restauradas; as respostas da busca e da consulta podem ser mantidas pendentes. | O usuário abre o app e depois inicia uma busca e uma consulta, em cenários separados. | Na abertura há um estado inicial sem erro; durante cada operação pendente há indicação de carregamento; após seu término, essa indicação é removida. |
| AC-17 / RF-06 | A busca por um nome retorna uma lista vazia e a busca por um segundo nome retorna correspondências. | O usuário pesquisa o primeiro nome e depois altera o campo e pesquisa o segundo. | A primeira busca informa ausência de resultados, sem erro de conexão; a segunda apresenta a nova lista e remove o estado vazio anterior. |
| AC-18 / RF-06 | A operação falha por desconexão, indisponibilidade do provedor ou limite de uso; executar cada falha na busca e na consulta meteorológica separadamente. | A falha ocorre e o usuário aciona nova tentativa, cuja resposta é bem-sucedida. | A falha encerra o carregamento e informa a impossibilidade de obter os dados, com opção de nova tentativa; o sucesso da tentativa exibe os resultados e remove o erro. |
| AC-19 / RF-06, RF-07 | Uma consulta de dados permanece pendente e há resultados anteriores da mesma localidade. | O relógio avança a 9.999 ms e depois a 10.000 ms sem resposta. | Antes do limite há carregamento; no limite ele termina e aparece timeout com nova tentativa manual, sem retentativa automática. Dados anteriores só permanecem com aviso e horários originais; respostas tardias não os atualizam. |

### US-06 — Localidade e atualidade

| ID / Requisitos | Given | When | Then |
|---|---|---|---|
| AC-20 / RF-07 | A resposta pertence à cidade selecionada e tem referência meteorológica às 09h00 de Brasília; a consulta termina às 10h00. | O resultado é apresentado. | A cidade aparece identificada, a referência é 09h00 e a última consulta é 10h00, com rótulos distintos e indicação de Brasília. |
| AC-21 / RF-07, RF-11 | A consulta termina às 10h00 sem referência meteorológica, ou duas consultas terminam às 10h00 e às 10h30 com a mesma referência das 09h00; executar separadamente. | Cada consulta termina com sucesso e o resultado é apresentado. | Sem referência, o campo indica “Indisponível”, não 10h00; nas consultas repetidas, a referência permanece 09h00 e somente a última consulta muda de 10h00 para 10h30. |

### US-07 — Localização opcional

| ID / Requisitos | Given | When | Then |
|---|---|---|---|
| AC-22 / RF-08 | A permissão de localização ainda não foi concedida; executar com e sem cidade salva. | O usuário abre o app, aguarda a restauração e, somente depois, aciona a opção de localização. | Antes da ação não há solicitação de localização; após a ação, o app inicia a obtenção de localização sujeita à permissão do navegador, sem usar nenhuma posição sem autorização. |
| AC-23 / RF-08 | O usuário autorizou localização e o dispositivo fornece uma posição conhecida dentro de 10 segundos, com resposta meteorológica correspondente. | O usuário solicita clima pela localização e a consulta termina. | A consulta usa a posição autorizada, exibe “Localização atual” e seus dados meteorológicos, sem herdar nome de cidade anterior nem salvar a posição do dispositivo. |
| AC-24 / RF-08 | A permissão é negada, a obtenção de posição falha ou o recurso não tem suporte; executar cada caso separadamente. | O usuário tenta usar localização e depois pesquisa uma cidade manualmente. | A impossibilidade de usar localização é informada; a busca manual retorna resultados sem solicitar nova permissão de localização. |

### US-08 — Preferências locais

| ID / Requisitos | Given | When | Then |
|---|---|---|---|
| AC-25 / RF-09 | O armazenamento contém cidade manual válida e Fahrenheit. | O usuário reabre o app e a nova consulta retorna sucesso ou falha, em casos separados. | Cidade e unidade são restauradas e uma consulta inicia automaticamente sem pedir localização. Sucesso mostra dados em Fahrenheit; falha permite nova tentativa e busca manual, sem inventar referência ou reutilizar previsão persistida. |
| AC-26 / RF-09 | As preferências estão corrompidas, a unidade é inválida ou o armazenamento está bloqueado; executar cada cenário separadamente, sem unidade válida disponível. | O usuário abre o app e pesquisa e seleciona uma cidade manualmente. | O app permite concluir a consulta e apresenta temperaturas em Celsius, sem bloquear o fluxo por falha de armazenamento. |
| AC-27 / RF-09 | O registro local contém apenas uma cidade selecionada manualmente e sua unidade, e a localização do dispositivo é uma posição distinta. | O usuário consulta o clima dessa posição com permissão e os registros locais e destinos das requisições são inspecionados. | As coordenadas obtidas do dispositivo não são adicionadas às preferências; não há envio de preferências para persistência em servidor nem dados de conta. Requisições meteorológicas necessárias não são confundidas com sincronização de preferências. |

### US-09 — Limpeza de preferências

| ID / Requisitos | Given | When | Then |
|---|---|---|---|
| AC-28 / RF-10 | Há cidade e unidade salvas e o navegador permite sua remoção. | O usuário executa a ação de limpar preferências e reabre o app sem fazer outra seleção. | Os dois registros foram removidos, a cidade anterior não é restaurada, Celsius é o padrão e a busca manual está disponível. |
| AC-29 / RF-10 | Há preferências salvas e o navegador impede sua remoção. | O usuário tenta limpar preferências e depois faz uma busca manual. | O app não informa sucesso na limpeza, indica que não foi possível concluí-la e permite pesquisar e consultar a cidade normalmente. |

### Cenários transversais — integridade, segurança e recuperação

As regras RD complementam os requisitos referenciados. Cada variação listada é um caso de teste separado; aplicar os limites e formatos aprovados nos requisitos.

| ID / Requisitos | Given | When | Then |
|---|---|---|---|
| AC-30 / RF-01, RF-02, RF-06, RF-07 | A busca A está pendente e uma busca B a substituiu; repetir com duas seleções meteorológicas. | A retorna sucesso ou erro antes ou depois da resposta de B. | Somente B pode atualizar o estado da respectiva operação; A não muda resultados, cidade, referência temporal, carregamento ou erro de B. |
| AC-31 / RF-06, RF-07 | A atingiu o timeout de 10 segundos e o usuário iniciou a tentativa B. | A retorna durante B ou após seu término. | A não encerra o carregamento de B nem substitui seus dados ou erro. |
| AC-32 / RF-01 | A fonte controlada possui correspondências para “São Paulo”, “Aix-en-Provence” e um nome com apóstrofo. | Cada nome é pesquisado separadamente. | A entrada é aceita e os resultados correspondentes ficam disponíveis para seleção. |
| AC-33 / RF-01, RF-06 | A entrada, um resultado ou uma resposta de erro contém marcação com conteúdo executável. | Esse conteúdo é apresentado ou o erro é tratado. | Nenhum conteúdo é executado ou interpretado como marcação; o erro visível não revela resposta bruta e uma busca válida posterior continua possível. |
| AC-34 / RF-02, RF-06 | Uma correspondência contém latitude ausente, latitude 91 ou longitude 181, em casos separados. | O usuário tenta selecionar essa correspondência. | Nenhuma previsão é solicitada para a posição inválida e o usuário recebe indicação da impossibilidade de usá-la, podendo escolher outro resultado ou buscar novamente. |
| AC-35 / RF-03, RF-04, RF-06, RF-11 | A resposta contém umidade de 101%, vento negativo, condição desconhecida, período com data inválida ou mínima maior que máxima, em casos separados. | A resposta é apresentada. | Aplicam-se RD-02 a RD-04: não há substituição ou correção silenciosa; campos e períodos válidos são preservados; sem qualquer dado utilizável e associável, aparece erro recuperável. |
| AC-36 / RF-05, RF-11 | As categorias de temperatura contêm 10 °C, -10 °C ou 12,5 °C, em casos separados. | O usuário alterna para Fahrenheit e retorna a Celsius. | Os rótulos passam respectivamente a “50,0 °F”, “14,0 °F” e “54,5 °F” e retornam a “10,0 °C”, “-10,0 °C” e “12,5 °C”; cidade, vento e percentuais não mudam. |
| AC-37 / RF-06, RF-07 | Há dados da cidade A e uma busca por outro nome retorna lista vazia. | O resultado da busca é apresentado. | Nenhuma previsão é solicitada para esse nome; se os dados de A permanecerem visíveis, continuam identificados como A e seus horários não mudam. |
| AC-38 / RF-08 | A permissão está concedida, negada ou ainda não decidida; repetir para cada estado com localização suportada. | O usuário abre o app e depois aciona localização. | Na abertura nenhuma posição é solicitada; após a ação, o app inicia obtenção com permissão concedida, mantém busca manual com recusa ou inicia o fluxo de permissão quando necessário, sem usar posição sem autorização. |
| AC-39 / RF-09 | Não há preferências e o armazenamento permite gravação. | O usuário seleciona manualmente A, escolhe Fahrenheit e depois seleciona B. | A preferência contém somente Fahrenheit e identificador, nome, país, região disponível e coordenadas de B, sem histórico de A, previsão ou coordenadas obtidas do dispositivo. |
| AC-40 / RF-05, RF-06 | Uma consulta inicia em Celsius e sua resposta fica pendente. | O usuário escolhe Fahrenheit e a resposta vigente chega. | Todas as temperaturas são apresentadas em Fahrenheit; a resposta não reverte a seleção ou a preferência para Celsius. |
| AC-41 / RF-06, RNF-09 | Uma falha contém cidade, coordenadas, identificador pessoal e resposta bruta conhecidos. | O erro é tratado e os registros e destinos das requisições são inspecionados. | O diagnóstico só contém os campos permitidos por RNF-09, sem esses dados sensíveis, envio automático ou persistência dos logs. Consultas meteorológicas e preferências locais são avaliadas separadamente. |
| AC-42 / RF-01 | Entradas têm 0, 1, 100 ou 101 caracteres após remoção de espaços nas extremidades. | O usuário confirma cada busca com a fonte controlada. | Somente entradas de 1 e 100 caracteres geram consulta; as demais recebem validação sem consulta nem truncamento. O termo enviado não contém espaços nas extremidades. |
| AC-43 / RF-02 | Há resultados homônimos com país ou região ausentes e coordenadas válidas distintas, ou resultados sem dados suficientes para diferenciá-los. | A lista é apresentada. | Coordenadas complementam a identificação no primeiro caso; resultados ainda indistinguíveis não permitem seleção e não geram previsão. |
| AC-44 / RF-08 | A solicitação explícita de localização permanece sem posição, ou a permissão é negada antes do prazo. | Passam 10 segundos desde a solicitação, ou a recusa chega. | A tentativa termina no prazo ou imediatamente na recusa, informa a falha e mantém busca manual; uma posição tardia da tentativa encerrada não inicia consulta meteorológica. |
| AC-45 / RF-06, RF-07 | Existem dados da cidade A. | Uma atualização de A falha ou o usuário seleciona B e a consulta de B falha, separadamente. | Na mesma cidade, dados só permanecem com aviso e horários originais; ao selecionar B, dados de A são ocultados e não reaparecem como resultados de B após a falha. |
| AC-46 / RF-09, RF-05 | Há cidade válida e unidade inválida, ou cidade inválida e Fahrenheit válido. | O app abre no mesmo navegador. | No primeiro caso, consulta automaticamente a cidade em Celsius; no segundo, mantém Fahrenheit e busca manual sem consultar a cidade inválida. Falha ao salvar preferências não impede a consulta. |
| AC-47 / RF-11 | Há instante equivalente a 11/11/2026 às 09h05 em Brasília, temperaturas de 1,25 °C e -1,25 °C, vento de 2,25 km/h, probabilidade de 40,5% e temperatura de -0,01 °C. | Os dados são apresentados em Celsius. | Exibe data “11/11/2026”, hora “09:05”, indicação “Horário de Brasília” e valores “1,3 °C”, “-1,3 °C”, “2,3 km/h”, “41%” e “0,0 °C”, respectivamente. |
| AC-48 / RF-07, RNF-05 | A consulta tem referência de exatamente 60 minutos atrás, 60 minutos e um segundo atrás, ausente ou futura. | Cada resposta é apresentada com relógio controlado. | Não há aviso de idade excessiva no primeiro caso; no segundo, os dados permanecem com aviso de dado antigo; nos dois últimos, informa atualidade não verificável sem substituir a referência pela consulta. Previsões futuras não recebem o aviso por esse limite. |
| AC-49 / RF-08, RNF-09 | Nenhuma localização foi autorizada e o usuário pode acessar a explicação de privacidade. | O usuário consulta a explicação e depois confirma ou recusa localização. | A explicação informa que localidade ou coordenadas necessárias à previsão serão enviadas ao provedor; recusa mantém consulta manual e nenhuma coordenada do dispositivo é enviada sem autorização. |

## Non-Functional Requirements

Requisitos e objetivos de qualidade aprovados em 11/11/2026. A aprovação define o compromisso de produto, não demonstra seu cumprimento. Restrições do plano gratuito e evidências de execução continuam sujeitas a validação.

| ID | Atributo | Requisito e verificação | Status |
|---|---|---|---|
| RNF-01 | Responsividade | Fluxo principal utilizável entre 320 px e 1440 px, sem rolagem horizontal ou perda de funções; verificar busca, seleção, leitura diária e horária, alternância e limpeza a 320, 768 e 1440 px. | Aprovado; execução pendente. |
| RNF-02 | Usabilidade | Informação compreensível e ações identificáveis em mobile e desktop; avaliar as tarefas das personas com usuários representativos. | Protocolo e metas finais pendentes. |
| RNF-03 | Acessibilidade | Atender WCAG 2.2 AA, incluindo teclado, foco visível, nomes acessíveis e leitura dos estados e resultados por tecnologia assistiva; avaliar manualmente e por verificações automatizadas. | Gate aprovado; conformidade ainda não verificada. |
| RNF-04 | Desempenho | p95 de até 3 segundos por fluxo, com 100 consultas de busca e 100 de previsão medidas separadamente, da ação até os resultados essenciais visíveis. Registrar rede, dispositivo e navegador de referência, contribuições da aplicação/provedor e falhas separadamente. | Objetivo aprovado; ambiente e resultados a registrar. |
| RNF-05 | Atualidade | Avaliar idade da referência do clima atual; acima de 60 minutos, avisar sem ocultar automaticamente o dado. Sem cache meteorológico nesta versão e sem limite de idade aplicado às datas futuras. | Regra aprovada; semântica da referência do provedor a validar. |
| RNF-06 | Resiliência | Falhas externas ou de armazenamento não provocam falha não tratada nem bloqueio permanente da busca manual; timeout de dados de 10 segundos, sem retentativa automática, e recuperação conforme RF-06. | Aprovado; execução pendente. |
| RNF-07 | Compatibilidade | Duas versões estáveis mais recentes de Chrome, Edge e Firefox no desktop, Safari no macOS/iOS e Chrome no Android. Fixar versões concretas na matriz de cada liberação e verificar fluxo completo. | Política aprovada; matriz concreta a registrar. |
| RNF-08 | Disponibilidade | Objetivo de 99,5% mensal para entrega e abertura da aplicação, por sondagem externa a cada cinco minutos; registrar falhas do provedor meteorológico separadamente. | Objetivo aprovado; não é SLA contratado nem disponibilidade comprovada. |
| RNF-09 | Privacidade dos logs | Diagnóstico somente no console do navegador, restrito a categoria do erro, operação, status HTTP, duração e horário; sem coordenadas, cidades pesquisadas, identificadores pessoais ou respostas completas. Verificar registros e ausência de envio automático e persistência de logs pela aplicação. | Política aprovada; logs externos exigem análise separada. |
| RNF-10 | Transparência e terceiros | Informar envio da localidade ou coordenadas necessárias ao provedor; sem analytics ou logs centralizados da aplicação. Antes do lançamento, verificar retenção e acesso dos logs de hospedagem e publicar avisos compatíveis, sem prometer ausência de registros por terceiros. | Política aprovada; análise externa pendente. |

O acesso e a permanência dos registros no console dependem do navegador e de quem controla o dispositivo. Logs da hospedagem e dados recebidos pelo Open-Meteo não são controlados pela política de logs da aplicação.

### Protocolo de verificação e liberação

- **Funcional:** executar AC-01 a AC-49 com respostas, permissões, armazenamento e relógio controlados. Cada variação deve ter resultado independente. A aprovação documental não substitui evidência de execução ou integração com a fonte real.
- **Responsividade:** verificar o fluxo completo a 320, 768 e 1440 px, em orientação retrato e paisagem quando aplicável; conteúdo horário pode ter navegação própria, mas não provocar rolagem horizontal da página ou controles inacessíveis.
- **Acessibilidade:** verificar teclado sem bloqueio de foco, foco visível, nomes dos controles, associação das mensagens de erro, anúncio dos estados e alternativa textual para condições meteorológicas. Uma análise automatizada sem erros não comprova WCAG 2.2 AA; registrar também avaliação manual e tecnologias assistivas utilizadas.
- **Desempenho:** medir 100 consultas de busca e 100 de previsão separadamente, incluindo rede e provedor, com contribuições separadas. Registrar previamente dispositivo, navegador e perfil de rede; calcular p95 dos sucessos e reportar a quantidade de falhas e seus tempos separadamente, sem interpretar erro rápido como resultado meteorológico rápido. Não realizar teste de carga no provedor: amostras reais devem respeitar cotas; testes controlados não comprovam latência externa.
- **Disponibilidade:** sondar entrega e abertura da aplicação a cada cinco minutos, em janela mensal, registrando falhas meteorológicas separadamente. Registrar incidentes, lacunas de medição e manutenção; ausência de dados não comprova disponibilidade. Console local não comprova histórico; selecionar monitoramento gratuito compatível no planejamento.
- **Privacidade:** inspecionar logs, armazenamento e destinos de rede com dados sintéticos; verificar AC-27, AC-39 e AC-41 e as práticas da hospedagem. Não usar localização pessoal real como evidência.
- **Gate de produção:** nenhum cenário obrigatório pode estar reprovado; registrar matriz de suporte, avaliação acessível, termos e cotas do provedor, privacidade externa e evidências de integração e desempenho. Disponibilidade mensal é objetivo contínuo, não pré-requisito de um mês de operação anterior ao primeiro lançamento. Não considerar uma meta cumprida por ausência de medição.

## Edge Cases

| Cenário | Resultado esperado | Referências |
|---|---|---|
| Nome vazio ou apenas espaços | Não consultar o provedor; indicar que é necessário informar uma cidade e manter o campo disponível para correção. | AC-02 |
| Cidade inexistente | Informar que nenhuma cidade foi encontrada, manter o campo editável e permitir nova busca, sem classificar a ausência como falha de conexão. | AC-17 |
| Nome com acentos, espaços, hífens ou apóstrofos | Aceitar caracteres legítimos dentro do limite de 1 a 100 caracteres após remover espaços nas extremidades; sem correspondência, apresentar estado vazio. | AC-17, AC-32, AC-42 |
| Entrada contendo marcação ou scripts | Tratar como texto, sem execução ou interpretação de marcação, mantendo a busca utilizável. | AC-33 |
| Geocoding concluído sem resultados | Não consultar previsão nem associar dados da cidade anterior ao nome sem correspondência. | AC-17, AC-37 |
| Cidades homônimas ou região ausente | Complementar identificadores com coordenadas; resultados ainda indistinguíveis não permitem seleção. | AC-03, AC-04, AC-43 |
| Falha de rede, limite de uso ou provedor indisponível | Encerrar carregamento, informar falha recuperável sem resposta bruta e oferecer nova tentativa. | AC-18, AC-33 |
| Timeout | Encerrar carregamento aos 10 segundos e ignorar respostas tardias; oferecer nova tentativa manual, sem repetição automática. | AC-19, AC-31, AC-44 |
| Campo meteorológico nulo, ausente ou sem correspondência conhecida | Indicar “Indisponível”; manter dados válidos e não substituir por zero ou outra métrica. A ausência de uma métrica isolada não deve impedir a exibição das demais. | AC-06, AC-13 |
| Resposta parcial com dados essenciais inválidos | Aplicar RD-01 a RD-04, preservando partes válidas sem atribuir dados a posições ou períodos inválidos. Sem conteúdo utilizável, apresentar erro recuperável. | AC-34, AC-35 |
| Respostas fora de ordem após nova busca ou seleção | Somente a operação vigente pode atualizar os resultados e seu estado, inclusive quando a resposta antiga é um erro. | AC-30, AC-31 |
| Unidade alterada durante consulta pendente | Apresentar o resultado com a unidade atualmente escolhida, sem restaurar uma preferência antiga. | AC-40 |
| Valor zero válido | Mostrar zero com a unidade correta, sem tratá-lo como ausência. | AC-06 |
| Cobertura diária ou horária incompleta | Indicar indisponibilidade dentro das cinco datas; não criar dados nem ampliar o horizonte. | AC-13 |
| Virada de dia, mês ou ano; cidade ou dispositivo em outro fuso | Preservar sequência de cinco datas pelo calendário de Brasília e identificar o fuso. | AC-08, AC-12 |
| Consulta próxima ao fim de hoje | Não incluir horários passados; indicar ausência de horas restantes se não houver períodos disponíveis. | AC-11, AS-04 |
| Referência meteorológica ausente, futura ou antiga | Não substituir pela última consulta; avisar quando atualidade não puder ser verificada ou a idade exceder 60 minutos, sem ocultar automaticamente o dado antigo. | AC-21, AC-48, RNF-05 |
| Localização negada, indisponível ou sem suporte | Manter alternativa manual sem bloquear o fluxo. | AC-24 |
| Preferências corrompidas ou armazenamento bloqueado | Recuperar cidade e unidade independentemente; usar Celsius sem unidade válida, manter busca manual e não afirmar limpeza se ela falhar. | AC-26, AC-29, AC-46 |
| Erro contendo coordenadas, nome de cidade ou resposta completa | Não incluir esses dados no diagnóstico; registrar somente os campos permitidos. | AC-41, RNF-09 |

## Assumptions

- **AS-01:** as três personas são hipóteses; não representam público prioritário confirmado nem validação de necessidade.
- **AS-02:** a busca manual usa nomes de cidades; a cobertura de grafias e nomes alternativos depende do provedor, sem correção ortográfica garantida. Códigos postais e busca independente por região estão fora do MVP.
- **AS-03:** a experiência considera uma localidade selecionada por vez; favoritos e comparação estão fora do MVP.
- **AS-04:** regra temporal aprovada: incluir horários iguais ou posteriores ao instante da consulta em Brasília, recalculando em cada nova consulta. Não há exigência de atualização automática contínua do recorte em uma tela ociosa.
- **AS-05:** as condições e variáveis do Open-Meteo permitirão atender ao contrato aprovado; isso deve ser validado, não tomado como garantia. Campos sem suporte não podem ser silenciosamente substituídos.
- **AS-06:** a decisão de salvar preferências em localStorage vem do discovery. A especificação descreve o comportamento visível e as restrições de dados, sem determinar sua implementação.
- **AS-07:** a restauração se limita ao navegador em que as preferências foram salvas; não oferece continuidade entre dispositivos ou garantia após limpeza dos dados do navegador.
- **AS-08:** não há validação externa do provedor ou pesquisa com usuários anexada a este documento. As metas aprovadas continuam pendentes de evidência de atendimento, não de aprovação de produto.

## Risks

Probabilidades qualitativas iniciais, sujeitas a revisão. Uma decisão aprovada reduz ambiguidade, mas não elimina riscos de execução ou dependências externas.

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Indisponibilidade, lentidão ou limites do Open-Meteo | Média | Alto: impede ou atrasa a consulta principal. | Validar condições de uso, definir recuperação e limite de espera e comunicar indisponibilidade. |
| Dados antigos ou cobertura insuficiente | Média | Alto: informações incompletas ou equivocadamente percebidas como atuais. | Verificar cobertura e frequência de atualização e distinguir referência meteorológica de consulta. |
| Seleção de cidade homônima incorreta | Alta | Alto: consulta de outra localidade. | Exibir identificadores de localização disponíveis e exigir seleção explícita. |
| Datas ou agregações divergentes do fuso de Brasília | Média | Alto: resumo diário e detalhe horário inconsistentes. | Validar correspondência temporal do provedor e testar fronteiras de dia em diferentes localidades. |
| Cobertura diária e horária incompatível com o contrato | Média | Alto: detalhamento incompleto ou resumo inconsistente. | Validar os cinco dias e os campos de referência; indicar dados ausentes sem ampliar o horizonte. |
| Mapeamento ou conversão incorreta de unidades | Média | Alto: valores apresentados com significado incorreto. | Confirmar definições das métricas e testar valores de referência, conversões e ausência de dados. |
| Lentidão móvel agravada pelo volume horário | Média | Alto: abandono ou dificuldade de consulta. | Medir o fluxo diário e horário em condições móveis representativas e validar metas antes da aprovação. |
| Incompatibilidade de navegador ou barreiras de acessibilidade | Média | Alto: parte dos usuários fica impedida de usar o produto. | Fechar matriz de suporte e critérios acessíveis; validar tarefas completas, não apenas telas isoladas. |
| Exposição de localização em diagnóstico ou dependências | Média | Alto: perda de privacidade. | Restringir logs aos campos permitidos e revisar separadamente hospedagem e tratamento de dados pelo provedor. |
| Preferências inválidas ou armazenamento indisponível | Média | Médio: falha na retomada da experiência. | Manter consulta independente do salvamento, permitir limpeza e fornecer padrões seguros. |
| Crescimento de escopo após aprovação do MVP | Média | Alto: retrabalho e divergência de prazo e aceite. | Aplicar as exclusões aprovadas e exigir nova decisão explícita para alterar a versão. |

## Out of Scope

### Exclusões confirmadas pelas decisões

- Cadastro, login e contas de usuário.
- Persistência de preferências em servidor e sincronização entre dispositivos por conta.
- Aplicativos nativos; a plataforma definida é web responsiva.
- Interface multilíngue nesta versão; idioma definido é pt-BR.
- Previsão além de hoje mais quatro dias nesta experiência.
- Envio automático de logs da aplicação a serviços centralizados e sua persistência em servidor.
- Salvamento automático de coordenadas obtidas do dispositivo nas preferências.

### Exclusões do MVP aprovadas em 11/11/2026

- Favoritos e histórico de cidades consultadas.
- Comparação entre cidades, alertas e notificações.
- Funcionamento meteorológico offline e cache meteorológico; dados já visíveis podem permanecer em memória somente conforme RF-06 e RD-09.
- Busca por código postal ou região como entrada independente.
- Identificação reversa da cidade a partir da posição do dispositivo; consultas por posição usam “Localização atual”.
- Analytics, serviços pagos de dados ou hospedagem e cobrança automática por excedentes.

Essas capacidades não são entregáveis desta versão. Sua inclusão exige mudança explícita de escopo; orçamento zero e uso não comercial permanecem restrições aprovadas.

## Open Questions

### Restrições aprovadas de uso e orçamento

- **Uso não comercial:** o produto deve operar nessa modalidade; qualquer mudança para uso comercial exige nova avaliação dos termos e custos dos serviços.
- **Público estimado: 100 usuários.** Trata-se de estimativa de público, não de 100 acessos simultâneos nem de uma quantidade definida de consultas por dia. Frequência de uso e pico de concorrência ainda precisam ser estimados para verificar as cotas.
- **Orçamento: R$ 0 para dados e hospedagem.** A solução deve caber em modalidades gratuitas compatíveis com o uso pretendido, sem serviços pagos ou cobrança automática por excedentes. Se as cotas não atenderem ao uso, revisar escopo ou orçamento antes de contratar qualquer recurso pago.
- **Hospedagem gratuita:** a escolha permanece para o planejamento técnico, condicionada a HTTPS para localização no navegador, permissões de uso, cotas e práticas de logs compatíveis com os requisitos. Não se presume SLA contratado; 99,5% é objetivo mensal aprovado cuja viabilidade e atendimento precisam ser medidos.

As referências OQ são mantidas para rastreabilidade. Itens resolvidos não exigem nova pergunta; itens pendentes tratam de evidência externa, pesquisa ou configuração de execução, não de reabertura das decisões aprovadas.

| ID | Tema e pergunta | Impacto de seguir sem resposta |
|---|---|---|
| OQ-01 | Pesquisa posterior: personas mantidas como hipóteses; prioridade e métricas de negócio podem ser validadas com usuários. | Não bloqueia implementação do MVP aprovado; não afirmar validação de mercado inexistente. |
| OQ-02 | Resolvida: MVP limitado aos RFs e exclusões de Out of Scope, aprovado pelo solicitante em 11/11/2026. | Novas capacidades exigem mudança explícita de escopo. |
| OQ-03 | Resolvida: busca por nome de 1 a 100 caracteres, desambiguação complementar por coordenadas, rótulo “Localização atual” e lista de preferências em RF-09. | Validar integração, sem reabrir regras de produto. |
| OQ-04 | Política aprovada: transparência sobre envio ao provedor, sem analytics ou logs centralizados. Pendente verificar dados recebidos por terceiros e retenção e acesso de logs da hospedagem escolhida. | Revisão externa e avisos necessários antes do lançamento, sem prometer ausência de registros por terceiros. |
| OQ-05 | Regra aprovada: aviso acima de 60 minutos da referência atual, sem cache. Pendente confirmar o significado e a disponibilidade dessa referência no provedor. | Evidência necessária para AC-20, AC-21 e AC-48; não inventar atualização do modelo. |
| OQ-06 | Recorte horário aprovado em RF-04 e AS-04. Pendente comprovar campos, agregações e períodos do Open-Meteo para Brasília. | Validar correspondência dos dados antes de aprovar integração. |
| OQ-07 | Resolvida: formatos, unidades, precisão e arredondamento em RF-11 e RD-08. | Executar AC-15, AC-36 e AC-47. |
| OQ-08 | Provedor e orçamento: os termos gratuitos atuais do Open-Meteo permitem este uso não comercial? Cobertura, atribuição, limites e atualização atendem ao volume de consultas a estimar para 100 usuários, sem custos? | Público estimado não determina consumo; incompatibilidade de termos ou cotas exige revisão de uso, escopo ou orçamento, sem adoção automática de serviços pagos. |
| OQ-09 | Política aprovada: WCAG 2.2 AA e duas versões estáveis dos navegadores definidos em RNF-07. Registrar versões concretas, dispositivos e tecnologias assistivas da liberação. | Evidência de execução pendente; não alegar conformidade por aprovação documental. |
| OQ-10 | Resolvidas as regras: timeout de 10 segundos, nova tentativa manual, recuperação e restauração automática. Objetivos e protocolos aprovados em RNF-04 e RNF-08; registrar ambiente de referência, monitoramento gratuito e resultados no planejamento e na execução. | Viabilidade e atendimento ainda não medidos; não executar carga no provedor nem prometer SLA contratado. |

As decisões de produto permitem seguir ao planejamento e à derivação de testes. Integração real e lançamento dependem de validar provedor, referência temporal e privacidade externa, além de registrar evidências de qualidade. Esta especificação não substitui o plano e a lista de tarefas do fluxo SDD.

### Registro de aprovação

- **Aprovador:** solicitante do projeto, nesta conversa, em 11/11/2026.
- **Escopo aprovado:** recomendações para os itens 1 a 9 e 11 a 12, incluindo medição de qualidade; modalidade não comercial, 100 usuários estimados e orçamento zero aprovados separadamente. Regras incorporadas em RF-01 a RF-11, RD-01 a RD-10 e RNF-01 a RNF-10.
- **Limite da aprovação:** não comprova termos atuais, capacidade, cobertura, latência ou disponibilidade do Open-Meteo; não cria frequência de consultas ou concorrência que não tenham sido estimadas.
- **Evidência de aceite:** registrar versão da especificação, IDs executados, dados de referência, ambiente, versões de navegador e dispositivo, resultado e falhas. Catálogo atual: AC-01 a AC-49; revisão documental não equivale à execução dos testes.

### Capacidade do Open-Meteo — situação e validação leve

- **Situação em 11/11/2026:** validação externa não executada. Esta sessão não disponibilizou ferramenta de acesso HTTP, navegação web ou execução de terminal. Nenhum endpoint foi consultado e não há tempos de resposta, amostras de payload ou condições comerciais atuais comprovados por esta revisão.
- **Consequência:** AS-05 e AS-08 permanecem aplicáveis; verificações externas de OQ-04, OQ-05, OQ-06 e OQ-08 continuam pendentes. OQ-03 foi resolvida por decisão de produto. Links abaixo não significam consulta realizada nesta sessão.
- **Fontes oficiais para consulta:** [Forecast API](https://open-meteo.com/en/docs), [Geocoding API](https://open-meteo.com/en/docs/geocoding-api), [Termos de uso](https://open-meteo.com/en/terms) e [Preços e condições de acesso](https://open-meteo.com/en/pricing).

| Capacidade necessária | Evidência a obter | Situação / decisão se não atendida |
|---|---|---|
| Busca de cidades e desambiguação | Uma resposta de geocoding para nome acentuado, verificando identificador, nome, país, região e coordenadas disponíveis. | Não verificada; adaptar identificadores visíveis sem pressupor campos sempre presentes. |
| Clima atual com cinco métricas | Uma resposta com temperatura, sensação, condição, umidade e vento, suas unidades e referência temporal. | Não verificada; não prometer observação medida ou atualização do modelo sem evidência do significado dos dados. |
| Cinco dias e resumos diários | Cinco datas em Brasília, mínima, máxima, condição e probabilidade máxima diária; confirmar a definição da agregação na documentação. | Não verificada; não substituir a máxima diária por probabilidade de outra janela sem aprovação. |
| Detalhamento horário | Períodos para as cinco datas, com temperatura, condição e probabilidade, incluindo avaliação de ausência de dados. | Não verificada; documentar a cobertura real e aplicar indisponibilidade parcial quando necessário. |
| Fuso de Brasília para cidade em outro fuso | Resposta temporal coerente para uma cidade brasileira e uma cidade fora desse fuso; comparar datas, horas e agrupamento diário. | Não verificada; não considerar simples mudança de rótulo como conversão temporal ou reagrupamento diário. |
| Identificação da consulta por posição | Confirmar que a previsão aceita a posição autorizada; identificação reversa não é necessária. | Regra aprovada: usar “Localização atual”, sem contratar serviço adicional de identificação reversa. Consulta real por posição ainda não verificada. |
| Acesso sem chave e condições de uso | Documentação vigente comprovando elegibilidade do uso não comercial, atribuição, limites e gratuidade para o consumo estimado de 100 usuários; registrar frequência de consultas e pico esperado, ainda não definidos. | Uso não comercial e orçamento zero aprovados; adequação aos termos e cotas ainda não verificada. “Sem API key” não comprova acesso gratuito irrestrito ou SLA. |
| Uso no navegador | Permissão efetiva de chamadas a partir da origem prevista, inclusive comportamento de acesso entre origens. | Não verificada; teste HTTP fora do navegador, isoladamente, não comprova funcionamento no navegador. |
| Atualidade, desempenho e disponibilidade | Significado da referência temporal e condições publicadas de atualização; protocolo separado para medir metas da aplicação. | Não verificada; poucas consultas não comprovam idade máxima de 60 minutos, percentil de 3 segundos ou disponibilidade de 99,5%. |

**Orçamento de validação leve quando houver acesso:** ler a documentação relevante e fazer até quatro consultas sequenciais: uma de geocoding com nome acentuado, uma sem correspondência e duas de previsão para localidades em fusos distintos, cobrindo apenas as métricas e os cinco dias requeridos. Limitar cada consulta a 10 segundos e o conjunto a 40 segundos de espera de rede, sem retentativas automáticas, carga concorrente, instalações ou servidor local. Esse procedimento não substitui a amostra de desempenho nem comprova seu objetivo aprovado.

Registrar data/hora, localidade de teste, status, duração e tamanho da resposta, unidades, quantidade de datas e períodos e campos ausentes, sem dados pessoais reais. Interromper ao atingir o orçamento ou receber indicação de limite de uso. Verificação de navegador fica como etapa própria; medições pontuais são evidência de compatibilidade funcional da amostra, não aprovação de performance, cobertura mundial ou disponibilidade. Se o acesso continuar indisponível, manter a matriz como não verificada e não substituir evidência externa por suposições.
