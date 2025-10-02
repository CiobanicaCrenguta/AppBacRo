import type { ComentariuComplet } from "@shared/schema";

// todo: remove mock functionality - Mock data pentru exemplul "Plumb" de Bacovia
export const plumbComentariu: ComentariuComplet = {
  comentariu: {
    id: "plumb-bacovia",
    titlu: "Plumb",
    autor: "George Bacovia",
    tip: "poezie",
    context: "Opera \"Plumb\" de George Bacovia este o capodopera a simbolismului romanesc, publicata in volumul de debut al poetului in 1916. Poezia surprinde atmosfera decadenta, melancolia si disperarea specifice simbolismului. Bacovia creeaza un univers poetic dominat de imagini sumbre, culori reci si o stare generala de apatie si tristete cosmica.",
    trasatura1: "Prima trasatura importanta este simbolistica culorilor reci si a metalelor. Cuvantul 'plumb' devine un simbol central al apasarii, al greutatii existentiale. Gri, violet, negru - aceste culori creeaza o atmosfera crepusculara, de iarna sufleteasca. Poetul foloseste sinestezii precum 'dormea intors amorul meu de plumb' pentru a sugera paralizia sentimentelor.",
    trasatura2: "A doua trasatura este muzicalitatea lugubra si ritmul monoton al versurilor. Repetitiile obsesive ('dormea', 'cadea', 'plumb') creeaza efectul unui refren funebru, sugerand circularitatea si imposibilitatea evadarii din universul opresiv. Aliteratiile in 'p', 'b', 'm' accentueaza caracterul grav, solemn al textului.",
    tehnici: "Bacovia utilizeaza personificarea ('umbrele lungi dormeau'), metafora extinsa a plumbului ca simbol al destinului apasator si epitete plastice ('tristete arsa', 'amor de plumb'). Structura in patru catrene cu rima incrucisata confere poemei echilibru formal, in contrast cu haosul interior al subiectului liric.",
    prozodie: "Poezia este alcatuita din patru catrene cu versuri de 10-12 silabe, ritm iambic dominant. Rima este incrucisata (ABAB), iar accentele cad pe silabele pare in majoritatea versurilor. Aliteratiile in labiale (p, b, m) si nazale creeaza o muzicalitate surda, apasatoare. Pauzele marcate de virgule fragmenteaza respiratia versului, sugerand ezitarea, oboseala existentiala.",
    incheiere: "In concluzie, \"Plumb\" este o sinteza perfecta a esteticii simboliste, reprezentand o confesiune lirica despre alienarea moderna. Prin simbolistica complexa, muzicalitatea specifica si atmosfera crepusculara, Bacovia creeaza un univers poetic recognoscibil, care a influentat generatii intregi de poeti romani. Opera ramane actuala prin universalitatea sentimentelor de singuratate si apasare pe care le exprima.",
  },
  drills: {
    nivel1: [
      {
        id: "mc1",
        intrebare: "In ce curent literar se incadreaza poezia \"Plumb\"?",
        optiuni: ["Romantism", "Simbolism", "Modernism", "Postmodernism"],
        raspunsCorect: 1,
      },
      {
        id: "mc2",
        intrebare: "Care dintre urmatoarele culori NU este specifica universului poetic bacovian din \"Plumb\"?",
        optiuni: ["Gri", "Violet", "Rosu", "Negru"],
        raspunsCorect: 2,
      },
      {
        id: "mc3",
        intrebare: "Ce simbolizeaza plumbul in poezie?",
        optiuni: [
          "Bogatia materiala",
          "Apasarea existentiala si greutatea destinului",
          "Puritatea sentimentelor",
          "Speranta in viitor"
        ],
        raspunsCorect: 1,
      },
    ],
    nivel2: [
      {
        id: "ord1",
        fragmente: [
          "Opera ramane actuala prin universalitatea sentimentelor de singuratate si apasare pe care le exprima.",
          "\"Plumb\" este o sinteza perfecta a esteticii simboliste, reprezentand o confesiune lirica despre alienarea moderna.",
          "Prin simbolistica complexa, muzicalitatea specifica si atmosfera crepusculara, Bacovia creeaza un univers poetic recognoscibil.",
        ],
        ordineCorecta: [1, 2, 0],
      },
    ],
    nivel3: [
      {
        id: "comp1",
        text: "Prima trasatura importanta este _____ culorilor reci si a _____. Cuvantul 'plumb' devine un _____ central al apasarii, al greutatii _____.",
        raspunsuri: ["simbolistica", "metalelor", "simbol", "existentiale"],
      },
      {
        id: "comp2",
        text: "Bacovia utilizeaza _____ ('umbrele lungi dormeau'), _____ extinsa a plumbului ca simbol al destinului apasator si _____ plastice.",
        raspunsuri: ["personificarea", "metafora", "epitete"],
      },
    ],
    nivel4: [
      {
        id: "wb1",
        instructiune: "Construieste o fraza despre muzicalitatea poeziei folosind cuvintele din banca:",
        cuvinte: ["repetitiile", "obsesive", "creeaza", "efectul", "unui", "refren", "funebru"],
        fraza_corecta: "Repetitiile obsesive creeaza efectul unui refren funebru",
      },
    ],
    nivel5: [
      {
        id: "fw1",
        instructiune: "Scrie un paragraf despre simbolistica culorilor in poezia \"Plumb\". Include cel putin 3 culori si explica semnificatia lor.",
        raspuns_referinta: "In \"Plumb\", Bacovia foloseste o paleta cromatica dominata de culori reci: gri, violet si negru. Aceste culori simbolizeaza melancolia, decadenta si moartea spirituala. Gri-ul sugereaza monotonia si uniformitatea existentei, violetul evoca misterul si suferinta, iar negrul reprezinta neantul si absenta sperantei. Impreuna, aceste nuante creeaza atmosfera crepusculara specifica simbolismului bacovian.",
      },
    ],
  },
};

export const mockComentarii: ComentariuComplet[] = [plumbComentariu];
