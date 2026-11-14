/* ================= EDIT ONLY THIS BLOCK ================= */
const CONFIG = {
  name: "Ons Ajmi",
  role: "Cloud infrastructure engineering student",
  github: "AjmiOns",
  cv: "cv.pdf",                  // the CV file, placed next to index.html
  cvName: "Ons_AJMI_CV.pdf",     // the name visitors get when they download it
  email: "ajmions241@gmail.com",
  linkedin: "https://www.linkedin.com/in/ons-ajmi--/",
  hero: {                        // Animated portrait (see tools/make-hero-sprite.sh)
    sprite: "",   // built from your 8 second video
    leftAt: 0.25,                // position in the video (0 to 1) where she looks fully to the viewer's left
    rightAt: 0.60,               // ...fully to the viewer's right
    upAt: 0.80                   // ...glancing up
  },
  headline: "Hi, I’m Ons. I like making things work.",
  tagline: "I’m a cloud infrastructure engineering student. I design and deploy highly available architectures on AWS and document hands-on labs in containers and networking.",
  about: [
    "I’m a cloud infrastructure engineering student at TEK-UP University. I like turning ideas into working systems, from the API and the database to the cloud they run on.",
    "My projects range from an AI movie assistant to a library platform and an Android app, and my labs cover networking, AWS automation and containers."
  ],
  focus: ["Cloud infrastructure", "Cloud architecture", "Load balancing", "High availability", "AWS and Terraform"],
  card: {                        // The ID badge in the About section
    label: "Engineer ID", strap: "Cloud", photo: "", sticker: "Let’s build",
    facts: [["Based in", "Tunis, Tunisia"], ["Studying", "TEK-UP University"], ["Focus", "Cloud architecture"]],
    caption: "The infrastructure behind the ideas", heading: "Cloud that stays up.",
    points: ["Cloud infrastructure student", "Bachelor’s degree, with honors", "Multi-AZ AWS, load balancing", "Terraform, Docker, Podman, Linux", "2 internships, {projects} projects, {labs} labs"]
  },
  now: "exploring containers, AWS automation and infrastructure as code.",
  education: [
    { title: "Cloud infrastructure engineering", place: "TEK-UP University", when: "2025 – 2028 (expected)",
      text: "Hands-on, documented labs on highly available AWS architectures (load balancing, Auto Scaling, Multi-AZ databases), OpenStack, Linux, containers and networking, with reports and screenshots as evidence." },
    { title: "Bachelor’s Degree in Information Systems Development", place: "ISET du Kef", when: "Graduated 2025",
      text: "Graduated with honors. Final-year project graded Very Good." }
  ],
  certs: [],                     // Earned certifications only, for example { name: "…", issuer: "…", year: "2026" }
  certsPlanned: [                // Shown as "In preparation". Move an entry to certs once it is obtained.
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services" },
    { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services" }
  ],
  cta: "Have an idea, a question, or just want to talk code? My inbox is open.",
  skills: [
    { title: "Cloud infrastructure", items: ["AWS", "Terraform", "OpenStack", "Linux", "Docker", "Podman"] },
    { title: "Cloud architecture", items: ["Load balancing", "Auto Scaling", "High availability", "Multi-AZ", "Three-tier VPC", "RDS Multi-AZ"] },
    { title: "Languages and frameworks", items: ["Python", "Java", "PHP", "JavaScript", "TypeScript", "NestJS", "Laravel"] },
    { title: "Networking and data", items: ["BGP", "OSPF", "ACLs", "Packet Tracer", "PostgreSQL", "MySQL"] }
  ],
  journey: [                     // Newest first
    { title: "Cloud infrastructure engineering student", place: "TEK-UP University", when: "2025 – 2028 (expected)",
      text: "Specialising in cloud infrastructure and cloud architecture, with documented hands-on labs on highly available AWS deployments, OpenStack, Linux, containers and networking." },
    { title: "Bachelor’s Degree in Information Systems Development", place: "ISET du Kef", when: "Graduated 2025",
      text: "Graduated with honors. Final-year project graded Very Good." }
  ],
  labsIntro: "Documented hands-on labs in highly available AWS architecture, networking, automation, containers and cloud infrastructure.",
  labs: [
    { art: "ha", badge: "HA", level: "Architecture", category: "High availability on AWS", title: "Highly available messaging architecture",
      text: "Multi-AZ AWS architecture with an Application Load Balancer, an Auto Scaling group, RDS MySQL Multi-AZ, ElastiCache Redis, EFS and DynamoDB, verified with health checks and browser tests.",
      tags: ["ALB", "Auto Scaling", "RDS Multi-AZ", "VPC"], url: "" },
    { art: "network", badge: "NET", level: "Networking", category: "Routing and access control", title: "Packet Tracer networking labs",
      text: "Cisco Packet Tracer labs on eBGP, OSPFv2 and ACLs, with configurations and written reports.",
      tags: ["eBGP", "OSPFv2", "ACLs", "Packet Tracer"], url: "https://github.com/AjmiOns/packet-tracer-labs" },
    { art: "cloudcode", badge: "AWS", level: "Automation", category: "AWS with Python", title: "AWS automation with Boto3",
      text: "Hands-on AWS automation with Python and Boto3: an S3 manager CLI, a resource explorer, paginators and error handling.",
      tags: ["Python", "Boto3", "S3", "CLI"], url: "https://github.com/AjmiOns/boto3-aws-academy-learner-lab" },
    { art: "containers", badge: "POD", level: "Containers", category: "Linux containerisation", title: "Containers on Linux with Podman",
      text: "A complete containerisation guide: namespaces, cgroups, OCI, runc/containerd and Podman, with course notes, practical labs and a Red Hat EX188 exam simulation.",
      tags: ["Podman", "namespaces", "cgroups", "OCI"], url: "https://github.com/AjmiOns/conteneurisation-linux-podman" },
    { art: "cloudinfra", badge: "CLD", level: "Cloud", category: "Cloud infrastructure", title: "Cloud infrastructure labs",
      text: "Documented cloud labs on OpenStack and AWS (EC2, EBS, VPC), plus Linux and networking, with reports, screenshots as evidence and knowledge checks.",
      tags: ["OpenStack", "AWS", "EC2", "VPC"], url: "https://github.com/AjmiOns/infrastructures-cloud-aws-learner-lab" }
  ],
  /* 3 to 6 projects, shown as equal cards. */
  projects: [
    { title: "CineBot AI", image: "images/project1.jpg", tags: ["Laravel", "FastAPI", "RAG", "Docker"],
      idea: "An AI movie assistant that recommends films through a conversation.",
      did: "Combined FAISS and BM25 search (hybrid RAG) with Groq Llama 3.1 and TMDB data, added personalised ranking, and built it with Laravel and FastAPI, packaged with Docker.",
      features: ["Hybrid retrieval: FAISS vector search plus BM25","Answers from Groq Llama 3.1 with TMDB movie data","Personalised ranking in a chat interface","Packaged with Docker"], contribution: "Solo project: I built it end to end.", outcome: "", repo: "https://github.com/AjmiOns/CineBot-AI", demo: "" },
    { title: "Art Gallery on AWS", image: "images/project4.jpg", tags: ["AWS", "Terraform", "Multi-AZ", "Next.js", "NestJS"],
      idea: "A marketplace where artists publish their artworks and buyers discover and buy them, designed for a highly available AWS architecture.",
      did: "Built the Next.js and NestJS application (accounts, artwork publishing, Stripe test checkout) and worked on its AWS architecture with Terraform: a three-tier VPC across two Availability Zones. I documented the target design with a load balancer, Auto Scaling and RDS Multi-AZ for high availability.",
      features: ["User accounts, artwork publishing and browsing","Stripe test-mode checkout","Terraform network, security and compute modules on AWS","Documented target design: load balancer, Auto Scaling, RDS Multi-AZ"], contribution: "Team of 2. I built the full-stack application, collaborated on the Terraform infrastructure and documented the target architecture.", repo: "https://github.com/AjmiOns/art-gallery-aws", demo: "",
      stats: [["41", "Terraform resources"], ["2", "Availability Zones"], ["6", "Subnets"], ["4", "Security groups"], ["7 days", "Automated DB backups"]],
      outcome: "The whole infrastructure is built and destroyed with Terraform every session, so it is repeatable from scratch. Still to do: HTTPS on the load balancer, remote Terraform state and CloudWatch monitoring.",
      diagram: { src: "images/art-gallery-architecture.webp",
        alt: "AWS architecture diagram of Art Gallery. Customers reach an Application Load Balancer through the Internet Gateway. Two EC2 instances in private app subnets, one per Availability Zone, run nginx and Node behind an Auto Scaling group. An RDS PostgreSQL database sits in a private DB subnet. A bastion host and a NAT gateway sit in the public subnets. S3 buckets and SSM Parameter Store hold artifacts and secrets.",
        caption: "Architecture as built (v3): 41 Terraform resources, built and destroyed every session. Faded items (CloudWatch, RDS Multi-AZ standby) are planned or optional, not built." } },
    { title: "Folio Library", image: "images/project3.jpg", tags: ["NestJS", "PostgreSQL", "TypeORM", "Bootstrap", "Chart.js"],
      idea: "A library management platform with an admin dashboard.",
      did: "Wrote a NestJS REST API with JWT, role-based access, TypeORM and PostgreSQL, plus a Bootstrap and Chart.js frontend: catalog by category, favorites, trash and restore.",
      features: ["Catalog by category, favorites, trash and restore","JWT authentication and role-based access","Admin dashboard with Chart.js"], contribution: "Solo project: API, database and interface.", outcome: "", repo: "https://github.com/AjmiOns/folio-library", demo: "" },
    { title: "To-do list Android app", image: "images/project2.jpg", tags: ["Java", "Android", "Retrofit", "PHP", "MySQL"],
      idea: "An Android task manager backed by my own REST API.",
      did: "Built the app in Java with Retrofit and a PHP/MySQL API: register, log in, add, edit and complete tasks.",
      features: ["Register and log in","Add, edit and complete tasks","PHP and MySQL REST API consumed with Retrofit"], contribution: "Solo project: Android app and REST API.", outcome: "", repo: "https://github.com/AjmiOns/todolist-android-app", demo: "" }
  ]
};
/* ======================================================== */
