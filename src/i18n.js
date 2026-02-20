const baseDomains = {
  'circuit.menu': 'A GTA 5 mod menu. Feature-rich, regularly updated, and built for performance.',
  'coolstorydidntask.com': 'Testing environment for testing projects before they go live. Public preview.',
  'altraic.com': 'Early-access landing page for Altraic, currently running a public waitlist before launch.',
  'mi6.tf': 'URL shortener and temporary file hosting service. Fast, simple, and ephemeral.',
  'obscurapdf.com': 'Privacy-focused PDF tools. Redact, encrypt, and process documents securely.',
  'justexplain.cv': 'AI-powered explanations at the comprehension level you choose.',
}

const basePlaceholders = [
  'New project currently in development. Stay tuned for updates.',
  'Another project brewing in the lab. Check back later.',
]

const translations = {
  en: {
    header: {
      established: 'Est. 2024',
      title: 'Null Incorporated',
      tagline: 'Building creative digital products and experiments for the modern web.',
      systemsOnline: 'SYSTEMS ONLINE',
      projects: (count) => `${count} PROJECTS`,
    },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'SCROLL FOR MORE', projectsAria: 'Projects' },
    domainCard: { tbd: 'TBD', visit: 'VISIT' },
    about: {
      sectionAria: 'Social',
      heading: 'Social',
      cardTitle: '// social',
      linksCount: '02 links',
    },
    ticker: {
      aria: 'Company information',
      items: [
        { type: 'text', value: 'Null Incorporated' },
        { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' },
        { type: 'text', value: 'Creative Web Solutions' },
        { type: 'text', value: 'Digital Products' },
      ],
    },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  da: {
    header: {
      established: 'Etab. 2024',
      title: 'Null Incorporated',
      tagline: 'Vi bygger kreative digitale produkter og eksperimenter til det moderne web.',
      systemsOnline: 'SYSTEMER ONLINE',
      projects: (count) => `${count} PROJEKTER`,
    },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'RUL FOR MERE', projectsAria: 'Projekter' },
    domainCard: { tbd: 'KOMMER', visit: 'BESØG' },
    about: {
      sectionAria: 'Sociale medier',
      heading: 'Social',
      cardTitle: '// social',
      linksCount: '02 links',
    },
    ticker: {
      aria: 'Virksomhedsinformation',
      items: [
        { type: 'text', value: 'Null Incorporated' },
        { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' },
        { type: 'text', value: 'Kreative webløsninger' },
        { type: 'text', value: 'Digitale produkter' },
      ],
    },
    domains: {
      'circuit.menu': 'Et GTA 5 mod-menu. Funktionsrigt, regelmæssigt opdateret og bygget til ydeevne.',
      'coolstorydidntask.com': 'Testmiljø til projekter før de går live. Offentlig forhåndsvisning.',
      'altraic.com': 'Tidlig adgangs-landingpage til Altraic, med offentlig venteliste før lancering.',
      'mi6.tf': 'URL-forkorter og midlertidig filhosting. Hurtig, enkel og flygtig.',
      'obscurapdf.com': 'Privatlivsfokuserede PDF-værktøjer. Slør, krypter og behandl dokumenter sikkert.',
      'justexplain.cv': 'AI-drevne forklaringer på det forståelsesniveau, du vælger.',
    },
    placeholders: [
      'Nyt projekt under udvikling. Hold øje med opdateringer.',
      'Endnu et projekt er under opsejling. Kig tilbage senere.',
    ],
  },
  de: {
    header: { established: 'Gegr. 2024', title: 'Null Incorporated', tagline: 'Wir entwickeln kreative digitale Produkte und Experimente für das moderne Web.', systemsOnline: 'SYSTEME ONLINE', projects: (count) => `${count} PROJEKTE` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'MEHR ANZEIGEN', projectsAria: 'Projekte' },
    domainCard: { tbd: 'BALD', visit: 'BESUCHEN' },
    about: { sectionAria: 'Sozial', heading: 'Sozial', cardTitle: '// social', linksCount: '02 links' },
    ticker: { aria: 'Unternehmensinformationen', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Kreative Weblösungen' }, { type: 'text', value: 'Digitale Produkte' }] },
    domains: {
      'circuit.menu': 'Ein GTA 5 Mod-Menu. Funktionsreich, regelmaessig aktualisiert und auf Leistung ausgelegt.',
      'coolstorydidntask.com': 'Testumgebung fuer Projekte, bevor sie live gehen. Oeffentliche Vorschau.',
      'altraic.com': 'Early-Access-Landingpage fuer Altraic mit oeffentlicher Warteliste vor dem Start.',
      'mi6.tf': 'URL-Kuerzer und temporaeres File-Hosting. Schnell, einfach und kurzlebig.',
      'obscurapdf.com': 'Datenschutzorientierte PDF-Tools. Schwarzen, verschluesseln und Dokumente sicher verarbeiten.',
      'justexplain.cv': 'KI-gestuetzte Erklaerungen auf dem Verstaendnisniveau deiner Wahl.',
    },
    placeholders: [
      'Neues Projekt in Entwicklung. Bleib fuer Updates dran.',
      'Ein weiteres Projekt ist in Arbeit. Schau spaeter wieder vorbei.',
    ],
  },
  fr: {
    header: { established: 'Créé en 2024', title: 'Null Incorporated', tagline: 'Nous créons des produits numériques créatifs et des expériences pour le web moderne.', systemsOnline: 'SYSTÈMES EN LIGNE', projects: (count) => `${count} PROJETS` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'FAIRE DÉFILER', projectsAria: 'Projets' },
    domainCard: { tbd: 'BIENTÔT', visit: 'VISITER' },
    about: { sectionAria: 'Social', heading: 'Social', cardTitle: '// social', linksCount: '02 liens' },
    ticker: { aria: 'Informations sur l’entreprise', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Solutions web créatives' }, { type: 'text', value: 'Produits numériques' }] },
    domains: {
      'circuit.menu': 'Un menu mod GTA 5. Riche en fonctionnalites, regulierement mis a jour et optimise pour la performance.',
      'coolstorydidntask.com': 'Environnement de test pour les projets avant mise en ligne. Apercu public.',
      'altraic.com': 'Page d acces anticipe a Altraic avec liste d attente publique avant lancement.',
      'mi6.tf': 'Raccourcisseur d URL et hebergement temporaire de fichiers. Rapide, simple et ephemere.',
      'obscurapdf.com': 'Outils PDF axes sur la confidentialite. Masquer, chiffrer et traiter des documents en securite.',
      'justexplain.cv': 'Explications propulsees par l IA au niveau de comprehension que vous choisissez.',
    },
    placeholders: [
      'Nouveau projet en cours de developpement. Restez a l ecoute.',
      'Un autre projet se prepare en coulisses. Revenez plus tard.',
    ],
  },
  es: {
    header: { established: 'Fund. 2024', title: 'Null Incorporated', tagline: 'Construimos productos digitales creativos y experimentos para la web moderna.', systemsOnline: 'SISTEMAS EN LÍNEA', projects: (count) => `${count} PROYECTOS` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'DESPLAZA PARA MÁS', projectsAria: 'Proyectos' },
    domainCard: { tbd: 'PRÓXIMAMENTE', visit: 'VISITAR' },
    about: { sectionAria: 'Social', heading: 'Social', cardTitle: '// social', linksCount: '02 enlaces' },
    ticker: { aria: 'Información de la empresa', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Soluciones web creativas' }, { type: 'text', value: 'Productos digitales' }] },
    domains: {
      'circuit.menu': 'Un menu mod para GTA 5. Completo, actualizado con frecuencia y optimizado para rendimiento.',
      'coolstorydidntask.com': 'Entorno de pruebas para proyectos antes de salir en produccion. Vista previa publica.',
      'altraic.com': 'Landing page de acceso anticipado para Altraic con lista de espera publica antes del lanzamiento.',
      'mi6.tf': 'Acortador de URL y alojamiento temporal de archivos. Rapido, simple y efimero.',
      'obscurapdf.com': 'Herramientas PDF centradas en la privacidad. Redacta, cifra y procesa documentos de forma segura.',
      'justexplain.cv': 'Explicaciones con IA en el nivel de comprension que elijas.',
    },
    placeholders: [
      'Nuevo proyecto en desarrollo. Pronto habra actualizaciones.',
      'Otro proyecto se esta cocinando en el laboratorio. Vuelve mas tarde.',
    ],
  },
  it: {
    header: { established: 'Fond. 2024', title: 'Null Incorporated', tagline: 'Realizziamo prodotti digitali creativi ed esperimenti per il web moderno.', systemsOnline: 'SISTEMI ONLINE', projects: (count) => `${count} PROGETTI` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'SCORRI PER ALTRO', projectsAria: 'Progetti' },
    domainCard: { tbd: 'IN ARRIVO', visit: 'VISITA' },
    about: { sectionAria: 'Social', heading: 'Social', cardTitle: '// social', linksCount: '02 link' },
    ticker: { aria: 'Informazioni aziendali', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Soluzioni web creative' }, { type: 'text', value: 'Prodotti digitali' }] },
    domains: {
      'circuit.menu': 'Un menu mod per GTA 5. Ricco di funzionalita, aggiornato regolarmente e ottimizzato per le prestazioni.',
      'coolstorydidntask.com': 'Ambiente di test per i progetti prima della messa online. Anteprima pubblica.',
      'altraic.com': 'Landing page in accesso anticipato per Altraic con lista d attesa pubblica prima del lancio.',
      'mi6.tf': 'Accorciatore URL e hosting temporaneo di file. Veloce, semplice ed effimero.',
      'obscurapdf.com': 'Strumenti PDF orientati alla privacy. Oscura, cifra ed elabora documenti in modo sicuro.',
      'justexplain.cv': 'Spiegazioni basate su IA al livello di comprensione che scegli.',
    },
    placeholders: [
      'Nuovo progetto in fase di sviluppo. Resta aggiornato.',
      'Un altro progetto sta prendendo forma in laboratorio. Torna piu tardi.',
    ],
  },
  pt: {
    header: { established: 'Fund. 2024', title: 'Null Incorporated', tagline: 'Criamos produtos digitais criativos e experiências para a web moderna.', systemsOnline: 'SISTEMAS ONLINE', projects: (count) => `${count} PROJETOS` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'ROLE PARA MAIS', projectsAria: 'Projetos' },
    domainCard: { tbd: 'EM BREVE', visit: 'VISITAR' },
    about: { sectionAria: 'Social', heading: 'Social', cardTitle: '// social', linksCount: '02 links' },
    ticker: { aria: 'Informações da empresa', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Soluções web criativas' }, { type: 'text', value: 'Produtos digitais' }] },
    domains: {
      'circuit.menu': 'Um menu mod para GTA 5. Rico em recursos, atualizado regularmente e otimizado para desempenho.',
      'coolstorydidntask.com': 'Ambiente de testes para projetos antes de irem ao ar. Previa publica.',
      'altraic.com': 'Landing page de acesso antecipado para Altraic com lista de espera publica antes do lancamento.',
      'mi6.tf': 'Encurtador de URL e hospedagem temporaria de arquivos. Rapido, simples e efemero.',
      'obscurapdf.com': 'Ferramentas PDF focadas em privacidade. Redija, criptografe e processe documentos com seguranca.',
      'justexplain.cv': 'Explicacoes com IA no nivel de compreensao que voce escolher.',
    },
    placeholders: [
      'Novo projeto em desenvolvimento. Fique ligado para atualizacoes.',
      'Outro projeto esta sendo preparado no laboratorio. Volte mais tarde.',
    ],
  },
  nl: {
    header: { established: 'Opgericht 2024', title: 'Null Incorporated', tagline: 'We bouwen creatieve digitale producten en experimenten voor het moderne web.', systemsOnline: 'SYSTEMEN ONLINE', projects: (count) => `${count} PROJECTEN` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'SCROLL VOOR MEER', projectsAria: 'Projecten' },
    domainCard: { tbd: 'BINNENKORT', visit: 'BEZOEK' },
    about: { sectionAria: 'Sociaal', heading: 'Sociaal', cardTitle: '// social', linksCount: '02 links' },
    ticker: { aria: 'Bedrijfsinformatie', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Creatieve weboplossingen' }, { type: 'text', value: 'Digitale producten' }] },
    domains: {
      'circuit.menu': 'Een GTA 5 mod-menu. Functierijk, regelmatig bijgewerkt en gebouwd voor prestaties.',
      'coolstorydidntask.com': 'Testomgeving voor projecten voordat ze live gaan. Openbare preview.',
      'altraic.com': 'Early-access landingspagina voor Altraic met openbare wachtlijst voor lancering.',
      'mi6.tf': 'URL-verkorter en tijdelijke bestandsopslag. Snel, simpel en tijdelijk.',
      'obscurapdf.com': 'Privacygerichte PDF-tools. Redigeer, versleutel en verwerk documenten veilig.',
      'justexplain.cv': 'AI-gedreven uitleg op het begripsniveau dat jij kiest.',
    },
    placeholders: [
      'Nieuw project in ontwikkeling. Blijf op de hoogte van updates.',
      'Nog een project is in de maak. Kom later terug.',
    ],
  },
  sv: {
    header: { established: 'Startat 2024', title: 'Null Incorporated', tagline: 'Vi bygger kreativa digitala produkter och experiment för den moderna webben.', systemsOnline: 'SYSTEM ONLINE', projects: (count) => `${count} PROJEKT` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'SKROLLA FÖR MER', projectsAria: 'Projekt' },
    domainCard: { tbd: 'SNART', visit: 'BESÖK' },
    about: { sectionAria: 'Socialt', heading: 'Socialt', cardTitle: '// social', linksCount: '02 länkar' },
    ticker: { aria: 'Företagsinformation', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Kreativa webblösningar' }, { type: 'text', value: 'Digitala produkter' }] },
    domains: {
      'circuit.menu': 'En GTA 5 mod-meny. Funktionsrik, uppdateras regelbundet och byggd for prestanda.',
      'coolstorydidntask.com': 'Testmiljo for projekt innan de gar live. Offentlig forhandsvisning.',
      'altraic.com': 'Landningssida med tidig tillgang for Altraic med offentlig vantelista innan lansering.',
      'mi6.tf': 'URL-forkortare och tillfallig filhosting. Snabb, enkel och tillfallig.',
      'obscurapdf.com': 'Integritetsfokuserade PDF-verktyg. Maskera, kryptera och behandla dokument sakert.',
      'justexplain.cv': 'AI-drivna forklaringar pa den forstaelseniva du valjer.',
    },
    placeholders: [
      'Nytt projekt under utveckling. Hall utkik efter uppdateringar.',
      'Ett annat projekt ar pa gang i labbet. Kom tillbaka senare.',
    ],
  },
  no: {
    header: { established: 'Etablert 2024', title: 'Null Incorporated', tagline: 'Vi bygger kreative digitale produkter og eksperimenter for det moderne nettet.', systemsOnline: 'SYSTEMER ONLINE', projects: (count) => `${count} PROSJEKTER` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'RULL FOR MER', projectsAria: 'Prosjekter' },
    domainCard: { tbd: 'KOMMER', visit: 'BESØK' },
    about: { sectionAria: 'Sosialt', heading: 'Sosialt', cardTitle: '// social', linksCount: '02 lenker' },
    ticker: { aria: 'Bedriftsinformasjon', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Kreative nettløsninger' }, { type: 'text', value: 'Digitale produkter' }] },
    domains: {
      'circuit.menu': 'En GTA 5 mod-meny. Funksjonsrik, jevnlig oppdatert og bygget for ytelse.',
      'coolstorydidntask.com': 'Testmiljo for prosjekter for de gar live. Offentlig forhandsvisning.',
      'altraic.com': 'Tidlig tilgangs-landingsside for Altraic med offentlig venteliste for lansering.',
      'mi6.tf': 'URL-forkorter og midlertidig filhosting. Rask, enkel og flyktig.',
      'obscurapdf.com': 'Personvernfokuserte PDF-verktoy. Sladd, krypter og behandle dokumenter trygt.',
      'justexplain.cv': 'AI-drevne forklaringer pa forstaelsesnivaet du velger.',
    },
    placeholders: [
      'Nytt prosjekt under utvikling. Folg med for oppdateringer.',
      'Et annet prosjekt er under oppseiling i laben. Kom tilbake senere.',
    ],
  },
  fi: {
    header: { established: 'Per. 2024', title: 'Null Incorporated', tagline: 'Rakennamme luovia digitaalisia tuotteita ja kokeiluja moderniin verkkoon.', systemsOnline: 'JÄRJESTELMÄT ONLINE', projects: (count) => `${count} PROJEKTIA` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'VIERITÄ LISÄÄ', projectsAria: 'Projektit' },
    domainCard: { tbd: 'TULOSSA', visit: 'VIERAILE' },
    about: { sectionAria: 'Sosiaalinen', heading: 'Sosiaalinen', cardTitle: '// social', linksCount: '02 linkkiä' },
    ticker: { aria: 'Yritystiedot', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Luovat verkkoratkaisut' }, { type: 'text', value: 'Digitaaliset tuotteet' }] },
    domains: {
      'circuit.menu': 'GTA 5 -modivalikko. Ominaisuuksiltaan laaja, saannollisesti paivitetty ja suorituskykyyn rakennettu.',
      'coolstorydidntask.com': 'Testiymparisto projekteille ennen julkaisua. Julkinen esikatselu.',
      'altraic.com': 'Altraicin early-access-laskeutumissivu julkisella jonotuslistalla ennen julkaisua.',
      'mi6.tf': 'URL-lyhentaja ja valiaikainen tiedostohotelli. Nopea, yksinkertainen ja tilapainen.',
      'obscurapdf.com': 'Yksityisyyspainotteiset PDF-tyokalut. Peita, salaa ja kasittele dokumentteja turvallisesti.',
      'justexplain.cv': 'AI-pohjaiset selitykset valitsemallasi ymmarrystasolla.',
    },
    placeholders: [
      'Uusi projekti on kehityksessa. Seuraa paivityksia.',
      'Toinen projekti kypsyy laboratoriossa. Palaa myohemmin.',
    ],
  },
  pl: {
    header: { established: 'Zał. 2024', title: 'Null Incorporated', tagline: 'Tworzymy kreatywne produkty cyfrowe i eksperymenty dla nowoczesnej sieci.', systemsOnline: 'SYSTEMY ONLINE', projects: (count) => `${count} PROJEKTÓW` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'PRZEWIŃ PO WIĘCEJ', projectsAria: 'Projekty' },
    domainCard: { tbd: 'WKRÓTCE', visit: 'ODWIEDŹ' },
    about: { sectionAria: 'Społeczności', heading: 'Social', cardTitle: '// social', linksCount: '02 linki' },
    ticker: { aria: 'Informacje o firmie', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Kreatywne rozwiązania webowe' }, { type: 'text', value: 'Produkty cyfrowe' }] },
    domains: {
      'circuit.menu': 'Menu moda do GTA 5. Bogate funkcje, regularne aktualizacje i nastawienie na wydajnosc.',
      'coolstorydidntask.com': 'Srodowisko testowe dla projektow przed wdrozeniem. Publiczny podglad.',
      'altraic.com': 'Strona early-access dla Altraic z publiczna lista oczekujacych przed startem.',
      'mi6.tf': 'Skrot URL i tymczasowy hosting plikow. Szybko, prosto i efemerycznie.',
      'obscurapdf.com': 'Narzedia PDF z naciskiem na prywatnosc. Redaguj, szyfruj i bezpiecznie przetwarzaj dokumenty.',
      'justexplain.cv': 'Wyjasnienia oparte na AI na poziomie zrozumienia, ktory wybierzesz.',
    },
    placeholders: [
      'Nowy projekt jest w trakcie tworzenia. Wkrotce kolejne aktualizacje.',
      'Kolejny projekt dojrzewa w laboratorium. Wroc pozniej.',
    ],
  },
  cs: {
    header: { established: 'Založeno 2024', title: 'Null Incorporated', tagline: 'Vytváříme kreativní digitální produkty a experimenty pro moderní web.', systemsOnline: 'SYSTÉMY ONLINE', projects: (count) => `${count} PROJEKTŮ` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'POSUŇTE PRO VÍCE', projectsAria: 'Projekty' },
    domainCard: { tbd: 'BRZY', visit: 'NAVŠTÍVIT' },
    about: { sectionAria: 'Sociální', heading: 'Sociální', cardTitle: '// social', linksCount: '02 odkazy' },
    ticker: { aria: 'Informace o společnosti', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Kreativní webová řešení' }, { type: 'text', value: 'Digitální produkty' }] },
    domains: {
      'circuit.menu': 'GTA 5 mod menu. Bohate na funkce, pravidelne aktualizovane a postavene na vykon.',
      'coolstorydidntask.com': 'Testovaci prostredi pro projekty pred spustenim. Verejny nahled.',
      'altraic.com': 'Early-access landing page pro Altraic s verejnym waiting listem pred spustenim.',
      'mi6.tf': 'Zkracovac URL a docasny hosting souboru. Rychly, jednoduchy a efemerni.',
      'obscurapdf.com': 'PDF nastroje zamene na soukromi. Zacernuj, sifruj a bezpecne zpracuj dokumenty.',
      'justexplain.cv': 'AI vysvetleni na urovni porozumeni, kterou si zvolis.',
    },
    placeholders: [
      'Novy projekt je ve vyvoji. Sleduj dalsi aktualizace.',
      'Dalsi projekt se pripravuje v laboratori. Vrat se pozdeji.',
    ],
  },
  tr: {
    header: { established: 'Kur. 2024', title: 'Null Incorporated', tagline: 'Modern web için yaratıcı dijital ürünler ve deneyler geliştiriyoruz.', systemsOnline: 'SİSTEMLER AKTİF', projects: (count) => `${count} PROJE` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'DAHA FAZLA KAYDIR', projectsAria: 'Projeler' },
    domainCard: { tbd: 'YAKINDA', visit: 'ZİYARET ET' },
    about: { sectionAria: 'Sosyal', heading: 'Sosyal', cardTitle: '// social', linksCount: '02 bağlantı' },
    ticker: { aria: 'Şirket bilgileri', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Yaratıcı web çözümleri' }, { type: 'text', value: 'Dijital ürünler' }] },
    domains: {
      'circuit.menu': 'Bir GTA 5 mod menusu. Ozellik acisindan zengin, duzenli guncellenen ve performans odakli.',
      'coolstorydidntask.com': 'Projeler yayina alinmadan once test ortami. Herkese acik onizleme.',
      'altraic.com': 'Altraic icin lansman oncesi herkese acik bekleme listesi olan erken erisim sayfasi.',
      'mi6.tf': 'URL kisaltici ve gecici dosya barindirma hizmeti. Hizli, basit ve gecici.',
      'obscurapdf.com': 'Gizlilik odakli PDF araclari. Belgeleri sansurleyin, sifreleyin ve guvenli sekilde isleyin.',
      'justexplain.cv': 'Sectigin anlama seviyesinde yapay zeka destekli aciklamalar.',
    },
    placeholders: [
      'Yeni proje gelistirme asamasinda. Guncellemeler icin takipte kal.',
      'Laboratuvarda bir baska proje demleniyor. Daha sonra tekrar bak.',
    ],
  },
  ro: {
    header: { established: 'Înființat 2024', title: 'Null Incorporated', tagline: 'Construim produse digitale creative și experimente pentru web-ul modern.', systemsOnline: 'SISTEME ONLINE', projects: (count) => `${count} PROIECTE` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'DERULEAZĂ PENTRU MAI MULT', projectsAria: 'Proiecte' },
    domainCard: { tbd: 'ÎN CURÂND', visit: 'VIZITEAZĂ' },
    about: { sectionAria: 'Social', heading: 'Social', cardTitle: '// social', linksCount: '02 linkuri' },
    ticker: { aria: 'Informații despre companie', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Soluții web creative' }, { type: 'text', value: 'Produse digitale' }] },
    domains: {
      'circuit.menu': 'Un meniu mod pentru GTA 5. Bogat in functii, actualizat regulat si construit pentru performanta.',
      'coolstorydidntask.com': 'Mediu de test pentru proiecte inainte de lansare. Preview public.',
      'altraic.com': 'Pagina de acces timpuriu pentru Altraic, cu lista publica de asteptare inainte de lansare.',
      'mi6.tf': 'Scurtator de URL si gazduire temporara de fisiere. Rapid, simplu si efemer.',
      'obscurapdf.com': 'Instrumente PDF axate pe confidentialitate. Redacteaza, cripteaza si proceseaza documente in siguranta.',
      'justexplain.cv': 'Explicatii bazate pe AI la nivelul de intelegere ales de tine.',
    },
    placeholders: [
      'Proiect nou in dezvoltare. Revino pentru actualizari.',
      'Un alt proiect se pregateste in laborator. Verifica din nou mai tarziu.',
    ],
  },
  ru: {
    header: { established: 'Осн. 2024', title: 'Null Incorporated', tagline: 'Мы создаем креативные цифровые продукты и эксперименты для современного веба.', systemsOnline: 'СИСТЕМЫ ОНЛАЙН', projects: (count) => `${count} ПРОЕКТОВ` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'ПРОКРУТИТЕ НИЖЕ', projectsAria: 'Проекты' },
    domainCard: { tbd: 'СКОРО', visit: 'ПЕРЕЙТИ' },
    about: { sectionAria: 'Соцсети', heading: 'Соцсети', cardTitle: '// social', linksCount: '02 ссылки' },
    ticker: { aria: 'Информация о компании', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Креативные веб-решения' }, { type: 'text', value: 'Цифровые продукты' }] },
    domains: {
      'circuit.menu': 'Мод-меню для GTA 5. Богатый функционал, регулярные обновления и упор на производительность.',
      'coolstorydidntask.com': 'Тестовая среда для проектов перед релизом. Публичный предпросмотр.',
      'altraic.com': 'Лендинг раннего доступа для Altraic с публичным листом ожидания перед запуском.',
      'mi6.tf': 'Сокращатель URL и временный хостинг файлов. Быстро, просто и эфемерно.',
      'obscurapdf.com': 'PDF-инструменты с фокусом на приватность. Редактируйте, шифруйте и обрабатывайте документы безопасно.',
      'justexplain.cv': 'Объяснения на базе ИИ на выбранном вами уровне понимания.',
    },
    placeholders: [
      'Новый проект в разработке. Следите за обновлениями.',
      'Еще один проект готовится в лаборатории. Загляните позже.',
    ],
  },
  uk: {
    header: { established: 'Засн. 2024', title: 'Null Incorporated', tagline: 'Ми створюємо креативні цифрові продукти та експерименти для сучасного вебу.', systemsOnline: 'СИСТЕМИ ОНЛАЙН', projects: (count) => `${count} ПРОЄКТІВ` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'ПРОКРУТІТЬ ДАЛІ', projectsAria: 'Проєкти' },
    domainCard: { tbd: 'СКОРО', visit: 'ВІДВІДАТИ' },
    about: { sectionAria: 'Соцмережі', heading: 'Соцмережі', cardTitle: '// social', linksCount: '02 посилання' },
    ticker: { aria: 'Інформація про компанію', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Креативні веб-рішення' }, { type: 'text', value: 'Цифрові продукти' }] },
    domains: {
      'circuit.menu': 'Мод-меню для GTA 5. Багато функцій, регулярні оновлення та акцент на продуктивність.',
      'coolstorydidntask.com': 'Тестове середовище для проєктів перед запуском. Публічний попередній перегляд.',
      'altraic.com': 'Сторінка раннього доступу для Altraic з публічним списком очікування перед запуском.',
      'mi6.tf': 'Скорочувач URL і тимчасовий файловий хостинг. Швидко, просто й ефемерно.',
      'obscurapdf.com': 'PDF-інструменти з фокусом на приватність. Редагуйте, шифруйте й безпечно обробляйте документи.',
      'justexplain.cv': 'Пояснення на базі ШІ на обраному вами рівні розуміння.',
    },
    placeholders: [
      'Новий проєкт у розробці. Стежте за оновленнями.',
      'Ще один проєкт готується в лабораторії. Поверніться пізніше.',
    ],
  },
  ja: {
    header: { established: '設立 2024', title: 'Null Incorporated', tagline: 'モダンWeb向けに創造的なデジタル製品と実験を構築しています。', systemsOnline: 'システム稼働中', projects: (count) => `${count} プロジェクト` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'さらに表示', projectsAria: 'プロジェクト' },
    domainCard: { tbd: '近日公開', visit: '訪問' },
    about: { sectionAria: 'ソーシャル', heading: 'ソーシャル', cardTitle: '// social', linksCount: '02 リンク' },
    ticker: { aria: '会社情報', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'クリエイティブなWebソリューション' }, { type: 'text', value: 'デジタル製品' }] },
    domains: {
      'circuit.menu': 'GTA 5向けのMODメニュー。機能が豊富で、定期更新され、パフォーマンス重視です。',
      'coolstorydidntask.com': '本番公開前にプロジェクトを検証するためのテスト環境。公開プレビュー。',
      'altraic.com': 'Altraicの早期アクセス用ランディングページ。公開前に公開ウェイトリストを運用中。',
      'mi6.tf': 'URL短縮と一時ファイルホスティングサービス。高速・シンプル・一時的。',
      'obscurapdf.com': 'プライバシー重視のPDFツール。墨消し、暗号化、安全な文書処理。',
      'justexplain.cv': '選択した理解レベルに合わせたAI解説。',
    },
    placeholders: [
      '新しいプロジェクトを開発中です。続報をお待ちください。',
      'もう1つのプロジェクトが進行中です。後でもう一度ご確認ください。',
    ],
  },
  ko: {
    header: { established: '설립 2024', title: 'Null Incorporated', tagline: '현대 웹을 위한 창의적인 디지털 제품과 실험을 만듭니다.', systemsOnline: '시스템 온라인', projects: (count) => `${count} 프로젝트` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: '더 보려면 스크롤', projectsAria: '프로젝트' },
    domainCard: { tbd: '출시 예정', visit: '방문' },
    about: { sectionAria: '소셜', heading: '소셜', cardTitle: '// social', linksCount: '02 링크' },
    ticker: { aria: '회사 정보', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: '창의적인 웹 솔루션' }, { type: 'text', value: '디지털 제품' }] },
    domains: {
      'circuit.menu': 'GTA 5 모드 메뉴입니다. 기능이 풍부하고 정기적으로 업데이트되며 성능에 최적화되어 있습니다.',
      'coolstorydidntask.com': '프로젝트를 라이브 전에 검증하는 테스트 환경입니다. 공개 프리뷰.',
      'altraic.com': 'Altraic의 얼리 액세스 랜딩 페이지로, 출시 전 공개 대기자 명단을 운영 중입니다.',
      'mi6.tf': 'URL 단축 및 임시 파일 호스팅 서비스. 빠르고 단순하며 일시적입니다.',
      'obscurapdf.com': '개인정보 중심 PDF 도구. 문서를 가리고, 암호화하고, 안전하게 처리합니다.',
      'justexplain.cv': '선택한 이해 수준에 맞춘 AI 기반 설명.',
    },
    placeholders: [
      '새 프로젝트가 현재 개발 중입니다. 업데이트를 기다려 주세요.',
      '또 다른 프로젝트가 준비 중입니다. 나중에 다시 확인해 주세요.',
    ],
  },
  zh: {
    header: { established: '成立于 2024', title: 'Null Incorporated', tagline: '我们为现代网络构建创意数字产品与实验。', systemsOnline: '系统在线', projects: (count) => `${count} 个项目` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: '滚动查看更多', projectsAria: '项目' },
    domainCard: { tbd: '即将推出', visit: '访问' },
    about: { sectionAria: '社交', heading: '社交', cardTitle: '// social', linksCount: '02 个链接' },
    ticker: { aria: '公司信息', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: '创意网页解决方案' }, { type: 'text', value: '数字产品' }] },
    domains: {
      'circuit.menu': '一款 GTA 5 模组菜单。功能丰富、持续更新，并针对性能优化。',
      'coolstorydidntask.com': '项目上线前的测试环境。公开预览。',
      'altraic.com': 'Altraic 的早期访问落地页，当前在正式发布前开放公开候补名单。',
      'mi6.tf': 'URL 缩短与临时文件托管服务。快速、简单、短期。',
      'obscurapdf.com': '注重隐私的 PDF 工具。可进行涂黑、加密并安全处理文档。',
      'justexplain.cv': '按你选择的理解层级提供 AI 解释。',
    },
    placeholders: [
      '新项目正在开发中，敬请关注后续更新。',
      '另一个项目正在筹备中，稍后再来看看。',
    ],
  },
  ar: {
    header: { established: 'تأسست 2024', title: 'Null Incorporated', tagline: 'نبني منتجات رقمية إبداعية وتجارب للويب الحديث.', systemsOnline: 'الأنظمة تعمل', projects: (count) => `${count} مشاريع` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'مرر للمزيد', projectsAria: 'المشاريع' },
    domainCard: { tbd: 'قريبًا', visit: 'زيارة' },
    about: { sectionAria: 'اجتماعي', heading: 'اجتماعي', cardTitle: '// social', linksCount: '02 روابط' },
    ticker: { aria: 'معلومات الشركة', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'حلول ويب إبداعية' }, { type: 'text', value: 'منتجات رقمية' }] },
    domains: {
      'circuit.menu': 'قائمة تعديل لـ GTA 5. غنية بالميزات، تُحدَّث باستمرار ومبنية للأداء.',
      'coolstorydidntask.com': 'بيئة اختبار للمشاريع قبل الإطلاق. معاينة عامة.',
      'altraic.com': 'صفحة وصول مبكر لـ Altraic مع قائمة انتظار عامة قبل الإطلاق.',
      'mi6.tf': 'مختصر روابط وخدمة استضافة ملفات مؤقتة. سريع وبسيط ومؤقت.',
      'obscurapdf.com': 'أدوات PDF تركز على الخصوصية. تنقيح وتشفير ومعالجة آمنة للمستندات.',
      'justexplain.cv': 'شروحات مدعومة بالذكاء الاصطناعي بمستوى الفهم الذي تختاره.',
    },
    placeholders: [
      'مشروع جديد قيد التطوير حالياً. ترقب التحديثات.',
      'هناك مشروع آخر قيد التحضير. عد لاحقاً.',
    ],
  },
  hi: {
    header: { established: 'स्थापना 2024', title: 'Null Incorporated', tagline: 'हम आधुनिक वेब के लिए रचनात्मक डिजिटल उत्पाद और प्रयोग बनाते हैं।', systemsOnline: 'सिस्टम ऑनलाइन', projects: (count) => `${count} प्रोजेक्ट` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'और देखने के लिए स्क्रॉल करें', projectsAria: 'प्रोजेक्ट' },
    domainCard: { tbd: 'जल्द आ रहा है', visit: 'देखें' },
    about: { sectionAria: 'सोशल', heading: 'सोशल', cardTitle: '// social', linksCount: '02 लिंक' },
    ticker: { aria: 'कंपनी जानकारी', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'रचनात्मक वेब समाधान' }, { type: 'text', value: 'डिजिटल उत्पाद' }] },
    domains: {
      'circuit.menu': 'GTA 5 के लिए एक मॉड मेनू। फीचर-समृद्ध, नियमित अपडेटेड और प्रदर्शन के लिए बनाया गया।',
      'coolstorydidntask.com': 'प्रोजेक्ट लाइव होने से पहले टेस्ट करने का वातावरण। पब्लिक प्रीव्यू।',
      'altraic.com': 'Altraic के लिए अर्ली-एक्सेस लैंडिंग पेज, लॉन्च से पहले सार्वजनिक वेटलिस्ट के साथ।',
      'mi6.tf': 'URL शॉर्टनर और अस्थायी फाइल होस्टिंग सेवा। तेज, सरल और अस्थायी।',
      'obscurapdf.com': 'प्राइवेसी-केंद्रित PDF टूल्स। रिडैक्ट करें, एन्क्रिप्ट करें और दस्तावेज़ सुरक्षित रूप से प्रोसेस करें।',
      'justexplain.cv': 'आपकी चुनी हुई समझ के स्तर पर AI-आधारित व्याख्याएं।',
    },
    placeholders: [
      'नया प्रोजेक्ट अभी विकास में है। अपडेट के लिए बने रहें।',
      'एक और प्रोजेक्ट तैयार हो रहा है। बाद में फिर देखें।',
    ],
  },
}

const languageAliases = {
  nb: 'no',
  nn: 'no',
  'zh-cn': 'zh',
  'zh-sg': 'zh',
  'zh-hans': 'zh',
  'zh-tw': 'zh',
  'zh-hk': 'zh',
  'zh-hant': 'zh',
  'pt-br': 'pt',
  'pt-pt': 'pt',
}

const languageLabels = {
  en: 'English',
  da: 'Dansk',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  pt: 'Português',
  nl: 'Nederlands',
  sv: 'Svenska',
  no: 'Norsk',
  fi: 'Suomi',
  pl: 'Polski',
  cs: 'Čeština',
  tr: 'Türkçe',
  ro: 'Română',
  ru: 'Русский',
  uk: 'Українська',
  ja: '日本語',
  ko: '한국어',
  zh: '中文',
  ar: 'العربية',
  hi: 'हिन्दी',
}

export const DEFAULT_LANGUAGE = 'en'
export const SUPPORTED_LANGUAGES = Object.keys(translations)

function normalizeLanguage(code) {
  if (!code) return null
  const normalized = code.toLowerCase()
  const aliased = languageAliases[normalized] || normalized
  const base = aliased.split('-')[0]
  if (translations[aliased]) return aliased
  if (translations[base]) return base
  return null
}

export function getLanguageOptions() {
  return SUPPORTED_LANGUAGES.map((code) => ({
    code,
    label: languageLabels[code] || code.toUpperCase(),
  }))
}

export function getLocaleCopy(language = DEFAULT_LANGUAGE) {
  const resolvedLanguage = normalizeLanguage(language) || DEFAULT_LANGUAGE
  return {
    language: resolvedLanguage,
    copy: translations[resolvedLanguage] || translations[DEFAULT_LANGUAGE],
  }
}
