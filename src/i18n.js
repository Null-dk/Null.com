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
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  fr: {
    header: { established: 'Créé en 2024', title: 'Null Incorporated', tagline: 'Nous créons des produits numériques créatifs et des expériences pour le web moderne.', systemsOnline: 'SYSTÈMES EN LIGNE', projects: (count) => `${count} PROJETS` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'FAIRE DÉFILER', projectsAria: 'Projets' },
    domainCard: { tbd: 'BIENTÔT', visit: 'VISITER' },
    about: { sectionAria: 'Social', heading: 'Social', cardTitle: '// social', linksCount: '02 liens' },
    ticker: { aria: 'Informations sur l’entreprise', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Solutions web créatives' }, { type: 'text', value: 'Produits numériques' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  es: {
    header: { established: 'Fund. 2024', title: 'Null Incorporated', tagline: 'Construimos productos digitales creativos y experimentos para la web moderna.', systemsOnline: 'SISTEMAS EN LÍNEA', projects: (count) => `${count} PROYECTOS` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'DESPLAZA PARA MÁS', projectsAria: 'Proyectos' },
    domainCard: { tbd: 'PRÓXIMAMENTE', visit: 'VISITAR' },
    about: { sectionAria: 'Social', heading: 'Social', cardTitle: '// social', linksCount: '02 enlaces' },
    ticker: { aria: 'Información de la empresa', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Soluciones web creativas' }, { type: 'text', value: 'Productos digitales' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  it: {
    header: { established: 'Fond. 2024', title: 'Null Incorporated', tagline: 'Realizziamo prodotti digitali creativi ed esperimenti per il web moderno.', systemsOnline: 'SISTEMI ONLINE', projects: (count) => `${count} PROGETTI` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'SCORRI PER ALTRO', projectsAria: 'Progetti' },
    domainCard: { tbd: 'IN ARRIVO', visit: 'VISITA' },
    about: { sectionAria: 'Social', heading: 'Social', cardTitle: '// social', linksCount: '02 link' },
    ticker: { aria: 'Informazioni aziendali', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Soluzioni web creative' }, { type: 'text', value: 'Prodotti digitali' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  pt: {
    header: { established: 'Fund. 2024', title: 'Null Incorporated', tagline: 'Criamos produtos digitais criativos e experiências para a web moderna.', systemsOnline: 'SISTEMAS ONLINE', projects: (count) => `${count} PROJETOS` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'ROLE PARA MAIS', projectsAria: 'Projetos' },
    domainCard: { tbd: 'EM BREVE', visit: 'VISITAR' },
    about: { sectionAria: 'Social', heading: 'Social', cardTitle: '// social', linksCount: '02 links' },
    ticker: { aria: 'Informações da empresa', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Soluções web criativas' }, { type: 'text', value: 'Produtos digitais' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  nl: {
    header: { established: 'Opgericht 2024', title: 'Null Incorporated', tagline: 'We bouwen creatieve digitale producten en experimenten voor het moderne web.', systemsOnline: 'SYSTEMEN ONLINE', projects: (count) => `${count} PROJECTEN` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'SCROLL VOOR MEER', projectsAria: 'Projecten' },
    domainCard: { tbd: 'BINNENKORT', visit: 'BEZOEK' },
    about: { sectionAria: 'Sociaal', heading: 'Sociaal', cardTitle: '// social', linksCount: '02 links' },
    ticker: { aria: 'Bedrijfsinformatie', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Creatieve weboplossingen' }, { type: 'text', value: 'Digitale producten' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  sv: {
    header: { established: 'Startat 2024', title: 'Null Incorporated', tagline: 'Vi bygger kreativa digitala produkter och experiment för den moderna webben.', systemsOnline: 'SYSTEM ONLINE', projects: (count) => `${count} PROJEKT` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'SKROLLA FÖR MER', projectsAria: 'Projekt' },
    domainCard: { tbd: 'SNART', visit: 'BESÖK' },
    about: { sectionAria: 'Socialt', heading: 'Socialt', cardTitle: '// social', linksCount: '02 länkar' },
    ticker: { aria: 'Företagsinformation', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Kreativa webblösningar' }, { type: 'text', value: 'Digitala produkter' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  no: {
    header: { established: 'Etablert 2024', title: 'Null Incorporated', tagline: 'Vi bygger kreative digitale produkter og eksperimenter for det moderne nettet.', systemsOnline: 'SYSTEMER ONLINE', projects: (count) => `${count} PROSJEKTER` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'RULL FOR MER', projectsAria: 'Prosjekter' },
    domainCard: { tbd: 'KOMMER', visit: 'BESØK' },
    about: { sectionAria: 'Sosialt', heading: 'Sosialt', cardTitle: '// social', linksCount: '02 lenker' },
    ticker: { aria: 'Bedriftsinformasjon', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Kreative nettløsninger' }, { type: 'text', value: 'Digitale produkter' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  fi: {
    header: { established: 'Per. 2024', title: 'Null Incorporated', tagline: 'Rakennamme luovia digitaalisia tuotteita ja kokeiluja moderniin verkkoon.', systemsOnline: 'JÄRJESTELMÄT ONLINE', projects: (count) => `${count} PROJEKTIA` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'VIERITÄ LISÄÄ', projectsAria: 'Projektit' },
    domainCard: { tbd: 'TULOSSA', visit: 'VIERAILE' },
    about: { sectionAria: 'Sosiaalinen', heading: 'Sosiaalinen', cardTitle: '// social', linksCount: '02 linkkiä' },
    ticker: { aria: 'Yritystiedot', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Luovat verkkoratkaisut' }, { type: 'text', value: 'Digitaaliset tuotteet' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  pl: {
    header: { established: 'Zał. 2024', title: 'Null Incorporated', tagline: 'Tworzymy kreatywne produkty cyfrowe i eksperymenty dla nowoczesnej sieci.', systemsOnline: 'SYSTEMY ONLINE', projects: (count) => `${count} PROJEKTÓW` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'PRZEWIŃ PO WIĘCEJ', projectsAria: 'Projekty' },
    domainCard: { tbd: 'WKRÓTCE', visit: 'ODWIEDŹ' },
    about: { sectionAria: 'Społeczności', heading: 'Social', cardTitle: '// social', linksCount: '02 linki' },
    ticker: { aria: 'Informacje o firmie', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Kreatywne rozwiązania webowe' }, { type: 'text', value: 'Produkty cyfrowe' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  cs: {
    header: { established: 'Založeno 2024', title: 'Null Incorporated', tagline: 'Vytváříme kreativní digitální produkty a experimenty pro moderní web.', systemsOnline: 'SYSTÉMY ONLINE', projects: (count) => `${count} PROJEKTŮ` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'POSUŇTE PRO VÍCE', projectsAria: 'Projekty' },
    domainCard: { tbd: 'BRZY', visit: 'NAVŠTÍVIT' },
    about: { sectionAria: 'Sociální', heading: 'Sociální', cardTitle: '// social', linksCount: '02 odkazy' },
    ticker: { aria: 'Informace o společnosti', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Kreativní webová řešení' }, { type: 'text', value: 'Digitální produkty' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  tr: {
    header: { established: 'Kur. 2024', title: 'Null Incorporated', tagline: 'Modern web için yaratıcı dijital ürünler ve deneyler geliştiriyoruz.', systemsOnline: 'SİSTEMLER AKTİF', projects: (count) => `${count} PROJE` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'DAHA FAZLA KAYDIR', projectsAria: 'Projeler' },
    domainCard: { tbd: 'YAKINDA', visit: 'ZİYARET ET' },
    about: { sectionAria: 'Sosyal', heading: 'Sosyal', cardTitle: '// social', linksCount: '02 bağlantı' },
    ticker: { aria: 'Şirket bilgileri', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Yaratıcı web çözümleri' }, { type: 'text', value: 'Dijital ürünler' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  ro: {
    header: { established: 'Înființat 2024', title: 'Null Incorporated', tagline: 'Construim produse digitale creative și experimente pentru web-ul modern.', systemsOnline: 'SISTEME ONLINE', projects: (count) => `${count} PROIECTE` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'DERULEAZĂ PENTRU MAI MULT', projectsAria: 'Proiecte' },
    domainCard: { tbd: 'ÎN CURÂND', visit: 'VIZITEAZĂ' },
    about: { sectionAria: 'Social', heading: 'Social', cardTitle: '// social', linksCount: '02 linkuri' },
    ticker: { aria: 'Informații despre companie', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Soluții web creative' }, { type: 'text', value: 'Produse digitale' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  ru: {
    header: { established: 'Осн. 2024', title: 'Null Incorporated', tagline: 'Мы создаем креативные цифровые продукты и эксперименты для современного веба.', systemsOnline: 'СИСТЕМЫ ОНЛАЙН', projects: (count) => `${count} ПРОЕКТОВ` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'ПРОКРУТИТЕ НИЖЕ', projectsAria: 'Проекты' },
    domainCard: { tbd: 'СКОРО', visit: 'ПЕРЕЙТИ' },
    about: { sectionAria: 'Соцсети', heading: 'Соцсети', cardTitle: '// social', linksCount: '02 ссылки' },
    ticker: { aria: 'Информация о компании', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Креативные веб-решения' }, { type: 'text', value: 'Цифровые продукты' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  uk: {
    header: { established: 'Засн. 2024', title: 'Null Incorporated', tagline: 'Ми створюємо креативні цифрові продукти та експерименти для сучасного вебу.', systemsOnline: 'СИСТЕМИ ОНЛАЙН', projects: (count) => `${count} ПРОЄКТІВ` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'ПРОКРУТІТЬ ДАЛІ', projectsAria: 'Проєкти' },
    domainCard: { tbd: 'СКОРО', visit: 'ВІДВІДАТИ' },
    about: { sectionAria: 'Соцмережі', heading: 'Соцмережі', cardTitle: '// social', linksCount: '02 посилання' },
    ticker: { aria: 'Інформація про компанію', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'Креативні веб-рішення' }, { type: 'text', value: 'Цифрові продукти' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  ja: {
    header: { established: '設立 2024', title: 'Null Incorporated', tagline: 'モダンWeb向けに創造的なデジタル製品と実験を構築しています。', systemsOnline: 'システム稼働中', projects: (count) => `${count} プロジェクト` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'さらに表示', projectsAria: 'プロジェクト' },
    domainCard: { tbd: '近日公開', visit: '訪問' },
    about: { sectionAria: 'ソーシャル', heading: 'ソーシャル', cardTitle: '// social', linksCount: '02 リンク' },
    ticker: { aria: '会社情報', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'クリエイティブなWebソリューション' }, { type: 'text', value: 'デジタル製品' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  ko: {
    header: { established: '설립 2024', title: 'Null Incorporated', tagline: '현대 웹을 위한 창의적인 디지털 제품과 실험을 만듭니다.', systemsOnline: '시스템 온라인', projects: (count) => `${count} 프로젝트` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: '더 보려면 스크롤', projectsAria: '프로젝트' },
    domainCard: { tbd: '출시 예정', visit: '방문' },
    about: { sectionAria: '소셜', heading: '소셜', cardTitle: '// social', linksCount: '02 링크' },
    ticker: { aria: '회사 정보', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: '창의적인 웹 솔루션' }, { type: 'text', value: '디지털 제품' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  zh: {
    header: { established: '成立于 2024', title: 'Null Incorporated', tagline: '我们为现代网络构建创意数字产品与实验。', systemsOnline: '系统在线', projects: (count) => `${count} 个项目` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: '滚动查看更多', projectsAria: '项目' },
    domainCard: { tbd: '即将推出', visit: '访问' },
    about: { sectionAria: '社交', heading: '社交', cardTitle: '// social', linksCount: '02 个链接' },
    ticker: { aria: '公司信息', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: '创意网页解决方案' }, { type: 'text', value: '数字产品' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  ar: {
    header: { established: 'تأسست 2024', title: 'Null Incorporated', tagline: 'نبني منتجات رقمية إبداعية وتجارب للويب الحديث.', systemsOnline: 'الأنظمة تعمل', projects: (count) => `${count} مشاريع` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'مرر للمزيد', projectsAria: 'المشاريع' },
    domainCard: { tbd: 'قريبًا', visit: 'زيارة' },
    about: { sectionAria: 'اجتماعي', heading: 'اجتماعي', cardTitle: '// social', linksCount: '02 روابط' },
    ticker: { aria: 'معلومات الشركة', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'حلول ويب إبداعية' }, { type: 'text', value: 'منتجات رقمية' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
  },
  hi: {
    header: { established: 'स्थापना 2024', title: 'Null Incorporated', tagline: 'हम आधुनिक वेब के लिए रचनात्मक डिजिटल उत्पाद और प्रयोग बनाते हैं।', systemsOnline: 'सिस्टम ऑनलाइन', projects: (count) => `${count} प्रोजेक्ट` },
    statusBar: { brand: 'NULL INCORPORATED', linkLabel: 'N-ULL.COM' },
    app: { scrollForMore: 'और देखने के लिए स्क्रॉल करें', projectsAria: 'प्रोजेक्ट' },
    domainCard: { tbd: 'जल्द आ रहा है', visit: 'देखें' },
    about: { sectionAria: 'सोशल', heading: 'सोशल', cardTitle: '// social', linksCount: '02 लिंक' },
    ticker: { aria: 'कंपनी जानकारी', items: [{ type: 'text', value: 'Null Incorporated' }, { type: 'link', value: 'n-ull.com', href: 'https://n-ull.com' }, { type: 'text', value: 'रचनात्मक वेब समाधान' }, { type: 'text', value: 'डिजिटल उत्पाद' }] },
    domains: baseDomains,
    placeholders: basePlaceholders,
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
