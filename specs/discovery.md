# Discovery: Aplicação de Previsão do Tempo

## Resumo Executivo

- O Weather App permitirá buscar cidades, consultar o clima atual e visualizar a previsão diária e por hora para hoje e os próximos quatro dias.
- A experiência será adaptada a celulares e computadores, em português, com horários de Brasília e alternância entre Celsius e Fahrenheit.
- O acesso será sem cadastro, com localização opcional mediante consentimento e preferências salvas apenas no navegador.
- Os principais riscos são indisponibilidade dos dados, informações desatualizadas e dificuldades de uso, tratados com mensagens claras e validação de qualidade.
- As decisões centrais estão registradas; público prioritário, limites da primeira versão e metas finais de qualidade ainda precisam ser validados.

## Contexto

A empresa solicitou uma aplicação para consultar informações meteorológicas por cidade. A experiência deve permitir encontrar uma localidade, visualizar as condições atuais e consultar a previsão dos próximos cinco dias. A temperatura deve poder ser exibida em Celsius ou Fahrenheit, e a aplicação precisa funcionar em dispositivos móveis.

O produto será um web app responsivo em pt-BR, com dados do Open-Meteo. A previsão terá dados diários e detalhamento por hora para hoje mais quatro dias, usando o fuso de Brasília. Os campos meteorológicos estão definidos abaixo; o público-alvo, a correspondência desses campos na API e os critérios finais de qualidade ainda precisam ser validados.

## Requisitos Funcionais

- **RF-01 — Buscar cidades:** O usuário deve poder informar o nome de uma cidade e iniciar uma busca por suas informações meteorológicas.
- **RF-02 — Desambiguar resultados:** Quando houver mais de uma cidade correspondente, a aplicação deve permitir identificar a localidade correta, por exemplo, exibindo país e região quando disponíveis.
- **RF-03 — Exibir clima atual:** Após selecionar uma cidade, a aplicação deve apresentar temperatura, sensação térmica, condição meteorológica, umidade e velocidade do vento.
- **RF-04 — Exibir previsão de cinco dias:** A aplicação deve apresentar dados diários e detalhamento por hora para hoje mais quatro dias consecutivos. Datas, horários e limites dos dias devem usar o fuso de Brasília (America/Sao_Paulo), inclusive para cidades de outros fusos. Cada resumo diário deve exibir data, condição meteorológica, temperaturas mínima e máxima e probabilidade máxima de precipitação. Cada período horário deve exibir data e hora, temperatura, condição meteorológica e probabilidade de precipitação. Para hoje, devem ser mostradas as horas restantes; para os próximos quatro dias, todas as horas disponíveis.
- **RF-05 — Alternar unidade de temperatura:** O usuário deve poder alternar entre Celsius e Fahrenheit. A unidade escolhida deve ser aplicada de forma consistente às temperaturas exibidas. Celsius deve ser usado quando não houver preferência local salva.
- **RF-06 — Tratar estados da busca e consulta:** A aplicação deve informar quando estiver carregando dados, quando não houver resultados e quando ocorrer um erro que impeça a consulta, incluindo indisponibilidade da fonte meteorológica ou da conexão. Em caso de falha recuperável, deve informar que não foi possível obter dados atuais e oferecer uma forma de tentar novamente.
- **RF-07 — Identificar localidade e atualização:** A aplicação deve apresentar a localidade selecionada e distinguir o horário de referência meteorológica do horário da última consulta. Datas e horários devem indicar o fuso de Brasília. Uma consulta recente não deve ser apresentada como evidência de atualização recente pelo provedor.
- **RF-08 — Consultar localização com consentimento:** A solicitação de localização deve ocorrer após ação explícita do usuário e depender de sua permissão. A busca manual deve permanecer disponível, inclusive quando a permissão for negada ou a localização falhar.
- **RF-09 — Restaurar preferências locais:** A última unidade escolhida e a cidade selecionada devem ser salvas em localStorage e restauradas no mesmo navegador, com apenas os dados mínimos necessários para consultar a cidade novamente. Não salvar automaticamente coordenadas obtidas pela localização do dispositivo. Não haverá sincronização por conta nem persistência dessas preferências no servidor. Se os dados estiverem inválidos ou o armazenamento indisponível, a consulta deve continuar funcionando com Celsius como padrão e busca manual disponível.
- **RF-10 — Limpar preferências:** O usuário deve poder remover a unidade e a cidade salvas no navegador.
- **RF-11 — Apresentar unidades e dados ausentes:** Temperaturas devem usar °C ou °F conforme a seleção; vento deve usar km/h; umidade e probabilidade de precipitação devem usar %. Valores ausentes devem aparecer como “Indisponível”, nunca como zero.

