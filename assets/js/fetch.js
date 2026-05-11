/*=========================DYNAMIC DOMAIN=========================*/
const currentDomain = window.location.origin;

document.getElementById("canonicalUrl").setAttribute("href", currentDomain);
document.getElementById("ogUrl").setAttribute("content", currentDomain);

fetch("https://sheetdb.io/api/v1/8fvil96j4h6gr?sheet=govt_strip")
    .then(response => response.json())
    .then(data => {
        /* ========================= GOVT EXAM STRIP ========================= */
        const examStripContainer = document.getElementById("examStripContainer");

        data.forEach(exam => {
            examStripContainer.innerHTML += `
                <div class="flex-shrink-0 w-36 md:w-auto snap-center group cursor-pointer">
                    <div class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div class="aspect-[4/3] overflow-hidden">
                            <img src="${exam.image}"
                                alt="${exam.alt}"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                        </div>
                        <div class="p-2.5 text-center">
                            <p class="text-brandBlue font-semibold text-sm">
                                ${exam.name}
                            </p>
                        </div>
                    </div>
                </div>`;
        });
    });

fetch("https://sheetdb.io/api/v1/8fvil96j4h6gr?sheet=setting")
    .then(response => response.json())
    .then(quiz => {
        const data = quiz[0];

        /*=========================TODAY QUIZ LINK =========================*/
        document.getElementById("startQuizBtn").href = data.link;
        document.getElementById("mobileStartQuizBtn").href = data.link;

        /* ========================= SITE LOGO ========================= */
        document.getElementById("siteLogo").innerHTML = `
            <a href="#" class="flex items-center gap-2">
                <img src="${data.logo}" class="w-40 h-40 object-contain" alt="RozKaQuiz-SSC government exam preparation quiz">
            </a>
        `;

        /* ========================= FAVICON ========================= */
        document.getElementById("favicon").href = data.favicon;

        /* ========================= OG IMAGE ========================= */
        document.getElementById("ogImage")
            .setAttribute(
                "content",
                `${currentDomain}/${data.preview_image}`
            );

        /* ========================= TWITTER IMAGE ========================= */
        document.getElementById("twitterImage")
            .setAttribute(
                "content",
                `${currentDomain}/${data.preview_image}`
            );

        /* ========================= SCHEMA JSON ========================= */
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": data.name,
            "url": currentDomain,
            "logo": `${currentDomain}/${data.logo}`,
            "sameAs": data.socials.map(social => social.link)
        };

        document.getElementById("schemaJson").textContent = JSON.stringify(schemaData);
    });

fetch("https://sheetdb.io/api/v1/8fvil96j4h6gr?sheet=social")
    .then(response => response.json())
    .then(data => {
        /* ========================= SOCIAL ICONS ========================= */
        const socialContainer = document.getElementById("socialIcons");

        data.forEach(social => {
            socialContainer.innerHTML += `
                <a href="${social.link}" target="_blank" class="group">
                    <div class="w-12 h-12 bg-brandBlue rounded-full flex items-center justify-center hover:bg-brandYellow hover:scale-110 transition-all duration-300 shadow-md">
                        <i class="${social.icon} text-white group-hover:text-brandBlue transition-colors"></i>
                    </div>
                </a>
            `;
        });
    });

fetch("https://sheetdb.io/api/v1/8fvil96j4h6gr?sheet=quiz_cards")
    .then(response => response.json())
    .then(data => {

        const quizContainer = document.getElementById("quizCards");

        data.forEach(quiz => {

            // Empty data check
            if (
                !quiz.title ||
                !quiz.link ||
                !quiz.category ||
                !quiz.description
            ) {
                return;
            }

            quizContainer.innerHTML += `
                <a href="${quiz.link}" target="_blank" class="group block">
                    <div class="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                        <div class="p-6 flex-1 flex flex-col">

                            <div class="flex items-start justify-between mb-3">
                                ${quiz.category ? `
                                <span class="bg-brandBlue/10 text-brandBlue text-xs font-semibold px-3 py-1 rounded-full">
                                    ${quiz.category}
                                </span>` : ''}

                                ${quiz.difficulty ? `
                                <span class="bg-green-50 text-green-600 text-xs font-medium px-2.5 py-1 rounded-full">
                                    ${quiz.difficulty}
                                </span>` : ''}
                            </div>

                            ${quiz.title ? `
                            <h3 class="text-lg font-bold text-gray-900 mb-2">
                                ${quiz.title}
                            </h3>` : ''}

                            ${quiz.description ? `
                            <p class="text-gray-500 text-sm mb-4 flex-1">
                                ${quiz.description}
                            </p>` : ''}

                            <div class="flex items-center gap-4 text-xs text-gray-400 mb-4">

                                ${quiz.questions ? `
                                <span>
                                    ${quiz.questions} Questions
                                </span>` : ''}

                                ${quiz.time ? `
                                <span>
                                    ${quiz.time}
                                </span>` : ''}

                            </div>

                            <button class="w-full bg-brandBlue text-white font-semibold text-sm py-2.5 rounded-lg">
                                Start Quiz
                            </button>

                        </div>
                    </div>
                </a>`;
        });
    });