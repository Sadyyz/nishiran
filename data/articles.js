// Cada matéria vira uma página em /articles/[slug]
// Pra adicionar uma nova: copie um bloco, mude o "id" e o "slug" (sem espaços/acentos),
// preencha os campos e adicione parágrafos no array "body".

export const CATEGORIES = ["Notícias", "Entrevistas", "Colunas", "Comunidade"];

export const ARTICLES = [
  {
    id: 1,
    slug: "eleicoes-conselho-estudantil-dividem-gakuran",
    category: "Notícias",
    featured: true,
    title: "Eleições do Conselho Estudantil dividem os corredores de Gakuran",
    subtitle:
      "Disputa entre Turma A e Turma B chega ao pátio principal às vésperas da votação, com direito a discursos, panfletos e um confronto no telhado.",
    author: "Rin Amasawa",
    date: "3 de agosto",
    read: "6 min",
    seal: "報",
    body: [
      "A campanha para o novo Conselho Estudantil de Gakuran entrou em sua fase mais tensa nesta semana, com as duas candidaturas favoritas — lideradas por representantes da Turma A e da Turma B — disputando espaço literal e simbólico dentro do colégio. Cartazes colados durante a madrugada no mural do saguão principal foram encontrados rasgados na manhã seguinte, reacendendo rumores de sabotagem entre as chapas.",
      "Testemunhas relatam que o momento de maior tensão aconteceu no intervalo do período da tarde, quando os dois grupos se encontraram no telhado — território historicamente neutro — para o que deveria ser uma conversa reservada. Vozes alteradas chamaram a atenção de alunos do corredor de baixo, e um dos candidatos teria saído do encontro com o uniforme amassado e a gravata torta.",
      "Apesar do clima pesado, ambas as chapas mantêm o discurso oficial de campanha limpa. A votação está marcada para sexta-feira, no pátio principal, com urnas montadas logo após o sinal do último período. Esta redação vai acompanhar a apuração em tempo real.",
    ],
  },
  {
    id: 2,
    slug: "entrevista-autora-arco-vila-turma-b",
    category: "Entrevistas",
    title:
      "\u201cNinguém nasce vilã, a gente escolhe o papel\u201d — conversa com a autora do arco mais comentado do semestre",
    subtitle:
      "A intérprete por trás da rival da Turma B fala sobre construir uma antagonista sem virar caricatura, e sobre o que vem depois do julgamento no auditório.",
    author: "Kaito Serizawa",
    date: "29 de julho",
    read: "8 min",
    seal: "話",
    body: [
      "Poucos arcos dividiram tanto a comunidade quanto o confronto entre a vice-presidente do conselho e a nova aluna transferida da Turma B, que culminou numa cena de julgamento improvisado no auditório assistida por mais de setenta personagens simultâneos. Conversamos com a pessoa por trás da antagonista para entender como o enredo foi construído nos bastidores.",
      "\u2014 Eu queria uma vilã que as pessoas entendessem antes de odiarem. Sentei com o outro jogador envolvido três dias antes da cena e combinamos o que podia e o que não podia acontecer. Nada daquilo foi improvisado de verdade, só parecia \u2014 explica a intérprete, que prefere manter o nome do jogador em sigilo, seguindo o costume da comunidade de separar pessoa e personagem.",
      "Questionada sobre as reações do público, que iam do ódio genuíno ao pedido de spin-off só com a vilã, ela ri: \u2014 Recebi mensagem de gente xingando a personagem e no minuto seguinte perguntando se ela ia ficar bem. Isso pra mim é o RP funcionando do jeito que devia.",
      "Sobre o futuro do arco, ela confirma que a personagem não vai simplesmente desaparecer da trama: \u2014 Ela fez besteira, vai responder por isso dentro da história, mas virar bode expiatório sem chance de desenvolvimento seria o final mais fácil e o menos interessante.",
    ],
  },
  {
    id: 3,
    slug: "festival-cultural-bate-recorde",
    category: "Notícias",
    title: "Festival Cultural bate recorde e reúne mais de 200 personagens no pátio",
    subtitle:
      "Barracas de clube, apresentações e uma banda formada às pressas marcaram a maior edição do evento desde a fundação da comunidade.",
    author: "Rin Amasawa",
    date: "21 de julho",
    read: "5 min",
    seal: "祭",
    body: [
      "O Festival Cultural anual de Gakuran superou todas as edições anteriores em número de participantes, reunindo simultaneamente mais de 200 personagens entre alunos, professores e visitantes de outras turmas. O pátio principal foi dividido em oito barracas temáticas, organizadas pelos clubes escolares, além de um pequeno palco improvisado para apresentações.",
      "O destaque da tarde ficou por conta de uma banda formada de última hora por três alunos do clube de música, que decidiram se apresentar depois de uma aposta perdida durante o intervalo. A apresentação, cheia de erros propositais e piadas internas, acabou virando um dos momentos mais compartilhados do dia entre os jogadores.",
      "O clube de culinária relatou fila constante durante todo o evento, enquanto o clube de artes visuais expôs retratos feitos por encomenda de outros personagens. A organização já confirma uma segunda edição para o próximo semestre, com promessa de mais espaço e menos fila para o quiosque de bebidas.",
    ],
  },
  {
    id: 4,
    slug: "o-que-o-gakuran-diz-sobre-voce",
    category: "Colunas",
    title: "O que o seu gakuran diz sobre você (e sobre sua turma)",
    subtitle:
      "Um olhar sobre como pequenos ajustes no uniforme viraram linguagem não oficial de identidade e pertencimento dentro da comunidade.",
    author: "Convidado — Sousuke Ibaraki",
    date: "15 de julho",
    read: "4 min",
    seal: "論",
    body: [
      "Ninguém decidiu isso em assembleia, mas em poucos meses o uniforme de Gakuran deixou de ser só regra de vestimenta e virou um dialeto próprio. Botão de cima aberto é despreocupação; gravata frouxa é cansaço declarado; braçadeira de clube por cima do blazer é orgulho que não cabe só no crachá.",
      "Reparem na Turma B: manga arregaçada virou quase uniforme não oficial da turma, um jeito silencioso de dizer 'aqui a gente não segue todas as regras à risca'. Já a Turma A mantém o padrão fechado até no calor de fevereiro, o que muita gente lê como disciplina e outros tantos leem como distância.",
      "Escrevo isso não como crítica, mas como registro: a moda dentro do RP virou narrativa. Antes de qualquer personagem abrir a boca, o uniforme já contou metade da história. Vale prestar atenção da próxima vez que criar uma cena.",
    ],
  },
  {
    id: 5,
    slug: "atualizacao-agosto-clube-teatro-musica",
    category: "Notícias",
    title: "Atualização de agosto adiciona clube de teatro e nova ala de música",
    subtitle:
      "Duas salas inéditas abrem espaço para cenas de ensaio, apresentações e — segundo os moderadores — 'menos gente disputando o auditório ao mesmo tempo'.",
    author: "Equipe Nishiran",
    date: "10 de julho",
    read: "3 min",
    seal: "更",
    body: [
      "A atualização mais recente do servidor trouxe duas novas áreas para o mapa de Gakuran: uma sala de ensaios para o recém-formado clube de teatro e uma ala de música com instrumentos individuais, motivo de comemoração entre quem vinha reclamando da fila para usar o piano do auditório.",
      "Segundo os moderadores responsáveis pela expansão, a decisão veio direto da comunidade: os dois espaços estavam entre os mais pedidos nas últimas enquetes de sugestão. A expectativa é que as novas salas aliviem cenas simultâneas que antes competiam pelo mesmo cenário no auditório principal.",
      "O clube de teatro já anunciou que sua primeira peça será encenada ainda este mês, com inscrições abertas para personagens interessados em papéis de elenco ou bastidores.",
    ],
  },
  {
    id: 6,
    slug: "bastidores-trama-mestre-de-rp",
    category: "Entrevistas",
    title: "Por trás da trama: o mestre de RP explica os bastidores do arco do semestre",
    subtitle:
      "Em conversa exclusiva, o responsável pela condução da história principal comenta decisões, reviravoltas cortadas e o que vem na reta final do ano letivo.",
    author: "Kaito Serizawa",
    date: "2 de julho",
    read: "7 min",
    seal: "筋",
    body: [
      "Depois de meses conduzindo o arco principal da comunidade, o mestre de RP por trás da trama do semestre aceitou falar um pouco sobre o processo de construção da história que já rendeu quatro eventos coletivos e uma quantidade generosa de teorias nos bastidores de conversa.",
      "\u2014 A ideia sempre foi dar espaço pra decisão dos jogadores mudar o rumo real da história, não só decorar uma cena já fechada. Teve reviravolta que a gente planejou e cortou porque um grupo de personagens resolveu o conflito de um jeito melhor do que o nosso \u2014 conta.",
      "Sobre as teorias que circulam na comunidade, ele confirma que pelo menos uma está no caminho certo, sem revelar qual: \u2014 Tem gente juntando pista de forma impressionante. Vou deixar vocês continuarem tentando.",
      "Para o fechamento do ano letivo dentro do RP, ele promete um evento final que reúna praticamente todos os personagens ativos: \u2014 Sem spoiler, mas separem a agenda. Vai ser grande.",
    ],
  },
  {
    id: 7,
    slug: "guia-como-entrar-para-a-redacao",
    category: "Comunidade",
    title: "Guia rápido: como entrar para a redação do jornal escolar dentro do RP",
    subtitle:
      "Quer que seu personagem escreva para o Nishiran? Veja como funciona a dinâmica de entrevistas, pautas e publicação dentro da história.",
    author: "Equipe Nishiran",
    date: "24 de junho",
    read: "4 min",
    seal: "案",
    body: [
      "O Nishiran é o jornal escolar oficial dentro da narrativa de Gakuran, e qualquer personagem pode propor pauta ou pedir para integrar a redação. O processo começa com uma cena simples: procurar um dos membros atuais da equipe dentro do RP e apresentar uma ideia de matéria.",
      "Pautas de notícia costumam nascer de eventos que já aconteceram na comunidade — festivais, eleições, mudanças de clube. Já as entrevistas exigem combinar previamente com o personagem entrevistado, para que a cena renda uma conversa de verdade em vez de perguntas soltas.",
      "Depois de aprovada, a matéria é escrita em conjunto entre repórter e entrevistado (ou testemunhas do evento) e publicada aqui, sempre assinada dentro da história. Personagens interessados podem procurar a redação nos corredores ou deixar recado direto com a equipe do servidor.",
    ],
  },
  {
    id: 8,
    slug: "rumor-fusao-turma-a-turma-b",
    category: "Notícias",
    title: "Rumor de fusão entre Turma A e Turma B agita o pátio antes da confirmação oficial",
    subtitle:
      "Boato começou num bilhete anônimo e virou o assunto mais repetido da semana, mesmo sem confirmação da direção do colégio.",
    author: "Rin Amasawa",
    date: "18 de junho",
    read: "5 min",
    seal: "噂",
    body: [
      "Um bilhete anônimo encontrado colado na porta da sala da Turma A deu início ao rumor mais comentado das últimas semanas dentro de Gakuran: a possível fusão entre as duas turmas rivais para o próximo semestre. Nenhuma fonte oficial confirmou o boato até o fechamento desta edição.",
      "Ainda assim, o assunto dominou as conversas do intervalo. Alguns personagens da Turma B recebem a ideia com bom humor, outros com desconfiança aberta — histórico de rivalidade entre as duas turmas não é segredo para ninguém que acompanha o dia a dia do colégio.",
      "Esta redação entrou em contato com a direção para checar a veracidade da informação e aguarda retorno. Assim que houver confirmação — ou desmentido — oficial, o Nishiran atualiza a matéria.",
    ],
  },
];