## Requisitos Não-Funcionais

As metas quantitativas abaixo são propostas iniciais para validação com as partes interessadas; não representam compromissos aprovados.

- **RNF-01 — Responsividade:** O fluxo principal deve funcionar em larguras de tela de 320 px a 1440 px, sem rolagem horizontal ou perda de funcionalidades essenciais.
- **RNF-02 — Usabilidade:** A busca e a leitura das informações meteorológicas devem ser claras e diretas. Os critérios de avaliação com usuários ainda precisam ser definidos.
- **RNF-03 — Acessibilidade:** A aplicação deve buscar conformidade com WCAG 2.2 nível AA, incluindo operação por teclado, foco visível, nomes acessíveis para controles e compatibilidade com leitores de tela.
- **RNF-04 — Desempenho:** Em condições de rede de referência, 95% das consultas devem apresentar os resultados em até 3 segundos. O tempo de resposta da aplicação e o da fonte externa devem ser medidos separadamente.
- **RNF-05 — Atualização dos dados:** A proposta de até 60 minutos deve ser validada com o provedor para a atualidade dos dados meteorológicos atuais ou para a política de atualização do cache; não se aplica às datas futuras da previsão. O critério final ainda deve distinguir idade da referência meteorológica e tempo desde a última consulta. A interface deve identificar quando dados recentes não puderem ser obtidos.
- **RNF-06 — Resiliência:** Falhas ou lentidão da fonte externa não devem causar falha não tratada na aplicação nem levar dados desatualizados a serem apresentados como atuais.
- **RNF-07 — Compatibilidade:** Navegadores, versões e sistemas operacionais suportados devem ser definidos e incluídos na validação do produto.
- **RNF-08 — Disponibilidade:** A meta inicial sugerida é disponibilidade mensal de 99,5% para a aplicação. O cálculo deve distinguir a disponibilidade da aplicação da disponibilidade da fonte meteorológica externa.
- **RNF-09 — Privacidade dos logs:** Os logs da aplicação devem ter finalidade exclusiva de diagnóstico técnico e permanecer no console do navegador, sem envio automático ou armazenamento persistente pela aplicação. Devem limitar-se a categoria do erro, operação, status HTTP, duração e horário, excluindo coordenadas, cidade pesquisada, identificadores pessoais e respostas completas da API. A permanência e o acesso ao console dependem do navegador e de quem controla o dispositivo. Logs da hospedagem e dados enviados ao provedor devem ser avaliados separadamente.

## Riscos

As probabilidades são estimativas iniciais, atualizadas conforme as decisões registradas. Devem ser revistas após validar os contratos do Open-Meteo e os critérios de qualidade.

