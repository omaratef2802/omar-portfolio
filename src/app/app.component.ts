import { Component, signal } from '@angular/core';

type Language = 'en' | 'ar' | 'it';
type Theme = 'dark' | 'light';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="site-shell" [class.light]="theme() === 'light'" [attr.dir]="language() === 'ar' ? 'rtl' : 'ltr'" [attr.lang]="language()">
      <header class="topbar wrap">
        <a class="brand" href="#home" aria-label="Omar Atef home">OMAR<span>.</span></a>
        <nav class="desktop-nav" aria-label="Main navigation">
          <a href="#about">{{ t().navAbout }}</a><a href="#skills">{{ t().navSkills }}</a><a href="#projects">{{ t().navProjects }}</a><a href="#contact">{{ t().navContact }}</a>
        </nav>
        <div class="toolbar">
          <select aria-label="Language" [value]="language()" (change)="setLanguage($event)">
            <option value="en">EN</option><option value="ar">AR</option><option value="it">IT</option>
          </select>
          <button class="icon-button" type="button" (click)="toggleTheme()" [attr.aria-label]="theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">{{ theme() === 'dark' ? '☼' : '☾' }}</button>
          <div class="color-wrap">
            <button class="icon-button" type="button" (click)="showColors.set(!showColors())" aria-label="Choose accent color">◉</button>
            @if (showColors()) {
              <div class="color-popover">
                @for (color of colors; track color.value) { <button class="swatch" [style.background]="color.value" [attr.aria-label]="color.name" (click)="setAccent(color.value)"></button> }
                <input type="color" aria-label="Custom accent color" [value]="accent()" (input)="onColorInput($event)">
              </div>
            }
          </div>
        </div>
      </header>

      <main>
        <section class="hero wrap" id="home">
          <div class="hero-copy">
            <div class="availability"><span></span>{{ t().availability }}</div>
            <p class="eyebrow">{{ t().intro }}</p>
            <h1>{{ t().hello }}<br><span>Omar Atef.</span></h1>
            <h2>{{ t().role }}</h2>
            <p class="hero-description">{{ t().heroDescription }}</p>
            <div class="tech-pills"><span>Node.js</span><span>Express.js</span><span>MongoDB</span><span>TypeScript</span></div>
            <div class="hero-actions"><a class="button primary" href="#projects">{{ t().viewWork }} <span>↗</span></a><a class="button secondary" href="#contact">{{ t().contactMe }}</a></div>
            <div class="social-links"><a href="https://github.com/omaratef2802" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/omar-amza/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="mailto:omaratef2827@gmail.com">Email ↗</a></div>
          </div>
          <div class="hero-visual">
            <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>
            <div class="photo-frame"><img src="https://avatars.githubusercontent.com/u/210287380?v=4" alt="Omar Atef profile photo" fetchpriority="high"><div class="photo-caption"><span class="caption-dot"></span> {{ t().backendLabel }}</div></div>
            <div class="floating-card card-top"><span class="mini-icon">⌘</span><span>Building APIs<br><small>One endpoint at a time</small></span></div>
            <div class="floating-card card-bottom"><span class="code-mark">{ }</span><span>Backend<br><small>Developer</small></span></div>
            <span class="spark spark-a">✳</span><span class="spark spark-b">✦</span>
          </div>
        </section>

        <section class="section wrap" id="about">
          <div class="section-heading"><p class="eyebrow">01 / {{ t().aboutKicker }}</p><h2>{{ t().aboutTitle }}</h2></div>
          <div class="about-grid"><p class="about-lead">{{ t().aboutLead }}</p><div class="about-details"><p>{{ t().aboutBody }}</p><div class="fact-row"><div><strong>2028</strong><span>{{ t().expectedGrad }}</span></div><div><strong>Benha</strong><span>{{ t().university }}</span></div><div><strong>3</strong><span>{{ t().siteLanguages }}</span></div></div></div></div>
        </section>

        <section class="section wrap" id="skills">
          <div class="section-heading"><p class="eyebrow">02 / {{ t().skillsKicker }}</p><h2>{{ t().skillsTitle }}</h2><p class="section-subtitle">{{ t().skillsSubtitle }}</p></div>
          <div class="skills-grid">
            <article class="skill-card"><span class="skill-number">01</span><h3>{{ t().backend }}</h3><div class="skill-tags"><span>Node.js</span><span>Express.js</span><span>REST APIs</span><span>JWT</span><span>Socket.IO</span></div></article>
            <article class="skill-card"><span class="skill-number">02</span><h3>{{ t().databases }}</h3><div class="skill-tags"><span>MongoDB</span><span>Mongoose</span><span>SQL</span></div></article>
            <article class="skill-card"><span class="skill-number">03</span><h3>{{ t().frontend }}</h3><div class="skill-tags"><span>Angular</span><span>TypeScript</span><span>JavaScript</span><span>HTML</span><span>CSS</span></div></article>
            <article class="skill-card"><span class="skill-number">04</span><h3>{{ t().tools }}</h3><div class="skill-tags"><span>Git</span><span>GitHub</span><span>Postman</span><span>Docker</span><span>Cloudinary</span></div></article>
          </div>
        </section>

        <section class="section wrap" id="projects">
          <div class="section-heading project-heading"><div><p class="eyebrow">03 / {{ t().workKicker }}</p><h2>{{ t().projectsTitle }}</h2></div><span class="project-count">02 {{ t().selectedWork }}</span></div>
          <div class="projects-grid">
            <article class="project-card featured-project"><div class="project-art task-art"><div class="mock-window"><div class="mock-bar"><i></i><i></i><i></i><span>taskflow.app</span></div><div class="mock-content"><div class="mock-side"></div><div class="mock-board"><b></b><b></b><b></b><div class="mock-task"></div><div class="mock-task short"></div><div class="mock-task"></div></div></div></div><span class="art-label">01 / COLLABORATION</span></div><div class="project-info"><div class="project-meta"><span>FULL-STACK WEB APP</span><span>01</span></div><h3>TaskFlow</h3><p>{{ t().taskDescription }}</p><div class="project-tech"><span>Angular 22</span><span>Node.js</span><span>MongoDB</span><span>Socket.IO</span></div><a class="project-link" href="https://github.com/omaratef2802/TaskMangement-Todos" target="_blank" rel="noreferrer">{{ t().viewSource }} <span>↗</span></a></div></article>
            <article class="project-card"><div class="project-art pathway-art"><div class="pathway-symbol">P<span>.</span></div><div class="pathway-lines"><i></i><i></i><i></i></div><span class="art-label">02 / LEARNING</span></div><div class="project-info"><div class="project-meta"><span>GRADUATION PROJECT</span><span>02</span></div><h3>PathwayEd</h3><p>{{ t().pathwayDescription }}</p><div class="project-tech"><span>Node.js</span><span>Express</span><span>MongoDB</span><span>Angular</span></div><p class="role-note">{{ t().teamLeadNote }}</p><a class="project-link" href="https://github.com/omaratef2802/E-learningGraduationProject" target="_blank" rel="noreferrer">{{ t().viewSource }} <span>↗</span></a></div></article>
          </div>
        </section>

        <section class="section wrap education-section">
          <div class="section-heading"><p class="eyebrow">04 / {{ t().journeyKicker }}</p><h2>{{ t().educationTitle }}</h2></div>
          <div class="timeline"><div class="timeline-dot"></div><div><span class="timeline-date">2024 — 2028</span><h3>{{ t().csDegree }}</h3><p>{{ t().benhaUniversity }}</p><span class="timeline-status">{{ t().currentlyStudying }}</span></div></div>
        </section>

        <section class="contact-section wrap" id="contact"><div class="contact-panel"><div><p class="eyebrow">05 / {{ t().contactKicker }}</p><h2>{{ t().contactTitle }}<br><span>{{ t().contactAccent }}</span></h2><p>{{ t().contactDescription }}</p></div><div class="contact-actions"><a class="button primary" href="mailto:omaratef2827@gmail.com">{{ t().sendEmail }} ↗</a><a class="whatsapp-link" href="https://wa.me/393520541752" target="_blank" rel="noreferrer">WhatsApp ↗</a><a class="whatsapp-number" href="https://wa.me/393520541752" target="_blank" rel="noreferrer">+39 352 054 1752</a></div></div></section>
      </main>
      <footer class="footer wrap"><a class="brand" href="#home">OMAR<span>.</span></a><p>© {{ currentYear }} Omar Atef. {{ t().footer }}</p><a href="#home">{{ t().backTop }} ↑</a></footer>
    </div>
  `,
})
export class AppComponent {
  readonly currentYear = new Date().getFullYear();
  readonly language = signal<Language>('en');
  readonly theme = signal<Theme>('dark');
  readonly accent = signal('#9b6cff');
  readonly showColors = signal(false);
  readonly colors = [{name:'Violet',value:'#9b6cff'},{name:'Blue',value:'#528bff'},{name:'Cyan',value:'#22c8d8'},{name:'Mint',value:'#35c99a'},{name:'Orange',value:'#ff9854'},{name:'Pink',value:'#f071b5'}];
  readonly translations = {
    en: {navAbout:'About',navSkills:'Skills',navProjects:'Projects',navContact:'Contact',availability:'Open to internship & junior opportunities',intro:'COMPUTER SCIENCE STUDENT · BACKEND DEVELOPER',hello:"Hi, I'm",role:'Junior Backend Developer',heroDescription:'I build reliable backend systems and thoughtful web experiences, turning ideas into practical applications with clean APIs and solid data foundations.',viewWork:'Explore my work',contactMe:'Let’s talk',backendLabel:'BACKEND DEVELOPMENT',aboutKicker:'A LITTLE ABOUT ME',aboutTitle:'Curious by nature. Builder by choice.',aboutLead:'I enjoy turning complex problems into clear, dependable software.',aboutBody:'I’m a Computer Science student at Benha University focused on backend development. I work with Node.js, Express and databases, and enjoy building applications where APIs, data and real-time experiences come together.',expectedGrad:'Expected graduation',university:'University',siteLanguages:'Site languages',skillsKicker:'MY TOOLKIT',skillsTitle:'Tools I build with.',skillsSubtitle:'Technologies I have worked with across coursework and personal projects.',backend:'Backend development',databases:'Databases',frontend:'Frontend',tools:'Tools & platforms',workKicker:'SELECTED WORK',projectsTitle:'Things I’ve helped bring to life.',selectedWork:'SELECTED PROJECTS',taskDescription:'A collaborative task management platform with organizations, workspaces, task assignments, reviews, notifications and real-time updates.',pathwayDescription:'A team graduation project for learning and career development, with course management, learning progress and role-based experiences.',viewSource:'View source code',teamLeadNote:'Team Leader · Backend contributions, including authentication',journeyKicker:'MY JOURNEY',educationTitle:'Education',csDegree:'Computer Science',benhaUniversity:'Benha University',currentlyStudying:'Currently studying · Expected 2028',contactKicker:'GET IN TOUCH',contactTitle:'Have a project',contactAccent:'in mind?',contactDescription:'I’m open to internship opportunities, junior backend roles and meaningful collaborations. Feel free to reach out.',sendEmail:'Send me an email',footer:'Designed & built with care.',backTop:'Back to top'},
    ar: {navAbout:'نبذة عني',navSkills:'المهارات',navProjects:'المشاريع',navContact:'تواصل',availability:'متاح لفرص التدريب والوظائف للمبتدئين',intro:'طالب حاسبات · مطور Backend',hello:'أهلاً، أنا',role:'مطور Backend مبتدئ',heroDescription:'أبني أنظمة Backend موثوقة وتجارب ويب عملية، وأحوّل الأفكار إلى تطبيقات باستخدام APIs منظمة وقواعد بيانات قوية.',viewWork:'شاهد أعمالي',contactMe:'تواصل معي',backendLabel:'تطوير BACKEND',aboutKicker:'نبذة بسيطة عني',aboutTitle:'أحب حل المشكلات وبناء الحلول.',aboutLead:'أستمتع بتحويل المشكلات المعقدة إلى برمجيات واضحة ويمكن الاعتماد عليها.',aboutBody:'أنا طالب حاسبات ومعلومات بجامعة بنها، أركز على تطوير Backend. أعمل باستخدام Node.js وExpress وقواعد البيانات، وأهتم ببناء تطبيقات تجمع بين APIs والبيانات والتحديثات اللحظية.',expectedGrad:'التخرج المتوقع',university:'الجامعة',siteLanguages:'لغات الموقع',skillsKicker:'أدواتي التقنية',skillsTitle:'التقنيات التي أستخدمها.',skillsSubtitle:'تقنيات تعاملت معها في الدراسة والمشاريع الشخصية.',backend:'تطوير Backend',databases:'قواعد البيانات',frontend:'تطوير Frontend',tools:'الأدوات والمنصات',workKicker:'أعمال مختارة',projectsTitle:'مشاريع ساهمت في بنائها.',selectedWork:'مشاريع مختارة',taskDescription:'منصة تعاونية لإدارة المهام تضم المؤسسات ومساحات العمل وتوزيع المهام والمراجعات والإشعارات والتحديثات اللحظية.',pathwayDescription:'مشروع تخرج جماعي للتعلم والتطوير المهني، يضم إدارة الكورسات ومتابعة التقدم وتجارب مختلفة حسب الدور.',viewSource:'عرض الكود',teamLeadNote:'قائد الفريق · مساهمات Backend، منها نظام تسجيل الدخول وإنشاء الحساب',journeyKicker:'مسيرتي',educationTitle:'التعليم',csDegree:'علوم الحاسب',benhaUniversity:'جامعة بنها',currentlyStudying:'طالب حاليًا · التخرج المتوقع 2028',contactKicker:'لنتواصل',contactTitle:'هل لديك مشروع',contactAccent:'في ذهنك؟',contactDescription:'منفتح على فرص التدريب ووظائف Backend للمبتدئين والتعاون في المشاريع. يسعدني تواصلك.',sendEmail:'راسلني',footer:'صُمم ونُفذ باهتمام.',backTop:'العودة للأعلى'},
    it: {navAbout:'Chi sono',navSkills:'Competenze',navProjects:'Progetti',navContact:'Contatti',availability:'Disponibile per stage e opportunità junior',intro:'STUDENTE DI INFORMATICA · BACKEND DEVELOPER',hello:'Ciao, sono',role:'Junior Backend Developer',heroDescription:'Realizzo sistemi backend affidabili ed esperienze web intuitive, trasformando idee in applicazioni concrete con API chiare e dati ben strutturati.',viewWork:'Scopri i progetti',contactMe:'Contattami',backendLabel:'SVILUPPO BACKEND',aboutKicker:'QUALCOSA SU DI ME',aboutTitle:'Curioso per natura. Sviluppatore per scelta.',aboutLead:'Mi piace trasformare problemi complessi in software chiaro e affidabile.',aboutBody:'Sono uno studente di Informatica all’Università di Benha e mi concentro sullo sviluppo backend. Lavoro con Node.js, Express e database, creando applicazioni che integrano API, dati e funzionalità in tempo reale.',expectedGrad:'Laurea prevista',university:'Università',siteLanguages:'Lingue del sito',skillsKicker:'IL MIO TOOLKIT',skillsTitle:'Le tecnologie che uso.',skillsSubtitle:'Tecnologie utilizzate durante lo studio e nei progetti personali.',backend:'Sviluppo backend',databases:'Database',frontend:'Frontend',tools:'Strumenti e piattaforme',workKicker:'PROGETTI SELEZIONATI',projectsTitle:'Progetti a cui ho contribuito.',selectedWork:'PROGETTI',taskDescription:'Una piattaforma collaborativa per la gestione delle attività con organizzazioni, workspace, assegnazioni, revisioni, notifiche e aggiornamenti in tempo reale.',pathwayDescription:'Un progetto di laurea di gruppo dedicato all’apprendimento e allo sviluppo professionale, con gestione dei corsi e monitoraggio dei progressi.',viewSource:'Visualizza il codice',teamLeadNote:'Team Leader · Contributi backend, inclusa l’autenticazione',journeyKicker:'IL MIO PERCORSO',educationTitle:'Formazione',csDegree:'Informatica',benhaUniversity:'Università di Benha',currentlyStudying:'Studente · Laurea prevista nel 2028',contactKicker:'CONTATTAMI',contactTitle:'Hai un progetto',contactAccent:'in mente?',contactDescription:'Sono disponibile per stage, ruoli junior backend e collaborazioni interessanti. Scrivimi quando vuoi.',sendEmail:'Scrivimi un’email',footer:'Progettato e realizzato con cura.',backTop:'Torna su'}
  };
  readonly t = () => this.translations[this.language()];
  constructor() {
    try {
      const savedLanguage = localStorage.getItem('omar-language') as Language | null;
      const savedTheme = localStorage.getItem('omar-theme') as Theme | null;
      const savedAccent = localStorage.getItem('omar-accent');
      if (savedLanguage && ['en','ar','it'].includes(savedLanguage)) this.language.set(savedLanguage);
      if (savedTheme && ['dark','light'].includes(savedTheme)) this.theme.set(savedTheme);
      if (savedAccent && /^#[0-9a-f]{6}$/i.test(savedAccent)) this.setAccent(savedAccent);
    } catch { /* Storage may be unavailable; defaults remain usable. */ }
  }
  setLanguage(event: Event) { const value = (event.target as HTMLSelectElement).value as Language; this.language.set(value); try { localStorage.setItem('omar-language', value); } catch {} }
  toggleTheme() { const value = this.theme() === 'dark' ? 'light' : 'dark'; this.theme.set(value); try { localStorage.setItem('omar-theme', value); } catch {} }
  setAccent(value: string) { this.accent.set(value); document.documentElement.style.setProperty('--accent', value); try { localStorage.setItem('omar-accent', value); } catch {} }
  onColorInput(event: Event) { this.setAccent((event.target as HTMLInputElement).value); }
}
