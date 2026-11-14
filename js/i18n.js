const LANG = (() => { try { return localStorage.getItem("lang") === "fr" ? "fr" : "en"; } catch (e) { return "en"; } })();
const FR = {
  role: "Étudiante ingénieure en infrastructure cloud",
  headline: "Salut, moi c’est Ons. J’aime faire fonctionner les choses.",
  tagline: "Je suis étudiante ingénieure en infrastructure cloud. Je conçois et déploie des architectures hautement disponibles sur AWS et je documente des labs pratiques en conteneurs et en réseau.",
  about: ["Je suis étudiante ingénieure en infrastructure cloud à TEK-UP University. J’aime transformer des idées en systèmes qui fonctionnent, de l’API et de la base de données jusqu’au cloud qui les héberge.", "Mes projets vont d’un assistant de films IA à une plateforme de bibliothèque et une application Android, et mes labs couvrent le réseau, l’automatisation AWS et les conteneurs."],
  now: "j’explore les conteneurs, l’automatisation AWS et l’infrastructure as code.",
  cta: "Une idée, une question ou envie de parler code ? Ma boîte mail est ouverte.",
  focus: ["Infrastructure cloud", "Architecture cloud", "Répartition de charge", "Haute disponibilité", "AWS et Terraform"],
  card: { label: "Carte ingénieure", sticker: "Construisons", facts: [["Basée à", "Tunis, Tunisie"], ["Études", "TEK-UP University"], ["Axe", "Architecture cloud"]],
    caption: "L’infrastructure derrière les idées", heading: "Un cloud qui reste en ligne.",
    points: ["Étudiante en infrastructure cloud", "Licence, obtenue avec mention", "AWS multi-AZ et répartition de charge", "Terraform, Docker, Podman, Linux", "2 stages, {projects} projets, {labs} labs"] },
  skills: [{ title: "Infrastructure cloud" }, { title: "Architecture cloud", items: ["Répartition de charge", "Auto Scaling", "Haute disponibilité", "Multi-AZ", "VPC 3 niveaux", "RDS Multi-AZ"] }, { title: "Langages et frameworks" }, { title: "Réseau et données" }],
  journey: [
    { title: "Étudiante ingénieure en infrastructure cloud", place: "TEK-UP University", when: "2025 – 2028 (prévu)", text: "Spécialisation en infrastructure et architecture cloud, avec des labs pratiques documentés sur des déploiements AWS hautement disponibles, OpenStack, Linux, conteneurs et réseau." },
    { title: "Licence en développement des systèmes d’information", place: "ISET du Kef", when: "Diplômée en 2025", text: "Diplômée avec mention. Projet de fin d’études noté Très bien." }],
  education: [
    { title: "Ingénierie en infrastructure cloud", place: "TEK-UP University", when: "2025 – 2028 (prévu)", text: "Labs pratiques documentés sur des architectures AWS hautement disponibles (répartition de charge, Auto Scaling, bases de données Multi-AZ), OpenStack, Linux, conteneurs et réseau, avec rapports et captures d’écran comme preuves." },
    { title: "Licence en développement des systèmes d’information", place: "ISET du Kef", when: "Diplômée en 2025", text: "Diplômée avec mention. Projet de fin d’études noté Très bien." }],
  labsIntro: "Labs pratiques documentés sur l’architecture AWS hautement disponible, le réseau, l’automatisation, les conteneurs et l’infrastructure cloud.",
  labs: [
    { category: "Haute disponibilité sur AWS", level: "Architecture", title: "Architecture de messagerie hautement disponible", text: "Architecture AWS multi-AZ avec Application Load Balancer, groupe Auto Scaling, RDS MySQL Multi-AZ, ElastiCache Redis, EFS et DynamoDB, vérifiée par des health checks et des tests navigateur." },
    { category: "Routage et contrôle d’accès", level: "Réseau", title: "Labs réseau Packet Tracer", text: "Labs Cisco Packet Tracer sur eBGP, OSPFv2 et ACL, avec configurations et rapports écrits." },
    { category: "AWS avec Python", level: "Automatisation", title: "Automatisation AWS avec Boto3", text: "Automatisation AWS avec Python et Boto3 : un CLI de gestion S3, un explorateur de ressources, des paginators et la gestion d’erreurs." },
    { category: "Conteneurisation Linux", level: "Conteneurs", title: "Conteneurs Linux avec Podman", text: "Un guide complet de conteneurisation : namespaces, cgroups, OCI, runc/containerd et Podman, avec cours, TP pratiques et une simulation d’examen Red Hat EX188." },
    { category: "Infrastructure cloud", level: "Cloud", title: "Labs d’infrastructure cloud", text: "Labs cloud documentés sur OpenStack et AWS (EC2, EBS, VPC), plus Linux et réseau, avec rapports, captures d’écran comme preuves et tests de connaissances." }],
  projects: [
    { idea: "Un assistant de films IA qui recommande des films au fil d’une conversation.", did: "Recherche hybride FAISS et BM25 avec Groq Llama 3.1 et les données TMDB, classement personnalisé, interface de chat Laravel et FastAPI, packagée avec Docker.", features: ["Recherche hybride : FAISS (vectorielle) et BM25", "Réponses de Groq Llama 3.1 avec les données TMDB", "Classement personnalisé dans une interface de chat", "Packagé avec Docker"], contribution: "Projet solo : je l’ai construit de bout en bout." },
    { idea: "Une marketplace où les artistes publient leurs œuvres et où les acheteurs les découvrent et les achètent, conçue pour une architecture AWS hautement disponible.", did: "J’ai développé l’application Next.js et NestJS (comptes, publication d’œuvres, paiement Stripe en mode test) et travaillé sur son architecture AWS avec Terraform : un VPC à trois niveaux sur deux zones de disponibilité. J’ai documenté l’architecture cible avec load balancer, Auto Scaling et RDS Multi-AZ.", features: ["Comptes, publication et navigation des œuvres", "Paiement Stripe en mode test", "Modules Terraform réseau, sécurité et calcul sur AWS", "Architecture cible documentée : load balancer, Auto Scaling, RDS Multi-AZ"], contribution: "Équipe de 2. J’ai construit l’application full-stack, collaboré sur l’infrastructure Terraform et documenté l’architecture cible.",
      stats: [["41", "ressources Terraform"], ["2", "zones de disponibilité"], ["6", "sous-réseaux"], ["4", "groupes de sécurité"], ["7 jours", "sauvegardes BD automatiques"]],
      outcome: "Toute l’infrastructure est créée et détruite avec Terraform à chaque session, donc reproductible de zéro. Reste à faire : HTTPS sur le load balancer, état Terraform distant et supervision CloudWatch.",
      diagram: { alt: "Diagramme d’architecture AWS d’Art Gallery. Les clients atteignent un Application Load Balancer via l’Internet Gateway. Deux instances EC2 dans des sous-réseaux applicatifs privés, une par zone de disponibilité, exécutent nginx et Node derrière un groupe Auto Scaling. Une base RDS PostgreSQL est dans un sous-réseau de données privé. Un bastion et une passerelle NAT sont dans les sous-réseaux publics. Des buckets S3 et SSM Parameter Store stockent les artefacts et les secrets.",
        caption: "Architecture telle que construite (v3) : 41 ressources Terraform, créées et détruites à chaque session. Les éléments estompés (CloudWatch, réplique RDS Multi-AZ) sont prévus ou optionnels, pas construits." } },
    { idea: "Une plateforme de gestion de bibliothèque avec tableau de bord administrateur.", did: "API REST NestJS avec JWT, accès par rôles, TypeORM et PostgreSQL, plus une interface Bootstrap et Chart.js : catalogue par catégorie, favoris, corbeille et restauration.", features: ["Catalogue par catégorie, favoris, corbeille et restauration", "Authentification JWT et accès par rôles", "Tableau de bord administrateur avec Chart.js"], contribution: "Projet solo : API, base de données et interface." },
    { idea: "Un gestionnaire de tâches Android s’appuyant sur ma propre API REST.", did: "Application Java avec Retrofit et une API PHP/MySQL : inscription, connexion, ajout, modification et validation des tâches.", features: ["Inscription et connexion", "Ajout, modification et validation des tâches", "API REST PHP et MySQL consommée avec Retrofit"], contribution: "Projet solo : application Android et API REST." }]
};
const FRMAP = {
  "About": "À propos", "Work": "Projets", "Journey": "Parcours", "Say hi": "Contact",
  "See what I’ve built": "Voir mes projets", "Download CV": "Télécharger le CV", "Focused on": "Axes :",
  "Building things from": "Construire à partir de", "scratch.": "zéro.", "Right now:": "En ce moment :",
  "Toolbox": "Boîte à outils", "Tools I": "Les outils que", "reach for.": "j’utilise.",
  "Interactive": "Interactif", "Ask me": "Demandez-moi", "anything.": "tout.",
  "A small interactive shell. Click a command below or type": "Un petit terminal interactif. Cliquez sur une commande ci-dessous ou tapez",
  "Selected work": "Projets sélectionnés", "Things I’ve built,": "Ce que j’ai construit,", "end to end.": "de bout en bout.",
  "A few projects I’m proud of, and what each one taught me.": "Quelques projets dont je suis fière, et ce que chacun m’a appris.",
  "Hands-on": "Pratique", "Earlier labs,": "Labs réalisés,", "documented.": "documentés.",
  "Proof of work": "Preuve par le code", "Don’t take my word for it.": "Ne me croyez pas sur parole.", "Read the code.": "Lisez le code.",
  "Every project and lab on this page lives on GitHub, with its commits and documentation. Review the work the way an engineer would.": "Chaque projet et chaque lab présenté ici est sur GitHub, avec ses commits et sa documentation. Jugez le travail comme le ferait un ingénieur.",
  "Browse my repositories": "Parcourir mes dépôts", "The path": "Le chemin", "so far.": "parcouru.",
  "Details": "Détails", "Key features": "Fonctionnalités clés", "My contribution": "Ma contribution", "Source code": "Code source", "Live demo": "Démo en ligne", "View lab": "Voir le lab",
  "The idea": "L’idée", "What I did": "Ce que j’ai fait", "How it went": "Résultat",
  "Let’s connect": "Restons en contact", "Send an email": "Envoyer un e-mail", "Copy email": "Copier l’e-mail", "Copied": "Copié",
  "No need to": "Pas besoin de", "overthink it.": "trop réfléchir.",
  "Download portfolio ↓": "Télécharger le portfolio ↓", "Back to top ↑": "Retour en haut ↑",
  "Built with HTML, CSS and JavaScript · Hosted on Vercel · ©": "Conçu avec HTML, CSS et JavaScript · Hébergé sur Vercel · ©",
  "Welcome to my interactive portfolio!": "Bienvenue sur mon portfolio interactif !",
  "List available commands": "Lister les commandes disponibles", "General information": "Informations générales", "Experience and journey": "Expérience et parcours",
  "Educational background": "Parcours scolaire", "Technical skills": "Compétences techniques", "Featured projects": "Projets phares", "Earlier hands-on labs": "Labs pratiques",
  "How to reach me": "Me contacter", "Download my CV": "Télécharger mon CV", "Open my GitHub profile": "Ouvrir mon profil GitHub", "Open my LinkedIn profile": "Ouvrir mon profil LinkedIn",
  "Switch light or dark theme": "Changer de thème clair ou sombre", "Clear the screen": "Effacer l’écran",
  "Skip to main content": "Aller au contenu principal", "Certification path": "Parcours de certification",
  "In preparation": "En préparation", "Earned": "Obtenue", "No certification obtained yet. In preparation:": "Aucune certification obtenue pour l’instant. En préparation :",
  "View architecture diagram": "Voir le diagramme d’architecture", "Architecture diagram": "Diagramme d’architecture", "Close": "Fermer",
  "Click the diagram to zoom": "Cliquez sur le diagramme pour zoomer",
  "Key numbers": "Chiffres clés"
};
const T = s => (LANG === "fr" && FRMAP[s]) || s;
const mg = (a, b) => { for (const k in b) { const v = b[k]; if (Array.isArray(v)) { if (v.length && v[0] && typeof v[0] === "object" && !Array.isArray(v[0])) v.forEach((o, i) => mg(a[k][i], o)); else a[k] = v; } else if (v && typeof v === "object") mg(a[k], v); else a[k] = v; } };
if (LANG === "fr") { mg(CONFIG, FR); document.documentElement.lang = "fr"; }