| Risco | Tipo | Probabilidade | Impacto | Mitigação |
|---|---|---|---|---|
| Indisponibilidade, lentidão ou limite de uso do provedor meteorológico | Técnico | Média | Alto: consultas podem falhar ou demorar, afetando a função principal do app. | Definir timeout e retentativas limitadas; monitorar o provedor; comunicar falhas sem apresentar dados antigos como atuais. |
| Dados desatualizados ou cobertura insuficiente para algumas localidades | Técnico / Produto | Média | Alto: previsões podem ser incompletas ou inadequadas à cidade selecionada. | Validar cobertura e frequência de atualização; exibir o horário dos dados e indicar quando não houver informação recente. |
| Seleção da cidade errada em buscas ambíguas | Produto | Alta | Alto: o usuário recebe informações de outra localidade. | Mostrar país e região nos resultados e solicitar seleção explícita quando houver correspondências semelhantes. |
| Divergência entre o fuso de Brasília e o fuso da cidade consultada | Técnico / Produto | Média | Alto: datas e resumos diários podem divergir dos horários apresentados, confundindo usuários de outras regiões. | Identificar o fuso na interface, validar a referência temporal dos dados do provedor e testar viradas de dia e cidades em outros fusos. |
| Inconsistência ou ausência de dados diários e horários | Técnico | Média | Alto: o detalhamento por hora pode não cobrir os cinco dias ou não corresponder aos resumos diários. | Validar campos, cobertura temporal e suporte ao fuso de Brasília no Open-Meteo; definir tratamento de dados parciais e testes de consistência. |
| Mapeamento incorreto dos campos, unidades ou horários da API | Técnico | Média | Alto: valores, agregações ou datas exibidos podem representar informações diferentes das aprovadas. | Confirmar campos, unidades e agregações na documentação do Open-Meteo; testar conversões, dados ausentes e referência temporal antes de fechar o contrato técnico. |
| Lentidão em redes móveis ou dispositivos de baixo desempenho | Técnico | Média | Alto: usuários podem abandonar a busca antes de ver os resultados. | Definir metas de desempenho, testar em redes e dispositivos de referência e apresentar estados de carregamento e erro. |
| Incompatibilidade entre telas, navegadores ou dispositivos | Técnico | Média | Médio: partes do fluxo podem ficar difíceis ou impossíveis de usar. | Especificar plataformas suportadas e validar o fluxo principal em larguras de tela e navegadores representativos. |
| Barreiras de acessibilidade | Produto / Técnico | Média | Alto: pessoas que usam teclado ou tecnologias assistivas podem não conseguir consultar a previsão. | Adotar critérios verificáveis, testar navegação por teclado e leitor de tela e corrigir problemas antes do lançamento. |
| Exposição de localização ou consultas em logs | Técnico / Privacidade | Média | Alto: registros podem revelar dados pessoais e contrariar a restrição de persistência no servidor. | Aplicar a lista permitida de dados de diagnóstico, excluir coordenadas, cidades e respostas completas, manter logs apenas no console e revisar separadamente logs da hospedagem e envio de dados ao provedor. |
| Armazenamento local indisponível ou preferências inválidas | Técnico | Média | Médio: a restauração pode falhar ou impedir a consulta. | Validar preferências ao restaurar; manter a consulta funcionando sem armazenamento e usar Celsius quando não houver unidade válida. |
| Crescimento do escopo por falta de limites para a primeira versão | Produto | Alta | Alto: prazo e esforço podem aumentar sem alinhamento sobre o que será entregue. | Definir MVP, itens explicitamente fora de escopo, responsáveis pelas decisões e critérios de aceite antes do planejamento. |

## Perguntas em Aberto

### Produto e escopo

1. **Objetivo e público:** Quem usará o app, em que contexto e qual resultado definirá o sucesso?
   **Impacto:** Sem isso, fica difícil priorizar funcionalidades e avaliar se o produto atende à necessidade.

2. **Escopo inicial:** Quais capacidades entram na primeira versão e quais ficam fora, como favoritos, comparação de cidades ou alertas?
   **Impacto:** Reduz o risco de crescimento do escopo e divergências sobre o que significa concluir a entrega.

### Busca e localidades

3. **Busca de cidades:** A busca aceita apenas nomes ou também códigos postais e regiões? Como diferenciar cidades homônimas?
   **Impacto:** Usuários podem não encontrar ou selecionar a localidade correta.

4. **Privacidade das dependências:** Quais dados são enviados ao Open-Meteo e quais logs a hospedagem mantém? Quais avisos de privacidade são necessários?
   **Impacto:** A política de logs do navegador não controla o tratamento de dados por provedores externos e pela hospedagem.

### Informações meteorológicas

5. **Atualidade e referência temporal:** Qual referência do provedor permite avaliar a atualidade do clima atual? A proposta de 60 minutos será aplicada à referência meteorológica ou à atualização do cache?
   **Impacto:** Confundir atualização da consulta com atualização meteorológica pode levar à apresentação de dados antigos como atuais.

6. **Correspondência dos dados na API:** Quais campos e agregações do Open-Meteo correspondem ao contrato aprovado, inclusive à probabilidade máxima diária de precipitação e ao fuso de Brasília?
   **Impacto:** Um mapeamento incorreto pode produzir resumos inconsistentes com o detalhamento por hora e exigir retrabalho na integração.

7. **Formatação e precisão:** Quais formatos de data e hora e regras de arredondamento serão usados para temperaturas, vento e percentuais?
   **Impacto:** Sem regras comuns, a apresentação pode ficar inconsistente entre clima atual, resumos diários e detalhes horários.

### Operação e qualidade

8. **Condições da fonte meteorológica:** Com Open-Meteo definido, sua cobertura, atribuição, limites de uso e frequência de atualização atendem às necessidades do produto?
   **Impacto:** Limitações do provedor ainda podem afetar cobertura, qualidade ou viabilidade do produto.

9. **Compatibilidade e acessibilidade:** Para o web app responsivo, quais navegadores, versões, dispositivos e critérios de acessibilidade devem ser atendidos?
   **Impacto:** Define a matriz de testes e quais usuários conseguirão utilizar o produto.

10. **Validação das metas e falhas:** Em quais condições serão avaliadas as propostas de 3 segundos, 99,5% de disponibilidade e idade máxima de 60 minutos? Como o app deve se comportar quando a conexão ou o provedor falhar?
    **Impacto:** Sem limites e comportamento definidos, não há critérios objetivos de aceitação nem experiência previsível durante falhas.

## Suposições

- A busca manual é feita pelo nome da cidade; suporte a códigos postais ainda precisa ser confirmado.
- O escopo inicial inclui uma cidade selecionada por consulta; comparação entre várias cidades não foi solicitada.
- A correspondência dos campos aprovados com os campos e agregações do Open-Meteo será validada antes da implementação.
- A alternância Celsius/Fahrenheit afeta a apresentação dos dados, não a cidade ou a fonte consultada.
- A aplicação deve ser utilizável em telas móveis e maiores, conforme os critérios de responsividade a validar.
- Os níveis de suporte a navegadores e dispositivos ainda serão definidos nas próximas etapas do fluxo SDD.

## Decisões

- **Fonte de dados: Open-Meteo, sem API key.** A escolha atende à necessidade de dados meteorológicos sem exigir credenciais de API. Resolve a definição do provedor e a necessidade de chave; cobertura, atribuição, limites e atualização continuam sujeitos a validação.
- **Horizonte e fuso: hoje mais quatro dias no horário de Brasília (America/Sao_Paulo).** Define cinco datas consecutivas, começando hoje nesse fuso, inclusive para cidades de outras regiões. Resolve a janela temporal e o fuso; exige validar a correspondência dos dados diários e horários do provedor.
- **Unidade padrão: Celsius.** Estabelece a unidade inicial, mantendo a alternância entre Celsius e Fahrenheit prevista no requisito funcional. Resolve a dúvida sobre o padrão inicial.
- **Sem autenticação e sem persistência de servidor.** Mantém o acesso sem conta e sem armazenamento de preferências ou logs da aplicação no servidor. Logs centralizados exigiriam nova decisão sobre destino, acesso, retenção e privacidade. Logs da hospedagem devem ser verificados separadamente.
- **Idioma da interface: pt-BR.** Define o idioma da interface para a primeira versão. Resolve a escolha do idioma da UI; formatos regionais e convenções para datas e horários ainda devem ser definidos.
- **Plataforma: web app responsivo.** Atende ao uso em mobile e desktop sem incluir aplicativo nativo. Resolve o tipo de plataforma; navegadores e versões suportados continuam pendentes.
- **Contrato meteorológico aprovado.** O clima atual inclui temperatura, sensação térmica, condição, umidade e velocidade do vento. O resumo diário inclui data, condição, temperaturas mínima e máxima e probabilidade máxima de precipitação. O detalhe horário inclui data e hora, temperatura, condição e probabilidade de precipitação. Resolve a escolha dos campos e da granularidade; sua correspondência na API ainda deve ser validada.
- **Períodos horários e dados ausentes.** Exibir as horas restantes de hoje e todas as horas disponíveis dos quatro dias seguintes, em Brasília, identificando o fuso na interface. Valores ausentes aparecem como “Indisponível”, nunca zero. Resolve o tratamento de horas passadas e dados parciais.
- **Unidades por métrica.** Temperaturas em °C ou °F; vento em km/h; umidade e probabilidade de precipitação em %. Resolve as unidades adicionais, mantendo formatos e arredondamento pendentes.
- **Referência meteorológica distinta da última consulta.** Evita interpretar uma resposta recém-baixada como dado recém-atualizado. Resolve o significado dos horários exibidos; a aplicação da proposta de 60 minutos ainda depende de validação com o provedor, sem limitar datas futuras da previsão.
- **Localização após ação explícita e consentimento.** A permissão só será solicitada após ação do usuário, com alternativa manual em caso de recusa ou falha. Não salvar automaticamente coordenadas obtidas do dispositivo. Resolve o acionamento da permissão e o tratamento da localização na persistência local.
- **Logs técnicos apenas no console do navegador.** Registrar somente categoria do erro, operação, status HTTP, duração e horário; excluir coordenadas, cidade pesquisada, identificadores pessoais e respostas completas da API. Sem envio automático ou armazenamento persistente pela aplicação; a permanência no console depende do navegador. Resolve conteúdo e destino dos logs; hospedagem e provedor devem ser avaliados separadamente.
- **Metas operacionais mantidas como propostas.** Os valores de 3 segundos para 95% das consultas, 99,5% de disponibilidade mensal e idade máxima dos dados de 60 minutos permanecem sujeitos a validação, sem aprovação automática nesta rodada.
- **Persistência em localStorage, com limpeza e recuperação.** Guardar somente a última unidade e a cidade selecionada, com os dados mínimos para nova consulta, sem conta ou sincronização. Oferecer limpeza das preferências; com armazenamento bloqueado ou inválido, manter o app utilizável em Celsius e com busca manual. Resolve mecanismo, recuperação e controle do usuário sobre as preferências.

## Personas Hipotéticas

As personas abaixo são hipóteses baseadas no briefing e devem ser validadas com usuários reais. As métricas são metas iniciais para pesquisa, não requisitos aprovados.

### Marina, usuária em deslocamento

- **Objetivo principal:** Verificar rapidamente o clima atual antes de sair e se preparar para as próximas horas.
- **Contexto de uso:** Principalmente no celular, em casa ou a caminho; desktop é secundário.
- **Métrica de sucesso pessoal:** Encontrar a cidade correta e entender as condições relevantes em até 30 segundos, sem ambiguidade de unidade.

### Rafael, planejador de viagem

- **Objetivo principal:** Consultar a previsão do destino para decidir o que levar e como se preparar.
- **Contexto de uso:** Planeja no desktop e consulta novamente no celular durante a viagem.
- **Métrica de sucesso pessoal:** Encontrar a previsão do destino e identificar corretamente os dias relevantes em até 1 minuto.

### Beatriz, organizadora de atividades ao ar livre

- **Objetivo principal:** Escolher em qual dos próximos dias realizar uma atividade com base na previsão.
- **Contexto de uso:** Usa o celular para consultas rápidas e o desktop para planejar a semana.
- **Métrica de sucesso pessoal:** Identificar um dia adequado entre os cinco previstos sem precisar buscar informações complementares para interpretar a previsão.


